// user_stats.js – Les Meves Estadístiques
// Cerca per nom/cognoms i mostra l'historial complet de participacions
// i puntuacions d'un arquer a competicions oficials de la FCTA.
//
// Font de dades: TOTES les temporades definides a CS_SEASONS
// (comp_stats.js) combinades — a diferència de Competicions >
// Estadístiques, aquí es vol l'historial complet de carrera, no una
// temporada sola. Es reaprofita la caché per temporada de comp_stats.js
// (_csFetchSeason), així que no es torna a descarregar el que ja s'hagi
// carregat des de l'altra pàgina.
//
// IMPORTANT: no hi ha número de llicència enlloc del portal (ni a
// aquestes dades, que venen d'Ianseo, ni a DB — la gestió de
// llicències es fa externament al portal del Federat de la RFETA).
// La cerca es fa per nom tal com apareix als resultats oficials.
// ──────────────────────────────────────────────────────────

var _usIndex    = null;  // { normKey: { display, entries:[...] } }
var _usSelected = null;  // normKey seleccionat actualment

// ── Arxiu històric extern ─────────────────────────────────────
// docs/archer_history_archive.json: competicions de fora del circuit
// FCTA/Ianseo de temporada actual (Campionats d'Espanya i de Catalunya
// 2011–2024, importats des d'un CSV extern). Mateix format que els
// fitxers de CS_SEASONS (títol, dateISO, type, disc, divisions[].archers[]),
// però es carrega a banda perquè NO ha d'aparèixer com a "temporada" al
// selector de Competicions > Estadístiques — només alimenta l'historial
// de carrera d'aquesta pàgina. Els registres importats tenen
// dateApprox:true (només se'n coneix l'any, no el dia exacte) i alguns
// tenen type:'unknown' (no s'ha pogut determinar la modalitat pel títol).
var US_ARCHIVE_FILE = 'docs/archer_history_archive.json';
var _usArchiveCache = null;

function _usFetchArchive(onSuccess, onError) {
  if (_usArchiveCache) { onSuccess(_usArchiveCache); return; }
  fetch(US_ARCHIVE_FILE)
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (!Array.isArray(d)) throw new Error('Arxiu històric invàlid');
      _usArchiveCache = d;
      onSuccess(d);
    })
    .catch(function(err) { if (onError) onError(err); });
}

// ── Normalització de noms (accents, majúscules, espais) ─────
// Permet que "Perez" trobi "Pérez" i agrupa variants d'accentuació
// del mateix arquer entre competicions diferents.
function _usNorm(s) {
  // Combining diacritics són U+0300–U+036F (bloc Unicode "Combining
  // Diacritical Marks"); es filtren per codi en lloc d'una regex amb
  // caràcters literals per evitar problemes de codificació del fitxer.
  var decomposed = String(s || '').normalize('NFD');
  var out = '';
  for (var i = 0; i < decomposed.length; i++) {
    var code = decomposed.charCodeAt(i);
    if (code < 0x0300 || code > 0x036f) out += decomposed.charAt(i);
  }
  return out.toUpperCase().trim().replace(/\s+/g, ' ');
}

// ── Construcció de l'índex arquer → participacions ───────────
function _usBuildIndex() {
  var idx = {};
  (_usAllSeasonsData || []).forEach(function(comp) {
    (comp.divisions || []).forEach(function(div) {
      (div.archers || []).forEach(function(a) {
        if (!a.name) return;
        var key = _usNorm(a.name);
        if (!idx[key]) idx[key] = { display: a.name, entries: [] };
        // Com a etiqueta, prefereix la variant més "completa" (amb accents)
        if (a.name.length > idx[key].display.length) idx[key].display = a.name;
        idx[key].entries.push({
          compTitle: comp.title, dateISO: comp.dateISO, type: comp.type,
          disc: comp.disc, icUrl: comp.icUrl,
          divName: div.name, pos: a.pos, score: a.score,
          club: a.club, clubName: a.clubName
        });
      });
    });
  });
  return idx;
}

// Aquesta pàgina és un historial de carrera: a diferència de
// Competicions > Estadístiques (que mostra una temporada alhora), aquí
// es combinen TOTES les temporades de CS_SEASONS perquè un arquer vegi
// totes les seves participacions, no només les de la temporada activa.
var _usAllSeasonsData = null;

function _usLoadAllSeasons(onDone) {
  var keys    = CS_SEASON_ORDER.slice();
  var results = [];
  var pending = keys.length + 1; // +1 per l'arxiu històric extern
  function settle() { if (--pending === 0) onDone(results); }
  keys.forEach(function(key) {
    _csFetchSeason(key,
      function(data) { results = results.concat(data); settle(); },
      function()     { settle(); } // una temporada caiguda no bloqueja la resta
    );
  });
  _usFetchArchive(
    function(data) { results = results.concat(data); settle(); },
    function()     { settle(); } // arxiu no disponible no bloqueja les temporades en viu
  );
}

// ── Inicialització de la pàgina (cridat des de nav.js en entrar-hi) ──
function usInit() {
  var content = document.getElementById('usContent');
  if (!content) return;
  if (_usIndex) { _usRenderIdle(); return; }
  content.innerHTML = '<div class="cs-loading">Carregant dades…</div>';
  _usLoadAllSeasons(function(all) {
    _usAllSeasonsData = all;
    _usIndex = _usBuildIndex();
    _csGetClubMap(); // omple _csClubMap perquè _csClubLabel() resolgui noms complets
    _usRenderIdle();
  });
}

function _usRenderIdle() {
  var content = document.getElementById('usContent');
  if (!content) return;
  if (_usSelected && _usIndex[_usSelected]) { _usRenderReport(_usSelected); return; }
  content.innerHTML = '<div class="us-empty">🔍 Escriu el teu cognom a la cerca de dalt per veure el teu historial de competicions.</div>';
}

// ── Cerca en viu (autocompletat) ──────────────────────────────
function usOnSearchInput(val) {
  var box      = document.getElementById('usSuggestions');
  var clearBtn = document.getElementById('usClearBtn');
  if (!box || !clearBtn) return;
  clearBtn.style.display = val ? '' : 'none';

  if (!_usIndex) { box.style.display = 'none'; return; } // encara carregant dades

  var q = _usNorm(val);
  if (q.length < 2) { box.style.display = 'none'; return; }

  var matches = Object.keys(_usIndex)
    .filter(function(k){ return k.indexOf(q) !== -1; })
    .sort(function(a,b){ return _usIndex[a].display.localeCompare(_usIndex[b].display, 'ca'); })
    .slice(0, 20);

  if (!matches.length) {
    box.innerHTML = '<div class="us-sugg-empty">Cap arquer trobat amb «' + escHtml(val) + '».</div>';
    box.style.display = 'block';
    return;
  }

  box.innerHTML = matches.map(function(k) {
    var e = _usIndex[k];
    var n = e.entries.length;
    return '<button class="us-sugg-item"' + dataAttr('onclick','usSelectArcher',[k]) + '>' +
      '<span class="us-sugg-name">' + escHtml(e.display) + '</span>' +
      '<span class="us-sugg-count">' + n + ' participaci' + (n === 1 ? 'ó' : 'ons') + '</span>' +
    '</button>';
  }).join('');
  box.style.display = 'block';
}

// Enter al camp de cerca → selecciona el primer suggeriment visible
function usSearchEnter() {
  var box = document.getElementById('usSuggestions');
  if (!box) return;
  var first = box.querySelector('.us-sugg-item');
  if (first) first.click();
}

function usClearSearch() {
  var input = document.getElementById('usSearchInput');
  if (input) { input.value = ''; input.focus(); }
  var clearBtn = document.getElementById('usClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  var box = document.getElementById('usSuggestions');
  if (box) box.style.display = 'none';
  _usSelected = null;
  _usRenderIdle();
}

// ── Selecció d'un arquer: mostra l'informe complet ───────────
function usSelectArcher(key) {
  _usSelected = key;
  var box = document.getElementById('usSuggestions');
  if (box) box.style.display = 'none';
  var e = _usIndex[key];
  if (!e) return;
  var input = document.getElementById('usSearchInput');
  if (input) input.value = e.display;
  var clearBtn = document.getElementById('usClearBtn');
  if (clearBtn) clearBtn.style.display = '';
  _usRenderReport(key);
}

// ── Informe personal ──────────────────────────────────────────
function _usRenderReport(key) {
  var content = document.getElementById('usContent');
  if (!content) return;
  var e = _usIndex[key];
  if (!e) { _usRenderIdle(); return; }

  var entries = e.entries.slice().sort(function(a,b){ return b.dateISO.localeCompare(a.dateISO); });

  // Clubs representats (per si ha canviat de club al llarg del temps).
  // _csNormCode unifica variants numèriques/alfabètiques/text del mateix
  // club (p.ex. dos codis Ianseo diferents pel mateix club).
  var clubSet = {};
  entries.forEach(function(en){
    if (!en.club) return;
    var code = _csNormCode(en.club) || en.club;
    if (!clubSet[code]) clubSet[code] = _csClubLabel(code) || en.clubName || en.club;
  });
  var clubs = Object.keys(clubSet).map(function(c){ return clubSet[c]; });

  // Millor marca assolida per cada categoria/classe en què ha competit
  var bestByDiv = {};
  entries.forEach(function(en) {
    if (!en.score) return;
    var d = en.divName;
    if (!bestByDiv[d] || en.score > bestByDiv[d].score) bestByDiv[d] = en;
  });
  var bestList = Object.keys(bestByDiv).map(function(d){ return bestByDiv[d]; })
    .sort(function(a,b){ return b.score - a.score; });

  var header =
    '<div class="us-report-head">' +
      '<div class="us-report-name">' + escHtml(e.display) + '</div>' +
      '<div class="us-report-meta">' +
        '<span>🏟️ ' + escHtml(clubs.join(' · ') || '—') + '</span>' +
        '<span>🏹 ' + entries.length + ' participaci' + (entries.length === 1 ? 'ó' : 'ons') + '</span>' +
      '</div>' +
    '</div>';

  var bestHtml = '';
  if (bestList.length) {
    bestHtml =
      '<div class="cs-section">' +
        '<h3 class="cs-h3">🏅 Millors marques per categoria</h3>' +
        '<div class="us-best-grid">' +
          bestList.map(function(b) {
            return '<div class="us-best-card">' +
              '<div class="us-best-score">' + b.score + '</div>' +
              '<div class="us-best-div">' + escHtml(b.divName) + '</div>' +
              '<div class="us-best-comp">' + escHtml(b.compTitle) + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
  }

  var rows = entries.map(function(en) {
    var icon = _CS_TYPE_ICONS[en.type]  || '🏹';
    var lbl  = _CS_TYPE_LABELS[en.type] || en.disc || '';
    return '<tr>' +
      '<td class="rec-data">' + escHtml(en.dateISO) + '</td>' +
      '<td>' + (en.icUrl
        ? '<a href="' + escHtml(en.icUrl) + '" target="_blank" rel="noopener">' + escHtml(en.compTitle) + '</a>'
        : escHtml(en.compTitle)) + '</td>' +
      '<td><span class="cs-chart-type-badge cs-bc-' + en.type + '">' + icon + ' ' + escHtml(lbl) + '</span></td>' +
      '<td>' + escHtml(en.divName) + '</td>' +
      '<td class="rec-marca">' + (en.pos || '—') + '</td>' +
      '<td class="rec-marca"><strong>' + (en.score || '—') + '</strong></td>' +
    '</tr>';
  }).join('');

  var table =
    '<div class="cs-section">' +
      '<h3 class="cs-h3">📋 Historial de participacions</h3>' +
      '<div class="rec-table-wrap">' +
        '<table class="rec-table">' +
          '<thead><tr><th>Data</th><th>Competició</th><th>Modalitat</th><th>Categoria</th><th>Pos.</th><th>Puntuació</th></tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
      '</div>' +
    '</div>';

  content.innerHTML = header + bestHtml + table;
}

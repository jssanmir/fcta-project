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
var _usTypeFilter = 'all'; // filtre de modalitat: all | al | sala | camp | trd

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
      // El CSV d'origen barreja "hombre"/"Home"/"Men" (i "mujer"/"Dona"/
      // "Women") segons la federació que va emetre cada resultat.
      // S'unifica amb la mateixa _csNormDivName() que ja fa servir
      // comp_stats.js per a les temporades en viu, perquè una mateixa
      // categoria no aparegui repetida amb tres etiquetes diferents.
      d.forEach(function(comp) {
        (comp.divisions || []).forEach(function(div) {
          div.name = _csNormDivName(div.name);
        });
      });
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

// ── Àlies de noms ────────────────────────────────────────────
// Un mateix arquer pot aparèixer inscrit amb noms diferents a les
// competicions (nom simple, nom compost, abreviat…) i, sense llicència a
// les dades, no hi ha manera automàtica de saber-ho. Aquí es llisten a mà
// les variants (clau normalitzada per _usNorm → clau canònica) que s'han
// verificat com a la mateixa persona; s'agrupen sota una sola fitxa i
// s'hi mostra la variant més completa.
var US_NAME_ALIASES = {
  // Domínguez Escrihuela (CACV): "Jose", "Ricardo" i "Jose Ricardo"
  'DOMINGUEZ ESCRIHUELA JOSE': 'DOMINGUEZ ESCRIHUELA JOSE RICARDO',
  'DOMINGUEZ ESCRIHUELA RICARDO': 'DOMINGUEZ ESCRIHUELA JOSE RICARDO',
  // CASTELLO FOLCH Josep (9 part.)
  'CASTELLO FOLCH JOSE': 'CASTELLO FOLCH JOSEP',
  // D'APOLITO RIBO Elias (12 part.)
  'D APOLITO RIBO ELIAS': 'D\'APOLITO RIBO ELIAS',
  // DEL PUERTO ANGORRILLA Diego (21 part.)
  'DEL PUERTO ANGORRILL DIEGO': 'DEL PUERTO ANGORRILLA DIEGO',
  // GALIANO HERNANDEZ Angel (26 part.)
  'GALIANO HRENANDEZ ANGEL': 'GALIANO HERNANDEZ ANGEL',
  // GUZMAN SOLER Josep (12 part.)
  'GUZMAN SOLER JOSE': 'GUZMAN SOLER JOSEP',
  // MARTIN LOPEZ Miquel (7 part.)
  'MARTIN LOPEZ MIGUEL': 'MARTIN LOPEZ MIQUEL',
  // MOHEDANO CANALS Estel·la (4 part.)
  'MOHEDANO CANALS ESTEL.LA': 'MOHEDANO CANALS ESTEL·LA',
  'MOHEDANO CANALS ESTELLA': 'MOHEDANO CANALS ESTEL·LA',
  // PEREZ BONAVILA Didac (21 part.)
  'PEREZ BONAVILLA DIDAC': 'PEREZ BONAVILA DIDAC',
  // SINFREU ABAD Nuria (18 part.)
  'SINFEU ABAD NURIA': 'SINFREU ABAD NURIA',
  'SINFREU NURIA': 'SINFREU ABAD NURIA',
  // SINFREU VERGARA Antoni (12 part.)
  'SINFEU VERGARA ANTONI': 'SINFREU VERGARA ANTONI',
  // SORIA GARCIA Conrado (6 part.)
  'SORIA GARCIA CONRAT': 'SORIA GARCIA CONRADO',
  // CARBO LINAZA Georgina (11 part.)
  'CARBO I LINAZA GEORGINA': 'CARBO LINAZA GEORGINA',
  // FRAGUAS CASTANY Antoni (23 part.)
  'FRAGUAS ANTONI': 'FRAGUAS CASTANY ANTONI',
  // HURTADO BELLIDO Manel (21 part.)
  'HURTADO MANEL': 'HURTADO BELLIDO MANEL',
  'HURTADO BELLIDO MANUEL': 'HURTADO BELLIDO MANEL',
  // MOURA RIBEIRO GOMES DE SOUSA Alexandra (32 part.)
  'MOURA RIBEIRO ALEXANDRA': 'MOURA RIBEIRO GOMES DE SOUSA ALEXANDRA',
  // RODRIGUEZ COUTADO Lucia (25 part.)
  'RODRIGUEZ LUCIA': 'RODRIGUEZ COUTADO LUCIA',
  // GUTIERREZ SARRIAS Montserrat (6 part.)
  'GUTIERREZ SARRIAS MONTSERRAT NURIA': 'GUTIERREZ SARRIAS MONTSERRAT',
  // PALOMAR GUTIERREZ Maria Eugenia (14 part.)
  'PALOMAR GUTIERREZ EUGENIA': 'PALOMAR GUTIERREZ MARIA EUGENIA',
  // PEREZ LAJARIN Jose Manuel (7 part.)
  'PEREZ LAJARIN JOSE': 'PEREZ LAJARIN JOSE MANUEL',
  // RIBAS MALEKZADEH Ruhollah Erfan (20 part.)
  'RIBAS MALEKZADEH ERFAN': 'RIBAS MALEKZADEH RUHOLLAH ERFAN',
  // ALEJO MINARRO David (10 part.)
  'ALEJO DAVID': 'ALEJO MINARRO DAVID',
  // CARDOZO FERREIRA David Rafael (24 part.)
  'CARDOZO DAVID RAFAEL': 'CARDOZO FERREIRA DAVID RAFAEL',
  'CARDOZO FERREIRA DAVID': 'CARDOZO FERREIRA DAVID RAFAEL',
  // DOMINGO GONZALEZ Guiu (30 part.)
  'DOMINGO I GONZALEZ GUIU': 'DOMINGO GONZALEZ GUIU',
  // BONNIN VASQUEZ David (22 part.)
  'BONNIN VASQUEZ D': 'BONNIN VASQUEZ DAVID',
  // CAMPO TELLEZ Casandra (27 part.)
  'CAMPO TELLEZ C.': 'CAMPO TELLEZ CASANDRA',
  // GALLARDO ANDRES Ignasi (28 part.)
  'GALLARDO ANDRES I.': 'GALLARDO ANDRES IGNASI',
  // GARCIA FERNANDEZ David (27 part.)
  'GARCIA FERNANDEZ D.': 'GARCIA FERNANDEZ DAVID',
  // GARCIA SERRANO Ramon (24 part.)
  'GARCIA SERRANO R.': 'GARCIA SERRANO RAMON',
  // HERNANDEZ BARRETO Jose Antonio (9 part.)
  'HERNANDEZ BARRETO J.': 'HERNANDEZ BARRETO JOSE ANTONIO',
  // JAVIER CAMPOS Maria Luz (13 part.)
  'JAVIER CAMPOS MARI LUZ': 'JAVIER CAMPOS MARIA LUZ',
  'JAVIER CAMPOS MA LUZ': 'JAVIER CAMPOS MARIA LUZ',
  // MARTOS CALDERON Sara (12 part.)
  'MARTOS SARA': 'MARTOS CALDERON SARA',
  // SIERRA MARTINEZ Alex (9 part.)
  'SIERRA ALEX': 'SIERRA MARTINEZ ALEX',
  // PRIANTE VIDAL Adolf (5 part.)
  'PRIANTE I VIDAL ADOLF': 'PRIANTE VIDAL ADOLF',
  // BRAVO NAVAS Josep (19 part.)
  'BRAVO NAVAS JOSE': 'BRAVO NAVAS JOSEP',
  // SAFONT CATENA Gerard (30 part.)
  'SAFONT CATENA GERAD': 'SAFONT CATENA GERARD',
  // SEMIS ASTIER Ester (24 part.)
  'SEMIS ASTIER ESTHER': 'SEMIS ASTIER ESTER',
  // VIZCAINO CULI Guillem (17 part.)
  'VIZCAINO CULI GUILLEN': 'VIZCAINO CULI GUILLEM',
  // VALLE ARIAS Antonio (21 part.)
  'VALLE ARIES ANTONIO': 'VALLE ARIAS ANTONIO',
  // RICART ROIG Jordi (32 part.)
  'RICART ROIG JORDI RICART ROIG': 'RICART ROIG JORDI',
  // SUAREZ GARROTE Laura M (27 part.)
  'SUAREZ GARROTE LAURA': 'SUAREZ GARROTE LAURA M',
  // PRAT MARTINEZ Miguel Angel (16 part.)
  'PRAT MARTINEZ MIGUEL': 'PRAT MARTINEZ MIGUEL ANGEL',
  // GARCIA BELLIDO Victor Manuel (5 part.)
  'GARCIA BELLIDO VICTOR': 'GARCIA BELLIDO VICTOR MANUEL',
  // LOPEZ GONZALEZ Jesus (6 part.)
  'LOPEZ GONZALEZ JESUS (S)': 'LOPEZ GONZALEZ JESUS',
  'LOPEZ GOMZALEZ JESUS': 'LOPEZ GONZALEZ JESUS',
  // BARREDA COMAS Pau (14 part.)
  'BARRERA COMAS PAU': 'BARREDA COMAS PAU',
  // FERNANDEZ ROSELL Laia (10 part.)
  'FERNANDEZ ROSSELL LAIA': 'FERNANDEZ ROSELL LAIA',
  // FERNANDEZ BUIL Javier (17 part.)
  'FERNANDEZ BUIL XAVIER': 'FERNANDEZ BUIL JAVIER',
  // RIBATALLADA ESPASA Javier (14 part.)
  'RIBATALLADA ESPASA XAVIER': 'RIBATALLADA ESPASA JAVIER',
  // QUEROL GUARDIOLA Juanjo (16 part.)
  'QUEROL GUARDIOLA JUAN JOSE': 'QUEROL GUARDIOLA JUANJO',
  // ROMERO PEREZ Daniel (19 part.)
  'ROMERO PEREZ DANI': 'ROMERO PEREZ DANIEL',
  // ROMERO VILELA Miquel (2 part.)
  'ROMERO VILELLA MIGUEL': 'ROMERO VILELA MIQUEL',
  // PIFARRE TRUJILLO Miquel Angel (4 part.)
  'PIFARRE TRUJILLO MIGUEL ANGEL': 'PIFARRE TRUJILLO MIQUEL ANGEL',
  // SANCHEZ AMADO Carme (8 part.)
  'SANCHEZ AMADO CARMEN': 'SANCHEZ AMADO CARME',
  // MOTIS ALOS Alberto (6 part.)
  'MOTIS ALOS ALBERT': 'MOTIS ALOS ALBERTO',
  // PEREZ MESAS Jose (6 part.)
  'PEREZ MESAS JOSEP': 'PEREZ MESAS JOSE',
  // JUANOLA CODINA Sebastia (2 part.)
  'JUANOLA CODINA SEBASTIAN': 'JUANOLA CODINA SEBASTIA',
  // AMAT BERTRAN Julio (4 part.)
  'AMAT BERTRAN JULI': 'AMAT BERTRAN JULIO',
  // CASTILLO CASTANEDA Johann Samuel (3 part.)
  'CASTILLO CASTANEDA JOHAN SAMUEL': 'CASTILLO CASTANEDA JOHANN SAMUEL',
  // DE MIGUEL RODRIGUEZ Francis (8 part.)
  'DE MIGUEL RODRIGUEZ FRANCESC': 'DE MIGUEL RODRIGUEZ FRANCIS',
  // RUEDA CASTRO Jorge (18 part.)
  'RUEDA CASTRO JORDI': 'RUEDA CASTRO JORGE',
  // GOMEZ SERRA Cesar (5 part.)
  'GOMEZ SERRA CESAR A.': 'GOMEZ SERRA CESAR',
  // PEREZ SANCHEZ David Jose (7 part.)
  'PEREZ SANCHEZ DAVID': 'PEREZ SANCHEZ DAVID JOSE',
  // SANCHEZ TORRES Felix Antonio (16 part.)
  'SANCHEZ TORRES FELIX': 'SANCHEZ TORRES FELIX ANTONIO',
  // JIMENEZ MEJIAS Tolo (5 part.)
  'JIMENEZ TOLO': 'JIMENEZ MEJIAS TOLO',
  // PETIT CANTERO Genis (3 part.)
  'PETIT GENIS': 'PETIT CANTERO GENIS',
  // ORTEGA PIJUAN Alba (13 part.)
  'ORTEGA ALBA': 'ORTEGA PIJUAN ALBA',
  // GALERA LOPEZ DE FELIPE Julia (10 part.)
  'GALERA LOPEZ JULIA': 'GALERA LOPEZ DE FELIPE JULIA',
  // NUNEZ FERNANDEZ Jose Antonio (6 part.)
  'NUNEZ JOSE ANTONIO': 'NUNEZ FERNANDEZ JOSE ANTONIO',
  // VON AREND SALLARES Patricia (4 part.)
  'VON AREND PATRICIA': 'VON AREND SALLARES PATRICIA',
  // MONTERO CAPELLADES Blai (4 part.)
  'MONTERO CAPELLANES BLAI': 'MONTERO CAPELLADES BLAI',
  // RODRIGUEZ BIFET Didac (7 part.)
  'RODRIGUEZ BITEF DIDAC': 'RODRIGUEZ BIFET DIDAC',
  'RODRIGUET BIFET DIDAC': 'RODRIGUEZ BIFET DIDAC',
  // ESCARABAJAL BELZUNCE Jose Maria (2 part.)
  'ESCARBAJAL BELZUNCE JOSE MARIA': 'ESCARABAJAL BELZUNCE JOSE MARIA',
  // COSTA RIQUILLO Jordi (2 part.)
  'COSTA RIGUILLO JORDI': 'COSTA RIQUILLO JORDI',
  // VALENTIN FERNANDEZ MATHIEU Marco (2 part.)
  'VALENTIN-FERNANDEZ MATHIEU MARCO': 'VALENTIN FERNANDEZ MATHIEU MARCO',
  // ARAGON BOLUFER Emma (2 part.)
  'ARAGON BOWFER EMMA': 'ARAGON BOLUFER EMMA',
  // GARCIA CASTELLANOS Maria Luisa (11 part.)
  'GARCIA CASTELLANO MARIA LUISA': 'GARCIA CASTELLANOS MARIA LUISA',
  // PEREZ DE TUDELA ALBALAT Maria (30 part.)
  'PEREZ DE TUDELA ALBA MARIA': 'PEREZ DE TUDELA ALBALAT MARIA',
  // PEREZ DE TUDELA ALBALAT Laia (16 part.)
  'PEREZ DE TUDELA ALBA LAIA': 'PEREZ DE TUDELA ALBALAT LAIA'
};

var US_ALIAS_TARGETS = {};
Object.keys(US_NAME_ALIASES).forEach(function(k) { US_ALIAS_TARGETS[US_NAME_ALIASES[k]] = true; });

// ── Construcció de l'índex arquer → participacions ───────────
function _usBuildIndex() {
  var idx = {};
  (_usAllSeasonsData || []).forEach(function(comp) {
    (comp.divisions || []).forEach(function(div) {
      (div.archers || []).forEach(function(a) {
        if (!a.name) return;
        var rawKey = _usNorm(a.name);
        var key = US_NAME_ALIASES[rawKey] || rawKey;
        if (!idx[key]) idx[key] = { display: a.name, entries: [] };
        if (key !== rawKey) {
          // variant d'un àlies: no pot imposar la seva etiqueta (pot ser l'errata)
        } else if (US_ALIAS_TARGETS[key]) {
          // nom canònic d'un àlies: és l'etiqueta que es mostra
          idx[key].display = a.name; idx[key].fixed = true;
        } else if (!idx[key].fixed && a.name.length > idx[key].display.length) {
          // Com a etiqueta, prefereix la variant més "completa" (amb accents)
          idx[key].display = a.name;
        }
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
  if (key !== _usSelected) _usTypeFilter = 'all';
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

// ── Filtre per modalitat ──────────────────────────────────────
// Les dades fan servir 'trd' per a 3D (algunes entrades antigues, '3d').
var _US_FILTERS = [
  { key: 'all',  label: 'Totes' },
  { key: 'al',   label: 'Aire Lliure' },
  { key: 'sala', label: 'Sala' },
  { key: 'camp', label: 'Camp' },
  { key: 'trd',  label: '3D' }
];
function _usTypeKey(t) { return t === '3d' ? 'trd' : t; }

function usSetTypeFilter(t) {
  _usTypeFilter = t;
  if (_usSelected) _usRenderReport(_usSelected);
}

// ── Informe personal ──────────────────────────────────────────
function _usRenderReport(key) {
  var content = document.getElementById('usContent');
  if (!content) return;
  var e = _usIndex[key];
  if (!e) { _usRenderIdle(); return; }

  var allEntries = e.entries.slice().sort(function(a,b){ return b.dateISO.localeCompare(a.dateISO); });

  // Recompte per modalitat (sobre totes les participacions, per als botons del filtre)
  var typeCount = { all: allEntries.length };
  allEntries.forEach(function(en) {
    var t = _usTypeKey(en.type);
    typeCount[t] = (typeCount[t] || 0) + 1;
  });
  var entries = (_usTypeFilter === 'all')
    ? allEntries
    : allEntries.filter(function(en) { return _usTypeKey(en.type) === _usTypeFilter; });

  // Clubs representats (per si ha canviat de club al llarg del temps).
  // _csNormCode unifica variants numèriques/alfabètiques/text del mateix
  // club (p.ex. dos codis Ianseo diferents pel mateix club).
  var clubSet = {};
  allEntries.forEach(function(en){
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
        '<span>🏹 ' + allEntries.length + ' participaci' + (allEntries.length === 1 ? 'ó' : 'ons') + '</span>' +
      '</div>' +
    '</div>';

  var filterBar =
    '<div class="filters us-type-filters">' +
      _US_FILTERS.map(function(f) {
        var n = typeCount[f.key] || 0;
        var icon = (f.key !== 'all' && _CS_TYPE_ICONS[f.key]) ? _CS_TYPE_ICONS[f.key] + ' ' : '';
        return '<button class="fb' + (_usTypeFilter === f.key ? ' act' : '') + '"' +
          (n === 0 && f.key !== 'all' ? ' disabled style="opacity:.45;cursor:default"' : '') +
          dataAttr('onclick', 'usSetTypeFilter', [f.key]) + '>' +
          icon + escHtml(f.label) + ' (' + n + ')</button>';
      }).join('') +
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

  content.innerHTML = header + filterBar + bestHtml + table;
}

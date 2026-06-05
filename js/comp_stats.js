// comp_stats.js – Sub-pàgina d'estadístiques de competicions
// Dades: data/competition_stats_full.json (generat per fetch_stats.js)
// ──────────────────────────────────────────────────────────────────────

var _csData    = null;   // dades carregades
var _csLoading = false;
var _csClub    = 'all';  // filtre actiu de club
var _csType    = 'all';  // filtre actiu de disciplina

var _CS_TYPE_LABELS  = { all:'Totes', al:'Aire Lliure', sala:'Sala – 18m', camp:'Tir de Camp', trd:'3D / Bosc' };
var _CS_TYPE_ICONS   = { al:'🏹', sala:'🏟️', camp:'🌲', trd:'🌄' };
var _CS_TYPE_COLORS  = { al:'var(--navy)', sala:'var(--navy-light)', camp:'#b87a00', trd:'#2a7d3f' };
var _CS_TYPE_BORDER  = { al:'#1B3A6B', sala:'#2E5FA3', camp:'#b87a00', trd:'#2a7d3f' };

// ── Normalització de clubs ──────────────────────────────────
// Ianseo usa IDs numèrics (1020) o alfabètics (CAM) per al mateix club.
// ALIAS_MAP: ID numèric → codi alfabètic canònic
var _CS_ALIAS = {
  '1020':'CAM',  '1049':'CTTA', '1110':'CATER','1116':'CTAP', '1118':'CAD',
  '1123':'TEM',  '2048':'CACV', '2056':'ASCEL','2132':'CAFF', '2158':'ACC',
  '2166':'CCTA', '2170':'CTACM','2182':'CTAD', '2210':'CEAB', '2220':'CEAS',
  '2300':'ATALC','2308':'TAE',  '2341':'CARB', '2415':'CTAU', '2428':'CAESC',
  '2504':'ADMAT','2505':'CAPUIG','2524':'CTASA','2529':'CASCV','2563':'CTAR',
  '2566':'CTALL','2619':'CPIN', '2662':'CTAZB','2677':'CAESC2','2680':'CTAMO',
  '2683':'MAN',  '2684':'MAESTRAT','2692':'CETADS','2711':'ALCAL','2747':'CIERZO',
  '2753':'CAUTD','2783':'CAVIL','9996':'CALM2', '9999':'CTABG',
  // Altres variants del mateix club
  '1038':'DIARC','1058':'ALFAJ','1081':'GEZI', '1126':'ZUGA',
  '2029':'MERC', '2088':'ARCOS','2107':'TERUL','2143':'VALDE',
  '2282':'JAURT','2368':'MALP', '2391':'SABIN','2404':'ARCOM',
  '2407':'VALDE2','2414':'GETXO','2465':'ARFIN','2677':'MERCD'
};

// Noms canònics per mostrar (codi → nom complet)
var _CS_NAMES = {
  'CAM':   'Club Arc Montjuïc',
  'CCTA':  'Club Català de Tir amb Arc',
  'CTAF':  'Club Tir amb Arc Les Franqueses',
  'CTACM': 'Club Tir amb Arc Caldes de Montbui',
  'CACV':  'Club Arquers Cerdanyola del Vallès',
  'CATER': 'Club Arquers Terrassa',
  'TAO':   'Club Tir Arc Olesa de Montserrat',
  'CTTA':  'Club Tau de Tir amb Arc',
  'CETADS':'Club Esportiu Tir Arc Draco Sagitaris',
  'CEAB':  'Club Escola Arquers Barcelona',
  'CASCV': 'Club Arquers Sant Cugat del Vallès',
  'CTAR':  'Club Tiro con Arco Rubí',
  'CTASA': 'Club Tir amb Arc Sant Andreu de la Barca',
  'CAOLI': 'Club Arquers Olivella',
  'ASCEL': 'Arc Sant Celoni',
  'CAVF':  'Club Arquers Vallfosca',
  'ACC':   'Arquers Club Castelldefels',
  'CTAP':  'Tir amb Arc Pardinyes',
  'CTAA':  "Club Tir amb Arc l'Arboç",
  'CTAD':  'Club Tir amb Arc El Prat de Llobregat',
  'MAN':   'Club Tir amb Arc Manresa',
  'CTALL': 'Club Tir amb Arc Lleida',
  'CEAS':  'Club Escola Arc Set',
  'ATALC': 'T.A. La Conxorxa',
  'TAE':   'C.T. Arc Encamp',
  'CTAU':  'T.A. Urgell',
  'CAOLI': 'Club Arquers Olivella',
  'CACAT': 'Club Arquers de Catalunya',
  'CACAM': 'Club Arquers Cambrils',
  'CAD':   'Club Arquers Dosrius',
  'TEM':   'Club Tir Esportiu Mataró',
  'CTAM':  'Club Tir amb Arc Montblanc',
  'CAMO':  'Club Arquers Montblanc',
  'TAFIG': 'Tir amb Arc Figueres',
  'CTAZB': 'Club Tir amb Arc Zen del Bages',
  'CAESC': 'Club Arquers Esclanyà',
  'CAFF':  'Club Arquers Torrefarrera',
  'CTAVG': 'Club Tir amb Arc Vila-seca',
  'CTAP2': 'Club Tir amb Arc Pau',
  'PAC':   'Club Arc Parc',
  'CTACD': 'Club Tir amb Arc Cardedeu',
  'CTALL': 'Club Tir amb Arc Lleida',
  'CCAR':  'Club Tir amb Arc Castellnou de Bages',
  'CAAC':  'Club Arquers Alt Camp',
  'CTACB': 'Club Tir amb Arc Costa Brava',
  'CTAU':  'T.A. Urgell'
};

/** Retorna el codi canònic d'un club (unifica numèrics i alfabètics) */
function _csNormCode(rawCode) {
  var c = (rawCode || '').trim();
  return _CS_ALIAS[c] || c;
}

/** Retorna el nom de display d'un codi canònic */
function _csClubLabel(code) {
  return _CS_NAMES[code] || code;
}

// ── Tab switch ──────────────────────────────────────────────
function setCompTab(tab, btn) {
  document.querySelectorAll('.comp-stab').forEach(function(b) { b.classList.remove('act'); });
  btn.classList.add('act');
  var cal   = document.getElementById('compCalendari');
  var panel = document.getElementById('compStatsPanel');
  if (cal)   cal.style.display   = (tab === 'calendari') ? '' : 'none';
  if (panel) panel.style.display = (tab === 'stats')     ? '' : 'none';
  if (tab === 'stats') _csInit();
}

// ── Càrrega de dades ────────────────────────────────────────
function _csInit() {
  if (_csData)    { _csRender(); return; }
  if (_csLoading) return;
  _csLoading = true;
  var panel = document.getElementById('compStatsPanel');
  panel.innerHTML = '<div class="cs-loading">Carregant estadístiques…</div>';

  fetch('data/competition_stats_full.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      _csData    = d;
      _csLoading = false;
      _csRender();
    })
    .catch(function(err) {
      _csLoading = false;
      document.getElementById('compStatsPanel').innerHTML =
        '<div class="cs-loading cs-error">No s\'han pogut carregar les dades: ' + err.message + '</div>';
    });
}

// ── Llista de clubs (normalitzats, sense duplicats) ─────────
// Retorna mapa { canonicCode → displayName }
var _csClubMap = null;
function _csGetClubMap() {
  if (_csClubMap) return _csClubMap;
  _csClubMap = {};
  (_csData || []).forEach(function(c) {
    (c.divisions || []).forEach(function(d) {
      (d.archers || []).forEach(function(a) {
        var code = _csNormCode(a.club);
        if (!code) return;
        // Prefereix: nom hardcoded > clubName del JSON > codi
        if (!_csClubMap[code]) {
          _csClubMap[code] = _CS_NAMES[code] || a.clubName || code;
        } else if (!_CS_NAMES[code] && a.clubName && _csClubMap[code] === code) {
          _csClubMap[code] = a.clubName; // actualitza si tenim nom real
        }
      });
    });
  });
  return _csClubMap;
}

function _csClubs() {
  var map = _csGetClubMap();
  return Object.keys(map).sort(function(a,b){
    return (map[a]||a).localeCompare(map[b]||b, 'ca');
  });
}

// Override _csClubLabel to also use runtime map
function _csClubLabel(code) {
  var map = _csClubMap || {};
  return _CS_NAMES[code] || map[code] || code;
}

// ── Filtrat per club (retorna còpia amb comptadors recalculats) ──
function _csFilter(club, type) {
  return (_csData || []).map(function(comp) {
    // Competicions amb tipus diferent al filtre → excloure
    if (type !== 'all' && comp.type !== type) return null;

    var fDivisions = (comp.divisions || []).map(function(d) {
      var archers = (club === 'all')
        ? (d.archers || [])
        : (d.archers || []).filter(function(a) {
            return _csNormCode(a.club) === club;
          });
      var scores = archers.filter(function(a){ return a.score > 0; }).map(function(a){ return a.score; });
      return {
        name: d.name,
        count: archers.length,
        scoreMax: scores.length ? Math.max.apply(null, scores) : null,
        scoreAvg: scores.length ? Math.round(scores.reduce(function(s,v){return s+v;},0) / scores.length) : null
      };
    }).filter(function(d){ return d.count > 0; });

    var fTotal = fDivisions.reduce(function(s,d){ return s + d.count; }, 0);
    return Object.assign({}, comp, { fTotal: fTotal, fDivisions: fDivisions });
  }).filter(Boolean);
}

// ── Render principal ─────────────────────────────────────────
function _csRender() {
  var panel  = document.getElementById('compStatsPanel');
  var clubs  = _csClubs();

  var clubOpts = '<option value="all">Tots els clubs</option>' +
    clubs.map(function(c) {
      var label = _csClubLabel(c);
      return '<option value="' + escHtml(c) + '"' +
        (_csClub === c ? ' selected' : '') + '>' + escHtml(label || c) + '</option>';
    }).join('');

  var typeOpts = ['all','al','sala','camp','trd'].map(function(t) {
    var icon  = _CS_TYPE_ICONS[t]  ? _CS_TYPE_ICONS[t]  + ' ' : '';
    return '<option value="' + t + '"' + (_csType === t ? ' selected' : '') + '>' +
      icon + _CS_TYPE_LABELS[t] + '</option>';
  }).join('');

  panel.innerHTML =
    '<div class="cs-toolbar">' +
      '<div class="cs-filter-group">' +
        '<label class="cs-filter-label">🏛️ Club</label>' +
        '<select id="csClubSel" class="cs-select" onchange="_csOnClub(this.value)">' + clubOpts + '</select>' +
      '</div>' +
      '<div class="cs-filter-group">' +
        '<label class="cs-filter-label">🏹 Modalitat</label>' +
        '<select id="csTypeSel" class="cs-select" onchange="_csOnType(this.value)">' + typeOpts + '</select>' +
      '</div>' +
    '</div>' +
    '<div id="csContent"></div>';

  _csContent();
}

function _csOnClub(val) { _csClub = val; _csContent(); }
function _csOnType(val) { _csType = val; _csContent(); }

// ── Contingut (recalculat en cada canvi de filtre) ──────────
function _csContent() {
  var data    = _csFilter(_csClub, _csType);
  var content = document.getElementById('csContent');
  if (!data.length) {
    content.innerHTML = '<div class="cs-empty">Cap dada disponible per a la selecció actual.</div>';
    return;
  }

  content.innerHTML =
    _csCards(data) +
    _csBars(data)  +
    _csDivTable(data);
}

// ── Cards de resum per modalitat ─────────────────────────────
function _csCards(data) {
  var types = ['al','sala','camp','trd'];
  var cards = types.map(function(t) {
    var comps      = data.filter(function(c){ return c.type === t; });
    if (!comps.length) return '';
    var total      = comps.reduce(function(s,c){ return s + c.fTotal; }, 0);
    var avgPerComp = comps.length ? Math.round(total / comps.length) : 0;

    // 3D línia vs bosc (subdivisió interna del type 'trd')
    var linia = comps.filter(function(c){ return /l[íi]nia/i.test(c.title); });
    var bosc  = comps.filter(function(c){ return !/l[íi]nia/i.test(c.title); });
    var extra = '';
    if (t === 'trd' && linia.length && bosc.length) {
      var tLinia = linia.reduce(function(s,c){return s+c.fTotal;},0);
      var tBosc  = bosc .reduce(function(s,c){return s+c.fTotal;},0);
      extra = '<div class="cs-disc-sub">' +
        '<span>Bosc: <b>' + tBosc + '</b></span> · <span>En línia: <b>' + tLinia + '</b></span>' +
      '</div>';
    }

    return '<div class="cs-disc-card cs-disc-' + t + '">' +
      '<div class="cs-disc-icon">' + (_CS_TYPE_ICONS[t]||'') + '</div>' +
      '<div class="cs-disc-name">' + _CS_TYPE_LABELS[t] + '</div>' +
      '<div class="cs-disc-total">' + total + '</div>' +
      '<div class="cs-disc-meta">' + comps.length + ' tirades · ~' + avgPerComp + '/tirada</div>' +
      extra +
    '</div>';
  }).filter(Boolean).join('');

  if (!cards) return '';
  return '<div class="cs-section">' +
    '<h3 class="cs-h3">Participació per modalitat</h3>' +
    '<div class="cs-disc-cards">' + cards + '</div>' +
  '</div>';
}

// ── Barres de participació per tirada ────────────────────────
function _csBars(data) {
  var sorted  = data.slice().sort(function(a,b){ return a.dateISO.localeCompare(b.dateISO); });
  var maxPart = Math.max.apply(null, sorted.map(function(c){ return c.fTotal; }).concat([1]));

  var rows = sorted.map(function(c) {
    var pct   = c.fTotal ? Math.round((c.fTotal / maxPart) * 100) : 0;
    var color = _CS_TYPE_COLORS[c.type] || 'var(--navy)';
    var short = c.title.length > 52 ? c.title.substring(0,50) + '…' : c.title;
    var ym    = c.dateISO.substring(0,7);
    var disc  = _CS_TYPE_LABELS[c.type] || c.type;
    var barContent = '<div class="cs-bar-fill" style="width:' + Math.max(pct,1) + '%;background:' + color + '"></div>';
    var valContent = '<span class="cs-bar-val">' + c.fTotal + '</span>';
    return '<div class="cs-bar-row">' +
      '<div class="cs-bar-label" title="' + escHtml(c.title) + '">' +
        '<span class="cs-bar-date">' + ym + '</span>' +
        '<span class="cs-bar-disc cs-bc-' + c.type + '">' + disc + '</span>' +
        escHtml(short) +
      '</div>' +
      '<div class="cs-bar-wrap">' + barContent + valContent + '</div>' +
    '</div>';
  }).join('');

  if (!rows) return '';
  return '<div class="cs-section">' +
    '<h3 class="cs-h3">Participació per tirada <span class="cs-h3-sub">(ordre cronològic)</span></h3>' +
    '<div class="cs-bars">' + rows + '</div>' +
  '</div>';
}

// ── Taula de tendències per divisió ─────────────────────────
function _csDivTable(data) {
  // Agrupa per nom de divisió
  var divMap = {};
  data.forEach(function(comp) {
    var compLabel = comp.dateISO.substring(0,7) + ' ' + (comp.title||'').substring(0,30);
    (comp.fDivisions || []).forEach(function(d) {
      if (!divMap[d.name]) divMap[d.name] = { name: d.name, count:0, appearances:0, scoreMax:0, scoreSum:0, scoreWt:0, types:{} };
      var e = divMap[d.name];
      e.count       += d.count;
      e.appearances++;
      e.types[comp.type] = (e.types[comp.type]||0) + 1;
      if (d.scoreMax) e.scoreMax = Math.max(e.scoreMax, d.scoreMax);
      if (d.scoreAvg && d.count > 0) { e.scoreSum += d.scoreAvg * d.count; e.scoreWt += d.count; }
    });
  });

  var rows = Object.values(divMap).sort(function(a,b){ return b.count - a.count; });
  var total = rows.reduce(function(s,r){ return s + r.count; }, 0);

  var trs = rows.map(function(d) {
    var avg    = d.appearances ? Math.round(d.count / d.appearances) : 0;
    var scAvg  = d.scoreWt ? Math.round(d.scoreSum / d.scoreWt) : '–';
    var scMax  = d.scoreMax || '–';
    var typeDots = Object.keys(d.types).map(function(t){
      return '<span class="cs-td-dot cs-bc-' + t + '" title="' + _CS_TYPE_LABELS[t] + '">●</span>';
    }).join('');
    return '<tr>' +
      '<td class="cs-div-name">' + escHtml(d.name) + ' ' + typeDots + '</td>' +
      '<td class="cs-num">' + d.appearances + '</td>' +
      '<td class="cs-num">' + d.count + '</td>' +
      '<td class="cs-num">' + avg + '</td>' +
      '<td class="cs-num cs-score-avg">' + scAvg + '</td>' +
      '<td class="cs-num cs-score-max">' + scMax + '</td>' +
    '</tr>';
  }).join('');

  return '<div class="cs-section">' +
    '<h3 class="cs-h3">Tendències per divisió ' +
      '<span class="cs-h3-sub">(' + rows.length + ' divisions · ' + total + ' participacions totals)</span>' +
    '</h3>' +
    '<div class="cs-table-wrap">' +
      '<table class="cs-table">' +
        '<thead><tr>' +
          '<th>Divisió</th><th>Tirades</th><th>Part. total</th><th>Mitj./tirada</th><th>Puntuació mitjana</th><th>Puntuació màx.</th>' +
        '</tr></thead>' +
        '<tbody>' + trs + '</tbody>' +
      '</table>' +
    '</div>' +
  '</div>';
}

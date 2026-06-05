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

/** Normalitza el gènere en noms de divisió (Men→Home, Women→Dona, etc.) */
function _csNormDivName(name) {
  return name
    .replace(/\bWomen\b/g, 'Dona')
    .replace(/\bMujer\b/g, 'Dona')
    .replace(/\bMen\b/g, 'Home')
    .replace(/\bHombre\b/g, 'Home');
}

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
      d.forEach(function(c) {
        (c.divisions || []).forEach(function(div) {
          div.name = _csNormDivName(div.name);
        });
      });
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
    _csCards(data)    +
    _csBars(data)     +
    _csDivChart(data);
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

// ══════════════════════════════════════════════════════════
// ── Gràfics cronològics de puntuació màxima per categoria ──
// ══════════════════════════════════════════════════════════

// Grups de categories (per normalitzar noms en múltiples idiomes)
var _CS_CATS = [
  { key:'recorbat',    label:'Recorbat / Recurve',  re:/recorb|recurv/i },
  { key:'compost',     label:'Compost / Compound',  re:/compost|compuest|compound/i },
  { key:'nu',          label:'Nu / Barebow',         re:/\bnu\s*[-–]|\bbarebow\b|\bdesnudo\b/i },
  { key:'tradicional', label:'Tradicional',          re:/tradicional|traditional/i },
  { key:'longbow',     label:'Long Bow',             re:/longbow|long[\s.]?bow/i },
];

// Colors per a les classes dins cada categoria
var _CS_COLORS = [
  '#1B3A6B','#C0392B','#E67E22','#27AE60','#8E44AD',
  '#2980B9','#16A085','#F39C12','#7F8C8D','#D35400','#C0392B',
];

// Estat actiu de la categoria per cada tipus de competició
var _csActiveCat = {};
// Estat actiu de les classes per "type:cat" → null=totes, o array de noms actius
var _csActiveCls = {};

function _csCatOf(divName) {
  for (var i = 0; i < _CS_CATS.length; i++) {
    if (_CS_CATS[i].re.test(divName)) return _CS_CATS[i].key;
  }
  return null;
}

function _csCatLabel(key) {
  for (var i = 0; i < _CS_CATS.length; i++) {
    if (_CS_CATS[i].key === key) return _CS_CATS[i].label;
  }
  return key;
}

/** Extreu la variant de classe eliminant el prefix de categoria */
function _csClassVariant(divName) {
  var idx = divName.search(/\s[-–]\s/);
  if (idx >= 0) return divName.substring(idx + 3).trim();
  for (var i = 0; i < _CS_CATS.length; i++) {
    var s = divName.replace(_CS_CATS[i].re, '').replace(/^\s*[-–]?\s*/, '').trim();
    if (s !== divName && s) return s;
  }
  return divName;
}

/** Canvi de categoria → reconstrueix el contingut */
function _csCatSet(type, cat) {
  _csActiveCat[type] = cat;
  delete _csActiveCls[type + ':' + cat]; // reset classe filtre
  _csContent();
}

/** Toggle d'una classe individual */
function _csClsToggle(type, cat, cls) {
  var key = type + ':' + cat;
  // Obté la llista actual (null = totes actives)
  var cur = _csActiveCls[key] || null;
  // Recull totes les classes disponibles per reset
  var allCls = _csAllClsFor(type, cat);

  if (!cur) {
    // Totes actives → activa només la clicada
    _csActiveCls[key] = [cls];
  } else {
    var idx = cur.indexOf(cls);
    if (idx >= 0) {
      // Desactiva
      var next = cur.filter(function(c){ return c !== cls; });
      _csActiveCls[key] = next.length ? next : null; // si 0 → totes
    } else {
      // Activa
      var added = cur.concat([cls]);
      _csActiveCls[key] = (added.length === allCls.length) ? null : added; // totes → null
    }
  }
  _csContent();
}

/** Retorna totes les classes disponibles per un type+cat (del dataset raw) */
function _csAllClsFor(type, cat) {
  var all = (_csData || []).filter(function(c){ return c.type === type; });
  var set = {};
  all.forEach(function(c) {
    // Usa divisions raw (amb archers) o fDivisions si disponible
    var divs = c.fDivisions || c.divisions || [];
    divs.forEach(function(d) {
      if (!_csCatOf(d.name)) return;
      if (_csCatOf(d.name) !== cat) return;
      // Comprova si hi ha puntuació (scoreMax en fDivisions o archers en divisions)
      var hasData = d.scoreMax || (d.archers && d.archers.some(function(a){ return a.score > 0; }));
      if (hasData) set[d.name] = true;
    });
  });
  return Object.keys(set).sort(function(a,b){ return a.length - b.length || a.localeCompare(b,'ca'); });
}

// ── Gràfic principal ────────────────────────────────────────
function _csDivChart(data) {
  var types = (_csType === 'all') ? ['al','sala','camp','trd'] : [_csType];

  var blocks = types.map(function(t) {
    // Competicions d'aquest tipus amb dades, ordenades cronològicament
    var comps = data
      .filter(function(c){ return c.type === t && c.fDivisions && c.fDivisions.length; })
      .slice().sort(function(a,b){ return a.dateISO.localeCompare(b.dateISO); });
    if (!comps.length) return '';

    // Categories presents
    var catSet = {};
    comps.forEach(function(c) {
      (c.fDivisions||[]).forEach(function(d) {
        var cat = _csCatOf(d.name);
        if (cat && d.scoreMax) catSet[cat] = true;
      });
    });
    var cats = Object.keys(catSet);
    if (!cats.length) return '';

    // Categoria activa (fallback al primer disponible)
    if (!_csActiveCat[t] || !catSet[_csActiveCat[t]]) _csActiveCat[t] = cats[0];
    var activeCat = _csActiveCat[t];

    // Botons de categoria
    var catBtns = cats.map(function(cat) {
      return '<button class="cs-cat-btn' + (cat === activeCat ? ' act' : '') +
        '" onclick="_csCatSet(\'' + t + '\',\'' + cat + '\')">' +
        escHtml(_csCatLabel(cat)) + '</button>';
    }).join('');

    // Botons de classe per la categoria activa
    var clsKey   = t + ':' + activeCat;
    var allCls   = _csAllClsFor(t, activeCat);
    var activeCls = _csActiveCls[clsKey] || null; // null = totes

    var clsBtns = allCls.map(function(cls) {
      var variant  = _csClassVariant(cls);
      var isActive = !activeCls || activeCls.indexOf(cls) >= 0;
      return '<button class="cs-cls-btn' + (isActive ? ' act' : '') +
        '" onclick="_csClsToggle(\'' + t + '\',\'' + activeCat + '\',\'' + cls.replace(/'/g,"\\'") + '\')">' +
        escHtml(variant) + '</button>';
    }).join('');

    return '<div class="cs-chart-block">' +
      '<div class="cs-chart-header">' +
        '<span class="cs-chart-type-badge cs-bc-' + t + '">' + (_CS_TYPE_ICONS[t]||'') + ' ' + escHtml(_CS_TYPE_LABELS[t]) + '</span>' +
      '</div>' +
      '<div class="cs-cat-tabs">' + catBtns + '</div>' +
      (clsBtns ? '<div class="cs-cls-tabs">' + clsBtns + '</div>' : '') +
      _csBuildSvg(comps, activeCat, activeCls) +
    '</div>';
  }).filter(Boolean).join('');

  if (!blocks) return '';
  return '<div class="cs-section">' +
    '<h3 class="cs-h3">Evolució de puntuació màxima ' +
      '<span class="cs-h3-sub">(per categoria · ordre cronològic)</span>' +
    '</h3>' +
    blocks +
  '</div>';
}

// ── Construcció del SVG ─────────────────────────────────────
function _csBuildSvg(comps, cat, activeCls) {
  // Recull totes les classes de la categoria que tinguin scoreMax
  var classSet = {};
  comps.forEach(function(c) {
    (c.fDivisions||[]).forEach(function(d) {
      if (_csCatOf(d.name) === cat && d.scoreMax) classSet[d.name] = true;
    });
  });
  var allClasses = Object.keys(classSet);
  allClasses.sort(function(a,b){ return a.length - b.length || a.localeCompare(b,'ca'); });

  // Aplica filtre de classes (activeCls=null → totes)
  var classes = activeCls
    ? allClasses.filter(function(c){ return activeCls.indexOf(c) >= 0; })
    : allClasses;

  if (!classes.length) return '<div class="cs-chart-empty">Sense dades de puntuació per a aquesta categoria.</div>';

  // Matriu [classe][comp] = scoreMax | null
  var maxY = 0;
  var matrix = {};
  classes.forEach(function(cls) {
    matrix[cls] = comps.map(function(c) {
      var div = null;
      for (var i = 0; i < (c.fDivisions||[]).length; i++) {
        if (c.fDivisions[i].name === cls) { div = c.fDivisions[i]; break; }
      }
      var v = (div && div.scoreMax) ? div.scoreMax : null;
      if (v && v > maxY) maxY = v;
      return v;
    });
  });
  if (!maxY) return '<div class="cs-chart-empty">Sense puntuacions disponibles.</div>';

  // Dimensions SVG
  var W = 880, H = 300;
  var PAD = { top:24, right:20, bottom:72, left:58 };
  var PW = W - PAD.left - PAD.right;
  var PH = H - PAD.top - PAD.bottom;
  var n  = comps.length;

  function xPos(i) { return PAD.left + (n < 2 ? PW/2 : i * PW / (n-1)); }
  function yPos(v) { return PAD.top + PH - Math.round(v / maxY * PH); }

  var out = [];

  // Grid horitzontal
  var YTICKS = 5;
  for (var yi = 0; yi <= YTICKS; yi++) {
    var yv = Math.round(maxY * yi / YTICKS);
    var yp = yPos(yv);
    out.push('<line x1="'+PAD.left+'" y1="'+yp+'" x2="'+(W-PAD.right)+'" y2="'+yp+'" stroke="#E8ECF3" stroke-width="1"/>');
    out.push('<text x="'+(PAD.left-6)+'" y="'+(yp+4)+'" text-anchor="end" font-family="Barlow,sans-serif" font-size="11" fill="#5a6475">'+yv+'</text>');
  }

  // Etiquetes eix X (data i seu curta)
  comps.forEach(function(c, i) {
    var x  = xPos(i);
    var ym = c.dateISO.substring(2,7).replace('-','.');  // "25.10"
    // Extrau nom curt de seu (part darrera " – " si existeix)
    var seuIdx = c.title.lastIndexOf(' – ');
    var seu = seuIdx >= 0 ? c.title.substring(seuIdx+3,seuIdx+7) : '';
    var lbl = ym + (seu ? ' ' + seu : '');
    var baseY = PAD.top + PH + 14;
    out.push(
      '<text transform="rotate(-45,'+x+','+baseY+')" x="'+x+'" y="'+baseY+'" '+
      'text-anchor="end" font-family="Barlow,sans-serif" font-size="10" fill="#5a6475">'+
      escHtml(lbl)+'</text>'
    );
    // Línia vertical lleugera
    out.push('<line x1="'+x+'" y1="'+PAD.top+'" x2="'+x+'" y2="'+(PAD.top+PH)+'" stroke="#E8ECF3" stroke-width="1" stroke-dasharray="3,3"/>');
  });

  // Eixos
  out.push('<line x1="'+PAD.left+'" y1="'+PAD.top+'" x2="'+PAD.left+'" y2="'+(PAD.top+PH)+'" stroke="#aab" stroke-width="1.5"/>');
  out.push('<line x1="'+PAD.left+'" y1="'+(PAD.top+PH)+'" x2="'+(W-PAD.right)+'" y2="'+(PAD.top+PH)+'" stroke="#aab" stroke-width="1.5"/>');

  // Línies i punts per classe
  classes.forEach(function(cls, ci) {
    var color = _CS_COLORS[ci % _CS_COLORS.length];
    var vals  = matrix[cls];

    // Línia contínua connectant tots els punts amb dada (salta els nulls)
    var pts = [];
    vals.forEach(function(v2, i2) {
      if (v2 !== null) pts.push(xPos(i2)+','+yPos(v2));
    });
    if (pts.length >= 2) {
      out.push('<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+color+'" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.9"/>');
    }

    // Punts amb tooltip
    vals.forEach(function(v3, i3) {
      if (v3 === null) return;
      var cx = xPos(i3), cy = yPos(v3);
      var tip = escHtml(comps[i3].title.replace(/\s*–\s*/g,' – ').substring(0,50)) + ': ' + v3 + ' pts';
      out.push('<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+color+'" stroke="white" stroke-width="2"><title>'+tip+'</title></circle>');
      // Etiqueta de valor sobre el punt
      out.push('<text x="'+cx+'" y="'+(cy-9)+'" text-anchor="middle" font-family="Barlow,sans-serif" font-size="10" fill="'+color+'" font-weight="700">'+v3+'</text>');
    });
  });

  // Llegenda
  var legend = classes.map(function(cls, ci) {
    var color   = _CS_COLORS[ci % _CS_COLORS.length];
    var variant = _csClassVariant(cls);
    return '<span class="cs-legend-item">'+
      '<svg width="22" height="10" style="vertical-align:middle;margin-right:4px">'+
        '<line x1="0" y1="5" x2="22" y2="5" stroke="'+color+'" stroke-width="2.5" stroke-linecap="round"/>'+
        '<circle cx="11" cy="5" r="3.5" fill="'+color+'" stroke="white" stroke-width="1.5"/>'+
      '</svg>'+
      escHtml(variant)+
    '</span>';
  }).join('');

  return '<div class="cs-chart-wrap">'+
    '<svg class="cs-svg" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img">'+
      out.join('')+
    '</svg>'+
    '<div class="cs-legend">'+legend+'</div>'+
  '</div>';
}

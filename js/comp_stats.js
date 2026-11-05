// comp_stats.js – Dades i normalització compartides d'estadístiques de
// competicions (càrrega per temporada, noms de divisions i clubs). La
// pestanya pública d'Estadístiques de Competicions s'ha retirat; aquest
// fitxer només alimenta js/user_stats.js (Les Meves Estadístiques).
// Dades: docs/competition_stats_<temporada>.json (generat per
// data/fetch_stats.js), un fitxer per temporada — veure CS_SEASONS.
// IMPORTANT: NO a data/ — a Railway hi ha un volum persistent muntat a
// /app/data (per no perdre fcta.db en cada deploy), que substitueix tot
// el contingut d'aquell directori pel del volum. Un fitxer estàtic dins
// data/ quedaria invisible en producció (ENOENT). docs/ es serveix
// estàticament i no forma part del volum.
// ──────────────────────────────────────────────────────────────────────

// ── Temporades ────────────────────────────────────────────
// Cada temporada és un fitxer independent. La temporada "actual" és la
// que s'omple en curs (buida fins que hi hagi resultats); les altres
// són arxiu històric, de només lectura. Per començar-ne una de nova:
// afegir una entrada aquí + fer que data/fetch_stats.js hi escrigui.
var CS_SEASONS = {
  '2026-27': { label: 'Temporada 2026/2027', file: 'docs/competition_stats_2026-27.json' },
  '2025-26': { label: 'Temporada 2025/2026', file: 'docs/competition_stats_2025-26.json' }
};
var CS_SEASON_ORDER   = ['2026-27', '2025-26']; // més nova primer
var CS_CURRENT_SEASON = '2026-27';

var _csSeasonCache  = {};  // { seasonKey: dades } — caché per temporada, un cop carregada
var _csLoading = {};       // { seasonKey: bool }

var _CS_TYPE_LABELS  = { all:'Totes', al:'Aire Lliure', sala:'Sala – 18m', camp:'Camp', trd:'3D / Bosc' };
var _CS_TYPE_ICONS   = { al:'☀️', sala:'🎯', camp:'🍁', trd:'🌄' };

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

/** Normalitza el gènere en noms de divisió (hombre/Home/Men → Home,
 *  mujer/Dona/Women → Dona, singular i plural). Sense distinció de
 *  majúscules/minúscules perquè les diferents federacions (RFETA/FCTA/
 *  Ianseo) no fan servir la mateixa capitalització als seus exports. */
function _csNormDivName(name) {
  return name
    .replace(/\b(Women|Mujeres|Mujer)\b/gi, 'Dona')
    .replace(/\b(Men|Hombres|Hombre)\b/gi, 'Home');
}

// Variantes de noms de text → codi canònic
// Cobreix noms que Ianseo pot enviar com a string en lloc de codi
var _CS_NAME_VARIANTS = (function() {
  var m = {};
  // Per cada entrada de _CS_NAMES, genera la clau normalitzada
  function _k(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  Object.keys(_CS_NAMES).forEach(function(code) { m[_k(_CS_NAMES[code])] = code; });
  // Variants addicionals (abreviatures, noms antics, errors ortogràfics comuns)
  var extra = {
    // Olesa
    'tirarolesa':'TAO', 'tirambarcoles':'TAO', 'taolesa':'TAO',
    'olesademontserrat':'TAO', 'arcolesa':'TAO',
    // Rubí
    'tirconarcorubi':'CTAR', 'clubtirconarcorubi':'CTAR', 'rubi':'CTAR',
    'tirambarcruberrubi':'CTAR',
    // Sant Celoni
    'arcsantceloni':'ASCEL', 'ascel':'ASCEL',
    // Manresa
    'manresa':'MAN', 'tirambarcmanresa':'MAN',
    // Lleida
    'tirambarclleid':'CTALL', 'lleida':'CTALL',
    // Montjuïc
    'arcmontjuic':'CAM', 'clubarcmontjuic':'CAM',
    // Cerdanyola
    'arquerscerdanyola':'CACV', 'cerdanyola':'CACV',
    // Terrassa
    'arquersterrassa':'CATER', 'terrassa':'CATER',
    // Mataró
    'tiresportiumataro':'TEM', 'eltem':'TEM', 'mataro':'TEM',
    // Club Català
    'clubcatala':'CCTA', 'ccta':'CCTA', 'clubcataladetirambarc':'CCTA',
    // Les Franqueses
    'ctaf':'CTAF', 'lesfranqueses':'CTAF',
    // Castelldefels
    'arquersclubcastelldefels':'ACC', 'castelldefels':'ACC',
    // Sant Cugat
    'arquersdesantcugat':'CASCV', 'santcugat':'CASCV',
    // Pardinyes
    'pardinyes':'CTAP',
    // Sant Andreu de la Barca
    'santandreudelabarca':'CTASA',
    // Tau / CTTA
    'taudeti':'CTTA', 'clubtautirambarcola':'CTTA',
    // Draco Sagitaris
    'dracosagitaris':'CETADS',
    // Caldes de Montbui
    'caldesdmontbui':'CTACM', 'caldesmontbui':'CTACM',
    // Dosrius
    'arquersdosrius':'CAD', 'dosrius':'CAD',
    // Olivella
    'arquerosolivella':'CAOLI', 'olivella':'CAOLI',
    // Cambrils
    'arquerscambrils':'CACAM',
    // Escola Arquers Barcelona
    'escolaarquersbarcelona':'CEAB', 'ceab':'CEAB'
  };
  Object.keys(extra).forEach(function(k) { m[k] = extra[k]; });
  return m;
}());

/** Retorna el codi canònic d'un club (unifica numèrics, alfabètics i noms de text) */
function _csNormCode(rawCode) {
  var c = (rawCode || '').trim();
  // 1. Alias numèric/alfabètic directe
  if (_CS_ALIAS[c]) return _CS_ALIAS[c];
  // 2. Ja és un codi canònic conegut
  if (_CS_NAMES[c]) return c;
  // 3. Cerca per nom normalitzat (elimina accents, espais, majúscules)
  var key = c.toLowerCase()
    .replace(/[àáâãäå]/g,'a').replace(/[èéêë]/g,'e')
    .replace(/[ìíîï]/g,'i').replace(/[òóôõö]/g,'o')
    .replace(/[ùúûü]/g,'u').replace(/ñ/g,'n').replace(/ç/g,'c')
    .replace(/[^a-z0-9]/g,'');
  return _CS_NAME_VARIANTS[key] || c;
}

/** Retorna el nom de display d'un codi canònic */
function _csClubLabel(code) {
  return _CS_NAMES[code] || code;
}

// ── Càrrega de dades per temporada (compartida amb js/user_stats.js) ──
// Cada temporada es carrega i es cacheja per separat a _csSeasonCache;
// user_stats.js en pot demanar vàries alhora (historial complet d'un
// arquer) sense interferir amb la temporada activa d'aquesta pàgina.
var _csDataCbs = {}; // { seasonKey: [ {ok,err}, ... ] } — pendents mentre carrega
function _csFetchSeason(seasonKey, onSuccess, onError) {
  var season = CS_SEASONS[seasonKey];
  if (!season) { if (onError) onError(new Error('Temporada desconeguda: ' + seasonKey)); return; }
  if (_csSeasonCache[seasonKey]) { onSuccess(_csSeasonCache[seasonKey]); return; }
  if (!_csDataCbs[seasonKey]) _csDataCbs[seasonKey] = [];
  _csDataCbs[seasonKey].push({ ok: onSuccess, err: onError });
  if (_csLoading[seasonKey]) return;
  _csLoading[seasonKey] = true;

  fetch(season.file)
    .then(function(r) { return r.json(); })
    .then(function(d) {
      // Si el servidor no ha pogut servir el fitxer (p.ex. un deploy a
      // mitges, o un problema intern), pot respondre amb un objecte
      // d'error en lloc de la llista esperada — donem un missatge que
      // ajudi a diagnosticar-ho en lloc del genèric "d.forEach is not
      // a function".
      if (!Array.isArray(d)) {
        throw new Error('El servidor no ha retornat una llista vàlida per a ' + season.file + ' (proveu de refrescar amb Ctrl+Shift+R; si segueix fallant, pot ser que el darrer desplegament no s\'hagi completat).');
      }
      d.forEach(function(c) {
        (c.divisions || []).forEach(function(div) {
          div.name = _csNormDivName(div.name);
        });
      });
      _csSeasonCache[seasonKey] = d;
      _csLoading[seasonKey] = false;
      _csDataCbs[seasonKey].splice(0).forEach(function(cb){ cb.ok(d); });
    })
    .catch(function(err) {
      _csLoading[seasonKey] = false;
      _csDataCbs[seasonKey].splice(0).forEach(function(cb){ if (cb.err) cb.err(err); });
    });
}

// ── Llista de clubs (normalitzats, sense duplicats) ─────────
// Retorna mapa { canonicCode → displayName }
var _csClubMap = null;
function _csGetClubMap() {
  if (_csClubMap) return _csClubMap;
  _csClubMap = {};
  Object.keys(_csSeasonCache).forEach(function(seasonKey) {
    (_csSeasonCache[seasonKey] || []).forEach(function(c) {
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
  });
  return _csClubMap;
}

// Override _csClubLabel to also use runtime map
function _csClubLabel(code) {
  var map = _csClubMap || {};
  return _CS_NAMES[code] || map[code] || code;
}

// nav.js – Section switching & animated transitions
// Depends on: config.js (FCTA.sectionIds, FCTA.sectionMap)
// ─────────────────────────────────────────────────────────────
// To add a new section: edit FCTA.sections in config.js only.
// ─────────────────────────────────────────────────────────────

// Transition durations — must match CSS (sEnter / sExit keyframes)
var NAV_EXIT_MS  = 220;
var NAV_ENTER_MS = 380;

var _navTimer   = null;  // pending cleanup timer
var _navCurrent = null;  // element currently shown

var _SEO_TITLES = {
  home:          'FCTA – Federació Catalana de Tir amb Arc',
  circulars:     'Circulars | FCTA',
  competitions:  'Competicions | FCTA',
  news:          'Notícies | FCTA',
  formation:     'Formació | FCTA',
  social:        'Tirades Socials | FCTA',
  llicencies:    'Llicències | FCTA',
  documentacio:  'Documentació | FCTA',
  reglaments:    'Reglaments | FCTA',
  inici:         'Comença al Tir amb Arc | FCTA',
  clubs:         'Clubs federats | FCTA',
  club:          'Fitxa de club | FCTA',
  disciplina:    'Disciplines | FCTA',
  transparencia: 'Transparència | FCTA',
  assegurances:  'Assegurances | FCTA',
  juntadirectiva:'Junta Directiva | FCTA',
  arcadaptat:    'Arc Adaptat | FCTA',
  comitejutges:  'Comitè de Jutges | FCTA',
  pat:           'PAT – Programa Autonòmic de Tecnificació | FCTA',
  calendari:     'Calendari Esportiu | FCTA',
  records:       'Rècords de Catalunya | FCTA',
  regimdisciplinari: 'Règim Disciplinari | FCTA'
};

// ── Historial del navegador i botó «Tornar» ───────────────
// Cada canvi de secció crea una entrada real a l'historial (pushState), de manera que
// enrere/endavant del navegador funcionen. L'estat de cada entrada guarda: idx (profunditat
// dins del portal) i prev (nom de la pàgina d'on venim, per al text del botó «Tornar»).
var _navLastHash = null;   // evita processar dues vegades popstate + hashchange
var _navCurLabel = 'Inici';

function navLabelFor(sec) {
  if (sec === 'home') return 'Inici';
  if (sec === 'disciplina' && typeof _discActiva !== 'undefined' && _discActiva &&
      typeof DISC_DATA !== 'undefined' && DISC_DATA[_discActiva]) return DISC_DATA[_discActiva].nom;
  if (sec === 'club' && typeof clubBySlug === 'function' && typeof _clubActiu !== 'undefined' && _clubActiu) {
    var cl = clubBySlug(_clubActiu);
    if (cl) return cl.nom;
  }
  var f = FCTA.sections.filter(function(x) { return x.key === sec; })[0];
  return f ? f.label : sec;
}

function navPushHash(hash) {
  var cur = history.state || {};
  var url = hash || (location.pathname + location.search);
  try {
    if ((hash || '') === (location.hash || '')) {
      history.replaceState(cur.fcta ? cur : { fcta: 1, idx: 0 }, '', url);
    } else {
      history.pushState({ fcta: 1, idx: (cur.idx || 0) + 1, prev: _navCurLabel }, '', url);
    }
  } catch (e) {}
  _navLastHash = hash || '';
}

function navReplaceHash(hash) {
  try { history.replaceState(history.state || { fcta: 1, idx: 0 }, '', hash); } catch (e) {}
  _navLastHash = hash;
}

// Navegació interna a un hash (#calendari/..., #news/12) creant entrada d'historial
function navGoHash(hash) {
  if (!hash || hash === location.hash) return;
  navPushHash(hash);
  _navFromHash();
}

function navBack() {
  var st = history.state;
  if (st && st.fcta && st.idx > 0) { history.back(); return; }
  setS('home');
}

function navUpdateBackBar(sec) {
  var bar = document.getElementById('backBar');
  if (!bar) return;
  if (sec === 'home') { bar.classList.remove('show'); return; }
  var st = history.state, label = "Tornar a l'inici";
  if (st && st.fcta && st.idx > 0 && st.prev && st.prev !== 'Inici') label = 'Tornar a ' + st.prev;
  document.getElementById('backLabel').textContent = label;
  document.getElementById('backCrumb').textContent = navLabelFor(sec);
  bar.classList.add('show');
}

function setS(sec, _noHash) {
  var nextId = 's' + (FCTA.sectionMap[sec] || '');
  var nextEl = document.getElementById(nextId);
  if (!nextEl) return;
  if (_noHash && nextEl === _navCurrent && nextEl.style.display !== 'none') { navUpdateBackBar(sec); return; }

  // Update page title
  document.title = _SEO_TITLES[sec] || 'FCTA – Federació Catalana de Tir amb Arc';

  // Historial: una entrada real per cada canvi de secció
  var _prevLabel = _navCurLabel;
  if (!_noHash) navPushHash(sec === 'home' ? '' : '#' + sec);
  _navCurLabel = navLabelFor(sec);

  // Update nav highlight immediately
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.remove('act');
  });
  var nl = document.getElementById('nl-' + sec);
  if (nl) nl.classList.add('act');

  // Scroll to top instantly
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Abort any in-flight animation timer
  if (_navTimer) { clearTimeout(_navTimer); _navTimer = null; }

  // Hide all sections immediately (clean slate)
  FCTA.sectionIds.forEach(function(id) {
    var el = document.getElementById('s' + id);
    if (!el || el === nextEl) return;
    el.classList.remove('s-enter', 's-exit');
    el.style.display = 'none';
  });

  // Animate new section in
  nextEl.style.display = 'block';
  nextEl.classList.remove('s-exit');
  void nextEl.offsetWidth; // force reflow so animation fires every time
  nextEl.classList.add('s-enter');

  _navTimer = setTimeout(function() {
    nextEl.classList.remove('s-enter');
    _navTimer = null;
  }, NAV_ENTER_MS + 40);

  _navCurrent = nextEl;
  navUpdateBackBar(sec);

  // Section-specific callbacks
  if (sec === 'records') {
    setTimeout(function() { if (typeof initRecordsPage === 'function') initRecordsPage(); }, 50);
  }
}

// ── URL hash routing ──────────────────────────────────────
function _navFromHash() {
  var hash = (window.location.hash || '').replace('#', '');
  _navLastHash = window.location.hash || '';
  var parts = hash.split('/');
  var sec   = parts[0];   // 'competitions' | 'disciplina' | ...
  var sub   = parts[1];   // clau disciplina
  var tab   = parts[2];   // tab de la disciplina

  // Si el visor de notícies és obert i l'URL ja no és d'una notícia (enrere del navegador), es tanca
  if (!(sec === 'news' && sub) && typeof closeNews === 'function') closeNews(true);
  if (!hash) { setS('home', true); return; }

  if (!FCTA.sectionMap[sec]) return;

  // ── Disciplines ──────────────────────────────────────────
  if (sec === 'disciplina' && sub) {
    setTimeout(function() {
      setDisciplina(sub, true);
      if (tab) {
        var tabBtn = document.querySelector('#discTabs [data-tab="' + tab + '"]');
        setDiscTab(tab, tabBtn, true);
      }
    }, 80);
    return;
  }

  if (sec === 'club') {
    if (sub && typeof showClub === 'function') showClub(sub, true); else setS('clubs', true);
    return;
  }

  if (sec === 'documentacio' && sub) {
    setS(sec, true);
    if (typeof setDocCat === 'function') setDocCat(sub, true);
    return;
  }

  setS(sec, true);

  // ── Notícia individual (enllaç directe) ───────────────────
  if (sec === 'news' && sub) {
    setTimeout(function() {
      openNews(parseInt(sub), true);
    }, 80);
  }
}

function _navOnHistory() { if ((location.hash || '') !== _navLastHash) _navFromHash(); }
window.addEventListener('popstate', _navOnHistory);
window.addEventListener('hashchange', _navOnHistory);
document.addEventListener('DOMContentLoaded', _navFromHash);

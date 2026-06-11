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
  disciplina:    'Disciplines | FCTA',
  transparencia: 'Transparència | FCTA',
  assegurances:  'Assegurances | FCTA',
  juntadirectiva:'Junta Directiva | FCTA',
  arcadaptat:    'Arc Adaptat | FCTA',
  comitejutges:  'Comitè de Jutges | FCTA',
  pat:           'PAT – Programa Autonòmic de Tecnificació | FCTA',
  calendari:     'Calendari Esportiu | FCTA',
  medaller:      'Medaller | FCTA'
};

function setS(sec, _noHash) {
  var nextId = 's' + (FCTA.sectionMap[sec] || '');
  var nextEl = document.getElementById(nextId);
  if (!nextEl) return;

  // Update page title
  document.title = _SEO_TITLES[sec] || 'FCTA – Federació Catalana de Tir amb Arc';

  // Update URL hash
  if (!_noHash) {
    try { history.replaceState(null, '', '#' + sec); } catch(e) {}
  }

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
}

// ── URL hash routing ──────────────────────────────────────
function _navFromHash() {
  var hash = (window.location.hash || '').replace('#', '');
  if (!hash) return;
  var parts = hash.split('/');
  var sec   = parts[0];   // 'competitions' | 'disciplina' | ...
  var sub   = parts[1];   // clau disciplina o 'medaller'
  var tab   = parts[2];   // tab o subtab medaller
  var view  = parts[3];   // sub-vista resultats o subtab medaller

  if (!FCTA.sectionMap[sec]) return;

  // ── Disciplines ──────────────────────────────────────────
  if (sec === 'disciplina' && sub) {
    setTimeout(function() {
      setDisciplina(sub, true);
      if (tab) {
        var tabBtn = document.querySelector('#discTabs [data-tab="' + tab + '"]');
        setDiscTab(tab, tabBtn, true);
        if (tab === 'resultats' && view) {
          _discResView = view;
          renderDiscTab('resultats');
        }
      }
    }, 80);
    return;
  }

  setS(sec, true);

  // ── Calendari > Temporada ────────────────────────────────
  if (sec === 'calendari' && sub) {
    setTimeout(function() {
      var btn = document.getElementById('calTab' + sub.replace('-',''));
      if (btn) setCalSeason(sub, btn);
    }, 50);
    return;
  }

  // ── Competicions > Medaller ──────────────────────────────
  if (sec === 'competitions' && sub === 'medaller') {
    setTimeout(function() {
      var btn = document.querySelector('.comp-stab:last-child');
      if (btn) {
        if (tab) _medallerTab = tab;
        setCompTab('medaller', btn);
      }
    }, 50);
  }
}

window.addEventListener('hashchange', _navFromHash);
document.addEventListener('DOMContentLoaded', _navFromHash);

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

function setS(sec) {
  var nextId = 's' + (FCTA.sectionMap[sec] || '');
  var nextEl = document.getElementById(nextId);
  if (!nextEl) return;

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

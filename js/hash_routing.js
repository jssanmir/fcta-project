// hash_routing.js – Scroll a seccions de la pàgina d'inici + routing per hash (#circulars, etc.)
// Extret d'un <script> inline d'index.html per complir amb la CSP (script-src sense 'unsafe-inline').
// ──────────────────────────────────────────────────────────
function scrollToHub(id) {
  var isHome = document.getElementById('sHome').style.display !== 'none';
  if (isHome) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth', block: 'start'});
  } else {
    setS('home');
    setTimeout(function() {
      document.getElementById(id).scrollIntoView({behavior: 'smooth', block: 'start'});
    }, 420);
  }
}

// ── Hash routing ──────────────────────────────────────────
(function() {
  var origSetS = window.setS;
  if (typeof origSetS !== 'function') return;

  window.setS = function(key) {
    origSetS(key);
    if (history.replaceState) {
      history.replaceState(null, '', key === 'home' ? window.location.pathname : '#' + key);
    }
  };

  window.addEventListener('DOMContentLoaded', function() {
    var hash = window.location.hash.replace('#', '');
    if (hash && FCTA.sectionMap[hash]) {
      setS(hash);
    }
  });
})();

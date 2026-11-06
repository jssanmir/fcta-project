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

// El routing per hash i l'historial viuen a nav.js (setS, navPushHash, popstate).

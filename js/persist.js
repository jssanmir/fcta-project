// persist.js – Persistència server-side (API REST) amb fallback a localStorage
// ──────────────────────────────────────────────────────────

(function () {
  var LS_KEY    = 'fcta_db_v1';
  var LS_TOKEN  = 'fcta_token';
  var API_BASE  = '';   // mateix origen que el portal
  var FIELDS    = ['circulars', 'competitions', 'news', 'formations',
                   'tirades', 'documents', 'recordsSolicituds'];

  // ── Token JWT de la sessió admin ──────────────────────────
  // Token NOMÉS a sessionStorage (s'esborra en tancar la pestanya)
  // mai a localStorage per evitar robatori per XSS
  window.dbGetToken = function () {
    return sessionStorage.getItem(LS_TOKEN);
  };
  window.dbSetToken = function (token) {
    sessionStorage.setItem(LS_TOKEN, token);
    // Neteja qualsevol token antic de localStorage
    localStorage.removeItem(LS_TOKEN);
  };
  window.dbClearToken = function () {
    sessionStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_TOKEN);
  };

  // ── Snapshot dels camps mutables de DB ────────────────────
  function snapshot() {
    var snap = {};
    FIELDS.forEach(function (k) {
      if (DB[k] !== undefined) snap[k] = DB[k];
    });
    return snap;
  }

  // ── Aplica un snapshot rebut del servidor a DB ────────────
  function applySnapshot(saved) {
    FIELDS.forEach(function (k) {
      if (saved[k] !== undefined) DB[k] = saved[k];
    });
  }

  // ── Fallback: localStorage ────────────────────────────────
  function lsSave() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(snapshot())); } catch (e) {}
  }
  function lsLoad() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) applySnapshot(JSON.parse(raw));
    } catch (e) {
      localStorage.removeItem(LS_KEY);
    }
  }

  // ── Desa al servidor (requereix token) ────────────────────
  window.dbSave = function () {
    var token = window.dbGetToken();
    if (!token) { lsSave(); return; }

    fetch(API_BASE + '/api/data', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(snapshot())
    }).then(function (res) {
      if (res.status === 401) {
        window.dbClearToken();
        lsSave();
      }
    }).catch(function () {
      lsSave(); // servidor no disponible → localStorage
    });
  };

  // ── Restableix les dades originals (esborra al servidor) ──
  window.dbReset = function () {
    if (!confirm('Restablir totes les dades als valors originals?\n\nAquesta acció eliminarà tots els canvis desats i recarregarà el portal.')) return;

    var token = window.dbGetToken();
    localStorage.removeItem(LS_KEY);

    if (token) {
      fetch(API_BASE + '/api/data', {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      }).finally(function () { location.reload(); });
    } else {
      location.reload();
    }
  };

  function rerender() {
    if (typeof renderCirc === 'function')      renderCirc('all');
    if (typeof renderComp === 'function')      renderComp('all');
    if (typeof renderNews === 'function')      renderNews();
    if (typeof renderForm === 'function')      renderForm();
    if (typeof renderTirades === 'function')   renderTirades('all');
    if (typeof renderCalendari === 'function') renderCalendari();
    if (typeof renderHeroPanel === 'function') renderHeroPanel();
    if (typeof updatePendDot === 'function')   updatePendDot();
  }

  // ── Carrega les dades en iniciar ──────────────────────────
  function dbLoad() {
    fetch(API_BASE + '/api/data')
      .then(function (res) { return res.json(); })
      .then(function (saved) {
        if (saved) {
          // El servidor té dades → aplica-les i actualitza localStorage
          applySnapshot(saved);
          try { localStorage.setItem(LS_KEY, JSON.stringify(saved)); } catch (e) {}
          rerender();
        } else {
          // Servidor buit (null) → esborra localStorage per evitar dades obsoletes
          // i usa els valors per defecte de db.js (no cal re-renderitzar: init.js ja ho fa)
          localStorage.removeItem(LS_KEY);
        }
      })
      .catch(function () {
        // Servidor no disponible → usa localStorage com a últim recurs
        var raw = localStorage.getItem(LS_KEY);
        if (raw) {
          try { applySnapshot(JSON.parse(raw)); rerender(); } catch (e) { localStorage.removeItem(LS_KEY); }
        }
      });
  }

  // Inicia la càrrega asíncrona (db.js ja ha inicialitzat DB amb els valors per defecte)
  dbLoad();
})();

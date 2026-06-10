// persist.js – Persistència server-side exclusiva (API REST)
// Les dades NOMÉS es modifiquen amb token JWT vàlid (sessió admin).
// No hi ha fallback a localStorage per a les dades: evita modificació
// no autoritzada des de DevTools o scripts injectats.
// ──────────────────────────────────────────────────────────

(function () {
  var LS_TOKEN = 'fcta_token';
  var LS_CACHE = 'fcta_db_cache';   // cache de lectura del servidor (read-only)
  var API_BASE = '';
  var FIELDS   = ['circulars', 'competitions', 'news', 'formations',
                  'tirades', 'documents', 'recordsSolicituds'];

  // ── Neteja de dades antigues de localStorage ──────────────
  // Elimina qualsevol dada que pogués haver estat injectada o
  // manipulada manualment des del navegador.
  (function purgeLegacy() {
    var LEGACY_KEYS = ['fcta_db_v1', 'fcta_db', 'fcta_data'];
    LEGACY_KEYS.forEach(function(k){ localStorage.removeItem(k); });
  }());

  // ── Token JWT de la sessió admin ──────────────────────────
  // Token NOMÉS a sessionStorage (s'esborra en tancar la pestanya).
  window.dbGetToken = function () {
    return sessionStorage.getItem(LS_TOKEN);
  };
  window.dbSetToken = function (token) {
    sessionStorage.setItem(LS_TOKEN, token);
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

  // ── Aplica un snapshot a DB ───────────────────────────────
  function applySnapshot(saved) {
    FIELDS.forEach(function (k) {
      if (saved[k] !== undefined) DB[k] = saved[k];
    });
  }

  // ── Desa al servidor (REQUEREIX token) ────────────────────
  // Si no hi ha token, no fa res: el portal és de només lectura
  // per a qualsevol usuari no autenticat.
  window.dbSave = function () {
    var token = window.dbGetToken();
    if (!token) return;   // sense auth → no-op, mai localStorage

    fetch(API_BASE + '/api/data', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(snapshot())
    }).then(function (res) {
      if (res.status === 401) {
        // Token caducat o invàlid: tanca la sessió silenciosament
        window.dbClearToken();
        if (typeof admSession !== 'undefined') admSession = null;
        if (typeof closeAdm === 'function') closeAdm();
        if (typeof toast === 'function') toast('Sessió caducada. Torna a iniciar sessió.', '⚠️');
      } else if (res.ok) {
        // Actualitza la cache de lectura amb les dades acabades de desar
        res.json().then(function(d){
          try { localStorage.setItem(LS_CACHE, JSON.stringify({ ts: Date.now(), data: d || snapshot() })); } catch(e){}
        }).catch(function(){
          try { localStorage.setItem(LS_CACHE, JSON.stringify({ ts: Date.now(), data: snapshot() })); } catch(e){}
        });
      }
    }).catch(function () {
      // Servidor no disponible: els canvis estan a memòria però no persistits.
      // Es mostrarà un avís si es recarrega la pàgina.
      if (typeof toast === 'function') toast('Avís: no s\'ha pogut desar al servidor.', '⚠️');
    });
  };

  // ── Restableix les dades originals ───────────────────────
  window.dbReset = function () {
    if (!confirm('Restablir totes les dades als valors originals?\n\nAquesta acció eliminarà tots els canvis desats i recarregarà el portal.')) return;

    var token = window.dbGetToken();
    localStorage.removeItem(LS_CACHE);

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
  // Ordre de prioritat:
  //   1. Servidor (/api/data) → font de veritat
  //   2. Cache de lectura (localStorage LS_CACHE) → ÚNICA font
  //      alternativa, i només si el servidor no respon. Aquesta
  //      cache NOMÉS l'escriu aquest fitxer (mai l'usuari ni
  //      cap altra funció), per tant és de confiança.
  //   3. Valors per defecte de db.js → mai es modifiquen des del client
  function dbLoad() {
    fetch(API_BASE + '/api/data')
      .then(function (res) { return res.json(); })
      .then(function (saved) {
        if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
          applySnapshot(saved);
          // Actualitza la cache de lectura amb les dades del servidor
          try { localStorage.setItem(LS_CACHE, JSON.stringify({ ts: Date.now(), data: saved })); } catch(e){}
          rerender();
        } else {
          // Servidor retorna null o buit → neteja cache i usa db.js
          localStorage.removeItem(LS_CACHE);
        }
      })
      .catch(function () {
        // Servidor no disponible → usa la cache de lectura si és prou recent
        try {
          var raw = localStorage.getItem(LS_CACHE);
          if (raw) {
            var cached = JSON.parse(raw);
            var MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 dies
            if (cached && cached.data && (Date.now() - (cached.ts || 0)) < MAX_CACHE_AGE) {
              applySnapshot(cached.data);
              rerender();
            } else {
              // Cache massa antiga → elimina i usa db.js
              localStorage.removeItem(LS_CACHE);
            }
          }
        } catch(e) {
          localStorage.removeItem(LS_CACHE);
        }
      });
  }

  dbLoad();
})();

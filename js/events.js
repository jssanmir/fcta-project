// events.js – Delegació d'esdeveniments (necessari per activar CSP amb
// script-src estricte, sense 'unsafe-inline').
// ──────────────────────────────────────────────────────────
// Abans: onclick="fnName('arg', this)" inline a l'HTML (bloquejat per CSP).
// Ara:   data-onclick="fnName" data-onclick-args='["arg","@el"]'
//
// Sentinelles especials dins de data-*-args (JSON):
//   "@el"    → es substitueix per l'element clicat (equivalent a l'antic `this`)
//   "@event" → es substitueix per l'objecte Event natiu
//
// Suporta: click, change, input, keydown (bombollen → delegació normal
// a `document`) i error, load (NO bombollen → cal delegació en fase de
// captura, `{capture:true}`, perquè funcionin amb <img onerror> etc.)
// ──────────────────────────────────────────────────────────
(function () {
  'use strict';

  function resolveArg(a, el, evt) {
    if (a === '@el')    return el;
    if (a === '@event') return evt;
    if (a === '@val')   return el.value;
    return a;
  }

  function readArgs(el, attr, evt) {
    var raw = el.getAttribute(attr);
    if (!raw) return [];
    try {
      var parsed = JSON.parse(raw);
      return parsed.map(function (a) { return resolveArg(a, el, evt); });
    } catch (e) {
      console.warn('[events] ' + attr + ' invàlid a', el, e);
      return [];
    }
  }

  // Crida fnName(...args) trobant-la primer a `window`. `this` dins de
  // la funció cridada és l'element (mateix comportament que onclick="fn(this)").
  function dispatch(fnAttr, argsAttr, el, evt, opts) {
    var fnName = el.getAttribute(fnAttr);
    if (!fnName) return false;
    var fn = window[fnName];
    if (typeof fn !== 'function') {
      console.warn('[events] Funció no trobada: ' + fnName);
      return false;
    }
    if (opts && opts.preventDefault) evt.preventDefault();
    fn.apply(el, readArgs(el, argsAttr, evt));
    return true;
  }

  function delegate(eventName, dataAttr, opts) {
    var fnAttr   = 'data-' + dataAttr;
    var argsAttr = fnAttr + '-args';
    var selector = '[' + fnAttr + ']';
    document.addEventListener(eventName, function (e) {
      var el = e.target.closest ? e.target.closest(selector) : null;
      if (!el) return;
      dispatch(fnAttr, argsAttr, el, e, opts);
    }, opts && opts.capture ? true : false);
  }

  // Esdeveniments que bombollen: delegació normal.
  delegate('click',    'onclick',   { preventDefault: true });
  delegate('change',   'onchange',  {});
  delegate('input',    'oninput',   {});
  delegate('keydown',  'onkeydown', {});
  delegate('submit',   'onsubmit',  { preventDefault: true });

  // Esdeveniments que NO bombollen (error, load): cal fase de captura.
  delegate('error', 'onerror', { capture: true });
  delegate('load',  'onload',  { capture: true });

  // Patró habitual "Enter per enviar" (abans: onkeydown="if(event.key==='Enter')fn(...)")
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var el = e.target.closest ? e.target.closest('[data-onkeydown-enter]') : null;
    if (!el) return;
    var fnName = el.getAttribute('data-onkeydown-enter');
    var fn = window[fnName];
    if (typeof fn === 'function') fn.apply(el, readArgs(el, 'data-onkeydown-enter-args', e));
  });
})();

// Helper compartit per a onerror="this.style.display='none'" (p.ex. imatges trencades)
function hideOnError() { this.style.display = 'none'; }

// Helper compartit per substituir un <img> trencat per una inicial (p.ex. logo de club)
function showInitialOnError(initial) {
  this.outerHTML = '<div class="club-initial">' + initial + '</div>';
}

// Helper per construir l'atribut data-onXxx (+ data-onXxx-args si cal) dins
// de codi que genera HTML per concatenació de strings (admin.js, etc.).
// Ús: '<button'+dataAttr('onclick','admDelUser',[u.id])+'>...'
//   equival a l'antic: '<button onclick="admDelUser('+u.id+')">...'
function dataAttr(evtType, fnName, args) {
  var out = ' data-' + evtType + '="' + fnName + '"';
  if (args && args.length) {
    var json = JSON.stringify(args)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    out += ' data-' + evtType + '-args="' + json + '"';
  }
  return out;
}

// Ídem, per al patró "Enter per enviar" (abans: onkeydown="if(event.key==='Enter')fn(...)")
function dataEnterAttr(fnName, args) {
  return dataAttr('onkeydown-enter', fnName, args);
}

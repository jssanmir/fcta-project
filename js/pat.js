// pat.js – Programa Autonòmic de Tecnificació (PAT)
// Dades: DB.pat = { hero, intro{stats[]}, objectius{items[]}, principis{items[]}, estructura{items[]},
//   seleccio{criteris[], vies[]}, calendari{items[]}, avaluacio{items[]}, docs{items[]}, contacte{items[]} }
// Editable des d'Administració > Tecnificació (js/admin.js).
// ──────────────────────────────────────────────────────────

function _patUrl(u) {
  u = String(u || '');
  return /^(https?:\/\/|docs\/|\/uploads\/|mailto:)/.test(u) ? u : '';
}
function _patRich(h) {
  h = h || '';
  return /</.test(h) ? rtSanitize(h) : (h ? '<p>' + escHtml(h) + '</p>' : '');
}
function _patBr(t) { return escHtml(t || '').replace(/\n/g, '<br>'); }
function _patTitle(t, first) {
  return t ? '<div class="pat-section-title"' + (first ? '' : ' style="margin-top:2.5rem"') + '>' + escHtml(t) + '</div>' : '';
}
function _patList(D, path, key) { return ((D[path] || {})[key || 'items']) || []; }

function renderPAT() {
  var D = DB.pat;
  var body = document.getElementById('patBody');
  if (!D || !body) return;
  var el = function(id) { return document.getElementById(id); };

  // Capçalera
  var H = D.hero || {};
  if (el('patBadge')) el('patBadge').textContent = H.badge || '';
  if (el('patTitle')) el('patTitle').innerHTML = escHtml(H.title1 || '') + '<br><em>' + escHtml(H.titleEm || '') + '</em>';
  if (el('patHeroText')) el('patHeroText').innerHTML = _patRich(H.text);
  if (el('patHeroBtn')) {
    var hu = _patUrl(H.docUrl);
    el('patHeroBtn').innerHTML = (hu && H.docLabel)
      ? '<a href="' + escHtml(hu) + '" target="_blank" rel="noopener" class="btn-gold" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.88rem;padding:.65rem 1.4rem;margin-top:.5rem">' + escHtml(H.docLabel) + '</a>'
      : '';
  }

  var h = '';

  // Presentació + xifres
  var I = D.intro || {};
  h += '<div class="pat-intro"><div class="pat-intro-text">'
    + '<div class="sec-label">' + escHtml(I.label || '') + '</div>'
    + '<h2 class="sec-title">' + escHtml(I.titleA || '') + ' <em>' + escHtml(I.titleEm || '') + '</em></h2>'
    + _patRich(I.text) + '</div>'
    + '<div class="pat-intro-stats">'
    + (I.stats || []).map(function(st) {
        return '<div class="pat-stat"><span class="pat-stat-n">' + escHtml(st.n || '') + (st.unit ? '<small>' + escHtml(st.unit) + '</small>' : '') + '</span>'
          + '<span class="pat-stat-l">' + _patBr(st.label) + '</span></div>';
      }).join('')
    + '</div></div>';

  // Objectius
  h += _patTitle((D.objectius || {}).title, true) + '<div class="pat-obj-grid">'
    + _patList(D, 'objectius').map(function(o, i) {
        return '<div class="pat-obj"><div class="pat-obj-n">' + (i + 1) + '</div><div>' + _patRich(o.text) + '</div></div>';
      }).join('') + '</div>';

  // Principis
  h += _patTitle((D.principis || {}).title) + '<div class="pat-principis-grid">'
    + _patList(D, 'principis').map(function(p) {
        return '<div class="pat-principi"><div class="pat-principi-icon">' + escHtml(p.icon || '') + '</div><h5>' + escHtml(p.title || '') + '</h5><p>' + escHtml(p.text || '') + '</p></div>';
      }).join('') + '</div>';

  // Estructura
  h += _patTitle((D.estructura || {}).title) + '<div class="pat-estructura-grid">'
    + _patList(D, 'estructura').map(function(c) {
        return '<div class="pat-estructura-card"><h5>' + escHtml(c.title || '') + '</h5>' + _patRich(c.body) + '</div>';
      }).join('') + '</div>';

  // Selecció i accés
  var S = D.seleccio || {};
  h += _patTitle(S.title) + (S.intro ? '<div class="pat-seccio-intro">' + escHtml(S.intro) + '</div>' : '')
    + '<div class="pat-seleccio-grid"><div class="pat-seleccio-perfil"><h5>' + escHtml(S.perfilTitle || '') + '</h5>' + _patRich(S.perfilBody) + '</div>'
    + '<div class="pat-seleccio-criteris"><h5>' + escHtml(S.criterisTitle || '') + '</h5>'
    + (S.criteris || []).map(function(c, i) {
        return '<div class="pat-criteri"><span class="pat-criteri-n">' + (i + 1) + '</span><div><strong>' + escHtml(c.title || '') + '</strong>'
          + (c.text ? ' — ' + escHtml(c.text) : '') + '</div></div>';
      }).join('') + '</div></div>'
    + '<div class="pat-acces-vies"><h5>' + escHtml(S.viesTitle || '') + '</h5><div class="pat-vies-grid">'
    + (S.vies || []).map(function(v) {
        return '<div class="pat-via"><strong>' + escHtml(v.title || '') + '</strong><p>' + escHtml(v.text || '') + '</p></div>';
      }).join('') + '</div></div>';

  // Calendari
  h += _patTitle((D.calendari || {}).title) + '<div class="pat-calendari">'
    + _patList(D, 'calendari').map(function(c) {
        var t = /^[a-z]{0,6}$/.test(c.tipus || '') && c.tipus ? ' pat-cal-' + c.tipus : '';
        return '<div class="pat-cal-item' + t + '"><div class="pat-cal-mes">' + escHtml(c.mes || '') + '</div>'
          + '<div class="pat-cal-body"><strong>' + escHtml(c.title || '') + '</strong><p>' + escHtml(c.text || '') + '</p></div></div>';
      }).join('') + '</div>';

  // Avaluació
  h += _patTitle((D.avaluacio || {}).title) + '<div class="pat-aval-grid">'
    + _patList(D, 'avaluacio').map(function(c) {
        return '<div class="pat-aval-card"><h5>' + escHtml(c.title || '') + '</h5>' + _patRich(c.body) + '</div>';
      }).join('') + '</div>';

  // Documents
  var docs = _patList(D, 'docs');
  if (docs.length || (D.docs || {}).title) {
    h += '<div class="lic-docs" style="margin-top:2.5rem"><h3>' + escHtml((D.docs || {}).title || '') + '</h3><div class="lic-docs-grid">'
      + docs.map(function(d) {
          var inner = '<span class="lic-doc-icon">' + escHtml(d.icon || '') + '</span><div class="lic-doc-text"><div class="lic-doc-name">'
            + escHtml(d.name || '') + '</div><div class="lic-doc-desc">' + escHtml(d.desc || '') + '</div></div>';
          var u = _patUrl(d.url);
          return u ? '<a href="' + escHtml(u) + '" target="_blank" rel="noopener" class="lic-doc-btn">' + inner + '</a>'
                   : '<div class="lic-doc-btn" style="cursor:default;opacity:.7">' + inner + '</div>';
        }).join('') + '</div></div>';
  }

  // Contacte
  var cs = _patList(D, 'contacte');
  if (cs.length) {
    h += '<div class="lic-contact-grid" style="margin-top:2rem">' + cs.map(function(c) {
      var inner = '<div class="lcc-icon">' + escHtml(c.icon || '') + '</div><h4>' + escHtml(c.title || '') + '</h4><p>' + _patBr(c.text) + '</p>';
      var u = _patUrl(c.url);
      if (c.target) return '<button type="button" class="lic-contact-card" style="text-align:center;border:none;font-family:inherit;cursor:pointer"'
        + dataAttr('onclick', 'setS', [c.target]) + '>' + inner + '</button>';
      if (u) return '<a href="' + escHtml(u) + '"' + (/^mailto:/.test(u) ? '' : ' target="_blank" rel="noopener"') + ' class="lic-contact-card">' + inner + '</a>';
      return '<div class="lic-contact-card">' + inner + '</div>';
    }).join('') + '</div>';
  }

  body.innerHTML = h;
}

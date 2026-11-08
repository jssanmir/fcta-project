// documentacio.js – Pàgina de Documentació
// Dades: DB.documentacio = { intro, categories:[{ id, key, title, icon, desc, groups:[{ id, title, docs:[{ id, title, date, desc, url }] }] }] }
// Editable des d'Administració > Documentació (js/admin.js). Les categories sense cap document no es mostren.
// ──────────────────────────────────────────────────────────

var DOC_ICONS = [
  { val: 'folder',   lbl: 'Carpeta' },   { val: 'doc',   lbl: 'Document' },
  { val: 'book',     lbl: 'Llibre' },    { val: 'scale', lbl: 'Balança' },
  { val: 'users',    lbl: 'Persones' },  { val: 'shield', lbl: 'Escut' },
  { val: 'eye',      lbl: 'Ull' },       { val: 'grad',  lbl: 'Birret' },
  { val: 'medal',    lbl: 'Medalla' },   { val: 'calendar', lbl: 'Calendari' },
  { val: 'id',       lbl: 'Carnet' },    { val: 'news',  lbl: 'Diari' },
  { val: 'trophy',   lbl: 'Trofeu' },    { val: 'bars',  lbl: 'Barres' },
  { val: 'pin',      lbl: 'Ubicació' },  { val: 'target', lbl: 'Diana' }
];

var _docCat   = null;   // clau de la categoria activa
var _docQuery = '';     // text de cerca

function docData() {
  var d = DB.documentacio || {};
  return { intro: d.intro || '', categories: d.categories || [] };
}

function _docCount(cat) {
  var n = 0;
  (cat.groups || []).forEach(function(g) { n += (g.docs || []).length; });
  return n;
}

function _docIcon(name) {
  var ok = DOC_ICONS.some(function(i) { return i.val === name; });
  return '<svg class="hub-ico" aria-hidden="true"><use href="#ic-' + (ok ? name : 'folder') + '"/></svg>';
}

function _docSafeUrl(u) {
  u = String(u || '');
  return /^(https?:\/\/|docs\/|\/uploads\/)/.test(u) ? u : '';
}

var _DOC_MONS = ['gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.', 'des.'];
function _docFmtDate(s) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
  if (!m) return s || '';
  return parseInt(m[3], 10) + ' ' + _DOC_MONS[parseInt(m[2], 10) - 1] + ' ' + m[1];
}

function _docCardHtml(d) {
  var url = _docSafeUrl(d.url);
  var isPdf = /\.pdf(\?|$)/i.test(url);
  var meta = [];
  if (d.date) meta.push('<span class="dc-date">&#128197; ' + escHtml(_docFmtDate(d.date)) + '</span>');
  if (d.desc) meta.push('<span>' + escHtml(d.desc) + '</span>');
  var acts = '';
  if (url) {
    acts = '<a class="dc-btn" href="' + escHtml(url) + '" target="_blank" rel="noopener">' + (isPdf ? 'Obrir' : 'Visitar') + '</a>';
    if (isPdf) acts += '<a class="dc-btn dc-btn--ghost" href="' + escHtml(url) + '" download title="Descarregar" aria-label="Descarregar">&#11015;</a>';
  } else {
    acts = '<span class="dc-pending">Pendent</span>';
  }
  return '<div class="dc-card">'
    + '<div class="dc-card-badge' + (isPdf ? '' : ' dc-card-badge--web') + '">' + (isPdf ? 'PDF' : 'WEB') + '</div>'
    + '<div class="dc-card-body"><div class="dc-card-title">' + escHtml(d.title) + '</div>'
    + (meta.length ? '<div class="dc-card-meta">' + meta.join('') + '</div>' : '') + '</div>'
    + '<div class="dc-card-acts">' + acts + '</div>'
    + '</div>';
}

function _docCatHtml(cat) {
  var html = '<div class="dc-cat-head"><span class="dc-cat-ico">' + _docIcon(cat.icon) + '</span><div class="dc-cat-info">'
    + '<h3 class="dc-cat-title">' + escHtml(cat.title) + ' <span class="dc-count">' + _docCount(cat) + ' documents</span></h3>'
    + (cat.desc ? '<div class="dc-cat-desc">' + rtSanitize(cat.desc) + '</div>' : '')
    + '</div></div>';
  (cat.groups || []).forEach(function(g) {
    if (!(g.docs || []).length) return;
    html += '<div class="dc-group">'
      + (g.title ? '<h4 class="dc-group-title">' + escHtml(g.title) + ' <span class="dc-count">' + g.docs.length + '</span></h4>' : '')
      + '<div class="dc-grid">' + g.docs.map(_docCardHtml).join('') + '</div></div>';
  });
  return html;
}

function _docSearchHtml(cats, q) {
  var words = q.toLowerCase().split(/\s+/).filter(Boolean);
  var html = '', total = 0;
  cats.forEach(function(c) {
    var hits = [];
    (c.groups || []).forEach(function(g) {
      (g.docs || []).forEach(function(d) {
        var hay = (d.title + ' ' + (d.desc || '') + ' ' + (d.date || '') + ' ' + _docFmtDate(d.date) + ' ' + (g.title || '') + ' ' + c.title).toLowerCase();
        if (words.every(function(w) { return hay.indexOf(w) !== -1; })) hits.push(d);
      });
    });
    if (!hits.length) return;
    total += hits.length;
    html += '<div class="dc-group"><h4 class="dc-group-title"><span class="dc-group-ico">' + _docIcon(c.icon) + '</span>' + escHtml(c.title)
      + ' <span class="dc-count">' + hits.length + '</span></h4><div class="dc-grid">' + hits.map(_docCardHtml).join('') + '</div></div>';
  });
  if (!total) return '<div class="doc-empty"><div class="doc-empty-icon">&#128269;</div><p>No s\'ha trobat cap document amb «' + escHtml(q) + '».</p></div>';
  return '<p class="dc-result-info">' + total + (total === 1 ? ' document trobat' : ' documents trobats') + '</p>' + html;
}

function renderDocumentacio() {
  var tabsEl = document.getElementById('docTabs');
  var body   = document.getElementById('docContent');
  if (!tabsEl || !body) return;
  var D = docData();
  var cats = D.categories.filter(function(c) { return _docCount(c) > 0; });

  var intro = document.getElementById('docIntro');
  if (intro && D.intro) intro.innerHTML = /</.test(D.intro) ? rtSanitize(D.intro) : '<p>' + escHtml(D.intro) + '</p>';

  var tools = document.getElementById('docTools');
  if (!cats.length) {
    tabsEl.innerHTML = '';
    if (tools) tools.style.display = 'none';
    body.innerHTML = '<div class="doc-empty"><div class="doc-empty-icon">&#128196;</div><p>Encara no hi ha documents publicats.</p></div>';
    return;
  }
  if (tools) tools.style.display = '';
  if (!_docCat || !cats.some(function(c) { return c.key === _docCat; })) _docCat = cats[0].key;

  tabsEl.innerHTML = cats.map(function(c) {
    return '<button type="button" class="dc-tab' + (!_docQuery && c.key === _docCat ? ' act' : '') + '"'
      + dataAttr('onclick', 'setDocCat', [c.key]) + '><span class="dc-tab-ico">' + _docIcon(c.icon) + '</span>'
      + '<span class="dc-tab-name">' + escHtml(c.title) + '</span><span class="dc-tab-n">' + _docCount(c) + '</span></button>';
  }).join('');

  if (_docQuery) {
    body.innerHTML = _docSearchHtml(cats, _docQuery);
  } else {
    var cat = cats.filter(function(c) { return c.key === _docCat; })[0];
    body.innerHTML = _docCatHtml(cat);
  }
}

function setDocCat(key, _noHash) {
  _docCat = key;
  _docQuery = '';
  var inp = document.getElementById('docSearch');
  if (inp) inp.value = '';
  renderDocumentacio();
  if (!_noHash && typeof navReplaceHash === 'function') navReplaceHash('#documentacio/' + _docCat);
}

function docSearch(q) {
  _docQuery = String(q || '').trim();
  renderDocumentacio();
}

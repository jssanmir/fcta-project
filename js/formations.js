// formations.js – Formació: targetes de cursos, seminaris i tallers
// Dades: DB.formations = [{ id, icon, title, level, desc (HTML), dates, places, estat, circ,
//   inscripcioLabel, inscripcioUrl, docs:[{ id, title, desc, url }] }]
//   estat: 'obert' (inscripció oberta) | 'curs' (en curs) | 'tancat' (finalitzat)
//   circ:  número d'una circular de DB.circulars; s'enllaça automàticament (PDF)
// Editable des d'Administració > Formació; cada curs pot tenir els seus documents.
// ──────────────────────────────────────────────────────────

var FORM_ESTATS = [
  { val: 'obert',  lbl: 'Inscripció oberta' },
  { val: 'curs',   lbl: 'En curs' },
  { val: 'tancat', lbl: 'Finalitzat' }
];
var _FORM_RANK = { obert: 0, curs: 1, tancat: 2 };

function _frmUrl(u) {
  u = String(u || '');
  return /^(https?:\/\/|docs\/|\/uploads\/|mailto:)/.test(u) ? u : '';
}
function _frmRich(h) {
  h = h || '';
  return /</.test(h) ? rtSanitize(h) : (h ? '<p>' + escHtml(h) + '</p>' : '');
}

// Documents d'un curs: circular enllaçada + documents propis (+ enllaços antics, si n'hi ha)
function formDocs(f) {
  var out = [];
  if (f.circ) {
    var c = (DB.circulars || []).filter(function(x) { return x.num === f.circ; })[0];
    var cu = c ? _frmUrl(c.url) : '';
    if (cu) out.push({ title: 'Circular ' + c.num + ' – ' + c.title, desc: '', url: cu });
  }
  (f.docs || []).forEach(function(d) { out.push(d); });
  (f.links || []).forEach(function(l) { out.push({ title: String(l.txt || '').replace(/^[^A-Za-zÀ-ÿ0-9]+/, ''), desc: '', url: l.url }); });
  return out.filter(function(d) { return _frmUrl(d.url); });
}

function renderForm() {
  var grid = document.getElementById('formGrid');
  if (!grid) return;
  var lc = { 'Tècnics': 'cb-al', General: 'cb-fed', Clubs: 'cb-camp' };
  var list = DB.formations.map(function(f, i) { return { f: f, i: i }; });
  list.sort(function(a, b) {
    var ra = _FORM_RANK[a.f.estat] === undefined ? 0 : _FORM_RANK[a.f.estat];
    var rb = _FORM_RANK[b.f.estat] === undefined ? 0 : _FORM_RANK[b.f.estat];
    return (ra - rb) || (a.i - b.i);
  });

  grid.innerHTML = list.map(function(x) {
    var f = x.f;
    var estat = _FORM_RANK[f.estat] === undefined ? 'obert' : f.estat;
    var estatBadge = estat === 'curs' ? '<span class="cbadge cb-camp form-estat">En curs</span>'
                   : estat === 'tancat' ? '<span class="cbadge cb-general form-estat">Finalitzat</span>' : '';
    var docs = formDocs(f);
    var docsHtml = docs.map(function(d) {
      var u = _frmUrl(d.url);
      var isPdf = /\.pdf(\?|#|$)/i.test(u);
      return '<a href="' + escHtml(u) + '" target="_blank" rel="noopener" class="form-link">'
        + (isPdf ? '&#128196; ' : '&#128279; ') + escHtml(d.title || 'Document')
        + (d.desc ? ' <span class="form-link-desc">' + escHtml(d.desc) + '</span>' : '') + '</a>';
    }).join('');
    var inscUrl = _frmUrl(f.inscripcioUrl);
    var insc = (estat === 'obert' && inscUrl)
      ? '<a class="bsm bsm-n" href="' + escHtml(inscUrl) + '" target="_blank" rel="noopener">' + escHtml(f.inscripcioLabel || 'Inscriu-te') + '</a>' : '';
    return '<div class="form-card form-card--' + estat + '">'
      + '<div class="form-card-icon">' + escHtml(f.icon || '') + '</div>'
      + '<span class="cbadge ' + (lc[f.level] || 'cb-fed') + '">' + escHtml(f.level || '') + '</span>' + estatBadge
      + '<h3>' + escHtml(f.title || '') + '</h3>'
      + '<div class="form-card-desc">' + _frmRich(f.desc) + '</div>'
      + '<div class="form-meta">'
      + (f.dates ? '<span>&#128197; <strong>' + escHtml(f.dates) + '</strong></span>' : '')
      + (f.places ? '<span>&#128101; <strong>' + escHtml(f.places) + '</strong></span>' : '') + '</div>'
      + (docsHtml ? '<div class="form-docs-title">Documentació</div><div class="form-links">' + docsHtml + '</div>' : '')
      + insc + '</div>';
  }).join('');
}

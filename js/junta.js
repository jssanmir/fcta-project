// junta.js – Junta Directiva configurable
// Dades: DB.junta = { intro, mandat, grups:[{ id, lbl, sing, plur, layout }], members:[{ id, grup, rol, nom, email }] }
//   grups: seccions de la pàgina, en ordre. `lbl` és el títol de la secció; `sing`/`plur` es fan
//          servir al resum de composició; `layout` defineix l'aspecte de les targetes:
//          'president' (targeta destacada, sense títol de secció) | 'exec' (targetes de càrrec) | 'vocal' (llista)
//   members[].grup apunta a l'`id` d'un grup.
// Editable des d'Administració > Junta (js/admin.js).
// ──────────────────────────────────────────────────────────

var JUNTA_LAYOUTS = [
  { val: 'president', lbl: 'Destacat (targeta gran, sense títol)' },
  { val: 'exec',      lbl: 'Targetes de càrrec' },
  { val: 'vocal',     lbl: 'Llista de persones' }
];

var JUNTA_GRUPS_DEFAULT = [
  { id: 'president', lbl: 'Presidència',       sing: 'President',      plur: 'Presidents',      layout: 'president' },
  { id: 'exec',      lbl: 'Càrrecs executius', sing: 'càrrec executiu', plur: 'càrrecs executius', layout: 'exec' },
  { id: 'vocal',     lbl: 'Vocals',            sing: 'Vocal',          plur: 'Vocals',          layout: 'vocal' }
];

// Grups vigents (si encara no se n'han configurat, els tres de sempre)
function juntaGrups() {
  var g = DB.junta && DB.junta.grups;
  if (!g || !g.length) return JUNTA_GRUPS_DEFAULT.map(function(x) { return { id: x.id, lbl: x.lbl, sing: x.sing, plur: x.plur, layout: x.layout }; });
  return g;
}

function _jdEmail(m, withIcon) {
  if (!m.email) return '';
  return '<a href="mailto:' + escHtml(m.email) + '" class="jd-member-email">'
    + (withIcon ? '&#9993;&#65039; ' : '') + escHtml(m.email) + '</a>';
}

function _jdCount(n, g) {
  var s = g.sing || g.lbl || '', p = g.plur || g.lbl || '';
  return n + ' ' + (n === 1 ? s : p);
}

function _jdGroupHtml(g, list, first) {
  var html = '', title = '';
  if (g.layout !== 'president' && g.lbl) {
    title = '<div class="jd-section-title"' + (first ? '' : ' style="margin-top:2rem"') + '>&#9670; ' + escHtml(g.lbl) + '</div>';
  }
  if (g.layout === 'president') {
    html += '<div class="jd-president-wrap">';
    list.forEach(function(m) {
      html += '<div class="jd-president-card">'
        + '<div class="jd-president-avatar">&#127939;</div>'
        + '<div class="jd-president-body">'
        + '<div class="jd-president-rol">' + escHtml(m.rol || g.sing || '') + '</div>'
        + '<h2 class="jd-president-nom">' + escHtml(m.nom) + '</h2>'
        + _jdEmail(m, true)
        + '</div></div>';
    });
    return html + '</div>';
  }
  if (g.layout === 'exec') {
    html += title + '<div class="jd-exec-grid">';
    list.forEach(function(m) {
      html += '<div class="jd-exec-card">'
        + '<div class="jd-exec-rol">' + escHtml(m.rol || g.sing || '') + '</div>'
        + '<div class="jd-exec-nom">' + escHtml(m.nom) + '</div>'
        + _jdEmail(m, false)
        + '</div>';
    });
    return html + '</div>';
  }
  html += title + '<div class="jd-vocals-grid">';
  list.forEach(function(m) {
    html += '<div class="jd-vocal-card">'
      + '<div class="jd-vocal-avatar">&#127939;</div>'
      + '<div class="jd-vocal-body">'
      + '<div class="jd-vocal-nom">' + escHtml(m.nom) + '</div>'
      + '<div class="jd-vocal-rol">' + escHtml(m.rol || g.sing || '') + '</div>'
      + _jdEmail(m, false)
      + '</div></div>';
  });
  return html + '</div>';
}

function renderJunta() {
  var host = document.getElementById('jdMembers');
  if (!host) return;
  var J = DB.junta || {};
  var grups = juntaGrups();
  var members = (J.members || []).filter(function(m) { return m && m.nom; });
  var known = {};
  grups.forEach(function(g) { known[g.id] = true; });
  var html = '', parts = [], first = true;

  grups.forEach(function(g, gi) {
    var list = members.filter(function(m) {
      // els membres d'un grup que ja no existeix es mostren a l'últim grup
      return m.grup === g.id || (gi === grups.length - 1 && !known[m.grup]);
    });
    if (!list.length) return;
    html += _jdGroupHtml(g, list, first);
    first = first && g.layout === 'president';
    parts.push(_jdCount(list.length, g));
  });

  host.innerHTML = html;

  var intro = document.getElementById('jdIntro');
  if (intro && J.intro) intro.innerHTML = rtAuto(J.intro);
  var mandat = document.getElementById('jdMandat');
  if (mandat && J.mandat) mandat.textContent = J.mandat;
  var comp = document.getElementById('jdComposicio');
  if (comp) comp.textContent = parts.join(' · ');
}

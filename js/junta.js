// junta.js – Junta Directiva configurable
// Dades: DB.junta = { intro, mandat, members:[{ id, grup, rol, nom, email }] }
// grup: 'president' | 'exec' (càrrecs executius) | 'vocal'. Editable des
// d'Administració > Junta (js/admin.js).
// ──────────────────────────────────────────────────────────

var JUNTA_GRUPS = [
  { val: 'president', lbl: 'President' },
  { val: 'exec',      lbl: 'Càrrec executiu' },
  { val: 'vocal',     lbl: 'Vocal' }
];

function _jdMembers(grup) {
  var list = (DB.junta && DB.junta.members) || [];
  return list.filter(function(m) { return m && m.grup === grup && m.nom; });
}

function _jdEmail(m, withIcon) {
  if (!m.email) return '';
  return '<a href="mailto:' + escHtml(m.email) + '" class="jd-member-email">'
    + (withIcon ? '&#9993;&#65039; ' : '') + escHtml(m.email) + '</a>';
}

function _jdCount(n, singular, plural) {
  return n + ' ' + (n === 1 ? singular : plural);
}

function renderJunta() {
  var host = document.getElementById('jdMembers');
  if (!host) return;
  var J = DB.junta || {};
  var pres  = _jdMembers('president');
  var exec  = _jdMembers('exec');
  var vocal = _jdMembers('vocal');
  var html = '';

  if (pres.length) {
    html += '<div class="jd-president-wrap">';
    pres.forEach(function(m) {
      html += '<div class="jd-president-card">'
        + '<div class="jd-president-avatar">&#127939;</div>'
        + '<div class="jd-president-body">'
        + '<div class="jd-president-rol">' + escHtml(m.rol || 'President') + '</div>'
        + '<h2 class="jd-president-nom">' + escHtml(m.nom) + '</h2>'
        + _jdEmail(m, true)
        + '</div></div>';
    });
    html += '</div>';
  }

  if (exec.length) {
    html += '<div class="jd-section-title">&#9670; Càrrecs executius</div><div class="jd-exec-grid">';
    exec.forEach(function(m) {
      html += '<div class="jd-exec-card">'
        + '<div class="jd-exec-rol">' + escHtml(m.rol) + '</div>'
        + '<div class="jd-exec-nom">' + escHtml(m.nom) + '</div>'
        + _jdEmail(m, false)
        + '</div>';
    });
    html += '</div>';
  }

  if (vocal.length) {
    html += '<div class="jd-section-title" style="margin-top:2rem">&#9670; Vocals</div><div class="jd-vocals-grid">';
    vocal.forEach(function(m) {
      html += '<div class="jd-vocal-card">'
        + '<div class="jd-vocal-avatar">&#127939;</div>'
        + '<div class="jd-vocal-body">'
        + '<div class="jd-vocal-nom">' + escHtml(m.nom) + '</div>'
        + '<div class="jd-vocal-rol">' + escHtml(m.rol || 'Vocal') + '</div>'
        + _jdEmail(m, false)
        + '</div></div>';
    });
    html += '</div>';
  }

  host.innerHTML = html;

  var intro = document.getElementById('jdIntro');
  if (intro && J.intro) intro.innerHTML = /</.test(J.intro) ? rtSanitize(J.intro) : '<p>' + escHtml(J.intro) + '</p>';
  var mandat = document.getElementById('jdMandat');
  if (mandat && J.mandat) mandat.textContent = J.mandat;
  var comp = document.getElementById('jdComposicio');
  if (comp) {
    var parts = [];
    if (pres.length)  parts.push(_jdCount(pres.length, 'President', 'Presidents'));
    if (exec.length)  parts.push(_jdCount(exec.length, 'càrrec executiu', 'càrrecs executius'));
    if (vocal.length) parts.push(_jdCount(vocal.length, 'Vocal', 'Vocals'));
    comp.textContent = parts.join(' · ');
  }
}

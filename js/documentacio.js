// documentacio.js – Documentation tabs switcher
// ──────────────────────────────────────────────────────────

// ── DOCUMENTACIÓ TABS ─────────────────────────────────────
function setDocTab(tab, btn) {
  document.querySelectorAll('#docTabs .doc-tab').forEach(function(b){b.classList.remove('act')});
  btn.classList.add('act');
  var panels = {
    eleccions:     'dpEleccions',
    assemblees:    'dpAssemblees',
    actes:         'dpActes',
    professionals: 'dpProfessionals',
    cursos:        'dpCursos'
  };
  Object.keys(panels).forEach(function(k){
    var el = document.getElementById(panels[k]);
    if (el) el.classList.remove('act');
  });
  var active = document.getElementById(panels[tab]);
  if (active) active.classList.add('act');
}

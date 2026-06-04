// reglaments.js – Regulations tabs switcher
// ──────────────────────────────────────────────────────────

var REG_PANELS = ['rpFederacio','rpWa','rpComites','rpJutges'];

function setRegTab(tab, btn) {
  // Desactiva totes les pestanyes
  document.querySelectorAll('#regTabs .doc-tab').forEach(function(b){
    b.classList.remove('act');
  });
  if (btn) btn.classList.add('act');

  // Amaga tots els panels
  REG_PANELS.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Mostra el panel seleccionat
  var active = document.getElementById('rp' + tab.charAt(0).toUpperCase() + tab.slice(1));
  if (active) active.style.display = 'block';
}

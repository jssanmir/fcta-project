// transparencia.js – Transparència: tab switcher
// ──────────────────────────────────────────────────────────

function setTranspTab(tab, btn) {
  document.querySelectorAll('#transpTabs .transp-tab').forEach(function(b){ b.classList.remove('act'); });
  btn.classList.add('act');
  document.querySelectorAll('.transp-panel').forEach(function(p){ p.classList.remove('act'); });
  var panel = document.getElementById('tp' + tab.charAt(0).toUpperCase() + tab.slice(1));
  if (panel) panel.classList.add('act');
}

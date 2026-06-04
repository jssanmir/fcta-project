// init.js – DOMContentLoaded bootstrap
// ──────────────────────────────────────────────────────────

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){
  renderCirc('all');
  renderComp('all');
  renderNews();
  renderForm();
  renderTirades('all');
  populateClubs();
  updatePendDot();
  renderClubs();
  renderCalendari();
  renderHeroPanel();
  setS('home');
});

// ── Hero panel: inscripcions obertes + notícies ────────────
function renderHeroPanel() {
  var compEl = document.getElementById('hlpComps');
  if (compEl) {
    var open = (DB.competitions || []).filter(function(c) {
      return resolveStatus(c) === 'open';
    }).slice(0, 3);
    if (open.length) {
      compEl.innerHTML = open.map(function(c) {
        return '<div class="hlp-item" onclick="setS(\'competitions\')">'
          + '<div style="flex:1;min-width:0">'
          + '<div class="hlp-item-disc">' + c.disc + '</div>'
          + '<div class="hlp-item-title">' + c.title + '</div>'
          + '<div class="hlp-item-meta">📅 ' + c.date + ' &nbsp;·&nbsp; 📍 ' + c.loc + '</div>'
          + '</div>'
          + '<span style="color:var(--gold);font-size:.8rem;flex-shrink:0">→</span>'
          + '</div>';
      }).join('');
    } else {
      compEl.innerHTML = '<div class="hlp-empty">Cap competició oberta ara mateix</div>';
    }
  }

  var newsEl = document.getElementById('hlpNews');
  if (newsEl) {
    var latest = (DB.news || []).slice(0, 3);
    if (latest.length) {
      newsEl.innerHTML = latest.map(function(n) {
        return '<div class="hlp-item" onclick="openNews(' + n.id + ')">'
          + '<img class="hlp-item-img" src="' + n.img + '" alt="" onerror="this.style.display=\'none\'">'
          + '<div style="flex:1;min-width:0">'
          + '<div class="hlp-item-disc">' + n.cat + '</div>'
          + '<div class="hlp-item-title">' + n.title + '</div>'
          + '<div class="hlp-item-meta">📅 ' + n.date + '</div>'
          + '</div>'
          + '</div>';
      }).join('');
    }
  }
}

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
  fixPuntVolat();
  setS('home');
});

// ── Fix l·l geminada en títols i etiquetes ────────────────
// Embolcalla el punt volat (·) en un <span class="punt-volat">
// perquè en fonts condensades pesades el punt queda massa comprimit.
function fixPuntVolat() {
  // Apliquem a tots els elements de text: headings, paràgrafs i llistes
  var selectors = 'h1, h2, h3, h4, h5, h6, p, li, td, th, .sec-title, .hub-card-name, .home-hub-title, .bnav-item-label, .nav-links a, .cbadge';
  var elements = document.querySelectorAll(selectors);
  elements.forEach(function(el) {
    // Recorrem només nodes de text per no trencar event listeners
    var nodes = Array.prototype.slice.call(el.childNodes);
    nodes.forEach(function(node) {
      if (node.nodeType === 3 && node.nodeValue.indexOf('·') !== -1) {
        var frag = document.createDocumentFragment();
        var parts = node.nodeValue.split('·');
        parts.forEach(function(part, i) {
          frag.appendChild(document.createTextNode(part));
          if (i < parts.length - 1) {
            var span = document.createElement('span');
            span.className = 'punt-volat';
            span.textContent = '·';
            frag.appendChild(span);
          }
        });
        el.replaceChild(frag, node);
      }
    });
  });
}

// ── Hero panel: inscripcions obertes + notícies ────────────
function renderHeroPanel() {
  var compEl = document.getElementById('hlpComps');
  if (compEl) {
    var open = (DB.competitions || []).filter(function(c) {
      return resolveStatus(c) === 'open';
    }).slice(0, 3);
    if (open.length) {
      compEl.innerHTML = '';
      open.forEach(function(c) {
        var div = document.createElement('div');
        div.className = 'hlp-item';
        div.onclick = function(){ setS('competitions'); };
        div.innerHTML = '<div style="flex:1;min-width:0">'
          + '<div class="hlp-item-disc"></div>'
          + '<div class="hlp-item-title"></div>'
          + '<div class="hlp-item-meta"></div>'
          + '</div>'
          + '<span style="color:var(--gold);font-size:.8rem;flex-shrink:0">→</span>';
        div.querySelector('.hlp-item-disc').textContent = c.disc || '';
        div.querySelector('.hlp-item-title').textContent = c.title || '';
        div.querySelector('.hlp-item-meta').textContent = '📅 ' + (c.date||'') + ' · 📍 ' + (c.loc||'');
        compEl.appendChild(div);
      });
    } else {
      compEl.innerHTML = '<div class="hlp-empty">Cap competició oberta ara mateix</div>';
    }
  }

  var newsEl = document.getElementById('hlpNews');
  if (newsEl) {
    var latest = (DB.news || []).slice(0, 3);
    if (latest.length) {
      newsEl.innerHTML = '';
      latest.forEach(function(n) {
        var div = document.createElement('div');
        div.className = 'hlp-item';
        div.onclick = function(){ openNews(n.id); };
        var img = document.createElement('img');
        img.className = 'hlp-item-img';
        img.alt = '';
        img.onerror = function(){ this.style.display='none'; };
        // Permet només URLs segures per a imatges
        if (n.img && /^(https?:\/\/|\/|img\/)/.test(n.img)) img.src = n.img;
        var inner = document.createElement('div');
        inner.style.cssText = 'flex:1;min-width:0';
        inner.innerHTML = '<div class="hlp-item-disc"></div>'
          + '<div class="hlp-item-title"></div>'
          + '<div class="hlp-item-meta"></div>';
        inner.querySelector('.hlp-item-disc').textContent = n.cat || '';
        inner.querySelector('.hlp-item-title').textContent = n.title || '';
        inner.querySelector('.hlp-item-meta').textContent = '📅 ' + (n.date||'');
        div.appendChild(img);
        div.appendChild(inner);
        newsEl.appendChild(div);
      });
    }
  }
}

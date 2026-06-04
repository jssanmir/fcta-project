// competitions.js – Competitions render, filter & auto-status
// ──────────────────────────────────────────────────────────

// ── Resolució automàtica d'estat per data ─────────────────
// Si dateISO ha passat → 'closed', si falta menys de 7 dies → 'open',
// en cas contrari respecta l'status base del DB
function resolveStatus(c) {
  if (!c.dateISO) return c.status;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var compDate = new Date(c.dateISO);
  compDate.setHours(23, 59, 59, 0); // considera el dia sencer
  if (compDate < today) return 'closed';
  return c.status; // 'open' o 'soon' tal com definit al DB
}

// ── Filtres ────────────────────────────────────────────────
function filtComp(type, btn) {
  document.querySelectorAll('#compFilters .fb').forEach(function(b) { b.classList.remove('act'); });
  btn.classList.add('act');
  renderComp(type);
}

// ── Render ─────────────────────────────────────────────────
function renderComp(f) {
  var data = f === 'all'
    ? DB.competitions
    : DB.competitions.filter(function(c) { return c.type === f; });

  var sL = { open: 'Inscripcions obertes', soon: 'Pròximament', closed: 'Tancat' };
  var sC = { open: 's-open', soon: 's-soon', closed: 's-closed' };

  document.getElementById('compGrid').innerHTML = data.map(function(c) {
    var status = resolveStatus(c); // ← estat efectiu (auto-tancat si ha passat)
    var acts = '';

    if (status === 'open') {
      if (c.url && c.url !== '#' && c.url.indexOf('#news:') !== 0) {
        acts = '<a class="bsm bsm-o" href="' + c.url + '" target="_blank">&#128196; Més info</a>';
      }
    } else if (status === 'soon') {
      acts = '<button class="bsm bsm-o" onclick="toast(\'T\'avisarem quan s\'obrin les inscripcions!\',\'&#128276;\')">&#128276; Avisa\'m</button>';
    } else {
      // closed
      if (c.url && c.url.indexOf('#news:') === 0) {
        var nid = parseInt(c.url.replace('#news:', ''));
        acts = '<button class="bsm bsm-o" onclick="openNews(' + nid + ')">&#128202; Notícia</button>';
      } else if (c.url && c.url !== '#') {
        acts = '<a class="bsm bsm-o" href="' + c.url + '" target="_blank">&#128202; Resultats</a>';
      }
      if (c.ianseo) {
        acts += '<a class="bsm bsm-n" href="https://www.ianseo.net/Details.php?toId=' + c.ianseo + '" target="_blank">&#128200; Ianseo</a>';
      }
    }

    return '<div class="comp-card">'
      + '<div class="comp-stripe ' + c.type + '"></div>'
      + '<div class="comp-body">'
      + '<div class="comp-disc">' + c.disc + '</div>'
      + '<span class="comp-status ' + sC[status] + '">&bull; ' + sL[status] + '</span>'
      + '<h3>' + c.title + '</h3>'
      + '<div class="comp-mi">&#128197; ' + c.date + '</div>'
      + '<div class="comp-mi">&#128205; ' + c.loc + '</div>'
      + '<div class="comp-mi">&#128203; ' + c.circ + '</div>'
      + '<div class="comp-actions">' + acts + '</div>'
      + '</div></div>';
  }).join('');
}

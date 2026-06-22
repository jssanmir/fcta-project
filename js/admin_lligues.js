// admin_lligues.js – Admin: Gestió de lligues
// ──────────────────────────────────────────────────────────

var _admLligaDisc = 'al';

var _ADM_LL_DISCS = [
  {val:'al',   lbl:'Aire Lliure'},
  {val:'sala', lbl:'Sala'},
  {val:'3d',   lbl:'3D / Bosc'},
  {val:'camp', lbl:'Camp'},
  {val:'aa',   lbl:'Arc Adaptat'},
  {val:'run',  lbl:'Run Archery'}
];

// Mapa type de competicions per disc key
var _ADM_LL_TYPE_MAP = {al:'al', sala:'sala', '3d':'trd', camp:'camp', aa:'al', run:'al'};

function renderAdmLligues(b) {
  if (!DB.lligues) DB.lligues = [];

  // Tabs de disciplina
  var discTabs = _ADM_LL_DISCS.map(function(d) {
    var act = d.val === _admLligaDisc;
    return '<button onclick="_setAdmLligaDisc(\'' + d.val + '\')" '
      + 'style="background:' + (act ? 'var(--navy)' : 'var(--offwhite)') + ';'
      + 'color:' + (act ? 'white' : 'var(--navy)') + ';'
      + 'border:1.5px solid var(--navy);border-radius:var(--r-md);'
      + 'padding:.3rem .75rem;font-size:.8rem;font-weight:700;cursor:pointer;white-space:nowrap">'
      + escHtml(d.lbl) + '</button>';
  }).join('');

  var discLbl = (_ADM_LL_DISCS.find(function(d){ return d.val === _admLligaDisc; }) || {}).lbl || _admLligaDisc;
  var lligues = DB.lligues.filter(function(l){ return l.disc === _admLligaDisc; });

  var html = '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem">' + discTabs + '</div>';

  // ─ Formulari nova lliga ──────────────────────────────────
  html += '<div class="crud-form">'
    + '<div class="crud-form-title">&#10010; Nova Lliga – ' + escHtml(discLbl) + '</div>'
    + mkField('Nom de la lliga *', 'll_nom', 'text', '', 'Lliga Catalana ' + escHtml(discLbl) + ' 2027')
    + '<div class="af-row">'
    + mkField('Temporada *', 'll_temp', 'text', '', '2027')
    + mkField('Etiqueta rànquing', 'll_rlbl', 'text', '', 'Classificació Final Lliga 2026/27')
    + '</div>'
    + mkUploadField('PDF Rànquing', 'll_rurl', '', 'pdf')
    + '<button class="a-sub success" onclick="crudAddLliga()">&#10010; Crear Lliga</button>'
    + '</div>';

  // ─ Llistat de lligues ────────────────────────────────────
  if (!lligues.length) {
    html += '<p style="font-size:.85rem;color:var(--gray);padding:.5rem 0">Cap lliga per a ' + escHtml(discLbl) + '. Crea-ne una.</p>';
  } else {
    lligues.forEach(function(ll) {
      html += _renderAdmLligaCard(ll);
    });
  }

  b.innerHTML = html;
}

function _setAdmLligaDisc(disc) {
  _admLligaDisc = disc;
  renderAdmLligues(document.getElementById('admBody'));
}

function _renderAdmLligaCard(ll) {
  var tirades = ll.tirades || [];

  // Llista tirades existents
  var tiHtml = '';
  if (tirades.length) {
    tirades.forEach(function(t, idx) {
      var info = '';
      if (t.compId) {
        var comp = (DB.competitions||[]).find(function(c){ return c.id === t.compId; });
        info = comp
          ? '🔗 [' + t.compId + '] ' + comp.title + ' (' + comp.date + ')'
          : '🔗 Competició #' + t.compId + ' no trobada';
      } else {
        info = '📅 ' + (t.data||'—') + ' · 📍 ' + (t.lloc||'—')
          + ' · ' + (t.status === 'open' ? '🟢' : t.status === 'soon' ? '🟡' : '✅');
        if (t.circ && t.circ !== '#') info += ' · 📃 ' + t.circ;
        if (t.ianseo) info += ' · Ianseo:' + t.ianseo;
      }
      tiHtml += '<div style="display:flex;gap:.5rem;align-items:center;font-size:.8rem;padding:.3rem 0;border-bottom:1px solid var(--lightgray)">'
        + '<span style="font-weight:700;min-width:3.5rem;color:var(--navy)">' + escHtml(t.num) + '</span>'
        + '<span style="flex:1;color:var(--gray)">' + escHtml(info) + '</span>'
        + '<button class="btn-del-crud" style="padding:.2rem .45rem" onclick="crudDelTirada(' + ll.id + ',' + idx + ')">✕</button>'
        + '</div>';
    });
  } else {
    tiHtml = '<p style="font-size:.78rem;color:var(--gray);padding:.3rem 0;margin:0">Cap tirada afegida.</p>';
  }

  // Opcions de competicions per al disc
  var typeFilter = _ADM_LL_TYPE_MAP[ll.disc] || ll.disc;
  var compOpts = '<option value="">— Entrada manual —</option>';
  (DB.competitions||[])
    .filter(function(c){ return c.type === typeFilter; })
    .sort(function(a,b){ return (b.dateISO||'').localeCompare(a.dateISO||''); })
    .forEach(function(c) {
      compOpts += '<option value="' + c.id + '">[' + c.id + '] ' + escHtml(c.title) + ' (' + escHtml(c.date) + ')</option>';
    });

  return '<div class="crud-item" style="flex-direction:column;align-items:stretch;margin-bottom:1rem">'
    // Capçalera lliga
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem">'
    + '<div><strong style="font-size:.95rem">' + escHtml(ll.nom) + '</strong>'
    + ' <span class="crud-count-badge">' + escHtml(ll.temporada) + '</span>'
    + (ll.ranquingUrl && ll.ranquingUrl !== '#'
        ? ' <a href="' + escHtml(ll.ranquingUrl) + '" target="_blank" style="font-size:.75rem;color:var(--navy-light)">📊</a>'
        : '')
    + '</div>'
    + '<div style="display:flex;gap:.4rem">'
    + '<button class="btn-edit-crud" onclick="crudEditLliga(' + ll.id + ')">✏ Editar</button>'
    + '<button class="btn-del-crud" onclick="crudDelLliga(' + ll.id + ')">🗑</button>'
    + '</div>'
    + '</div>'
    // Tirades actuals
    + '<div style="background:var(--offwhite);border-radius:var(--r-md);padding:.5rem .75rem;margin-bottom:.5rem">'
    + '<div style="font-size:.72rem;font-weight:700;text-transform:uppercase;color:var(--gray);margin-bottom:.3rem">Tirades (' + tirades.length + ')</div>'
    + tiHtml
    + '</div>'
    // Formulari afegir tirada
    + '<div style="background:#f0f7ff;border:1px dashed var(--navy-light);border-radius:var(--r-md);padding:.6rem .75rem">'
    + '<div style="font-size:.75rem;font-weight:700;color:var(--navy);margin-bottom:.4rem">+ Afegir tirada</div>'
    + '<div style="display:flex;gap:.4rem;flex-wrap:wrap;align-items:flex-end">'
    + '<div class="af-g" style="width:5rem;margin-bottom:0"><label>Núm</label>'
    + '<input type="text" id="ti_num_' + ll.id + '" placeholder="1ª, Final…"></div>'
    + '<div class="af-g" style="flex:1;min-width:12rem;margin-bottom:0"><label>Competició del calendari (opcional)</label>'
    + '<select id="ti_comp_' + ll.id + '" onchange="_tiCompChange(' + ll.id + ',this.value)">' + compOpts + '</select></div>'
    + '</div>'
    + '<div id="ti_manual_' + ll.id + '" style="display:none;margin-top:.4rem">'
    + '<div style="display:flex;gap:.4rem;flex-wrap:wrap">'
    + '<div class="af-g" style="flex:1;min-width:7rem;margin-bottom:0"><label>Data</label>'
    + '<input type="text" id="ti_data_' + ll.id + '" placeholder="14 mar 2027"></div>'
    + '<div class="af-g" style="flex:1;min-width:7rem;margin-bottom:0"><label>Lloc</label>'
    + '<input type="text" id="ti_lloc_' + ll.id + '" placeholder="Ciutat / Pavelló"></div>'
    + '<div class="af-g" style="width:9rem;margin-bottom:0"><label>Estat</label>'
    + '<select id="ti_status_' + ll.id + '">'
    + '<option value="soon">Pròximament</option>'
    + '<option value="open">Oberta inscripció</option>'
    + '<option value="closed">Finalitzada</option>'
    + '</select></div>'
    + '</div>'
    + '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.4rem">'
    + '<div class="af-g" style="width:8rem;margin-bottom:0"><label>CIRC</label>'
    + '<input type="text" id="ti_circ_' + ll.id + '" placeholder="CIRC-XXXX"></div>'
    + '<div class="af-g" style="width:7rem;margin-bottom:0"><label>ID Ianseo</label>'
    + '<input type="text" id="ti_ianseo_' + ll.id + '" placeholder="28416"></div>'
    + '</div>'
    + '</div>'
    + '<button class="a-sub success" style="margin-top:.5rem;font-size:.82rem;padding:.35rem .8rem" onclick="crudAddTirada(' + ll.id + ')">+ Afegir tirada</button>'
    + '</div>'
    + '</div>';
}

function _tiCompChange(llId, val) {
  var manual = document.getElementById('ti_manual_' + llId);
  if (manual) manual.style.display = val ? 'none' : '';
}

function crudAddLliga() {
  var nom  = fv('ll_nom').trim();
  var temp = fv('ll_temp').trim();
  if (!nom || !temp) { toast('Nom i temporada són obligatoris', '⚠️'); return; }
  if (!DB.lligues) DB.lligues = [];
  DB.lligues.push({
    id:          Date.now(),
    disc:        _admLligaDisc,
    nom:         nom,
    temporada:   temp,
    ranquingUrl: fv('ll_rurl') || '#',
    ranquingLabel: fv('ll_rlbl') || '',
    historics:   [],
    tirades:     []
  });
  dbSave();
  toast('Lliga "' + nom + '" creada!', '✅');
  renderAdmLligues(document.getElementById('admBody'));
}

function crudDelLliga(id) {
  var ll = (DB.lligues||[]).find(function(l){ return l.id === id; });
  if (!ll) return;
  confirmDel(ll.nom, function() {
    DB.lligues = DB.lligues.filter(function(l){ return l.id !== id; });
    dbSave();
    renderAdmLligues(document.getElementById('admBody'));
  });
}

function crudEditLliga(id) {
  var ll = (DB.lligues||[]).find(function(l){ return l.id === id; });
  if (!ll) return;
  var nom  = prompt('Nom de la lliga:', ll.nom);
  if (nom === null) return;
  var temp = prompt('Temporada:', ll.temporada);
  if (temp === null) return;
  var rlbl = prompt('Etiqueta del rànquing:', ll.ranquingLabel || '');
  if (rlbl === null) return;
  ll.nom          = nom.trim()  || ll.nom;
  ll.temporada    = temp.trim() || ll.temporada;
  ll.ranquingLabel = rlbl.trim();
  dbSave();
  toast('Lliga actualitzada', '✅');
  renderAdmLligues(document.getElementById('admBody'));
}

function crudAddTirada(llId) {
  var ll = (DB.lligues||[]).find(function(l){ return l.id === llId; });
  if (!ll) return;
  var numEl = document.getElementById('ti_num_' + llId);
  var num   = numEl ? numEl.value.trim() : '';
  if (!num) { toast('El número/nom de la tirada és obligatori', '⚠️'); return; }

  var compSel = document.getElementById('ti_comp_' + llId);
  var compId  = compSel ? parseInt(compSel.value) : 0;

  var tirada = { num: num };
  if (compId) {
    tirada.compId = compId;
  } else {
    tirada.data   = (document.getElementById('ti_data_'   + llId)||{}).value.trim() || '—';
    tirada.lloc   = (document.getElementById('ti_lloc_'   + llId)||{}).value.trim() || '—';
    tirada.status = (document.getElementById('ti_status_' + llId)||{}).value || 'soon';
    tirada.circ   = (document.getElementById('ti_circ_'   + llId)||{}).value.trim() || '#';
    tirada.ianseo = (document.getElementById('ti_ianseo_' + llId)||{}).value.trim() || '';
  }
  ll.tirades.push(tirada);
  dbSave();
  toast('Tirada ' + num + ' afegida!', '✅');
  renderAdmLligues(document.getElementById('admBody'));
}

function crudDelTirada(llId, idx) {
  var ll = (DB.lligues||[]).find(function(l){ return l.id === llId; });
  if (!ll || !ll.tirades[idx]) return;
  var t = ll.tirades[idx];
  if (!confirm('Eliminar tirada "' + t.num + '"?')) return;
  ll.tirades.splice(idx, 1);
  dbSave();
  renderAdmLligues(document.getElementById('admBody'));
}

// records_form.js – Sol·licitud d'homologació de rècords + admin
// ──────────────────────────────────────────────────────────

// ── DB de sol·licituds pendents ────────────────────────────
if (!DB.recordsSolicituds) DB.recordsSolicituds = [];

// ── Opcions dels selects ───────────────────────────────────
var REC_DISCIPLINES = ['Aire Lliure', 'Sala', '3D / Bosc', 'Tir de Camp'];
var REC_ESTILS = ['Arc Recorbat', 'Arc Compost', 'Arc Nu', 'Longbow', 'Tradicional', 'Instintiu'];
var REC_CATEGORIES = [
  'Prebenjamí (U10)', 'Benjamí (U12)', 'Aleví (U14)',
  'Sub-15', 'Sub-18', 'Sub-21',
  'Sènior', '+50', '+60'
];

// ── Obre el modal del formulari ────────────────────────────
function openRecordForm() {
  var disc = (_discActiva && DISC_DATA[_discActiva]) ? DISC_DATA[_discActiva].nom : '';

  document.getElementById('recordFormOverlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Pre-selecciona la disciplina activa si és possible
  var selDisc = document.getElementById('rf_disciplina');
  if (selDisc && disc) {
    for (var i = 0; i < selDisc.options.length; i++) {
      if (selDisc.options[i].value === disc) {
        selDisc.selectedIndex = i; break;
      }
    }
  }
}

function closeRecordForm() {
  document.getElementById('recordFormOverlay').style.display = 'none';
  document.body.style.overflow = '';
}

// ── Envia la sol·licitud ───────────────────────────────────
function submitRecordForm() {
  var disc   = (document.getElementById('rf_disciplina') || {}).value || '';
  var estil  = (document.getElementById('rf_estil')      || {}).value || '';
  var cat    = (document.getElementById('rf_categoria')  || {}).value || '';
  var sexe   = (document.getElementById('rf_sexe')       || {}).value || '';
  var marca  = ((document.getElementById('rf_marca')     || {}).value || '').trim();
  var atleta = ((document.getElementById('rf_atleta')    || {}).value || '').trim();
  var club   = ((document.getElementById('rf_club')      || {}).value || '').trim();
  var data   = ((document.getElementById('rf_data')      || {}).value || '').trim();
  var comp   = ((document.getElementById('rf_competicio')|| {}).value || '').trim();
  var email  = ((document.getElementById('rf_email')     || {}).value || '').trim();
  var obs    = ((document.getElementById('rf_obs')       || {}).value || '').trim();

  // Validació bàsica
  if (!disc || !estil || !cat || !sexe || !marca || !atleta || !data || !email) {
    toast('Omple tots els camps obligatoris (*)', '⚠️');
    return;
  }
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    toast('L\'adreça de correu no és vàlida', '⚠️');
    return;
  }

  var sol = {
    id:         Date.now(),
    disc:       disc,
    estil:      estil,
    cat:        cat + ' ' + sexe,
    marca:      marca,
    atleta:     atleta,
    club:       club,
    data:       data,
    competicio: comp,
    email:      email,
    obs:        obs,
    status:     'pend',
    creat:      new Date().toLocaleDateString('ca-ES')
  };

  DB.recordsSolicituds.unshift(sol);
  dbSave();
  updatePendDot();

  // Reset formulari
  ['rf_marca','rf_atleta','rf_club','rf_competicio','rf_email','rf_obs'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });

  closeRecordForm();
  toast('Sol·licitud enviada! Serà revisada per l\'administrador.', '🏆');
}

// ── Admin: render sol·licituds pendents ─────────────────────
function renderAdmRecords(container) {
  var pend = (DB.recordsSolicituds || []).filter(function(r){ return r.status === 'pend'; });
  var aprov = (DB.recordsSolicituds || []).filter(function(r){ return r.status !== 'pend'; });

  var html = '<div class="adm-st">Sol·licituds rècords pendents'
    + (pend.length ? ' <span class="crud-count-badge">' + pend.length + '</span>' : '')
    + '</div>';

  if (!pend.length) {
    html += '<p style="font-size:.85rem;color:var(--gray);padding:.5rem 0;margin-bottom:1rem">Cap sol·licitud de rècord pending. ✓</p>';
  } else {
    html += '<div style="display:flex;flex-direction:column;gap:.75rem;margin-bottom:1.5rem">';
    pend.forEach(function(r) {
      html += '<div class="adm-tirada-card">'
        + '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.4rem">'
        + '<span class="crud-count-badge" style="background:var(--navy)">' + r.disc + '</span>'
        + '<span class="crud-count-badge" style="background:#555">' + r.estil + '</span>'
        + '<span class="crud-count-badge" style="background:#777">' + r.cat + '</span>'
        + '</div>'
        + '<strong style="font-size:.95rem">' + r.atleta + '</strong>'
        + (r.club ? ' &nbsp;·&nbsp; ' + r.club : '') + '<br>'
        + '<span style="font-size:1.1rem;font-weight:900;color:var(--navy-dark)">📊 ' + r.marca + '</span>'
        + ' &nbsp;·&nbsp; <span style="font-size:.82rem;color:var(--gray)">📅 ' + r.data
        + (r.competicio ? ' – ' + r.competicio : '') + '</span><br>'
        + '<span style="font-size:.78rem;color:var(--gray)">✉️ ' + r.email + '</span>'
        + (r.obs ? '<br><em style="font-size:.78rem;color:var(--gray)">' + r.obs + '</em>' : '')
        + '<div style="margin-top:.6rem;display:flex;gap:.5rem">'
        + '<button class="adm-btn-green" onclick="approveRecord(' + r.id + ')">✅ Aprovar</button>'
        + '<button class="adm-btn-red"   onclick="rejectRecord(' + r.id + ')">✗ Rebutjar</button>'
        + '</div>'
        + '</div>';
    });
    html += '</div>';
  }

  // Historial aprovades/rebutjades
  if (aprov.length) {
    html += '<div class="adm-st" style="margin-top:1rem">Historial (' + aprov.length + ')</div>';
    html += '<div style="display:flex;flex-direction:column;gap:.5rem">';
    aprov.forEach(function(r) {
      var color = r.status === 'valid' ? '#2e7d32' : '#b71c1c';
      var badge = r.status === 'valid' ? '✅ Aprovada' : '✗ Rebutjada';
      html += '<div style="font-size:.82rem;padding:.5rem .75rem;background:var(--offwhite);border-radius:6px;border-left:3px solid ' + color + '">'
        + '<strong>' + r.atleta + '</strong> – ' + r.disc + ' / ' + r.estil + ' / ' + r.cat
        + ' – <strong>' + r.marca + '</strong>'
        + ' <span style="color:' + color + ';font-weight:700">' + badge + '</span>'
        + '</div>';
    });
    html += '</div>';
  }

  container.innerHTML = html;
}

function approveRecord(id) {
  var r = (DB.recordsSolicituds || []).find(function(x){ return x.id === id; });
  if (!r) return;
  r.status = 'valid';
  dbSave();
  // Afegeix als rècords de la disciplina corresponent
  var discKey = Object.keys(DISC_DATA).find(function(k){
    return DISC_DATA[k].nom === r.disc
      || (r.disc.indexOf('Sala') !== -1 && k === 'al')
      || (r.disc.indexOf('Aire Lliure') !== -1 && k === 'al');
  });
  if (discKey && DISC_DATA[discKey]) {
    DISC_DATA[discKey].records.unshift({
      disc:   r.disc, estil: r.estil, cat: r.cat,
      marca:  r.marca, atleta: r.atleta, any: r.data.split('/').pop() || r.data.slice(-4)
    });
  }
  updatePendDot();
  toast('Rècord de ' + r.atleta + ' aprovat i publicat!', '✅');
  var adm = document.getElementById('admBody');
  if (adm) renderAdmRecords(adm.querySelector('.adm-records-section') || adm);
}

function rejectRecord(id) {
  var r = (DB.recordsSolicituds || []).find(function(x){ return x.id === id; });
  if (!r) return;
  r.status = 'rejected';
  dbSave();
  updatePendDot();
  toast('Sol·licitud de rècord rebutjada.', '✗');
  var adm = document.getElementById('admBody');
  if (adm) renderAdmRecords(adm.querySelector('.adm-records-section') || adm);
}

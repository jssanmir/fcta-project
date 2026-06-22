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
  'Sènior', '+50'
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

// ── Opcions pels selects d'admin ───────────────────────────
var ADM_REC_DISCS = [
  {val:'sala', lbl:'Sala'}, {val:'al', lbl:'Aire Lliure'}, {val:'aa', lbl:'Arc Adaptat'}
];
var ADM_REC_ESTILS = ['Recorbat','Compost','Arc Nu','Longbow','Tradicional','Instintiu','Estàndard'];
var ADM_REC_CATS   = ['Prebenjamí','Benjamí','Aleví','Sub-15','Sub-18','Sub-21','Sènior','Veterà','+50'];
var ADM_REC_SEXES  = ['Dona','Home'];
var _admRecDisc = 'sala';
var _admRecEditId = null;

// ── Admin: render rècords ────────────────────────────────────
function renderAdmRecords(container) {
  var html = '';

  // ─ Secció 1: Gestió directa de DB.records ─────────────────
  html += '<div class="adm-st">Rècords Catalans <span style="font-size:.7rem;font-weight:400;text-transform:none;color:var(--gray)">(' + (DB.records||[]).length + ' rècords)</span></div>';

  // Filtre per disciplina
  html += '<div style="display:flex;gap:.4rem;margin-bottom:.75rem;flex-wrap:wrap">';
  ADM_REC_DISCS.forEach(function(d) {
    html += '<button onclick="_setAdmRecDisc(\'' + d.val + '\')" '
      + 'style="background:' + (d.val === _admRecDisc ? 'var(--navy)' : 'var(--offwhite)') + ';'
      + 'color:' + (d.val === _admRecDisc ? 'white' : 'var(--navy)') + ';'
      + 'border:1.5px solid var(--navy);border-radius:var(--r-md);padding:.3rem .75rem;font-size:.8rem;font-weight:700;cursor:pointer">'
      + d.lbl + '</button>';
  });
  html += '</div>';

  // Formulari afegir/editar
  var editing = _admRecEditId !== null;
  var er = editing ? (DB.records||[]).find(function(x){ return x.id === _admRecEditId; }) : null;
  html += '<div class="crud-form" style="margin-bottom:1rem">'
    + '<div class="crud-form-title">' + (editing ? '✏ Editar Rècord' : '&#10010; Afegir Rècord') + '</div>'
    + '<div class="af-row">'
    + mkField('Disciplina *','rc_disc','select', (er ? er.disc : _admRecDisc),'', ADM_REC_DISCS.map(function(d){return {val:d.val,lbl:d.lbl};}))
    + mkField('Estil *','rc_estil','select', (er ? er.estil : 'Recorbat'),'', ADM_REC_ESTILS.map(function(e){return {val:e,lbl:e};}))
    + '</div>'
    + '<div class="af-row">'
    + mkField('Categoria *','rc_cat','select', (er ? er.cat : 'Sènior'),'', ADM_REC_CATS.map(function(c){return {val:c,lbl:c};}))
    + mkField('Sexe *','rc_sex','select', (er ? er.sex : 'Dona'),'', ADM_REC_SEXES.map(function(s){return {val:s,lbl:s};}))
    + '</div>'
    + '<div class="af-row">'
    + mkField('Format','rc_format','text', (er ? er.format : ''),'18m/60fl, Round 720…')
    + mkField('Marca (punts) *','rc_marca','number', (er ? er.marca : ''),'p. ex. 674')
    + '</div>'
    + mkField('Atleta *','rc_atleta','text', (er ? er.atleta : ''),'Nom i cognoms')
    + '<div class="af-row">'
    + mkField('Competició','rc_comp','text', (er ? er.competicio : ''),'Nom de la competició')
    + mkField('Data (DD/MM/AAAA)','rc_data','text', (er ? er.data : ''),'p. ex. 15/06/2026')
    + '</div>'
    + (editing ? '<input type="hidden" id="rc_edit_id" value="' + _admRecEditId + '">' : '')
    + '<div style="display:flex;gap:.5rem">'
    + '<button class="a-sub success" onclick="crudSaveRecord()">' + (editing ? '💾 Desar canvis' : '&#10010; Afegir Rècord') + '</button>'
    + (editing ? '<button class="a-sub danger" onclick="_cancelEditRecord()">✕ Cancel·lar</button>' : '')
    + '</div>'
    + '</div>';

  // Llistat de rècords filtrats
  var recs = (DB.records||[]).filter(function(r){ return r.disc === _admRecDisc; });
  html += '<div style="font-size:.78rem;color:var(--gray);margin-bottom:.4rem">'
    + recs.length + ' rècords per ' + (ADM_REC_DISCS.find(function(d){return d.val===_admRecDisc;}) || {lbl:_admRecDisc}).lbl + '</div>';

  if (recs.length) {
    html += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.8rem">'
      + '<thead><tr style="background:var(--navy);color:white">'
      + '<th style="padding:.35rem .5rem;text-align:left">Estil</th>'
      + '<th style="padding:.35rem .5rem;text-align:left">Cat</th>'
      + '<th style="padding:.35rem .5rem;text-align:left">Sexe</th>'
      + '<th style="padding:.35rem .5rem;text-align:left">Format</th>'
      + '<th style="padding:.35rem .5rem;text-align:right">Marca</th>'
      + '<th style="padding:.35rem .5rem;text-align:left">Atleta</th>'
      + '<th style="padding:.35rem .5rem;text-align:left">Data</th>'
      + '<th style="padding:.35rem .5rem"></th>'
      + '</tr></thead><tbody>';
    recs.forEach(function(r) {
      var bg = (_admRecEditId === r.id) ? 'background:#fff9c4' : '';
      html += '<tr style="border-bottom:1px solid var(--lightgray);' + bg + '">'
        + '<td style="padding:.3rem .5rem">' + escHtml(r.estil) + '</td>'
        + '<td style="padding:.3rem .5rem">' + escHtml(r.cat) + '</td>'
        + '<td style="padding:.3rem .5rem">' + escHtml(r.sex||'') + '</td>'
        + '<td style="padding:.3rem .5rem;color:var(--gray)">' + escHtml(r.format||'') + '</td>'
        + '<td style="padding:.3rem .5rem;text-align:right;font-weight:700">' + r.marca + '</td>'
        + '<td style="padding:.3rem .5rem">' + escHtml(r.atleta) + '</td>'
        + '<td style="padding:.3rem .5rem;color:var(--gray)">' + escHtml(r.data||'') + '</td>'
        + '<td style="padding:.3rem .5rem;white-space:nowrap">'
        + '<button class="btn-edit-crud" onclick="crudEditRecord(' + r.id + ')">✏</button> '
        + '<button class="btn-del-crud" onclick="crudDelRecord(' + r.id + ')">🗑</button>'
        + '</td></tr>';
    });
    html += '</tbody></table></div>';
  }

  // ─ Secció 2: Sol·licituds pendents ────────────────────────
  var pend = (DB.recordsSolicituds || []).filter(function(r){ return r.status === 'pend'; });
  var aprov = (DB.recordsSolicituds || []).filter(function(r){ return r.status !== 'pend'; });

  html += '<div class="adm-st" style="margin-top:1.5rem">Sol·licituds d\'homologació pendents'
    + (pend.length ? ' <span class="crud-count-badge">' + pend.length + '</span>' : '')
    + '</div>';

  if (!pend.length) {
    html += '<p style="font-size:.85rem;color:var(--gray);padding:.5rem 0;margin-bottom:1rem">Cap sol·licitud pending. ✓</p>';
  } else {
    html += '<div style="display:flex;flex-direction:column;gap:.75rem;margin-bottom:1.5rem">';
    pend.forEach(function(r) {
      html += '<div style="background:white;border:1px solid var(--lightgray);border-radius:var(--r-md);padding:.75rem 1rem">'
        + '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.4rem">'
        + '<span class="crud-count-badge" style="background:var(--navy)">' + escHtml(r.disc) + '</span>'
        + '<span class="crud-count-badge" style="background:#555">' + escHtml(r.estil) + '</span>'
        + '<span class="crud-count-badge" style="background:#777">' + escHtml(r.cat) + '</span>'
        + '</div>'
        + '<strong style="font-size:.95rem">' + escHtml(r.atleta) + '</strong>'
        + (r.club ? ' &nbsp;·&nbsp; ' + escHtml(r.club) : '') + '<br>'
        + '<span style="font-size:1.1rem;font-weight:900;color:var(--navy-dark)">📊 ' + escHtml(r.marca) + '</span>'
        + ' &nbsp;·&nbsp; <span style="font-size:.82rem;color:var(--gray)">📅 ' + escHtml(r.data)
        + (r.competicio ? ' – ' + escHtml(r.competicio) : '') + '</span><br>'
        + '<span style="font-size:.78rem;color:var(--gray)">✉️ ' + escHtml(r.email) + '</span>'
        + (r.obs ? '<br><em style="font-size:.78rem;color:var(--gray)">' + escHtml(r.obs) + '</em>' : '')
        + '<div style="margin-top:.6rem;display:flex;gap:.5rem">'
        + '<button class="btn-ok-crud" onclick="approveRecord(' + r.id + ')">✅ Aprovar i afegir</button>'
        + '<button class="btn-rej-crud" onclick="rejectRecord(' + r.id + ')">✗ Rebutjar</button>'
        + '</div>'
        + '</div>';
    });
    html += '</div>';
  }

  if (aprov.length) {
    html += '<div class="adm-st" style="margin-top:.5rem">Historial sol·licituds (' + aprov.length + ')</div>';
    html += '<div style="display:flex;flex-direction:column;gap:.4rem">';
    aprov.forEach(function(r) {
      var color = r.status === 'valid' ? '#2e7d32' : '#b71c1c';
      var badge = r.status === 'valid' ? '✅ Aprovada' : '✗ Rebutjada';
      html += '<div style="font-size:.82rem;padding:.5rem .75rem;background:var(--offwhite);border-radius:6px;border-left:3px solid ' + color + '">'
        + '<strong>' + escHtml(r.atleta) + '</strong> – ' + escHtml(r.disc) + ' / ' + escHtml(r.estil) + ' / ' + escHtml(r.cat)
        + ' – <strong>' + escHtml(r.marca) + '</strong>'
        + ' <span style="color:' + color + ';font-weight:700">' + badge + '</span>'
        + '</div>';
    });
    html += '</div>';
  }

  container.innerHTML = html;
}

function _setAdmRecDisc(disc) {
  _admRecDisc = disc;
  _admRecEditId = null;
  var adm = document.getElementById('admBody');
  if (adm) renderAdmRecords(adm.querySelector('.adm-records-section') || adm);
}

function crudSaveRecord() {
  var disc   = fv('rc_disc');
  var estil  = fv('rc_estil');
  var cat    = fv('rc_cat');
  var sex    = fv('rc_sex');
  var format = fv('rc_format');
  var marca  = parseInt(fv('rc_marca'));
  var atleta = fv('rc_atleta');
  var comp   = fv('rc_comp');
  var data   = fv('rc_data');
  if (!disc || !estil || !cat || !sex || !atleta || isNaN(marca)) {
    toast('Omple tots els camps obligatoris (*)', '⚠️'); return;
  }
  if (!DB.records) DB.records = [];
  if (_admRecEditId !== null) {
    var rec = DB.records.find(function(r){ return r.id === _admRecEditId; });
    if (rec) {
      rec.disc = disc; rec.estil = estil; rec.cat = cat; rec.sex = sex;
      rec.format = format; rec.marca = marca; rec.atleta = atleta;
      rec.competicio = comp; rec.data = data;
    }
    _admRecEditId = null;
    toast('Rècord actualitzat!', '✅');
  } else {
    DB.records.unshift({ id: Date.now(), disc:disc, estil:estil, cat:cat, sex:sex,
      format:format, marca:marca, atleta:atleta, competicio:comp, data:data });
    toast('Rècord afegit!', '✅');
  }
  _admRecDisc = disc;
  dbSave();
  var adm = document.getElementById('admBody');
  if (adm) renderAdmRecords(adm.querySelector('.adm-records-section') || adm);
}

function crudEditRecord(id) {
  _admRecEditId = id;
  var rec = (DB.records||[]).find(function(r){ return r.id === id; });
  if (rec) _admRecDisc = rec.disc;
  var adm = document.getElementById('admBody');
  if (adm) renderAdmRecords(adm.querySelector('.adm-records-section') || adm);
}

function _cancelEditRecord() {
  _admRecEditId = null;
  var adm = document.getElementById('admBody');
  if (adm) renderAdmRecords(adm.querySelector('.adm-records-section') || adm);
}

function crudDelRecord(id) {
  var rec = (DB.records||[]).find(function(r){ return r.id === id; });
  if (!rec) return;
  confirmDel(rec.atleta + ' – ' + rec.estil + ' – ' + rec.marca + ' pts', function() {
    DB.records = DB.records.filter(function(r){ return r.id !== id; });
    dbSave();
    var adm = document.getElementById('admBody');
    if (adm) renderAdmRecords(adm.querySelector('.adm-records-section') || adm);
  });
}

function approveRecord(id) {
  var r = (DB.recordsSolicituds || []).find(function(x){ return x.id === id; });
  if (!r) return;
  r.status = 'valid';
  // Mapa de noms de disciplina al codi de DB.records
  var discCodeMap = {'Aire Lliure':'al','Sala':'sala','3D / Bosc':'3d','Tir de Camp':'camp'};
  var discCode = discCodeMap[r.disc] || 'al';
  var catParts = r.cat.split(' ');
  var sex = catParts.pop();
  var cat = catParts.join(' ');
  if (!DB.records) DB.records = [];
  DB.records.unshift({
    id:       Date.now(),
    disc:     discCode,
    estil:    r.estil.replace('Arc ',''),
    cat:      cat,
    sex:      sex,
    format:   '',
    marca:    parseInt(r.marca) || 0,
    atleta:   r.atleta,
    competicio: r.competicio || '',
    data:     r.data ? r.data.split('-').reverse().join('/') : ''
  });
  dbSave();
  updatePendDot();
  toast('Rècord de ' + r.atleta + ' aprovat i afegit a DB.records!', '✅');
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

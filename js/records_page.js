// records_page.js – Pàgina de rècords de Catalunya
// Font de dades: DB.records (db.js)
// ──────────────────────────────────────────────────────────

var REC_DISC_LABELS = {
  sala: 'Sala',
  al:   'Aire Lliure',
  aa:   'Arc Adaptat',
};

var REC_CAT_ORDER = [
  'Prebenjamí','Benjamí','Aleví','Sub-15','Sub-18','Sub-21',
  'Sènior','Veterà','+50','+60'
];

var REC_ESTIL_ORDER = [
  'Recorbat','Compost','Arc Nu','Longbow','Tradicional','Instintiu','Estàndard'
];

// ── Filtre actiu ───────────────────────────────────────────
var _recFilter = { disc:'sala', estil:'', cat:'', sex:'' };

// ── Punt d'entrada: renderitza la pàgina ──────────────────
function initRecordsPage() {
  var root = document.getElementById('recordsContent');
  if (!root) return;
  root.innerHTML = buildRecordsFilters() + '<div id="recordsTable"></div>';
  renderRecordsTable();
}

// ── Barra de filtres ───────────────────────────────────────
function buildRecordsFilters() {
  var discTabs = '';
  Object.keys(REC_DISC_LABELS).forEach(function(k) {
    discTabs += '<button class="rec-tab' + (_recFilter.disc === k ? ' rec-tab--active' : '')
      + '" onclick="setRecDisc(\'' + k + '\')">' + REC_DISC_LABELS[k] + '</button>';
  });

  // Estils disponibles per a la disciplina activa
  var estils = getEstilsForDisc(_recFilter.disc);
  var estilOpts = '<option value="">Tots els estils</option>';
  estils.forEach(function(e) {
    estilOpts += '<option value="' + e + '"' + (_recFilter.estil === e ? ' selected' : '') + '>' + e + '</option>';
  });

  // Categories disponibles
  var cats = getCatsForDisc(_recFilter.disc);
  var catOpts = '<option value="">Totes les categories</option>';
  cats.forEach(function(c) {
    catOpts += '<option value="' + c + '"' + (_recFilter.cat === c ? ' selected' : '') + '>' + c + '</option>';
  });

  return '<div class="rec-filters">'
    + '<div class="rec-tabs">' + discTabs + '</div>'
    + '<div class="rec-selects">'
    + '<select class="rec-sel" onchange="setRecEstil(this.value)">' + estilOpts + '</select>'
    + '<select class="rec-sel" onchange="setRecCat(this.value)">' + catOpts + '</select>'
    + '<div class="rec-sex-btns">'
    + '<button class="rec-sex' + (!_recFilter.sex ? ' rec-sex--active' : '') + '" onclick="setRecSex(\'\')">Tots</button>'
    + '<button class="rec-sex' + (_recFilter.sex === 'Home' ? ' rec-sex--active' : '') + '" onclick="setRecSex(\'Home\')">Home</button>'
    + '<button class="rec-sex' + (_recFilter.sex === 'Dona' ? ' rec-sex--active' : '') + '" onclick="setRecSex(\'Dona\')">Dona</button>'
    + '</div>'
    + '</div>'
    + '</div>';
}

function getEstilsForDisc(disc) {
  var found = {};
  (DB.records || []).forEach(function(r) {
    if (r.disc === disc) found[r.estil] = 1;
  });
  return REC_ESTIL_ORDER.filter(function(e) { return found[e]; });
}

function getCatsForDisc(disc) {
  var found = {};
  (DB.records || []).forEach(function(r) {
    if (r.disc === disc) found[r.cat] = 1;
  });
  return REC_CAT_ORDER.filter(function(c) { return found[c]; });
}

// ── Handlers de filtre ─────────────────────────────────────
function setRecDisc(disc) {
  _recFilter.disc  = disc;
  _recFilter.estil = '';
  _recFilter.cat   = '';
  _recFilter.sex   = '';
  refreshRecordsPage();
}
function setRecEstil(v) { _recFilter.estil = v; renderRecordsTable(); }
function setRecCat(v)   { _recFilter.cat   = v; renderRecordsTable(); }
function setRecSex(v)   { _recFilter.sex   = v; renderRecordsTable(); }

function refreshRecordsPage() {
  var root = document.getElementById('recordsContent');
  if (!root) return;
  root.innerHTML = buildRecordsFilters() + '<div id="recordsTable"></div>';
  renderRecordsTable();
}

// ── Taula de rècords ───────────────────────────────────────
function renderRecordsTable() {
  var el = document.getElementById('recordsTable');
  if (!el) return;

  var recs = (DB.records || []).filter(function(r) {
    if (r.disc  !== _recFilter.disc)  return false;
    if (_recFilter.estil && r.estil !== _recFilter.estil) return false;
    if (_recFilter.cat   && r.cat   !== _recFilter.cat)   return false;
    if (_recFilter.sex   && r.sex   !== _recFilter.sex)   return false;
    return true;
  });

  if (!recs.length) {
    el.innerHTML = '<p class="rec-empty">Cap rècord trobat amb els filtres seleccionats.</p>';
    return;
  }

  // Agrupa per estil
  var byEstil = {};
  recs.forEach(function(r) {
    if (!byEstil[r.estil]) byEstil[r.estil] = {};
    var catKey = r.cat + (r.sex ? ' ' + r.sex : '');
    if (!byEstil[r.estil][catKey]) byEstil[r.estil][catKey] = [];
    byEstil[r.estil][catKey].push(r);
  });

  var html = '';

  REC_ESTIL_ORDER.forEach(function(estil) {
    if (!byEstil[estil]) return;
    html += '<div class="rec-group">'
      + '<h3 class="rec-group-title">' + estil + '</h3>'
      + '<div class="rec-table-wrap"><table class="rec-table">'
      + '<thead><tr>'
      + '<th>Classe</th><th>Sexe</th><th>Format</th>'
      + '<th class="rec-marca">Marca</th>'
      + '<th>Atleta</th><th>Competició</th><th>Data</th>'
      + '</tr></thead><tbody>';

    // Ordena per categoria i sexe
    var catKeys = Object.keys(byEstil[estil]).sort(function(a, b) {
      var ai = REC_CAT_ORDER.indexOf(a.split(' ')[0]);
      var bi = REC_CAT_ORDER.indexOf(b.split(' ')[0]);
      if (ai !== bi) return ai - bi;
      return a < b ? -1 : 1;
    });

    catKeys.forEach(function(ck) {
      byEstil[estil][ck].forEach(function(r) {
        html += '<tr>'
          + '<td><strong>' + r.cat + '</strong></td>'
          + '<td>' + (r.sex ? '<span class="rec-sex-badge rec-sex-badge--' + r.sex.toLowerCase() + '">' + r.sex + '</span>' : '—') + '</td>'
          + '<td class="rec-format">' + r.format + '</td>'
          + '<td class="rec-marca"><strong>' + r.marca + '</strong> pts</td>'
          + '<td>' + escHtml(r.atleta) + '</td>'
          + '<td class="rec-comp">' + escHtml(r.competicio) + '</td>'
          + '<td class="rec-data">' + r.data + '</td>'
          + '</tr>';
      });
    });

    html += '</tbody></table></div></div>';
  });

  // Nota d'actualització + botó sol·licitar
  html += '<div class="rec-footer-note">'
    + '<p>📅 Actualització: Sala mar. 2024 · Aire Lliure ago. 2024 · Trad/Nu/LB mar. 2024 · Arc Adaptat jul. 2021</p>'
    + '<button class="btn-gold" style="margin-top:.75rem" onclick="openRecordForm()">🏆 Sol·licitar homologació d\'un nou rècord</button>'
    + '</div>';

  el.innerHTML = html;
}

// ── Renderitza rècords per a la pàgina de disciplina ───────
// Llegeix DB.records filtrant per disc key
function renderDiscRecordsFromDB(discKey) {
  var recs = (DB.records || []).filter(function(r) { return r.disc === discKey; });
  if (!recs.length) return '';

  // Agrupa per estil
  var byEstil = {};
  recs.forEach(function(r) {
    if (!byEstil[r.estil]) byEstil[r.estil] = [];
    byEstil[r.estil].push(r);
  });

  var html = '';
  REC_ESTIL_ORDER.forEach(function(estil) {
    if (!byEstil[estil]) return;

    // Per a la pàgina de disciplina mostrem el format principal (60fl o Round 720)
    // agrupat per cat+sex, ordenant
    var mainRecs = byEstil[estil].filter(function(r) {
      return r.format.indexOf('60fl') !== -1
        || r.format.indexOf('Round 720') !== -1
        || r.format.indexOf('Fita 1440') !== -1
        || r.format.indexOf('Sala 18m') !== -1
        || r.format.indexOf('72fl') !== -1
        || (r.format.indexOf('30fl') === -1 && r.format.indexOf('30m') === -1 && r.format.indexOf('20m') === -1 && r.format.indexOf('18m') === -1 && r.format.indexOf('12m') === -1);
    });
    if (!mainRecs.length) mainRecs = byEstil[estil];

    html += '<h3 class="disc-section-title" style="margin-top:1.5rem">' + estil + '</h3>';
    html += '<table class="disc-records-table"><thead><tr>'
      + '<th>Classe</th><th>Sexe</th><th>Format</th><th>Marca</th><th>Atleta</th><th>Any</th>'
      + '</tr></thead><tbody>';

    mainRecs.sort(function(a, b) {
      var ai = REC_CAT_ORDER.indexOf(a.cat);
      var bi = REC_CAT_ORDER.indexOf(b.cat);
      if (ai !== bi) return ai - bi;
      return (a.sex || '') < (b.sex || '') ? -1 : 1;
    }).forEach(function(r) {
      var any = r.data ? r.data.split('/').pop() : '—';
      html += '<tr>'
        + '<td>' + r.cat + '</td>'
        + '<td>' + (r.sex || '—') + '</td>'
        + '<td style="font-size:.8rem;color:var(--gray)">' + r.format + '</td>'
        + '<td><strong>' + r.marca + ' pts</strong></td>'
        + '<td>' + (r.atleta || '—') + '</td>'
        + '<td>' + any + '</td>'
        + '</tr>';
    });

    html += '</tbody></table>';
  });

  html += '<p class="disc-records-note">Per als rècords complets de totes les classes i formats consulta la <a href="#" onclick="setS(\'records\');return false" style="color:var(--navy-light)">pàgina de Rècords</a>.</p>';
  html += '<div style="margin-top:1rem;text-align:right">'
    + '<button class="disc-btn-sm" style="font-size:.85rem;padding:.5rem 1rem" onclick="openRecordForm()">'
    + '🏆 Sol·licitar homologació d\'un nou rècord</button></div>';

  return html;
}

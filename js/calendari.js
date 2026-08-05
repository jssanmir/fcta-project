// calendari.js – Secció Calendari Esportiu FCTA

var CAL_MONTH_NAMES = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
var CAL_MONTH_SHORT = ['gen','feb','mar','abr','mai','jun','jul','ago','set','oct','nov','des'];
var CAL_DAY_NAMES   = ['Dl','Dt','Dc','Dj','Dv','Ds','Dg'];

var calActiveSeason   = '2025-26';
var calMobileIdx      = 0;  // index into calMonthList
var calMonthList      = []; // [{year, month}] for current season
var calDateMap        = {}; // 'YYYY-MM-DD' → [comp, ...]

var CAL_SEASONS = {
  '2025-26': { label: 'Temporada 2025/2026', from: '2025-09-01', to: '2026-08-31', pdf: 'docs/2026060812294113-CIRC_2632_Calendaris_esportius_2026_2027.pdf' },
  '2026-27': { label: 'Temporada 2026/2027', from: '2026-09-01', to: '2027-08-31', pdf: 'docs/2026060812294113-CIRC_2632_Calendaris_esportius_2026_2027.pdf' }
};

// Color per tipus (ha de coincidir amb .cal-dot-* i .cal-event-bar.*)
var CAL_TYPE_COLOR = {
  al:    '#2E5FA3',
  sala:  '#db2777',
  '3d':  '#7c3aed',
  trd:   '#7c3aed',
  camp:  '#059669',
  kyudo: '#b45309',
  fed:   '#0F2447',
  run:   '#f97316',
  aa:    '#6366f1'
};

function calTypeKey(type) {
  return (type === 'trd') ? '3d' : (type || 'al');
}

// ── Canvi de temporada ──────────────────────────────────────────
function setCalSeason(season, btn) {
  calActiveSeason = season;
  calMobileIdx = 0;
  var tabs = document.querySelectorAll('.cal-stab');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('act');
  if (btn) btn.classList.add('act');
  try { history.replaceState(null, '', '#calendari/' + season); } catch(e) {}
  var s = CAL_SEASONS[season];
  var lbl = document.getElementById('calSeasonLabel');
  if (lbl) lbl.textContent = s.label;
  var pdfBtn = document.getElementById('calPdfBtn');
  if (pdfBtn) pdfBtn.href = s.pdf;
  renderCalendari();
}

// ── Renderització principal ─────────────────────────────────────
function renderCalendari() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var s = CAL_SEASONS[calActiveSeason];

  var comps = DB.competitions.filter(function(c) {
    return c.dateISO && c.dateISO >= s.from && c.dateISO <= s.to;
  }).slice().sort(function(a, b) {
    return a.dateISO < b.dateISO ? -1 : 1;
  });

  // Construir mapa data → competicions
  calDateMap = {};
  comps.forEach(function(c) {
    if (!calDateMap[c.dateISO]) calDateMap[c.dateISO] = [];
    calDateMap[c.dateISO].push(c);
  });

  // Llista de mesos de la temporada (de from a to)
  calMonthList = [];
  var fromY = parseInt(s.from.slice(0,4)), fromM = parseInt(s.from.slice(5,7)) - 1;
  var toY   = parseInt(s.to.slice(0,4)),   toM   = parseInt(s.to.slice(5,7))   - 1;
  var y = fromY, m = fromM;
  while (y < toY || (y === toY && m <= toM)) {
    calMonthList.push({ year: y, month: m });
    m++;
    if (m > 11) { m = 0; y++; }
  }

  // Trobar el mes actual o el primer mes futur com a punt de partida mòbil
  calMobileIdx = 0;
  for (var i = 0; i < calMonthList.length; i++) {
    var mo = calMonthList[i];
    var lastDayOfMonth = new Date(mo.year, mo.month + 1, 0);
    if (lastDayOfMonth >= today) { calMobileIdx = i; break; }
  }

  // Renderitzar
  var yearHtml = '<div class="cal-year-grid">';
  for (var j = 0; j < calMonthList.length; j++) {
    yearHtml += calRenderMonth(calMonthList[j].year, calMonthList[j].month, today);
  }
  yearHtml += '</div>';

  var mobileHtml  = '<div class="cal-mobile-nav-wrap">';
  mobileHtml += '<div class="cal-mobile-nav">';
  mobileHtml += '<button class="cal-mob-arrow"' + dataAttr('onclick','calMobilePrev',[]) + '>&#8249;</button>';
  mobileHtml += '<span id="calMobLabel" class="cal-mob-label"></span>';
  mobileHtml += '<button class="cal-mob-arrow"' + dataAttr('onclick','calMobileNext',[]) + '>&#8250;</button>';
  mobileHtml += '</div>';
  mobileHtml += '<div id="calMobileMonth"></div>';
  mobileHtml += '</div>';

  var el = document.getElementById('calListView');
  if (el) el.innerHTML = yearHtml + mobileHtml;

  calRenderMobileMonth();
}

// ── Mes individual (grid 7 columnes) ───────────────────────────
function calRenderMonth(year, month, today) {
  if (!today) { today = new Date(); today.setHours(0,0,0,0); }
  var todayStr = year + '-' + pad2(today.getMonth()+1) + '-' + pad2(today.getDate());

  var html = '<div class="cal-grid-month">';
  html += '<div class="cal-grid-mheader">';
  html += '<span class="cal-grid-mname">' + CAL_MONTH_NAMES[month] + '</span>';
  html += '<span class="cal-grid-myear">' + year + '</span>';
  html += '</div>';

  // Capçalera dies
  html += '<div class="cal-grid-row cal-grid-dheader">';
  for (var di = 0; di < 7; di++) {
    html += '<div class="cal-grid-dh">' + CAL_DAY_NAMES[di] + '</div>';
  }
  html += '</div>';

  // Primer dia del mes (Dilluns = 0)
  var firstWeekday = new Date(year, month, 1).getDay();
  firstWeekday = (firstWeekday + 6) % 7;
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  html += '<div class="cal-grid-cells">';

  // Cel·les buides inicials
  for (var e = 0; e < firstWeekday; e++) {
    html += '<div class="cal-grid-cell cal-cell-empty"></div>';
  }

  // Dies del mes
  for (var d = 1; d <= daysInMonth; d++) {
    var dateStr = year + '-' + pad2(month + 1) + '-' + pad2(d);
    var cellDate = new Date(year, month, d);
    var isPast   = cellDate < today;
    var isToday  = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
    var dayComps = calDateMap[dateStr] || [];

    var cls = 'cal-grid-cell';
    if (isPast)        cls += ' cal-cell-past';
    if (isToday)       cls += ' cal-cell-today';
    if (dayComps.length) cls += ' cal-cell-event';

    if (dayComps.length) {
      var ids = dayComps.map(function(c) { return c.id; });
      html += '<div class="' + cls + '"' + dataAttr('onclick','calOpenModal',[ids]) + ' title="' + escHtml(dayComps.map(function(c){return c.title;}).join(' · ')) + '">';
      html += '<span class="cal-day-num">' + d + '</span>';
      html += '<div class="cal-day-dots">';
      var maxDots = Math.min(dayComps.length, 3);
      for (var ci = 0; ci < maxDots; ci++) {
        var t = calTypeKey(dayComps[ci].type);
        html += '<span class="cal-dot" style="background:' + (CAL_TYPE_COLOR[t] || CAL_TYPE_COLOR.al) + '"></span>';
      }
      if (dayComps.length > 3) html += '<span class="cal-dot cal-dot-more">+</span>';
      html += '</div>';
      html += '</div>';
    } else {
      html += '<div class="' + cls + '"><span class="cal-day-num">' + d + '</span></div>';
    }
  }

  html += '</div></div>';
  return html;
}

// ── Navegació mòbil ─────────────────────────────────────────────
function calRenderMobileMonth() {
  var mo  = calMonthList[calMobileIdx];
  if (!mo) return;
  var lbl = document.getElementById('calMobLabel');
  if (lbl) lbl.textContent = CAL_MONTH_NAMES[mo.month] + ' ' + mo.year;
  var today = new Date(); today.setHours(0,0,0,0);
  var el = document.getElementById('calMobileMonth');
  if (el) el.innerHTML = calRenderMonth(mo.year, mo.month, today);
}

function calMobilePrev() {
  if (calMobileIdx > 0) { calMobileIdx--; calRenderMobileMonth(); }
}

function calMobileNext() {
  if (calMobileIdx < calMonthList.length - 1) { calMobileIdx++; calRenderMobileMonth(); }
}

// ── Modal de detalls ────────────────────────────────────────────
function calOpenModal(ids) {
  var comps = [];
  for (var i = 0; i < ids.length; i++) {
    for (var j = 0; j < DB.competitions.length; j++) {
      if (DB.competitions[j].id == ids[i]) { comps.push(DB.competitions[j]); break; }
    }
  }
  if (!comps.length) return;

  var html = '';
  for (var k = 0; k < comps.length; k++) {
    var c = comps[k];
    var t = calTypeKey(c.type);
    var color = CAL_TYPE_COLOR[t] || CAL_TYPE_COLOR.al;
    var gcalUrl = calBuildGcalUrl(c);
    html += '<div class="cal-modal-event">';
    html += '<div class="cal-modal-bar" style="background:' + color + '"></div>';
    html += '<div class="cal-modal-body">';
    html += '<div class="cal-modal-title">' + escHtml(c.title) + '</div>';
    html += '<div class="cal-modal-meta">';
    html += '<span>&#128197; ' + escHtml(c.date) + '</span>';
    if (c.loc) html += '<span>&#128205; ' + escHtml(c.loc) + '</span>';
    html += '<span class="cbadge ' + (FCTA.typeCls[c.type] || 'cb-al') + '">' + (FCTA.typeLabel[c.type] || escHtml(c.disc)) + '</span>';
    if (c.circ && c.circ !== '#') html += '<span>&#128196; ' + escHtml(c.circ) + '</span>';
    html += '</div>';
    html += '<div class="cal-modal-acts">';
    if (gcalUrl) {
      html += '<a href="' + gcalUrl + '" target="_blank" rel="noopener" class="cal-gcal-btn">&#128197; Afegir a Google Calendar</a>';
    }
    if (c.url && c.url !== '#') {
      html += '<a href="' + escHtml(c.url) + '" target="_blank" rel="noopener" class="cal-modal-link">&#128196; Més informació</a>';
    }
    html += '</div></div></div>';
  }

  var body = document.getElementById('calModalBody');
  if (body) body.innerHTML = html;
  var modal = document.getElementById('calModal');
  if (modal) { modal.style.display = 'flex'; modal.focus(); }
}

function calCloseModal() {
  var modal = document.getElementById('calModal');
  if (modal) modal.style.display = 'none';
}

// Tancar modal clicant el fons
function calModalBgClick(e) {
  if (e.target === document.getElementById('calModal')) calCloseModal();
}

// ── Utilitats ───────────────────────────────────────────────────
function calBuildGcalUrl(comp) {
  if (!comp.dateISO) return '';
  var start = comp.dateISO.replace(/-/g, '');
  var d = new Date(comp.dateISO);
  d.setDate(d.getDate() + 1);
  var end = [d.getFullYear(), pad2(d.getMonth()+1), pad2(d.getDate())].join('');
  var desc = comp.disc + (comp.circ && comp.circ !== '#' ? ' · ' + comp.circ : '');
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text='     + encodeURIComponent(comp.title)
    + '&dates='    + start + '/' + end
    + '&details='  + encodeURIComponent(desc)
    + '&location=' + encodeURIComponent(comp.loc || '');
}

function pad2(n) { return n < 10 ? '0' + n : '' + n; }

function exportCalendariICS() {
  var lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FCTA//Calendari Esportiu 2025-2026//CA',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:FCTA – Calendari Esportiu',
    'X-WR-CALDESC:Calendari oficial de la Federació Catalana de Tir amb Arc',
    'X-WR-TIMEZONE:Europe/Madrid'
  ];
  var s = CAL_SEASONS[calActiveSeason];
  var comps = DB.competitions.filter(function(c) {
    return c.dateISO && c.dateISO >= s.from && c.dateISO <= s.to;
  });
  comps.forEach(function(c) {
    if (!c.dateISO) return;
    var start = c.dateISO.replace(/-/g, '');
    var d = new Date(c.dateISO);
    d.setDate(d.getDate() + 1);
    var end = [d.getFullYear(), pad2(d.getMonth()+1), pad2(d.getDate())].join('');
    lines.push('BEGIN:VEVENT');
    lines.push('UID:fcta-comp-' + c.id + '@fcta.cat');
    lines.push('DTSTART;VALUE=DATE:' + start);
    lines.push('DTEND;VALUE=DATE:'   + end);
    lines.push('SUMMARY:'     + icsEsc(c.title));
    lines.push('DESCRIPTION:' + icsEsc(c.disc + (c.circ && c.circ !== '#' ? ' · ' + c.circ : '')));
    lines.push('LOCATION:'    + icsEsc(c.loc || ''));
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'calendari-fcta-' + calActiveSeason + '.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Calendari .ics descarregat correctament');
}

function icsEsc(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

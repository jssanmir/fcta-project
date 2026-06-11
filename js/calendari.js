// calendari.js – Secció Calendari Esportiu FCTA

var CAL_MONTH_NAMES = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
var CAL_MONTH_SHORT = ['gen','feb','mar','abr','mai','jun','jul','ago','set','oct','nov','des'];

var calActiveSeason = '2025-26';

var CAL_SEASONS = {
  '2025-26': { label: 'Temporada 2025/2026', from: '2024-09-01', to: '2026-09-30', pdf: 'docs/2026060812294113-CIRC_2632_Calendaris_esportius_2026_2027.pdf' },
  '2026-27': { label: 'Temporada 2026/2027', from: '2026-10-01', to: '2027-09-30', pdf: 'docs/2026060812294113-CIRC_2632_Calendaris_esportius_2026_2027.pdf' }
};

function setCalSeason(season, btn) {
  calActiveSeason = season;
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

function renderCalendari() {
  var today = new Date();
  today.setHours(0,0,0,0);

  var s = CAL_SEASONS[calActiveSeason];
  var comps = DB.competitions.filter(function(c) {
    return c.dateISO && c.dateISO >= s.from && c.dateISO <= s.to;
  }).slice().sort(function(a, b) {
    return a.dateISO < b.dateISO ? -1 : 1;
  });

  // Group by year-month
  var monthMap = {};
  var monthOrder = [];
  comps.forEach(function(c) {
    if (!c.dateISO) return;
    var key = c.dateISO.slice(0, 7);
    if (!monthMap[key]) {
      monthMap[key] = { key: key, year: parseInt(c.dateISO.slice(0,4)), month: parseInt(c.dateISO.slice(5,7)) - 1, comps: [] };
      monthOrder.push(key);
    }
    monthMap[key].comps.push(c);
  });

  var html = '';
  monthOrder.forEach(function(key) {
    var m = monthMap[key];
    var hasFuture = m.comps.some(function(c) { return new Date(c.dateISO) >= today; });
    html += '<div class="cal-month-block' + (hasFuture ? '' : ' cal-month-past') + '">';
    html += '<div class="cal-month-header"><span class="cal-month-name">' + CAL_MONTH_NAMES[m.month] + '</span><span class="cal-month-year">' + m.year + '</span></div>';
    html += '<div class="cal-events-list">';
    m.comps.forEach(function(c) {
      var compDate = new Date(c.dateISO);
      compDate.setHours(0,0,0,0);
      var isPast = compDate < today;
      var stripeCls = (c.type === 'trd' || c.type === '3d') ? 'trd' : (c.type || 'al');
      var gcalUrl = calBuildGcalUrl(c);
      html += '<div class="cal-event' + (isPast ? ' cal-past' : '') + '">';
      html += '<div class="cal-event-bar ' + stripeCls + '"></div>';
      html += '<div class="cal-event-day">' + c.dateISO.slice(8,10) + '<span>' + CAL_MONTH_SHORT[m.month] + '</span></div>';
      html += '<div class="cal-event-body">';
      html += '<div class="cal-event-title">' + escHtml(c.title) + '</div>';
      html += '<div class="cal-event-meta">';
      html += '<span class="cal-loc">&#128205; ' + escHtml(c.loc) + '</span>';
      html += '<span class="cbadge ' + (FCTA.typeCls[c.type] || 'cb-al') + '">' + (FCTA.typeLabel[c.type] || escHtml(c.disc)) + '</span>';
      html += '</div></div>';
      html += '<div class="cal-event-acts">';
      if (!isPast && gcalUrl) {
        html += '<a href="' + gcalUrl + '" target="_blank" rel="noopener" class="cal-gcal-btn" title="Afegir a Google Calendar">&#128197; Google</a>';
      }
      html += '</div>';
      html += '</div>';
    });
    html += '</div></div>';
  });

  var el = document.getElementById('calListView');
  if (el) el.innerHTML = html || '<p style="color:var(--gray);text-align:center;padding:2rem">No hi ha competicions disponibles.</p>';
}

function calBuildGcalUrl(comp) {
  if (!comp.dateISO) return '';
  var start = comp.dateISO.replace(/-/g, '');
  var d = new Date(comp.dateISO);
  d.setDate(d.getDate() + 1);
  var end = [d.getFullYear(), pad2(d.getMonth()+1), pad2(d.getDate())].join('');
  var desc = comp.disc + (comp.circ && comp.circ !== '#' ? ' · ' + comp.circ : '');
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent(comp.title)
    + '&dates=' + start + '/' + end
    + '&details=' + encodeURIComponent(desc)
    + '&location=' + encodeURIComponent(comp.loc);
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

  DB.competitions.forEach(function(c) {
    if (!c.dateISO) return;
    var start = c.dateISO.replace(/-/g, '');
    var d = new Date(c.dateISO);
    d.setDate(d.getDate() + 1);
    var end = [d.getFullYear(), pad2(d.getMonth()+1), pad2(d.getDate())].join('');
    lines.push('BEGIN:VEVENT');
    lines.push('UID:fcta-comp-' + c.id + '@fcta.cat');
    lines.push('DTSTART;VALUE=DATE:' + start);
    lines.push('DTEND;VALUE=DATE:' + end);
    lines.push('SUMMARY:' + icsEsc(c.title));
    lines.push('DESCRIPTION:' + icsEsc(c.disc + (c.circ && c.circ !== '#' ? ' · ' + c.circ : '')));
    lines.push('LOCATION:' + icsEsc(c.loc));
    lines.push('URL:https://fcta.cat/calendari/');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  var content = lines.join('\r\n');
  var blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'calendari-fcta-2025-2026.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Calendari .ics descarregat correctament');
}

function icsEsc(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

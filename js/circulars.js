// circulars.js – Circular list render & filter
// ──────────────────────────────────────────────────────────

// Ordre de mesos catalans per ordenar per data
var _CIRC_MON = {GEN:1,FEB:2,MAR:3,ABR:4,MAI:5,JUN:6,JUL:7,AGO:8,SET:9,OCT:10,NOV:11,DES:12};
function _circVal(c){ return (c.year||0)*10000 + (_CIRC_MON[c.mon]||0)*100 + (c.day||0); }

// CIRCULARS
// ============================================================
function filtCirc(type,btn){
  document.querySelectorAll('#circFilters .fb').forEach(function(b){b.classList.remove('act')});
  btn.classList.add('act');
  renderCirc(type);
}
function renderCirc(f){
  var data = (f==='all' ? DB.circulars : DB.circulars.filter(function(c){return c.type===f}))
    .slice().sort(function(a,b){ return _circVal(b) - _circVal(a); });
  document.getElementById('circGrid').innerHTML = data.map(function(c){
    var hasPdfContent = PDF_CONTENT[c.num] !== undefined;
    var hasExtUrl = c.url && c.url !== '#';
    var dlEl;
    if(hasPdfContent){
      dlEl = '<button class="circ-dl" onclick="openPDF(\'' + c.num + '\')" title="Veure PDF" style="background:var(--navy)">&#128065;</button>';
    } else if(hasExtUrl){
      dlEl = '<a class="circ-dl" href="' + c.url + '" target="_blank" title="Descarregar PDF">&#11015;</a>';
    } else {
      dlEl = '<span class="circ-dl" style="background:var(--lightgray);color:var(--gray);cursor:default" title="PDF pendent de publicar">&#8211;</span>';
    }
    return '<div class="circ-row">'
      + '<div><div class="circ-day">' + c.day + '</div><div class="circ-mon">' + c.mon + ' ' + c.year + '</div></div>'
      + '<div><span class="cbadge ' + bCls[c.type] + '">' + bLbl[c.type] + '</span>'
      + '<div class="circ-title">' + c.title + '</div>'
      + '<div class="circ-meta">' + c.num + ' · ' + c.desc + '</div></div>'
      + dlEl + '</div>';
  }).join('');
}


// ============================================================

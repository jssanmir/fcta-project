// pdf_viewer.js – Embedded PDF content viewer
// ──────────────────────────────────────────────────────────

// ── PDF VIEWER ────────────────────────────────────────────────
function openPDF(num){
  var doc=PDF_CONTENT[num];
  if(!doc){toast('Document no disponible','\u2139\uFE0F');return;}
  document.getElementById('pdfTitle').textContent=doc.num+' \u00b7 '+doc.title;
  document.getElementById('pdfDownloadBtn').href=doc.url;
  var body=document.getElementById('pdfBody');
  var metaHtml='<div class="pdf-meta"><span>\u{1F4CB} '+doc.num+'</span><span>\u{1F4C5} '+doc.date+'</span><span>\u{1F3DB}\uFE0F Federaci\u00f3 Catalana de Tir amb Arc</span></div>';
  var sectionsHtml=doc.sections.map(function(s){return '<h2>'+s.h+'</h2><p>'+s.body.replace(/\n/g,'<br>')+'</p>';}).join('');
  body.innerHTML=metaHtml+sectionsHtml;
  document.getElementById('pdfOverlay').style.display='flex';
  document.body.style.overflow='hidden';
}
function closePDF(){document.getElementById('pdfOverlay').style.display='none';document.body.style.overflow='';}
function closePDFOut(e){if(e.target===document.getElementById('pdfOverlay'))closePDF();}

// news_viewer.js – News article viewer modal
// ──────────────────────────────────────────────────────────

// ── NEWS VIEWER ───────────────────────────────────────────────
function openNews(id){
  var art=NEWS_CONTENT[id];
  if(!art)return;
  document.getElementById('newsModalTitle').textContent=art.cat+' \u00b7 '+art.date;
  var imgHtml=art.img?('<img src="'+art.img+'" class="art-img" alt="'+art.title+'" onerror="this.style.display=\'none\'">'):'';
  document.getElementById('newsModalBody').innerHTML=
    imgHtml+'<h1>'+art.title+'</h1>'
    +'<div class="art-meta"><span class="art-cat">'+art.cat+'</span><span>\u{1F4C5} '+art.date+'</span><span>&#9997;&#65039; FCTA</span></div>'
    +art.body;
  document.getElementById('newsOverlay').style.display='flex';
  document.body.style.overflow='hidden';
}
function closeNews(){document.getElementById('newsOverlay').style.display='none';document.body.style.overflow='';}
function closeNewsOut(e){if(e.target===document.getElementById('newsOverlay'))closeNews();}

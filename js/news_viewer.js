// news_viewer.js – News article viewer modal
// ──────────────────────────────────────────────────────────

// ── NEWS VIEWER ───────────────────────────────────────────────
var _newsPrevHash = null;
// Article d'una notícia: el text editat des de l'admin (DB.news[].body, HTML ja
// saneat) té prioritat sobre el text original de NEWS_CONTENT (db.js).
function newsArticle(id){
  var n=null,i;
  for(i=0;i<DB.news.length;i++){ if(String(DB.news[i].id)===String(id)){ n=DB.news[i]; break; } }
  var base=NEWS_CONTENT[id];
  if(!base && !(n && n.body)) return null;
  var art=base?{title:base.title,date:base.date,cat:base.cat,img:base.img,body:base.body}
              :{title:n.title,date:n.date,cat:n.cat,img:n.img,body:''};
  if(n){
    art.title=n.title||art.title; art.cat=n.cat||art.cat;
    if(n.img) art.img=n.img;
    if(!base) art.date=n.date;
    if(n.body) art.body=n.body;
  }
  return art;
}
// HTML del text d'una notícia (per precarregar l'editor de l'admin)
function newsBodyHtml(n){
  if(n.body) return n.body;
  var base=NEWS_CONTENT[n.id];
  return base&&base.body?base.body:'';
}

function openNews(id){
  var art=newsArticle(id);
  if(!art)return;
  art.body=rtSanitize(art.body);
  document.getElementById('newsModalTitle').textContent=art.cat+' \u00b7 '+art.date;
  var imgHtml=art.img?('<img src="'+art.img+'" class="art-img" alt="'+art.title+'"'+dataAttr('onerror','hideOnError',[])+'>'):'';
  document.getElementById('newsModalBody').innerHTML=
    imgHtml+'<h1>'+art.title+'</h1>'
    +'<div class="art-meta"><span class="art-cat">'+art.cat+'</span><span>\u{1F4C5} '+art.date+'</span><span>&#9997;&#65039; FCTA</span></div>'
    +art.body;
  document.getElementById('newsOverlay').style.display='flex';
  document.body.style.overflow='hidden';

  var target = '#news/' + id;
  if (window.location.hash !== target) {
    _newsPrevHash = window.location.hash || '#news';
    try { history.replaceState(null, '', target); } catch(e) {}
  }
}
function closeNews(){
  document.getElementById('newsOverlay').style.display='none';
  document.body.style.overflow='';
  if (_newsPrevHash !== null) {
    try { history.replaceState(null, '', _newsPrevHash); } catch(e) {}
    _newsPrevHash = null;
  }
}
function closeNewsOut(e){if(e.target===document.getElementById('newsOverlay'))closeNews();}

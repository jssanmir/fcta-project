// news.js – News grid render with pagination
// ──────────────────────────────────────────────────────────

var _newsPage = 0;
var NEWS_PER_PAGE = 3;

function renderNews() {
  _newsPage = 0;
  _renderNewsPage();
}

function newsPage(dir) {
  var total = DB.news.length;
  var maxPage = Math.ceil(total / NEWS_PER_PAGE) - 1;
  _newsPage = Math.max(0, Math.min(_newsPage + dir, maxPage));
  _renderNewsPage();
  // Scroll suau al títol de la secció
  var el = document.getElementById('sNews');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function _renderNewsPage() {
  var total  = DB.news.length;
  var start  = _newsPage * NEWS_PER_PAGE;
  var slice  = DB.news.slice(start, start + NEWS_PER_PAGE);
  var maxPage = Math.ceil(total / NEWS_PER_PAGE) - 1;

  var grid = document.getElementById('newsGrid');
  grid.innerHTML = '';
  slice.forEach(function(n) {
    var card = document.createElement('div');
    card.className = 'news-card';
    card.onclick = function(){ openNews(n.id); };

    // Thumbnail
    var thumb = document.createElement('div');
    thumb.className = 'news-thumb';
    if (n.img && /^(https?:\/\/|\/|img\/)/.test(n.img)) {
      var img = document.createElement('img');
      img.onerror = function(){ this.style.display='none'; };
      img.src = n.img;
      thumb.appendChild(img);
    }
    var catTag = document.createElement('span');
    catTag.className = 'news-cat-tag';
    catTag.textContent = n.cat || '';
    thumb.appendChild(catTag);

    // Body
    var body = document.createElement('div');
    body.className = 'news-body';
    var dateEl = document.createElement('div');
    dateEl.className = 'news-date';
    dateEl.textContent = n.date || '';
    var h3 = document.createElement('h3');
    h3.textContent = n.title || '';
    var p = document.createElement('p');
    p.textContent = n.desc || '';
    body.appendChild(dateEl);
    body.appendChild(h3);
    body.appendChild(p);
    if (NEWS_CONTENT[n.id]) {
      var btn = document.createElement('button');
      btn.className = 'news-link';
      btn.style.cssText = 'background:none;border:none;padding:0;cursor:pointer;font-family:inherit;font-size:.8rem;font-weight:700;color:var(--navy-light)';
      btn.textContent = 'Llegir més →';
      btn.onclick = function(e){ e.stopPropagation(); openNews(n.id); };
      body.appendChild(btn);
    }

    card.appendChild(thumb);
    card.appendChild(body);
    grid.appendChild(card);
  });

  // Paginació
  var prev = document.getElementById('newsBtnPrev');
  var next = document.getElementById('newsBtnNext');
  var info = document.getElementById('newsPageInfo');
  if (prev) prev.disabled = _newsPage === 0;
  if (next) next.disabled = _newsPage >= maxPage;
  if (info) info.textContent = 'Pàgina ' + (_newsPage + 1) + ' de ' + (maxPage + 1);

  // Amaga la paginació si tot cap en una pàgina
  var pag = document.getElementById('newsPagination');
  if (pag) pag.style.display = total <= NEWS_PER_PAGE ? 'none' : 'flex';
}

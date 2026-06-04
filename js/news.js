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

  document.getElementById('newsGrid').innerHTML = slice.map(function(n) {
    var imgEl = n.img
      ? '<img src="' + n.img + '" alt="' + n.title + '" onerror="this.style.display=\'none\'">'
      : '';
    var hasLocal = NEWS_CONTENT[n.id] !== undefined;
    var readMore = hasLocal
      ? '<button onclick="openNews(' + n.id + ')" class="news-link" style="background:none;border:none;padding:0;cursor:pointer;font-family:inherit;font-size:.8rem;font-weight:700;color:var(--navy-light)">Llegir més →</button>'
      : '';
    return '<div class="news-card" onclick="openNews(' + n.id + ')">'
      + '<div class="news-thumb">' + imgEl + '<span class="news-cat-tag">' + n.cat + '</span></div>'
      + '<div class="news-body">'
      + '<div class="news-date">' + n.date + '</div>'
      + '<h3>' + n.title + '</h3>'
      + '<p>' + n.desc + '</p>'
      + readMore
      + '</div></div>';
  }).join('');

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

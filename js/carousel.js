// carousel.js – Carrusel de la pàgina d'inici (sota la Senyera)
// Diapositives: DB.carousel = [{ id, img, title, url }], editables des
// d'Administració > Carrusel (js/admin.js).
// ──────────────────────────────────────────────────────────

var CAR_INTERVAL = 6000;
var _carIdx   = 0;
var _carTimer = null;
var _carPaused = false;

function _carSlides() {
  return (DB.carousel || []).filter(function(s) { return s && s.img; });
}

function _carStop() {
  if (_carTimer) { clearInterval(_carTimer); _carTimer = null; }
}

function _carStart() {
  _carStop();
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || _carSlides().length < 2) return;
  _carTimer = setInterval(function() {
    var root = document.getElementById('homeCarousel');
    // No avança si la portada no és visible o l'usuari hi té el ratolí/focus a sobre
    if (_carPaused || !root || root.offsetParent === null) return;
    carouselNext();
  }, CAR_INTERVAL);
}

function renderCarousel() {
  var root = document.getElementById('homeCarousel');
  if (!root) return;
  var slides = _carSlides();
  _carStop();

  if (!slides.length) {
    root.style.display = 'none';
    root.innerHTML = '';
    return;
  }
  root.style.display = '';
  if (_carIdx >= slides.length) _carIdx = 0;

  var multi = slides.length > 1;
  var html = '<div class="car" role="region" aria-roledescription="carrusel" aria-label="Destacats">'
    + '<div class="car-viewport"><div class="car-track" id="carTrack">';

  slides.forEach(function(s, i) {
    var url = (s.url && s.url !== '#') ? s.url : '';
    var inner = '<img class="car-img" src="' + escHtml(s.img) + '" alt=""'
      + (i === 0 ? '' : ' loading="lazy"') + dataAttr('onerror', 'hideOnError', []) + '>'
      + '<span class="car-cap"><span class="car-title">' + escHtml(s.title || '') + '</span></span>';
    var label = (i + 1) + ' de ' + slides.length + (s.title ? ': ' + s.title : '');
    if (url) {
      html += '<a class="car-slide" role="group" aria-roledescription="diapositiva" aria-label="' + escHtml(label) + '"'
        + ' href="' + escHtml(url) + '"' + dataAttr('onclick', 'carouselGo', [url]) + '>' + inner + '</a>';
    } else {
      html += '<div class="car-slide car-slide--static" role="group" aria-roledescription="diapositiva" aria-label="' + escHtml(label) + '">' + inner + '</div>';
    }
  });

  html += '</div></div>';
  if (multi) {
    html += '<button type="button" class="car-arrow car-prev" aria-label="Diapositiva anterior"' + dataAttr('onclick', 'carouselPrev', []) + '>&#8249;</button>'
      + '<button type="button" class="car-arrow car-next" aria-label="Diapositiva següent"' + dataAttr('onclick', 'carouselNext', []) + '>&#8250;</button>'
      + '<div class="car-dots">';
    slides.forEach(function(s, i) {
      html += '<button type="button" class="car-dot" aria-label="Anar a la diapositiva ' + (i + 1) + '"' + dataAttr('onclick', 'carouselTo', [i]) + '></button>';
    });
    html += '</div>';
  }
  html += '</div>';
  root.innerHTML = html;

  _carBind(root);
  _carShow(_carIdx);
  _carStart();
}

function _carShow(i) {
  var slides = _carSlides();
  if (!slides.length) return;
  _carIdx = ((i % slides.length) + slides.length) % slides.length;
  var track = document.getElementById('carTrack');
  if (track) track.style.transform = 'translateX(' + (-100 * _carIdx) + '%)';
  var dots = document.querySelectorAll('#homeCarousel .car-dot');
  for (var d = 0; d < dots.length; d++) {
    var on = (d === _carIdx);
    dots[d].classList.toggle('act', on);
    if (on) dots[d].setAttribute('aria-current', 'true'); else dots[d].removeAttribute('aria-current');
  }
  var items = document.querySelectorAll('#homeCarousel .car-slide');
  for (var k = 0; k < items.length; k++) {
    items[k].setAttribute('aria-hidden', k === _carIdx ? 'false' : 'true');
    items[k].tabIndex = (k === _carIdx) ? 0 : -1;
  }
}

function _carBind(root) {
  var startX = null;
  root.addEventListener('mouseenter', function() { _carPaused = true; });
  root.addEventListener('mouseleave', function() { _carPaused = false; });
  root.addEventListener('focusin',    function() { _carPaused = true; });
  root.addEventListener('focusout',   function() { _carPaused = false; });
  root.addEventListener('touchstart', function(e) {
    startX = e.touches.length === 1 ? e.touches[0].clientX : null;
  }, { passive: true });
  root.addEventListener('touchend', function(e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) carouselNext(); else carouselPrev();
  }, { passive: true });
}

function carouselNext() { _carShow(_carIdx + 1); _carStart(); }
function carouselPrev() { _carShow(_carIdx - 1); _carStart(); }
function carouselTo(i)  { _carShow(i);           _carStart(); }

// Navega al link d'una diapositiva: notícia (#news:ID), secció del portal
// (#calendari/2026-27…) o adreça externa/document (s'obre en pestanya nova).
function carouselGo(url) {
  if (!url || url === '#') return;
  var m = /^#news[:\/](\d+)$/.exec(url);
  if (m) {
    // Una notícia sense text complet no té visor: porta al llistat de notícies
    if (newsArticle(m[1])) openNews(parseInt(m[1], 10)); else setS('news');
    return;
  }
  if (url.charAt(0) === '#') { window.location.hash = url; return; }
  window.open(url, '_blank', 'noopener');
}

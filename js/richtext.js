// richtext.js – Editor de text enriquit (negreta, cursiva, llistes, enllaços,
// emoticones…) i sanejador d'HTML per al text de les notícies.
// ──────────────────────────────────────────────────────────
// El text es guarda com a HTML dins de DB.news[].body i es mostra amb
// innerHTML al visor de notícies; per això SEMPRE passa per rtSanitize()
// (llista blanca d'etiquetes) abans de desar-se i abans de mostrar-se.
// El servidor el torna a sanejar (server.js, POST /api/data).
// Sense dependències externes (CSP: script-src 'self'): les accions de la
// barra d'eines van per data-onclick (events.js) i document.execCommand.
// ──────────────────────────────────────────────────────────

var RT_EMOJIS = [
  '😀','😊','😉','👍','👏','🙌','💪','🎉','🔥','⭐',
  '✅','❗','📢','📅','📍','⏰','🏹','🎯','🥇','🥈',
  '🥉','🏆','🏅','🏟️','🌲','🌄','☀️','🌧️','💜','❤️',
  '🤝','🎓','📄','🔗','➡️','ℹ️','⚠️','👋','🎊','🙏'
];

// etiqueta d'origen → etiqueta permesa (les que no hi són es "desempaqueten")
var RT_TAGS = {
  P: 'p', BR: 'br', STRONG: 'strong', B: 'strong', EM: 'em', I: 'em',
  U: 'u', S: 's', UL: 'ul', OL: 'ol', LI: 'li', A: 'a',
  H2: 'h2', H3: 'h3', H4: 'h4', BLOCKQUOTE: 'blockquote', DIV: 'p'
};
var RT_BLOCKS = { p: 1, ul: 1, ol: 1, h2: 1, h3: 1, h4: 1, blockquote: 1 };
var RT_DROP = { SCRIPT: 1, STYLE: 1, IFRAME: 1, OBJECT: 1, EMBED: 1, TEXTAREA: 1,
                SELECT: 1, NOSCRIPT: 1, TEMPLATE: 1, SVG: 1, MATH: 1 };

function _rtEsc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function _rtEscAttr(s) { return _rtEsc(s).replace(/"/g, '&quot;'); }

// Només enllaços externs (http/https/mailto), a notícies (#news:N) o a fitxers locals.
function _rtSafeHref(h) {
  h = String(h || '').trim();
  return /^(https?:\/\/|mailto:|#news[:\/]|docs\/|\/uploads\/)/i.test(h) ? h : '';
}

function _rtNode(n) {
  if (n.nodeType === 3) return _rtEsc(n.nodeValue);
  if (n.nodeType !== 1) return '';
  var tn = n.tagName.toUpperCase();
  if (RT_DROP[tn]) return '';
  var inner = _rtChildren(n);
  var t = RT_TAGS[tn];
  if (!t) return inner;
  if (t === 'br') return '<br>';
  if (t === 'a') {
    var h = _rtSafeHref(n.getAttribute('href'));
    if (!h) return inner;
    var ext = /^https?:/i.test(h);
    return '<a href="' + _rtEscAttr(h) + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + inner + '</a>';
  }
  return '<' + t + '>' + inner + '</' + t + '>';
}
function _rtChildren(parent) {
  var out = '';
  for (var i = 0; i < parent.childNodes.length; i++) out += _rtNode(parent.childNodes[i]);
  return out;
}

// HTML qualsevol → HTML net (etiquetes permeses, sense atributs excepte href).
// El text solt de primer nivell s'envolta en <p>; es treuen paràgrafs buits.
function rtSanitize(html) {
  if (!html) return '';
  var doc = new DOMParser().parseFromString('<body>' + html + '</body>', 'text/html');
  var out = '', buf = '';
  function flush() {
    if (buf.replace(/<br>/g, '').replace(/&nbsp;/g, ' ').trim()) out += '<p>' + buf + '</p>';
    buf = '';
  }
  var kids = doc.body.childNodes;
  for (var i = 0; i < kids.length; i++) {
    var n = kids[i];
    var s = _rtNode(n);
    var t = n.nodeType === 1 ? RT_TAGS[n.tagName.toUpperCase()] : null;
    if (t && RT_BLOCKS[t]) { flush(); out += s; } else buf += s;
  }
  flush();
  return out.replace(/<p>(\s|<br>|&nbsp;)*<\/p>/g, '');
}

// ── Editor ───────────────────────────────────────────────────
var RT_BUTTONS = [
  { cmd: 'bold',      title: 'Negreta',            html: '<strong>B</strong>' },
  { cmd: 'italic',    title: 'Cursiva',            html: '<em>I</em>' },
  { cmd: 'underline', title: 'Subratllat',         html: '<u>U</u>' },
  { cmd: 'h3',        title: 'Títol',              html: 'T' },
  { cmd: 'p',         title: 'Paràgraf normal',    html: '¶' },
  { cmd: 'ul',        title: 'Llista amb punts',   html: '•&#8801;' },
  { cmd: 'ol',        title: 'Llista numerada',    html: '1.' },
  { cmd: 'link',      title: 'Afegir enllaç',      html: '🔗' },
  { cmd: 'unlink',    title: 'Treure enllaç',      html: '🔗✖' },
  { cmd: 'clear',     title: 'Treure el format',   html: '⌫' },
  { cmd: 'emoji',     title: 'Inserir emoticona',  html: '😊' }
];

// Retorna el HTML de l'editor; `id` és l'identificador (rtGetHtml(id) en recupera el contingut).
function rtEditor(id, html, placeholder) {
  var tb = RT_BUTTONS.map(function (b) {
    return '<button type="button" class="rt-btn" title="' + b.title + '" aria-label="' + b.title + '"' +
      dataAttr('onclick', 'rtCmd', [id, b.cmd]) + '>' + b.html + '</button>';
  }).join('');
  var emo = RT_EMOJIS.map(function (e) {
    return '<button type="button" class="rt-emoji"' + dataAttr('onclick', 'rtEmoji', [id, e]) + '>' + e + '</button>';
  }).join('');
  return '<div class="rt-wrap">' +
    '<div class="rt-toolbar">' + tb + '</div>' +
    '<div class="rt-emojis" id="rtemo-' + id + '" style="display:none">' + emo + '</div>' +
    '<div class="rt-area" id="rtarea-' + id + '" contenteditable="true" spellcheck="true"' +
      ' data-ph="' + _rtEscAttr(placeholder || 'Escriu el text de la notícia…') + '">' + rtSanitize(html || '') + '</div>' +
  '</div>';
}

function _rtArea(id) { return document.getElementById('rtarea-' + id); }

// Assegura que el cursor és dins l'editor (si no, al final).
function _rtFocus(area) {
  area.focus();
  var sel = window.getSelection();
  if (!sel.rangeCount || !area.contains(sel.anchorNode)) {
    var r = document.createRange();
    r.selectNodeContents(area); r.collapse(false);
    sel.removeAllRanges(); sel.addRange(r);
  }
  try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch (e) {}
}

function rtCmd(id, cmd) {
  var area = _rtArea(id);
  if (!area) return;
  if (cmd === 'emoji') {
    var p = document.getElementById('rtemo-' + id);
    if (p) p.style.display = (p.style.display === 'none') ? 'flex' : 'none';
    return;
  }
  _rtFocus(area);
  switch (cmd) {
    case 'bold':      document.execCommand('bold'); break;
    case 'italic':    document.execCommand('italic'); break;
    case 'underline': document.execCommand('underline'); break;
    case 'h3':        document.execCommand('formatBlock', false, '<h3>'); break;
    case 'p':         document.execCommand('formatBlock', false, '<p>'); break;
    case 'ul':        document.execCommand('insertUnorderedList'); break;
    case 'ol':        document.execCommand('insertOrderedList'); break;
    case 'unlink':    document.execCommand('unlink'); break;
    case 'clear':     document.execCommand('removeFormat'); document.execCommand('formatBlock', false, '<p>'); break;
    case 'link':      _rtLink(area); break;
  }
}

function _rtLink(area) {
  var url = window.prompt("Adreça de l'enllaç (https://… o mailto:…)", 'https://');
  if (!url) return;
  url = url.trim();
  if (!/^(https?:\/\/|mailto:)/i.test(url)) {
    if (typeof toast === 'function') toast('L’enllaç ha de començar per https://, http:// o mailto:', '&#9888;&#65039;');
    return;
  }
  // Regla del projecte: el portal ha de ser autosuficient, sense enllaços a fcta.cat.
  if (/^https?:\/\/([a-z0-9-]+\.)*fcta\.cat(\/|$|[?#:])/i.test(url)) {
    if (typeof toast === 'function') toast('No s’admeten enllaços a fcta.cat: el portal ha de ser autosuficient.', '&#9888;&#65039;');
    return;
  }
  var sel = window.getSelection();
  if (sel.isCollapsed) {
    document.execCommand('insertHTML', false, '<a href="' + _rtEscAttr(url) + '">' + _rtEsc(url) + '</a>');
  } else {
    document.execCommand('createLink', false, url);
  }
}

function rtEmoji(id, ch) {
  var area = _rtArea(id);
  if (!area) return;
  _rtFocus(area);
  document.execCommand('insertText', false, ch);
  var p = document.getElementById('rtemo-' + id);
  if (p) p.style.display = 'none';
}

// HTML saneat del contingut de l'editor ('' si està buit).
function rtGetHtml(id) {
  var area = _rtArea(id);
  return area ? rtSanitize(area.innerHTML) : '';
}

// ── Enganxar sempre com a text pla (evita el format brut de Word/webs) ──
document.addEventListener('paste', function (e) {
  var t = e.target && e.target.closest ? e.target.closest('.rt-area') : null;
  if (!t) return;
  e.preventDefault();
  var txt = (e.clipboardData || window.clipboardData).getData('text/plain') || '';
  if (txt) document.execCommand('insertText', false, txt);
});

// Els botons de la barra no han de treure el focus (ni la selecció) de l'editor.
document.addEventListener('mousedown', function (e) {
  if (e.target && e.target.closest && e.target.closest('.rt-toolbar, .rt-emojis')) e.preventDefault();
});

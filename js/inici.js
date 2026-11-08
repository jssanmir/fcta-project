// inici.js – «Vols començar?» + directori de Clubs + fitxa de club
// Dades (editables a Administració):
//   DB.comenca  – textos de «Vols començar?» i de la capçalera de la pàgina Clubs
//   DB.clubsDir – clubs: { id, slug, nom, municipi, comarca, adreca, tel, email, web, facebook, instagram,
//                          disciplines[], lat, lng, logo, desc }
// ──────────────────────────────────────────────────────────

var CLUB_DISCS = ['Aire Lliure', 'Sala', '3D', 'Camp', 'Tecnificació', 'Arc Adaptat', 'Kyudo', 'Run Archery'];

// Camps que cal tenir per considerar completa una fitxa de club
var CLUB_REQUIRED = [
  ['adreca', "l'adreça"], ['tel', 'el telèfon'], ['email', 'el correu electrònic'],
  ['web', 'el web'], ['disciplines', 'les disciplines'], ['desc', 'la presentació']
];

// Destinacions disponibles per als enllaços editables
var COMENCA_TARGETS = [
  { val: '',            lbl: '(cap enllaç)' },
  { val: 'clubs',       lbl: 'Clubs' },
  { val: 'llicencies',  lbl: 'Llicències' },
  { val: 'competitions', lbl: 'Competicions' },
  { val: 'calendari',   lbl: 'Calendari' },
  { val: 'circulars',   lbl: 'Circulars' },
  { val: 'formation',   lbl: 'Formació' },
  { val: 'social',      lbl: 'Tirades socials' },
  { val: 'inici',       lbl: 'Vols començar?' }
];

function _cmRich(html) {
  html = html || '';
  return /</.test(html) ? rtSanitize(html) : (html ? '<p>' + escHtml(html) + '</p>' : '');
}

function clubsList() { return (DB.clubsDir || []).filter(function(c) { return c && c.nom; }); }

function clubBySlug(slug) {
  var l = clubsList(), i;
  for (i = 0; i < l.length; i++) { if (l[i].slug === slug) return l[i]; }
  return null;
}

function clubMissing(c) {
  return CLUB_REQUIRED.filter(function(r) {
    var v = c[r[0]];
    return Array.isArray(v) ? !v.length : !String(v || '').trim();
  }).map(function(r) { return r[1]; });
}

function _clubSafeUrl(u) {
  u = String(u || '');
  return /^https?:\/\//.test(u) ? u : '';
}

// ── «Vols començar?» ───────────────────────────────────────
function renderComenca() {
  var D = DB.comenca || {};
  var el = function(id) { return document.getElementById(id); };
  if (!el('cmSteps')) return;

  if (el('cmBadge')) el('cmBadge').textContent = D.badge || '';
  if (el('cmTitle')) el('cmTitle').innerHTML = escHtml(D.title1 || '') + '<em>' + escHtml(D.titleEm || '') + '</em>';
  if (el('cmIntro')) el('cmIntro').innerHTML = _cmRich(D.intro);

  el('cmSteps').innerHTML = (D.steps || []).map(function(s, i) {
    var link = (s.linkTarget && s.linkLabel)
      ? '<button type="button" class="inici-step-link"' + dataAttr('onclick', 'setS', [s.linkTarget]) + '>' + escHtml(s.linkLabel) + ' &rarr;</button>'
      : '';
    return '<div class="inici-step"><div class="inici-step-num">' + (i + 1) + '</div>'
      + '<h3>' + escHtml(s.title || '') + '</h3>'
      + '<div class="inici-step-text">' + _cmRich(s.text) + '</div>' + link + '</div>';
  }).join('');

  if (el('cmInfoLabel')) el('cmInfoLabel').textContent = D.infoLabel || '';
  if (el('cmInfoTitle')) el('cmInfoTitle').innerHTML = escHtml(D.infoTitle || '') + ' <em>' + escHtml(D.infoTitleEm || '') + '</em>';

  var L = D.license || {};
  if (el('cmLicense')) {
    el('cmLicense').innerHTML = '<div class="inici-card inici-card--wide">'
      + '<div class="inici-card-icon"><svg class="hub-ico" aria-hidden="true"><use href="#ic-id"/></svg></div>'
      + '<h3>' + escHtml(L.title || '') + '</h3>'
      + '<div class="inici-card-body">' + _cmRich(L.body) + '</div>'
      + ((L.ctaTarget && L.ctaLabel)
          ? '<button class="inici-card-cta"' + dataAttr('onclick', 'setS', [L.ctaTarget]) + '>' + escHtml(L.ctaLabel) + ' &rarr;</button>' : '')
      + '</div>';
  }
  var C = D.clubsCta || {};
  if (el('cmClubsCta')) {
    el('cmClubsCta').innerHTML = '<div class="inici-cta-box"><div class="inici-cta-text">'
      + '<h2>' + escHtml(C.title || '') + '</h2>' + _cmRich(C.text) + '</div>'
      + (C.label ? '<button type="button" class="btn-gold"' + dataAttr('onclick', 'setS', ['clubs']) + '>' + escHtml(C.label) + ' &rarr;</button>' : '')
      + '</div>';
  }
}

// ── Pàgina Clubs ───────────────────────────────────────────
var _clubFilter = '';
var _clubSort = 'alfa'; // 'alfa' | 'dist'
var _userCoords = null;
var _clubActiu = null;

function renderClubsPage() {
  var K = (DB.comenca && DB.comenca.clubs) || {};
  var el = function(id) { return document.getElementById(id); };
  if (el('clBadge')) el('clBadge').textContent = K.badge || '';
  if (el('clTitle')) el('clTitle').innerHTML = escHtml(K.title || '') + '<em>' + escHtml(K.titleEm || '') + '</em>';
  if (el('clIntro')) el('clIntro').innerHTML = _cmRich(K.intro);
  if (el('clLabel')) el('clLabel').textContent = K.label || '';
}

function renderClubs() {
  renderClubsPage();
  var grid = document.getElementById('clubsGrid');
  var noRes = document.getElementById('clubsNoResult');
  if (!grid) return;

  var list = clubsList();

  if (_clubFilter) {
    var q = _clubFilter.toLowerCase();
    list = list.filter(function(c) {
      return (c.nom || '').toLowerCase().indexOf(q) !== -1 || (c.municipi || '').toLowerCase().indexOf(q) !== -1 || (c.comarca || '').toLowerCase().indexOf(q) !== -1;
    });
  }

  if (_clubSort === 'dist' && _userCoords) {
    list.forEach(function(c) {
      c._dist = (typeof c.lat === 'number' && typeof c.lng === 'number') ? haversine(_userCoords.lat, _userCoords.lng, c.lat, c.lng) : 99999;
    });
    list.sort(function(a, b) { return a._dist - b._dist; });
  } else {
    list.sort(function(a, b) { return (a.municipi || '').localeCompare(b.municipi || '') || a.nom.localeCompare(b.nom); });
  }

  noRes.style.display = list.length ? 'none' : 'block';
  var noResQ = document.getElementById('clubsNoResultQ');
  if (noResQ) noResQ.textContent = _clubFilter;
  var count = document.getElementById('clubsCount');
  if (count) count.textContent = list.length + ' club' + (list.length !== 1 ? 's' : '') + ' trobat' + (list.length !== 1 ? 's' : '');

  grid.innerHTML = list.map(function(c) {
    var distBadge = (_clubSort === 'dist' && c._dist !== undefined && c._dist < 99999)
      ? '<span class="club-dist">' + (c._dist < 1 ? '<1' : Math.round(c._dist)) + ' km</span>' : '';
    var contactHtml = '';
    if (c.tel)   contactHtml += '<a href="tel:' + escHtml(c.tel.replace(/ /g, '')) + '" class="club-contact">📞 ' + escHtml(c.tel) + '</a>';
    if (c.email) contactHtml += '<a href="mailto:' + escHtml(c.email) + '" class="club-contact">✉️ ' + escHtml(c.email) + '</a>';
    var logoHtml = c.logo
      ? '<img class="club-logo" src="' + escHtml(c.logo) + '" alt="' + escHtml(c.nom) + '"' + dataAttr('onerror', 'showInitialOnError', [c.nom.charAt(0)]) + '>'
      : '<div class="club-initial">' + escHtml(c.nom.charAt(0)) + '</div>';
    return '<div class="club-card">'
      + '<div class="club-card-head">' + logoHtml
      + '<div style="flex:1;min-width:0"><div class="club-nom">' + escHtml(c.nom) + '</div>'
      + '<div class="club-loc">📍 ' + escHtml(c.municipi || '') + (c.comarca ? ' <span class="club-comarca">· ' + escHtml(c.comarca) + '</span>' : '') + '</div></div>'
      + distBadge + '</div>'
      + (contactHtml ? '<div class="club-contacts">' + contactHtml + '</div>' : '')
      + '<button type="button" class="club-link"' + dataAttr('onclick', 'showClub', [c.slug]) + '>Veure fitxa &rarr;</button>'
      + '</div>';
  }).join('');
}

function filterClubs(val) {
  _clubFilter = val;
  renderClubs();
}

function sortClubsDist() {
  var btn = document.getElementById('btnNearMe');
  if (_clubSort === 'dist') {
    _clubSort = 'alfa';
    _userCoords = null;
    if (btn) { btn.textContent = '📍 A prop meu'; btn.classList.remove('act'); }
    renderClubs();
    return;
  }
  if (!navigator.geolocation) {
    toast('El teu navegador no suporta geolocalització', '📍');
    return;
  }
  if (btn) { btn.textContent = '⏳ Localitzant...'; btn.disabled = true; }
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      _userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      _clubSort = 'dist';
      if (btn) { btn.textContent = '📍 A prop meu ✓'; btn.classList.add('act'); btn.disabled = false; }
      renderClubs();
    },
    function() {
      toast('No s\'ha pogut obtenir la ubicació', '📍');
      if (btn) { btn.textContent = '📍 A prop meu'; btn.disabled = false; }
    },
    { timeout: 8000 }
  );
}

function haversine(lat1, lng1, lat2, lng2) {
  var R = 6371;
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLng = (lng2 - lng1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
        * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Fitxa de club ──────────────────────────────────────────
function showClub(slug, _noHash) {
  var c = clubBySlug(slug);
  if (!c) { setS('clubs', _noHash); return; }
  _clubActiu = slug;
  renderClubFitxa();
  setS('club', _noHash);
  if (!_noHash && typeof navReplaceHash === 'function') navReplaceHash('#club/' + slug);
}

function renderClubFitxa() {
  var host = document.getElementById('clubFitxa');
  if (!host) return;
  var c = clubBySlug(_clubActiu);
  if (!c) { host.innerHTML = ''; return; }

  var isAdmin = (typeof admSession !== 'undefined') && !!admSession;
  var miss = clubMissing(c);
  var logo = c.logo
    ? '<img class="cf-logo" src="' + escHtml(c.logo) + '" alt="' + escHtml(c.nom) + '"' + dataAttr('onerror', 'showInitialOnError', [c.nom.charAt(0)]) + '>'
    : '<div class="cf-logo cf-logo--initial">' + escHtml(c.nom.charAt(0)) + '</div>';
  var chips = (c.disciplines || []).map(function(d) { return '<span class="cf-chip">' + escHtml(d) + '</span>'; }).join('');

  var main;
  if (c.desc && String(c.desc).trim()) {
    main = '<div class="cf-card"><h2 class="cf-h">Presentació</h2><div class="cf-body">' + _cmRich(c.desc) + '</div></div>';
  } else {
    main = '<div class="cf-card cf-card--pending"><h2 class="cf-h">Presentació</h2>'
      + '<p>La fitxa d\'aquest club encara s\'està completant. Mentrestant pots contactar amb el club amb les dades de contacte, o amb la FCTA a <a href="mailto:info@fcta.cat">info@fcta.cat</a>.</p></div>';
  }
  if (isAdmin && miss.length) {
    main += '<div class="cf-admin-note"><strong>Cal emplenar (només ho veus tu com a administrador):</strong> ' + escHtml(miss.join(', '))
      + '. <button type="button" class="cf-edit-btn"' + dataAttr('onclick', 'admEditClubFromFitxa', [c.id]) + '>✏️ Editar fitxa</button></div>';
  }

  var rows = '';
  var map = (typeof c.lat === 'number' && typeof c.lng === 'number')
    ? 'https://www.google.com/maps/search/?api=1&query=' + c.lat + ',' + c.lng : '';
  if (c.adreca) rows += '<li><span class="cf-ico">📍</span><div>' + escHtml(c.adreca) + (c.municipi ? '<br><small>' + escHtml(c.municipi) + '</small>' : '') + '</div></li>';
  else if (c.municipi) rows += '<li><span class="cf-ico">📍</span><div>' + escHtml(c.municipi) + (c.comarca ? '<br><small>' + escHtml(c.comarca) + '</small>' : '') + '</div></li>';
  if (c.tel)   rows += '<li><span class="cf-ico">📞</span><a href="tel:' + escHtml(c.tel.replace(/ /g, '')) + '">' + escHtml(c.tel) + '</a></li>';
  if (c.email) rows += '<li><span class="cf-ico">✉️</span><a href="mailto:' + escHtml(c.email) + '">' + escHtml(c.email) + '</a></li>';
  var web = _clubSafeUrl(c.web), fb = _clubSafeUrl(c.facebook), ig = _clubSafeUrl(c.instagram);
  if (web) rows += '<li><span class="cf-ico">🌐</span><a href="' + escHtml(web) + '" target="_blank" rel="noopener">' + escHtml(web.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')) + '</a></li>';
  if (fb)  rows += '<li><span class="cf-ico">👍</span><a href="' + escHtml(fb) + '" target="_blank" rel="noopener">Facebook</a></li>';
  if (ig)  rows += '<li><span class="cf-ico">📷</span><a href="' + escHtml(ig) + '" target="_blank" rel="noopener">Instagram</a></li>';
  if (!c.tel && !c.email && !web) rows += '<li class="cf-none">Dades de contacte pendents d\'afegir.</li>';

  host.innerHTML = '<div class="cf-hero"><div class="container cf-hero-in">' + logo
    + '<div class="cf-hero-text"><div class="cf-kicker">Club federat</div><h1>' + escHtml(c.nom) + '</h1>'
    + '<div class="cf-loc">📍 ' + escHtml(c.municipi || '') + (c.comarca ? ' · ' + escHtml(c.comarca) : '') + '</div>'
    + (chips ? '<div class="cf-chips">' + chips + '</div>' : '') + '</div></div></div>'
    + '<section class="section" style="background:var(--offwhite)"><div class="container"><div class="cf-grid">'
    + '<div class="cf-main">' + main + '</div>'
    + '<aside class="cf-side"><div class="cf-card"><h2 class="cf-h">Contacte</h2><ul class="cf-list">' + rows + '</ul>'
    + (map ? '<a class="btn-gold cf-map" href="' + escHtml(map) + '" target="_blank" rel="noopener">📍 Com arribar</a>' : '')
    + '</div>'
    + '<button type="button" class="cf-back-clubs"' + dataAttr('onclick', 'setS', ['clubs']) + '>&larr; Tots els clubs</button>'
    + '</aside></div></div></section>';
}

// inici.js – "Comença a tirar amb arc" section: clubs DB + search + near me
// ──────────────────────────────────────────────────────────

// ── Base de dades de clubs ─────────────────────────────────
// Font: fcta.cat/clubs-sitemap.xml + pàgines individuals
var CLUBS = [
  // ── Barcelona (Barcelonès) ─────────────────────────────
  // ── Barcelona (Barcelonès) ─────────────────────────────
  {nom:'Club Escola Arquers Barcelona', municipi:'Barcelona',           comarca:'Barcelonès',        lat:41.3851, lng:2.1734, logo:'img/clubs/club-escola-arquers-barcelona.jpg', web:'#',                        email:'', tel:''},
  {nom:'Club Arc Montjuïc',             municipi:'Barcelona',           comarca:'Barcelonès',        lat:41.3730, lng:2.1530, logo:'img/clubs/generic-club.png', web:'#',          email:'', tel:''},
  {nom:'Club Arquers Poblenou',         municipi:'Barcelona',           comarca:'Barcelonès',        lat:41.4030, lng:2.2020, logo:'img/clubs/club-arquers-poblenou.jpg', web:'#',                               email:'', tel:''},
  {nom:'Zen Kyudo Club Barcelona',      municipi:'Barcelona',           comarca:'Barcelonès',        lat:41.3851, lng:2.1734, logo:'img/clubs/zen-kyudo-club-barcelona.jpg', web:'#',                            email:'', tel:''},
  {nom:'Fundació Pere Tarrés',          municipi:'Barcelona',           comarca:'Barcelonès',        lat:41.3940, lng:2.1400, logo:'img/clubs/fundacio-pere-tarres.png', web:'#',                                email:'', tel:''},
  {nom:'Club Arquers Badalona',         municipi:'Badalona',            comarca:'Barcelonès',        lat:41.4500, lng:2.2472, logo:'img/clubs/club-arquers-badalona.jpg', web:'#',                               email:'arquersbadalona@hotmail.com', tel:''},
  // ── Vallès Occidental ──────────────────────────────────
  {nom:'Club Català de Tir amb Arc',    municipi:'Montcada i Reixac',   comarca:'Vallès Occidental', lat:41.4883, lng:2.2096, logo:'img/clubs/club-catala.png',        web:'#',                       email:'cctacpe@gmail.com', tel:'682 407 747'},
  {nom:'Club Arquers Terrassa',         municipi:'Terrassa',            comarca:'Vallès Occidental', lat:41.5647, lng:1.9951, logo:'img/clubs/arquers-terrassa.webp',   web:'https://arquersterrassa.cat',                                                email:'c.arquersterrassa@gmail.com', tel:'681 802 951'},
  {nom:'Club Tiro con Arco Rubí',       municipi:'Rubí',                comarca:'Vallès Occidental', lat:41.4937, lng:2.0326, logo:'img/clubs/club-tiro-con-arco-rubi.jpg',                               web:'#',                             email:'', tel:''},
  {nom:'Club Arquers Sant Cugat',       municipi:'Sant Cugat del Vallès',comarca:'Vallès Occidental', lat:41.4667, lng:2.0833, logo:'img/clubs/club-arquers-sant-cugat-del-valles.png',                              web:'#',                  email:'arquersdesantcugat@gmail.com', tel:'936 754 353'},
  {nom:'Club Arquers Cerdanyola',       municipi:'Cerdanyola del Vallès',comarca:'Vallès Occidental', lat:41.4900, lng:2.1400, logo:'img/clubs/club-arquers-cerdanyola-del-valles.jpg',                              web:'#',                  email:'', tel:''},
  // ── Vallès Oriental ───────────────────────────────────
  {nom:'Arc Sant Celoni',               municipi:'Sant Celoni',         comarca:'Vallès Oriental',   lat:41.6897, lng:2.4969, logo:'img/clubs/arc-sant-celoni-2.jpg', web:'#',                                   email:'', tel:''},
  {nom:'Club de Tir amb Arc Franqueses',municipi:'Les Franqueses del Vallès',comarca:'Vallès Oriental',lat:41.6210,lng:2.3570, logo:'img/clubs/club-de-tir-amb-arc-les-franqueses.jpg', web:'#',                 email:'', tel:''},
  {nom:'Arquers de Vallromanes',        municipi:'Vallromanes',         comarca:'Vallès Oriental',   lat:41.5170, lng:2.3150, logo:'img/clubs/arquers-de-vallromanes.jpg', web:'#',                              email:'', tel:''},
  {nom:'Club Tir Arc Caldes de Montbui',municipi:'Caldes de Montbui',  comarca:'Vallès Oriental',   lat:41.6290, lng:2.1640, logo:'img/clubs/club-tir-arc-caldes-de-montbui.jpg', web:'#',                     email:'', tel:''},
  {nom:'Club Tir amb Arc Vallgorguina', municipi:'Vallgorguina',        comarca:'Vallès Oriental',   lat:41.6490, lng:2.5110, logo:'img/clubs/club-de-tir-amb-arc-vallgorguina.jpeg', web:'#',                   email:'', tel:''},
  // ── Baix Llobregat ────────────────────────────────────
  {nom:'Tir Arc Olesa',                 municipi:'Olesa de Montserrat', comarca:'Baix Llobregat',   lat:41.5437, lng:1.8941, logo:'img/clubs/tir-arc-olesa.jpg',       web:'https://arcolesa.org',                                                        email:'taolesa@arcolesa.org', tel:'607 462 927'},
  {nom:'Club Tir amb Arc Despí',        municipi:'Sant Joan Despí',     comarca:'Baix Llobregat',   lat:41.3657, lng:2.0384, logo:'img/clubs/club-tir-amb-arc-despi.jpg',                               web:'#',                              email:'', tel:''},
  {nom:'Club Sant Andreu de la Barca',  municipi:'Sant Andreu de la Barca',comarca:'Baix Llobregat',lat:41.4286, lng:1.9847, logo:'img/clubs/club-tir-amb-arc-sant-andreu-de-la-barca.jpg',                               web:'#',           email:'', tel:''},
  {nom:'Arquers Club Castelldefels',    municipi:'Castelldefels',       comarca:'Baix Llobregat',   lat:41.2790, lng:1.9770, logo:'img/clubs/arquers-club-castelldefels.jpg',                               web:'#',                          email:'', tel:''},
  // ── Maresme ───────────────────────────────────────────
  {nom:'Tir Esportiu Mataró',           municipi:'Mataró',              comarca:'Maresme',           lat:41.5421, lng:2.4445, logo:'img/clubs/tir-esportiu-mataro.png',web:'https://www.eltem.es',                                                        email:'info@eltem.es', tel:'937 990 053'},
  {nom:'Club Arquers Dosrius',          municipi:'Dosrius',             comarca:'Maresme',           lat:41.5640, lng:2.4740, logo:'img/clubs/club-arquers-dosrius.gif',                               web:'#',                                email:'', tel:''},
  {nom:'La Conxorxa d\'Arenys de Mar',  municipi:'Arenys de Mar',       comarca:'Maresme',           lat:41.5810, lng:2.5480, logo:'img/clubs/associacio-de-tir-amb-arc-la-conxorxa-darenys-de-mar.jpg',                               web:'#', email:'', tel:''},
  // ── Garraf ────────────────────────────────────────────
  {nom:'Club de Tir amb Arc Vilanova',  municipi:'Vilanova i la Geltrú',comarca:'Garraf',            lat:41.2239, lng:1.7251, logo:'img/clubs/club-de-tir-amb-arc-vilanova-i-la-geltru.jpg', web:'https://www.arcvng.com',                                                      email:'club@arcvng.com', tel:'616 958 037'},
  {nom:'Club Arquers Olivella',         municipi:'Olivella',            comarca:'Garraf',            lat:41.3200, lng:1.8440, logo:'img/clubs/club-arquers-olivella.png',                               web:'#',                               email:'', tel:''},
  {nom:'Club Arquers Can Cuguls',       municipi:'Olivella',            comarca:'Garraf',            lat:41.3220, lng:1.8420, logo:'img/clubs/club-arquers-can-cuguls.jpeg',                               web:'#',                             email:'', tel:''},
  // ── Bages ─────────────────────────────────────────────
  {nom:'Club Tir amb Arc Manresa',      municipi:'Manresa',             comarca:'Bages',             lat:41.7250, lng:1.8266, logo:'img/clubs/club-tir-amb-arc-manresa.jpg',                               web:'#',                            email:'tirambarcmanresa@hotmail.com', tel:'644 747 136'},
  {nom:'Club Tir amb Arc Zen del Bages',municipi:'Manresa',             comarca:'Bages',             lat:41.7260, lng:1.8270, logo:'img/clubs/club-de-tir-amb-arc-zen-del-bages.jpg',                               web:'#',                  email:'', tel:''},
  // ── Anoia ─────────────────────────────────────────────
  {nom:'Club Arquers Anoia',            municipi:'Igualada',            comarca:'Anoia',             lat:41.5793, lng:1.6187, logo:'img/clubs/club-arquers-anoia.png',                               web:'#',                                  email:'', tel:''},
  // ── Gironès / Girona ──────────────────────────────────
  {nom:'Club Arquers Salt',             municipi:'Salt',                comarca:'Gironès',           lat:41.9749, lng:2.7928, logo:'img/clubs/arquers-salt.jpg',        web:'https://clubarcsalt.org',                                                     email:'clubarcsalt@clubarcsalt.org', tel:'626 528 916'},
  {nom:'Club Esportiu Tir Arc Figueres',municipi:'Figueres',           comarca:'Alt Empordà',       lat:42.2671, lng:2.9601, logo:'img/clubs/club-esportiu-tir-arc-figueres.png',                               web:'#',                      email:'', tel:''},
  {nom:'Club Arquers Esclanyà',         municipi:'Esclanyà',           comarca:'Baix Empordà',      lat:41.9614, lng:3.1470, logo:'img/clubs/club-arquers-esclanya.jpg',                               web:'#',                               email:'', tel:''},
  {nom:'Club Costa Brava 3D',           municipi:'Girona',             comarca:'Gironès',           lat:41.9794, lng:2.8214, logo:'img/clubs/club-de-tir-amb-arc-costa-brava-3d.jpg',                               web:'#',                 email:'', tel:''},
  // ── Tarragonès / Camp de Tarragona ────────────────────
  {nom:'Grup Arquers Tarragona',        municipi:'Tarragona',          comarca:'Tarragonès',         lat:41.1189, lng:1.2445, logo:'img/clubs/grup-arquers-tarragona.jpg',                               web:'#',                              email:'', tel:''},
  {nom:'Club de Tir amb Arc Constantí', municipi:'Constantí',         comarca:'Tarragonès',         lat:41.1564, lng:1.2014, logo:'img/clubs/club-de-tir-amb-arc-constanti.jpg',                               web:'#',                      email:'', tel:''},
  {nom:'Club de Tir amb Arc TAU',       municipi:'Tarragona',          comarca:'Tarragonès',         lat:41.1189, lng:1.2445, logo:'img/clubs/club-de-tir-amb-arc-tau.jpg',                               web:'#',                            email:'', tel:''},
  {nom:'Club Arquers Cambrils',         municipi:'Cambrils',           comarca:'Baix Camp',          lat:41.0648, lng:1.0580, logo:'img/clubs/club-arquers-cambrils.png',                               web:'#',                               email:'', tel:''},
  {nom:'Club Arquers Alforja',          municipi:'Alforja',            comarca:'Baix Camp',          lat:41.1930, lng:1.0160, logo:'img/clubs/club-arquers-alforja.jpg',                               web:'#',                                email:'', tel:''},
  {nom:'Club Arquers Priorat',          municipi:'Falset',             comarca:'Priorat',            lat:41.1430, lng:0.8390, logo:'img/clubs/club-arquers-priorat.jpg',                               web:'#',                                email:'', tel:''},
  // ── Segrià / Lleida ───────────────────────────────────
  {nom:'Club Tir amb Arc Lleida',       municipi:'Lleida',             comarca:'Segrià',             lat:41.6176, lng:0.6200, logo:'img/clubs/tir-amb-arc-lleida.png',  web:'https://tirambarclleida.cat',                                                 email:'', tel:'647 445 161'},
  {nom:'Club Tir amb Arc Pardinyes',    municipi:'Lleida',             comarca:'Segrià',             lat:41.6090, lng:0.6350, logo:'img/clubs/club-tir-amb-arc-pardinyes.png',                               web:'#',                          email:'', tel:''},
  {nom:'AE Cultural Puigverd de Lleida',municipi:'Puigverd de Lleida', comarca:'Segrià',             lat:41.5630, lng:0.7030, logo:'img/clubs/associacio-esportiva-cultural-puigverd-de-lleida.jpg',                               web:'#',   email:'', tel:''},
  // ── Noguera / Alt Pirineu ─────────────────────────────
  {nom:'Club Arquers Montsec',          municipi:'Àger',               comarca:'Noguera',            lat:42.0020, lng:0.7790, logo:'img/clubs/club-arquers-montsec.jpg',                               web:'#',                                email:'', tel:''},
];

// ── Render ────────────────────────────────────────────────
var _clubFilter = '';
var _clubSort = 'alfa'; // 'alfa' | 'dist'
var _userCoords = null;

function renderClubs() {
  var grid = document.getElementById('clubsGrid');
  var noRes = document.getElementById('clubsNoResult');
  if (!grid) return;

  var list = CLUBS.slice();

  // Filtre text
  if (_clubFilter) {
    var q = _clubFilter.toLowerCase();
    list = list.filter(function(c) {
      return c.nom.toLowerCase().includes(q) || c.municipi.toLowerCase().includes(q) || c.comarca.toLowerCase().includes(q);
    });
  }

  // Ordena
  if (_clubSort === 'dist' && _userCoords) {
    list.forEach(function(c) {
      c._dist = haversine(_userCoords.lat, _userCoords.lng, c.lat, c.lng);
    });
    list.sort(function(a, b) { return a._dist - b._dist; });
  } else {
    list.sort(function(a, b) { return a.municipi.localeCompare(b.municipi); });
  }

  noRes.style.display = list.length ? 'none' : 'block';
  var noResQ = document.getElementById('clubsNoResultQ');
  if (noResQ) noResQ.textContent = _clubFilter;
  var count = document.getElementById('clubsCount');
  if (count) count.textContent = list.length + ' club' + (list.length !== 1 ? 's' : '') + ' trobat' + (list.length !== 1 ? 's' : '');

  grid.innerHTML = list.map(function(c) {
    var distBadge = (_clubSort === 'dist' && c._dist !== undefined)
      ? '<span class="club-dist">' + (c._dist < 1 ? '<1' : Math.round(c._dist)) + ' km</span>'
      : '';
    var contactHtml = '';
    if (c.tel)   contactHtml += '<a href="tel:' + c.tel.replace(/ /g,'') + '" class="club-contact">📞 ' + c.tel + '</a>';
    if (c.email) contactHtml += '<a href="mailto:' + c.email + '" class="club-contact">✉️ ' + c.email + '</a>';

    var logoHtml = c.logo
      ? '<img class="club-logo" src="' + c.logo + '" alt="' + c.nom + '" onerror="this.outerHTML=\'<div class=&quot;club-initial&quot;>' + c.nom.charAt(0) + '</div>\'">'
      : '<div class="club-initial">' + c.nom.charAt(0) + '</div>';

    return '<div class="club-card">'
      + '<div class="club-card-head">'
      + logoHtml
      + '<div style="flex:1;min-width:0">'
      + '<div class="club-nom">' + c.nom + '</div>'
      + '<div class="club-loc">📍 ' + c.municipi + ' <span class="club-comarca">· ' + c.comarca + '</span></div>'
      + '</div>'
      + distBadge
      + '</div>'
      + (contactHtml ? '<div class="club-contacts">' + contactHtml + '</div>' : '')
      + '<a href="' + c.web + '" target="_blank" class="club-link">Veure fitxa →</a>'
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

// Haversine (km)
function haversine(lat1, lng1, lat2, lng2) {
  var R = 6371;
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLng = (lng2 - lng1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2)
        + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180)
        * Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

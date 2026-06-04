// disciplines.js – Generic discipline page: data + render
// ──────────────────────────────────────────────────────────

// ── Dades per disciplina ──────────────────────────────────
var DISC_DATA = {

  al: {
    nom: 'Aire Lliure i Sala',
    subtitol: 'Comitè Català d\'Aire Lliure i Sala',
    icon: '🎯',
    color: '#1a6fb5',
    descripcio: 'El tir d\'aire lliure i sala són les dues cares d\'una mateixa disciplina que s\'organitza en dues temporades complementàries. A l\'aire lliure (primavera-estiu) es dispara a dianes exteriors; a sala (tardor-hivern), en pavelló cobert. És la disciplina olímpica del tir amb arc i la més practicada a Catalunya.\n\nLa distància i la mida de diana depenen de l\'estil de l\'arc i de la categoria d\'edat. El recorbat sènior tira a 70 m amb una diana de 122 cm; el compost sènior, a 50 m amb diana de 80 cm retallada; categories menors i estils de bosc tiren a distàncies reduïdes. A sala, tothom tira a 18 m, però les dianes varien: 40 cm per a recorbat i compost, 60 cm per a la resta. La competició consta d\'una fase de classificació (Round 720: 72 fletxes en dues rondes) seguida d\'eliminatòries individuals i per equips.',
    format: [
      { label: 'Temporades',     valor: 'Aire Lliure: primavera–estiu · Sala: tardor–hivern' },
      { label: 'Classificació',  valor: 'Round 720: 72 fletxes (2 × 36) en fase de classificació' },
      { label: 'Distàncies AL',  valor: 'Varien per estil i edat: 18 m (menors petits) fins a 70 m (recorbat sènior) o 50 m (compost sènior)' },
      { label: 'Distàncies Sala',valor: '18 m per a totes les categories' },
      { label: 'Diana AL',       valor: '122 cm (recorbat) · 80 cm retallada (compost) · 60 cm (nu/longbow) – 10 zones de puntuació' },
      { label: 'Diana Sala',     valor: '40 cm (recorbat/compost) · 60 cm (nu/longbow/tradicional) – triple vertical o única' },
      { label: 'Eliminatòries',  valor: 'Sistema WA: matches de 5 sets (recorbat) o de puntuació acumulada (compost)' },
    ],
    categories: ['Benjamí (U10)', 'Aleví (U12)', 'Sub-15', 'Sub-18', 'Sub-21', 'Adult', '50+', '60+'],
    estils: ['Arc Recorbat', 'Arc Compost', 'Arc Nu', 'Longbow', 'Tradicional'],
    lligues: [
      {
        nom: 'Lliga Catalana Aire Lliure 2026',
        tipus: 'al',
        temporada: '2026',
        tirades: [
          { num: '1ª', compId: 13 },
          { num: '2ª', compId: 11 },
          { num: '3ª', compId: 1  },
        ],
        ranquingUrl: 'docs/Ranquing_Lliga_AL_2024.pdf',
        ranquingLabel: 'Rànquing Lliga AL 2024 (darrera temporada completa)',
        historics: [
          { label: 'Rànquing Final AL 2024', url: 'docs/Ranquing_Lliga_AL_2024.pdf' },
        ],
      },
      {
        nom: 'Lliga Catalana de Sala 2025/2026',
        tipus: 'sala',
        temporada: '2025–26',
        tirades: [
          { num: '1ª', data: '18 gen 2026', lloc: 'Sant Celoni',            status: 'closed', circ: '#' },
          { num: '2ª', data: 'feb 2026',    lloc: 'Manresa / Torrefarrera', status: 'closed', circ: '#' },
          { num: '3ª', data: 'mar 2026',    lloc: 'Constantí / Manresa',    status: 'closed', circ: '#' },
          { num: '4ª', data: 'abr 2026',    lloc: 'Constantí',              status: 'closed', circ: '#' },
        ],
        ranquingUrl: 'docs/Ranquing_Lliga_Sala_2023-24.pdf',
        ranquingLabel: 'Rànquing Final Sala 2023/24',
        historics: [
          { label: 'Rànquing Final Sala 2023/24', url: 'docs/Ranquing_Lliga_Sala_2023-24.pdf' },
        ],
      },
    ],
    campionats: [
      { nom: '73è Campionat de Catalunya Aire Lliure', data: 'jul 2026', lloc: 'Pendent de confirmar', status: 'soon' },
      { nom: '58è Campionat de Catalunya de Sala',     data: '31 gen 2026', lloc: 'Manresa / Constantí', status: 'closed', resultatUrl: 'https://www.ianseo.net/Details.php?toId=26399' },
      { nom: 'Campionat de Catalunya Universitari',    data: '28 mar 2026', lloc: 'Tarragona',           status: 'closed', resultatUrl: 'https://www.ianseo.net/Details.php?toId=27386' },
    ],
    records: [
      // AIRE LLIURE – Arc Recorbat (Round 720 · 72 fletxes) · Act. agost 2024
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sènior Dona',  marca:'674 pts', atleta:'Elia Canales Martin',        any:'2019' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sènior Home',  marca:'679 pts', atleta:'Miquel Àngel Pifarré',       any:'2019' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-21 Dona',  marca:'674 pts', atleta:'Elia Canales Martin',        any:'2019' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-21 Home',  marca:'655 pts', atleta:'Arnau Peña Cervelló',        any:'2018' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-18 Dona',  marca:'665 pts', atleta:'Elia Canales Martin',        any:'2018' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-18 Home',  marca:'667 pts', atleta:'Álvaro Salmerón González',   any:'2010' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-15 Dona',  marca:'672 pts', atleta:'Lucía Ramos Valiente',       any:'2019' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'+50 Home',     marca:'629 pts', atleta:'Manuel Hernández Higuera',   any:'2023' },
      // AIRE LLIURE – Arc Compost (Round 720 · 72 fletxes) · Act. agost 2024
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sènior Dona',  marca:'684 pts', atleta:'Lucia Rodríguez Coutado',    any:'2021' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sènior Home',  marca:'705 pts', atleta:'César Gómez Serra',          any:'2016' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sub-21 Home',  marca:'687 pts', atleta:'Jordi Ricart Roig',          any:'2022' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sub-18 Dona',  marca:'622 pts', atleta:'Núria Sinfreu Abad',         any:'2021' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sub-18 Home',  marca:'623 pts', atleta:'Santiago López Padilla',     any:'2014' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'+50 Home',     marca:'673 pts', atleta:'Rafael Lijarcio Vergara',    any:'2013' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'+50 Dona',     marca:'676 pts', atleta:'Elena García Muñoz',         any:'2012' },
      // SALA – Arc Recorbat (18m · 60 fletxes) · Act. març 2024
      { disc:'Sala',        estil:'Recorbat', cat:'Sènior Dona',  marca:'585 pts', atleta:'Elia Canales Martin',        any:'2022' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sènior Home',  marca:'589 pts', atleta:'Arnau Peña Cervelló',        any:'2019' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sub-21 Dona',  marca:'583 pts', atleta:'Elia Canales Martin',        any:'2019' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sub-21 Home',  marca:'582 pts', atleta:'Arnau Peña Cervelló',        any:'2017' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sub-18 Dona',  marca:'580 pts', atleta:'Lucía Ramos Valiente',       any:'2022' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sub-18 Home',  marca:'569 pts', atleta:'Álvaro Salmerón',            any:'2009' },
      { disc:'Sala',        estil:'Recorbat', cat:'+50 Home',     marca:'562 pts', atleta:'Luis Miguel Ramos Calleja',  any:'2019' },
      { disc:'Sala',        estil:'Recorbat', cat:'+50 Dona',     marca:'498 pts', atleta:'Montserrat Ros Hermosilla',  any:'2019' },
      // SALA – Arc Compost (18m · 60 fletxes) · Act. març 2024
      { disc:'Sala',        estil:'Compost',  cat:'Sènior Dona',  marca:'580 pts', atleta:'Maria Pitarch Laguna',       any:'2024' },
      { disc:'Sala',        estil:'Compost',  cat:'Sènior Home',  marca:'590 pts', atleta:'César Gómez',                any:'2008' },
      { disc:'Sala',        estil:'Compost',  cat:'Sub-21 Home',  marca:'574 pts', atleta:'Edgar Brocal',               any:'2010' },
      { disc:'Sala',        estil:'Compost',  cat:'Sub-18 Dona',  marca:'544 pts', atleta:'Núria Sinfreu Abad',         any:'2021' },
      { disc:'Sala',        estil:'Compost',  cat:'Sub-18 Home',  marca:'572 pts', atleta:'Santiago López Padilla',     any:'2014' },
      { disc:'Sala',        estil:'Compost',  cat:'+50 Dona',     marca:'567 pts', atleta:'Ester Semis Astier',         any:'2023' },
      { disc:'Sala',        estil:'Compost',  cat:'+50 Home',     marca:'582 pts', atleta:'Basili García',              any:'2017' },
      // SALA – Arc Nu · Act. març 2024
      { disc:'Sala',        estil:'Arc Nu',   cat:'Sènior Dona',  marca:'528 pts', atleta:'Carme Sanchez Amado',        any:'2023' },
      { disc:'Sala',        estil:'Arc Nu',   cat:'Sènior Home',  marca:'552 pts', atleta:'David García Fernández',     any:'2021' },
      // SALA – Tradicional · Act. març 2024
      { disc:'Sala',        estil:'Tradicional', cat:'Sènior Dona', marca:'556 pts', atleta:'Miriam Monfort Fernández', any:'2023' },
      { disc:'Sala',        estil:'Tradicional', cat:'Sènior Home', marca:'586 pts', atleta:'Juanjo Querol Guardiola',  any:'2021' },
    ],
    resultatExtern: 'https://ianseo.net',
    circularsCategoria: 'al',
  },

  '3d': {
    nom: 'Tir 3D',
    subtitol: 'Comitè Català de Tir de 3D',
    icon: '🌲',
    color: '#2e7d32',
    descripcio: 'El tir 3D és la modalitat més immersiva del tir amb arc: es practica en circuits forestals o en modalitat en linea, on les figures volumètriques estan situades en entorns naturals amb vegetació, irregularitats del terreny i jocs de llum. La clau d\'aquesta disciplina és l\'estimació de la distància —mai no es diu d\'on es tira fins que ets a la balisa— combinada amb la tècnica de tir.\n\nEs dispara a figures sintètics en 3D. Cada diana té zones de puntuació: 11, 10, 8 i 5. El circuit sol tenir 24 dianes; l\'arquer fa tot el recorregut en grup. Les distàncies màximes varien per divisió de l\'arc i classe, però mai superen els 45 m (compost).',
    format: [
      { label: 'Circuit',       valor: '24 dianes en recorregut natural de bosc' },
      { label: 'Distàncies',    valor: 'Desconegudes fins arribar a la balisa; ~45 m (compost) · menys per a menors i estils nu/tradicional/longbow' },
      { label: 'Dianes',        valor: 'Figures 3D sintètiques' },
      { label: 'Puntuació',     valor: 'Zona vital (11-10 pts), cos (8 pts), extrem (5 pts) – 2 fletxa per diana en competició oficial' },
    ],
    categories: ['Sub-15', 'Sub-18', 'Sub-21', 'Adult', '50+'],
    estils: ['Arc Compost', 'Arc Nu', 'Longbow', 'Tradicional'],
    lligues: [
      {
        nom: 'Lliga Catalana 3D 2025/2026',
        tipus: '3d',
        temporada: '2025–26',
        tirades: [
          { num: '1ª', data: '18 gen 2026', lloc: 'Sant Celoni', status: 'closed', circ: '#' },
          { num: '2ª', data: '22 feb 2026', lloc: 'Olivella (Barcelona)', status: 'closed', circ: 'CIRC-2608' },
          { num: '3ª', data: '22 feb 2026', lloc: 'Olivella', status: 'closed', circ: '#' },
          { num: '4ª', data: '12 abr 2026', lloc: 'Castellnou del Bages', status: 'closed', circ: 'CIRC-2608' },
        ],
        ranquingUrl: 'docs/Ranquing_Lliga_3D_2024-25.pdf',
        ranquingLabel: 'Rànquing Lliga 3D 2024/25',
        historics: [
          { label: 'Rànquing Final 3D 2024/25',        url: 'docs/Ranquing_Lliga_3D_2024-25.pdf' },
          { label: 'Rànquing Final 3D 2023/24',        url: 'docs/Ranquing_Lliga_3D_2023-24.pdf' },
          { label: 'Rànquing Provisional 3D 2023/24',  url: 'docs/Ranquing_Lliga_3D_2023-24_prov.pdf' },
        ],
      },
    ],
    campionats: [
      { nom: '30è Campionat de Catalunya 3D', data: '17 mai 2026', lloc: 'Montcada i Reixac', status: 'closed', resultatUrl: 'https://www.ianseo.net/Details.php?toId=28099' },
    ],
    resultatExtern: 'https://ianseo.net',
    circularsCategoria: '3d',
  },

  camp: {
    nom: 'Tir de Camp',
    subtitol: 'Comitè Català de Tir de Camp',
    icon: '🏔️',
    color: '#5d4037',
    descripcio: 'El tir de camp (WA Field) és una disciplina que combina la natura amb la tècnica: els arquers recorren un circuit de 24 dianes de paper situades en terreny accidentat, amunt i avall de pendents, entre arbres i amb angles de tir variats. Les propostes de tir poden ser desconegudes (distància no informada) i conegudes (distàncies marcades).\n\nLes dianes de camp utilitzen el sistema de puntuació WA: cara de diana circular amb zones de 6-5-4-3-2-1 punts. La distància màxima depèn de la divisió i la classe: el recorbat i compost sènior tira fins a 60 m en marc conegut (50 m en desconegut); els longbow senior fins a 40 m (veure reglamentació per més detalls).',
    format: [
      { label: 'Circuit',         valor: '24 dianes' },
      { label: 'Distàncies conegudes',    valor: 'Distàncies marcades; recorbat i compost sènior fins a 60 m, tradicional i nu fins a 50 m i longbow fins a 40 m (veure reglamentació per més detalls)' },
      { label: 'Distàncies desconegudes', valor: 'Distàncies sense marcar; recorbat i compost sènior fins a 55 m, tradicional i nu fins a 45 m i longbow fins a 35 m (veure reglamentació per més detalls)' },
      { label: 'Diana',           valor: 'Cara circular WA de camp: zones 6-5-4-3-2-1 (3 mides: 20/40/60 cm)' },
      { label: 'Fletxes',         valor: '3 fletxes per diana en marc desconegut · 2 fletxes en marc conegut (WA oficial)' },
    ],
    categories: ['Sub-15', 'Sub-18', 'Sub-21', 'Adult', '50+'],
    estils: ['Arc Recorbat', 'Arc Compost', 'Arc Nu', 'Longbow', 'Tradicional'],
    lligues: [
      {
        nom: 'Lliga Catalana de Camp 2025/2026',
        tipus: 'camp',
        temporada: '2025–26',
        tirades: [
          { num: '1ª', data: '11 gen 2026', lloc: 'Castellnou del Bages', status: 'closed', circ: 'CIRC-2615' },
          { num: '2ª', data: '8 mar 2026',  lloc: 'Montcada i Reixac',    status: 'closed', circ: '#' },
          { num: '3ª', data: '3 mai 2026',  lloc: 'Montcada i Reixac',    status: 'closed', circ: '#' },
        ],
        ranquingUrl: 'docs/Ranquing_Lliga_Camp_2023-24.pdf',
        ranquingLabel: 'Rànquing Lliga Camp 2023/24',
        historics: [
          { label: 'Rànquing Lliga Camp 2023/24',  url: 'docs/Ranquing_Lliga_Camp_2023-24.pdf' },
          { label: 'Classificació Final Camp 2020/21', url: 'docs/Ranquing_Lliga_Camp_2020-21.pdf' },
        ],
      },
    ],
    campionats: [
      { nom: '56è Campionat de Catalunya de Camp', data: '10 mai 2026', lloc: 'Montcada i Reixac', status: 'closed', resultatUrl: 'https://www.ianseo.net/Details.php?toId=28098' },
    ],
    resultatExtern: 'https://ianseo.net',
    circularsCategoria: 'camp',
  },

  kyudo: {
    nom: 'Kyudo',
    subtitol: 'Comitè Català de Kyudo',
    icon: '🎌',
    color: '#880e4f',
    descripcio: 'El Kyudo (弓道, "camí de l\'arc") és l\'art marcial japonès del tir amb arc, una pràctica que va molt més enllà de la precisió tècnica: és un camí de perfeccionament personal que integra cos, ment i esperit. El kyudoka (practicant) utilitza el yumi, un arc asimètric de bambú d\'uns 2,2 m d\'alçada, i les ya, fletxes tradicionals de bambú.\n\nA diferència del tir esportiu occidental, al Kyudo no s\'utilitzen assistències mecàniques. El tir es realitza en dues modalitats: sha-teki (28 m sobre una diana de paper de 36 cm, el mato) i enteki (60 m sobre una diana de 79 cm). La forma (kata) és tan important com l\'impacte: la seqüència dels huit moviments (hassetsu) ha de ser executada amb control, concentració i serenitat. Al Japó el Kyudo és una de les arts marcials més practicades.',
    format: [
      { label: 'Modalitats',    valor: 'Sha-teki (tir proper) · Enteki (tir llarg)' },
      { label: 'Distàncies',    valor: '28 m (sha-teki) · 60 m (enteki)' },
      { label: 'Diana',         valor: 'Sha-teki: mato de 36 cm Ø · Enteki: diana de 79 cm Ø' },
      { label: 'Arc',           valor: 'Yumi: arc asimètric de bambú, ~2,2 m; sense mirilla ni llançador mecànic' },
      { label: 'Tècnica',       valor: 'Hassetsu: 8 moviments codificats; la forma és tan valorada com la precisió' },
      { label: 'Vestimenta',    valor: 'Kimono tradicional i hakama obligatoris en competicions oficials' },
    ],
    categories: ['Totes les categories'],
    estils: ['Kyudo'],
    lligues: [],
    campionats: [
      { nom: 'Campionat de Catalunya de Kyudo 2026', data: 'mar 2026', lloc: 'Barcelona', status: 'closed', resultatUrl: '#' },
    ],
    records: [],
    resultatExtern: '#',
    circularsCategoria: 'kyudo',
  },
};

// ── Estat actiu ───────────────────────────────────────────
var _discActiva = null;
var _discTab = 'info';

// ── Accés des de fora ─────────────────────────────────────
function setDisciplina(key) {
  _discActiva = key;
  _discTab = 'info';
  setS('disciplina');
  renderDisciplina();
}

// ── Render principal ──────────────────────────────────────
function renderDisciplina() {
  var d = DISC_DATA[_discActiva];
  if (!d) return;

  // Capçalera
  document.getElementById('discIcon').textContent = d.icon;
  document.getElementById('discNom').textContent = d.nom;
  document.getElementById('discSub').textContent = d.subtitol;
  document.getElementById('discHero').style.borderBottomColor = d.color;

  // Tabs
  var tabs = document.querySelectorAll('#discTabs .disc-tab');
  tabs.forEach(function(t) { t.classList.remove('act'); });
  var recordsTab = document.querySelector('#discTabs [data-tab="records"]');
  if (recordsTab) {
    var hideRecords = (_discActiva === '3d' || _discActiva === 'camp');
    recordsTab.style.display = hideRecords ? 'none' : '';
    if (hideRecords && _discTab === 'records') _discTab = 'info';
  }
  var activeTab = document.querySelector('#discTabs [data-tab="' + _discTab + '"]');
  if (activeTab) activeTab.classList.add('act');

  // Color accent
  document.documentElement.style.setProperty('--disc-color', d.color);

  renderDiscTab(_discTab);
}

function setDiscTab(tab, btn) {
  _discTab = tab;
  document.querySelectorAll('#discTabs .disc-tab').forEach(function(b){ b.classList.remove('act'); });
  if (btn) btn.classList.add('act');
  renderDiscTab(tab);
}

function renderDiscTab(tab) {
  var d = DISC_DATA[_discActiva];
  var content = document.getElementById('discContent');
  if (!d || !content) return;

  switch(tab) {
    case 'info':    content.innerHTML = renderDiscInfo(d);        break;
    case 'lliga':   content.innerHTML = renderDiscLliga(d);       break;
    case 'resultats': content.innerHTML = renderDiscResultats(d); break;
    case 'records': content.innerHTML = renderDiscRecords(d);     break;
    case 'docs':    content.innerHTML = renderDiscDocs(d);        break;
  }
}

// ── Panels ────────────────────────────────────────────────
function renderDiscInfo(d) {
  var html = '<div class="disc-info-grid">';

  // Descripció – suport per paràgrafs separats per \n\n
  var descHtml = d.descripcio
    .split('\n\n')
    .map(function(p){ return '<p>' + p + '</p>'; })
    .join('');
  html += '<div class="disc-card disc-card--wide">'
    + '<div class="disc-card-icon">' + d.icon + '</div>'
    + '<h3>Sobre la disciplina</h3>'
    + descHtml + '</div>';

  // Format
  if (d.format && d.format.length) {
    html += '<div class="disc-card"><h3>📐 Format de competició</h3><dl class="disc-dl">';
    d.format.forEach(function(f) {
      html += '<dt>' + f.label + '</dt><dd>' + f.valor + '</dd>';
    });
    html += '</dl></div>';
  }

  // Categories
  if (d.categories && d.categories.length) {
    html += '<div class="disc-card"><h3>🏅 Classes</h3><ul class="disc-tags">';
    d.categories.forEach(function(c) { html += '<li>' + c + '</li>'; });
    html += '</ul>';
    if (d.estils && d.estils.length) {
      html += '<h3 style="margin-top:1rem">🏹 Divisions</h3><ul class="disc-tags">';
      d.estils.forEach(function(e) { html += '<li>' + e + '</li>'; });
      html += '</ul>';
    }
    html += '</div>';
  }

  // Nota reglaments
  html += '<div class="disc-reglament-nota">'
    + '⚠️ <strong>Informació orientativa.</strong> Distàncies, mides de diana, categories i normes poden variar '
    + 'per temporada, divisió d\'arc i classe d\'edat. Per a la informació oficial i actualitzada consulta el '
    + '<strong>Reglament de Competicions FCTA</strong> i els <strong>Llibres de Regles de la World Archery</strong> '
    + 'disponibles a la pestanya '
    + '<button onclick="setDiscTab(\'docs\', document.querySelector(\'#discTabs [data-tab=\\\'docs\\\']\'))" '
    + 'style="background:none;border:none;padding:0;font-weight:700;color:var(--navy-light);cursor:pointer;font-family:inherit;font-size:inherit;text-decoration:underline">📄 Documents →</button>'
    + '</div>';

  html += '</div>';
  return html;
}

function renderDiscLliga(d) {
  if (!d.lligues || !d.lligues.length) {
    return '<div class="disc-empty">No hi ha dades de lliga per a aquesta disciplina.</div>';
  }

  var html = '';
  d.lligues.forEach(function(ll) {
    // Construeix els botons de rànquings
    var ranqBtns = '';
    if (ll.ranquingUrl && ll.ranquingUrl !== '#') {
      ranqBtns += '<a href="' + ll.ranquingUrl + '" target="_blank" class="disc-btn-sm">📊 ' + ll.ranquingLabel + ' →</a>';
    } else {
      ranqBtns += '<span class="disc-pendent">Rànquing pendent</span>';
    }
    if (ll.historics && ll.historics.length > 1) {
      ll.historics.slice(1).forEach(function(h) {
        ranqBtns += '<a href="' + h.url + '" target="_blank" class="disc-btn-sm" style="opacity:.7">📋 ' + h.label + ' →</a>';
      });
    }

    html += '<div class="disc-lliga-block">'
      + '<div class="disc-lliga-head">'
      + '<span class="disc-lliga-badge">' + ll.temporada + '</span>'
      + '<strong>' + ll.nom + '</strong>'
      + ranqBtns
      + '</div>'
      + '<div class="disc-tirades-grid">';

    ll.tirades.forEach(function(t) {
      // Si la tirada referencia una competició del DB, agafa les dades d'allà
      var comp = t.compId ? (DB.competitions || []).find(function(c){ return c.id === t.compId; }) : null;
      var status  = comp ? resolveStatus(comp) : (t.status || 'soon');
      var lloc    = comp ? comp.loc  : (t.lloc || '—');
      var data    = comp ? comp.date : (t.data || '—');
      var circ    = comp ? comp.circ : (t.circ || '');
      var url     = comp ? comp.url  : (t.url  || '');
      var ianseo  = comp ? comp.ianseo : (t.ianseo || '');

      var cls   = status === 'open' ? 'disc-tirada--open' : (status === 'soon' ? 'disc-tirada--soon' : 'disc-tirada--closed');
      var badge = status === 'open' ? '🟢 Oberta' : (status === 'soon' ? '🟡 Pròximament' : '✅ Finalitzada');

      // Botons d'acció (iguals que a renderComp)
      var acts = '';
      if (status === 'open') {
        if (url && url !== '#' && url.indexOf('#news:') !== 0) {
          acts += '<a class="bsm bsm-o" href="' + url + '" target="_blank">📄 Més info</a>';
        }
      } else if (status === 'closed') {
        if (url && url.indexOf('#news:') === 0) {
          var nid = parseInt(url.replace('#news:', ''));
          acts += '<button class="bsm bsm-o" onclick="openNews(' + nid + ')">📰 Notícia</button>';
        } else if (url && url !== '#') {
          acts += '<a class="bsm bsm-o" href="' + url + '" target="_blank">📊 Resultats</a>';
        }
        if (ianseo) {
          acts += '<a class="bsm bsm-n" href="https://www.ianseo.net/Details.php?toId=' + ianseo + '" target="_blank">📈 Ianseo</a>';
        }
      }

      var circHtml = (circ && circ !== '#') ? '<div class="disc-tirada-circ">📃 ' + circ + '</div>' : '';

      html += '<div class="disc-tirada ' + cls + '">'
        + '<div class="disc-tirada-num">' + t.num + '</div>'
        + '<div class="disc-tirada-info">'
        + '<div class="disc-tirada-lloc">📍 ' + lloc + '</div>'
        + '<div class="disc-tirada-data">📅 ' + data + '</div>'
        + circHtml
        + (acts ? '<div class="disc-tirada-acts">' + acts + '</div>' : '')
        + '</div>'
        + '<span class="disc-tirada-badge">' + badge + '</span>'
        + '</div>';
    });

    html += '</div></div>';
  });
  return html;
}

function renderDiscResultats(d) {
  // Campionats
  var html = '<h3 class="disc-section-title">Campionats</h3><div class="disc-camp-grid">';

  if (d.campionats && d.campionats.length) {
    d.campionats.forEach(function(c) {
      var clsBorder = c.status === 'closed' ? 'border-left:4px solid #aaa' : 'border-left:4px solid var(--disc-color,#1a6fb5)';
      var btnHtml = '';
      if (c.resultatUrl && c.resultatUrl !== '#') {
        if (c.resultatUrl.startsWith('#news:')) {
          var nid = parseInt(c.resultatUrl.replace('#news:',''));
          btnHtml = '<button class="disc-btn-sm" onclick="openNews(' + nid + ')">📰 Veure notícia →</button>';
        } else {
          btnHtml = '<a href="' + c.resultatUrl + '" target="_blank" class="disc-btn-sm">📊 Resultats →</a>';
        }
      }
      html += '<div class="disc-camp-card" style="' + clsBorder + '">'
        + '<div class="disc-camp-nom">' + c.nom + '</div>'
        + '<div class="disc-camp-meta">📅 ' + c.data + ' &nbsp;·&nbsp; 📍 ' + c.lloc + '</div>'
        + btnHtml
        + '</div>';
    });
  } else {
    html += '<div class="disc-empty">Sense resultats registrats.</div>';
  }

  html += '</div>';

  // Resultats externs
  if (d.resultatExtern && d.resultatExtern !== '#') {
    html += '<div class="disc-ext-link">'
      + '<span>🌐 Resultats detallats a:</span>'
      + '<a href="' + d.resultatExtern + '" target="_blank">' + d.resultatExtern + ' →</a>'
      + '</div>';
  }

  return html;
}

function renderDiscRecords(d) {
  if (!d.records || !d.records.length) {
    return '';
  }

  // Agrupa per disciplina (Aire Lliure / Sala) i estil
  var groups = {};
  d.records.forEach(function(r) {
    var key = (r.disc || '') + ' – ' + (r.estil || r.modalitat || '');
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });

  var html = '';
  Object.keys(groups).forEach(function(grp) {
    html += '<h3 class="disc-section-title" style="margin-top:1.5rem">' + grp + '</h3>';
    html += '<table class="disc-records-table"><thead><tr>'
      + '<th>Classe</th><th>Marca</th><th>Atleta</th><th>Any</th>'
      + '</tr></thead><tbody>';
    groups[grp].forEach(function(r) {
      html += '<tr>'
        + '<td>' + r.cat + '</td>'
        + '<td><strong>' + r.marca + '</strong></td>'
        + '<td>' + (r.atleta || '—') + '</td>'
        + '<td>' + (r.any || '—') + '</td>'
        + '</tr>';
    });
    html += '</tbody></table>';
  });

  html += '<p class="disc-records-note">📅 Dates d\'actualització: Aire Lliure agost 2024 · Sala març 2024. '
    + 'Per als rècords oficials complets (totes les classes i divisions) consulta els PDFs a la pestanya Documents.</p>';

  // Botó per sol·licitar nou rècord
  html += '<div style="margin-top:1.5rem;text-align:right">'
    + '<button class="disc-btn-sm" style="font-size:.85rem;padding:.5rem 1rem" onclick="openRecordForm()">'
    + '🏆 Sol·licitar homologació d\'un nou rècord</button></div>';

  return html;
}

function renderDiscDocs(d) {
  var html = '<div class="disc-docs-list">';

  // Documents de la BD filtrats per disciplina
  var docs = (DB.documents || []).filter(function(doc){ return doc.disc === d.circularsCategoria; });
  if (docs.length) {
    docs.forEach(function(doc) {
      var href = doc.url && doc.url !== '#' ? doc.url : null;
      if (href) {
        html += '<a href="' + href + '" target="_blank" class="disc-doc-item">'
          + '<span class="disc-doc-icon">' + (doc.icon || '📄') + '</span>'
          + '<span class="disc-doc-nom">' + doc.nom + '</span>'
          + '<span class="disc-doc-arrow">→</span>'
          + '</a>';
      } else {
        html += '<div class="disc-doc-item disc-doc-item--nourl">'
          + '<span class="disc-doc-icon">' + (doc.icon || '📄') + '</span>'
          + '<span class="disc-doc-nom">' + doc.nom + '</span>'
          + '<span class="disc-doc-arrow" style="color:var(--gray)">Pendent</span>'
          + '</div>';
      }
    });
  } else {
    html += '<div class="disc-empty">Sense documents publicats per a aquesta disciplina.</div>';
  }

  // Circulars relacionades (del DB)
  var relCirc = (DB.circulars || []).filter(function(c){ return c.type === d.circularsCategoria; });
  if (relCirc.length) {
    html += '<div class="disc-docs-title" style="margin-top:1.5rem">Circulars relacionades</div>';
    relCirc.slice(0, 5).forEach(function(c) {
      if (c.url && c.url !== '#') {
        html += '<a href="' + c.url + '" target="_blank" class="disc-doc-item">'
          + '<span class="disc-doc-icon">📄</span>'
          + '<span class="disc-doc-nom">' + c.num + ' – ' + c.title + '</span>'
          + '<span class="disc-doc-arrow">→</span>'
          + '</a>';
      }
    });
  }

  html += '</div>';
  return html;
}

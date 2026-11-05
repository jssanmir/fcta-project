// disciplines.js – Generic discipline page: data + render
// ──────────────────────────────────────────────────────────

// ── Dades per disciplina ──────────────────────────────────
var DISC_DATA = {

  al: {
    nom: 'Aire Lliure',
    subtitol: '',
    icon: '☀️',
    color: '#1a6fb5',
    descripcio: 'El tir d\'aire lliure és la disciplina olímpica del tir amb arc i la més practicada a Catalunya. Es disputa al aire lliure en en instal·lacions exteriors on les condicions son molt relevants, des de distàncies de 12 m fins a 70 m depenent de l\'arc i la classe.\n\nEl recorbat sènior tira a 70 m amb una diana de 122 cm; el compost sènior, a 50 m amb diana de 80 cm reduida; categories d\'escola i menors tiren a distàncies més curtes. La competició consta d\'una fase de classificació (Round 720: 72 fletxes en dues rondes) seguida d\'eliminatòries individuals i per equips en el cas de campionat.',
    normativa: [
      { label: 'Format Competicions Aire Lliure 2026/27', url: 'docs/2026060812190382-CIRC_2633_Format_competicions_Aire_Lliure_2026_27.pdf' },
    ],
    categories: ['Pre-Benjamin (Esquirol)', 'Aleví (U12) - Autonómic', 'Sub-15 (U15)', 'Sub-18 (U18)', 'Sub-21 (U21)', 'Senior', '50+',],
    estils: ['Recorbat', 'Compost', 'Nu', 'Longbow', 'Tradicional'],
    lligues: [
      {
        nom: 'Lliga Catalana Aire Lliure 2026',
        tipus: 'al',
        temporada: '2026',
        tirades: [
          { num: '1ª', compId: 13, ianseo2: 27064 },
          { num: '2ª', compId: 11, ianseo2: 27634 },
          { num: '3ª', compId: 1, ianseo2: 28417 },
        ],
        ranquingUrl: 'docs/Ranquing_Lliga_AL_2025-26.pdf',
        ranquingLabel: 'Classificació Final Lliga AL 2025/26',
        historics: [
          { label: 'Classificació Final AL 2025/26', url: 'docs/Ranquing_Lliga_AL_2025-26.pdf' },
          { label: 'Classificació Final AL 2025',    url: 'docs/Ranquing_Lliga_AL_2025.pdf' },
          { label: 'Classificació Final AL 2024',    url: 'docs/Ranquing_Lliga_AL_2024.pdf' },
          { label: 'Classificació Final AL 2023',    url: 'docs/Ranquing_Lliga_AL_2023.pdf' },
        ],
      },
    ],
    campionats: [
      { nom: '76è Campionat de Catalunya d\'Aire Lliure', data: '4-5 jul 2026', lloc: 'Barcelona', status: 'closed', resultatUrl: 'https://www.ianseo.net/Details.php?toId=29041' },
      { nom: 'Campionat de Catalunya Universitari',    data: '28 mar 2026', lloc: 'Tarragona',           status: 'closed', resultatUrl: 'https://www.ianseo.net/Details.php?toId=27386' },
    ],
    records: [
      // AIRE LLIURE – Arc Recorbat (Round 720 · 72 fletxes) · Act. juny 2026
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sènior Dona',  marca:'674 pts', atleta:'Elia Canales Martin',        any:'2019' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sènior Home',  marca:'679 pts', atleta:'Miquel Àngel Pifarré',       any:'2019' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-21 Dona',  marca:'674 pts', atleta:'Elia Canales Martin',        any:'2019' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-21 Home',  marca:'655 pts', atleta:'Arnau Peña Cervelló',        any:'2018' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-18 Dona',  marca:'665 pts', atleta:'Elia Canales Martin',        any:'2018' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-18 Home',  marca:'667 pts', atleta:'Álvaro Salmerón González',   any:'2010' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-15 Dona',  marca:'672 pts', atleta:'Lucía Ramos Valiente',       any:'2019' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'Sub-15 Home',  marca:'658 pts', atleta:'Guillem Vizcaino Culí',       any:'2026' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'+50 Home',     marca:'629 pts', atleta:'Manuel Hernández Higuera',   any:'2023' },
      { disc:'Aire Lliure', estil:'Recorbat', cat:'+50 Dona',     marca:'517 pts', atleta:'Montserrat Gustems Martínez',any:'2026' },
      // AIRE LLIURE – Arc Compost (Round 720 · 72 fletxes) · Act. juny 2026
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sènior Dona',  marca:'684 pts', atleta:'Lucia Rodríguez Coutado',    any:'2021' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sènior Home',  marca:'705 pts', atleta:'César Gómez Serra',          any:'2016' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sub-21 Dona',  marca:'618 pts', atleta:'Naila Alilouch Tayar',       any:'2026' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sub-21 Home',  marca:'687 pts', atleta:'Jordi Ricart Roig',          any:'2022' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sub-18 Dona',  marca:'622 pts', atleta:'Núria Sinfreu Abad',         any:'2021' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'Sub-18 Home',  marca:'623 pts', atleta:'Santiago López Padilla',     any:'2014' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'+50 Home',     marca:'673 pts', atleta:'Rafael Lijarcio Vergara',    any:'2013' },
      { disc:'Aire Lliure', estil:'Compost',  cat:'+50 Dona',     marca:'676 pts', atleta:'Elena García Muñoz',         any:'2012' },
    ],
    resultatExtern: 'https://ianseo.net',
    circularsCategoria: 'al',
  },

  sala: {
    nom: 'Sala',
    subtitol: '',
    icon: '🎯',
    color: '#5c35a0',
    descripcio: 'El tir de sala és la temporada interior del tir amb arc (tardor-hivern), que es disputa en pavelló cobert a 18 metres de distància. És la disciplina amb el calendari més intens: lliga catalana, campionats autonòmics, estatals i internacionals es concentren entre octubre i abril.\n\nTothom tira a 18 m, però les dianes varien: 40 cm per a arc recorbat i compost, i 60 cm per a arc nu, longbow i tradicional. La competició consta d\'una fase de classificació (60 fletxes) seguida d\'eliminatòries individuals i per equips en format set system.',
    normativa: [
      { label: 'Format Competicions Sala 2026/27', url: 'docs/2026060812193414-CIRC_2634_Format_competicions_Sala_2026_27.pdf' },
    ],
    categories: ['Pre-Benjamin (Esquirol)', 'Aleví (U12) - Autonómic', 'Sub-15 (U15)', 'Sub-18 (U18)', 'Sub-21 (U21)', 'Senior', '50+',],
    estils: ['Recorbat', 'Compost', 'Nu', 'Longbow', 'Tradicional'],
    lligues: [
      {
        nom: 'Lliga Catalana de Sala 2025/2026',
        tipus: 'sala',
        temporada: '2025–26',
        tirades: [
          { num: '1ª', data: '4–5 oct 2025',  lloc: 'Constantí',              status: 'closed', circ: '#', ianseo: '24680' },
          { num: '2ª', data: '18–19 oct 2025', lloc: 'Constantí / Torrefarrera', status: 'closed', circ: '#', ianseo: '24861', ianseo2: '24860' },
          { num: '3ª', data: '15–16 nov 2025', lloc: 'Manresa / Torrefarrera', status: 'closed', circ: '#', ianseo: '25272', ianseo2: '25273' },
          { num: '4ª', data: '6–7 des 2025',  lloc: 'Constantí',              status: 'closed', circ: '#', ianseo: '25582' },
        ],
        ranquingUrl: 'docs/LLIGA_CAT_SALA_25_26_CLASSIFICACIO_FINAL.pdf',
        ranquingLabel: 'Classificació Final Lliga Sala 2025/26',
        historics: [
          { label: 'Classificació Final Sala 2025/26', url: 'docs/LLIGA_CAT_SALA_25_26_CLASSIFICACIO_FINAL.pdf' },
          { label: 'Màster Indoor 2025',               url: 'docs/Ranquing_Master_Indoor_2025.pdf' },
          { label: 'Classificació Final Sala 2024/25', url: 'docs/Ranquing_Lliga_Sala_2024-25.pdf' },
          { label: 'Classificació Final Sala 2023/24', url: 'docs/Ranquing_Lliga_Sala_2023-24.pdf' },
        ],
      },
    ],
    campionats: [
      { nom: '58è Campionat de Catalunya de Sala', data: '31 gen 2026', lloc: 'Manresa / Constantí', status: 'closed', resultatUrl: 'https://www.ianseo.net/Details.php?toId=26399' },
    ],
    records: [
      // SALA – Arc Recorbat (18m · 60 fletxes) · Act. juny 2026
      { disc:'Sala', estil:'Recorbat', cat:'Sènior Dona',  marca:'585 pts', atleta:'Elia Canales Martin',        any:'2022' },
      { disc:'Sala', estil:'Recorbat', cat:'Sènior Home',  marca:'589 pts', atleta:'Arnau Peña Cervelló',        any:'2019' },
      { disc:'Sala', estil:'Recorbat', cat:'Sub-21 Dona',  marca:'583 pts', atleta:'Elia Canales Martin',        any:'2019' },
      { disc:'Sala', estil:'Recorbat', cat:'Sub-21 Home',  marca:'582 pts', atleta:'Arnau Peña Cervelló',        any:'2017' },
      { disc:'Sala', estil:'Recorbat', cat:'Sub-18 Dona',  marca:'580 pts', atleta:'Lucía Ramos Valiente',       any:'2022' },
      { disc:'Sala', estil:'Recorbat', cat:'Sub-18 Home',  marca:'569 pts', atleta:'Álvaro Salmerón',            any:'2009' },
      { disc:'Sala', estil:'Recorbat', cat:'+50 Home',     marca:'562 pts', atleta:'Luis Miguel Ramos Calleja',  any:'2019' },
      { disc:'Sala', estil:'Recorbat', cat:'+50 Dona',     marca:'511 pts', atleta:'Begoña Pérez Gómez',         any:'2026' },
      // SALA – Arc Compost (18m · 60 fletxes) · Act. juny 2026
      { disc:'Sala', estil:'Compost',  cat:'Sènior Dona',  marca:'580 pts', atleta:'Maria Pitarch Laguna',       any:'2024' },
      { disc:'Sala', estil:'Compost',  cat:'Sènior Home',  marca:'590 pts', atleta:'César Gómez',                any:'2008' },
      { disc:'Sala', estil:'Compost',  cat:'Sub-21 Dona',  marca:'558 pts', atleta:'Núria Sinfreu Abad',         any:'2025' },
      { disc:'Sala', estil:'Compost',  cat:'Sub-21 Home',  marca:'574 pts', atleta:'Edgar Brocal',               any:'2010' },
      { disc:'Sala', estil:'Compost',  cat:'Sub-18 Dona',  marca:'544 pts', atleta:'Núria Sinfreu Abad',         any:'2021' },
      { disc:'Sala', estil:'Compost',  cat:'Sub-18 Home',  marca:'572 pts', atleta:'Santiago López Padilla',     any:'2014' },
      { disc:'Sala', estil:'Compost',  cat:'+50 Dona',     marca:'567 pts', atleta:'Ester Semis Astier',         any:'2023' },
      { disc:'Sala', estil:'Compost',  cat:'+50 Home',     marca:'582 pts', atleta:'Basili García',              any:'2017' },
      // SALA – Arc Nu · Act. juny 2026
      { disc:'Sala', estil:'Nu',   cat:'Sènior Dona',  marca:'528 pts', atleta:'Carme Sanchez Amado',        any:'2023' },
      { disc:'Sala', estil:'Nu',   cat:'Sènior Home',  marca:'552 pts', atleta:'David García Fernández',     any:'2021' },
      // SALA – Tradicional · Act. juny 2026
      { disc:'Sala', estil:'Tradicional', cat:'Sènior Dona', marca:'563 pts', atleta:'Ana Lorente Molero',       any:'2025' },
      { disc:'Sala', estil:'Tradicional', cat:'Sènior Home', marca:'586 pts', atleta:'Juanjo Querol Guardiola',  any:'2021' },
    ],
    resultatExtern: 'https://ianseo.net',
    circularsCategoria: 'al',
  },

  '3d': {
    nom: 'Tir 3D',
    subtitol: '',
    icon: '🌲',
    color: '#2e7d32',
    descripcio: 'El tir 3D és la modalitat més immersiva del tir amb arc: es practica en circuits forestals o en modalitat en linea, on les figures volumètriques estan situades en entorns naturals amb vegetació, irregularitats del terreny i jocs de llum. La clau d\'aquesta disciplina és l\'estimació de la distància —mai no es diu d\'on es tira fins que ets a la balisa— combinada amb la tècnica de tir.\n\nEs dispara a figures sintètics en 3D. Cada diana té zones de puntuació: 11, 10, 8 i 5. El circuit sol tenir 24 dianes; l\'arquer fa tot el recorregut en grup. Les distàncies màximes varien per divisió de l\'arc i classe, però mai superen els 45 m (compost).',
    normativa: [
      { label: 'Format Competicions 3D 2026/27', url: 'docs/2026060812201377-CIRC_2635_Format_competicions_3D_2026_27.pdf' },
    ],
    categories: ['Sub-15 (U15)', 'Sub-18 (U18)', 'Sub-21 (U21)', 'Senior', '50+'],
    estils: ['Compost', 'Nu', 'Longbow', 'Tradicional'],
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
    nom: 'Camp',
    subtitol: '',
    icon: '🍁',
    color: '#5d4037',
    descripcio: 'El tir de camp (WA Field) és una disciplina que combina la natura amb la tècnica: els arquers recorren un circuit de 24 dianes de paper situades en terreny accidentat, amunt i avall de pendents, entre arbres i amb angles de tir variats. Les propostes de tir poden ser desconegudes (distància no informada) i conegudes (distàncies marcades).\n\nLes dianes de camp utilitzen el sistema de puntuació WA: cara de diana circular amb zones de 6-5-4-3-2-1 punts. La distància màxima depèn de la divisió i la classe: el recorbat i compost sènior tira fins a 60 m en marc conegut (50 m en desconegut); els longbow senior fins a 40 m (veure reglamentació per més detalls).',
    normativa: [
      { label: 'Format Competicions Camp 2026/27', url: 'docs/2026060812213726-CIRC_2636_Format_competicions_Camp_2026_27.pdf' },
    ],
    categories: ['Sub-15 (U15)', 'Sub-18 (U18)', 'Sub-21 (U21)', 'Senior', '50+'],
    estils: ['Recorbat', 'Compost', 'Nu', 'Longbow', 'Tradicional'],
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

  run: {
    nom: 'Run Archery',
    subtitol: 'Comitè Català de Run Archery',
    icon: '🏃',
    color: '#e65100',
    descripcio: 'El Run Archery combina la carrera a peu amb el tir amb arc en un format de competició dinàmic i espectacular. Els participants altern en trams de carrera amb estacions de tir on han d\'encertar dianes, penalitzant els impactes fallits amb metres addicionals de carrera.\n\nEl circuit pot ser de tipus sprint (300–500 m amb 4 dianes) o de persecució. S\'utilitzen arcs recurved o compost, i les dianes es troben a distàncies variables. La disciplina combina resistència física, control de la pulsació i precisió de tir, sent una de les modalitats de més ràpid creixement a nivell europeu.',
    normativa: [],
    categories: ['Sub-18 (U18)', 'Sub-21 (U21)', 'Senior', '50+'],
    estils: ['Recorbat', 'Compost'],
    lligues: [],
    campionats: [],
    records: [],
    resultatExtern: '#',
    circularsCategoria: 'al',
  },

  aa: {
    nom: 'Arc Adaptat',
    subtitol: 'Comitè Català d\'Arc Adaptat',
    icon: '♿',
    color: '#00838f',
    descripcio: 'L\'arc adaptat (tir amb arc paralímpic) és la modalitat inclusiva del tir amb arc, reconeguda per World Archery i present als Jocs Paralímpics des de 1960. A Catalunya hi ha clubs actius i una lliga catalana que es consolida any rere any.\n\nLes categories paralímpiques principals són: W1 (cadira de rodes amb afectació als membres superiors), W2 (cadira de rodes sense restriccions en els membres superiors), i VISRR / VISST per a esportistes amb discapacitat visual. Competeixen en arc recorbat i compost, disparant a 70 m (exterior) o 18 m (sala).',
    normativa: [],
    categories: ['W1', 'W2', 'VISRR', 'VISST', 'Open'],
    estils: ['Recorbat', 'Compost'],
    lligues: [
      {
        nom: 'Lliga Catalana Arc Adaptat 2025/2026',
        tipus: 'al',
        temporada: '2025–26',
        tirades: [
          { num: '1ª', data: 'nov 2025', lloc: 'Olesa de Montserrat', status: 'closed', circ: '#' },
          { num: '2ª', data: 'feb 2026', lloc: 'Pendent',             status: 'closed', circ: '#' },
          { num: '3ª', data: 'abr 2026', lloc: 'Olesa de Montserrat', status: 'closed', circ: '#' },
          { num: 'Final', data: 'jun 2026', lloc: 'Arc Vng',          status: 'closed', circ: '#' },
        ],
        ranquingUrl: '#',
        ranquingLabel: 'Classificació Final 2025/26',
        historics: [],
      },
    ],
    campionats: [],
    records: [],
    resultatExtern: '#',
    circularsCategoria: 'al',
  },

  kyudo: {
    nom: 'Kyudo',
    subtitol: 'Comitè Català de Kyudo',
    icon: '🎌',
    color: '#880e4f',
    descripcio: 'El Kyudo (弓道, "camí de l\'arc") és l\'art marcial japonès del tir amb arc, una pràctica que va molt més enllà de la precisió tècnica: és un camí de perfeccionament personal que integra cos, ment i esperit. El kyudoka (practicant) utilitza el yumi, un arc asimètric de bambú d\'uns 2,2 m d\'alçada, i les ya, fletxes tradicionals de bambú.\n\nA diferència del tir esportiu occidental, al Kyudo no s\'utilitzen assistències mecàniques. El tir es realitza en dues modalitats: sha-teki (28 m sobre una diana de paper de 36 cm, el mato) i enteki (60 m sobre una diana de 79 cm). La forma (kata) és tan important com l\'impacte: la seqüència dels huit moviments (hassetsu) ha de ser executada amb control, concentració i serenitat. Al Japó el Kyudo és una de les arts marcials més practicades.',
    normativa: [],
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
function setDisciplina(key, _noHash) {
  _discActiva = key;
  _discTab = 'info';
  setS('disciplina', _noHash);
  if (!_noHash) _discUpdateHash();
  renderDisciplina();
}

function _discUpdateHash() {
  var h = 'disciplina/' + _discActiva + '/' + _discTab;
  try { history.replaceState(null, '', '#' + h); } catch(e) {}
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
    var hideRecords = (_discActiva === '3d' || _discActiva === 'camp' || _discActiva === 'run' || _discActiva === 'aa');
    recordsTab.style.display = hideRecords ? 'none' : '';
    if (hideRecords && _discTab === 'records') _discTab = 'info';
  }
  var activeTab = document.querySelector('#discTabs [data-tab="' + _discTab + '"]');
  if (activeTab) activeTab.classList.add('act');

  // Color accent
  document.documentElement.style.setProperty('--disc-color', d.color);

  renderDiscTab(_discTab);
}

function setDiscTab(tab, btn, _noHash) {
  _discTab = tab;
  document.querySelectorAll('#discTabs .disc-tab').forEach(function(b){ b.classList.remove('act'); });
  if (btn) btn.classList.add('act');
  if (!_noHash) _discUpdateHash();
  renderDiscTab(tab);
}

// Drecera des de la nota de reglaments cap a la pestanya Documents
function goToDiscDocs() {
  setDiscTab('docs', document.querySelector('#discTabs [data-tab=\'docs\']'));
}

function renderDiscTab(tab) {
  var d = DISC_DATA[_discActiva];
  var content = document.getElementById('discContent');
  if (!d || !content) return;

  switch(tab) {
    case 'info':     content.innerHTML = renderDiscInfo(d);        break;
    case 'lliga':    content.innerHTML = renderDiscLliga(_discActiva); break;
    case 'resultats':content.innerHTML = renderDiscResultats(d);   break;
    case 'records':  content.innerHTML = renderDiscRecordsFromDB(_discActiva); break;
    case 'docs':     content.innerHTML = renderDiscDocs(d);        break;
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

  // Normativa
  if (d.normativa && d.normativa.length) {
    html += '<div class="disc-card"><h3>📐 Normativa de competició</h3>'
      + '<p style="font-size:.85rem;color:var(--gray);margin-bottom:.9rem">Consulteu la circular oficial per al format, categories, distàncies i procediments de sol·licitud d\'organització.</p>'
      + '<div style="display:flex;flex-wrap:wrap;gap:.5rem">';
    d.normativa.forEach(function(n) {
      html += '<a href="' + escHtml(n.url) + '" target="_blank" rel="noopener" class="bsm bsm-n">⬇ ' + escHtml(n.label) + '</a>';
    });
    html += '</div></div>';
  }

  // Categories
  if (d.categories && d.categories.length) {
    html += '<div class="disc-card"><h3>🏅 Edats</h3><ul class="disc-tags">';
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
    + '<button' + dataAttr('onclick','goToDiscDocs',[]) + ' '
    + 'style="background:none;border:none;padding:0;font-weight:700;color:var(--navy-light);cursor:pointer;font-family:inherit;font-size:inherit;text-decoration:underline">📄 Documents →</button>'
    + '</div>';

  html += '</div>';
  return html;
}

// Valor cronològic d'una temporada ('2026' / '2026/27' / '2025–26'…):
// s'agafa l'any final de la temporada perquè "2026/27" quedi després de "2026".
function _llTemporadaVal(temp) {
  var parts = String(temp || '').split(/[\/\-–]/);
  var last  = parts[parts.length - 1].trim();
  var year  = parseInt(last, 10);
  if (isNaN(year)) return 0;
  return year < 100 ? year + 2000 : year;
}

function renderDiscLliga(discKey) {
  var lligues = (DB.lligues || [])
    .filter(function(l){ return l.disc === discKey; })
    .slice()
    .sort(function(a, b){ return _llTemporadaVal(b.temporada) - _llTemporadaVal(a.temporada); });
  if (!lligues.length) {
    return '<div class="disc-empty">No hi ha dades de lliga per a aquesta disciplina.</div>';
  }

  var html = '';
  lligues.forEach(function(ll) {
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
      var insc    = comp ? comp.inscripcio : (t.inscripcio || '');
      var ianseo  = comp ? comp.ianseo : (t.ianseo || '');
      var ianseo2 = t.ianseo2 || '';

      var cls   = status === 'open' ? 'disc-tirada--open' : (status === 'soon' ? 'disc-tirada--soon' : 'disc-tirada--closed');
      var badge = status === 'open' ? '🟢 Oberta' : (status === 'soon' ? '🟡 Pròximament' : '✅ Finalitzada');

      // Botons d'acció (iguals que a renderComp)
      var acts = '';
      if (status === 'open') {
        if (insc && insc !== '#') {
          acts += '<a class="bsm bsm-o" href="' + insc + '" target="_blank">📝 Inscriu-te</a>';
        }
        if (url && url !== '#' && url.indexOf('#news:') !== 0) {
          acts += '<a class="bsm ' + (insc && insc !== '#' ? 'bsm-n' : 'bsm-o') + '" href="' + url + '" target="_blank">📄 Més info</a>';
        }
      } else if (status === 'closed') {
        if (url && url.indexOf('#news:') === 0) {
          var nid = parseInt(url.replace('#news:', ''));
          acts += '<button class="bsm bsm-o"' + dataAttr('onclick','openNews',[nid]) + '>📰 Notícia</button>';
        } else if (url && url !== '#') {
          acts += '<a class="bsm bsm-o" href="' + url + '" target="_blank">📊 Resultats</a>';
        }
        if (ianseo) {
          acts += '<a class="bsm bsm-n" href="https://www.ianseo.net/Details.php?toId=' + ianseo + '" target="_blank">📈 Ianseo</a>';
        }
        if (ianseo2) {
          acts += '<a class="bsm bsm-n" href="https://www.ianseo.net/Details.php?toId=' + ianseo2 + '" target="_blank">📈 Ianseo 2</a>';
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
  var html = '';

  // Vista campionats
  html += '<h3 class="disc-section-title">Campionats</h3><div class="disc-camp-grid">';

  if (d.campionats && d.campionats.length) {
    d.campionats.forEach(function(c) {
      var clsBorder = c.status === 'closed' ? 'border-left:4px solid #aaa' : 'border-left:4px solid var(--disc-color,#1a6fb5)';
      var btnHtml = '';
      if (c.resultatUrl && c.resultatUrl !== '#') {
        if (c.resultatUrl.startsWith('#news:')) {
          var nid = parseInt(c.resultatUrl.replace('#news:',''));
          btnHtml = '<button class="disc-btn-sm"' + dataAttr('onclick','openNews',[nid]) + '>📰 Veure notícia →</button>';
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
    + '<button class="disc-btn-sm" style="font-size:.85rem;padding:.5rem 1rem"' + dataAttr('onclick','openRecordForm',[]) + '>'
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
  var relCirc = (DB.circulars || []).filter(function(c){ return c.type === d.circularsCategoria && circIsPublished(c); });
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

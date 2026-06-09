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
      // SALA – Arc Recorbat (18m · 60 fletxes) · Act. juny 2026
      { disc:'Sala',        estil:'Recorbat', cat:'Sènior Dona',  marca:'585 pts', atleta:'Elia Canales Martin',        any:'2022' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sènior Home',  marca:'589 pts', atleta:'Arnau Peña Cervelló',        any:'2019' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sub-21 Dona',  marca:'583 pts', atleta:'Elia Canales Martin',        any:'2019' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sub-21 Home',  marca:'582 pts', atleta:'Arnau Peña Cervelló',        any:'2017' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sub-18 Dona',  marca:'580 pts', atleta:'Lucía Ramos Valiente',       any:'2022' },
      { disc:'Sala',        estil:'Recorbat', cat:'Sub-18 Home',  marca:'569 pts', atleta:'Álvaro Salmerón',            any:'2009' },
      { disc:'Sala',        estil:'Recorbat', cat:'+50 Home',     marca:'562 pts', atleta:'Luis Miguel Ramos Calleja',  any:'2019' },
      { disc:'Sala',        estil:'Recorbat', cat:'+50 Dona',     marca:'511 pts', atleta:'Begoña Pérez Gómez',        any:'2026' },
      // SALA – Arc Compost (18m · 60 fletxes) · Act. juny 2026
      { disc:'Sala',        estil:'Compost',  cat:'Sènior Dona',  marca:'580 pts', atleta:'Maria Pitarch Laguna',       any:'2024' },
      { disc:'Sala',        estil:'Compost',  cat:'Sènior Home',  marca:'590 pts', atleta:'César Gómez',                any:'2008' },
      { disc:'Sala',        estil:'Compost',  cat:'Sub-21 Dona',  marca:'558 pts', atleta:'Núria Sinfreu Abad',         any:'2025' },
      { disc:'Sala',        estil:'Compost',  cat:'Sub-21 Home',  marca:'574 pts', atleta:'Edgar Brocal',               any:'2010' },
      { disc:'Sala',        estil:'Compost',  cat:'Sub-18 Dona',  marca:'544 pts', atleta:'Núria Sinfreu Abad',         any:'2021' },
      { disc:'Sala',        estil:'Compost',  cat:'Sub-18 Home',  marca:'572 pts', atleta:'Santiago López Padilla',     any:'2014' },
      { disc:'Sala',        estil:'Compost',  cat:'+50 Dona',     marca:'567 pts', atleta:'Ester Semis Astier',         any:'2023' },
      { disc:'Sala',        estil:'Compost',  cat:'+50 Home',     marca:'582 pts', atleta:'Basili García',              any:'2017' },
      // SALA – Arc Nu · Act. juny 2026
      { disc:'Sala',        estil:'Arc Nu',   cat:'Sènior Dona',  marca:'528 pts', atleta:'Carme Sanchez Amado',        any:'2023' },
      { disc:'Sala',        estil:'Arc Nu',   cat:'Sènior Home',  marca:'552 pts', atleta:'David García Fernández',     any:'2021' },
      // SALA – Tradicional · Act. juny 2026
      { disc:'Sala',        estil:'Tradicional', cat:'Sènior Dona', marca:'563 pts', atleta:'Ana Lorente Molero',       any:'2025' },
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

// ── Medaller Campionats Catalunya 2025-26 ─────────────────
var MEDALS_2526 = {

  sala: {
    nom: '58è Campionat de Catalunya de Sala',
    data: '31 gen – 1 feb 2026',
    lloc: 'Manresa / Constantí',
    resultats: [
      // Recorbat / Compost (26399)
      { cat:'Sènior', div:'Recorbat',    sex:'H', or:['Ruhollah Erfan Ribas Malekzadeh','Escola Arquers de Barcelona'], argent:['Raül Quiles García','Arquers Sant Cugat'],           bronze:['David Bonnin Vasquez','Arc Montjuïc'] },
      { cat:'Sènior', div:'Recorbat',    sex:'D', or:['Núria Barberà López','Arquers Castelldefels'],                    argent:['Marie Martin','Tir Arc Olesa'],                      bronze:['María Luisa García Castellanos','Club Arquers Viladecans'] },
      { cat:'Sènior', div:'Compost',     sex:'H', or:['Jose Pérez Pérez','Arc Montjuïc'],                               argent:['Antonio Alvarez Fernandez','T.A. Caldes de Montbui'], bronze:['Jose Miguel Moreno Villafranca','C.A. Cerdanyola del Vallès'] },
      { cat:'Sènior', div:'Compost',     sex:'D', or:['Lucia Rodriguez Coutado','T.A. La Conxorxa'],                    argent:['Alexandra Moura Ribeiro','Draco Sagittariis'],        bronze:['Sara Martos Calderón','T.A. Caldes de Montbui'] },
      { cat:'Sub-18', div:'Recorbat',    sex:'D', or:['Edurne Martinez Perez','Club Tau T.A.'],                         argent:['Marta Serra Serrano','Club Tau T.A.'],               bronze:['Maelyn Macías Martin','Tir Arc Olesa'] },
      { cat:'Sub-18', div:'Recorbat',    sex:'H', or:['Josep Español Franques','Arquers Cambrils'],                     argent:['Guilhem Alegre','Arc Montjuïc'],                     bronze:['Dídac Perez Bonavila','Tir Arc Olesa'] },
      { cat:'Sub-21', div:'Recorbat',    sex:'D', or:['Yanay Moli Astudillo','T.A. Costa Daurada'],                     argent:['Jana Cahué Comas','Draco Sagittariis'],              bronze:['Lucia Quiles Perez','Arquers Sant Cugat'] },
      { cat:'Sub-21', div:'Recorbat',    sex:'H', or:['Denis Carnicero Huerta','T.A. Amposta'],                         argent:['Jordi Brau Villalón','C.A. Cerdanyola del Vallès'],  bronze:['Roc Rueda Domenech','Draco Sagittariis'] },
      { cat:'Sub-21', div:'Compost',     sex:'H', or:['Arnau Barbero Diaz','T.A. Rubí'],                                argent:['Pau Alvarez Babio','T.A. Rubí'],                     bronze:['Patrick Martisella Sió','Draco Sagittariis'] },
      { cat:'50+',    div:'Recorbat',    sex:'D', or:['Laura M. Suarez Garrote','Club Tau T.A.'],                       argent:['Begoña Perez Gomez','Club Tau T.A.'],                bronze:['Montserrat Gustems Martínez','Arc Montjuïc'] },
      { cat:'50+',    div:'Recorbat',    sex:'H', or:['David Catalan Ramon','Club Tau T.A.'],                           argent:['Miguel Marti Val','T.A. L\'Hospitalet'],             bronze:['Fernando Cañada Romero','Arquers Cambrils'] },
      { cat:'50+',    div:'Compost',     sex:'H', or:['Jordi Tarragó Martí','T.A. Pardinyes'],                          argent:['Francesc Castillo Torres','Tir Arc Olesa'],          bronze:['Raul Alcocer Bernardino','C.A. Cerdanyola del Vallès'] },
      // Arc Nu / Longbow / Tradicional (26400)
      { cat:'Sènior', div:'Arc Nu',      sex:'H', or:['David Rafael Cardozo Ferreira','T.A. Les Franqueses'],           argent:['Victor Lopez Rodriguez','T.A. Les Franqueses'],      bronze:['Carles Peña Costa','Arquers Castelldefels'] },
      { cat:'Sènior', div:'Arc Nu',      sex:'D', or:['Maria Eugenia Palomar Gutierrez','Arquers Terrassa'],            argent:['Ginevra Marina Lazzerini','T.A. Manresa'],           bronze:['Oyuna Baturova Tsinguyeva','Arquers Terrassa'] },
      { cat:'50+',    div:'Arc Nu',      sex:'H', or:['Miguel Ramirez Moreno','T.A. Les Franqueses'],                   argent:['Ricardo Dominguez Escrihuela','C.A. Cerdanyola del Vallès'], bronze:['Paco Sierra Jimenez','T.A. Les Franqueses'] },
      { cat:'50+',    div:'Arc Nu',      sex:'D', or:['Laura Dorado Escalera','T.A. Les Franqueses'],                   argent:['Montse Vila Fortuny','T.A. Les Franqueses'],         bronze:['Rosa Maria Abad Pérez','Arquers Terrassa'] },
      { cat:'Sènior', div:'Longbow',   sex:'H', or:['Adria Pla Casellas','Arc Montjuïc'],                             argent:['Juan Jose Ruiz Cabeza','Club Català T.A.'],           bronze:['Antonio Garcia Martin','T.A. Manresa'] },
      { cat:'Sènior', div:'Longbow',   sex:'D', or:['Mireia Comas Franch','Draco Sagittariis'],                       argent:['Rosa Martinez Ochoa','T.A. Les Franqueses'],         bronze:['Tania Martinez Bazan','Club Català T.A.'] },
      { cat:'50+',    div:'Longbow',   sex:'H', or:['Isidro Moyano García','T.A. Zen del Bages'],                     argent:['Felip Diaz Sanchez','Arquers del Moianès'],          bronze:['Toni Barnils Sola','T.A. Les Franqueses'] },
      { cat:'Sènior', div:'Tradicional', sex:'H', or:['Juanjo Querol Guardiola','T.A. Sant Andreu de la Barca'],        argent:['Edgar Lorenzo Barriendos','T.A. Sant Andreu de la Barca'], bronze:['Albert Borràs Andújar','Arquers Terrassa'] },
      { cat:'Sènior', div:'Tradicional', sex:'D', or:['Ana Lorente Molero','T.A. Les Franqueses'],                      argent:['Mªisabel Mompeán Gimenez','T.A. Caldes de Montbui'], bronze:['Carmen Sarceda Rodriguez','Arc Montjuïc'] },
      { cat:'50+',    div:'Tradicional', sex:'H', or:['Enric Diaz Soler','T.A. Les Franqueses'],                        argent:['David López Abad','Tir Arc Olesa'],                  bronze:['Jorge Rueda Castro','Arquers Terrassa'] },
      { cat:'50+',    div:'Tradicional', sex:'D', or:['Cristina Plaza i Cervera','C.E. Molins de Rei'],                 argent:null, bronze:null },
      { cat:'Sub-21', div:'Arc Nu',      sex:'H', or:['Albert Gil Serra','Arquers Terrassa'],                           argent:null, bronze:null },
    ]
  },

  '3d': [
    {
      nom: '30è Campionat de Catalunya 3D',
      data: '17 mai 2026',
      lloc: 'Montcada i Reixac',
      resultats: [
        { cat:'Sènior', div:'Arc Nu',      sex:'H', or:['David Vivo Ballarin','Club Català T.A.'],        argent:['Juan Pedro Serrano Manzano','T.A. L\'Hospitalet'],  bronze:['Carles Sabates Torres','T.A. Rubí'] },
        { cat:'Sènior', div:'Arc Nu',      sex:'D', or:['Marta Gimeno Bonells','T.A. L\'Hospitalet'],     argent:['Casandra Campo Tellez','T.A. Rubí'],                bronze:['Olga Moya Bonilla','Club Català T.A.'] },
        { cat:'Sènior', div:'Longbow',   sex:'H', or:['David Alejo Miñarro','T.A. Rubí'],               argent:['Jose Manuel Martí Martínez','Club Català T.A.'],    bronze:['Antoni Mercadal Oliver','T.A. Zen del Bages'] },
        { cat:'Sènior', div:'Longbow',   sex:'D', or:['Marta Gelpi Camallonga','Club Català T.A.'],     argent:['Tania Martinez Bazan','Club Català T.A.'],          bronze:['Mireia Comas Franch','Draco Sagittariis'] },
        { cat:'Sènior', div:'Tradicional', sex:'H', or:['Victor Lopez Rodriguez','T.A. Les Franqueses'],  argent:['Albert Torres Martínez','T.A. Caldes de Montbui'],  bronze:['Carlos Carcamo Canuto','T.A. Les Franqueses'] },
        { cat:'Sènior', div:'Tradicional', sex:'D', or:['Mªisabel Mompeán Gimenez','T.A. Caldes de Montbui'], argent:['Maite Suarez González','T.A. Rubí'],            bronze:['Eva Mª Piquer Schkot','Club Català T.A.'] },
        { cat:'Sènior', div:'Compost',     sex:'H', or:['Javier Menchon Martinez','T.A. Caldes de Montbui'], argent:['André Sousa','T.A. Rubí'],                       bronze:['Françesc Josep Marquez Parareda','T.A. Mollet'] },
        { cat:'Sènior', div:'Compost',     sex:'D', or:['Maria Pitarch Laguna','T.A. Caldes de Montbui'], argent:null, bronze:null },
        { cat:'Sub-21', div:'Arc Nu',      sex:'H', or:['Sergio Ortega Masó','T.A. Figueres'],            argent:null, bronze:null },
        { cat:'Sub-15', div:'Tradicional', sex:'H', or:['Dídac Porta Valldosera','Arquers d\'Oliana'],    argent:['Mario Rodriguez Muñoz','T.A. Sant Andreu de la Barca'], bronze:['Genís Masdeu Ricart','Arquers del Vallès Fosc'] },
        { cat:'Sub-15', div:'Tradicional', sex:'D', or:['Anna Tàcies Gallardo','T.A. Les Franqueses'],    argent:null, bronze:null },
      ]
    },
    {
      nom: '1r Campionat de Catalunya 3D en Línia',
      data: '2025-26',
      lloc: 'Catalunya',
      resultats: [
        { cat:'Sènior', div:'Compost',     sex:'H', or:['Javier Menchon Martinez','T.A. Caldes de Montbui'],    argent:['Miguel Angel Perez Diaz','T.A. Figueres'],          bronze:['Bartolome Jimenez Mejias','T.A. Caldes de Montbui'] },
        { cat:'Sènior', div:'Arc Nu',      sex:'H', or:['David Vivo Ballarin','T.A. Caldes de Montbui'],        argent:['David Rafael Cardozo Ferreira','T.A. Les Franqueses'], bronze:['Sergio Ortega González','T.A. Figueres'] },
        { cat:'Sènior', div:'Arc Nu',      sex:'D', or:['Marta Gimeno Bonells','T.A. L\'Hospitalet'],           argent:['Irma Mercedes Galeano Valeriano','Club Català T.A.'], bronze:['Ana Elvira Serrano Garcia','Tir Arc Olesa'] },
        { cat:'Sènior', div:'Longbow',   sex:'H', or:['Isidro Moyano García','T.A. Zen del Bages'],           argent:['Jose Manuel Martí Martínez','Club Català T.A.'],    bronze:['Enrique Flores Delgado','T.A. Rubí'] },
        { cat:'Sènior', div:'Longbow',   sex:'D', or:['Marta Gelpi Camallonga','Club Català T.A.'],           argent:['Mireia Comas Franch','Draco Sagittariis'],          bronze:['Maria José Delgado Falcón','T.A. Les Franqueses'] },
        { cat:'Sènior', div:'Tradicional', sex:'H', or:['Juanjo Querol Guardiola','T.A. Sant Andreu de la Barca'], argent:['Jordi Gomez Rigat','C.A. Cerdanyola del Vallès'], bronze:['Antonio Hita Campillo','T.A. Sant Andreu de la Barca'] },
        { cat:'Sènior', div:'Tradicional', sex:'D', or:['Ana Lorente Molero','T.A. Les Franqueses'],            argent:['Mªisabel Mompeán Gimenez','T.A. Caldes de Montbui'], bronze:['Marta Zamorano Medina','Club Català T.A.'] },
        { cat:'Sub-15', div:'Tradicional', sex:'D', or:['Anna Tàcies Gallardo','T.A. Les Franqueses'],          argent:['Carla Ruiz Lorente','T.A. Les Franqueses'],         bronze:null },
        { cat:'Sub-15', div:'Tradicional', sex:'H', or:['Dídac Porta Valldosera','Arquers d\'Oliana'],          argent:['Otger Montes Barnils','T.A. Les Franqueses'],       bronze:['Mario Rodriguez Muñoz','T.A. Sant Andreu de la Barca'] },
      ]
    }
  ],

  camp: {
    nom: '56è Campionat de Catalunya de Camp',
    data: '10 mai 2026',
    lloc: 'Montcada i Reixac',
    resultats: [
      { cat:'Sènior', div:'Recorbat',    sex:'H', or:['Sergi Cebrian Pujol','Draco Sagittariis'],          argent:['Daniel Muñoz Malagon','Escola Arquers de Barcelona'], bronze:['Ignasi Gallardo Andres','Draco Sagittariis'] },
      { cat:'Sènior', div:'Recorbat',    sex:'D', or:['Jana Cahué Comas','Draco Sagittariis'],              argent:null, bronze:null },
      { cat:'Sènior', div:'Compost',     sex:'H', or:['Felipe Baena Cocera','T.A. Zen del Bages'],         argent:['Bartolome Jimenez Mejias','T.A. Caldes de Montbui'],  bronze:['Javier Menchon Martinez','T.A. Caldes de Montbui'] },
      { cat:'Sènior', div:'Compost',     sex:'D', or:['Alexandra Moura Ribeiro','Draco Sagittariis'],      argent:null, bronze:null },
      { cat:'Sènior', div:'Arc Nu',      sex:'H', or:['David Vivo Ballarin','Club Català T.A.'],           argent:['Oscar Jimenez Muriano','T.A. Sant Andreu de la Barca'], bronze:['Juan Pedro Serrano Manzano','T.A. L\'Hospitalet'] },
      { cat:'Sènior', div:'Arc Nu',      sex:'D', or:['Marta Gimeno Bonells','T.A. L\'Hospitalet'],       argent:null, bronze:null },
      { cat:'Sènior', div:'Longbow',   sex:'H', or:['David Alejo Miñarro','T.A. Rubí'],                  argent:['Marc Coll Bosch','Club Català T.A.'],                  bronze:['Jose Manuel Martí Martínez','Club Català T.A.'] },
      { cat:'Sènior', div:'Longbow',   sex:'D', or:['Mireia Comas Franch','Draco Sagittariis'],          argent:['Marta Gelpi Camallonga','Club Català T.A.'],           bronze:['Carmen del Rosario Mejía Carrión','T.A. Manresa'] },
      { cat:'Sènior', div:'Tradicional', sex:'H', or:['Victor Lopez Rodriguez','T.A. Les Franqueses'],     argent:['Pablo Beceiro Sanmateo','Arquers Sant Cugat'],         bronze:['Sergio Moral Quintana','Club Català T.A.'] },
      { cat:'Sènior', div:'Tradicional', sex:'D', or:['Mªisabel Mompeán Gimenez','T.A. Caldes de Montbui'], argent:null, bronze:null },
    ]
  }
};

// ── Helpers per al medaller ───────────────────────────────
function _getMedals2526(discKey) {
  if (discKey === 'al')   return [MEDALS_2526.sala];
  if (discKey === '3d')   return MEDALS_2526['3d'];
  if (discKey === 'camp') return [MEDALS_2526.camp];
  return null;
}

function _allMedals2526Resultats() {
  var all = [];
  all = all.concat(MEDALS_2526.sala.resultats);
  MEDALS_2526['3d'].forEach(function(c) { all = all.concat(c.resultats); });
  all = all.concat(MEDALS_2526.camp.resultats);
  return all;
}

function _agregaMedaller(resultats) {
  var arquers = {};
  var clubs   = {};

  function add(map, key, medal) {
    if (!key) return;
    if (!map[key]) map[key] = { nom: key, or: 0, argent: 0, bronze: 0 };
    map[key][medal]++;
  }

  resultats.forEach(function(r) {
    [['or', r.or], ['argent', r.argent], ['bronze', r.bronze]].forEach(function(m) {
      if (!m[1]) return;
      add(arquers, m[1][0], m[0]);
      add(clubs,   m[1][1], m[0]);
    });
  });

  function sortOlympic(arr) {
    return arr.sort(function(a, b) {
      if (b.or      !== a.or)      return b.or      - a.or;
      if (b.argent  !== a.argent)  return b.argent  - a.argent;
      return b.bronze - a.bronze;
    });
  }

  return {
    arquers: sortOlympic(Object.keys(arquers).map(function(k) { return arquers[k]; })),
    clubs:   sortOlympic(Object.keys(clubs).map(function(k)   { return clubs[k];   }))
  };
}

function _renderMedallerTable(items, nomLabel) {
  if (!items.length) return '<div class="disc-empty">Sense dades.</div>';
  var html = '<div class="med-table-wrap"><table class="med-table">'
    + '<thead><tr>'
    + '<th class="med-th-rank">#</th>'
    + '<th class="med-th-nom">' + nomLabel + '</th>'
    + '<th class="med-th-medal med-or">🥇</th>'
    + '<th class="med-th-medal med-ar">🥈</th>'
    + '<th class="med-th-medal med-br">🥉</th>'
    + '<th class="med-th-total">Total</th>'
    + '</tr></thead><tbody>';

  var rank = 1;
  var pOr = -1, pAr = -1, pBr = -1;
  items.forEach(function(item, i) {
    if (item.or !== pOr || item.argent !== pAr || item.bronze !== pBr) rank = i + 1;
    pOr = item.or; pAr = item.argent; pBr = item.bronze;
    var rowCls = item.or > 0 ? ' med-row-top' : '';
    html += '<tr class="med-row' + rowCls + '">'
      + '<td class="med-td-rank">' + rank + '</td>'
      + '<td class="med-td-nom">' + escHtml(item.nom) + '</td>'
      + '<td class="med-td-medal med-or">' + (item.or     || '') + '</td>'
      + '<td class="med-td-medal med-ar">' + (item.argent || '') + '</td>'
      + '<td class="med-td-medal med-br">' + (item.bronze || '') + '</td>'
      + '<td class="med-td-total">' + (item.or + item.argent + item.bronze) + '</td>'
      + '</tr>';
  });

  html += '</tbody></table></div>';
  return html;
}

function _renderArquersPerCategoria(campionats) {
  var DIV_ORDER = ['Recorbat','Compost','Arc Nu','Longbow','Tradicional'];
  var CAT_ORDER = ['Sènior','Sub-21','Sub-18','Sub-15','50+','60+'];
  var SEX_LABEL = { H: 'Home', D: 'Dones' };

  var html = '';
  campionats.forEach(function(camp) {
    // Agrupa per divisió
    var byDiv = {};
    camp.resultats.forEach(function(r) {
      if (!byDiv[r.div]) byDiv[r.div] = [];
      byDiv[r.div].push(r);
    });

    html += '<div class="med-camp-bloc">';
    html += '<div class="med-camp-title">📍 ' + escHtml(camp.nom)
      + ' <span class="med-camp-meta">· ' + escHtml(camp.lloc) + ' · ' + escHtml(camp.data) + '</span></div>';

    // Ordena divisions
    var divs = DIV_ORDER.filter(function(d) { return byDiv[d]; });
    // Afegeix divisions no estàndard al final
    Object.keys(byDiv).forEach(function(d) { if (divs.indexOf(d) === -1) divs.push(d); });

    divs.forEach(function(div) {
      var rows = byDiv[div];
      // Ordena per categoria i sexe
      rows.sort(function(a, b) {
        var ci = CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat);
        if (ci !== 0) return ci;
        return (a.sex === 'H' ? 0 : 1) - (b.sex === 'H' ? 0 : 1);
      });

      html += '<div class="med-div-bloc">';
      html += '<div class="med-div-label">' + escHtml(div) + '</div>';
      html += '<div class="med-cat-table-wrap"><table class="med-cat-table">'
        + '<thead><tr>'
        + '<th class="mct-cat">Categoria</th>'
        + '<th class="mct-or">🥇</th>'
        + '<th class="mct-ar">🥈</th>'
        + '<th class="mct-br">🥉</th>'
        + '</tr></thead><tbody>';

      rows.forEach(function(r) {
        var catLabel = r.cat + ' ' + (SEX_LABEL[r.sex] || r.sex);
        html += '<tr>'
          + '<td class="mct-cat"><strong>' + escHtml(catLabel) + '</strong></td>'
          + '<td class="mct-or">' + (r.or     ? '<span class="med-nom-gold">'   + escHtml(r.or[0])     + '</span><span class="med-club-small">' + escHtml(r.or[1])     + '</span>' : '—') + '</td>'
          + '<td class="mct-ar">' + (r.argent  ? '<span class="med-nom">'        + escHtml(r.argent[0]) + '</span><span class="med-club-small">' + escHtml(r.argent[1]) + '</span>' : '—') + '</td>'
          + '<td class="mct-br">' + (r.bronze  ? '<span class="med-nom">'        + escHtml(r.bronze[0]) + '</span><span class="med-club-small">' + escHtml(r.bronze[1]) + '</span>' : '—') + '</td>'
          + '</tr>';
      });

      html += '</tbody></table></div>';
      html += '</div>';
    });
    html += '</div>';
  });
  return html;
}

function renderMedallerView(discKey) {
  var campionats = _getMedals2526(discKey);
  if (!campionats) return '<div class="disc-empty">Medaller no disponible per a aquesta disciplina.</div>';

  var agrClubs = _agregaMedaller(_allMedals2526Resultats());

  var html = '<div class="med-sources">';
  campionats.forEach(function(c) {
    html += '<div class="med-source-chip">📍 ' + escHtml(c.nom) + ' · ' + escHtml(c.lloc) + ' · ' + escHtml(c.data) + '</div>';
  });
  html += '</div>';

  html += '<h3 class="disc-section-title" style="margin-top:1.5rem">🏹 Resultats per Categoria</h3>';
  html += _renderArquersPerCategoria(campionats);

  html += '<h3 class="disc-section-title" style="margin-top:2rem">🏛️ Medaller de Clubs · Totes les disciplines</h3>';
  html += '<p style="font-size:.82rem;color:var(--gray);margin-bottom:.75rem">Inclou: Campionat de Sala · Campionat 3D · Campionat 3D en Línia · Campionat de Camp.</p>';
  html += _renderMedallerTable(agrClubs.clubs, 'Club');

  html += '<div style="text-align:right;margin-top:1rem">'
    + '<button class="disc-btn-sm" onclick="setMedaller()">'
    + '🏆 Veure Medaller General de Clubs →</button></div>';

  return html;
}

var _medallerTab = 'competicio';

function setMedallerTab(tab) {
  _medallerTab = tab;
  // Actualitza hash URL
  try { history.replaceState(null, '', '#competitions/medaller/' + tab); } catch(e) {}
  // Actualitza tots els contenidors visibles
  var mc = document.getElementById('medallerContent');
  var cp = document.getElementById('compMedallerPanel');
  if (mc) mc.innerHTML = renderMedallerGlobal();
  if (cp && cp.style.display !== 'none') cp.innerHTML = renderMedallerGlobal();
}

function _renderClubsPerDivisio() {
  var DIV_ORDER = ['Recorbat','Compost','Arc Nu','Longbow','Tradicional'];
  var all = _allMedals2526Resultats();
  var html = '';

  // Agrupa tots els resultats per divisió
  var byDiv = {};
  all.forEach(function(r) {
    if (!byDiv[r.div]) byDiv[r.div] = [];
    byDiv[r.div].push(r);
  });

  var divs = DIV_ORDER.filter(function(d) { return byDiv[d]; });
  Object.keys(byDiv).forEach(function(d) { if (divs.indexOf(d) === -1) divs.push(d); });

  divs.forEach(function(div) {
    var agr = _agregaMedaller(byDiv[div]);
    if (!agr.clubs.length) return;

    html += '<div class="med-div-bloc" style="margin-bottom:2rem">';
    html += '<div class="med-div-label" style="font-size:.88rem;padding:.3rem .9rem;margin-bottom:.75rem">' + escHtml(div) + '</div>';
    html += _renderMedallerTable(agr.clubs, 'Club');
    html += '</div>';
  });

  return html;
}

function _renderClubsPerCompeticio() {
  var COMPS = [
    {
      key: 'sala',
      label: '🏟️ Sala',
      nom: '58è Campionat de Catalunya de Sala',
      resultats: MEDALS_2526.sala.resultats
    },
    {
      key: '3d',
      label: '🌲 3D',
      nom: '30è CdC 3D + 1r CdC 3D en Línia',
      resultats: (function() {
        var r = [];
        MEDALS_2526['3d'].forEach(function(c) { r = r.concat(c.resultats); });
        return r;
      })()
    },
    {
      key: 'camp',
      label: '🏔️ Camp',
      nom: '56è Campionat de Catalunya de Camp',
      resultats: MEDALS_2526.camp.resultats
    },
    {
      key: 'al',
      label: '☀️ Aire Lliure',
      nom: '73è Campionat de Catalunya Aire Lliure',
      resultats: null  // pendent (jul 2026)
    }
  ];

  var html = '';
  COMPS.forEach(function(comp) {
    html += '<div class="med-div-bloc" style="margin-bottom:2rem">';
    html += '<div class="med-div-label" style="font-size:.88rem;padding:.3rem .9rem;margin-bottom:.75rem">'
      + comp.label + ' <span style="font-weight:400;opacity:.8;font-size:.8rem">· ' + escHtml(comp.nom) + '</span></div>';

    if (!comp.resultats) {
      html += '<div class="disc-empty" style="font-size:.82rem;padding:1rem">Pendent · ' + escHtml(comp.nom) + ' (jul 2026)</div>';
    } else {
      var agr = _agregaMedaller(comp.resultats);
      html += _renderMedallerTable(agr.clubs, 'Club');
    }
    html += '</div>';
  });
  return html;
}

function renderMedallerGlobal() {
  var HASH_BASE = '#competitions/medaller/';
  var html = '<div class="med-global-header">'
    + '<div class="med-global-badge">Temporada 2025-26</div>'
    + '<h2 class="med-global-title">🏛️ Medaller de Clubs <em>Catalunya</em></h2>'
    + '<p class="med-global-sub">Classificació olímpica oficial · Campionats de Sala, 3D, Camp i Aire Lliure</p>'
    + '</div>'
    + '<div class="med-global-nav">'
    + '<a class="disc-rnav-btn' + (_medallerTab === 'competicio' ? ' act' : '') + '" '
    + 'href="' + HASH_BASE + 'competicio" onclick="setMedallerTab(\'competicio\');return false">🏅 Per Competició</a>'
    + '<a class="disc-rnav-btn' + (_medallerTab === 'divisio' ? ' act' : '') + '" '
    + 'href="' + HASH_BASE + 'divisio" onclick="setMedallerTab(\'divisio\');return false">🏹 Per Divisió</a>'
    + '<a class="disc-rnav-btn' + (_medallerTab === 'general' ? ' act' : '') + '" '
    + 'href="' + HASH_BASE + 'general" onclick="setMedallerTab(\'general\');return false">🏆 General</a>'
    + '</div>';

  if (_medallerTab === 'general') {
    var agr = _agregaMedaller(_allMedals2526Resultats());
    html += '<h3 class="disc-section-title" style="margin-top:1.5rem">🏛️ Medaller General de Clubs 2025-26</h3>';
    html += '<p style="font-size:.85rem;color:var(--gray);margin-bottom:1rem">'
      + 'Suma de totes les competicions: Sala · 3D · 3D en Línia · Camp. Totes les categories i estils.</p>';
    html += _renderMedallerTable(agr.clubs, 'Club');
    html += '<p class="disc-records-note" style="margin-top:1.5rem">Dades definitives temporada 2025-26.</p>';

  } else if (_medallerTab === 'divisio') {
    html += '<h3 class="disc-section-title" style="margin-top:1.5rem">🏹 Medaller de Clubs per Divisió 2025-26</h3>';
    html += '<p style="font-size:.85rem;color:var(--gray);margin-bottom:1.25rem">'
      + 'Medalles per estil d\'arc. Suma de totes les competicions i categories.</p>';
    html += _renderClubsPerDivisio();
    html += '<p class="disc-records-note">Dades definitives temporada 2025-26.</p>';

  } else {
    html += '<h3 class="disc-section-title" style="margin-top:1.5rem">🏅 Medaller de Clubs per Competició 2025-26</h3>';
    html += '<p style="font-size:.85rem;color:var(--gray);margin-bottom:1.25rem">'
      + 'Medalles de clubs per modalitat de competició. Totes les categories i estils.</p>';
    html += _renderClubsPerCompeticio();
    html += '<p class="disc-records-note">Dades definitives temporada 2025-26.</p>';
  }

  return html;
}

// ── Estat actiu ───────────────────────────────────────────
var _discActiva = null;
var _discTab = 'info';
var _discResView = 'camps';

// ── Accés des de fora ─────────────────────────────────────
function setDisciplina(key, _noHash) {
  _discActiva = key;
  _discTab = 'info';
  _discResView = 'camps';
  setS('disciplina', _noHash);
  if (!_noHash) _discUpdateHash();
  renderDisciplina();
}

function _discUpdateHash() {
  var h = 'disciplina/' + _discActiva + '/' + _discTab;
  if (_discTab === 'resultats') h += '/' + _discResView;
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

function setDiscTab(tab, btn, _noHash) {
  _discTab = tab;
  _discResView = 'camps';
  document.querySelectorAll('#discTabs .disc-tab').forEach(function(b){ b.classList.remove('act'); });
  if (btn) btn.classList.add('act');
  if (!_noHash) _discUpdateHash();
  renderDiscTab(tab);
}

function _setDiscResView(view) {
  _discResView = view;
  _discUpdateHash();
  renderDiscTab('resultats');
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
  var hasMedals = !!_getMedals2526(d.circularsCategoria);

  // Sub-nav
  var baseHash = '#disciplina/' + (_discActiva || '') + '/resultats/';
  var html = '<div class="disc-res-nav">'
    + '<a class="disc-rnav-btn' + (_discResView === 'camps' ? ' act' : '') + '" '
    + 'href="' + baseHash + 'camps" onclick="_setDiscResView(\'camps\');return false">🏆 Campionats</a>';
  if (hasMedals) {
    html += '<a class="disc-rnav-btn' + (_discResView === 'medaller' ? ' act' : '') + '" '
      + 'href="' + baseHash + 'medaller" onclick="_setDiscResView(\'medaller\');return false">📊 Medaller 2025-26</a>';
  }
  html += '</div>';

  if (_discResView === 'medaller' && hasMedals) {
    html += renderMedallerView(d.circularsCategoria);
    return html;
  }

  // Vista campionats
  html += '<h3 class="disc-section-title">Campionats</h3><div class="disc-camp-grid">';

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

function setMedaller() {
  setS('medaller');
  var el = document.getElementById('medallerContent');
  if (el && !el.hasAttribute('data-loaded')) {
    el.innerHTML = renderMedallerGlobal();
    el.setAttribute('data-loaded', '1');
  }
}

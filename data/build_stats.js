// Script per generar competition_stats_full.json amb totes les dades individuals
// Executa: node data/build_stats.js

const fs = require('fs');

const competitions = [
  {
    id: 40,
    title: "XXI Campionat de Catalunya de Round 900 – XII Memorial Jordi Adell",
    dateISO: "2025-09-06",
    type: "al",
    disc: "Aire Lliure",
    ianseo: 24295,
    icUrl: "https://www.ianseo.net/TourData/2025/24295/IC.php",
    totalParticipants: 82,
    divisions: [
      { name: "Long Bow - Dona", archers: [
        {pos:1, name:"COMAS FRANCH Mireia", club:"CETADS", score:727}
      ]},
      { name: "Long Bow - Home", archers: [
        {pos:1, name:"VALLDOSERA FERRANDIZ Jordi", club:"CAM", score:661},
        {pos:2, name:"PEREZ MESAS Jose", club:"AECP", score:496}
      ]},
      { name: "Nu - Dona", archers: [
        {pos:1, name:"NIUBÓ RESA Laura", club:"CAM", score:488}
      ]},
      { name: "Nu - Home", archers: [
        {pos:1, name:"PEÑA COSTA Carles", club:"ACC", score:805},
        {pos:2, name:"HERNÁNDEZ Sebastien", club:"TAO", score:714},
        {pos:3, name:"JAIMES HUAYTA Jhonny", club:"CEAB", score:702},
        {pos:4, name:"BERNINSONE Leonardo Guillermo", club:"ACC", score:645}
      ]},
      { name: "Nu - Plus 50 Home", archers: [
        {pos:1, name:"DEL PUERTO ANGORRILLA Diego", club:"CAM", score:727},
        {pos:2, name:"RAMIREZ MORENO Miguel", club:"CTAF", score:706},
        {pos:3, name:"JIMENEZ SANOU Jose Manuel", club:"CAM", score:630},
        {pos:4, name:"PERALTA TOLOS Maurici", club:"CASCV", score:522}
      ]},
      { name: "Tradicional - Dona", archers: [
        {pos:1, name:"ARANSAY TOMÉ Yolanda", club:"CTACM", score:747}
      ]},
      { name: "Tradicional - Home", archers: [
        {pos:1, name:"GALÁN MANTRANA Miguel", club:"CAM", score:771}
      ]},
      { name: "Tradicional - Plus 50 Home", archers: [
        {pos:1, name:"LÓPEZ ABAD David", club:"TAO", score:799},
        {pos:2, name:"AZUAGA MERIDA Rafael", club:"CTAD", score:723},
        {pos:3, name:"GALIANO HERNANDEZ Angel", club:"CTAF", score:719},
        {pos:4, name:"RIOSALIDO NUÑEZ Ferran", club:"CEAS", score:694},
        {pos:5, name:"RUIZ PEREZ Jose Luis", club:"CACAT", score:610}
      ]},
      { name: "Recorbat - Aleví Dona", archers: [
        {pos:1, name:"GODIA GALLARDO Abril", club:"CAM", score:801},
        {pos:2, name:"COSMA GONZALEZ Ela", club:"CEAB", score:745}
      ]},
      { name: "Recorbat - Sub 15 Home", archers: [
        {pos:1, name:"VIZCAINO CULI Guillem", club:"CTAF", score:808}
      ]},
      { name: "Recorbat - Sub 18 Dona", archers: [
        {pos:1, name:"GARCIA SANCHEZ Mar", club:"CAR", score:685}
      ]},
      { name: "Recorbat - Sub 18 Home", archers: [
        {pos:1, name:"GONZÁLEZ HERNANDEZ Daniel", club:"CTALL", score:774}
      ]},
      { name: "Recorbat - Sub 21 Dona", archers: [
        {pos:1, name:"CAHUÉ COMAS Jana", club:"CETADS", score:775},
        {pos:2, name:"DE ARRIBA MANZANO Alma", club:"CTTA", score:741},
        {pos:3, name:"QUILES PEREZ Lucia", club:"CASCV", score:714},
        {pos:4, name:"MARTINEZ PEREZ Edurne", club:"CTTA", score:706},
        {pos:5, name:"PEREZ DE TUDELA ALBALAT Maria", club:"CAM", score:602}
      ]},
      { name: "Recorbat - Sub 21 Home", archers: [
        {pos:1, name:"RUEDA DOMENECH Roc", club:"CETADS", score:796},
        {pos:2, name:"DOMINGO GONZALEZ Guiu", club:"CEAB", score:750},
        {pos:3, name:"BRAU VILLALÓN Jordi", club:"CACV", score:732},
        {pos:4, name:"MUÑOZ MALAGON Daniel", club:"CEAB", score:726},
        {pos:5, name:"GALÁN IGNACIO Miguel", club:"CAM", score:707},
        {pos:6, name:"GEORGIEV KRASTEV Ivan", club:"CEAB", score:618},
        {pos:7, name:"ESPES DE HARO Daniel", club:"TAO", score:590}
      ]},
      { name: "Recorbat - Dona", archers: [
        {pos:1, name:"BARBERÀ LÓPEZ Núria", club:"CTACD", score:803},
        {pos:2, name:"NOGUEIRA NOGUEIRA Violeta", club:"ACC", score:752},
        {pos:3, name:"GUSTEMS MARTÍNEZ Montserrat", club:"CAM", score:651},
        {pos:4, name:"PUJOL SENDRA Montserrat", club:"CTAVG", score:599}
      ]},
      { name: "Recorbat - Home", archers: [
        {pos:1, name:"QUILES GARCÍA Raül", club:"CASCV", score:831},
        {pos:2, name:"CEBRIAN PUJOL Sergi", club:"CETADS", score:829},
        {pos:3, name:"VELASCO MARCÈ Eduard", club:"CAM", score:776},
        {pos:4, name:"EXPOSITO GOMEZ Marc", club:"CTAF", score:774},
        {pos:5, name:"RIBAS MALEKZADEH Ruhollah Erfan", club:"CEAB", score:762},
        {pos:6, name:"CARRERA VEGA Manuel", club:"CACV", score:752},
        {pos:7, name:"VAZQUEZ QUINTAS Amador", club:"CACV", score:745},
        {pos:8, name:"GODIA JORDANA Oriol", club:"CAM", score:724},
        {pos:9, name:"MORALES MUÑOZ José", club:"CEAB", score:684},
        {pos:10, name:"BONNIN VASQUEZ David", club:"CAM", score:653},
        {pos:11, name:"RUIZ CASADO Oscar", club:"CAM", score:651},
        {pos:12, name:"BORONAT CORNUDELLA Albert", club:"CTALL", score:643},
        {pos:13, name:"ALBI ROFES Pol", club:"TAO", score:594},
        {pos:14, name:"ESTEVEZ ARNANZ Pablo", club:"CASCV", score:550}
      ]},
      { name: "Recorbat - Plus 50 Home", archers: [
        {pos:1, name:"HERNÁNDEZ HIGUERA Manuel", club:"ACC", score:759},
        {pos:2, name:"FRAGUAS Antoni", club:"CETADS", score:744},
        {pos:3, name:"MARTÍN MUÑOZ Jose Manuel", club:"CACV", score:736},
        {pos:4, name:"MARTI VAL Miguel", club:"ACC", score:729},
        {pos:5, name:"BRAVO NAVAS Josep", club:"CTAP", score:725},
        {pos:6, name:"BUJARALOZ MAGRIÑA Joan Salvador", club:"CTAP", score:704},
        {pos:7, name:"BARTOLL RIOS Daniel", club:"ACC", score:703},
        {pos:8, name:"DELGADO CÁMARA Carlos", club:"CAM", score:677},
        {pos:9, name:"SORRIBES PLAZA Francisco Javier", club:"CACV", score:659},
        {pos:10, name:"SINFREU VERGARA Antoni", club:"TAE", score:659},
        {pos:11, name:"FERNANDEZ BERGA Luis", club:"CAM", score:651},
        {pos:12, name:"GONZÁLEZ SORIA Rafael", club:"CAM", score:598}
      ]},
      { name: "Compost - Dona", archers: [
        {pos:1, name:"RODRIGUEZ COUTADO Lucia", club:"ATALC", score:864},
        {pos:2, name:"SEMIS ASTIER Ester", club:"CAM", score:837},
        {pos:3, name:"MARTÍNEZ RODRÍGUEZ Mónica", club:"CTACM", score:815}
      ]},
      { name: "Compost - Home", archers: [
        {pos:1, name:"ALVAREZ FERNANDEZ Antonio", club:"CTACM", score:873},
        {pos:2, name:"SOUTO PASCUAL Manel", club:"CTACM", score:869},
        {pos:3, name:"HURTADO BELLIDO Manel", club:"ATALC", score:814},
        {pos:4, name:"SÁNCHEZ COSTAS Fran", club:"CETADS", score:802},
        {pos:5, name:"SOUSA André", club:"CAM", score:758}
      ]},
      { name: "Compost - Plus 50 Home", archers: [
        {pos:1, name:"BLANCH SOROLLA Josep", club:"CTAVG", score:831},
        {pos:2, name:"VALBUENA HERNANDEZ Carlos", club:"CAM", score:830},
        {pos:3, name:"CUELLO PEREZ Santiago", club:"CACV", score:829},
        {pos:4, name:"PRAT MARTINEZ Miguel Angel", club:"CTAVG", score:828},
        {pos:5, name:"MATA MARTINEZ Jordi", club:"TEM", score:820},
        {pos:6, name:"TARRAGÓ MARTÍ Jordi", club:"CTAP", score:819},
        {pos:7, name:"MUÑOZ TREJO José Manuel", club:"CAM", score:795},
        {pos:8, name:"CHAVES GIL Francisco", club:"CTAVG", score:765},
        {pos:9, name:"NAVARRO ORTIZ Vicente", club:"ATALC", score:748}
      ]}
    ]
  },
  {
    id: 38,
    title: "XXXII Trofeu Ciutat de Lleida – III Copa Pirineus – IV Memorial Alfred Piñol",
    dateISO: "2025-09-27",
    type: "al",
    disc: "Aire Lliure",
    ianseo: 23781,
    icUrl: "https://www.ianseo.net/TourData/2025/23781/IC.php",
    totalParticipants: 118,
    divisions: [
      { name: "Recorbat - Home", archers: [
        {pos:1,name:"RUFAS MORILLO Franch",club:"Sabiñanigo",score:1260},
        {pos:2,name:"GUILLEN ANGOSTO Diego",club:"TERUEL",score:1213},
        {pos:3,name:"CEBRIAN PUJOL Sergi",club:"CETADS",score:1171},
        {pos:4,name:"DÁVILA FERNÁNDEZ Pablo",club:"Arcosoto",score:1142},
        {pos:5,name:"GUIL SÁNCHEZ Ferran",club:"Pardinyes",score:1083},
        {pos:6,name:"OLIVAN ALVAREZ Alejandro",club:"CTTA",score:1077},
        {pos:7,name:"JOFRÉ BOVÉ Pau Danila",club:"CTTA",score:1066},
        {pos:8,name:"MOTIS ALOS Alberto",club:"Pardinyes",score:897},
        {pos:9,name:"SÁNCHEZ FERNÁNDEZ Francesc",club:"CTTA",score:870}
      ]},
      { name: "Recorbat - Dona", archers: [
        {pos:1,name:"NOGUEIRA NOGUEIRA Violeta",club:"ACC",score:1071},
        {pos:2,name:"CLUA FERNANDEZ Laura",club:"TORREFARRERA",score:908},
        {pos:3,name:"KLEMM Doris",club:"MALPAISOMYS",score:798}
      ]},
      { name: "Recorbat - Plus 50 Home", archers: [
        {pos:1,name:"LÓPEZ CARVAJAL Antonio",club:"MAESTRAT",score:1196},
        {pos:2,name:"RAMÓN MESEGUER Carlos",club:"ALMUSSAFES",score:1132},
        {pos:3,name:"BRAVO NAVAS Josep",club:"Pardinyes",score:1130},
        {pos:4,name:"HERNÁNDEZ HIGUERA Manuel",club:"ACC",score:1099},
        {pos:5,name:"PEY Carlos",club:"MALPAISOMYS",score:1067},
        {pos:6,name:"BUJARALOZ MAGRIÑA Joan",club:"Pardinyes",score:1028},
        {pos:7,name:"DELGADO CAMARA Carlos",club:"CAM",score:1026},
        {pos:8,name:"FRAGUAS CASTANY Antoni",club:"CETADS",score:1023},
        {pos:9,name:"BARLETT Gary Kimberley",club:"MALPAISOMYS",score:1001},
        {pos:10,name:"LUCHA RODRIGUEZ Emilio",club:"Alcalans",score:993},
        {pos:11,name:"LÓPEZ MORALES Vicente",club:"VALDEMORO",score:978},
        {pos:12,name:"CARDENAS RUFO FRANCISCO",club:"Pardinyes",score:942},
        {pos:13,name:"SORRIBES PLAZA Fco Javier",club:"CASCV",score:918},
        {pos:14,name:"SINFREU VERGARA Antonio",club:"ENCAMP",score:917},
        {pos:15,name:"CURIEL LABRADOR Luis",club:"CTTA",score:888},
        {pos:16,name:"YONG AVALOS Julio",club:"Pardinyes",score:881},
        {pos:17,name:"FIGUERES DOMINGO Josep",club:"Arcosoto",score:866},
        {pos:18,name:"GONZALEZ SORIA Rafael",club:"CAM",score:848},
        {pos:19,name:"JOVER GARCIA Fco Javier",club:"Pardinyes",score:788},
        {pos:20,name:"MARCOS PÉREZ Antonio",club:"VALDEMORO",score:720}
      ]},
      { name: "Recorbat - Plus 50 Dona", archers: [
        {pos:1,name:"SUAREZ GARROTE Laura",club:"CTTA",score:1099},
        {pos:2,name:"GUSTEMS MARTÍNEZ Montserrat",club:"CAM",score:1095},
        {pos:3,name:"PÉREZ GÓMEZ Begoña",club:"CTTA",score:1069},
        {pos:4,name:"GONZALEZ Mª Jesus",club:"MALPAISOMYS",score:845},
        {pos:5,name:"MOLINA DEL MOLINO ISABEL",club:"CTTA",score:691},
        {pos:6,name:"MEJIAS BARCELÓ Mónica",club:"CTTA",score:471}
      ]},
      { name: "Recorbat - Fins 8 Home", archers: [{pos:1,name:"BUADES ALVAREZ Pau Shanti",club:"Mercadal",score:636}]},
      { name: "Recorbat - Fins 10 Home", archers: [{pos:1,name:"MARTINEZ LUQUE Javier",club:"Pardinyes",score:588}]},
      { name: "Recorbat - Fins 12 Home", archers: [{pos:1,name:"PEREZ DÍAZ Pablo",club:"Mercadal",score:532}]},
      { name: "Recorbat - Fletxes Roses AS1", archers: [
        {pos:1,name:"CALVO JULVE Almudena",club:"Arcfinden",score:1311},
        {pos:2,name:"ZALABARRIA CALZADA Amaia",club:"MERCEDES",score:1204},
        {pos:3,name:"AGUIRREZABAL IZARRA Txus",club:"MERCEDES",score:1119},
        {pos:4,name:"DOMINGO CABRERIZO Maria Pilar",club:"Baix Gaia",score:1094},
        {pos:5,name:"RAMOS PÉREZ Mercedes",club:"MERCEDES",score:1041},
        {pos:6,name:"MONTALVO MARIN Montserrat",club:"Baix Gaia",score:883},
        {pos:7,name:"ABELLO Teresa",club:"Baix Gaia",score:834},
        {pos:8,name:"VILA SAEZ Mari Pau",club:"Baix Gaia",score:642}
      ]},
      { name: "Compost - Home", archers: [
        {pos:1,name:"GARCIA CEPA Endika",club:"Diarco",score:1356},
        {pos:2,name:"PANIAGUA SUSINOS Carlos",club:"GEZI",score:1355},
        {pos:3,name:"CASILLAS DEL MONTE Daniel",club:"VALDEMORILLO",score:1341},
        {pos:4,name:"VIDAL LALANZA Jorge",club:"Alfajarin",score:1341},
        {pos:5,name:"BROCAL GÓMEZ Edgar",club:"Pardinyes",score:1338},
        {pos:6,name:"MARQUETA JUDEZ Oscar",club:"Cierzo",score:1331},
        {pos:7,name:"SANZ FURELOS Hector",club:"Jaurti",score:1266},
        {pos:8,name:"HURTADO BELLIDO Manel",club:"ATALC",score:1240},
        {pos:9,name:"RUESTES RAMON David",club:"Pardinyes",score:940},
        {pos:10,name:"ÁLVAREZ FERNÁNDEZ Antonio",club:"CTACM",score:0}
      ]},
      { name: "Compost - Dona", archers: [{pos:1,name:"RODRIGUEZ COUTADO Lucia",club:"ATALC",score:1310}]},
      { name: "Compost - Sub 21 Dona", archers: [{pos:1,name:"SINFREU ABAD Nuria",club:"CETADS",score:1262}]},
      { name: "Compost - Plus 50 Home", archers: [
        {pos:1,name:"VELASCO QUINTANILLA Julen",club:"ZUGAZTIETA",score:1362},
        {pos:2,name:"GÓMEZ GUTIERREZ José",club:"Pardinyes",score:1359},
        {pos:3,name:"MEDRANO MANERO Enrique",club:"PINSEQUE",score:1357},
        {pos:4,name:"BROCAL MAÑAS Josep",club:"Pardinyes",score:1354},
        {pos:5,name:"TALTAVULL BOSCH Jaime",club:"Mercadal",score:1319},
        {pos:6,name:"LAJUSTICIA NAVARRO Andrés",club:"Alfajarin",score:1304},
        {pos:7,name:"TARRAGÓ MARTÍ Jordi",club:"Pardinyes",score:1304},
        {pos:8,name:"MEDINA ALONSO Carlos",club:"URGELL",score:1288},
        {pos:9,name:"FATAS IBAÑEZ Fernando",club:"PINSEQUE",score:1266},
        {pos:10,name:"MARTINEZ POZUELO Pedro",club:"ARCOMADRID",score:1263},
        {pos:11,name:"ARAQUE HERAS Fernando",club:"PINSEQUE",score:1263},
        {pos:12,name:"MANZANOS ALCIBAR Igor",club:"Jaurti",score:1247},
        {pos:13,name:"SÁNCHEZ MUÑOZ Pedro",club:"Diarco",score:1159},
        {pos:14,name:"SANZ MUÑOZ Alfonso",club:"Diarco",score:315},
        {pos:15,name:"CUELLO PÉREZ Santiago",club:"CASCV",score:0}
      ]},
      { name: "Compost - Plus 50 Dona", archers: [{pos:1,name:"SEMIS ASTIER Ester",club:"CAM",score:1334}]},
      { name: "Nu - Home", archers: [
        {pos:1,name:"UBACH BALAGUÉ Sergi",club:"ENCAMP",score:1006},
        {pos:2,name:"PASTOR SOBRINO Gabriel",club:"ENCAMP",score:1002},
        {pos:3,name:"PUBLILL TRAVESSET Marc",club:"ENCAMP",score:861},
        {pos:4,name:"MONTAÑES PINTANEL Alejandro",club:"PINSEQUE",score:459},
        {pos:5,name:"CATALÀ ORTEGA Simón",club:"ENCAMP",score:389}
      ]},
      { name: "Nu - Dona", archers: [{pos:1,name:"CATALÀ ORTEGA Teresa",club:"ENCAMP",score:719}]},
      { name: "Nu - Sub 18 Home", archers: [{pos:1,name:"MARTIMS MORAIS Moises",club:"ENCAMP",score:693}]},
      { name: "Nu - Plus 50 Home", archers: [
        {pos:1,name:"ROSSELL DURÓ Manel",club:"ENCAMP",score:994},
        {pos:2,name:"RIBALTA AYMAMI Oriol",club:"ENCAMP",score:925},
        {pos:3,name:"JIMENEZ SANOU Jose Manuel",club:"CAM",score:875},
        {pos:4,name:"CANUT GALLART JOAN",club:"Pardinyes",score:0}
      ]},
      { name: "Nu - Fins 14 Home", archers: [{pos:1,name:"CORDOBA CERVIÑO Nil",club:"ENCAMP",score:548}]},
      { name: "Nu - Fins 10 Home", archers: [{pos:1,name:"LEAL DA CRUZ Gabriel",club:"ENCAMP",score:411}]},
      { name: "Nu - Fins 12 Dona", archers: [{pos:1,name:"PUBLILL PIROT Anna",club:"ENCAMP",score:305}]},
      { name: "Tradicional - Home", archers: [
        {pos:1,name:"AZUAGA MÉRIDA Rafael",club:"CTAD",score:1102},
        {pos:2,name:"BOSCH NAVES Marx",club:"PUIGVERD",score:884},
        {pos:3,name:"BUADES CAMPS PERE JOAN",club:"Mercadal",score:746},
        {pos:4,name:"PASTOR BECERRIL David",club:"Pardinyes",score:307}
      ]},
      { name: "Tradicional - Dona", archers: [{pos:1,name:"ABOS SERRANO Maria Pi",club:"PINSEQUE",score:726}]},
      { name: "Tradicional - Plus 50 Home", archers: [
        {pos:1,name:"VALERO DE LA MERCED JOSE A.",club:"TERUEL",score:1106},
        {pos:2,name:"TORRES SALAZAR Jose Ignacio",club:"ZUGAZTIETA",score:1081},
        {pos:3,name:"ALVAREZ MATEO Agustin",club:"PINSEQUE",score:1037},
        {pos:4,name:"RIOSALIDO NUÑEZ Ferran",club:"CEAS",score:1020},
        {pos:5,name:"BARRENECHEA ZABALA Miguel Ang",club:"Getxo",score:931},
        {pos:6,name:"PASTOR BRAVO Sergi",club:"Pardinyes",score:524}
      ]},
      { name: "Tradicional - Plus 50 Dona", archers: [
        {pos:1,name:"VEIGA LOPEZ Adelina",club:"ZUGAZTIETA",score:896},
        {pos:2,name:"ARROYO ORTIZ Silvia",club:"CCTA",score:682}
      ]},
      { name: "Long Bow - Home", archers: [
        {pos:1,name:"CORNELLANA CASANY Santiago",club:"CCTA",score:994},
        {pos:2,name:"MONTULL RUÉ JAUME",club:"MONTMELL",score:993},
        {pos:3,name:"PÉREZ MESAS José",club:"PUIGVERD",score:924}
      ]},
      { name: "Long Bow - Dona", archers: [
        {pos:1,name:"ROSILLO GONZALEZ Dolores",club:"Arcosoto",score:1212},
        {pos:2,name:"MONTSERRAT BATET MARIA ELISA",club:"MONTMELL",score:906}
      ]},
      { name: "Long Bow - Plus 50 Dona", archers: [{pos:1,name:"SAFONT MAS Mª Montserrat",club:"CCTA",score:785}]}
    ]
  },
  {
    id: 19,
    title: "I Trofeu Vila de Cambrils",
    dateISO: "2026-01-24",
    type: "al",
    disc: "Aire Lliure",
    ianseo: 26423,
    icUrl: "https://www.ianseo.net/TourData/2026/26423/IC.php",
    accessible: false,
    totalParticipants: null,
    divisions: []
  }
];

// Write the full JSON
const outputPath = __dirname + '/competition_stats_full.json';
fs.writeFileSync(outputPath, JSON.stringify(competitions, null, 2), 'utf8');
console.log('Written', competitions.length, 'competitions to', outputPath);
console.log('File size:', fs.statSync(outputPath).size, 'bytes');

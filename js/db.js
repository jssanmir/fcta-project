// db.js – Data store: circulars, competitions, news, formations, tirades, clubs
// ──────────────────────────────────────────────────────────

// ============================================================
// BASE DE DADES – CONTINGUT REAL DE FCTA.CAT
// ============================================================

// ============================================================
// BASE DE DADES – CONTINGUT REAL DE FCTA.CAT (PDFs inclosos)
// ============================================================

var PDF_CONTENT = {
  "CIRC-2607": {
    title: "Seminari de Psicologia Aplicada al Tir amb Arc",
    num: "CIRC 2607",
    date: "29 de gener de 2026",
    url: "#",
    sections: [
      { h: "Seminari de Psicologia Aplicada al Tir amb Arc", body: '"Entrena les teves emocions, multiplica el teu potencial"\n\nEl proper 28 de febrer tindrà lloc un curs teoricopràctic especialitzat en psicologia aplicada al tir amb arc, orientat al desenvolupament integral de l\'arquer/a.' },
      { h: "Data i Lloc", body: "📅 DATA: 28 de febrer de 2026\n📍 LLOC: Club Arc Montjuïc (Sala)\nPassatge de Montserrat de Andrés, 1-5, Sants-Montjuïc, 08014 Barcelona\n⏰ HORARI: De 10:00h a 20:00h" },
      { h: "Horari del dia", body: "10:00–10:30 · Recepció de participants\n10:30–11:00 · Preparació de l'arc i instruccions\n11:00–12:00 · Exercici 1 de consciència corporal, mental i emocional\n12:00–12:30 · Descans\n12:30–14:00 · Taller 1 · Psicologia\n14:00–16:00 · Dinar + temps lliure\n16:00–17:30 · Taller 2 · Psicologia\n17:30–18:30 · Aplicació dels aprenentatges al tir\n18:30–19:00 · Descans\n19:00–20:00 · Meditació guiada" },
      { h: "Continguts", body: "Treball dels aspectes mentals, emocionals i corporals que influeixen en el rendiment en el tir amb arc, així com de les estratègies psicològiques necessàries per gestionar-los de manera positiva en entrenaments i competicions." },
      { h: "A qui s'adreça", body: "Arquers i arqueres que volen deixar de sentir-se limitats pel bloqueig emocional, la manca de concentració o la pressió competitiva, i començar a competir amb més seguretat, control i confiança." },
      { h: "Preu i Inscripcions", body: "💰 PREU: 40€\n🔗 Inscripcions: https://event.addon-sport.com/es/seminari-de-psicologia-aplicada-al-tir-amb-arc\n📅 Termini d'inscripció: del 29 de gener al 23 de febrer de 2026. Places limitades." }
    ]
  },
  "CIRC-2511": {
    title: "Taller Jurídic per a Clubs",
    num: "CIRC 2511",
    date: "13 de febrer de 2025",
    url: "#",
    sections: [
      { h: "Taller Jurídic per a Clubs", body: "Formació pràctica per a clubs i entitats esportives dins del programa anual de formació de l'Oficina d'Atenció als Clubs i la FCTA." },
      { h: "Ponent", body: "Servei jurídic de l'Oficina d'Atenció als Clubs de la Unió de Federacions Esportives de Catalunya (UFEC)." },
      { h: "Continguts", body: "1. Creació i constitució dels clubs.\n2. Juntes directives: Convocatòries, reunions i assemblees.\n3. Processos electorals." },
      { h: "Data, Horari i Preu", body: "📅 Data: 26 de febrer de 2025\n⏰ Horari: 17:00h a 18:00h\n💻 Modalitat: Formació online\n💰 Preu: Gratuït" },
      { h: "A qui va dirigit", body: "Membres de juntes directives o treballadors dels clubs federats de tir amb arc de Catalunya." }
    ]
  },
  "CIRC-2410": {
    title: "Taller de Comptabilitat per a Clubs",
    num: "CIRC 2410",
    date: "29 de febrer de 2024",
    url: "#",
    sections: [
      { h: "Introducció a la Comptabilitat per a Clubs", body: "Taller d'introducció a la comptabilitat per a clubs dins del programa anual de formació pràctica de l'Oficina d'Atenció als Clubs i la FCTA." },
      { h: "Continguts", body: "1. Introducció a la comptabilitat\n   · Gestió econòmica\n   · Tipus de documents, conceptes bàsics\n\n2. Estats financers\n   · Comptes anuals, Balanç de situació\n   · Compte de pèrdues i guanys, Llibre de Caixa\n\n3. Comptabilitat bàsica\n   · Pla General Comptable, Llibre diari\n   · Principals obligacions fiscals" },
      { h: "Data, Horari i Preu", body: "📅 Data: 21 de març de 2024\n⏰ Horari: 17:30h a 18:30h\n💻 Modalitat: Formació online\n💰 Preu: Gratuït" }
    ]
  },
  "CIRC-2435": {
    title: "Fiscalitat dels Clubs Esportius",
    num: "CIRC 2435",
    date: "4 de juliol de 2024",
    url: "#",
    sections: [
      { h: "Fiscalitat dels Clubs i Entitats Esportives", body: "Taller de formació de fiscalitat per a clubs i entitats esportives, dins del programa anual de formació pràctica de l'Oficina d'Atenció als Clubs i la FCTA." },
      { h: "Continguts", body: "1. Obligacions fiscals\n2. Impost sobre activitats econòmiques (IAE)\n3. IVA\n4. Model 347 i 349\n5. Retencions\n6. Impost de societats" },
      { h: "Data, Horari i Preu", body: "📅 Data: 18 de juliol de 2024\n⏰ Horari: 17:30h a 18:30h\n💻 Modalitat: Formació online\n💰 Preu: Gratuït" }
    ]
  },
  "CIRC-2447": {
    title: "Laboral i Voluntariat Esportiu",
    num: "CIRC 2447",
    date: "24 d'octubre de 2024",
    url: "#",
    sections: [
      { h: "Relacions Laborals i Voluntariat", body: "Taller de relacions laborals i voluntariat en les entitats esportives, dins del programa anual de formació pràctica de l'Oficina d'Atenció als Clubs i la FCTA." },
      { h: "Continguts", body: "1. Voluntariat\n2. Relacions laborals\n3. Certificats" },
      { h: "Data, Horari i Preu", body: "📅 Data: 7 de novembre de 2024\n⏰ Horari: 17:30h a 18:30h\n💻 Modalitat: Formació online\n💰 Preu: Gratuït" }
    ]
  },
  "CIRC-2509": {
    title: "Sol·licitud d'Informació Auditoria Interna FCTA",
    num: "CIRC 2509",
    date: "31 de gener de 2025",
    url: "#",
    sections: [
      { h: "Sol·licitud d'Informació – Auditoria Interna FCTA", body: "D'acord amb el procés d'auditoria interna encarregat per la FCTA a l'empresa externa FACSS Auditors, s'ha procedit a la sol·licitud d'informació comptable als clubs afiliats." },
      { h: "Contingut de la sol·licitud", body: "L'equip auditor ha requerit informació relativa als llibres comptables majors dels clubs, incloent-hi:\n· Relació de factures emeses i rebudes\n· Imports dels pagaments i cobraments efectuats\n· Saldo comptable a tancament de l'exercici" },
      { h: "Finalitat", body: "La verificació i conciliació d'aquestes dades amb els registres comptables de la Federació, per reforçar la transparència financera i millorar els mecanismes de control intern." }
    ]
  },
  "CIRC-2504": {
    title: "Curs Tècnic Esportiu Nivell 1 – Convocatòria 2026/2027",
    num: "CIRC 2604",
    date: "15 de gener de 2026",
    url: "#",
    sections: [
      { h: "Curs de Tècnic Esportiu de Nivell 1 en Tir amb Arc", body: "La FCTA i l'Escola Catalana de l'Esport (ECE) adscrita al Consell Català de l'Esport (CCE) convoquen un Curs de Tècnic Esportiu de Nivell 1 en Tir amb Arc a Barcelona, que inicia el 27 de febrer de 2026." },
      { h: "Estructura del curs", body: "• Bloc Específic (65h): Formació semipresencial. Classes presencials, virtuals i treball autònom al moodle. Impartit per la FCTA.\n• Bloc Comú (80h): Formació semipresencial. Impartit per l'ECE i el CCE.\n• Període de Pràctiques (150h): Formació presencial en clubs adscrits." },
      { h: "Pla Formatiu – Bloc Específic (65h)", body: "A1 Didàctica i metodologia — 14h\nA2 Tècnica de tir amb arc — 18h\nA3 Material i equipaments — 10h\nA4 Seguretat — 5h\nA5 Desenvolupament físic — 5h\nA6 Psicologia aplicada a la iniciació — 5h\nA7 Normativa i modalitats — 5h\nA8 Desenvolupament professional — 3h" },
      { h: "Requisits generals d'inscripció", body: "· Llicència federativa vigent\n· Certificat de superació de la prova d'accés\n· Titulació de Graduat en ESO o equivalent" },
      { h: "Prova d'Accés", body: "📅 Data: 27 de febrer de 2026\n📍 Club Arc Montjuïc, Passatge de Montserrat de Andrés, 1-5, Barcelona\n⏰ Horari: 18:00 a 20:00h\n\nEstructura:\n· Prova pràctica (4 tandes de 6 fletxes a 18m, diana 80cm)\n· Prova oral de les parts de l'arc\n· Muntatge i desmuntatge de l'arc\n\nPuntuació mínima per superar: 45 punts." },
      { h: "Documents i inscripció", body: "📄 Formulari inscripció: ins_curs_n1_tirambarc_26_bcn_a.pdf\n📋 Full resum tràmits: MODEL-FULL-INFO-INSCRIPCIO.pdf\n👥 Llistat definitiu admesos: Llistat-Definitiu-Alumnes-PA-X-Publicar.pdf" }
    ]
  }
};


var NEWS_CONTENT = {
  1: {
    title: "Montcada i Reixac acull el 56è Campionat de Catalunya de Camp",
    date: "11 de maig de 2026",
    cat: "Camp",
    img: "img/news/noticia1.png",
    body: `<p>El <strong>Club Català de Tir amb Arc</strong> ha estat l'escenari del <strong>56è Campionat de Catalunya de Camp</strong>, celebrat a les instal·lacions del club <strong>a Montcada i Reixac</strong>.</p>
<p>La jornada ha reunit arquers i arqueres procedents de diferents punts del territori en una cita que ha posat punt final a la <strong>Lliga Catalana 2025/2026</strong> de tir de camp, tancant així una temporada intensa i de gran qualitat competitiva.</p>
<p>El campionat, que enguany celebra la seva 56a edició, és una de les cites més emblemàtiques del calendari federat, i any rere any consolida la tradició i el compromís del tir de camp a Catalunya.</p>
<p>La FCTA agraeix la tasca organitzadora del Club Català de Tir amb Arc i felicita tots els participants per la seva esportivitat i dedicació al llarg de la temporada.</p>`
  },
  2: {
    title: "Finalitza la Temporada de Camp 2025/2026 a Montcada i Reixac",
    date: "4 de maig de 2026",
    cat: "Camp",
    img: "img/news/noticia2.png",
    body: `<p>El <strong>diumenge 3 de maig</strong> es va donar per finalitzada la temporada 2025/2026 de la lliga catalana de tir de camp al <strong>Club Català de Tir amb Arc, a Montcada i Reixac</strong>.</p>
<p>Amb aquesta cita, queda tancat el calendari competitiu de la disciplina per a la present temporada. El <strong>rànquing general</strong> ja és disponible i es pot consultar a través del web de la Federació Catalana de Tir amb Arc.</p>
<p>Des de la FCTA volem felicitar tots els arquers i arqueres participants per la seva implicació al llarg de la temporada, així com els clubs organitzadors de cada una de les proves.</p>`
  },
  3: {
    title: "Més de 150 arquers participen a la 2ª Tirada de la Lliga Catalana d'Aire Lliure",
    date: "19 d'abril de 2026",
    cat: "Aire Lliure",
    img: "img/news/noticia3.png",
    body: `<p>Aquest cap de setmana, <strong>Figueres i Olivella</strong> han acollit la <strong>2ª tirada de la Lliga Catalana d'aire lliure</strong>, amb la participació de més de <strong>150 esportistes</strong>.</p>
<p>La competició, celebrada simultàniament a les dues seus, ha reunit arquers i arqueres d'arreu del territori en una nova jornada del calendari català de tir amb arc.</p>
<p>La prova s'ha desenvolupat amb bon ambient i ha comptat amb representació de nombrosos clubs federats. Els resultats detallats es poden consultar a través del web de la federació.</p>`
  },
  4: {
    title: "El Tir amb Arc Inclusiu pren vol a Olesa amb la primera tirada d'Arc Adaptat",
    date: "11 d'abril de 2026",
    cat: "Arc Adaptat",
    img: "img/news/noticia4.png",
    body: `<p>Aquest dissabte 11 d\'abril, el club <strong>Tir Arc Olesa</strong> ha viscut una jornada molt especial amb la inauguració de la <strong>primera tirada d'arc adaptat, inclusiu i salut</strong>.</p>
<p>L'activitat ha nascut amb l'objectiu d'apropar el tir amb arc a totes les persones, promovent un esport accessible i inclusiu. La iniciativa ha posat en valor el tir amb arc com a eina de salut i benestar per a persones de totes les capacitats.</p>
<p>Des de la FCTA celebrem aquesta iniciativa pionera i animem altres clubs a seguir aquest exemple d'esport inclusiu al territori català.</p>`
  },
  5: {
    title: "Campionat de Catalunya Universitari de Tir amb Arc 2026",
    date: "1 d'abril de 2026",
    cat: "Universitari",
    img: "img/news/noticia5.png",
    body: `<p>Aquest cap de setmana s'ha celebrat amb gran èxit el <strong>Campionat de Catalunya Universitari de Tir amb Arc 2026</strong> a <strong>Tarragona</strong>, organitzat al Club Tau de Tir amb Arc.</p>
<p>La competició ha reunit esportistes universitaris d'arreu del territori en una jornada marcada pel bon ambient, el nivell esportiu i la convivència entre clubs i universitats.</p>
<p>Des de l'organització volem felicitar tots els participants per la seva implicació i esportivitat, i molt especialment agrair la feina de l'equip organitzador del Club Tau de Tir amb Arc per fer possible aquesta cita tan especial.</p>`
  },
  6: {
    title: "Inici de la Temporada d'Aire Lliure",
    date: "18 de març de 2026",
    cat: "Temporada",
    img: "img/news/noticia6.png",
    body: `<p>La temporada d'aire lliure ja està en marxa després de la celebració de les primeres tirades el passat <strong>14 de març</strong>, organitzades pels clubs <strong>Tir amb Arc Olesa</strong> i <strong>Club Arc Sant Celoni</strong>.</p>
<p>Aquesta primera jornada ha servit per donar el tret de sortida a una nova temporada amb una bona participació i un ambient excel·lent entre els esportistes, que han tornat a gaudir de la competició a l'aire lliure.</p>
<p>A <strong>Sant Celoni</strong>, la competició va incloure les divisions de compost, arc nu i longbow, amb participació oberta a totes les categories. Per la seva banda, a <strong>Olesa de Montserrat</strong>, la tirada va aplegar arquers de totes les edats i nivells.</p>`
  }
};

var DB = {

// --- CIRCULARS ---
circulars: [
  // FEDERACIÓ
  {id:1,type:'fed',num:'CIRC-2622',title:'3ª Tirada Lliga Catalana Aire Lliure 2026',desc:'Informació completa i inscripcions per a la 3ª tirada de la lliga catalana d\'aire lliure 2026',day:27,mon:'ABR',year:2026,url:'docs/2026042714461573-CIRC_2622_3a_tirada_Lliga_Catalana_AireLliure_2026.pdf'},
  {id:2,type:'fed',num:'CIRC-2619',title:'Assemblea General Ordinària FCTA 2026',desc:'Convocatòria, ordre del dia i documentació de l\'assemblea',day:15,mon:'MAR',year:2026,url:'#'},
  {id:25,type:'fed',num:'CIRC-2509',title:'Sol·licitud d\'Informació Auditoria Interna FCTA',desc:'Procés d\'auditoria interna encarregat per la FCTA a FACSS Auditors. Sol·licitud d\'informació comptable als clubs',day:31,mon:'GEN',year:2025,url:'docs/2025013117490089-CIRC_2509_SOL.LICITUD_INFORMACIO_AUDITORIA_FCTA.pdf'},
  {id:3,type:'fed',num:'CIRC-2613',title:'Preus Llicències Temporada 2025/2026',desc:'Actualització de tarifes de llicències aprovades per l\'assemblea',day:5,mon:'GEN',year:2026,url:'#'},
  // AIRE LLIURE / SALA
  {id:4,type:'al',num:'CIRC-2621',title:'Lliga Catalana Aire Lliure 2026 – Calendari general',desc:'Calendari complet de la Lliga Catalana d\'aire lliure temporada 2026',day:10,mon:'GEN',year:2026,url:'#'},
  {id:5,type:'al',num:'CIRC-2617',title:'2ª Tirada Lliga Catalana Aire Lliure',desc:'Informació de la 2ª tirada celebrada a Figueres i Olivella',day:5,mon:'MAR',year:2026,url:'#'},
  {id:6,type:'al',num:'CIRC-2618',title:'Campionat de Catalunya de Sala 2026',desc:'Normes, categories, full d\'inscripció i seus del campionat',day:20,mon:'MAR',year:2026,url:'#'},
  {id:7,type:'al',num:'CIRC-2610',title:'Campionat Catalunya Universitari 2026',desc:'Competició exclusiva per a esportistes universitaris de Catalunya – Tarragona',day:15,mon:'FEB',year:2026,url:'#'},
  {id:8,type:'al',num:'CIRC-2605',title:'1ª Tirada Lliga Catalana Aire Lliure 2026',desc:'Olesa de Montserrat i Sant Celoni – inici de temporada',day:14,mon:'MAR',year:2026,url:'#'},
  // CAMP
  {id:9,type:'camp',num:'CIRC-2620',title:'56è Campionat de Catalunya de Camp',desc:'Montcada i Reixac, juliol 2026. Punt final a la Lliga Catalana 2025/2026',day:15,mon:'ABR',year:2026,url:'#'},
  {id:10,type:'camp',num:'CIRC-2615',title:'1ª Tirada Lliga Catalana de Camp 2025/2026',desc:'Informació i inscripcions per a la primera tirada de la lliga de camp',day:8,mon:'FEB',year:2026,url:'#'},
  {id:11,type:'camp',num:'CIRC-2609',title:'Lliga Catalana Tir de Camp 2026 – Calendari',desc:'Calendari complet de la lliga de camp temporada 2025/2026',day:10,mon:'GEN',year:2026,url:'#'},
  {id:12,type:'camp',num:'CIRC-2601',title:'Resultats 55è Campionat de Catalunya de Camp',desc:'Resultats definitius i rànquing final de la temporada 2024/2025',day:20,mon:'JUL',year:2025,url:'#'},
  // 3D / BOSC
  {id:13,type:'3d',num:'CIRC-2616',title:'30è Campionat de Catalunya 3D 2026',desc:'Resultats i classificació final del 30è Campionat de Catalunya 3D',day:10,mon:'ABR',year:2026,url:'https://ianseo.net/Details.php?toId=28099'},
  {id:14,type:'3d',num:'CIRC-2614',title:'Lliga Catalana 3D 2026 – Calendari i seu',desc:'Totes les dates i seus de la lliga de bosc temporada 2026',day:20,mon:'GEN',year:2026,url:'#'},
  {id:15,type:'3d',num:'CIRC-2608',title:'2ª Tirada Lliga Catalana 3D',desc:'Informació de la 2ª tirada de la lliga de bosc 2026',day:15,mon:'MAR',year:2026,url:'#'},
  // JUTGES
  {id:16,type:'jut',num:'CIRC-2611',title:'Curs de Jutges de Tir amb Arc 2026',desc:'Convocatòria i inscripció al curs de jutges de la FCTA',day:1,mon:'FEB',year:2026,url:'#'},
  {id:17,type:'jut',num:'CIRC-2606',title:'Actualització Reglament Tècnic 2026',desc:'Noves modificacions del reglament tècnic aprovades per la junta directiva',day:15,mon:'FEB',year:2026,url:'#'},
  // FORMACIÓ
  {id:18,type:'form',num:'CIRC-2607',title:'Seminari de Psicologia Aplicada al Tir amb Arc',desc:'Inscripcions obertes. Formació general per a tècnics i esportistes',day:29,mon:'GEN',year:2026,url:'docs/2026012915470845-CIRC_2607_Seminari_psicologia_aplicada_tir_amb_arc.pdf'},
  {id:19,type:'form',num:'CIRC-2504',title:'Curs Tècnic Esportiu Nivell 1 – Convocatòria 2026/2027',desc:'La FCTA i el CCE convoquen el curs de tècnic esportiu de Nivell 1 en tir amb arc',day:15,mon:'GEN',year:2026,url:'docs/2026011516220845-CIRC_2504_Curs_Tecnic_Nivell1_2025_26.pdf'},
  {id:20,type:'form',num:'CIRC-2511',title:'Taller Jurídic per a Clubs',desc:'Formació sobre aspectes legals de la gestió de clubs esportius',day:13,mon:'FEB',year:2025,url:'docs/2025021311182735-CIRC_2511_Taller_formacio_clubs_juridic.pdf'},
  {id:21,type:'form',num:'CIRC-2447',title:'Taller de Laboral i Voluntariat per a Clubs',desc:'Regularització de voluntaris, relacions laborals i contractació',day:24,mon:'OCT',year:2024,url:'docs/2024102413581925-CIRC_2447_Taller_formacio_clubs_voluntariat.pdf'},
  {id:22,type:'form',num:'CIRC-2435',title:'Taller de Fiscalitat per a Clubs',desc:'Obligacions fiscals, declaracions i exempcions per a clubs i federacions',day:4,mon:'JUL',year:2024,url:'docs/202407041752453-CIRC_2435_Taller_formacio_clubs_fiscal.pdf'},
  {id:23,type:'form',num:'CIRC-2410',title:'Taller de Comptabilitat per a Clubs',desc:'Gestió econòmica i comptable d\'entitats esportives sense ànim de lucre',day:29,mon:'FEB',year:2024,url:'docs/2024022916412124-CIRC_2410_Taller_formacio_clubs_comptabilitat.pdf'},
  // KYUDO
  {id:24,type:'kyudo',num:'CIRC-2603',title:'Campionat de Catalunya de Kyudo 2026',desc:'Convocatòria i informació del campionat català de kyudo',day:10,mon:'MAR',year:2026,url:'#'},
],

// --- COMPETICIONS ---
// Resultats a Ianseo: https://www.ianseo.net/Details.php?toId=XXXXX
competitions: [
  // status base: 'open' | 'soon' | 'closed'
  // dateISO: YYYY-MM-DD — si la data ha passat, el sistema automàticament mostra 'closed'
  // ── Pròximes / Obertes ──────────────────────────────────
  {id:1, type:'al',   title:'3ª Tirada Lliga Catalana Aire Lliure 2026',   disc:'Aire Lliure',  date:'30 mai 2026',     dateISO:'2026-05-30', loc:'Barcelona / Esclanyà (Girona)',    status:'open',   circ:'CIRC-2622', url:'docs/REGLAMENT_COMPETICIONS_v1.6.pdf', ianseo:28416},
  {id:4, type:'sala', title:'Campionat de Catalunya de Sala 2026–27',       disc:'Sala – 18m',   date:'oct 2026',        dateISO:'2026-10-31', loc:'Per determinar',                   status:'soon',   circ:'CIRC-2618', url:'#'},
  {id:14,type:'al',   title:'Tirada Aire Lliure Equips Interclubs 2026',   disc:'Aire Lliure',  date:'13 jun 2026',     dateISO:'2026-06-13', loc:'Tarragona',                        status:'soon',   circ:'#',         url:'#',                                        ianseo:28481},
  // ── Tancades 2026 (ordre cronològic invers) ─────────────
  {id:15,type:'al',   title:'3ª Tirada Lliga Catalana AL 2026 (Esclanyà)',disc:'Aire Lliure',  date:'31 mai 2026',     dateISO:'2026-05-31', loc:'Esclanyà (Girona)',                status:'open',   circ:'CIRC-2622', url:'#',                                        ianseo:28417},
  {id:16,type:'al',   title:'3ª Tirada AL Interclubs 2026',                disc:'Aire Lliure',  date:'23 mai 2026',     dateISO:'2026-05-23', loc:'Cerdanyola del Vallès',            status:'open',   circ:'#',         url:'#',                                        ianseo:27977},
  {id:7, type:'trd',  title:'30è Campionat de Catalunya 3D',               disc:'3D / Bosc',    date:'17 mai 2026',     dateISO:'2026-05-17', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2616', url:'#',                                        ianseo:28099},
  {id:2, type:'camp', title:'56è Campionat de Catalunya de Camp',           disc:'Tir de Camp',  date:'10 mai 2026',     dateISO:'2026-05-10', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2620', url:'#news:2',                                  ianseo:28098},
  {id:9, type:'camp', title:'3ª Tirada Lliga Catalana Camp 2026',           disc:'Tir de Camp',  date:'3 mai 2026',      dateISO:'2026-05-03', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2620', url:'#',                                        ianseo:27988},
  {id:17,type:'al',   title:'2ª Tirada AL Interclubs 2026',                disc:'Aire Lliure',  date:'25 abr 2026',     dateISO:'2026-04-25', loc:'Tarragona',                        status:'open',   circ:'#',         url:'#',                                        ianseo:27392},
  {id:10,type:'trd',  title:'4ª Tirada Lliga Catalana 3D 2026',            disc:'3D / Bosc',    date:'12 abr 2026',     dateISO:'2026-04-12', loc:'Castellnou del Bages (Barcelona)', status:'open',   circ:'CIRC-2608', url:'#',                                        ianseo:27589},
  {id:11,type:'al',   title:'2ª Tirada Lliga Catalana Aire Lliure 2026',   disc:'Aire Lliure',  date:'18 abr 2026',     dateISO:'2026-04-18', loc:'Olivella / Figueres',              status:'open',   circ:'CIRC-2617', url:'#news:3',                                  ianseo:27633},
  {id:5, type:'al',   title:'Campionat de Catalunya Universitari 2026',    disc:'Aire Lliure',  date:'28 mar 2026',     dateISO:'2026-03-28', loc:'Tarragona',                        status:'open',   circ:'CIRC-2610', url:'#news:5',                                  ianseo:27386},
  {id:18,type:'al',   title:'1ª Tirada AL Interclubs 2026',                disc:'Aire Lliure',  date:'22 mar 2026',     dateISO:'2026-03-22', loc:'Lleida',                           status:'open',   circ:'#',         url:'#',                                        ianseo:27008},
  {id:13,type:'al',   title:'1ª Tirada Lliga Catalana Aire Lliure 2026',   disc:'Aire Lliure',  date:'14 mar 2026',     dateISO:'2026-03-14', loc:'Olesa de Montserrat / Sant Celoni',status:'open',   circ:'CIRC-2605', url:'#',                                        ianseo:27062},
  {id:12,type:'camp', title:'2ª Tirada Lliga Catalana Camp 2026',           disc:'Tir de Camp',  date:'8 mar 2026',      dateISO:'2026-03-08', loc:'Montcada i Reixac',                status:'open',   circ:'#',         url:'#',                                        ianseo:26987},
  {id:3, type:'trd',  title:'3ª Tirada Lliga Catalana 3D 2026',            disc:'3D / Bosc',    date:'22 feb 2026',     dateISO:'2026-02-22', loc:'Olivella (Barcelona)',              status:'open',   circ:'CIRC-2608', url:'#',                                        ianseo:26790},
  {id:8, type:'sala', title:'58è Campionat de Catalunya de Sala',          disc:'Sala – 18m',   date:'31 gen 2026',     dateISO:'2026-01-31', loc:'Manresa / Constantí',              status:'open',   circ:'#',         url:'#',                                        ianseo:26399},
  {id:19,type:'al',   title:'I Trofeu Vila de Cambrils',                   disc:'Aire Lliure',  date:'24 gen 2026',     dateISO:'2026-01-24', loc:'Cambrils (Tarragonès)',             status:'open',   circ:'#',         url:'#',                                        ianseo:26423},
  {id:20,type:'trd',  title:'1r Campionat Catalunya 3D en Línia 2026',     disc:'3D / Bosc',    date:'18 gen 2026',     dateISO:'2026-01-18', loc:'Sant Celoni (Vallès Oriental)',     status:'open',   circ:'#',         url:'#',                                        ianseo:26307},
  {id:6, type:'camp', title:'1ª Tirada Lliga Catalana Camp 2025/26',       disc:'Tir de Camp',  date:'11 gen 2026',     dateISO:'2026-01-11', loc:'Castellnou del Bages (Barcelona)', status:'open',   circ:'CIRC-2615', url:'#',                                        ianseo:26209},
  // ── Temporada 2025 (desembre) ────────────────────────────
  {id:21,type:'sala', title:'Campionat de Catalunya de Clubs 2025 – Sala', disc:'Sala – 18m',   date:'21 des 2025',     dateISO:'2025-12-21', loc:'Manresa',                          status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=FCTALS6',  ianseo:'FCTALS6'},
  {id:22,type:'sala', title:'Trofeu Màster de Catalunya Indoor 2025',      disc:'Sala – 18m',   date:'21 des 2025',     dateISO:'2025-12-21', loc:'Manresa',                          status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=FCTALS5',  ianseo:'FCTALS5'},
  {id:23,type:'trd',  title:'3ª Tirada Lliga Catalana 3D en Línia 2025/26',disc:'3D / Bosc',    date:'27-28 des 2025',  dateISO:'2025-12-27', loc:'Club Tir amb Arc Les Franqueses',  status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CAT3DLZ',  ianseo:'CAT3DLZ'},
  {id:24,type:'trd',  title:'2ª Tirada Lliga Catalana 3D 2025/2026',       disc:'3D / Bosc',    date:'14 des 2025',     dateISO:'2025-12-14', loc:'Castellnou de Bages (Barcelona)',  status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CAT3D26z', ianseo:'CAT3D26z'},
  {id:25,type:'al',   title:'2ª Trobada Lliga Inicia\'t 2025/2026',        disc:'Aire Lliure',  date:'13 des 2025',     dateISO:'2025-12-13', loc:'Montcada i Reixac',                status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=INIC25B',  ianseo:'INIC25B'},
  {id:26,type:'al',   title:'Tirada Social de Nadal – Club Cerdanyola',    disc:'Aire Lliure',  date:'27 des 2025',     dateISO:'2025-12-27', loc:'Cerdanyola del Vallès',            status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CACVNAV',  ianseo:'CACVNAV'},
  // ── Temporada 2024-25 (desembre 2024) ────────────────────
  {id:27,type:'sala', title:'57è Campionat de Catalunya de Sala 2024-25',  disc:'Sala – 18m',   date:'14-15 des 2024',  dateISO:'2024-12-14', loc:'Constantí (Tarragona)',            status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CATSA25X', ianseo:'CATSA25X'},
  {id:28,type:'sala', title:'4ª Lliga Catalana Sala (2024-25) – R.A.U.S.', disc:'Sala – 18m',   date:'7-8 des 2024',    dateISO:'2024-12-07', loc:'Terrassa (Barcelona)',             status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CATSA25D', ianseo:'CATSA25D'},
  {id:29,type:'trd',  title:'2ª Lliga Catalana 3D 2024-25',                disc:'3D / Bosc',    date:'1 des 2024',      dateISO:'2024-12-01', loc:'Caldes de Montbui (Barcelona)',    status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CAT3D25B', ianseo:'CAT3D25B'},
],

// --- NOTÍCIES ---
news: [
  {id:1,cat:'Camp',title:'Montcada i Reixac acull el 56è Campionat de Catalunya de Camp',date:'24 mai 2026',desc:'El Club Català de Tir amb Arc ha acollit el 56è Campionat de Catalunya de Camp a Montcada i Reixac, posant punt final a la Lliga Catalana 2025/2026.',img:'img/news/noticia1.png',url:'#news:2'},
  {id:2,cat:'Camp',title:'Finalitza la Temporada de Camp 2025/2026 a Montcada i Reixac',date:'20 mai 2026',desc:'Finalitza la temporada 2025/2026 de tir de camp a Montcada i Reixac. Rànquing general ja disponible.',img:'img/news/noticia2.png',url:'#news:2'},
  {id:3,cat:'Aire Lliure',title:'Més de 150 arquers participen a la 2ª Tirada de la Lliga Catalana d\'Aire Lliure',date:'12 mai 2026',desc:'Més de 150 arquers i arqueres es van reunir a Figueres i Olivella en la 2ª tirada de la Lliga Catalana d\'aire lliure.',img:'img/news/noticia3.png',url:'#news:3'},
  {id:4,cat:'Arc Adaptat',title:'El Tir amb Arc Inclusiu pren vol a Olesa amb la primera tirada d\'Arc Adaptat',date:'5 mai 2026',desc:'El Tir Arc Olesa estrena la primera tirada d\'arc adaptat, inclusiu i salut, un esdeveniment pioner a Catalunya.',img:'img/news/noticia4.png',url:'#news:4'},
  {id:5,cat:'Universitari',title:'Campionat de Catalunya Universitari de Tir amb Arc 2026',date:'30 abr 2026',desc:'El Campionat de Catalunya Universitari s\'ha celebrat amb gran èxit a Tarragona, reunint esportistes universitaris d\'arreu del territori.',img:'img/news/noticia5.png',url:'#news:5'},
  {id:6,cat:'Temporada',title:'Inici de la Temporada d\'Aire Lliure',date:'14 mar 2026',desc:'La temporada d\'aire lliure va començar el 14 de març amb tirades a Olesa de Montserrat i Sant Celoni.',img:'img/news/noticia6.png',url:'#news:6'},
],

// --- FORMACIÓ (real del web) ---
formations: [
  {id:1,icon:'🎓',title:'Curs Tècnic Esportiu Nivell 1',level:'Tècnics',desc:'La FCTA i el CCE convoquen un curs de tècnic esportiu de Nivell 1 en tir amb arc. Títol oficial reconegut per la Generalitat de Catalunya.',dates:'2026/2027 · Barcelona',places:'Llista admesos disponible',circ:'CIRC-2504',links:[]},
  {id:2,icon:'🧠',title:'Seminari de Psicologia Aplicada al Tir amb Arc',level:'General',desc:'Formació sobre eines psicològiques per millorar el rendiment esportiu i la gestió de la pressió competitiva. Adreçat a tècnics i esportistes.',dates:'2026 · Per confirmar',places:'30 places',circ:'CIRC-2607',links:[]},
  {id:3,icon:'⚖️',title:'Taller Jurídic per a Clubs',level:'Clubs',desc:'Aspectes legals clau per a la gestió de clubs esportius: estatuts, responsabilitats, contractes i marc normatiu.',dates:'Setembre 2026',places:'25 places',circ:'CIRC-2511',links:[]},
  {id:4,icon:'📊',title:'Taller de Comptabilitat per a Clubs',level:'Clubs',desc:'Gestió econòmica i comptable d\'entitats esportives sense ànim de lucre. Eines pràctiques per a gestors de clubs.',dates:'Octubre 2026',places:'25 places',circ:'CIRC-2410',links:[]},
  {id:5,icon:'💼',title:'Fiscalitat dels Clubs Esportius',level:'Clubs',desc:'Obligacions fiscals, declaracions i exempcions per a clubs i federacions esportives. Impartit per experts fiscalistes.',dates:'Novembre 2026',places:'25 places',circ:'CIRC-2435',links:[]},
  {id:6,icon:'🤝',title:'Laboral i Voluntariat Esportiu',level:'Clubs',desc:'Regularització de voluntaris, relacions laborals i contractació en entitats esportives. Aspectes pràctics per a clubs.',dates:'Desembre 2026',places:'25 places',circ:'CIRC-2447',links:[]},
  {id:7,icon:'🏹',title:'Tecnificació Base – Programa PATD',level:'Tècnics',desc:'Programa de tecnificació base de la FCTA. Formació específica per a tècnics de base i iniciació.',dates:'Temporada 2026',places:'Consultar',circ:'',links:[{txt:'📄 Descarregar programa PATD',url:'docs/PAT_FCTA_v4.pdf'}]},
],

// --- CLUBS (per al selector de tirades socials) ---
clubs: [
  'Arc Sabadell','Arc Girona','Arquers Terrassa','Besòs Arc','CA Barberà','CA Cornellà',
  'CA Gavà','CA Lleida','CA Mollet','CA Reus','CA Salt','CA Tortosa','CA Vic',
  'Club Arc Barcelona','Club Arc Tarragona','Club Catala de Tir amb Arc',
  'Tir Arc Badalona','Tir Arc Lleida','Tir Arc Manresa','Tir Arc Olesa',
  'Tir Arc Rubí','Tir Arc Sant Cugat','Tir Arc Vilafranca','Arc Adaptat Catalunya',
],

// --- DOCUMENTS (reglaments, rànquings, llibres de regles, etc.) ---
// disc: 'al' | '3d' | 'camp' | 'kyudo' | 'general'
documents: [
  // ── Aire Lliure / Sala ──────────────────────────────────
  {id:101, disc:'al',    nom:'WA Llibre 3 – Tir sobre diana (Aire Lliure i Sala)', url:'docs/WA_Llibre3_Aire_Lliure_Sala.pdf',          icon:'📘'},
  {id:102, disc:'al',    nom:'Reglament de Competicions FCTA v1.6',                url:'docs/REGLAMENT_COMPETICIONS_v1.6.pdf',           icon:'📋'},
  {id:103, disc:'al',    nom:'Distàncies i papers Aire Lliure i Sala',             url:'docs/Distancies_Papers_AL_Sala.pdf',             icon:'📐'},
  {id:104, disc:'al',    nom:'Rècords AL – Recorbat i Compost (agost 2024)',       url:'docs/Records_AL_Recorbat_Compost_2024.pdf',      icon:'🏆'},
  {id:105, disc:'al',    nom:'Rècords AL – Tradicional, Nu i Longbow',            url:'docs/Records_AL_Tradicional_Nu_Longbow.pdf',     icon:'🏆'},
  {id:106, disc:'al',    nom:'Rècords Sala (març 2024)',                           url:'docs/Records_Sala_2024.pdf',                     icon:'🏆'},
  {id:107, disc:'al',    nom:'Rècords Menors',                                     url:'docs/Records_Menors_2021.pdf',                   icon:'🏆'},
  {id:108, disc:'al',    nom:'Rànquing Final Lliga AL 2024',                       url:'docs/Ranquing_Lliga_AL_2024.pdf',                icon:'📊'},
  {id:109, disc:'al',    nom:'Rànquing Final Lliga Sala 2023/24',                  url:'docs/Ranquing_Lliga_Sala_2023-24.pdf',           icon:'📊'},
  // ── 3D / Bosc ────────────────────────────────────────────
  {id:201, disc:'3d',    nom:'WA Llibre 4 – Tir de Camp i 3D',                    url:'docs/WA_Llibre4_Camp_3D.pdf',                    icon:'📘'},
  {id:202, disc:'3d',    nom:'Reglament de Competicions FCTA v1.6',                url:'docs/REGLAMENT_COMPETICIONS_v1.6.pdf',           icon:'📋'},
  {id:203, disc:'3d',    nom:'Rànquing Final 3D 2024/25',                          url:'docs/Ranquing_Lliga_3D_2024-25.pdf',             icon:'📊'},
  {id:204, disc:'3d',    nom:'Rànquing Final 3D 2023/24',                          url:'docs/Ranquing_Lliga_3D_2023-24.pdf',             icon:'📊'},
  // ── Tir de Camp ──────────────────────────────────────────
  {id:301, disc:'camp',  nom:'WA Llibre 4 – Tir de Camp i 3D',                    url:'docs/WA_Llibre4_Camp_3D.pdf',                    icon:'📘'},
  {id:302, disc:'camp',  nom:'Reglament de Competicions FCTA v1.6',                url:'docs/REGLAMENT_COMPETICIONS_v1.6.pdf',           icon:'📋'},
  {id:303, disc:'camp',  nom:'Rànquing Lliga Camp 2023/24',                        url:'docs/Ranquing_Lliga_Camp_2023-24.pdf',           icon:'📊'},
  {id:304, disc:'camp',  nom:'Classificació Final Camp 2020/21',                   url:'docs/Ranquing_Lliga_Camp_2020-21.pdf',           icon:'📊'},
  // ── Kyudo ─────────────────────────────────────────────────
  {id:401, disc:'kyudo', nom:'Normativa Kyudo – ANKF (International)',             url:'https://www.ankf.or.jp/en/',                     icon:'🌐'},
  {id:402, disc:'kyudo', nom:'Reglament de Competicions FCTA v1.6',                url:'docs/REGLAMENT_COMPETICIONS_v1.6.pdf',           icon:'📋'},
  // ── Assegurances ──────────────────────────────────────────
  {id:501, disc:'general', nom:'Declaració d\'Accident – Part MGS',               url:'docs/PARTE-DE-ACCIDENTES-MGS.pdf',               icon:'📋'},
  {id:502, disc:'general', nom:'Pòlissa d\'Accident Esportiu MGS n.º 51326604',   url:'docs/MGS-POLIZA51326604-accidentes-federados.pdf',icon:'📄'},
  {id:503, disc:'general', nom:'Protocol d\'Actuació en cas d\'Accident – FCTA',  url:'docs/PROTOCOL-actuacio-FEDERATS-FCTA.pdf',       icon:'🚨'},
  // ── PAT – Programa Autonòmic de Tecnificació ──────────────
  {id:601, disc:'general', nom:'Programa Autonòmic de Tecnificació (PAT) v4 – FCTA', url:'docs/PAT_FCTA_v4.pdf',                       icon:'🎯'},
],

// --- TIRADES SOCIALS (poblades via DB.tirades, veure abaix) ---
rounds: []
};

// ============================================================
// LOOKUP MAPS
// bCls / bLbl are defined in config.js (FCTA.typeCls / FCTA.typeLabel)
// and aliased as var bCls / var bLbl for backward compatibility.
// ============================================================

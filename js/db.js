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
  },
  7: {
    title: "3 medalles per Catalunya al Campionat d'Espanya 3D 2026",
    date: "24 de maig de 2026",
    cat: "3D",
    img: "img/news/noticia7.jpeg",
    body: `<p>Del <strong>22 al 24 de maig</strong>, <strong>Astúries</strong> va acollir el <strong>Campionat d'Espanya 3D 2026</strong>, amb la presència de <strong>25 representants de Catalunya</strong> competint entre els millors arquers i arqueres nacionals.</p>
<p>Catalunya va tornar amb <strong>3 medalles destacades</strong>:</p>
<ul><li><strong>Maria Pitarch</strong>, subcampiona d'Espanya en Arc Compost Dona</li><li><strong>Equip Divisions Dona</strong>: Casandra Campo, Tania Martinez, Maria Pitarch i Claudia Senserrich</li><li><strong>Equip Divisions Home</strong>: Oscar Amate, Enrique Flores, Víctor López i David Vivó</li></ul>
<p>Felicitats a tots i totes pels resultats i per representar Catalunya al màxim nivell!</p>`
  },
  8: {
    title: "Més de 150 esportistes a la 3a i última tirada de la Lliga Catalana d'Aire Lliure",
    date: "1 de juny de 2026",
    cat: "Aire Lliure",
    img: "img/news/noticia8.jpeg",
    body: `<p>Més de <strong>150 esportistes</strong> han participat a <strong>Barcelona i Esclanà</strong> en la <strong>3a i última tirada de la Lliga Catalana d'Aire Lliure 2025/2026</strong>.</p>
<p>La competició ha servit per tancar la lliga catalana i acabar d'afinar la preparació de cara al <strong>Campionat de Catalunya d'Aire Lliure</strong>, que tindrà lloc els dies <strong>4 i 5 de juliol a Barcelona</strong>.</p>
<p>Enhorabona a tots els arquers i arqueres per la seva participació al llarg de la temporada. Ens veiem al Campionat de Catalunya!</p>`
  },
  9: {
    title: "Catalunya aconsegueix 10 medalles al Campionat d'Espanya de Camp 2026",
    date: "8 de juny de 2026",
    cat: "Camp",
    img: "img/news/noticia9.jpeg",
    body: `<p>La delegació catalana ha protagonitzat una actuació excel·lent al <strong>Campionat d'Espanya de Camp 2026</strong>, celebrat a <strong>Hoyos del Espino</strong>, aconseguint un total de <strong>10 medalles: 5 ors, 3 plates i 2 bronzes</strong>.</p>
<p>Entre els nous campions d'Espanya i medallistes destaquen:</p>
<ul><li><strong>Maria Pitarch</strong>, campiona d'Espanya en Compost Dona</li><li><strong>Mireia Comas</strong>, subcampiona d'Espanya en Longbow Dona</li><li><strong>Víctor López</strong>, campió d'Espanya en Tradicional Home</li><li><strong>David Vivó</strong>, medalla de bronze en Nu Home</li></ul>
<p>Resultats per equips: <strong>Equip Divisions</strong> (Mireia Comas, Sergi Cebrián, Víctor López, Jordi Ricart i David Vivó) · <strong>Equip Mixt Compost</strong> (Maria Pitarch i Jordi Ricart) · <strong>Equip Mixt Longbow</strong> (Mireia Comas i José Manuel Martí) · <strong>Equip Mixt Recorbat</strong> (Jana Cahuè i Sergi Cebrián) · <strong>Equip Mixt Nu</strong> (Casandra Campo i David Vivó) · <strong>Equip Mixt Tradicional</strong> (M. Isabel Mompéon i Víctor López).</p>
<p>Volem reconèixer la tasca de <strong>Santos Lopez</strong> com a delegat federatiu i felicitar la resta d'arquers i arqueres de la delegació catalana. El futur del tir amb arc català continua apuntant molt amunt!</p>`
  },
  10: {
    title: "Final de la Lliga Catalana d'Arc Adaptat, Inclusiu i Salut",
    date: "15 de juny de 2026",
    cat: "Arc Adaptat",
    img: "img/news/noticia10.jpeg",
    body: `<p>Vam celebrar el <strong>final de la Lliga Catalana d'Arc Adaptat, Inclusiu i Salut</strong> al <strong>Arc Vng</strong>. Aquesta lliga, que s'ha iniciat aquest any, ha estat tot un èxit i continua creixent jornada rere jornada, incorporant cada vegada més esportistes i consolidant-se com un espai de trobada, inclusió i esport per a tothom.</p>
<p>Volem donar les gràcies als <strong>coordinadors d'aquest nou projecte</strong> per la seva dedicació, així com a tots els clubs, tècnics i persones implicades que han fet possible aquesta iniciativa.</p>
<p>Enhorabona a tots els participants per la vostra implicació, esforç i esperit de superació. Aquest és només el començament d'un projecte amb molt de futur!</p>`
  },
  11: {
    title: "El 76è Campionat de Catalunya d'Aire Lliure reuneix més de 165 esportistes a Barcelona",
    date: "6 de juliol de 2026",
    cat: "Aire Lliure",
    img: "img/news/noticia8.jpeg",
    body: `<p>Aquest cap de setmana, <strong>Barcelona</strong> ha acollit el <strong>76è Campionat de Catalunya d'Aire Lliure</strong>, tant en la competició individual com per equips.</p>
<p>La participació ha estat tot un èxit, amb més de <strong>165 esportistes</strong>, <strong>19 equips</strong> i <strong>28 clubs</strong> d'arreu del territori, que han omplert el camp de tir d'un gran ambient de competició.</p>
<p>La calor ha estat també una de les protagonistes del cap de setmana, però no ha impedit que la competició es desenvolupés amb èxit i que els arquers i arqueres oferissin un gran nivell esportiu.</p>
<p>Des de la FCTA volem agrair la implicació de totes les persones que han fet possible aquest campionat: els clubs, els tècnics i tècniques, els jutges, l'equip organitzador i, sobretot, tots els esportistes, que han contribuït a fer possible una competició de gran nivell i un excel·lent ambient esportiu.</p>
<p>Aquest campionat és també el resultat de l'esforç col·lectiu per superar les dificultats que inevitablement apareixen al llarg del camí. Des de la FCTA continuarem treballant amb responsabilitat, escoltant i millorant, amb un únic objectiu: seguir impulsant el tir amb arc català i oferir les millors competicions possibles als nostres esportistes.</p>
<p>Gràcies a tothom per fer possible un gran cap de setmana de tir amb arc. Enhorabona als campions i campiones i a tots els participants!</p>`
  },
  12: {
    title: "El CAR Sant Cugat acull la 5ª jornada del Programa Autonòmic de Tecnificació",
    date: "20 de juny de 2026",
    cat: "PAT",
    img: "img/news/noticia12.jpg",
    body: `<p>El <strong>Centre d'Alt Rendiment (CAR) de Sant Cugat</strong> va acollir el passat <strong>20 de juny</strong> la <strong>5ª jornada del Programa Autonòmic de Tecnificació (PAT)</strong>, una nova cita dins del calendari de seguiment tècnic que la FCTA impulsa per als esportistes amb més projecció.</p>
<p>La sessió, dirigida pel tècnic <strong>Lluís Culí</strong>, va reunir arquers i arqueres de les categories <strong>U15, U18 i U21</strong> en una jornada de treball i seguiment tècnic individualitzat, en el marc del model de tecnificació que la Federació desenvolupa en coordinació amb els clubs.</p>
<p>Des de la FCTA felicitem tots els participants per la implicació i la feina feta durant la jornada. Seguim treballant per fer créixer el talent català! 💪🏼</p>`
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
  // JUNY 2026
  {id:40,type:'al',  num:'CIRC-2637',title:'76è Campionat de Catalunya d\'Aire Lliure',desc:'Convocatòria, normes i full d\'inscripció del 76è Campionat de Catalunya d\'Aire Lliure',day:8,mon:'JUN',year:2026,url:'docs/2026060814000183-CIRC_2637_76e_Campionat_Catalunya_Aire_Lliure.pdf'},
  {id:41,type:'camp',num:'CIRC-2636',title:'Format de Competicions de Camp 2026/2027',desc:'Reglament, categories i format de les competicions de tir de camp per a la temporada 2026/2027',day:8,mon:'JUN',year:2026,url:'docs/2026060812213726-CIRC_2636_Format_competicions_Camp_2026_27.pdf'},
  {id:42,type:'3d',  num:'CIRC-2635',title:'Format de Competicions 3D 2026/2027',desc:'Reglament, categories i format de les competicions de 3D i bosc per a la temporada 2026/2027',day:8,mon:'JUN',year:2026,url:'docs/2026060812201377-CIRC_2635_Format_competicions_3D_2026_27.pdf'},
  {id:43,type:'al',  num:'CIRC-2634',title:'Format de Competicions de Sala 2026/2027',desc:'Reglament, categories i format de les competicions de sala (18m) per a la temporada 2026/2027',day:8,mon:'JUN',year:2026,url:'docs/2026060812193414-CIRC_2634_Format_competicions_Sala_2026_27.pdf'},
  {id:44,type:'al',  num:'CIRC-2633',title:'Format de Competicions d\'Aire Lliure 2026/2027',desc:'Reglament, categories i format de les competicions d\'aire lliure per a la temporada 2026/2027',day:8,mon:'JUN',year:2026,url:'docs/2026060812190382-CIRC_2633_Format_competicions_Aire_Lliure_2026_27.pdf'},
  {id:45,type:'fed', num:'CIRC-2632',title:'Calendaris Esportius 2026/2027',desc:'Calendaris esportius de totes les disciplines per a la temporada 2026/2027',day:8,mon:'JUN',year:2026,url:'docs/2026060812294113-CIRC_2632_Calendaris_esportius_2026_2027.pdf'},
  {id:46,type:'al',  num:'CIRC-2631',title:'4a Tirada Lliga Catalana d\'Arc Adaptat i Salut',desc:'Informació i inscripcions per a la 4a tirada de la Lliga Catalana d\'Arc Adaptat i Salut',day:4,mon:'JUN',year:2026,url:'docs/2026060416591123-CIRC_2631_4a_tirada_Lliga_Catalana_Arc_Adaptat_Salut.pdf'},
  // MAIG 2026
  {id:47,type:'fed', num:'CIRC-2630',title:'Comunicació de Participació – Cts. Espanya CESA i Promeses',desc:'Llista de participants catalans als Campionats d\'Espanya de CESA (Esport Base) i Promeses',day:29,mon:'MAI',year:2026,url:'docs/2026052913472786-CIRC_2630_COMUNICACIO_PARTICIPACIO_CTS-ESPANYA_CESA_I_PROMESES.pdf'},
  {id:48,type:'3d',  num:'CIRC-2629',title:'Ajut al Campionat d\'Espanya de 3D',desc:'Sol·licitud d\'ajut econòmic de la FCTA per participar al Campionat d\'Espanya de Tir 3D',day:27,mon:'MAI',year:2026,url:'docs/2026052716580429-CIRC_2629_AJUT_CAMPIONAT_ESPANYA_3D.pdf'},
  {id:49,type:'al',  num:'CIRC-2628',title:'Format de la Lliga Catalana d\'Arc Adaptat',desc:'Reglament i format de la Lliga Catalana d\'Arc Adaptat i Salut',day:26,mon:'MAI',year:2026,url:'docs/202605261057347-CIRC_2628_Format_Lliga_Arc_Adaptat.pdf'},
  {id:50,type:'3d',  num:'CIRC-2627',title:'Competicions 3D en Línia 2026/2027',desc:'Format, calendari i inscripcions de les competicions de 3D en línia per a la temporada 2026/2027',day:21,mon:'MAI',year:2026,url:'docs/2026052117302440-CIRC_2627_Competicions_3D_Linia_2026_2027.pdf'},
  {id:51,type:'fed', num:'CIRC-2626',title:'Comunicació de Participació – Campionat d\'Espanya de Veterans',desc:'Llista de participants catalans al Campionat d\'Espanya de Veterans',day:18,mon:'MAI',year:2026,url:'docs/2026051814533985-CIRC_2626_COMUNICACIO_PARTICIPACIO_CT-ESP_VETERANS.pdf'},
  {id:52,type:'camp',num:'CIRC-2625',title:'Comunicació de Participació – Campionat d\'Espanya de Camp',desc:'Comunicació i llista de participants catalans al Campionat d\'Espanya de Tir de Camp',day:12,mon:'MAI',year:2026,url:'docs/2026051210484667-CIRC_2625_COMUNICACIO_PARTICIPACIO_CT-ESP_CAMP.pdf'},
  {id:53,type:'fed', num:'CIRC-2624',title:'Ajut al II Gran Premi de Promeses LLNJCM',desc:'Sol·licitud d\'ajut de la FCTA per participar al II Gran Premi de Promeses de la Lliga Nacional de Joves Competidors i Mèrit',day:11,mon:'MAI',year:2026,url:'docs/2026051111225172-CIRC_2624_AJUT_A_II_GRAN_PREMI_PROMESES_LLNJCM.pdf'},
  // ABRIL 2026
  {id:54,type:'3d',  num:'CIRC-2623',title:'30è Campionat de Catalunya 3D 2026 – Resultats',desc:'Resultats i classificació final del 30è Campionat de Catalunya de Tir 3D celebrat el 2026',day:28,mon:'ABR',year:2026,url:'docs/2026042812155234-CIRC_2623_30e_Campionat_Catalunya_3D_2026.pdf'},
],

// --- COMPETICIONS ---
// Resultats a Ianseo: https://www.ianseo.net/Details.php?toId=XXXXX
competitions: [
  // status base: 'open' | 'soon' | 'closed'
  // dateISO: YYYY-MM-DD — si la data ha passat, el sistema automàticament mostra 'closed'
  // ── Pròximes / Obertes ──────────────────────────────────
  {id:1, type:'al',   title:'3ª Tirada Lliga Catalana Aire Lliure 2026',   disc:'Aire Lliure',  date:'30 mai 2026',     dateISO:'2026-05-30', loc:'Barcelona / Esclanyà (Girona)',    status:'open',   circ:'CIRC-2622', url:'#',                                        ianseo:28416},
  // ── Tancades 2026 (ordre cronològic invers) ─────────────
  {id:130,type:'al',  title:'76è Campionat de Catalunya d\'Aire Lliure',   disc:'Aire Lliure',  date:'4-5 jul 2026',    dateISO:'2026-07-04', loc:'Barcelona',                        status:'open',   circ:'CIRC-2637', url:'#',                                        ianseo:29041},
  {id:15,type:'al',   title:'3ª Tirada Lliga Catalana AL 2026 (Esclanyà)',disc:'Aire Lliure',  date:'31 mai 2026',     dateISO:'2026-05-31', loc:'Esclanyà (Girona)',                status:'open',   circ:'CIRC-2622', url:'#',                                        ianseo:28417},
  {id:7, type:'trd',  title:'30è Campionat de Catalunya 3D',               disc:'3D',    date:'17 mai 2026',     dateISO:'2026-05-17', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2616', url:'#',                                        ianseo:28099},
  {id:2, type:'camp', title:'56è Campionat de Catalunya de Camp',           disc:'Tir de Camp',  date:'10 mai 2026',     dateISO:'2026-05-10', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2620', url:'#news:2',                                  ianseo:28098},
  {id:9, type:'camp', title:'3ª Tirada Lliga Catalana Camp 2026',           disc:'Tir de Camp',  date:'3 mai 2026',      dateISO:'2026-05-03', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2620', url:'#',                                        ianseo:27988},
  {id:10,type:'trd',  title:'4ª Tirada Lliga Catalana 3D 2026',            disc:'3D',    date:'12 abr 2026',     dateISO:'2026-04-12', loc:'Castellnou del Bages (Barcelona)', status:'open',   circ:'CIRC-2608', url:'#',                                        ianseo:27589},
  {id:11,type:'al',   title:'2ª Tirada Lliga Catalana Aire Lliure 2026',   disc:'Aire Lliure',  date:'18 abr 2026',     dateISO:'2026-04-18', loc:'Olivella / Figueres',              status:'open',   circ:'CIRC-2617', url:'#news:3',                                  ianseo:27633},
  {id:5, type:'al',   title:'Campionat de Catalunya Universitari 2026',    disc:'Aire Lliure',  date:'28 mar 2026',     dateISO:'2026-03-28', loc:'Tarragona',                        status:'open',   circ:'CIRC-2610', url:'#news:5',                                  ianseo:27386},
  {id:13,type:'al',   title:'1ª Tirada Lliga Catalana Aire Lliure 2026',   disc:'Aire Lliure',  date:'14 mar 2026',     dateISO:'2026-03-14', loc:'Olesa de Montserrat / Sant Celoni',status:'open',   circ:'CIRC-2605', url:'#',                                        ianseo:27062},
  {id:129,type:'al',  title:'1ª Tirada Lliga Catalana AL 2026 (Sant Celoni)',disc:'Aire Lliure', date:'14 mar 2026',     dateISO:'2026-03-14', loc:'Sant Celoni (Vallès Oriental)',    status:'open',   circ:'CIRC-2605', url:'#',                                        ianseo:27064},
  {id:12,type:'camp', title:'2ª Tirada Lliga Catalana Camp 2026',           disc:'Tir de Camp',  date:'8 mar 2026',      dateISO:'2026-03-08', loc:'Montcada i Reixac',                status:'open',   circ:'#',         url:'#',                                        ianseo:26987},
  {id:3, type:'trd',  title:'3ª Tirada Lliga Catalana 3D 2026',            disc:'3D',    date:'22 feb 2026',     dateISO:'2026-02-22', loc:'Olivella (Barcelona)',              status:'open',   circ:'CIRC-2608', url:'#',                                        ianseo:26790},
  {id:8, type:'sala', title:'58è Campionat de Catalunya de Sala',          disc:'Sala – 18m',   date:'31 gen 2026',     dateISO:'2026-01-31', loc:'Manresa / Constantí',              status:'open',   circ:'#',         url:'#',                                        ianseo:26399},
  {id:19,type:'al',   title:'I Trofeu Vila de Cambrils',                   disc:'Aire Lliure',  date:'24 gen 2026',     dateISO:'2026-01-24', loc:'Cambrils (Tarragonès)',             status:'open',   circ:'#',         url:'#',                                        ianseo:26423},
  {id:20,type:'trd',  title:'1r Campionat Catalunya 3D en Línia 2026',     disc:'3D',    date:'18 gen 2026',     dateISO:'2026-01-18', loc:'Sant Celoni (Vallès Oriental)',     status:'open',   circ:'#',         url:'#',                                        ianseo:26307},
  {id:6, type:'camp', title:'1ª Tirada Lliga Catalana Camp 2025/26',       disc:'Tir de Camp',  date:'11 gen 2026',     dateISO:'2026-01-11', loc:'Castellnou del Bages (Barcelona)', status:'open',   circ:'CIRC-2615', url:'#',                                        ianseo:26209},
  // ── Temporada 2025 (desembre) ────────────────────────────
  {id:21,type:'sala', title:'Campionat de Catalunya de Clubs 2025 – Sala', disc:'Sala – 18m',   date:'21 des 2025',     dateISO:'2025-12-21', loc:'Manresa',                          status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=FCTALS6',  ianseo:'FCTALS6'},
  {id:22,type:'sala', title:'Trofeu Màster de Catalunya Indoor 2025',      disc:'Sala – 18m',   date:'21 des 2025',     dateISO:'2025-12-21', loc:'Manresa',                          status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=FCTALS5',  ianseo:'FCTALS5'},
  {id:23,type:'trd',  title:'3ª Tirada Lliga Catalana 3D en Línia 2025/26',disc:'3D',    date:'27-28 des 2025',  dateISO:'2025-12-27', loc:'Club Tir amb Arc Les Franqueses',  status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CAT3DLZ',  ianseo:'CAT3DLZ'},
  {id:24,type:'trd',  title:'2ª Tirada Lliga Catalana 3D 2025/2026',       disc:'3D',    date:'14 des 2025',     dateISO:'2025-12-14', loc:'Castellnou de Bages (Barcelona)',  status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CAT3D26z', ianseo:'CAT3D26z'},
  {id:25,type:'al',   title:'2ª Trobada Lliga Inicia\'t 2025/2026',        disc:'Aire Lliure',  date:'13 des 2025',     dateISO:'2025-12-13', loc:'Montcada i Reixac',                status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=INIC25B',  ianseo:'INIC25B'},
  {id:30,type:'sala', title:'4ª Tirada Lliga Catalana de Sala 2025/2026',  disc:'Sala – 18m',   date:'6-7 des 2025',    dateISO:'2025-12-06', loc:'Constantí (Tarragona)',             status:'closed', circ:'#',         url:'#',                                                ianseo:25582},
  // ── Temporada 2025 (novembre-setembre) ──────────────────
  {id:31,type:'trd',  title:'3D en Línia 2ª Tirada 2025/2026',             disc:'3D',    date:'29-30 nov 2025',  dateISO:'2025-11-29', loc:'En línia (clubs participants)',      status:'closed', circ:'#',         url:'#',                                                ianseo:'CAT3DLB'},
  {id:32,type:'sala', title:'3ª Tirada Lliga Catalana de Sala 2025/2026',  disc:'Sala – 18m',   date:'15-16 nov 2025',  dateISO:'2025-11-15', loc:'Manresa / Torrefarrera (Lleida)',   status:'closed', circ:'#',         url:'#',                                                ianseo:25272},
  {id:33,type:'trd',  title:'3D en Línia 1ª Tirada 2025/2026',             disc:'3D',    date:'1-2 nov 2025',    dateISO:'2025-11-01', loc:'En línia (clubs participants)',      status:'closed', circ:'#',         url:'#',                                                ianseo:'CAT3DLA'},
  {id:34,type:'trd',  title:'1ª Tirada Lliga Catalana 3D 2025/2026',       disc:'3D',    date:'26 oct 2025',     dateISO:'2025-10-26', loc:'Pardines (Girona)',                  status:'closed', circ:'#',         url:'#',                                                ianseo:'CAT3D26A'},
  {id:35,type:'sala', title:'2ª Tirada Lliga Catalana de Sala 2025/2026',  disc:'Sala – 18m',   date:'18-19 oct 2025',  dateISO:'2025-10-18', loc:'Constantí / Torrefarrera (Lleida)', status:'closed', circ:'#',         url:'#',                                                ianseo:24861},
  {id:36,type:'al',   title:'1ª Trobada Lliga Inicia\'t 2025/2026',        disc:'Aire Lliure',  date:'11 oct 2025',     dateISO:'2025-10-11', loc:'Montcada i Reixac',                  status:'closed', circ:'#',         url:'#',                                                ianseo:'INICIA25'},
  {id:37,type:'sala', title:'1ª Tirada Lliga Catalana de Sala 2025/2026',  disc:'Sala – 18m',   date:'4-5 oct 2025',    dateISO:'2025-10-04', loc:'Constantí (Tarragona)',              status:'closed', circ:'#',         url:'#',                                                ianseo:24680},
  {id:38,type:'al',   title:'XXXII Trofeu Ciutat de Lleida – III Copa Pirineus – IV Memorial Alfred Piñol', disc:'Aire Lliure', date:'27-28 set 2025', dateISO:'2025-09-27', loc:'Lleida (Pardinyes)',   status:'closed', circ:'#', url:'#', ianseo:23781},
  {id:39,type:'al',   title:'XXII Copa Barcelona Femenina – XXXV Trofeu Mercè Esportiva', disc:'Aire Lliure', date:'28 set 2025', dateISO:'2025-09-28', loc:'Barcelona (Montjuïc)',       status:'closed', circ:'#', url:'#', ianseo:'CamCF25'},
  {id:40,type:'al',   title:'XXI Campionat de Catalunya de Round 900 – XII Memorial Jordi Adell', disc:'Aire Lliure', date:'6-7 set 2025', dateISO:'2025-09-06', loc:'Barcelona (Montjuïc)', status:'closed', circ:'#', url:'#', ianseo:24295},
  // ── Temporada 2026-27 ────────────────────────────────────
  // 3D en Línia
  {id:101,type:'trd', title:'1ª Tirada Lliga Catalana 3D en Línia 2026/27', disc:'3D', date:'18 oct 2026',    dateISO:'2026-10-18', loc:'Per determinar', status:'soon', circ:'CIRC-2627', url:'#'},
  {id:102,type:'trd', title:'2ª Tirada Lliga Catalana 3D en Línia 2026/27', disc:'3D', date:'15 nov 2026',    dateISO:'2026-11-15', loc:'Per determinar', status:'soon', circ:'CIRC-2627', url:'#'},
  {id:103,type:'trd', title:'3ª Tirada Lliga Catalana 3D en Línia 2026/27', disc:'3D', date:'13 des 2026',    dateISO:'2026-12-13', loc:'Per determinar', status:'soon', circ:'CIRC-2627', url:'#'},
  {id:104,type:'trd', title:'Campionat de Catalunya de 3D en Línia 2026/27', disc:'3D', date:'10 gen 2027',   dateISO:'2027-01-10', loc:'Per determinar', status:'soon', circ:'CIRC-2627', url:'#'},
  {id:105,type:'trd', title:'Campionat d\'Espanya 3D Sala',                  disc:'3D', date:'22-24 gen 2027', dateISO:'2027-01-22', loc:'Per determinar', status:'soon', circ:'#',         url:'#'},
  // Sala
  {id:106,type:'sala',title:'1ª Tirada Lliga Catalana de Sala 2026/27',     disc:'Sala – 18m', date:'24-25 oct 2026',  dateISO:'2026-10-24', loc:'Per determinar', status:'soon', circ:'CIRC-2634', url:'#'},
  {id:107,type:'sala',title:'2ª Tirada Lliga Catalana de Sala 2026/27',     disc:'Sala – 18m', date:'21-22 nov 2026',  dateISO:'2026-11-21', loc:'Per determinar', status:'soon', circ:'CIRC-2634', url:'#'},
  {id:108,type:'sala',title:'3ª Tirada Lliga Catalana de Sala 2026/27',     disc:'Sala – 18m', date:'19-20 des 2026',  dateISO:'2026-12-19', loc:'Per determinar', status:'soon', circ:'CIRC-2634', url:'#'},
  {id:109,type:'sala',title:'Campionat de Catalunya de Sala + Clubs 2026/27',disc:'Sala – 18m', date:'16-17 gen 2027',  dateISO:'2027-01-16', loc:'Per determinar', status:'soon', circ:'CIRC-2634', url:'#'},
  {id:110,type:'sala',title:'Campionat d\'Espanya TNL Sala',                 disc:'Sala – 18m', date:'22-24 gen 2027',  dateISO:'2027-01-22', loc:'Per determinar', status:'soon', circ:'#',         url:'#'},
  {id:111,type:'sala',title:'Campionat d\'Espanya RC Sala',                  disc:'Sala – 18m', date:'4-7 feb 2027',    dateISO:'2027-02-04', loc:'Per determinar', status:'soon', circ:'#',         url:'#'},
  // Camp
  {id:112,type:'camp',title:'1ª Tirada Lliga Catalana de Camp 2026/27',     disc:'Tir de Camp', date:'31 gen 2027',    dateISO:'2027-01-31', loc:'Per determinar', status:'soon', circ:'CIRC-2636', url:'#'},
  {id:113,type:'camp',title:'2ª Tirada Lliga Catalana de Camp 2026/27',     disc:'Tir de Camp', date:'28 feb 2027',    dateISO:'2027-02-28', loc:'Per determinar', status:'soon', circ:'CIRC-2636', url:'#'},
  {id:114,type:'camp',title:'3ª Tirada Lliga Catalana de Camp 2026/27',     disc:'Tir de Camp', date:'18 abr 2027',    dateISO:'2027-04-18', loc:'Per determinar', status:'soon', circ:'CIRC-2636', url:'#'},
  {id:115,type:'camp',title:'Campionat de Catalunya de Camp 2026/27',       disc:'Tir de Camp', date:'16 mai 2027',    dateISO:'2027-05-16', loc:'Per determinar', status:'soon', circ:'CIRC-2636', url:'#'},
  {id:116,type:'camp',title:'Campionat d\'Espanya de Camp',                  disc:'Tir de Camp', date:'4-6 jun 2027',   dateISO:'2027-06-04', loc:'Per determinar', status:'soon', circ:'#',         url:'#'},
  // 3D
  {id:117,type:'3d',  title:'1ª Tirada Lliga Catalana de 3D 2026/27',       disc:'3D', date:'14 feb 2027',    dateISO:'2027-02-14', loc:'Per determinar', status:'soon', circ:'CIRC-2635', url:'#'},
  {id:118,type:'3d',  title:'2ª Tirada Lliga Catalana de 3D 2026/27',       disc:'3D', date:'14 mar 2027',    dateISO:'2027-03-14', loc:'Per determinar', status:'soon', circ:'CIRC-2635', url:'#'},
  {id:119,type:'3d',  title:'3ª Tirada Lliga Catalana de 3D 2026/27',       disc:'3D', date:'11 abr 2027',    dateISO:'2027-04-11', loc:'Per determinar', status:'soon', circ:'CIRC-2635', url:'#'},
  {id:120,type:'3d',  title:'Campionat de Catalunya de 3D 2026/27',         disc:'3D', date:'9 mai 2027',     dateISO:'2027-05-09', loc:'Per determinar', status:'soon', circ:'CIRC-2635', url:'#'},
  {id:121,type:'3d',  title:'Campionat d\'Espanya de 3D',                    disc:'3D', date:'21-23 mai 2027', dateISO:'2027-05-21', loc:'Per determinar', status:'soon', circ:'#',         url:'#'},
  // Aire Lliure
  {id:122,type:'al',  title:'1ª Tirada Lliga Catalana d\'Aire Lliure 2026/27', disc:'Aire Lliure', date:'20-21 mar 2027', dateISO:'2027-03-20', loc:'Per determinar', status:'soon', circ:'CIRC-2633', url:'#'},
  {id:123,type:'al',  title:'2ª Tirada Lliga Catalana d\'Aire Lliure 2026/27', disc:'Aire Lliure', date:'24-25 abr 2027', dateISO:'2027-04-24', loc:'Per determinar', status:'soon', circ:'CIRC-2633', url:'#'},
  {id:124,type:'al',  title:'3ª Tirada Lliga Catalana d\'Aire Lliure 2026/27', disc:'Aire Lliure', date:'29-30 mai 2027', dateISO:'2027-05-29', loc:'Per determinar', status:'soon', circ:'CIRC-2633', url:'#'},
  {id:125,type:'al',  title:'Campionat de Catalunya d\'Aire Lliure + Clubs 2026/27', disc:'Aire Lliure', date:'3-4 jul 2027', dateISO:'2027-07-03', loc:'Per determinar', status:'soon', circ:'CIRC-2637', url:'#'},
  {id:126,type:'al',  title:'Campionat d\'Espanya TDL',                      disc:'Aire Lliure', date:'17-18 jul 2027', dateISO:'2027-07-17', loc:'Per determinar', status:'soon', circ:'#', url:'#'},
  {id:127,type:'al',  title:'Campionat d\'Espanya de Menors',                 disc:'Aire Lliure', date:'21-23 jul 2027', dateISO:'2027-07-21', loc:'Per determinar', status:'soon', circ:'#', url:'#'},
  {id:128,type:'al',  title:'Campionat d\'Espanya RC',                        disc:'Aire Lliure', date:'23-25 jul 2027', dateISO:'2027-07-23', loc:'Per determinar', status:'soon', circ:'#', url:'#'},
  // ── Temporada 2024-25 (desembre 2024) ────────────────────
  {id:27,type:'sala', title:'57è Campionat de Catalunya de Sala 2024-25',  disc:'Sala – 18m',   date:'14-15 des 2024',  dateISO:'2024-12-14', loc:'Constantí (Tarragona)',            status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CATSA25X', ianseo:'CATSA25X'},
  {id:28,type:'sala', title:'4ª Lliga Catalana Sala (2024-25) – R.A.U.S.', disc:'Sala – 18m',   date:'7-8 des 2024',    dateISO:'2024-12-07', loc:'Terrassa (Barcelona)',             status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CATSA25D', ianseo:'CATSA25D'},
  {id:29,type:'trd',  title:'2ª Lliga Catalana 3D 2024-25',                disc:'3D',    date:'1 des 2024',      dateISO:'2024-12-01', loc:'Caldes de Montbui (Barcelona)',    status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CAT3D25B', ianseo:'CAT3D25B'},
],

// --- NOTÍCIES ---
news: [
  {id:12,cat:'PAT',title:'El CAR Sant Cugat acull la 5ª jornada del Programa Autonòmic de Tecnificació',date:'20 jun 2026',desc:'Arquers i arqueres U15, U18 i U21 es reuneixen al CAR de Sant Cugat en una jornada de seguiment i treball tècnic dirigida per Lluís Culí.',img:'img/news/noticia12.jpg',url:'#news:12'},
  {id:11,cat:'Aire Lliure',title:'El 76è Campionat de Catalunya d\'Aire Lliure reuneix més de 165 esportistes a Barcelona',date:'5 jul 2026',desc:'19 equips i 28 clubs d\'arreu del territori omplen el camp de tir en una competició individual i per equips de gran nivell, malgrat la calor.',img:'img/news/noticia8.jpeg',url:'#news:11'},
  {id:10,cat:'Arc Adaptat',title:'Final de la Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut',date:'15 jun 2026',desc:'La Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut tanca la seva primera edició al Arc Vng amb un èxit de participació creixent.',img:'img/news/noticia10.jpeg',url:'#news:10'},
  {id:9,cat:'Camp',title:'Catalunya aconsegueix 10 medalles al Campionat d\'Espanya de Camp 2026',date:'8 jun 2026',desc:'La delegació catalana torna de Hoyos del Espino amb 10 medalles: 5 ors, 3 plates i 2 bronzes.',img:'img/news/noticia9.jpeg',url:'#news:9'},
  {id:8,cat:'Aire Lliure',title:'Més de 150 esportistes a la 3a i última tirada de la Lliga Catalana d\'Aire Lliure',date:'1 jun 2026',desc:'Barcelona i Esclanà acollen la 3a tirada que tanca la lliga i prepara els arquers per al Campionat de Catalunya (4-5 juliol).',img:'img/news/noticia8.jpeg',url:'#news:8'},
  {id:7,cat:'3D',title:'3 medalles per Catalunya al Campionat d\'Espanya 3D 2026',date:'24 mai 2026',desc:'25 representants catalans competeixen a Astúries i tornen amb 3 medalles, encapçalades per Maria Pitarch, subcampiona en Compost Dona.',img:'img/news/noticia7.jpeg',url:'#news:7'},
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
  {id:101, disc:'al',    nom:'WA Llibre 3 – Tir sobre diana (Aire Lliure i Sala)', url:'https://www.worldarchery.sport/rulebook',       icon:'📘'},
  {id:102, disc:'al',    nom:'Reglament de Competicions FCTA v1.6',                url:'docs/REGLAMENT_COMPETICIONS_v1.6.pdf',           icon:'📋'},
  {id:103, disc:'al',    nom:'Distàncies i papers Aire Lliure i Sala',             url:'docs/Distancies_Papers_AL_Sala.pdf',             icon:'📐'},
  {id:104, disc:'al',    nom:'Rècords AL – Recorbat i Compost (agost 2024)',       url:'docs/Records_AL_Recorbat_Compost_2024.pdf',      icon:'🏆'},
  {id:105, disc:'al',    nom:'Rècords AL – Tradicional, Nu i Longbow',            url:'docs/Records_AL_Tradicional_Nu_Longbow.pdf',     icon:'🏆'},
  {id:106, disc:'al',    nom:'Rècords Sala (març 2024)',                           url:'docs/Records_Sala_2024.pdf',                     icon:'🏆'},
  {id:107, disc:'al',    nom:'Rècords Menors',                                     url:'docs/Records_Menors_2021.pdf',                   icon:'🏆'},
  {id:108, disc:'al',    nom:'Rànquing Final Lliga AL 2024',                       url:'docs/Ranquing_Lliga_AL_2024.pdf',                icon:'📊'},
  {id:109, disc:'al',    nom:'Rànquing Final Lliga Sala 2023/24',                  url:'docs/Ranquing_Lliga_Sala_2023-24.pdf',           icon:'📊'},
  // ── 3D / Bosc ────────────────────────────────────────────
  {id:201, disc:'3d',    nom:'WA Llibre 4 – Tir de Camp i 3D',                    url:'https://www.worldarchery.sport/rulebook',       icon:'📘'},
  {id:202, disc:'3d',    nom:'Reglament de Competicions FCTA v1.6',                url:'docs/REGLAMENT_COMPETICIONS_v1.6.pdf',           icon:'📋'},
  {id:203, disc:'3d',    nom:'Rànquing Final 3D 2024/25',                          url:'docs/Ranquing_Lliga_3D_2024-25.pdf',             icon:'📊'},
  {id:204, disc:'3d',    nom:'Rànquing Final 3D 2023/24',                          url:'docs/Ranquing_Lliga_3D_2023-24.pdf',             icon:'📊'},
  // ── Tir de Camp ──────────────────────────────────────────
  {id:301, disc:'camp',  nom:'WA Llibre 4 – Tir de Camp i 3D',                    url:'https://www.worldarchery.sport/rulebook',       icon:'📘'},
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

// --- RÈCORDS DE CATALUNYA ---
// Font única de veritat. Camps: id, disc, estil, cat, sex, format, marca, atleta, competicio, data
// disc: 'sala' | 'al' | 'aa'
// Actualitzat: Sala mar.2024 · AL recorbat+compost ago.2024 · AL trad+nu+longbow mar.2024 · Arc Adaptat jul.2021
records: [
  // ── SALA – Arc Recorbat ─────────────────────────────────────
  { id:1,   disc:'sala', estil:'Recorbat',    cat:'Prebenjamí', sex:'Dona', format:'12m/30fl', marca:290, atleta:'Claudia García Balmaseda',    competicio:'Campionat de Catalunya',        data:'27/01/2018' },
  { id:2,   disc:'sala', estil:'Recorbat',    cat:'Prebenjamí', sex:'Dona', format:'12m/60fl', marca:476, atleta:'Mar Beguí Abadias',            competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:3,   disc:'sala', estil:'Recorbat',    cat:'Prebenjamí', sex:'Home', format:'12m/30fl', marca:282, atleta:'Jan Dominguez González',        competicio:'3ª Tirada de Sala',             data:'27/11/2016' },
  { id:4,   disc:'sala', estil:'Recorbat',    cat:'Prebenjamí', sex:'Home', format:'12m/60fl', marca:488, atleta:'Pablo González Hernández',      competicio:'3ª Tirada de Sala',             data:'19/12/2021' },
  { id:5,   disc:'sala', estil:'Recorbat',    cat:'Benjamí',    sex:'Dona', format:'12m/30fl', marca:295, atleta:'Leire García Callejón',         competicio:'1ª Tirada de Sala',             data:'28/10/2017' },
  { id:6,   disc:'sala', estil:'Recorbat',    cat:'Benjamí',    sex:'Dona', format:'12m/60fl', marca:539, atleta:'Laura Molina Carrillo',         competicio:'2ª Tirada de Sala',             data:'05/11/2023' },
  { id:7,   disc:'sala', estil:'Recorbat',    cat:'Benjamí',    sex:'Home', format:'12m/30fl', marca:296, atleta:'Ahmad-Iassin Pérez',            competicio:'1ª Tirada de Sala',             data:'27/10/2013' },
  { id:8,   disc:'sala', estil:'Recorbat',    cat:'Benjamí',    sex:'Home', format:'12m/60fl', marca:577, atleta:'Daniel Molina Serret',          competicio:'Campionat de Catalunya',        data:'17/12/2023' },
  { id:9,   disc:'sala', estil:'Recorbat',    cat:'Aleví',      sex:'Dona', format:'18m/30fl', marca:296, atleta:'Laia Marimón',                  competicio:'3ª Tirada de Sala',             data:'18/12/2011' },
  { id:10,  disc:'sala', estil:'Recorbat',    cat:'Aleví',      sex:'Dona', format:'18m/60fl', marca:582, atleta:'Lucía Ramos Valiente',          competicio:'1ª Tirada de Sala',             data:'28/10/2017' },
  { id:11,  disc:'sala', estil:'Recorbat',    cat:'Aleví',      sex:'Home', format:'18m/30fl', marca:293, atleta:'Daniel Pardina García',         competicio:'1ª Tirada de Sala',             data:'29/10/2016' },
  { id:12,  disc:'sala', estil:'Recorbat',    cat:'Aleví',      sex:'Home', format:'18m/60fl', marca:584, atleta:'Arnau Peña Cervelló',           competicio:'XLIV Ct. Catalunya',            data:'30/01/2011' },
  { id:13,  disc:'sala', estil:'Recorbat',    cat:'Sub-15',     sex:'Dona', format:'18m/30fl', marca:295, atleta:'Alba Tarragó Bulete',           competicio:'1ª Tirada de Sala',             data:'28/10/2018' },
  { id:14,  disc:'sala', estil:'Recorbat',    cat:'Sub-15',     sex:'Dona', format:'18m/60fl', marca:587, atleta:'Alba Tarragó Bulete',           competicio:'1ª Tirada de Sala',             data:'28/10/2018' },
  { id:15,  disc:'sala', estil:'Recorbat',    cat:'Sub-15',     sex:'Home', format:'18m/30fl', marca:299, atleta:'Jordi Cubiró',                  competicio:'1ª Tirada de Sala',             data:'17/10/2010' },
  { id:16,  disc:'sala', estil:'Recorbat',    cat:'Sub-15',     sex:'Home', format:'18m/60fl', marca:591, atleta:'Jordi Cubiró',                  competicio:'3ª Tirada de Sala',             data:'19/12/2010' },
  { id:17,  disc:'sala', estil:'Recorbat',    cat:'Sub-18',     sex:'Dona', format:'18m/30fl', marca:292, atleta:'Lucia Ramos Valiente',          competicio:"Campionat d'Espanya",           data:'22/02/2022' },
  { id:18,  disc:'sala', estil:'Recorbat',    cat:'Sub-18',     sex:'Dona', format:'18m/60fl', marca:580, atleta:'Lucia Ramos Valiente',          competicio:"Campionat d'Espanya",           data:'22/02/2022' },
  { id:19,  disc:'sala', estil:'Recorbat',    cat:'Sub-18',     sex:'Home', format:'18m/30fl', marca:289, atleta:'Conrad Guerra',                 competicio:'Trofeu de Nadal',               data:'16/12/2012' },
  { id:20,  disc:'sala', estil:'Recorbat',    cat:'Sub-18',     sex:'Home', format:'18m/60fl', marca:569, atleta:'Álvaro Salmerón',               competicio:'Trofeu de Nadal',               data:'13/12/2009' },
  { id:21,  disc:'sala', estil:'Recorbat',    cat:'Sub-21',     sex:'Dona', format:'18m/30fl', marca:295, atleta:'Elia Canales Martin',           competicio:'Campionat de Catalunya',        data:'22/12/2019' },
  { id:22,  disc:'sala', estil:'Recorbat',    cat:'Sub-21',     sex:'Dona', format:'18m/60fl', marca:583, atleta:'Elia Canales Martin',           competicio:'Campionat de Catalunya',        data:'22/12/2019' },
  { id:23,  disc:'sala', estil:'Recorbat',    cat:'Sub-21',     sex:'Home', format:'18m/30fl', marca:294, atleta:'Arnau Peña Cervelló',           competicio:'4a Lliga Catalana',             data:'17/12/2017' },
  { id:24,  disc:'sala', estil:'Recorbat',    cat:'Sub-21',     sex:'Home', format:'18m/60fl', marca:582, atleta:'Arnau Peña Cervelló',           competicio:'4a Lliga Catalana',             data:'17/12/2017' },
  { id:25,  disc:'sala', estil:'Recorbat',    cat:'Sènior',     sex:'Dona', format:'18m/30fl', marca:297, atleta:'Lucia Ramos Valiente',          competicio:"Campionat d'Espanya",           data:'22/02/2022' },
  { id:26,  disc:'sala', estil:'Recorbat',    cat:'Sènior',     sex:'Dona', format:'18m/60fl', marca:585, atleta:'Elia Canales Martin',           competicio:"Campionat d'Espanya",           data:'22/02/2022' },
  { id:27,  disc:'sala', estil:'Recorbat',    cat:'Sènior',     sex:'Home', format:'18m/30fl', marca:297, atleta:'Miquel Àngel Pifarré',          competicio:"Campionat d'Espanya",           data:'03/02/2019' },
  { id:28,  disc:'sala', estil:'Recorbat',    cat:'Sènior',     sex:'Home', format:'18m/60fl', marca:589, atleta:'Arnau Peña Cervelló',           competicio:'Campionat de Catalunya',        data:'22/12/2019' },
  { id:29,  disc:'sala', estil:'Recorbat',    cat:'+50',        sex:'Dona', format:'18m/30fl', marca:257, atleta:'Montserrat Ros Hermosilla',     competicio:'Campionat de Catalunya',        data:'27/01/2019' },
  { id:30,  disc:'sala', estil:'Recorbat',    cat:'+50',        sex:'Dona', format:'18m/60fl', marca:511, atleta:'Begoña Perez Gomez',             competicio:'58è Campionat de Catalunya de Sala', data:'31/01/2026' },
  { id:31,  disc:'sala', estil:'Recorbat',    cat:'+50',        sex:'Home', format:'18m/30fl', marca:283, atleta:'Luis Miguel Ramos Calleja',     competicio:'Tournoi International Nimes',   data:'20/01/2019' },
  { id:32,  disc:'sala', estil:'Recorbat',    cat:'+50',        sex:'Home', format:'18m/60fl', marca:562, atleta:'Luis Miguel Ramos Calleja',     competicio:'Tournoi International Nimes',   data:'20/01/2019' },
  // ── SALA – Arc Compost ──────────────────────────────────────
  { id:33,  disc:'sala', estil:'Compost',     cat:'Prebenjamí', sex:'Home', format:'12m/60fl', marca:183, atleta:'Daniel Rubio Colmenero',        competicio:'3ª Tirada de Sala',             data:'19/12/2010' },
  { id:34,  disc:'sala', estil:'Compost',     cat:'Aleví',      sex:'Dona', format:'18m/30fl', marca:280, atleta:'Neus Mill López',               competicio:'Campionat de Catalunya',        data:'08/03/2009' },
  { id:35,  disc:'sala', estil:'Compost',     cat:'Aleví',      sex:'Dona', format:'18m/60fl', marca:545, atleta:'Neus Mill López',               competicio:'Campionat de Catalunya',        data:'08/03/2009' },
  { id:36,  disc:'sala', estil:'Compost',     cat:'Aleví',      sex:'Home', format:'18m/30fl', marca:292, atleta:'Gabriel Postigo Vitoria',       competicio:'3ª Tirada de Sala',             data:'21/11/2015' },
  { id:37,  disc:'sala', estil:'Compost',     cat:'Aleví',      sex:'Home', format:'18m/60fl', marca:582, atleta:'Guillem Figueres',              competicio:'Trofeu de Nadal',               data:'16/12/2007' },
  { id:38,  disc:'sala', estil:'Compost',     cat:'Sub-15',     sex:'Dona', format:'18m/30fl', marca:271, atleta:'Ani Navarro Cortés',            competicio:'3ª Tirada de Sala',             data:'27/11/2022' },
  { id:39,  disc:'sala', estil:'Compost',     cat:'Sub-15',     sex:'Dona', format:'18m/60fl', marca:542, atleta:'Ani Navarro Cortés',            competicio:'3ª Tirada de Sala',             data:'27/11/2022' },
  { id:40,  disc:'sala', estil:'Compost',     cat:'Sub-15',     sex:'Home', format:'18m/30fl', marca:299, atleta:'Guillem Figueres',              competicio:'Campionat de Catalunya',        data:'08/03/2009' },
  { id:41,  disc:'sala', estil:'Compost',     cat:'Sub-15',     sex:'Home', format:'18m/60fl', marca:597, atleta:'Guillem Figueres',              competicio:'Campionat de Catalunya',        data:'30/01/2011' },
  { id:42,  disc:'sala', estil:'Compost',     cat:'Sub-18',     sex:'Dona', format:'18m/30fl', marca:277, atleta:'Núria Sinfreu Abad',            competicio:'2ª Tirada de Sala',             data:'14/11/2021' },
  { id:43,  disc:'sala', estil:'Compost',     cat:'Sub-18',     sex:'Dona', format:'18m/60fl', marca:544, atleta:'Núria Sinfreu Abad',            competicio:'2ª Tirada de Sala',             data:'14/11/2021' },
  { id:44,  disc:'sala', estil:'Compost',     cat:'Sub-18',     sex:'Home', format:'18m/30fl', marca:290, atleta:'Santiago López Padilla',        competicio:'1ª Tirada de Sala',             data:'19/10/2014' },
  { id:45,  disc:'sala', estil:'Compost',     cat:'Sub-18',     sex:'Home', format:'18m/60fl', marca:572, atleta:'Santiago López Padilla',        competicio:'1ª Tirada de Sala',             data:'19/10/2014' },
  { id:46,  disc:'sala', estil:'Compost',     cat:'Sub-21',     sex:'Dona', format:'18m/30fl', marca:281, atleta:'Enia Garcia',                   competicio:'1ª Tirada de Sala',             data:'17/10/2010' },
  { id:47,  disc:'sala', estil:'Compost',     cat:'Sub-21',     sex:'Dona', format:'18m/60fl', marca:558, atleta:'Núria Sinfreu Abad',             competicio:'4ª Tirada Lliga Catalana de Sala 2025/2026 – Constantí', data:'06/12/2025' },
  { id:48,  disc:'sala', estil:'Compost',     cat:'Sub-21',     sex:'Home', format:'18m/30fl', marca:290, atleta:'Santiago López Padilla',        competicio:'1ª Tirada de Sala',             data:'19/10/2014' },
  { id:49,  disc:'sala', estil:'Compost',     cat:'Sub-21',     sex:'Home', format:'18m/60fl', marca:574, atleta:'Edgar Brocal',                  competicio:'Ct. Catalunya',                 data:'17/01/2010' },
  { id:50,  disc:'sala', estil:'Compost',     cat:'Sènior',     sex:'Dona', format:'18m/30fl', marca:292, atleta:'Lucía Rodríguez Coutado',       competicio:'3ª Tirada de Sala',             data:'27/11/2016' },
  { id:51,  disc:'sala', estil:'Compost',     cat:'Sènior',     sex:'Dona', format:'18m/60fl', marca:580, atleta:'Maria Pitarch Laguna',          competicio:'Nimes Archery Tournament 2024', data:'21/01/2024' },
  { id:52,  disc:'sala', estil:'Compost',     cat:'Sènior',     sex:'Home', format:'18m/30fl', marca:297, atleta:'Jordi Ricart Roig',             competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:53,  disc:'sala', estil:'Compost',     cat:'Sènior',     sex:'Home', format:'18m/60fl', marca:590, atleta:'César Gómez',                   competicio:'Ct. Provincial',                data:'03/02/2008' },
  { id:54,  disc:'sala', estil:'Compost',     cat:'+50',        sex:'Dona', format:'18m/30fl', marca:287, atleta:'Ester Semis Astier',            competicio:'2ª Tirada Lliga Sala 2023/24',  data:'05/11/2023' },
  { id:55,  disc:'sala', estil:'Compost',     cat:'+50',        sex:'Dona', format:'18m/60fl', marca:567, atleta:'Ester Semis Astier',            competicio:'2ª Tirada Lliga Sala 2023/24',  data:'05/11/2023' },
  { id:56,  disc:'sala', estil:'Compost',     cat:'+50',        sex:'Home', format:'18m/30fl', marca:292, atleta:'Basili García',                 competicio:'5ª Tirada de Sala',             data:'15/01/2017' },
  { id:57,  disc:'sala', estil:'Compost',     cat:'+50',        sex:'Home', format:'18m/60fl', marca:582, atleta:'Basili García',                 competicio:'5ª Tirada de Sala',             data:'15/01/2017' },
  // ── SALA – Arc Nu ───────────────────────────────────────────
  { id:58,  disc:'sala', estil:'Arc Nu',      cat:'Prebenjamí', sex:'Dona', format:'12m/30fl', marca:241, atleta:'Elsa Hernández Torras',         competicio:'4a Tirada de Sala',             data:'16/12/2018' },
  { id:59,  disc:'sala', estil:'Arc Nu',      cat:'Prebenjamí', sex:'Home', format:'12m/30fl', marca:274, atleta:'Eloi Iglesias',                 competicio:'Campionat de Catalunya',        data:'08/03/2009' },
  { id:60,  disc:'sala', estil:'Arc Nu',      cat:'Prebenjamí', sex:'Home', format:'12m/60fl', marca:454, atleta:'Aleix Ucha Homedes',            competicio:'1ª Tirada de Sala',             data:'22/10/2023' },
  { id:61,  disc:'sala', estil:'Arc Nu',      cat:'Benjamí',    sex:'Home', format:'12m/30fl', marca:294, atleta:'Eloi Iglesias',                 competicio:'Ct. Prov. Barcelona',           data:'27/02/2011' },
  { id:62,  disc:'sala', estil:'Arc Nu',      cat:'Benjamí',    sex:'Home', format:'12m/60fl', marca:555, atleta:'Lucas Lafforge Hubert',         competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:63,  disc:'sala', estil:'Arc Nu',      cat:'Aleví',      sex:'Dona', format:'18m/30fl', marca:277, atleta:"Estel·la Carnau Raventós",      competicio:'4ª Tirada de Sala',             data:'18/12/2022' },
  { id:64,  disc:'sala', estil:'Arc Nu',      cat:'Aleví',      sex:'Dona', format:'18m/60fl', marca:529, atleta:"Estel·la Carnau Raventós",      competicio:'4ª Tirada de Sala',             data:'18/12/2022' },
  { id:65,  disc:'sala', estil:'Arc Nu',      cat:'Aleví',      sex:'Home', format:'12m/30fl', marca:284, atleta:'Mario Ruiz Lorente',            competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:66,  disc:'sala', estil:'Arc Nu',      cat:'Aleví',      sex:'Home', format:'12m/60fl', marca:555, atleta:'Mario Ruiz Lorente',            competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:67,  disc:'sala', estil:'Arc Nu',      cat:'Sub-15',     sex:'Dona', format:'12m/30fl', marca:255, atleta:'Emma Aragón Bolufer',           competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:68,  disc:'sala', estil:'Arc Nu',      cat:'Sub-15',     sex:'Dona', format:'12m/60fl', marca:483, atleta:'Maelyn Macías Martin',          competicio:'2ª Tirada de Sala',             data:'05/11/2023' },
  { id:69,  disc:'sala', estil:'Arc Nu',      cat:'Sub-15',     sex:'Home', format:'12m/30fl', marca:285, atleta:'Miquel Morera López',           competicio:'1ª Tirada de Sala',             data:'24/10/2021' },
  { id:70,  disc:'sala', estil:'Arc Nu',      cat:'Sub-15',     sex:'Home', format:'12m/60fl', marca:544, atleta:'Víctor Rodríguez Camacho',      competicio:'4ª Tirada de Sala',             data:'18/12/2022' },
  { id:71,  disc:'sala', estil:'Arc Nu',      cat:'Sub-18',     sex:'Dona', format:'18m/30fl', marca:202, atleta:'Irina López Serra',             competicio:'2ª Tirada de Sala',             data:'05/11/2022' },
  { id:72,  disc:'sala', estil:'Arc Nu',      cat:'Sub-18',     sex:'Dona', format:'18m/60fl', marca:377, atleta:'Myriam Jiménez Cot',           competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:73,  disc:'sala', estil:'Arc Nu',      cat:'Sub-18',     sex:'Home', format:'18m/30fl', marca:243, atleta:'Dídac Romero Sendrós',         competicio:'1ª Tirada de Sala',             data:'22/10/2023' },
  { id:74,  disc:'sala', estil:'Arc Nu',      cat:'Sub-18',     sex:'Home', format:'18m/60fl', marca:441, atleta:'Dídac Romero Sendrós',         competicio:'4ª Tirada de Sala',             data:'10/12/2023' },
  { id:75,  disc:'sala', estil:'Arc Nu',      cat:'Sub-21',     sex:'Dona', format:'18m/30fl', marca:193, atleta:'Blanca Romero Mila',           competicio:'2ª Tirada de Sala',             data:'10/11/2019' },
  { id:76,  disc:'sala', estil:'Arc Nu',      cat:'Sub-21',     sex:'Dona', format:'18m/60fl', marca:375, atleta:'Blanca Romero Mila',           competicio:'2ª Tirada de Sala',             data:'10/11/2019' },
  { id:77,  disc:'sala', estil:'Arc Nu',      cat:'Sub-21',     sex:'Home', format:'18m/30fl', marca:235, atleta:'Alfredo Rodriguez Castaño',    competicio:'1ª Tirada de Sala',             data:'24/10/2021' },
  { id:78,  disc:'sala', estil:'Arc Nu',      cat:'Sub-21',     sex:'Home', format:'18m/60fl', marca:465, atleta:'Dídac Romero Sendrós',         competicio:'Campionat de Catalunya',        data:'17/12/2023' },
  { id:79,  disc:'sala', estil:'Arc Nu',      cat:'Sènior',     sex:'Dona', format:'18m/30fl', marca:267, atleta:'Carme Sanchez Amado',          competicio:'Campionat de Catalunya',        data:'17/12/2023' },
  { id:80,  disc:'sala', estil:'Arc Nu',      cat:'Sènior',     sex:'Dona', format:'18m/60fl', marca:528, atleta:'Carme Sanchez Amado',          competicio:'Campionat de Catalunya',        data:'17/12/2023' },
  { id:81,  disc:'sala', estil:'Arc Nu',      cat:'Sènior',     sex:'Home', format:'18m/30fl', marca:280, atleta:'David García Fernández',       competicio:'Campionat de Catalunya',        data:'17/12/2023' },
  { id:82,  disc:'sala', estil:'Arc Nu',      cat:'Sènior',     sex:'Home', format:'18m/60fl', marca:552, atleta:'David García Fernández',       competicio:'2ª Tirada de Sala',             data:'14/11/2021' },
  { id:83,  disc:'sala', estil:'Arc Nu',      cat:'+50',        sex:'Dona', format:'18m/30fl', marca:225, atleta:'Annabel Morales Rojo',         competicio:'4ª Tirada de Sala',             data:'15/12/2019' },
  { id:84,  disc:'sala', estil:'Arc Nu',      cat:'+50',        sex:'Dona', format:'18m/60fl', marca:485, atleta:'Laura Dorado Escalera',          competicio:'2ª Tirada Lliga Catalana de Sala 2025/2026 – Torrefarrera', data:'19/10/2025' },
  { id:85,  disc:'sala', estil:'Arc Nu',      cat:'+50',        sex:'Home', format:'18m/30fl', marca:259, atleta:'Joan Garcia Marchena',         competicio:'3ª Tirada de Sala',             data:'27/11/2022' },
  { id:86,  disc:'sala', estil:'Arc Nu',      cat:'+50',        sex:'Home', format:'18m/60fl', marca:508, atleta:'Miguel Ramirez Moreno',        competicio:'Campionat de Catalunya',        data:'17/12/2023' },
  // ── SALA – Tradicional ──────────────────────────────────────
  { id:87,  disc:'sala', estil:'Tradicional', cat:'Prebenjamí', sex:'Dona', format:'12m/60fl', marca:508, atleta:'Carla Ruiz Lorente',           competicio:'2ª Tirada Lliga Catalana',      data:'05/11/2023' },
  { id:88,  disc:'sala', estil:'Tradicional', cat:'Benjamí',    sex:'Home', format:'12m/30fl', marca:252, atleta:'Didac Porta Valldosera',       competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:89,  disc:'sala', estil:'Tradicional', cat:'Benjamí',    sex:'Home', format:'12m/60fl', marca:579, atleta:'Guerau Montes Barnils',          competicio:'58è Campionat de Catalunya de Sala', data:'31/01/2026' },
  { id:90,  disc:'sala', estil:'Tradicional', cat:'Aleví',      sex:'Home', format:'18m/30fl', marca:222, atleta:'Yusuf Delclós Urat',           competicio:'1ª Tirada de Sala',             data:'09/10/2022' },
  { id:91,  disc:'sala', estil:'Tradicional', cat:'Aleví',      sex:'Home', format:'18m/60fl', marca:502, atleta:'Tian Gual Pocurull',             competicio:'3ª Tirada Lliga Catalana de Sala 2025/2026 – Manresa', data:'15/11/2025' },
  { id:92,  disc:'sala', estil:'Tradicional', cat:'Sub-15',     sex:'Dona', format:'18m/30fl', marca:196, atleta:'Olivia Laplana Mora',          competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:93,  disc:'sala', estil:'Tradicional', cat:'Sub-15',     sex:'Dona', format:'18m/60fl', marca:333, atleta:'Olivia Laplana Mora',          competicio:'Campionat de Catalunya',        data:'14/01/2023' },
  { id:94,  disc:'sala', estil:'Tradicional', cat:'Sub-18',     sex:'Dona', format:'18m/30fl', marca:234, atleta:'Ainhoa Bolancel Bejarano',     competicio:'3ª Tirada de Sala',             data:'27/11/2022' },
  { id:95,  disc:'sala', estil:'Tradicional', cat:'Sub-18',     sex:'Dona', format:'18m/60fl', marca:445, atleta:'Ainhoa Bolancel Bejarano',     competicio:'3ª Tirada de Sala',             data:'27/11/2022' },
  { id:96,  disc:'sala', estil:'Tradicional', cat:'Sub-18',     sex:'Home', format:'18m/30fl', marca:238, atleta:'Manel Del Rosal Gelonch',      competicio:'4ª Tirada de Sala',             data:'17/12/2022' },
  { id:97,  disc:'sala', estil:'Tradicional', cat:'Sub-18',     sex:'Home', format:'18m/60fl', marca:464, atleta:'Manel Del Rosal Gelonch',      competicio:'4ª Tirada de Sala',             data:'17/12/2022' },
  { id:98,  disc:'sala', estil:'Tradicional', cat:'Sub-21',     sex:'Dona', format:'18m/30fl', marca:186, atleta:'Carla Bordes Nicolás',         competicio:'4ª Tirada de Sala',             data:'17/12/2022' },
  { id:99,  disc:'sala', estil:'Tradicional', cat:'Sub-21',     sex:'Dona', format:'18m/60fl', marca:371, atleta:'Carla Bordes Nicolás',         competicio:'4ª Tirada de Sala',             data:'17/12/2022' },
  { id:100, disc:'sala', estil:'Tradicional', cat:'Sènior',     sex:'Dona', format:'18m/30fl', marca:281, atleta:'Miriam Monfort Fernández',     competicio:'4ª Tirada de Sala',             data:'09/12/2023' },
  { id:101, disc:'sala', estil:'Tradicional', cat:'Sènior',     sex:'Dona', format:'18m/60fl', marca:563, atleta:'Ana Lorente Molero',             competicio:'4ª Tirada Lliga Catalana de Sala 2025/2026 – Constantí', data:'06/12/2025' },
  { id:102, disc:'sala', estil:'Tradicional', cat:'Sènior',     sex:'Home', format:'18m/30fl', marca:294, atleta:'Juanjo Querol Guardiola',      competicio:'1ª Tirada de Sala',             data:'24/10/2021' },
  { id:103, disc:'sala', estil:'Tradicional', cat:'Sènior',     sex:'Home', format:'18m/60fl', marca:586, atleta:'Juanjo Querol Guardiola',      competicio:'1ª Tirada de Sala',             data:'24/10/2021' },
  { id:104, disc:'sala', estil:'Tradicional', cat:'+50',        sex:'Dona', format:'18m/30fl', marca:236, atleta:'María Ester Pina Loren',       competicio:'3ª Tirada de Sala',             data:'19/11/2023' },
  { id:105, disc:'sala', estil:'Tradicional', cat:'+50',        sex:'Dona', format:'18m/60fl', marca:466, atleta:'María Ester Pina Loren',       competicio:'Campionat de Catalunya',        data:'17/12/2023' },
  { id:106, disc:'sala', estil:'Tradicional', cat:'+50',        sex:'Home', format:'18m/30fl', marca:281, atleta:'José García Gómez',            competicio:'2ª Tirada de Sala',             data:'06/11/2022' },
  { id:107, disc:'sala', estil:'Tradicional', cat:'+50',        sex:'Home', format:'18m/60fl', marca:572, atleta:'Jorge Rueda Castro',             competicio:'3ª Tirada Lliga Catalana de Sala 2025/2026 – Manresa', data:'15/11/2025' },
  // ── SALA – Longbow ──────────────────────────────────────────
  { id:108, disc:'sala', estil:'Longbow',     cat:'Prebenjamí', sex:'Dona', format:'12m/30fl', marca:231, atleta:'Claudia García Balmaseda',    competicio:'4ª Tirada de Sala',             data:'17/12/2016' },
  { id:109, disc:'sala', estil:'Longbow',     cat:'Prebenjamí', sex:'Home', format:'12m/30fl', marca:241, atleta:'Ot Guillamet',                competicio:'Ct. Catalunya Menors',          data:'18/01/2015' },
  { id:110, disc:'sala', estil:'Longbow',     cat:'Benjamí',    sex:'Dona', format:'12m/30fl', marca:246, atleta:'Noa Catalan López',            competicio:'1ª Tirada de Sala',             data:'25/10/2015' },
  { id:111, disc:'sala', estil:'Longbow',     cat:'Benjamí',    sex:'Home', format:'12m/30fl', marca:237, atleta:'Ot Guillaumet Mongrell',        competicio:'Campionat de Catalunya',        data:'24/01/2016' },
  { id:112, disc:'sala', estil:'Longbow',     cat:'Aleví',      sex:'Dona', format:'12m/30fl', marca:200, atleta:'Alicia Grau Valdivieso',       competicio:'2ª Tirada de Sala',             data:'05/11/2022' },
  { id:113, disc:'sala', estil:'Longbow',     cat:'Aleví',      sex:'Dona', format:'12m/60fl', marca:384, atleta:'Alicia Grau Valdivieso',       competicio:'2ª Tirada de Sala',             data:'05/11/2022' },
  { id:114, disc:'sala', estil:'Longbow',     cat:'Sub-15',     sex:'Dona', format:'12m/30fl', marca:145, atleta:'Alicia Grau Valdivieso',       competicio:'2ª Tirada de Sala',             data:'05/11/2023' },
  { id:115, disc:'sala', estil:'Longbow',     cat:'Sub-15',     sex:'Dona', format:'18m/60fl', marca:343, atleta:'Aina Mula Mata',                competicio:'2ª Tirada Lliga Catalana de Sala 2025/2026 – Constantí', data:'18/10/2025' },
  { id:116, disc:'sala', estil:'Longbow',     cat:'Sub-18',     sex:'Home', format:'18m/30fl', marca:234, atleta:'Vicenç Carretero Caracena',    competicio:'1ª Tirada de Sala',             data:'09/10/2022' },
  { id:117, disc:'sala', estil:'Longbow',     cat:'Sub-18',     sex:'Home', format:'18m/60fl', marca:465, atleta:'Vicenç Carretero Caracena',    competicio:'1ª Tirada de Sala',             data:'09/10/2022' },
  { id:118, disc:'sala', estil:'Longbow',     cat:'Sub-21',     sex:'Home', format:'18m/30fl', marca:210, atleta:'Genis Petit Cantero',          competicio:'1ª Tirada de Sala',             data:'09/10/2022' },
  { id:119, disc:'sala', estil:'Longbow',     cat:'Sub-21',     sex:'Home', format:'18m/60fl', marca:413, atleta:'Genis Petit Cantero',          competicio:'1ª Tirada de Sala',             data:'09/10/2022' },
  { id:120, disc:'sala', estil:'Longbow',     cat:'Sènior',     sex:'Dona', format:'18m/30fl', marca:271, atleta:'Rosa Martínez Ochoa',          competicio:'Campionat de Catalunya',        data:'17/12/2023' },
  { id:121, disc:'sala', estil:'Longbow',     cat:'Sènior',     sex:'Dona', format:'18m/60fl', marca:534, atleta:'Mireia Comas Franch',            competicio:'3ª Tirada Lliga Catalana de Sala 2025/2026 – Manresa', data:'15/11/2025' },
  { id:122, disc:'sala', estil:'Longbow',     cat:'Sènior',     sex:'Home', format:'18m/30fl', marca:280, atleta:'Enrique Flores Delgado',       competicio:'3ª Tirada de Sala',             data:'19/12/2021' },
  { id:123, disc:'sala', estil:'Longbow',     cat:'Sènior',     sex:'Home', format:'18m/60fl', marca:545, atleta:'Enrique Flores Delgado',       competicio:'3ª Tirada de Sala',             data:'19/12/2021' },
  { id:124, disc:'sala', estil:'Longbow',     cat:'+50',        sex:'Home', format:'18m/30fl', marca:270, atleta:'Miguel Ángel Cabedo Capdevila',competicio:'3ª Tirada de Sala',             data:'27/11/2022' },
  { id:125, disc:'sala', estil:'Longbow',     cat:'+50',        sex:'Home', format:'18m/60fl', marca:539, atleta:'Miguel Ángel Cabedo Capdevila',competicio:'3ª Tirada de Sala',             data:'27/11/2022' },
  // ── SALA – Nous rècords temporada 2025-26 (categories sense rècord previ) ──
  { id:720, disc:'sala', estil:'Longbow',     cat:'Aleví',      sex:'Home', format:'18m/60fl', marca:446, atleta:'Tor Mula Mata',                competicio:'2ª Tirada Lliga Catalana de Sala 2025/2026 – Constantí',    data:'18/10/2025' },
  { id:721, disc:'sala', estil:'Tradicional', cat:'Benjamí',    sex:'Dona', format:'12m/60fl', marca:530, atleta:'Carla Ruiz Lorente',           competicio:'58è Campionat de Catalunya de Sala',                        data:'31/01/2026' },
  { id:722, disc:'sala', estil:'Tradicional', cat:'Sub-15',     sex:'Home', format:'18m/60fl', marca:453, atleta:'Biel Catalan Villalbi',        competicio:'58è Campionat de Catalunya de Sala',                        data:'31/01/2026' },
  // ── SALA – Estàndard ────────────────────────────────────────
  { id:126, disc:'sala', estil:'Estàndard',   cat:'Sènior',     sex:'Home', format:'18m/30fl', marca:291, atleta:'Lluis Quintilla',              competicio:'1ª Class. de Sala',             data:'02/11/2003' },
  { id:127, disc:'sala', estil:'Estàndard',   cat:'Sènior',     sex:'Home', format:'18m/60fl', marca:586, atleta:'Lluis Quintilla',              competicio:'Trofeu Hivern',                 data:'14/12/2003' },
  { id:128, disc:'sala', estil:'Estàndard',   cat:'Sènior',     sex:'Dona', format:'18m/30fl', marca:280, atleta:'Laura Maria Suarez Garrote',   competicio:'1ª Tirada de Sala',             data:'27/10/2019' },
  { id:129, disc:'sala', estil:'Estàndard',   cat:'Sènior',     sex:'Dona', format:'18m/60fl', marca:550, atleta:'Manuela Toro Cortés',          competicio:'3ª Tirada de Sala',             data:'21/11/2015' },
  { id:130, disc:'sala', estil:'Estàndard',   cat:'+50',        sex:'Home', format:'18m/60fl', marca:468, atleta:'Jordi Edo Vilar',              competicio:'2ª Tirada de Sala',             data:'07/11/2015' },
  { id:131, disc:'sala', estil:'Estàndard',   cat:'Sub-21',     sex:'Dona', format:'18m/30fl', marca:251, atleta:'Victòria Leoz Munté',          competicio:'Campt. Prov. Tarragona',        data:'10/01/2016' },
  { id:132, disc:'sala', estil:'Estàndard',   cat:'Sub-21',     sex:'Dona', format:'18m/60fl', marca:496, atleta:'Victòria Leoz Munté',          competicio:'3a Tirada de Sala',             data:'22/11/2014' },
  { id:133, disc:'sala', estil:'Estàndard',   cat:'Sub-18',     sex:'Dona', format:'18m/60fl', marca:458, atleta:'Claudia Aubets Rius',          competicio:'3ª Tirada de Sala',             data:'23/11/2019' },
  { id:134, disc:'sala', estil:'Estàndard',   cat:'Sub-15',     sex:'',     format:'18m/60fl', marca:415, atleta:'Aram Alcobe Serarals',         competicio:'1ª Tirada de Sala',             data:'25/10/2015' },

  // ── AIRE LLIURE – Recorbat Round 720 ───────────────────────
  { id:200, disc:'al',   estil:'Recorbat',    cat:'Prebenjamí', sex:'Dona', format:'Round 720 (12+12m)', marca:666, atleta:'Claudia García Balmaseda',  competicio:'IV Copa Femenina',              data:'08/10/2017' },
  { id:201, disc:'al',   estil:'Recorbat',    cat:'Prebenjamí', sex:'Home', format:'Round 720 (12+12m)', marca:608, atleta:'Pablo González Hernández',  competicio:'3a Lliga Catalana',             data:'21/05/2022' },
  { id:202, disc:'al',   estil:'Recorbat',    cat:'Benjamí',    sex:'Dona', format:'Round 720 (18+18m)', marca:698, atleta:'Claudia García Balmaseda',  competicio:'V Copa Femenina',               data:'30/09/2018' },
  { id:203, disc:'al',   estil:'Recorbat',    cat:'Benjamí',    sex:'Home', format:'Round 720 (18+18m)', marca:597, atleta:'Jan Domínguez González',    competicio:'Futurs Campions',               data:'09/09/2018' },
  { id:204, disc:'al',   estil:'Recorbat',    cat:'Aleví',      sex:'Dona', format:'Round 720 (30+30m)', marca:667, atleta:'Ainara García Balmaseda',   competicio:'V Copa Femenina',               data:'30/09/2018' },
  { id:205, disc:'al',   estil:'Recorbat',    cat:'Aleví',      sex:'Home', format:'Round 720 (30+30m)', marca:642, atleta:'Arnau Borrull Solanes',     competicio:'1a Lliga Catalana',             data:'01/03/2020' },
  { id:206, disc:'al',   estil:'Recorbat',    cat:'Sub-15',     sex:'Dona', format:'Round 720 (40+40m)', marca:672, atleta:'Lucía Ramos Valiente',      competicio:'2a Lliga Catalana',             data:'31/03/2019' },
  { id:207, disc:'al',   estil:'Recorbat',    cat:'Sub-15',     sex:'Home', format:'Round 720 (40+40m)', marca:667, atleta:'Joan Arnal Selga',          competicio:'XXVI Trofeu Ciutat Lleida',     data:'07/10/2018' },
  { id:208, disc:'al',   estil:'Recorbat',    cat:'Sub-18',     sex:'Dona', format:'Round 720 (60+60m)', marca:665, atleta:'Elia Canales Martin',       competicio:'4a Lliga Catalana',             data:'05/05/2018' },
  { id:209, disc:'al',   estil:'Recorbat',    cat:'Sub-18',     sex:'Home', format:'Round 720 (60+60m)', marca:667, atleta:'Álvaro Salmerón González',  competicio:'2a Liga Nacional Cadete',       data:'03/07/2010' },
  { id:210, disc:'al',   estil:'Recorbat',    cat:'Sub-21',     sex:'Dona', format:'Round 720 (70+70m)', marca:674, atleta:'Elia Canales Martin',       competicio:'6è Classificatori Equip Nac.',  data:'23/03/2019' },
  { id:211, disc:'al',   estil:'Recorbat',    cat:'Sub-21',     sex:'Home', format:'Round 720 (70+70m)', marca:655, atleta:'Arnau Peña Cervelló',       competicio:'Futurs Campions',               data:'09/09/2018' },
  { id:212, disc:'al',   estil:'Recorbat',    cat:'Sènior',     sex:'Dona', format:'Round 720 (70+70m)', marca:674, atleta:'Elia Canales Martin',       competicio:'6è Classificatori Equip Nac.',  data:'23/03/2019' },
  { id:213, disc:'al',   estil:'Recorbat',    cat:'Sènior',     sex:'Home', format:'Round 720 (70+70m)', marca:679, atleta:'Miquel Àngel Pifarré',      competicio:'2a Lliga Catalana',             data:'31/03/2019' },
  { id:214, disc:'al',   estil:'Recorbat',    cat:'+50',        sex:'Home', format:'Round 720 (60+60m)', marca:629, atleta:'Manuel Hernández Higuera',  competicio:'4a Lliga Catalana',             data:'28/05/2023' },
  // ── AIRE LLIURE – Recorbat Fita 1440 ───────────────────────
  { id:215, disc:'al',   estil:'Recorbat',    cat:'Sènior',     sex:'Dona', format:'Fita 1440',          marca:1284,atleta:'María Pitarch Laguna',      competicio:'XXVII Trofeu Ciutat Lleida',    data:'07/10/2018' },
  { id:216, disc:'al',   estil:'Recorbat',    cat:'Sènior',     sex:'Home', format:'Fita 1440',          marca:1291,atleta:'Josep Reche',               competicio:'Trofeu Ciutat Barcelona',       data:'03/04/1999' },
  { id:217, disc:'al',   estil:'Recorbat',    cat:'Sub-18',     sex:'Home', format:'Fita 1440',          marca:1252,atleta:'Arnau Peña Cervelló',       competicio:'Trofeu Miguel Soto',            data:'23/06/2013' },
  { id:218, disc:'al',   estil:'Recorbat',    cat:'Sub-18',     sex:'Dona', format:'Fita 1440',          marca:1263,atleta:'Laura Pardina García',      competicio:'Ciutat de Lleida',              data:'25/09/2016' },
  { id:219, disc:'al',   estil:'Recorbat',    cat:'Sub-21',     sex:'Home', format:'Fita 1440',          marca:1262,atleta:'Miquel Àngel Pifarré',      competicio:"European Junior Archery",       data:'30/06/2009' },
  { id:220, disc:'al',   estil:'Recorbat',    cat:'Sub-21',     sex:'Dona', format:'Fita 1440',          marca:1245,atleta:'María Pitarch Laguna',      competicio:'Ciutat de Lleida',              data:'22/09/2019' },
  { id:221, disc:'al',   estil:'Recorbat',    cat:'+50',        sex:'Home', format:'Fita 1440',          marca:1269,atleta:"Lluís Culé Llagostera",      competicio:"Ct. d'Espanya Veterans",        data:'23/05/2010' },
  { id:222, disc:'al',   estil:'Recorbat',    cat:'+50',        sex:'Dona', format:'Fita 1440',          marca:1030,atleta:'Laura Suarez Garrote',      competicio:'Ciutat Lleida',                 data:'17/09/2022' },
  // ── AIRE LLIURE – Compost Round 720 ────────────────────────
  { id:230, disc:'al',   estil:'Compost',     cat:'Benjamí',    sex:'Home', format:'Round 720 (18+18m)', marca:663, atleta:'Unai García Callejón',      competicio:'2a Lliga Catalana',             data:'30/05/2021' },
  { id:231, disc:'al',   estil:'Compost',     cat:'Aleví',      sex:'Dona', format:'Round 720 (30+30m)', marca:660, atleta:'Núria Sinfreu Abad',        competicio:'V Copa Femenina',               data:'30/09/2018' },
  { id:232, disc:'al',   estil:'Compost',     cat:'Aleví',      sex:'Home', format:'Round 720 (30+30m)', marca:632, atleta:'Martí Serra Trencanska',    competicio:'3a Lliga Catalana',             data:'30/04/2023' },
  { id:233, disc:'al',   estil:'Compost',     cat:'Sub-15',     sex:'Dona', format:'Round 720 (50+50m)', marca:611, atleta:'Núria Sinfreu Abad',        competicio:'1a Lliga Catalana',             data:'01/03/2020' },
  { id:234, disc:'al',   estil:'Compost',     cat:'Sub-15',     sex:'Home', format:'Round 720 (50+50m)', marca:531, atleta:'Isaac Marquez Cot',         competicio:'5a Lliga Catalana',             data:'09/06/2018' },
  { id:235, disc:'al',   estil:'Compost',     cat:'Sub-18',     sex:'Dona', format:'Round 720 (50+50m)', marca:622, atleta:'Núria Sinfreu Abad',        competicio:'2a Lliga Catalana',             data:'30/05/2021' },
  { id:236, disc:'al',   estil:'Compost',     cat:'Sub-18',     sex:'Home', format:'Round 720 (50+50m)', marca:623, atleta:'Santiago López Padilla',    competicio:'2a Lliga Catalana',             data:'24/05/2014' },
  { id:237, disc:'al',   estil:'Compost',     cat:'Sub-21',     sex:'Dona', format:'Round 720 (50+50m)', marca:601, atleta:'Anna Floriach Llobera',     competicio:'Ct. Provincial BCN',            data:'07/05/2011' },
  { id:238, disc:'al',   estil:'Compost',     cat:'Sub-21',     sex:'Home', format:'Round 720 (50+50m)', marca:687, atleta:'Jordi Ricart Roig',         competicio:'European Youth Championships',   data:'20/08/2022' },
  { id:239, disc:'al',   estil:'Compost',     cat:'Sènior',     sex:'Dona', format:'Round 720 (50+50m)', marca:684, atleta:'Lucía Rodríguez Coutado',   competicio:'2a Lliga Catalana',             data:'30/05/2021' },
  { id:240, disc:'al',   estil:'Compost',     cat:'Sènior',     sex:'Home', format:'Round 720 (50+50m)', marca:705, atleta:'César Gómez Serra',         competicio:'Ct. Provincial Barcelona',      data:'24/04/2016' },
  { id:241, disc:'al',   estil:'Compost',     cat:'+50',        sex:'Dona', format:'Round 720 (50+50m)', marca:676, atleta:'Elena García Muñoz',        competicio:'Ciutat de Terrassa',            data:'08/07/2012' },
  { id:242, disc:'al',   estil:'Compost',     cat:'+50',        sex:'Home', format:'Round 720 (50+50m)', marca:673, atleta:'Rafael Lijarcio Vergara',   competicio:'Ct. Provincial Lleida',         data:'05/05/2013' },
  // ── AIRE LLIURE – Compost Fita 1440 ────────────────────────
  { id:243, disc:'al',   estil:'Compost',     cat:'Sènior',     sex:'Dona', format:'Fita 1440',          marca:1388,atleta:'Lucia Rodriguez Coutado',   competicio:'Ciutat de Lleida',              data:'17/09/2022' },
  { id:244, disc:'al',   estil:'Compost',     cat:'Sènior',     sex:'Home', format:'Fita 1440',          marca:1392,atleta:'César Gómez',               competicio:'GP Lleida',                     data:'11/05/2007' },
  { id:245, disc:'al',   estil:'Compost',     cat:'Sub-18',     sex:'Home', format:'Fita 1440',          marca:1310,atleta:'Santiago López Padilla',    competicio:'Trofeu Ciutat de Lleida',       data:'28/09/2014' },
  { id:246, disc:'al',   estil:'Compost',     cat:'Sub-18',     sex:'Dona', format:'Fita 1440',          marca:1237,atleta:'Núria Sinfreu Abad',        competicio:'Ciutat de Lleida',              data:'17/09/2022' },
  { id:247, disc:'al',   estil:'Compost',     cat:'Sub-21',     sex:'Home', format:'Fita 1440',          marca:1306,atleta:'Edgar Brocal',              competicio:'Perez Frances',                 data:'12/07/2009' },
  { id:248, disc:'al',   estil:'Compost',     cat:'+50',        sex:'Home', format:'Fita 1440',          marca:1389,atleta:'Josep Brocal Mañas',        competicio:'Ciutat de Lleida',              data:'26/09/2021' },
  { id:249, disc:'al',   estil:'Compost',     cat:'+50',        sex:'Dona', format:'Fita 1440',          marca:1344,atleta:'Ester Semis Astier',        competicio:"Ct. d'Espanya Veterans",        data:'09/06/2019' },
  // ── AIRE LLIURE – Tradicional (nova reglamentació 2020) ────
  { id:260, disc:'al',   estil:'Tradicional', cat:'Prebenjamí', sex:'Home', format:'12m/72fl',           marca:367, atleta:'Pol Orduña Monfort',        competicio:'XVI Futurs Campions',           data:'08/09/2019' },
  { id:261, disc:'al',   estil:'Tradicional', cat:'Prebenjamí', sex:'Dona', format:'12m/72fl',           marca:506, atleta:'Guiomar Batalla Ramirez',   competicio:'IV Copa Femenina',              data:'08/10/2017' },
  { id:262, disc:'al',   estil:'Tradicional', cat:'Benjamí',    sex:'Dona', format:'Round 720',          marca:582, atleta:'Carla Ruiz Lorente',          competicio:'3ª Tirada Lliga Catalana Aire Lliure 2026 (Montjuïc/Barcelona)', data:'30/05/2026' },
  { id:263, disc:'al',   estil:'Tradicional', cat:'Sub-15',     sex:'Dona', format:'20m/72fl',           marca:573, atleta:'Ainhoa Bolancel Bejarano',  competicio:'Futurs Campions',               data:'18/09/2022' },
  { id:264, disc:'al',   estil:'Tradicional', cat:'Sub-15',     sex:'Home', format:'20m/72fl',           marca:587, atleta:'Alex Icke Martínez',        competicio:'Campionat de Catalunya',        data:'09/07/2023' },
  { id:265, disc:'al',   estil:'Tradicional', cat:'Sub-18',     sex:'Home', format:'30m/72fl',           marca:499, atleta:'Manel Del Rosal Gelonch',   competicio:'1a Lliga Catalana',             data:'05/03/2023' },
  { id:266, disc:'al',   estil:'Tradicional', cat:'Sub-18',     sex:'Dona', format:'30m/72fl',           marca:518, atleta:'Ainhoa Bolancel Bejarano',  competicio:'1a Lliga Catalana',             data:'05/03/2023' },
  { id:267, disc:'al',   estil:'Tradicional', cat:'Sub-21',     sex:'Dona', format:'30m/72fl',           marca:309, atleta:'Carla Bordes Nicolás',      competicio:'2a Lliga Catalana',             data:'30/04/2022' },
  { id:268, disc:'al',   estil:'Tradicional', cat:'Sènior',     sex:'Home', format:'30m/72fl',           marca:642, atleta:'Juanjo Querol Guardiola',   competicio:'1a Lliga Catalana',             data:'03/10/2021' },
  { id:269, disc:'al',   estil:'Tradicional', cat:'Sènior',     sex:'Dona', format:'30m/72fl',           marca:614, atleta:'Miriam Monfort Fernández',  competicio:'Campionat de Catalunya',        data:'17/07/2021' },
  { id:271, disc:'al',   estil:'Tradicional', cat:'+50',        sex:'Dona', format:'30m/72fl',           marca:326, atleta:'Yolanda Iniesta Martínez',  competicio:'2a Lliga Catalana',             data:'30/05/2021' },
  // ── AIRE LLIURE – Arc Nu (nova reglamentació 2020) ─────────
  { id:280, disc:'al',   estil:'Arc Nu',      cat:'Prebenjamí', sex:'Home', format:'12m/72fl',           marca:578, atleta:'Aleix Ucha Homedes',        competicio:'2a Lliga Catalana',             data:'30/04/2023' },
  { id:281, disc:'al',   estil:'Arc Nu',      cat:'Benjamí',    sex:'Dona', format:'18m/72fl',           marca:513, atleta:'Emma Icke Martínez',        competicio:'3a Lliga Catalana',             data:'21/05/2022' },
  { id:282, disc:'al',   estil:'Arc Nu',      cat:'Benjamí',    sex:'Home', format:'18m/72fl',           marca:597, atleta:'Iu Rodríguez Jiménez',      competicio:'2a Lliga Catalana',             data:'01/04/2023' },
  { id:283, disc:'al',   estil:'Arc Nu',      cat:'Aleví',      sex:'Dona', format:'20m/72fl',           marca:596, atleta:"Estel·la Canau Raventós",   competicio:'Campionat de Catalunya',        data:'09/07/2023' },
  { id:284, disc:'al',   estil:'Arc Nu',      cat:'Aleví',      sex:'Home', format:'20m/72fl',           marca:666, atleta:'Mario Ruiz Lorente',        competicio:'Campionat de Catalunya',        data:'09/07/2023' },
  { id:285, disc:'al',   estil:'Arc Nu',      cat:'Sub-15',     sex:'Dona', format:'30m/72fl',           marca:559, atleta:'Laura Fernández Ill',       competicio:'1a Lliga Catalana',             data:'09/04/2022' },
  { id:286, disc:'al',   estil:'Arc Nu',      cat:'Sub-15',     sex:'Home', format:'30m/72fl',           marca:618, atleta:'Víctor David Rodríguez',    competicio:'1a Lliga Catalana',             data:'05/03/2023' },
  { id:287, disc:'al',   estil:'Arc Nu',      cat:'Sub-18',     sex:'Dona', format:'50m/72fl',           marca:423, atleta:'Andrea Arqué Valle',        competicio:'3a Lliga Catalana',             data:'20/06/2021' },
  { id:288, disc:'al',   estil:'Arc Nu',      cat:'Sub-18',     sex:'Home', format:'50m/72fl',           marca:414, atleta:'Miguel Montesinos Soriano', competicio:'1a Lliga Catalana',             data:'05/03/2023' },
  { id:289, disc:'al',   estil:'Arc Nu',      cat:'Sub-21',     sex:'Dona', format:'50m/72fl',           marca:306, atleta:'Noa Majó Ortuño',           competicio:'1a Lliga Catalana',             data:'09/04/2022' },
  { id:290, disc:'al',   estil:'Arc Nu',      cat:'Sub-21',     sex:'Home', format:'50m/72fl',           marca:351, atleta:'Eric Gracián Saavedra',     competicio:'3a Lliga Catalana',             data:'21/05/2022' },
  { id:291, disc:'al',   estil:'Arc Nu',      cat:'Sènior',     sex:'Home', format:'50m/72fl',           marca:652, atleta:'David García Fernández',    competicio:'1a Lliga Catalana',             data:'05/03/2023' },
  { id:292, disc:'al',   estil:'Arc Nu',      cat:'Sènior',     sex:'Dona', format:'50m/72fl',           marca:597, atleta:'Carmen Sanchez Amado',      competicio:'2a Lliga Catalana',             data:'12/05/2024' },
  { id:293, disc:'al',   estil:'Arc Nu',      cat:'+50',        sex:'Home', format:'50m/72fl',           marca:586, atleta:'Carles Peña Costa',         competicio:'4a Lliga Catalana',             data:'28/05/2023' },
  // ── AIRE LLIURE – Longbow (nova reglamentació 2020) ────────
  { id:300, disc:'al',   estil:'Longbow',     cat:'Prebenjamí', sex:'Dona', format:'12m/72fl',           marca:66,  atleta:'María Gil Horna',            competicio:'Futurs Campions',               data:'08/09/2019' },
  { id:301, disc:'al',   estil:'Longbow',     cat:'Aleví',      sex:'Dona', format:'20m/72fl',           marca:484, atleta:'Alicia Grau Baldivieso',    competicio:'1a Lliga Catalana',             data:'09/04/2022' },
  { id:302, disc:'al',   estil:'Longbow',     cat:'Sub-15',     sex:'Home', format:'20m/72fl',           marca:527, atleta:'Vicenç Carretero Caracena', competicio:'3a Lliga Catalana',             data:'21/05/2022' },
  { id:303, disc:'al',   estil:'Longbow',     cat:'Sub-18',     sex:'Home', format:'30m/72fl',           marca:412, atleta:'Erik Lahuerta Artieda',     competicio:'3a Lliga Catalana',             data:'30/04/2022' },
  { id:304, disc:'al',   estil:'Longbow',     cat:'Sènior',     sex:'Home', format:'30m/72fl',           marca:630, atleta:'Enrique Flores Delgado',    competicio:'Campionat de Catalunya',        data:'09/07/2023' },
  { id:305, disc:'al',   estil:'Longbow',     cat:'Sènior',     sex:'Dona', format:'Round 720',          marca:603, atleta:'Mireia Comas Franch',          competicio:'3ª Tirada Lliga Catalana Aire Lliure 2026 (Esclanyà/Girona)', data:'31/05/2026' },
  { id:306, disc:'al',   estil:'Longbow',     cat:'+50',        sex:'Home', format:'30m/72fl',           marca:581, atleta:'Miguel Ángel Cabedo',       competicio:'1a Lliga Catalana',             data:'05/03/2023' },
  // ── AL – Nous rècords temporada 2025-26 (categories sense rècord previ) ──
  { id:731, disc:'al',   estil:'Longbow',     cat:'Sub-21',     sex:'Dona', format:'Round 720', marca:321, atleta:'Enora Gonzalez Gutierrez',    competicio:'3ª Tirada Lliga Catalana Aire Lliure 2026 (Montjuïc/Barcelona)', data:'30/05/2026' },
  { id:732, disc:'al',   estil:'Tradicional', cat:'+50',        sex:'Home', format:'Round 720', marca:624, atleta:'David López Abad',            competicio:'2ª Tirada Lliga Catalana Aire Lliure 2026',                  data:'18/04/2026' },
  { id:733, disc:'al',   estil:'Tradicional', cat:'Aleví',      sex:'Home', format:'Round 720', marca:589, atleta:'Tian Gual Pocurull',          competicio:'3ª Tirada Lliga Catalana Aire Lliure 2026 (Montjuïc/Barcelona)', data:'30/05/2026' },
  { id:734, disc:'al',   estil:'Tradicional', cat:'Benjamí',    sex:'Home', format:'Round 720', marca:593, atleta:'Otger Montes Barnils',        competicio:'3ª Tirada Lliga Catalana Aire Lliure 2026 (Montjuïc/Barcelona)', data:'30/05/2026' },
  // ── ARC ADAPTAT – Sala ──────────────────────────────────────
  { id:400, disc:'aa',   estil:'Recorbat',    cat:'Sènior',     sex:'Home', format:'Sala 18m / WR2',     marca:546, atleta:'Jesús Martínez Leon',       competicio:'VII Ct. Catalunya',             data:'19/01/2014' },
  { id:401, disc:'aa',   estil:'Recorbat',    cat:'Sènior',     sex:'Home', format:'Sala 18m / ST',      marca:506, atleta:'Sergio Llamas Chicharro',   competicio:'VIII Ct. Espanya',              data:'19/02/2012' },
  { id:402, disc:'aa',   estil:'Recorbat',    cat:'Sènior',     sex:'Dona', format:'Sala 18m / ST',      marca:381, atleta:'Marta Alarcon Chillón',     competicio:'2a Lliga Catalana',             data:'13/11/2016' },
  { id:403, disc:'aa',   estil:'Recorbat',    cat:'Veterà',     sex:'Home', format:'Sala 18m / WR2',     marca:527, atleta:'Josep Lluís Amador',         competicio:'3a Lliga Catalana',             data:'22/11/2015' },
  { id:404, disc:'aa',   estil:'Compost',     cat:'Sènior',     sex:'Home', format:'Sala 18m / ST',      marca:571, atleta:'Jesús López González',       competicio:'2a Lliga Catalana',             data:'13/11/2016' },
  // ── ARC ADAPTAT – Aire Lliure ───────────────────────────────
  { id:410, disc:'aa',   estil:'Recorbat',    cat:'Sènior',     sex:'Home', format:'Fita 1400 / WR2',    marca:1201,atleta:'Josep Lluís Amador',         competicio:"Ct. d'Espanya",                 data:'03/07/1999' },
  { id:411, disc:'aa',   estil:'Recorbat',    cat:'Veterà',     sex:'Home', format:'Fita 1400 / WR2',    marca:1142,atleta:'Josep Lluís Amador',         competicio:"Ct. d'Espanya Veterans",        data:'20/03/2016' },
  { id:412, disc:'aa',   estil:'Recorbat',    cat:'Sènior',     sex:'Home', format:'70+70m / WR2',       marca:548, atleta:'Jesús Martínez Leon',       competicio:"Classificatori Ct. Europa",     data:'04/05/2014' },
  { id:413, disc:'aa',   estil:'Recorbat',    cat:'Veterà',     sex:'Home', format:'60+60m / WR2',       marca:602, atleta:'Josep Lluís Amador',         competicio:'Lliga Catalana',                data:'14/06/2017' },
  { id:414, disc:'aa',   estil:'Compost',     cat:'Sènior',     sex:'Home', format:'Fita 1440 / WR2',    marca:1289,atleta:'Jesús López González',       competicio:'Trofeu Miguel Soto',            data:'15/06/2014' },
  { id:415, disc:'aa',   estil:'Compost',     cat:'Sènior',     sex:'Home', format:'50+50m / WR2',       marca:669, atleta:'Jesús López González',       competicio:"Ct. d'Espanya Absolut",         data:'18/07/2015' },
],

// --- TIRADES SOCIALS (poblades via DB.tirades, veure abaix) ---
rounds: [],

// --- LLIGUES ---
lligues: [
  // ── Aire Lliure ──────────────────────────────────────────
  { id:1, disc:'al', nom:'Lliga Catalana Aire Lliure 2026', temporada:'2026',
    tirades:[{num:'1ª',compId:13},{num:'2ª',compId:11},{num:'3ª',compId:1}],
    ranquingUrl:'docs/Ranquing_Lliga_AL_2025-26.pdf',
    ranquingLabel:'Classificació Final Lliga AL 2025/26',
    historics:[
      {label:'Classificació Final AL 2025/26',url:'docs/Ranquing_Lliga_AL_2025-26.pdf'},
      {label:'Classificació Final AL 2025',   url:'docs/Ranquing_Lliga_AL_2025.pdf'},
      {label:'Classificació Final AL 2024',   url:'docs/Ranquing_Lliga_AL_2024.pdf'},
      {label:'Classificació Final AL 2023',   url:'docs/Ranquing_Lliga_AL_2023.pdf'}
    ]
  },
  { id:2, disc:'al', nom:"Lliga Catalana Aire Lliure 2026/27", temporada:'2026/27',
    tirades:[{num:'1ª',compId:122},{num:'2ª',compId:123},{num:'3ª',compId:124}],
    ranquingUrl:'#', ranquingLabel:'Rànquing Lliga AL 2026/27', historics:[]
  },
  // ── Sala ─────────────────────────────────────────────────
  { id:3, disc:'sala', nom:'Lliga Catalana de Sala 2025/2026', temporada:'2025–26',
    tirades:[
      {num:'1ª', data:'4–5 oct 2025',   lloc:'Constantí',                status:'closed', circ:'#', ianseo:'24680'},
      {num:'2ª', data:'18–19 oct 2025', lloc:'Constantí / Torrefarrera', status:'closed', circ:'#', ianseo:'24861', ianseo2:'24860'},
      {num:'3ª', data:'15–16 nov 2025', lloc:'Manresa / Torrefarrera',        status:'closed', circ:'#', ianseo:'25272', ianseo2:'25273'},
      {num:'4ª', data:'6–7 des 2025',   lloc:'Constantí',                status:'closed', circ:'#', ianseo:'25582'}
    ],
    ranquingUrl:'docs/LLIGA_CAT_SALA_25_26_CLASSIFICACIO_FINAL.pdf',
    ranquingLabel:'Classificació Final Lliga Sala 2025/26',
    historics:[
      {label:'Classificació Final Sala 2025/26', url:'docs/LLIGA_CAT_SALA_25_26_CLASSIFICACIO_FINAL.pdf'},
      {label:'Màster Indoor 2025',               url:'docs/Ranquing_Master_Indoor_2025.pdf'},
      {label:'Classificació Final Sala 2024/25', url:'docs/Ranquing_Lliga_Sala_2024-25.pdf'},
      {label:'Classificació Final Sala 2023/24', url:'docs/Ranquing_Lliga_Sala_2023-24.pdf'}
    ]
  },
  { id:4, disc:'sala', nom:'Lliga Catalana de Sala 2026/27', temporada:'2026–27',
    tirades:[{num:'1ª',compId:106},{num:'2ª',compId:107},{num:'3ª',compId:108}],
    ranquingUrl:'#', ranquingLabel:'Rànquing Lliga Sala 2026/27', historics:[]
  },
  // ── 3D ───────────────────────────────────────────────────
  { id:5, disc:'3d', nom:'Lliga Catalana 3D 2025/2026', temporada:'2025–26',
    tirades:[
      {num:'1ª', data:'18 gen 2026', lloc:'Sant Celoni',          status:'closed', circ:'#'},
      {num:'2ª', data:'22 feb 2026', lloc:'Olivella (Barcelona)', status:'closed', circ:'CIRC-2608'},
      {num:'3ª', data:'22 feb 2026', lloc:'Olivella',             status:'closed', circ:'#'},
      {num:'4ª', data:'12 abr 2026', lloc:'Castellnou del Bages', status:'closed', circ:'CIRC-2608'}
    ],
    ranquingUrl:'docs/Ranquing_Lliga_3D_2024-25.pdf',
    ranquingLabel:'Rànquing Lliga 3D 2024/25',
    historics:[
      {label:'Rànquing Final 3D 2024/25',       url:'docs/Ranquing_Lliga_3D_2024-25.pdf'},
      {label:'Rànquing Final 3D 2023/24',       url:'docs/Ranquing_Lliga_3D_2023-24.pdf'},
      {label:'Rànquing Provisional 3D 2023/24', url:'docs/Ranquing_Lliga_3D_2023-24_prov.pdf'}
    ]
  },
  { id:6, disc:'3d', nom:'Lliga Catalana 3D 2026/27', temporada:'2026/27',
    tirades:[{num:'1ª',compId:117},{num:'2ª',compId:118},{num:'3ª',compId:119}],
    ranquingUrl:'#', ranquingLabel:'Rànquing Lliga 3D 2026/27', historics:[]
  },
  // ── Camp ─────────────────────────────────────────────────
  { id:7, disc:'camp', nom:'Lliga Catalana de Camp 2025/2026', temporada:'2025–26',
    tirades:[
      {num:'1ª', data:'11 gen 2026', lloc:'Castellnou del Bages', status:'closed', circ:'CIRC-2615'},
      {num:'2ª', data:'8 mar 2026',  lloc:'Montcada i Reixac',    status:'closed', circ:'#'},
      {num:'3ª', data:'3 mai 2026',  lloc:'Montcada i Reixac',    status:'closed', circ:'#'}
    ],
    ranquingUrl:'docs/Ranquing_Lliga_Camp_2023-24.pdf',
    ranquingLabel:'Rànquing Lliga Camp 2023/24',
    historics:[
      {label:'Rànquing Lliga Camp 2023/24',       url:'docs/Ranquing_Lliga_Camp_2023-24.pdf'},
      {label:'Classificació Final Camp 2020/21',  url:'docs/Ranquing_Lliga_Camp_2020-21.pdf'}
    ]
  },
  { id:8, disc:'camp', nom:'Lliga Catalana de Camp 2026/27', temporada:'2026/27',
    tirades:[{num:'1ª',compId:112},{num:'2ª',compId:113},{num:'3ª',compId:114}],
    ranquingUrl:'#', ranquingLabel:'Rànquing Lliga Camp 2026/27', historics:[]
  },
  // ── Arc Adaptat ───────────────────────────────────────────
  { id:9, disc:'aa', nom:'Lliga Catalana Arc Adaptat 2025/2026', temporada:'2025–26',
    tirades:[
      {num:'1ª',   data:'nov 2025', lloc:'Olesa de Montserrat', status:'closed', circ:'#'},
      {num:'2ª',   data:'feb 2026', lloc:'Pendent',             status:'closed', circ:'#'},
      {num:'3ª',   data:'abr 2026', lloc:'Olesa de Montserrat', status:'closed', circ:'#'},
      {num:'Final',     data:'jun 2026', lloc:'Arc Vng',             status:'closed', circ:'#'}
    ],
    ranquingUrl:'#', ranquingLabel:'Classificació Final 2025/26', historics:[]
  }
],

// --- USUARIS DEL SISTEMA ---
users: [
  { id: 1, nom: 'Admin FCTA', email: 'admin@fcta.cat', rol: 'admin', actiu: true, totpSecret: null, totpEnabled: false, createdAt: '2024-01-01' }
]
};

// ============================================================
// LOOKUP MAPS
// bCls / bLbl are defined in config.js (FCTA.typeCls / FCTA.typeLabel)
// and aliased as var bCls / var bLbl for backward compatibility.
// ============================================================

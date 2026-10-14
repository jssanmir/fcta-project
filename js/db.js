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
  },
  13: {
    title: "Campionat d'Espanya d'Arc Recorbat i Compost en Sala 2024/2025",
    date: "11 de febrer de 2025",
    cat: "Sala",
    img: "img/news/noticia13.jpg",
    body: `<p>Del <strong>6 al 9 de febrer</strong> s'ha celebrat a <strong>Valladolid</strong> el Campionat d'Espanya d'Arc Recorbat i Compost en Sala 2024/2025.</p>
<p>Les categories més joves <strong>U15, U18 i U21</strong> van obrir el campionat dijous, amb la qualificació i les eliminatòries, finals individuals i per equips el divendres. Hi van participar <strong>23 esportistes de Catalunya</strong>.</p>
<ul><li><strong>Bronze</strong> per a l'equip d'arc compost U21, format per Nuria Sinfreu i Pau Barreda.</li><li><strong>4es posicions</strong> de l'equip femení d'arc recorbat U15 (Abril Godia, Maelyn Macías i Gloria Moreton) i de l'equip masculí recorbat U21 (Roc Rueda, Ian Serra i Gerard Safont), que van lluitar pel bronze.</li></ul>
<p>El <strong>8 i 9 de febrer</strong> va continuar el campionat per a les categories absolutes, amb <strong>25 esportistes catalans</strong>:</p>
<ul><li><strong>Plata</strong> per a Elia Canales en arc recorbat femení.</li><li><strong>Bronze</strong> per a l'equip femení d'arc compost: Nuria Sinfreu, Maria Pitarch i Alexandra Moura.</li></ul>
<p>Des de la FCTA felicitem tots els participants, tècnics i organitzadors per la seva dedicació i esforç.</p>`
  },
  14: {
    title: "3a Tirada de la Lliga Catalana de Camp 2024/2025",
    date: "16 de febrer de 2025",
    cat: "Camp",
    img: "img/news/noticia14.jpg",
    body: `<p>El passat <strong>16 de febrer</strong>, el <strong>Club de Tir amb Arc Caldes de Montbui</strong> va acollir la <strong>3a tirada de la Lliga Catalana de Camp</strong> 2024/2025, amb <strong>71 participants</strong> de <strong>17 clubs</strong> d'arreu de Catalunya.</p>
<p>La lliga de camp conclourà el <strong>16 de març a Mataró</strong> amb la 4a i última tirada.</p>
<p>Des de la FCTA volem agrair la participació de tots els esportistes i el suport dels organitzadors, clubs i voluntaris que fan possible aquesta lliga.</p>`
  },
  15: {
    title: "Finalitza la Lliga Catalana de 3D amb la quarta tirada a Rubí",
    date: "2 de març de 2025",
    cat: "3D",
    img: "img/news/noticia15.jpg",
    body: `<p>El diumenge <strong>2 de març de 2025</strong> es va celebrar la <strong>4a i última tirada de la Lliga Catalana 3D 2024/2025</strong> al <strong>Club Arqueros de Rubí</strong>, que ha marcat la cloenda de la lliga abans del Campionat de Catalunya de 3D, previst al Club Arc Zen del Bages (Castellnou del Bages).</p>
<p>Hi van competir <strong>100 arquers i arqueres</strong> de <strong>26 clubs</strong> d'arreu de Catalunya en un recorregut exigent que va posar a prova la seva precisió i concentració.</p>
<p>Amb aquesta tirada es tanca la classificació final de la lliga catalana 3D de la temporada 2024/2025.</p>`
  },
  16: {
    title: "Per una carrera sense obstacles – 8M, Dia Internacional de la Dona",
    date: "7 de març de 2025",
    cat: "Federació",
    img: "img/news/noticia16.jpg",
    body: `<p>El <strong>8 de març de 2025</strong>, en el marc del Dia Internacional de la Dona, la Federació Catalana de Tir amb Arc reafirma el seu compromís en la lluita contra qualsevol forma de discriminació envers les dones en tots els àmbits de la societat, defensant un futur basat en la igualtat de gènere i d'oportunitats.</p>
<p>Animem totes les dones vinculades a l'esport —directives, entrenadores, àrbitres, esportistes i voluntàries— a seguir endavant amb el compromís de liderar clubs, federacions i entitats esportives. <strong>Per una carrera sense obstacles!</strong></p>
<p>Des de la FCTA i la UFEC continuarem treballant per:</p>
<ul><li>Fer del nostre un sector encara més valuós.</li><li>Avançar fermament cap a la igualtat.</li><li>Fer créixer la participació femenina en l'esport.</li><li>Reforçar l'esport com a eina clau per a l'empoderament de les dones i el seu lideratge en la presa de decisions.</li></ul>`
  },
  17: {
    title: "Nou límit de temps per fletxa en competicions",
    date: "14 de març de 2025",
    cat: "Jutges",
    body: `<p>A partir d'aquesta temporada, en totes les competicions nacionals i catalanes (<strong>excepte les modalitats de camp, 3D i els campionats per a esportistes amb discapacitat</strong>), el temps disponible per tirar cada fletxa es redueix a <strong>30 segons</strong>. La norma s'aplica tant a la fase classificatòria com a l'eliminatòria, excepte a les finals amb tir altern.</p>
<p>La modificació afecta les Lligues Catalanes, els Campionats de Catalunya i els Campionats d'Espanya d'arc recorbat, compost, tradicional, nu i longbow, tant en sala com a l'aire lliure, així com els Grans Premis d'Espanya per a les categories absoluta, U21, U18 i U15.</p>
<p><strong>Exemples pràctics:</strong></p>
<ul><li><strong>Fase classificatòria:</strong> en tandes de 6 fletxes, el temps total serà de 180 segons (tres minuts) en lloc dels quatre minuts d'abans.</li><li><strong>Fase eliminatòria:</strong> en tandes de 3 fletxes, el temps total serà de 90 segons (un minut i mig) en lloc dels dos minuts anteriors.</li></ul>
<p>Aquest canvi busca agilitzar les competicions i unificar criteris amb altres circuits internacionals.</p>`
  },
  18: {
    title: "Conclou la Lliga Catalana de Tir de Camp 2024/2025",
    date: "19 de març de 2025",
    cat: "Camp",
    img: "img/news/noticia18.jpg",
    body: `<p>El diumenge <strong>16 de març</strong> va tenir lloc la <strong>4a i última tirada de la Lliga Catalana de Camp 2024/2025</strong>, a les instal·lacions del <strong>Tir Esportiu Mataró</strong>, amb <strong>55 esportistes</strong> de <strong>12 clubs</strong>.</p>
<p>Amb aquesta jornada es dona per finalitzada una edició de la lliga que s'ha disputat des d'octubre fins al març.</p>
<p>La propera cita de tir de camp serà el <strong>55è Campionat de Catalunya de Camp</strong>, l'1 de juny al Club Tir amb Arc Costa Brava 3D.</p>`
  },
  19: {
    title: "Inici de la temporada d'aire lliure amb la 1a tirada de la Lliga Catalana 2024/2025",
    date: "26 de març de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia19.jpg",
    body: `<p>El cap de setmana del <strong>22 i 23 de març</strong> va marcar l'inici de la temporada d'aire lliure amb la <strong>1a tirada de la Lliga Catalana d'Aire Lliure 2024/2025</strong>, a les instal·lacions del <strong>Club Tir amb Arc Pardinyes</strong> (Lleida).</p>
<p>Hi van competir <strong>230 arquers</strong> de <strong>33 clubs</strong> d'arreu de Catalunya. Malgrat la pluja, la competició es va poder desenvolupar amb èxit.</p>
<p>Amb aquesta primera tirada queda inaugurada la temporada d'aire lliure, amb quatre competicions de lliga fins al mes de juny.</p>`
  },
  20: {
    title: "Esclanyà acull la 3a tirada de la Lliga Catalana d'Aire Lliure",
    date: "30 d'abril de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia20.jpg",
    body: `<p>Diumenge <strong>27 d'abril</strong>, <strong>Esclanyà</strong> (Girona) va ser l'escenari de la 3a tirada de la Lliga Catalana d'Aire Lliure 2024/2025. La jornada es va desenvolupar en dos torns, matí i tarda, amb <strong>156 esportistes</strong> de <strong>27 clubs</strong> d'arreu de Catalunya.</p>
<p>L'esdeveniment va reunir arquers de totes les categories i divisions en una jornada de bon ambient, esportivitat i condicions meteorològiques favorables.</p>`
  },
  21: {
    title: "Jornada de portes obertes per la prevenció del limfedema amb tir amb arc",
    date: "7 de maig de 2025",
    cat: "Arc Adaptat",
    img: "img/news/noticia21.jpg",
    body: `<p>Us convidem a una jornada molt especial: coneix el projecte de <strong>prevenció del limfedema mitjançant el tir amb arc</strong>, pensat per a persones que han superat el càncer de mama.</p>
<p>📅 <strong>Diumenge 11 de maig</strong> · 🕥 <strong>10:30 h</strong><br>📍 <strong>Club Tir Arc Olesa</strong></p>
<p>Una sessió matinal per descobrir, compartir i viure el tir amb arc com a eina terapèutica. Hi esteu tots convidats!</p>`
  },
  22: {
    title: "Celebrat amb èxit el 29è Campionat de Catalunya 3D 2024/2025 a Castellnou del Bages",
    date: "20 de maig de 2025",
    cat: "3D",
    img: "img/news/noticia22.jpg",
    body: `<p>El <strong>18 de maig de 2025</strong>, el <strong>Club Tir amb Arc Zen del Bages</strong> va acollir el <strong>29è Campionat de Catalunya 3D</strong>, amb <strong>90 arquers i arqueres</strong> de <strong>21 clubs</strong>, en les modalitats de compost, arc nu, longbow i arc tradicional.</p>
<p><strong>Podis:</strong></p>
<ul><li><strong>Arc nu femení:</strong> 1a Rosa Miñano · 2a Casandra Campo · 3a Carmen Cuevas</li><li><strong>Arc nu masculí:</strong> 1r David Garcia · 2n Carles Sabatés · 3r David Vivo</li><li><strong>Compost masculí:</strong> 1r Josep Claret · 2n Xavier Menchon · 3r Luis Santiago</li><li><strong>Longbow femení:</strong> 1a Maria José Delgado · 2a Tania Martínez · 3a Rosa Martínez</li><li><strong>Longbow masculí:</strong> 1r Isidro Moyano · 2n Marc Coll · 3r David Alejo</li><li><strong>Tradicional femení:</strong> 1a Eva M. Piquer · 2a M. Isabel Mompean · 3a M. Carme Alongina</li><li><strong>Tradicional masculí:</strong> 1r Víctor López · 2n Òscar Amate · 3r Juan Carlos Ahumada</li></ul>
<p>Felicitem totes les persones participants i agraïm al Club Tir amb Arc Zen del Bages i a l'equip de jutges la bona organització.</p>`
  },
  23: {
    title: "Gran cloenda de la Lliga Catalana d'Aire Lliure a Olesa de Montserrat",
    date: "26 de maig de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia23.jpg",
    body: `<p>Aquest cap de setmana s'ha posat punt final a la <strong>Lliga Catalana d'Aire Lliure 2024/2025</strong> amb la 4a i última tirada, a les instal·lacions del <strong>Tir Arc Olesa</strong>, amb <strong>174 arquers i arqueres</strong> de <strong>28 clubs</strong>.</p>
<p>Agraïm als participants, clubs, equips organitzadors i jutges la seva dedicació al llarg de tot el campionat.</p>
<p><strong>Properes cites destacades:</strong></p>
<ul><li>📅 22 de juny · Campionat de Catalunya d'arc Tradicional, Nu i Longbow – Les Franqueses del Vallès</li><li>📅 6 de juliol · Campionat de Catalunya d'arc Recorbat i Compost – Terrassa</li></ul>`
  },
  24: {
    title: "Èxit català al Campionat d'Espanya 3D 2025 a Sòria",
    date: "27 de maig de 2025",
    cat: "3D",
    img: "img/news/noticia24.jpg",
    body: `<p>Del <strong>23 al 25 de maig</strong>, més de <strong>25 arquers i arqueres catalans</strong> han participat al <strong>Campionat d'Espanya 3D 2025</strong>, celebrat a Sòria.</p>
<p><strong>Resultats individuals destacats:</strong></p>
<ul><li>🥇 Jordi Ricart – Or en Compost Sènior</li><li>🥈 Maria Pitarch – Plata en Compost Sènior</li><li>🥉 David Garcia – Bronze en Nu Sènior</li><li>🥉 Casandra Campo – Bronze en Nu Sènior</li><li>🥉 Oscar Amate – Bronze en Tradicional Sènior</li></ul>
<p><strong>Per equips:</strong></p>
<ul><li>🥇 Or per a l'equip d'arc Compost Mixt: Maria Pitarch i Jordi Ricart</li><li>🥉 Bronze per a l'equip d'arc Nu Mixt: Casandra Campo i David Garcia</li></ul>
<p>Moltes felicitats a tots els participants i medallistes!</p>`
  },
  25: {
    title: "Final de temporada de camp amb el 55è Campionat de Catalunya a Romanyà de la Selva",
    date: "2 de juny de 2025",
    cat: "Camp",
    img: "img/news/noticia25.jpg",
    body: `<p>El diumenge <strong>1 de juny de 2025</strong>, el <strong>Club Tir amb Arc Costa Brava 3D</strong> i la FCTA van organitzar el <strong>55è Campionat de Catalunya de Camp</strong>, l'última prova catalana del calendari federatiu de tir de camp. Hi van competir fins a <strong>60 arquers de 17 clubs</strong>, tancant la temporada esportiva 2024/2025.</p>
<p>La competició es va desenvolupar en un entorn natural privilegiat, amb un recorregut pensat per desafiar habilitats i estratègia.</p>
<p>Des de la Federació volem felicitar tots els participants per l'alt nivell mostrat i agrair la tasca del Club Tir amb Arc Costa Brava 3D, dels jutges i dels voluntaris.</p>`
  },
  26: {
    title: "Catalunya triomfa al Campionat d'Espanya de Camp amb 11 medalles",
    date: "10 de juny de 2025",
    cat: "Camp",
    img: "img/news/noticia26.jpg",
    body: `<p><strong>Segòvia</strong> va ser l'escenari del <strong>Campionat d'Espanya de Camp 2025</strong>, celebrat els dies <strong>7 i 8 de juny</strong>, amb Catalunya liderant el medaller amb un total de <strong>11 medalles</strong>.</p>
<p><strong>Medalles individuals:</strong></p>
<ul><li>🥇 Maria Pitarch – Compost Dona</li><li>🥇 Jordi Ricart – Compost Home</li><li>🥈 Sergi Cebrián – Recorbat Home</li><li>🥈 Alexandra Moura Ribeiro – Compost Dona</li><li>🥈 Casandra Campo – Nu Dona</li><li>🥉 Mireia Comas – Longbow Dona</li><li>🥉 David Garcia – Nu Home</li></ul>
<p><strong>Medalles per equips:</strong></p>
<ul><li>🥇 Equip Compost Mixt: Maria Pitarch i Jordi Ricart</li><li>🥈 Equip Recorbat Mixt: Jana Cahué i Sergi Cebrián</li><li>🥈 Equip Tradicional Mixt: Mª Isabel Mompeán i Òscar Amate</li><li>🥉 Equip 5 divisions: Tania Martínez, Òscar Amate, Sergi Cebrián, David Garcia i Jordi Ricart</li></ul>
<p>Enhorabona a totes i tots! Catalunya continua sumant èxits a nivell estatal.</p>`
  },
  27: {
    title: "75è Campionat de Catalunya d'Arc Tradicional, Nu i Longbow a Les Franqueses",
    date: "22 de juny de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia27.jpg",
    body: `<p>El cap de setmana passat es va disputar al <strong>Club Tir amb Arc Les Franqueses</strong> el <strong>75è Campionat de Catalunya d'Arc Tradicional, Nu i Longbow d'Aire Lliure 2025</strong>, amb <strong>79 arquers i arqueres</strong> de <strong>22 clubs</strong> d'arreu de Catalunya.</p>
<p>La jornada va estar marcada pel bon ambient i un excel·lent nivell competitiu en totes les categories. A més, ja es pot consultar el <strong>rànquing final català 2024/2025</strong>, amb les classificacions de totes les categories de la temporada.</p>
<p>Des de l'organització volem agrair la participació de tots els esportistes i la tasca dels clubs, jutges i voluntaris.</p>`
  },
  28: {
    title: "Rècords i medalles al Campionat d'Espanya d'Arc Tradicional, Nu i Longbow 2025",
    date: "30 de juny de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia28.jpg",
    body: `<p>El cap de setmana del <strong>28 i 29 de juny</strong> es va celebrar a Madrid el <strong>Campionat d'Espanya d'Arc Tradicional, Nu i Longbow d'Aire Lliure 2025</strong>, una cita marcada pels èxits esportius i la superació de rècords nacionals. Hi van competir <strong>22 arquers i arqueres</strong> catalans.</p>
<p><strong>Resultats per equips:</strong></p>
<ul><li>🥇 Equip Tradicional Masculí: <strong>nou rècord d'Espanya amb 1812 punts</strong> (Miguel Galán, Ramon Garcia i Victor Lopez)</li><li>🥈 Equip Nu Masculí: David Rafael Cardozo, Carles Peña i Luis Rodriguez</li><li>🥈 Equip Tradicional Mixt: <strong>nou rècord d'Espanya amb 1267 punts</strong> (Ana Lorente i Victor Lopez)</li><li>🥉 Equip Nu Mixt: Oyuna Baturova i David Rafael Cardozo</li></ul>
<p><strong>Resultats individuals destacats:</strong></p>
<ul><li>Victor Lopez – Or en Tradicional Masculí</li><li>Carles Peña – Plata en Nu Masculí</li><li>Oyuna Baturova – Or en Nu Femení</li><li>Maria Eugenia Palomar – Bronze en Nu Femení</li></ul>
<p>Enhorabona a tots els participants!</p>`
  },
  29: {
    title: "El 75è Campionat de Catalunya d'Arc Recorbat i Compost tanca la temporada a Terrassa",
    date: "6 de juliol de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia29.jpg",
    body: `<p>Aquest cap de setmana s'ha celebrat al <strong>Club Arquers Terrassa</strong> el <strong>75è Campionat de Catalunya d'Arc Recorbat i Compost a l'Aire Lliure</strong>, amb més de <strong>100 esportistes</strong> de <strong>22 clubs</strong>. El campionat ha servit també per cloure la temporada 2024/2025 de la Lliga Catalana d'Aire Lliure, amb l'entrega de premis als medallistes de la temporada.</p>
<p>Ja es pot consultar el <strong>rànquing final català 2024/2025</strong> amb les classificacions oficials de totes les categories.</p>
<p><strong>Campions de Catalunya (or) per categories:</strong></p>
<ul><li>Recorbat Benjamí F: Lucía Zuñiga · M: Josep Martí</li><li>Recorbat Aleví F: Abril Godia · M: Daniel Molina</li><li>Recorbat Sub 15 F: Glòria Moreton · M: Guillem Vizcaino</li><li>Recorbat Sub 18 F: Laura Safont · M: Josep Español</li><li>Recorbat Sub 21 F: Jana Cahue · M: Gerard Safont</li><li>Recorbat Sènior F: Núria Barbera · M: Arnau Peña</li><li>Recorbat 50+ F: Maria Luisa García · M: Daniel Pérez</li><li>Compost Sub 18 M: Arnau Barbero</li><li>Compost Sènior F: Hala Eligibly · M: Manel Souto</li><li>Compost 50+ M: Juan R. Martinez</li></ul>
<p>Agraïm als participants, al club amfitrió, a l'equip de jutges i als voluntaris que han fet possible la jornada.</p>`
  },
  30: {
    title: "Seminari d'arc longbow i tradicional a Barcelona",
    date: "7 de juliol de 2025",
    cat: "Formació",
    img: "img/news/noticia30.jpg",
    body: `<p>Els passats <strong>5 i 6 de juliol</strong> es va organitzar a Barcelona un seminari intensiu dedicat a l'<strong>arc longbow i tradicional</strong>, impartit pel reconegut arquer i formador <strong>Jairo Valentín</strong>.</p>
<p>Durant dues jornades es va aprofundir en la tècnica del tir amb arc i en els processos psicològics aplicats a l'entrenament i la competició, combinant una sòlida base teòrica amb una part pràctica centrada en l'ajust del material i el treball d'aspectes tècnics essencials.</p>
<p>Gràcies a totes les persones que ho heu fet possible!</p>`
  },
  31: {
    title: "Èxit de participació a la sessió formativa «Tir amb arc i prevenció del limfedema»",
    date: "12 de juliol de 2025",
    cat: "Arc Adaptat",
    body: `<p>El passat <strong>12 de juliol de 2025</strong>, la FCTA va organitzar la sessió formativa <strong>«Tir amb arc i prevenció del limfedema»</strong>, una jornada pionera que va reunir <strong>16 participants</strong> a la Casa de l'Esport de Barcelona.</p>
<p>Adreçada a tècnics, esportistes, professionals de l'àmbit esportiu i persones interessades en l'aplicació terapèutica del tir amb arc, la formació va combinar continguts teòrics i pràctics sobre els fonaments científics del limfedema —una afecció comuna després del tractament del càncer de mama— i com el tir amb arc pot ser una eina beneficiosa per a la seva prevenció i gestió.</p>
<p>Amb iniciatives com aquesta, la Federació continua apostant per un tir amb arc accessible, inclusiu i compromès amb el benestar de les persones.</p>`
  },
  32: {
    title: "Tir amb arc i treball en equip al Campionat de Catalunya de Clubs 2025",
    date: "14 de juliol de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia32.jpg",
    body: `<p>Aquest cap de setmana s'ha disputat el <strong>Campionat de Catalunya de Clubs 2025</strong> al <strong>Club Tir amb Arc Pardinyes</strong>, amb <strong>17 equips</strong> de clubs d'arreu de Catalunya.</p>
<p><strong>Resultats per equips:</strong></p>
<ul><li><strong>Recorbat:</strong> 🥇 Club Arc Montjuïc (Arnau Peña, Pol Viñas, Pablo Zamora) · 🥈 Club Arc Montjuïc (David Bonin, Oscar Ruiz, Eduard Velasco) · 🥉 Draco Sagittariis (Sergi Cebrian, Ignasi Gallardo, Roc Rueda)</li><li><strong>Compost:</strong> 🥇 Arc Pardinyes (Josep Brocal, Jose Gómez, Jordi Tarragó) · 🥈 Club Arc Montjuïc (Ester Semis, José Pérez, Eric Pla) · 🥉 Draco Sagittariis (Eulàlia Bordas, Alexandra Moura, Fran Sánchez)</li><li><strong>Arc Nu:</strong> 🥇 Draco Sagittariis (Mireia Comas, Raül Soler, David Vivo) · 🥈 Club Arc Franqueses (David R. Cardozo, Miguel Ramírez, Mario Ruiz)</li><li><strong>Tradicional:</strong> 🥇 Club Arc Franqueses (Ana Lorente, Víctor López, Aleix Montes) · 🥈 Club Arc Franqueses (Enric Díaz, Jose Luis Gimeno, Josep Mauri) · 🥉 Club Arc Montjuïc (Carmen Sarceda, Miguel Galán, Ramon Garcia)</li></ul>
<p>Gràcies a tots els clubs, esportistes, jutges i organitzadors. Enhorabona a totes i tots!</p>`
  },
  33: {
    title: "Campionats d'Espanya d'Arc Recorbat i Compost 2025",
    date: "28 de juliol de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia33.jpg",
    body: `<p>L'equip català ha tancat la temporada amb grans resultats als <strong>Campionats d'Espanya d'Arc Recorbat i Compost d'Aire Lliure 2025</strong>, celebrats a Madrid entre el <strong>18 i el 27 de juliol</strong>.</p>
<p>Un total de <strong>25 esportistes catalans</strong> van competir al Campionat Absolut, amb la <strong>medalla de bronze</strong> de l'equip femení d'arc compost: <strong>Naila Alilouch Tayar, Hala Elgibily i Alexandra Moura Ribeiro Gomes de Sousa</strong>.</p>
<p>Dies abans, del 18 al 20 de juliol, es va disputar el Campionat d'Espanya per a les categories d'edat <strong>U21, U18, U15 i +50</strong>, amb <strong>26 representants catalans</strong> i també molt bons resultats, amb medalles per a Laura M. Suárez, Óscar Ruiz, Montserrat Gustems i Begoña Pérez.</p>
<p>Des de la FCTA felicitem tots els esportistes i agraïm a la RFETA l'organització dels campionats.</p>`
  },
  34: {
    title: "Lliga 3D en línia, temporada 2025/2026",
    date: "29 de juliol de 2025",
    cat: "3D",
    body: `<p>Amb el suport de la FCTA s'implementa una <strong>lliga 3D en línia</strong> a mode de prova pilot, que inclou <strong>tres competicions no oficials</strong> i un <strong>Campionat de Catalunya oficial</strong>. L'objectiu és facilitar l'entrenament i la selecció d'arquers per als campionats d'àmbit nacional en aquesta modalitat.</p>
<p><strong>Calendari:</strong></p>
<ul><li>1a sèrie – 2 de novembre de 2025 · Club Sant Andreu de la Barca (no oficial)</li><li>2a sèrie – 30 de novembre de 2025 · Club Olivella (no oficial)</li><li>3a sèrie – 28 de desembre de 2025 · Club Les Franqueses (no oficial)</li><li>Campionat de Catalunya – 18 de gener de 2026 · Club Sant Celoni (oficial)</li></ul>
<p>S'aplicarà la normativa RFETA, excepte per a la categoria Sub 15, que seguirà la normativa FCTA. Cal tenir la llicència federativa vigent.</p>
<p><strong>Divisions:</strong> longbow, tradicional, nu i compost. <strong>Classes:</strong> Sènior home i dona (més de 15 anys) i Sub 15 home i dona.</p>
<p>Cada sèrie consta de 12 propostes de tir amb 2 fletxes per diana, en dues voltes (24 dianes). Les colles són de 4 participants. Per optar al medaller cal haver participat en dues de les tres tirades; la classificació final suma les dues millors puntuacions. Les medalles de les sèries no són les oficials de la FCTA.</p>
<p><strong>Preus d'inscripció:</strong> sèries 15 € sènior / 10 € sub 15 · campionat 30 € sènior / 15 € sub 15.</p>
<p>El Campionat de Catalunya es disputa en una sola jornada: un circuit classificatori del qual surten els quatre primers, que accedeixen a les eliminatòries (mínim de quatre participants per divisió i sexe).</p>`
  },
  35: {
    title: "21è Campionat de Catalunya de Round 900",
    date: "7 de setembre de 2025",
    cat: "Aire Lliure",
    img: "img/news/noticia35.jpg",
    body: `<p>Barcelona va acollir el passat cap de setmana, <strong>6 i 7 de setembre</strong>, el <strong>21è Campionat de Catalunya Round 900</strong> i Memorial Jordi Adell, celebrat a les instal·lacions del <strong>Club Arc Montjuïc</strong>.</p>
<p>És un campionat emblemàtic de setembre que posa el punt final a la temporada i s'ha consolidat com una cita ineludible del calendari. Hi van participar <strong>85 esportistes</strong> al llarg de dues jornades.</p>
<p>Agraïm la implicació del Club Arc Montjuïc i de totes les persones que ho han fet possible.</p>`
  },
  36: {
    title: "Gran participació a la 3a tirada de la Lliga Catalana de Sala 2025/2026",
    date: "20 de novembre de 2025",
    cat: "Sala",
    img: "img/news/noticia36.jpg",
    body: `<p>Aquest cap de setmana s'ha celebrat la <strong>3a tirada de la Lliga Catalana de Sala 2025/2026</strong>, acollida simultàniament pel <strong>Club Tir amb Arc Manresa</strong> i el <strong>Club Arquers Torrefarrera</strong>. Un total de <strong>230 participants</strong> han omplert totes les línies de tir.</p>
<p>La propera cita serà la <strong>4a tirada</strong>, els dies <strong>6 i 7 de desembre</strong> al Club Tir amb Arc Constantí.</p>
<p>Agraïm la participació de tots els arquers i arqueres i la dedicació dels clubs, voluntariat i organitzadors.</p>`
  },
  37: {
    title: "La Lliga Catalana de Sala 2025/2026 es tanca amb una gran 4a tirada a Constantí",
    date: "11 de desembre de 2025",
    cat: "Sala",
    img: "img/news/noticia37.jpg",
    body: `<p>Aquest cap de setmana ha finalitzat la <strong>Lliga Catalana de Sala 2025/2026</strong> amb la <strong>4a i última tirada</strong>, acollida pel <strong>Club Tir amb Arc Constantí</strong>, amb gairebé <strong>200 esportistes</strong>.</p>
<p>La competició s'ha dut a terme amb un ambient excel·lent i una gran organització del club amfitrió. Amb aquesta quarta tirada finalitza una edició marcada per una alta participació i un gran rendiment dels arquers i arqueres de totes les categories.</p>
<p>Des de la Federació agraïm l'esforç de tots els participants, clubs, voluntariat i organitzadors.</p>`
  },
  38: {
    title: "El Bages acull la 2a tirada de la Lliga Catalana 3D 2025/2026",
    date: "18 de desembre de 2025",
    cat: "3D",
    img: "img/news/noticia38.jpg",
    body: `<p>El <strong>Club Tir amb Arc Zen del Bages</strong> va ser l'escenari, diumenge passat, de la <strong>2a tirada de la Lliga Catalana 3D 2025/2026</strong>, amb gairebé un centenar d'arqueres i arquers de <strong>22 clubs</strong>.</p>
<p>En aquesta segona cita, la FCTA va tornar a comptar amb el <strong>nou equip complet d'Ianseo</strong> (tauletes, antena, router, switch, ordinador, impressora i estació d'energia), que va permetre una gestió àgil i sense incidències. Els resultats es van poder publicar de manera immediata a <strong>ianseo.net</strong> un cop finalitzada la prova i superat el període de reclamacions.</p>
<p>La propera cita serà el <strong>22 de febrer de 2026 a Olivella</strong>.</p>`
  },
  39: {
    title: "Èxit de participació al Campionat de Catalunya de Clubs de Tir en Sala",
    date: "22 de desembre de 2025",
    cat: "Sala",
    img: "img/news/noticia39.jpg",
    body: `<p>Aquest cap de setmana s'ha celebrat al <strong>Club Tir amb Arc Manresa</strong> el <strong>Campionat de Catalunya de Clubs de Tir en Sala</strong>, amb <strong>138 esportistes</strong> distribuïts en <strong>36 equips</strong> de <strong>15 clubs</strong> de tota Catalunya.</p>
<p>Abans de l'inici es va celebrar el <strong>Trofeu Màster de Catalunya</strong>, que reconeix els esportistes destacats de la Lliga Catalana: hi accedeixen els finalistes de les jornades de lliga, amb eliminatòries entre els vuit millors de cada divisió i finals entre els quatre millors.</p>
<p><strong>Participants al Trofeu Màster:</strong></p>
<ul><li><strong>Recorbat:</strong> Sergi Cebrian, David Bonin, Raúl Quiles</li><li><strong>Tradicional:</strong> Juanjo Querol, Enric Díaz, Jorge Rueda</li><li><strong>Compost:</strong> Manel Souto, Eric Pla, José Pérez</li><li><strong>Longbow:</strong> Mireia Comas, Antonio García, Carmen Mejía, Víctor López, Carles Peña, David Cardozo</li></ul>`
  },
  40: {
    title: "Sant Celoni acull el 1r Campionat de Catalunya de Tir amb Arc 3D en Línia",
    date: "19 de gener de 2026",
    cat: "3D",
    img: "img/news/noticia40.jpg",
    body: `<p>El club <strong>Arc Sant Celoni</strong> va ser l'amfitrió, el <strong>18 de gener de 2026</strong>, del <strong>1r Campionat de Catalunya de Tir amb Arc 3D en Línia</strong>, una competició pionera que marca un pas endavant en aquesta disciplina a Catalunya.</p>
<p>Tot i la pluja durant tota la jornada, la participació va ser un èxit i la competició es va desenvolupar amb total normalitat, amb una organització eficaç i professional.</p>
<p>Des de la FCTA felicitem tots els participants, els jutges i l'equip organitzador.</p>`
  },
  41: {
    title: "Èxits i medalles per als esportistes catalans a Ciudad Real",
    date: "26 de gener de 2026",
    cat: "3D",
    img: "img/news/noticia41.jpg",
    body: `<p>Aquest cap de setmana s'ha celebrat a <strong>Ciudad Real</strong> el <strong>Campionat d'Espanya 3D en sala</strong> i el <strong>Campionat d'Espanya d'arc tradicional, nu i longbow</strong>, amb <strong>34 esportistes</strong> catalans al 3D en sala i <strong>47</strong> al de tradicional, nu i longbow.</p>
<p>Balanç: <strong>6 medalles individuals i 4 medalles per equips</strong>.</p>
<p><strong>3D en sala:</strong></p>
<ul><li>Compost Home: Jordi Ricart</li><li>Compost Dona: Maria Pitarch i Aida Domínguez</li><li>Longbow Dona: Mireia Comas</li><li>Tradicional Home: Víctor López</li><li>Equip compost mixt: Maria Pitarch i Jordi Ricart</li></ul>
<p><strong>Tradicional, nu i longbow (equips):</strong></p>
<ul><li>Equip tradicional mixt: Ana Lorente i Víctor López</li><li>Equip longbow mixt: Mireia Comas i Enrique Flores</li><li>Equip nu mixt: Mª Eugenia Palomar i David Rafael Cardozo</li></ul>
<p>Des de la FCTA felicitem tots els esportistes i equips pels magnífics resultats.</p>`
  },
  42: {
    title: "Constantí i Manresa acullen el 58è Campionat de Catalunya de Tir en Sala",
    date: "3 de febrer de 2026",
    cat: "Sala",
    img: "img/news/noticia42.jpg",
    body: `<p>El <strong>31 de gener i 1 de febrer</strong> s'ha celebrat el <strong>58è Campionat de Catalunya de Tir en Sala</strong>, que ha tancat oficialment la temporada de sala 2025/2026, a les instal·lacions del <strong>Tir amb Arc Constantí</strong> i del <strong>Tir amb Arc Manresa</strong>.</p>
<p>L'esdeveniment ha coronat <strong>22 campions i campiones de Catalunya</strong> de sala, i ha estat l'escenari del lliurament de medalles de la Lliga Catalana. Hi han participat <strong>més de 170 arquers i arqueres</strong>.</p>
<p>Agraïm la participació de tots els esportistes i la tasca dels clubs amfitrions i de totes les persones implicades.</p>`
  },
  43: {
    title: "Èxit del 1r Torneig d'Arc Adaptat, Inclusiu i Salut a Olesa de Montserrat",
    date: "9 de febrer de 2026",
    cat: "Arc Adaptat",
    img: "img/news/noticia43.jpg",
    body: `<p>El dissabte <strong>7 de febrer</strong> es va celebrar amb gran èxit el <strong>1r Torneig d'Arc Adaptat, Inclusiu i Salut</strong> al <strong>Tir Arc Olesa</strong>, una iniciativa que dona continuïtat a la Lliga Local de Prevenció del Limfedema.</p>
<p>Va incloure una categoria específica per a esportistes que participen en el projecte de limfedema en pacients oncològics, per fomentar la participació, consolidar la pràctica esportiva i afavorir la integració d'aquest col·lectiu.</p>
<p>L'esdeveniment va combinar esport, salut i inclusió, i marca el camí per a futures edicions.</p>`
  },
  44: {
    title: "Catalunya suma dues medalles als Campionats d'Espanya de Sala a Valladolid",
    date: "17 de febrer de 2026",
    cat: "Sala",
    img: "img/news/noticia44.jpg",
    body: `<p>Del <strong>12 al 13 de febrer</strong> es va disputar a <strong>Valladolid</strong> el Campionat d'Espanya de Sala U21, U18 i U15 d'arc recorbat i compost, amb <strong>16 esportistes</strong> de Catalunya:</p>
<ul><li>🥈 <strong>Plata</strong> individual per a Gloria Moreton en arc recorbat U15.</li><li>🥉 <strong>Bronze</strong> per a l'equip femení d'arc recorbat U18: Maelyn Macías, Edurne Martinez i Laura Safont.</li></ul>
<p>Del <strong>14 al 15 de febrer</strong> es va celebrar el Campionat d'Espanya Absolut d'arc recorbat i compost, amb <strong>18 esportistes</strong> catalans. Millors resultats:</p>
<ul><li>4a posició individual per a Alexandra Moura (arc compost).</li><li>4a posició per a l'equip masculí d'arc compost: Pablo Martinez, Jose Perez i Eric Pla.</li></ul>
<p>Enhorabona a tots els esportistes, i un reconeixement especial als dos jutges catalans presents al campionat.</p>`
  },
  45: {
    title: "Gran jornada de 3D a Olivella",
    date: "25 de febrer de 2026",
    cat: "3D",
    img: "img/news/noticia45.jpg",
    body: `<p>El <strong>Club Arquers Olivella</strong> va acollir el <strong>22 de febrer de 2026</strong> la <strong>3a tirada de la Lliga Catalana 3D</strong>, amb <strong>105 esportistes</strong>.</p>
<p>Malgrat el vent dels dies previs, que va obligar el club a treballar a contrarellotge, el circuit es va deixar en òptimes condicions. Un reconeixement especial als voluntaris, organitzadors i jutges.</p>
<p>La competició continuarà amb la <strong>4a tirada, el 12 d'abril de 2026</strong>.</p>`
  },
  46: {
    title: "Segona cita de la Lliga Catalana de Camp 2025/2026",
    date: "11 de març de 2026",
    cat: "Camp",
    img: "img/news/noticia46.jpg",
    body: `<p>La Lliga Catalana de Camp ha celebrat la <strong>2a tirada</strong> del calendari el passat <strong>8 de març</strong> a les instal·lacions del <strong>Club Català de Tir amb Arc</strong> (Montcada i Reixac).</p>
<p>La jornada va començar amb certa inestabilitat meteorològica, però el temps va millorar i es va poder completar la competició amb bones condicions. Hi van participar <strong>41 esportistes</strong>.</p>
<p>La <strong>3a tirada</strong> tindrà lloc el <strong>3 de maig</strong> a Montcada i Reixac. Ens hi retrobem!</p>`
  },
  47: {
    title: "Arrenca la nova edició del Curs de Tècnic Nivell 1 en Tir amb Arc",
    date: "17 de març de 2026",
    cat: "Formació",
    img: "img/news/noticia47.jpg",
    body: `<p>Aquest cap de setmana s'ha donat el tret de sortida a la nova edició del <strong>Curs de Tècnic Nivell 1 en Tir amb Arc</strong>. Les primeres sessions, centrades en didàctica i metodologia, han estat impartides per <strong>Juan Carlos Ahumada Méndez</strong>.</p>
<p>Enguany el curs compta amb un grup de <strong>23 alumnes</strong>. La FCTA us desitja molta sort en aquest nou camí.</p>
<p>Si t'interessa convertir-te en tècnic de tir amb arc, consulta la informació sobre els cursos de Nivell 1 i altres formacions a la secció de Formació del portal.</p>`
  },
  48: {
    title: "Aclariment sobre la coincidència d'una tirada de la Lliga Catalana amb Nîmes",
    date: "15 d'agost de 2026",
    cat: "Federació",
    body: `<p>Davant d'algunes consultes rebudes sobre la coincidència d'una tirada de la Lliga Catalana amb el <strong>Nîmes Archery Tournament</strong>, la FCTA explica el criteri seguit en l'elaboració del calendari.</p>
<p>La Federació reconeix la importància de Nîmes, una de les grans competicions internacionals de sala, i entén que alguns arquers catalans hi vulguin participar. No obstant això, la Lliga Catalana disposa d'un calendari federatiu propi, que depèn de molts factors que s'han de coordinar:</p>
<ul><li>Calendari de competicions de la RFETA.</li><li>Campionats de Catalunya de les diferents disciplines.</li><li>Disponibilitat dels clubs organitzadors i de les seves instal·lacions.</li><li>Disponibilitat dels jutges.</li><li>Necessitat de distribuir adequadament totes les jornades al llarg de la temporada.</li></ul>
<p>Per això una data de la Lliga Catalana no es pot establir únicament en funció de les competicions internacionals. Això no vol dir que no es tinguin en compte: la FCTA considera raonable incorporar-les com un dels elements a valorar en la planificació de futures temporades, però sense fer dependre d'elles tot el calendari.</p>
<p>La coincidència tampoc és excepcional: el mateix cap de setmana de Nîmes hi ha altres calendaris de tir amb arc que mantenen competicions programades, fins i tot a França. Participar a Nîmes és una decisió esportiva legítima, i participar a la Lliga Catalana també ho és.</p>
<p>La responsabilitat de la FCTA és buscar l'equilibri entre tots aquests interessos i garantir una Lliga Catalana estable, organitzada i previsible, evitant, sempre que sigui possible, coincidències que afectin significativament els esportistes.</p>`
  },
  49: {
    title: "Llicència federativa: com accedir al Portal del federat",
    date: "22 de setembre de 2026",
    cat: "Federació",
    body: `<p>La llicència federativa es gestiona a través del <strong>Portal del federat</strong> de la Reial Federació Espanyola de Tir amb Arc (<strong>federados.rfeta.es</strong>). Des del portal cada federat pot consultar el seu perfil, seguir l'estat de la seva llicència, descarregar-la al mòbil o en PDF i mantenir les seves dades al dia.</p>
<p><strong>Abans de començar</strong> necessiteu el vostre NIF, NIE o passaport (el mateix que vau facilitar en federar-vos), el correu que consta al vostre perfil i un dispositiu amb connexió a internet.</p>
<p><strong>Com entrar per primera vegada, en sis passos:</strong></p>
<ol><li>Obriu el portal: www.federados.rfeta.es.</li><li>Cliqueu «Recuperar acceso» (serveix per crear la contrasenya la primera vegada).</li><li>Escriviu el document (amb la lletra i sense espais) i el correu del perfil, i cliqueu «Enviarme el enlace».</li><li>Obriu el correu de la RFETA i cliqueu «Establecer mi contraseña». L'enllaç caduca en una hora i només es pot fer servir una vegada.</li><li>Creeu la contrasenya (mínim 8 caràcters) i cliqueu «Guardar contraseña».</li><li>Accepteu la protecció de dades: baixeu fins al final del text, marqueu «He leído y acepto» i cliqueu «Aceptar y continuar».</li></ol>
<p><strong>Important:</strong> mentre la clàusula de protecció de dades no estigui acceptada, la federació no pot tramitar la llicència, encara que el club l'hagi sol·licitada i estigui pagada. Només cal fer-ho una vegada.</p>
<p><strong>Com descarregar la targeta federativa:</strong> torneu a entrar al portal, aneu a «Licencias», obriu el detall de la llicència de la temporada i cliqueu «Descargar licencia». Podeu triar certificat en PDF, rebre els enllaços per correu o afegir-la a Apple Wallet o Google Wallet. La descàrrega només apareix quan la llicència està tramitada i abonada.</p>
<p><strong>Deixeu el perfil a punt:</strong> la foto surt a la llicència i, sense foto, la federació no la pot emetre; i el correu ha d'estar actualitzat perquè és el canal dels avisos. El document, el nom i la data de naixement no es poden modificar des del portal: si són incorrectes, comuniqueu-ho al vostre club o a la FCTA.</p>`
  }
};

var DB = {

// --- CIRCULARS ---
circulars: [
  // FEDERACIÓ
  {id:1,type:'fed',num:'CIRC-2622',title:'3ª Tirada Lliga Catalana Aire Lliure 2026',desc:'Informació completa i inscripcions per a la 3ª tirada de la lliga catalana d\'aire lliure 2026',day:27,mon:'ABR',year:2026,url:'docs/2026042714461573-CIRC_2622_3a_tirada_Lliga_Catalana_AireLliure_2026.pdf'},
  {id:25,type:'fed',num:'CIRC-2509',title:'Sol·licitud d\'Informació Auditoria Interna FCTA',desc:'Procés d\'auditoria interna encarregat per la FCTA a FACSS Auditors. Sol·licitud d\'informació comptable als clubs',day:31,mon:'GEN',year:2025,url:'docs/2025013117490089-CIRC_2509_SOL.LICITUD_INFORMACIO_AUDITORIA_FCTA.pdf'},
  // AIRE LLIURE / SALA
  // CAMP
  // 3D / BOSC
  // JUTGES
  // FORMACIÓ
  {id:18,type:'form',num:'CIRC-2607',title:'Seminari de Psicologia Aplicada al Tir amb Arc',desc:'Inscripcions obertes. Formació general per a tècnics i esportistes',day:29,mon:'GEN',year:2026,url:'docs/2026012915470845-CIRC_2607_Seminari_psicologia_aplicada_tir_amb_arc.pdf'},
  {id:19,type:'form',num:'CIRC-2504',title:'Curs Tècnic Esportiu Nivell 1 – Convocatòria 2026/2027',desc:'La FCTA i el CCE convoquen el curs de tècnic esportiu de Nivell 1 en tir amb arc',day:15,mon:'GEN',year:2026,url:'docs/2026011516220845-CIRC_2504_Curs_Tecnic_Nivell1_2025_26.pdf'},
  {id:20,type:'form',num:'CIRC-2511',title:'Taller Jurídic per a Clubs',desc:'Formació sobre aspectes legals de la gestió de clubs esportius',day:13,mon:'FEB',year:2025,url:'docs/2025021311182735-CIRC_2511_Taller_formacio_clubs_juridic.pdf'},
  {id:21,type:'form',num:'CIRC-2447',title:'Taller de Laboral i Voluntariat per a Clubs',desc:'Regularització de voluntaris, relacions laborals i contractació',day:24,mon:'OCT',year:2024,url:'docs/2024102413581925-CIRC_2447_Taller_formacio_clubs_voluntariat.pdf'},
  {id:22,type:'form',num:'CIRC-2435',title:'Taller de Fiscalitat per a Clubs',desc:'Obligacions fiscals, declaracions i exempcions per a clubs i federacions',day:4,mon:'JUL',year:2024,url:'docs/202407041752453-CIRC_2435_Taller_formacio_clubs_fiscal.pdf'},
  {id:23,type:'form',num:'CIRC-2410',title:'Taller de Comptabilitat per a Clubs',desc:'Gestió econòmica i comptable d\'entitats esportives sense ànim de lucre',day:29,mon:'FEB',year:2024,url:'docs/2024022916412124-CIRC_2410_Taller_formacio_clubs_comptabilitat.pdf'},
  // KYUDO
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
  // SETEMBRE – OCTUBRE 2026 / JUNY – AGOST 2026 (afegides des de fcta.cat)
  {id:55,type:'camp',num:'CIRC-2638',title:'Ajut als esportistes al Campionat d\'Espanya de Camp',desc:'Sol·licitud d\'ajut de la FCTA per als esportistes que participen al Campionat d\'Espanya de Tir de Camp',day:16,mon:'JUN',year:2026,url:'docs/2026061810062222-CIRC_2638_AJUT_CAMPIONAT_ESPANYA_CAMP.pdf'},
  {id:56,type:'al',num:'CIRC-2639',title:'Ajut al Campionat d\'Espanya d\'Aire Lliure de Veterans',desc:'Sol·licitud d\'ajut de la FCTA per participar al Campionat d\'Espanya d\'Aire Lliure de Veterans',day:17,mon:'JUN',year:2026,url:'docs/2026061810074824-CIRC_2639_AJUT_CAMPIONAT_ESPANYA_ALL_VETERANS.pdf'},
  {id:57,type:'al',num:'CIRC-2640',title:'Comunicació de Participació – Campionat d\'Espanya d\'Aire Lliure Tradicional, Longbow i Nu',desc:'Comunicació i llista de participants catalans al Campionat d\'Espanya d\'Aire Lliure de Tradicional, Longbow i Nu',day:23,mon:'JUN',year:2026,url:'docs/2026062518333324-CIRC_2640_COMUNICACIO_PARTICIPACIO_CTS-ESP_A_LL_TRADICIONAL_LBOW_NU.pdf'},
  {id:58,type:'al',num:'CIRC-2641',title:'Comunicació de Participació – Campionat d\'Espanya d\'Aire Lliure Recorbat i Compost U21, U18, U15',desc:'Comunicació i llista de participants catalans al Campionat d\'Espanya d\'Aire Lliure d\'arc recorbat i compost U21, U18 i U15',day:24,mon:'JUN',year:2026,url:'docs/2026062518350779-CIRC_2641_COMUNICACIO_PARTICIPACIO_CTS-ESP_A_LL_RECORBAT_COMPOST_U21_U18_U15.pdf'},
  {id:59,type:'al',num:'CIRC-2642',title:'Comunicació de Participació – Campionat d\'Espanya d\'Aire Lliure Recorbat i Compost Absolut',desc:'Comunicació i llista de participants catalans al Campionat d\'Espanya d\'Aire Lliure d\'arc recorbat i compost absolut',day:25,mon:'JUN',year:2026,url:'docs/2026062518360828-CIRC_2642_COMUNICACIO_PARTICIPACIO_CTS-ESP_A_LL_RECORBAT_COMPOST.pdf'},
  {id:60,type:'al',num:'CIRC-2643',title:'Ajut al Campionat d\'Espanya d\'Aire Lliure Tradicional, Longbow i Nu',desc:'Sol·licitud d\'ajut de la FCTA per participar al Campionat d\'Espanya d\'Aire Lliure de Tradicional, Longbow i Nu',day:28,mon:'JUL',year:2026,url:'docs/2026073013524156-CIRC_2643_AJUT_CAMPIONAT_ESPANYA_ALL_TRAD-LBOW-NU.pdf'},
  {id:61,type:'fed',num:'CIRC-2644',title:'Ajut al Campionat d\'Espanya CESA (Edat Escolar) i Promeses',desc:'Sol·licitud d\'ajut de la FCTA per participar al Campionat d\'Espanya de Seleccions Autonòmiques en Edat Escolar (CESA) i Promeses',day:29,mon:'JUL',year:2026,url:'docs/2026073013581971-CIRC_2644_AJUT_CAMPIONAT_ESPANYA_CESA_EdadEscolar_Promeses.pdf'},
  {id:62,type:'al',num:'CIRC-2645',title:'Ajut al Campionat d\'Espanya U21, U18 i U15',desc:'Sol·licitud d\'ajut de la FCTA per participar al Campionat d\'Espanya d\'Aire Lliure U21, U18 i U15',day:4,mon:'AGO',year:2026,url:'docs/202608071407266-CIRC_2645_AJUT_CAMPIONAT_ESPANYA_U21_U18_U15.pdf'},
  {id:63,type:'al',num:'CIRC-2646',title:'Ajut al Campionat d\'Espanya d\'Aire Lliure Recorbat i Compost Absolut',desc:'Sol·licitud d\'ajut de la FCTA per participar al Campionat d\'Espanya d\'Aire Lliure d\'arc recorbat i compost absolut',day:5,mon:'AGO',year:2026,url:'docs/2026080714084631-CIRC_2646_AJUT_CAMPIONAT_ESPANYA_ALL_RC_ABSOLUT.pdf'},
  {id:64,type:'fed',num:'CIRC-2647',title:'Vacances FCTA',desc:'Comunicat sobre el període de vacances de les oficines de la FCTA',day:6,mon:'AGO',year:2026,url:'docs/2026080714095023-CIRC_2647_VACANCES_FCTA.pdf'},
  {id:65,type:'al',num:'CIRC-2648',title:'XXII Campionat de Catalunya Round 900 – XIII Memorial Jordi Adell (Barcelona)',desc:'Convocatòria, normes i inscripcions del XXII Campionat de Catalunya de Round 900 i XIII Memorial Jordi Adell, 26 i 27 de setembre de 2026',day:12,mon:'AGO',year:2026,url:'docs/2026081216301622-CIRC_2648_Campionat_Catalunya_R900_2026_ACTUALITZADA.pdf'},
  {id:66,type:'fed',num:'CIRC-2649',title:'Programa Autonòmic de Tecnificació – Setembre 2026',desc:'Convocatòria de la jornada del Programa Autonòmic de Tecnificació del mes de setembre de 2026',day:24,mon:'AGO',year:2026,url:'docs/2026082416361795-CIRC_2649_PROGRAMA_AUTONOMIC_TECNIFICACIO_Setembre.pdf'},
  {id:67,type:'fed',num:'CIRC-2650',title:'Llicències Temporada 2026-2027',desc:'Informació sobre la tramitació i les tarifes de les llicències federatives de la temporada 2026/2027',day:15,mon:'SET',year:2026,url:'docs/2026091511525447-CIRC_2650_LLICENCIES_2026-2027_Df.pdf'},
  {id:68,type:'3d',num:'CIRC-2651',title:'1ª Tirada Lliga Catalana 3D en Línia 2026/2027 (Figueres)',desc:'Informació i inscripcions per a la 1a tirada de la Lliga Catalana 3D en línia, 18 d\'octubre de 2026 a Figueres',day:28,mon:'SET',year:2026,url:'docs/2026100810223677-CIRC_2651_1a_Tirada_Lliga_Catalana_3D_en_linia_2026-27_Figueres.pdf'},
  {id:69,type:'al',num:'CIRC-2652',title:'1ª Tirada Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut i de Prevenció del Limfedema (Olesa de Montserrat)',desc:'Informació i inscripcions per a la 1a tirada de la Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut i la 1a de la Lliga Catalana per a la Prevenció del Limfedema, 17 d\'octubre de 2026',day:1,mon:'OCT',year:2026,url:'docs/2026100111362234-CIRC_2652_1a_Tirada_Lliga_Catalana_Arc_Adaptat_2026-2027.pdf'},
  {id:70,type:'fed',num:'CIRC-2653',title:'Programa Autonòmic de Tecnificació – Octubre 2026',desc:'Convocatòria de la jornada del Programa Autonòmic de Tecnificació del mes d\'octubre de 2026',day:5,mon:'OCT',year:2026,url:'docs/2026100514155775-CIRC_2653_Pla_Autonomic_Tecnificacio_Jornada_octubre_2026.pdf'},
  {id:71,type:'al',num:'CIRC-2654',title:'1ª Tirada Lliga Catalana de Sala 2026/2027 (Olesa de Montserrat i Constantí)',desc:'Informació i inscripcions per a la 1a tirada de la Lliga Catalana de Sala, 24 i 25 d\'octubre de 2026',day:6,mon:'OCT',year:2026,url:'docs/2026100611542593-CIRC_2654_1a_Tirada_Lliga_Catalana_Sala_2026-2027_Olesa_M_i_Constanti.pdf'},
  // GENER – ABRIL 2026 (circulars reals, afegides des de fcta.cat)
  {id:72,type:'3d',num:'CIRC-2606',title:'3ª Tirada Lliga Catalana 3D 2025/2026 (Olivella)',desc:'Informació i inscripcions per a la 3a tirada de la Lliga Catalana 3D, 22 de febrer de 2026 a Olivella',day:29,mon:'GEN',year:2026,url:'docs/2026012911195089-CIRC_2606_3a_tirada_lliga_catalana_3D_2025_2026.pdf'},
  {id:73,type:'fed',num:'CIRC-2608',title:'2ª Concentració del Programa Autonòmic de Tecnificació',desc:'Convocatòria de la 2a concentració del Programa Autonòmic de Tecnificació (febrer 2026)',day:3,mon:'FEB',year:2026,url:'docs/2026020309534960-CIRC_2608_Jornada_febrer_PAT.pdf'},
  {id:74,type:'camp',num:'CIRC-2609',title:'2ª Tirada Lliga Catalana de Camp 2025/2026 (Montcada i Reixac)',desc:'Informació i inscripcions per a la 2a tirada de la Lliga Catalana de Camp, 8 de març de 2026',day:16,mon:'FEB',year:2026,url:'docs/2026021611000431-CIRC_2609_2a_tirada_lliga_cat_camp_2025_26.pdf'},
  {id:75,type:'al',num:'CIRC-2610',title:'1ª Tirada Lliga Catalana d\'Aire Lliure 2025/2026 (Olesa de Montserrat i Sant Celoni)',desc:'Informació i inscripcions per a la 1a tirada de la Lliga Catalana d\'Aire Lliure, 14 de març de 2026',day:24,mon:'FEB',year:2026,url:'docs/2026022513155260-CIRC_2610_Lliga_Catalana_Aire_Lliure_2025_26.pdf'},
  {id:76,type:'3d',num:'CIRC-2611',title:'Ajut als Campionats d\'Espanya de Sala 3D (Tradicional, Nu i Longbow)',desc:'Sol·licitud d\'ajut de la FCTA per participar als Campionats d\'Espanya de Sala 3D i de Tradicional, Nu i Longbow',day:25,mon:'FEB',year:2026,url:'docs/2026022514491361-CIRC_2611_AJUT_CTS_ESPANYA_SALA_3D_TLN.pdf'},
  {id:77,type:'al',num:'CIRC-2612',title:'Ajut als Campionats d\'Espanya de Sala (Recorbat i Compost)',desc:'Sol·licitud d\'ajut de la FCTA per participar als Campionats d\'Espanya de Sala d\'arc recorbat i compost',day:26,mon:'FEB',year:2026,url:'docs/2026022514502712-CIRC_2612_AJUT_CTS_ESPANYA_SALA_RECORBAT_COMPOST.pdf'},
  {id:78,type:'jut',num:'CIRC-2613',title:'Curs de Jutge Nacional (preinscripció)',desc:'Preinscripció al curs de jutge nacional',day:5,mon:'MAR',year:2026,url:'docs/2026030513205653-CIRC_2613_CURS_JUTGE_NACIONAL_PREINSCRIPCIO.pdf'},
  {id:79,type:'al',num:'CIRC-2614',title:'2ª Tirada Lliga Catalana d\'Aire Lliure 2025/2026 (Figueres i Olivella)',desc:'Informació i inscripcions per a la 2a tirada de la Lliga Catalana d\'Aire Lliure, 18 i 19 d\'abril de 2026',day:19,mon:'MAR',year:2026,url:'docs/2026031914561671-CIRC_2614_2a_tirada_Lliga_Catalana_Aire_Lliure_2025_26.pdf'},
  {id:80,type:'3d',num:'CIRC-2615',title:'4ª Tirada Lliga Catalana 3D 2025/2026 (Castellnou del Bages)',desc:'Informació i inscripcions per a la 4a tirada de la Lliga Catalana 3D, 12 d\'abril de 2026',day:25,mon:'MAR',year:2026,url:'docs/2026032509514199-CIRC_2615_4a_tirada_lliga_catalana_3D_2025_2026.pdf'},
  {id:81,type:'al',num:'CIRC-2616',title:'Campionat de Catalunya Universitari 2026 (Tarragona)',desc:'Reglament i informació del Campionat de Catalunya Universitari de Tir amb Arc, 28 de març de 2026',day:24,mon:'MAR',year:2026,url:'docs/2026032614163881-CIRC_2616_Campionat_Catalunya_Universitari_2026.pdf'},
  {id:82,type:'al',num:'CIRC-2617',title:'1ª Tirada d\'Arc Adaptat, Inclusiu i Salut (Olesa de Montserrat)',desc:'Informació i inscripcions per a la 1a tirada d\'Arc Adaptat, Inclusiu i Salut, 11 d\'abril de 2026',day:31,mon:'MAR',year:2026,url:'docs/2026033119305626-CIRC_2617_1a_tirada_Arc_Adaptat_2026.pdf'},
  {id:83,type:'camp',num:'CIRC-2618',title:'3ª Tirada Lliga Catalana de Camp 2025/2026 (Montcada i Reixac)',desc:'Informació i inscripcions per a la 3a tirada de la Lliga Catalana de Camp, 3 de maig de 2026',day:14,mon:'ABR',year:2026,url:'docs/2026041612561787-CIRC_2618_3a_tirada_lliga_cat_camp_2025_26.pdf'},
  {id:84,type:'fed',num:'CIRC-2619',title:'Ajut al I Gran Premi de Promeses (LLNJCM)',desc:'Sol·licitud d\'ajut de la FCTA per participar al I Gran Premi de Promeses de la Lliga Nacional de Joves Competidors i Mèrit',day:15,mon:'ABR',year:2026,url:'docs/2026041616190035-CIRC_2619_AJUT_A_I_GRAN_PREMI_PROMESES_LLNJCM.pdf'},
  {id:85,type:'3d',num:'CIRC-2620',title:'Comunicació de Participació – Campionat d\'Espanya de 3D',desc:'Comunicació i llista de participants catalans al Campionat d\'Espanya de 3D',day:16,mon:'ABR',year:2026,url:'docs/2026041615182240-CIRC_2620_COMUNICACIO_PARTICIPACIO_CT-ESP_3D.pdf'},
  {id:86,type:'jut',num:'RFETA-INFO',title:'Circular informativa RFETA – Curs de Jutges RFETA Nivell 1 (Barcelona)',desc:'Circular informativa de la RFETA sobre el curs de jutges RFETA de Nivell 1 a Catalunya',day:17,mon:'ABR',year:2026,url:'docs/2026041711342092-Circular_curso_jueces_RFETA_nivel_1_CATALUNA_2026.pdf'},
  {id:87,type:'camp',num:'CIRC-2621',title:'56è Campionat de Catalunya de Camp 2025/2026 (Montcada i Reixac)',desc:'Convocatòria, normes i inscripcions del 56è Campionat de Catalunya de Camp, 10 de maig de 2026',day:21,mon:'ABR',year:2026,url:'docs/2026042115274986-CIRC_2621_56e_Campionat_Catalunya_Camp_2025_2026.pdf'},
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
  {id:7, type:'trd',  title:'30è Campionat de Catalunya 3D',               disc:'3D',    date:'17 mai 2026',     dateISO:'2026-05-17', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2623', url:'#',                                        ianseo:28099},
  {id:2, type:'camp', title:'56è Campionat de Catalunya de Camp',           disc:'Tir de Camp',  date:'10 mai 2026',     dateISO:'2026-05-10', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2621', url:'#news:2',                                  ianseo:28098},
  {id:9, type:'camp', title:'3ª Tirada Lliga Catalana Camp 2026',           disc:'Tir de Camp',  date:'3 mai 2026',      dateISO:'2026-05-03', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2618', url:'#',                                        ianseo:27988},
  {id:10,type:'trd',  title:'4ª Tirada Lliga Catalana 3D 2026',            disc:'3D',    date:'12 abr 2026',     dateISO:'2026-04-12', loc:'Castellnou del Bages (Barcelona)', status:'open',   circ:'CIRC-2615', url:'#',                                        ianseo:27589},
  {id:11,type:'al',   title:'2ª Tirada Lliga Catalana Aire Lliure 2026',   disc:'Aire Lliure',  date:'18 abr 2026',     dateISO:'2026-04-18', loc:'Olivella / Figueres',              status:'open',   circ:'CIRC-2614', url:'#news:3',                                  ianseo:27633},
  {id:5, type:'al',   title:'Campionat de Catalunya Universitari 2026',    disc:'Aire Lliure',  date:'28 mar 2026',     dateISO:'2026-03-28', loc:'Tarragona',                        status:'open',   circ:'CIRC-2616', url:'#news:5',                                  ianseo:27386},
  {id:13,type:'al',   title:'1ª Tirada Lliga Catalana Aire Lliure 2026',   disc:'Aire Lliure',  date:'14 mar 2026',     dateISO:'2026-03-14', loc:'Olesa de Montserrat / Sant Celoni',status:'open',   circ:'CIRC-2610', url:'#',                                        ianseo:27062},
  {id:129,type:'al',  title:'1ª Tirada Lliga Catalana AL 2026 (Sant Celoni)',disc:'Aire Lliure', date:'14 mar 2026',     dateISO:'2026-03-14', loc:'Sant Celoni (Vallès Oriental)',    status:'open',   circ:'CIRC-2610', url:'#',                                        ianseo:27064},
  {id:12,type:'camp', title:'2ª Tirada Lliga Catalana Camp 2026',           disc:'Tir de Camp',  date:'8 mar 2026',      dateISO:'2026-03-08', loc:'Montcada i Reixac',                status:'open',   circ:'CIRC-2609',         url:'#news:46',                                        ianseo:26987},
  {id:3, type:'trd',  title:'3ª Tirada Lliga Catalana 3D 2026',            disc:'3D',    date:'22 feb 2026',     dateISO:'2026-02-22', loc:'Olivella (Barcelona)',              status:'open',   circ:'CIRC-2606', url:'#news:45',                                        ianseo:26790},
  {id:8, type:'sala', title:'58è Campionat de Catalunya de Sala',          disc:'Sala – 18m',   date:'31 gen 2026',     dateISO:'2026-01-31', loc:'Manresa / Constantí',              status:'open',   circ:'#',         url:'#news:42',                                        ianseo:26399},
  {id:19,type:'al',   title:'I Trofeu Vila de Cambrils',                   disc:'Aire Lliure',  date:'24 gen 2026',     dateISO:'2026-01-24', loc:'Cambrils (Tarragonès)',             status:'open',   circ:'#',         url:'#',                                        ianseo:26423},
  {id:20,type:'trd',  title:'1r Campionat Catalunya 3D en Línia 2026',     disc:'3D',    date:'18 gen 2026',     dateISO:'2026-01-18', loc:'Sant Celoni (Vallès Oriental)',     status:'open',   circ:'#',         url:'#news:40',                                        ianseo:26307},
  {id:6, type:'camp', title:'1ª Tirada Lliga Catalana Camp 2025/26',       disc:'Tir de Camp',  date:'11 gen 2026',     dateISO:'2026-01-11', loc:'Castellnou del Bages (Barcelona)', status:'open',   circ:'CIRC-2567', url:'#',                                        ianseo:26209},
  // ── Temporada 2025 (desembre) ────────────────────────────
  {id:21,type:'sala', title:'Campionat de Catalunya de Clubs 2025 – Sala', disc:'Sala – 18m',   date:'21 des 2025',     dateISO:'2025-12-21', loc:'Manresa',                          status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=FCTALS6',  ianseo:'FCTALS6'},
  {id:22,type:'sala', title:'Trofeu Màster de Catalunya Indoor 2025',      disc:'Sala – 18m',   date:'21 des 2025',     dateISO:'2025-12-21', loc:'Manresa',                          status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=FCTALS5',  ianseo:'FCTALS5'},
  {id:23,type:'trd',  title:'3ª Tirada Lliga Catalana 3D en Línia 2025/26',disc:'3D',    date:'27-28 des 2025',  dateISO:'2025-12-27', loc:'Club Tir amb Arc Les Franqueses',  status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CAT3DLZ',  ianseo:'CAT3DLZ'},
  {id:24,type:'trd',  title:'2ª Tirada Lliga Catalana 3D 2025/2026',       disc:'3D',    date:'14 des 2025',     dateISO:'2025-12-14', loc:'Castellnou de Bages (Barcelona)',  status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=CAT3D26z', ianseo:'CAT3D26z'},
  {id:25,type:'al',   title:'2ª Trobada Lliga Inicia\'t 2025/2026',        disc:'Aire Lliure',  date:'13 des 2025',     dateISO:'2025-12-13', loc:'Montcada i Reixac',                status:'closed', circ:'#',         url:'https://www.ianseo.net/Details.php?toId=INIC25B',  ianseo:'INIC25B'},
  {id:30,type:'sala', title:'4ª Tirada Lliga Catalana de Sala 2025/2026',  disc:'Sala – 18m',   date:'6-7 des 2025',    dateISO:'2025-12-06', loc:'Constantí (Tarragona)',             status:'closed', circ:'#',         url:'#news:37',                                                ianseo:25582},
  // ── Temporada 2025 (novembre-setembre) ──────────────────
  {id:31,type:'trd',  title:'3D en Línia 2ª Tirada 2025/2026',             disc:'3D',    date:'29-30 nov 2025',  dateISO:'2025-11-29', loc:'En línia (clubs participants)',      status:'closed', circ:'#',         url:'#',                                                ianseo:'CAT3DLB'},
  {id:32,type:'sala', title:'3ª Tirada Lliga Catalana de Sala 2025/2026',  disc:'Sala – 18m',   date:'15-16 nov 2025',  dateISO:'2025-11-15', loc:'Manresa / Torrefarrera (Lleida)',   status:'closed', circ:'#',         url:'#news:36',                                                ianseo:25272},
  {id:33,type:'trd',  title:'3D en Línia 1ª Tirada 2025/2026',             disc:'3D',    date:'1-2 nov 2025',    dateISO:'2025-11-01', loc:'En línia (clubs participants)',      status:'closed', circ:'#',         url:'#',                                                ianseo:'CAT3DLA'},
  {id:34,type:'trd',  title:'1ª Tirada Lliga Catalana 3D 2025/2026',       disc:'3D',    date:'26 oct 2025',     dateISO:'2025-10-26', loc:'Pardines (Girona)',                  status:'closed', circ:'#',         url:'#',                                                ianseo:'CAT3D26A'},
  {id:35,type:'sala', title:'2ª Tirada Lliga Catalana de Sala 2025/2026',  disc:'Sala – 18m',   date:'18-19 oct 2025',  dateISO:'2025-10-18', loc:'Constantí / Torrefarrera (Lleida)', status:'closed', circ:'#',         url:'#',                                                ianseo:24861},
  {id:36,type:'al',   title:'1ª Trobada Lliga Inicia\'t 2025/2026',        disc:'Aire Lliure',  date:'11 oct 2025',     dateISO:'2025-10-11', loc:'Montcada i Reixac',                  status:'closed', circ:'#',         url:'#',                                                ianseo:'INICIA25'},
  {id:37,type:'sala', title:'1ª Tirada Lliga Catalana de Sala 2025/2026',  disc:'Sala – 18m',   date:'4-5 oct 2025',    dateISO:'2025-10-04', loc:'Constantí (Tarragona)',              status:'closed', circ:'#',         url:'#',                                                ianseo:24680},
  {id:38,type:'al',   title:'XXXII Trofeu Ciutat de Lleida – III Copa Pirineus – IV Memorial Alfred Piñol', disc:'Aire Lliure', date:'27-28 set 2025', dateISO:'2025-09-27', loc:'Lleida (Pardinyes)',   status:'closed', circ:'#', url:'#', ianseo:23781},
  {id:39,type:'al',   title:'XXII Copa Barcelona Femenina – XXXV Trofeu Mercè Esportiva', disc:'Aire Lliure', date:'28 set 2025', dateISO:'2025-09-28', loc:'Barcelona (Montjuïc)',       status:'closed', circ:'#', url:'#', ianseo:'CamCF25'},
  {id:40,type:'al',   title:'XXI Campionat de Catalunya de Round 900 – XII Memorial Jordi Adell', disc:'Aire Lliure', date:'6-7 set 2025', dateISO:'2025-09-06', loc:'Barcelona (Montjuïc)', status:'closed', circ:'#', url:'#news:35', ianseo:24295},
  // ── Temporada 2026-27 ────────────────────────────────────
  // 3D en Línia
  {id:101,type:'trd', title:'1ª Tirada Lliga Catalana 3D en Línia 2026/27', disc:'3D', date:'18 oct 2026',    dateISO:'2026-10-18', loc:'Figueres (Girona)', status:'soon', circ:'CIRC-2651', url:'#'},
  {id:102,type:'trd', title:'2ª Tirada Lliga Catalana 3D en Línia 2026/27', disc:'3D', date:'15 nov 2026',    dateISO:'2026-11-15', loc:'Per determinar', status:'soon', circ:'CIRC-2627', url:'#'},
  {id:103,type:'trd', title:'3ª Tirada Lliga Catalana 3D en Línia 2026/27', disc:'3D', date:'13 des 2026',    dateISO:'2026-12-13', loc:'Per determinar', status:'soon', circ:'CIRC-2627', url:'#'},
  {id:104,type:'trd', title:'Campionat de Catalunya de 3D en Línia 2026/27', disc:'3D', date:'10 gen 2027',   dateISO:'2027-01-10', loc:'Per determinar', status:'soon', circ:'CIRC-2627', url:'#'},
  {id:105,type:'trd', title:'Campionat d\'Espanya 3D Sala',                  disc:'3D', date:'22-24 gen 2027', dateISO:'2027-01-22', loc:'Per determinar', status:'soon', circ:'#',         url:'#'},
  // Sala
  {id:106,type:'sala',title:'1ª Tirada Lliga Catalana de Sala 2026/27',     disc:'Sala – 18m', date:'24-25 oct 2026',  dateISO:'2026-10-24', loc:'Olesa de Montserrat / Constantí', status:'soon', circ:'CIRC-2654', url:'#'},
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
  // ── Temporada 2026-27: afegides des de fcta.cat ──
  {id:131,type:'al',title:'XXII Campionat de Catalunya de Round 900 – XIII Memorial Jordi Adell',disc:'Aire Lliure',date:'26-27 set 2026',dateISO:'2026-09-26',loc:'Barcelona',status:'soon',circ:'CIRC-2648',url:'#'},
  {id:132,type:'al',title:'1ª Tirada Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut 2026/27',disc:'Arc Adaptat',date:'17 oct 2026',dateISO:'2026-10-17',loc:'Olesa de Montserrat (Barcelona)',status:'soon',circ:'CIRC-2652',url:'#'},
  // ── Arc Adaptat, Inclusiu i Salut 2025/26 ──
  {id:133,type:'al',title:'1r Torneig d\'Arc Adaptat, Inclusiu i Salut',disc:'Arc Adaptat',date:'7 feb 2026',dateISO:'2026-02-07',loc:'Olesa de Montserrat (Barcelona)',status:'closed',circ:'CIRC-2605',url:'#news:43'},
  {id:134,type:'al',title:'1ª Tirada Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut',disc:'Arc Adaptat',date:'11 abr 2026',dateISO:'2026-04-11',loc:'Olesa de Montserrat (Barcelona)',status:'closed',circ:'CIRC-2617',url:'#'},
  {id:135,type:'al',title:'2ª Tirada Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut',disc:'Arc Adaptat',date:'9 mai 2026',dateISO:'2026-05-09',loc:'Olesa de Montserrat / Sant Cugat',status:'closed',circ:'CIRC-2628',url:'#'},
  {id:136,type:'al',title:'3ª Tirada Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut',disc:'Arc Adaptat',date:'31 mai 2026',dateISO:'2026-05-31',loc:'Olivella (Barcelona)',status:'closed',circ:'CIRC-2628',url:'#'},
  {id:137,type:'al',title:'4ª Tirada Lliga Catalana d\'Arc Adaptat, Inclusiu i Salut',disc:'Arc Adaptat',date:'14 jun 2026',dateISO:'2026-06-14',loc:'Vilanova i la Geltrú (Barcelona)',status:'closed',circ:'CIRC-2631',url:'#'},
  {id:138,type:'al',title:'Campionat de Catalunya d\'Arc Adaptat, Inclusiu i Salut',disc:'Arc Adaptat',date:'4 jul 2026',dateISO:'2026-07-04',loc:'Olesa de Montserrat (Barcelona)',status:'closed',circ:'CIRC-2628',url:'#'},
  // ── Temporada 2024-25 (octubre 2024 – juliol 2025) ──
  {id:140,type:'sala',title:'1ª Tirada Lliga Catalana de Sala 2024/2025',disc:'Sala – 18m',date:'12-13 oct 2024',dateISO:'2024-10-12',loc:'Caldes de Montbui (Barcelona)',status:'closed',circ:'#',url:'#'},
  {id:141,type:'camp',title:'1ª Tirada Lliga Catalana de Camp 2024/2025',disc:'Tir de Camp',date:'20 oct 2024',dateISO:'2024-10-20',loc:'Castellnou del Bages (Barcelona)',status:'closed',circ:'#',url:'#'},
  {id:142,type:'sala',title:'2ª Tirada Lliga Catalana de Sala 2024/2025',disc:'Sala – 18m',date:'26-27 oct 2024',dateISO:'2024-10-26',loc:'Torrefarrera (Lleida) / Constantí (Tarragona)',status:'closed',circ:'#',url:'#'},
  {id:143,type:'trd',title:'1ª Tirada Lliga Catalana 3D 2024/2025',disc:'3D',date:'10 nov 2024',dateISO:'2024-11-10',loc:'Montcada i Reixac (Barcelona)',status:'closed',circ:'#',url:'#'},
  {id:144,type:'sala',title:'3ª Tirada Lliga Catalana de Sala 2024/2025',disc:'Sala – 18m',date:'16-17 nov 2024',dateISO:'2024-11-16',loc:'Torrefarrera (Lleida) / Constantí (Tarragona)',status:'closed',circ:'#',url:'#'},
  {id:145,type:'camp',title:'2ª Tirada Lliga Catalana de Camp 2024/2025',disc:'Tir de Camp',date:'12 gen 2025',dateISO:'2025-01-12',loc:'Romanyà de la Selva (Girona)',status:'closed',circ:'#',url:'#'},
  {id:146,type:'trd',title:'3ª Tirada Lliga Catalana 3D 2024/2025',disc:'3D',date:'2 feb 2025',dateISO:'2025-02-02',loc:'Montcada i Reixac (Barcelona)',status:'closed',circ:'#',url:'#'},
  {id:147,type:'camp',title:'3ª Tirada Lliga Catalana de Camp 2024/2025',disc:'Tir de Camp',date:'16 feb 2025',dateISO:'2025-02-16',loc:'Caldes de Montbui (Barcelona)',status:'closed',circ:'#',url:'#news:14'},
  {id:148,type:'trd',title:'4ª Tirada Lliga Catalana 3D 2024/2025',disc:'3D',date:'2 mar 2025',dateISO:'2025-03-02',loc:'Rubí (Barcelona)',status:'closed',circ:'#',url:'#news:15'},
  {id:149,type:'camp',title:'4ª Tirada Lliga Catalana de Camp 2024/2025',disc:'Tir de Camp',date:'16 mar 2025',dateISO:'2025-03-16',loc:'Mataró (Barcelona)',status:'closed',circ:'#',url:'#news:18'},
  {id:150,type:'al',title:'1ª Tirada Lliga Catalana d\'Aire Lliure 2024/2025',disc:'Aire Lliure',date:'22-23 mar 2025',dateISO:'2025-03-22',loc:'Lleida (Pardinyes)',status:'closed',circ:'#',url:'#news:19'},
  {id:151,type:'al',title:'Campionat de Catalunya Universitari 2025',disc:'Aire Lliure',date:'13 abr 2025',dateISO:'2025-04-13',loc:'Tarragona (Club TAU)',status:'closed',circ:'#',url:'#'},
  {id:152,type:'al',title:'3ª Tirada Lliga Catalana d\'Aire Lliure 2024/2025',disc:'Aire Lliure',date:'27 abr 2025',dateISO:'2025-04-27',loc:'Esclanyà (Girona)',status:'closed',circ:'#',url:'#news:20'},
  {id:153,type:'trd',title:'29è Campionat de Catalunya 3D 2024/2025',disc:'3D',date:'18 mai 2025',dateISO:'2025-05-18',loc:'Castellnou del Bages (Barcelona)',status:'closed',circ:'#',url:'#news:22'},
  {id:154,type:'al',title:'4ª Tirada Lliga Catalana d\'Aire Lliure 2024/2025',disc:'Aire Lliure',date:'24-25 mai 2025',dateISO:'2025-05-24',loc:'Olesa de Montserrat (Barcelona)',status:'closed',circ:'#',url:'#news:23'},
  {id:155,type:'camp',title:'55è Campionat de Catalunya de Camp 2024/2025',disc:'Tir de Camp',date:'1 jun 2025',dateISO:'2025-06-01',loc:'Romanyà de la Selva (Girona)',status:'closed',circ:'#',url:'#news:25'},
  {id:156,type:'al',title:'75è Campionat de Catalunya d\'Arc Tradicional, Nu i Longbow d\'Aire Lliure',disc:'Aire Lliure',date:'22 jun 2025',dateISO:'2025-06-22',loc:'Les Franqueses del Vallès (Barcelona)',status:'closed',circ:'#',url:'#news:27'},
  {id:157,type:'al',title:'75è Campionat de Catalunya d\'Arc Recorbat i Compost d\'Aire Lliure',disc:'Aire Lliure',date:'6 jul 2025',dateISO:'2025-07-06',loc:'Terrassa (Barcelona)',status:'closed',circ:'#',url:'#news:29'},
  {id:158,type:'al',title:'Campionat de Catalunya de Clubs 2025',disc:'Aire Lliure',date:'13 jul 2025',dateISO:'2025-07-13',loc:'Lleida (Pardinyes)',status:'closed',circ:'#',url:'#news:32'},
],

// --- NOTÍCIES ---
news: [
  {id:49,cat:'Federació',title:'Llicència federativa: com accedir al Portal del federat',date:'22 set 2026',desc:'Guia pas a pas per entrar per primera vegada al Portal del federat de la RFETA, acceptar la protecció de dades i descarregar la llicència al mòbil o en PDF.',url:'#news:49'},
  {id:48,cat:'Federació',title:'Aclariment sobre la coincidència d\'una tirada de la Lliga Catalana amb Nîmes',date:'15 ago 2026',desc:'La FCTA explica els criteris seguits en l\'elaboració del calendari de la Lliga Catalana arran de la coincidència amb el Nîmes Archery Tournament.',url:'#news:48'},
  {id:47,cat:'Formació',title:'Arrenca la nova edició del Curs de Tècnic Nivell 1 en Tir amb Arc',date:'17 mar 2026',desc:'Un grup de 23 alumnes inicia el curs amb les primeres sessions de didàctica i metodologia.',img:'img/news/noticia47.jpg',url:'#news:47'},
  {id:46,cat:'Camp',title:'Segona cita de la Lliga Catalana de Camp 2025/2026',date:'11 mar 2026',desc:'41 esportistes a la 2a tirada de camp, el 8 de març al Club Català de Tir amb Arc.',img:'img/news/noticia46.jpg',url:'#news:46'},
  {id:45,cat:'3D',title:'Gran jornada de 3D a Olivella',date:'25 feb 2026',desc:'105 esportistes a la 3a tirada de la Lliga Catalana 3D, organitzada pel Club Arquers Olivella.',img:'img/news/noticia45.jpg',url:'#news:45'},
  {id:44,cat:'Sala',title:'Catalunya suma dues medalles als Campionats d\'Espanya de Sala a Valladolid',date:'17 feb 2026',desc:'Plata per a Gloria Moreton (U15) i bronze per a l\'equip femení recorbat U18; 4es posicions a l\'absolut.',img:'img/news/noticia44.jpg',url:'#news:44'},
  {id:43,cat:'Arc Adaptat',title:'Èxit del 1r Torneig d\'Arc Adaptat, Inclusiu i Salut a Olesa de Montserrat',date:'9 feb 2026',desc:'El 7 de febrer, al Tir Arc Olesa, amb una categoria específica per al projecte de limfedema en pacients oncològics.',img:'img/news/noticia43.jpg',url:'#news:43'},
  {id:42,cat:'Sala',title:'Constantí i Manresa acullen el 58è Campionat de Catalunya de Tir en Sala',date:'3 feb 2026',desc:'Més de 170 arquers i 22 nous campions i campiones de Catalunya de sala.',img:'img/news/noticia42.jpg',url:'#news:42'},
  {id:41,cat:'3D',title:'Èxits i medalles per als esportistes catalans a Ciudad Real',date:'26 gen 2026',desc:'6 medalles individuals i 4 per equips als Campionats d\'Espanya 3D en sala i d\'arc tradicional, nu i longbow.',img:'img/news/noticia41.jpg',url:'#news:41'},
  {id:40,cat:'3D',title:'Sant Celoni acull el 1r Campionat de Catalunya de Tir amb Arc 3D en Línia',date:'19 gen 2026',desc:'El Club Arc Sant Celoni organitza el 18 de gener la primera edició d\'aquesta competició pionera.',img:'img/news/noticia40.jpg',url:'#news:40'},
  {id:39,cat:'Sala',title:'Èxit de participació al Campionat de Catalunya de Clubs de Tir en Sala',date:'22 des 2025',desc:'138 esportistes en 36 equips de 15 clubs a Manresa, i Trofeu Màster de Catalunya amb els millors de la Lliga.',img:'img/news/noticia39.jpg',url:'#news:39'},
  {id:38,cat:'3D',title:'El Bages acull la 2a tirada de la Lliga Catalana 3D 2025/2026',date:'18 des 2025',desc:'Gairebé un centenar d\'arquers de 22 clubs al Club Tir amb Arc Zen del Bages, amb el nou equip complet d\'Ianseo de la FCTA.',img:'img/news/noticia38.jpg',url:'#news:38'},
  {id:37,cat:'Sala',title:'La Lliga Catalana de Sala 2025/2026 es tanca amb una gran 4a tirada a Constantí',date:'11 des 2025',desc:'Gairebé 200 esportistes omplen les línies de tir en la jornada que tanca la lliga de sala.',img:'img/news/noticia37.jpg',url:'#news:37'},
  {id:36,cat:'Sala',title:'Gran participació a la 3a tirada de la Lliga Catalana de Sala 2025/2026',date:'20 nov 2025',desc:'230 participants omplen les línies de tir a Manresa i Torrefarrera.',img:'img/news/noticia36.jpg',url:'#news:36'},
  {id:35,cat:'Aire Lliure',title:'21è Campionat de Catalunya de Round 900',date:'7 set 2025',desc:'85 esportistes al 21è Campionat de Catalunya Round 900 i Memorial Jordi Adell, al Club Arc Montjuïc.',img:'img/news/noticia35.jpg',url:'#news:35'},
  {id:34,cat:'3D',title:'Lliga 3D en línia, temporada 2025/2026',date:'29 jul 2025',desc:'Prova pilot amb tres competicions no oficials i un Campionat de Catalunya oficial de 3D en línia, gestionat a través d\'Ianseo.',url:'#news:34'},
  {id:33,cat:'Aire Lliure',title:'Campionats d\'Espanya d\'Arc Recorbat i Compost 2025',date:'28 jul 2025',desc:'L\'equip català tanca la temporada amb 25 esportistes a l\'absolut i 26 a les categories U21, U18, U15 i +50, i bronze per a l\'equip femení de compost.',img:'img/news/noticia33.jpg',url:'#news:33'},
  {id:32,cat:'Aire Lliure',title:'Tir amb arc i treball en equip al Campionat de Catalunya de Clubs 2025',date:'14 jul 2025',desc:'17 equips de clubs d\'arreu de Catalunya competeixen al Club Tir amb Arc Pardinyes.',img:'img/news/noticia32.jpg',url:'#news:32'},
  {id:31,cat:'Arc Adaptat',title:'Èxit de participació a la sessió formativa «Tir amb arc i prevenció del limfedema»',date:'12 jul 2025',desc:'16 participants a la Casa de l\'Esport de Barcelona en una jornada pionera sobre l\'aplicació terapèutica del tir amb arc.',url:'#news:31'},
  {id:30,cat:'Formació',title:'Seminari d\'arc longbow i tradicional a Barcelona',date:'7 jul 2025',desc:'Seminari intensiu de dos dies impartit per Jairo Valentín sobre tècnica i processos psicològics aplicats a l\'entrenament i la competició.',img:'img/news/noticia30.jpg',url:'#news:30'},
  {id:29,cat:'Aire Lliure',title:'El 75è Campionat de Catalunya d\'Arc Recorbat i Compost tanca la temporada a Terrassa',date:'6 jul 2025',desc:'Més de 100 esportistes de 22 clubs al Club Arquers Terrassa, amb entrega de premis de la Lliga Catalana d\'Aire Lliure 2024/2025.',img:'img/news/noticia29.jpg',url:'#news:29'},
  {id:28,cat:'Aire Lliure',title:'Rècords i medalles al Campionat d\'Espanya d\'Arc Tradicional, Nu i Longbow 2025',date:'30 jun 2025',desc:'22 arquers catalans a Madrid, amb dos nous rècords d\'Espanya per equips: 1812 punts (tradicional masculí) i 1267 punts (tradicional mixt).',img:'img/news/noticia28.jpg',url:'#news:28'},
  {id:27,cat:'Aire Lliure',title:'75è Campionat de Catalunya d\'Arc Tradicional, Nu i Longbow a Les Franqueses',date:'22 jun 2025',desc:'79 arquers de 22 clubs competeixen al Club Tir amb Arc Les Franqueses. Ja està disponible el rànquing final català 2024/2025.',img:'img/news/noticia27.jpg',url:'#news:27'},
  {id:26,cat:'Camp',title:'Catalunya triomfa al Campionat d\'Espanya de Camp amb 11 medalles',date:'10 jun 2025',desc:'Segòvia acull el Campionat d\'Espanya de Camp 2025, amb Catalunya al capdavant del medaller amb 11 medalles.',img:'img/news/noticia26.jpg',url:'#news:26'},
  {id:25,cat:'Camp',title:'Final de temporada de camp amb el 55è Campionat de Catalunya a Romanyà de la Selva',date:'2 jun 2025',desc:'Fins a 60 arquers de 17 clubs tanquen la temporada 2024/2025 de tir de camp al Club Tir amb Arc Costa Brava 3D.',img:'img/news/noticia25.jpg',url:'#news:25'},
  {id:24,cat:'3D',title:'Èxit català al Campionat d\'Espanya 3D 2025 a Sòria',date:'27 mai 2025',desc:'Més de 25 arquers catalans competeixen a Sòria amb or per a Jordi Ricart i per a l\'equip de compost mixt.',img:'img/news/noticia24.jpg',url:'#news:24'},
  {id:23,cat:'Aire Lliure',title:'Gran cloenda de la Lliga Catalana d\'Aire Lliure a Olesa de Montserrat',date:'26 mai 2025',desc:'174 arquers de 28 clubs a la 4a i última tirada de la Lliga Catalana d\'Aire Lliure 2024/2025 al Tir Arc Olesa.',img:'img/news/noticia23.jpg',url:'#news:23'},
  {id:22,cat:'3D',title:'Celebrat amb èxit el 29è Campionat de Catalunya 3D 2024/2025 a Castellnou del Bages',date:'20 mai 2025',desc:'90 arquers de 21 clubs competeixen al Club Tir amb Arc Zen del Bages en compost, nu, longbow i tradicional.',img:'img/news/noticia22.jpg',url:'#news:22'},
  {id:21,cat:'Arc Adaptat',title:'Jornada de portes obertes per la prevenció del limfedema amb tir amb arc',date:'7 mai 2025',desc:'El diumenge 11 de maig, al Club Tir Arc Olesa, una jornada per descobrir el tir amb arc com a eina terapèutica per a persones que han superat un càncer de mama.',img:'img/news/noticia21.jpg',url:'#news:21'},
  {id:20,cat:'Aire Lliure',title:'Esclanyà acull la 3a tirada de la Lliga Catalana d\'Aire Lliure',date:'30 abr 2025',desc:'156 esportistes de 27 clubs competeixen a Esclanyà (Girona) en dos torns, matí i tarda.',img:'img/news/noticia20.jpg',url:'#news:20'},
  {id:19,cat:'Aire Lliure',title:'Inici de la temporada d\'aire lliure amb la 1a tirada de la Lliga Catalana 2024/2025',date:'26 mar 2025',desc:'230 arquers de 33 clubs competeixen a Pardinyes (Lleida) a la primera tirada d\'aire lliure.',img:'img/news/noticia19.jpg',url:'#news:19'},
  {id:18,cat:'Camp',title:'Conclou la Lliga Catalana de Tir de Camp 2024/2025',date:'19 mar 2025',desc:'55 esportistes de 12 clubs competeixen a Mataró a la 4a i última tirada de la lliga de camp.',img:'img/news/noticia18.jpg',url:'#news:18'},
  {id:17,cat:'Jutges',title:'Nou límit de temps per fletxa en competicions',date:'14 mar 2025',desc:'A partir d\'aquesta temporada, el temps per tirar cada fletxa es redueix a 30 segons en les competicions nacionals i catalanes (excepte camp, 3D i discapacitat).',url:'#news:17'},
  {id:16,cat:'Federació',title:'Per una carrera sense obstacles – 8M, Dia Internacional de la Dona',date:'7 mar 2025',desc:'La FCTA reafirma el seu compromís amb la igualtat de gènere i la participació femenina a l\'esport.',img:'img/news/noticia16.jpg',url:'#news:16'},
  {id:15,cat:'3D',title:'Finalitza la Lliga Catalana de 3D amb la quarta tirada a Rubí',date:'2 mar 2025',desc:'100 arquers de 26 clubs competeixen a la 4a i última tirada de la Lliga Catalana 3D 2024/2025 al Club Arqueros de Rubí.',img:'img/news/noticia15.jpg',url:'#news:15'},
  {id:14,cat:'Camp',title:'3a Tirada de la Lliga Catalana de Camp 2024/2025',date:'16 feb 2025',desc:'El Club de Tir amb Arc Caldes de Montbui reuneix 71 participants de 17 clubs a la 3a tirada de la lliga de camp.',img:'img/news/noticia14.jpg',url:'#news:14'},
  {id:13,cat:'Sala',title:'Campionat d\'Espanya d\'Arc Recorbat i Compost en Sala 2024/2025',date:'11 feb 2025',desc:'Valladolid acull el Campionat d\'Espanya de sala amb 23 esportistes catalans a les categories U15, U18 i U21 i 25 a l\'absolut. Bronze per a l\'equip compost U21 i plata per a Elia Canales.',img:'img/news/noticia13.jpg',url:'#news:13'},
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
  {id:110, disc:'al',    nom:'Taula actualitzada de dianes i distàncies de Sala (14/10/2026)', url:'docs/2026101415411743-SALAALL_Quadre_edats_distancies_dianes_14_10_2026.pdf', icon:'📐'},
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
      {num:'1ª',   data:'11 abr 2026', lloc:'Olesa de Montserrat',            status:'closed', circ:'CIRC-2617'},
      {num:'2ª',   data:'9 mai 2026',  lloc:'Olesa de Montserrat / Sant Cugat', status:'closed', circ:'CIRC-2628'},
      {num:'3ª',   data:'31 mai 2026', lloc:'Olivella',                         status:'closed', circ:'CIRC-2628'},
      {num:'4ª',   data:'14 jun 2026', lloc:'Vilanova i la Geltrú',             status:'closed', circ:'CIRC-2631'},
      {num:'Campionat', data:'4 jul 2026', lloc:'Olesa de Montserrat',          status:'closed', circ:'CIRC-2628'}
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

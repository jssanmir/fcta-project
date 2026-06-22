import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Maps
DIV_MAP = {
    'Recorbat': 'Recorbat', 'Arc Nu': 'Arc Nu', 'Longbow': 'Longbow',
    'Tradicional': 'Tradicional', 'Compost': 'Compost',
}
CAT_MAP = {
    '| Dona':       ('Senior','D'), '| Home':       ('Senior','H'),
    '| 50+ Dona':   ('50+','D'),    '| 50+ Home':   ('50+','H'),
    '| Sub 21 Dona':('Sub-21','D'), '| Sub 21 Home':('Sub-21','H'),
    '| Sub 18 Dona':('Sub-18','D'), '| Sub 18 Home':('Sub-18','H'),
    '| Sub 15 Dona':('Sub-15','D'), '| Sub 15 Home':('Sub-15','H'),
}

def jsfmt(p):
    if not p: return 'null'
    name = (p[0] or '').replace("'", "\\'")
    club = (p[1] or '').replace("'", "\\'")
    return "['%s','%s']" % (name, club)

def jsline(r):
    return "      { cat:'%s', div:'%s', sex:'%s', or:%s, argent:%s, bronze:%s }" % (
        r['cat'], r['div'], r['sex'], jsfmt(r['or']), jsfmt(r['argent']), jsfmt(r['bronze'])
    )

def print_block(nom, data, lloc):
    print("    {")
    print("      nom: '%s'," % nom)
    print("      data: '%s'," % data)
    print("      lloc: '%s'," % lloc)
    print("      resultats: [")
    for r in data_to_res(r_data):
        print(jsline(r) + ',')
    print("      ]")
    print("    }")

def mk(div, cat_raw, or_, arg=None, bro=None):
    cat_sex = CAT_MAP.get('| ' + cat_raw)
    if not cat_sex: return None
    cat, sex = cat_sex
    return {'cat': cat, 'div': div, 'sex': sex, 'or': or_, 'argent': arg, 'bronze': bro}

def p(name, club=''):
    return (name, club)

# ── LLIGA SALA ─────────────────────────────────────────────────
sala_res = [
    mk('Recorbat',    'Dona',     p('Nuria Barbera Lopez','Arquers Castelldefels'),     p('Maria Luisa Garcia Castellanos'), p('Violeta Nogueira Nogueira','Arquers Castelldefels')),
    mk('Recorbat',    'Home',     p('Sergi Cebrian Pujol'),                             p('Erfan Ribas Malekzadeh','Escola Arquers Barcelona'), p("Raul Quiles Garcia",'Arquers Sant Cugat')),
    mk('Recorbat',    '50+ Dona', p('Laura M. Suarez Garrote','Club Tau T.A.'),         p('Montse Gustems Martinez','Arc Montjuic'), p('Montse Pujol Sendra')),
    mk('Recorbat',    'Sub 21 Dona', p('Yanay Moli Astudillo','T.A. Costa Daurada'),    p('Jana Cahue Comas'), p('Maria Perez De Tudela Albalat')),
    mk('Recorbat',    'Sub 21 Home', p('Roc Rueda Domenech'),                           p("Denis Carnicero Huerta",'T.A. L\'Arboç'), p('Jordi Brau Villalon','C.A. Cerdanyola del Valles')),
    mk('Recorbat',    'Sub 18 Dona', p('Edurne Martinez Perez','Club Tau T.A.'),        p('Alma De Arriba Manzano','Club Tau T.A.'), p('Maelyn Macias Martin','Tir Arc Olesa')),
    mk('Recorbat',    'Sub 18 Home', p('Daniel Espes De Haro','Tir Arc Olesa'),         p('Didac Perez Bonavila'), p('Josep Espanyol Franques')),
    mk('Compost',     'Home',     p('Jose Perez Perez','Arc Montjuic'),                 p('Manel Souto Pascual','C.A. Cerdanyola del Valles'), p('Antonio Alvarez Fernandez')),
    mk('Compost',     '50+ Home', p('Jordi Tarrago Marti','T.A. Pardinyes'),            p('Raul Alcocer Bernardino'), p('Francesc Castillo Torres')),
    mk('Compost',     'Sub 21 Home', p('Arnau Barbero Diaz','T.A. Rubi'),               p('Pau Alvarez Babio','T.A. Rubi'), p('Yuri Lou Giral','T.A. Rubi')),
    mk('Arc Nu',      'Dona',     p('Casandra Campo Tellez','T.A. Rubi'),               p('Oyuna Baturova Tsinguyeva','Arquers Terrassa'), p('Ginevra Marina Lazzerini','T.A. Manresa')),
    mk('Arc Nu',      'Home',     p('David Garcia Fernandez','T.A. Rubi'),              p('Victor Lopez Rodriguez','T.A. Les Franqueses'), p('David Rafael Cardozo Ferreira','T.A. Les Franqueses')),
    mk('Arc Nu',      '50+ Dona', p('Laura Dorado Escalera','T.A. Les Franqueses'),     p('Montse Vila Fortuny','T.A. Les Franqueses'), p('Rosa Maria Abad Perez','Arquers Terrassa')),
    mk('Arc Nu',      '50+ Home', p('Miguel Ramirez Moreno','T.A. Les Franqueses'),     p('Francis De Miguel Rodriguez','T.A. Les Franqueses'), p('Oriol Ribalta Aymami','T.A. Encamp')),
    mk('Longbow',     'Dona',     p('Mireia Comas Franch','Draco Sagittariis'),         p('Maria Jose Delgado Falcon','T.A. Les Franqueses'), p('Tania Martinez Bazan','Club Catala T.A.')),
    mk('Longbow',     'Home',     p('Antonio Garcia Martin','T.A. Manresa'),            p('Adria Pla Casellas','Arc Montjuic'), p('Miguel Serrahima Garcia','T.A. Les Franqueses')),
    mk('Longbow',     '50+ Home', p('Isidro Moyano Garcia','T.A. Zen del Bages'),       p("Jose Manuel Ortega Perez","T.A. L'Arboc"), p('Felip Diaz Sanchez','Arquers del Moianes')),
    mk('Tradicional', 'Dona',     p('Ana Lorente Molero','T.A. Les Franqueses'),        p('Maria Isabel Mompean Gimenez','T.A. Caldes de Montbui'), None),
    mk('Tradicional', 'Home',     p('Juanjo Querol Guardiola','T.A. Sant Andreu de la Barca'), p('Aleix Montes Llorens','T.A. Les Franqueses'), p('Albert Borras Andujar','Arquers Terrassa')),
    mk('Tradicional', '50+ Home', p('David Lopez Abad','Tir Arc Olesa'),                p('Enric Diaz Soler'), p('Jorge Rueda Castro')),
]
sala_res = [r for r in sala_res if r]

# ── LLIGA AL ───────────────────────────────────────────────────
al_res = [
    mk('Recorbat',    'Home',     p('Ignasi Gallardo Andres','Draco Sagittariis'),      p('Sergi Cebrian Pujol','Draco Sagittariis'), p('Ruhollah Erfan Ribas Malekzadeh','Escola Arquers Barcelona')),
    mk('Recorbat',    'Dona',     p('Nuria Barbera Lopez','Arquers Castelldefels'),     p('Violeta Nogueira Nogueira','Arquers Castelldefels'), p('Jana Cahue Tomas','Draco Sagittariis')),
    mk('Recorbat',    '50+ Dona', p('Montserrat Gustems Martinez','Arc Montjuic'),      p('Laura M. Suarez Garrote','Club Tau T.A.'), p("Begona Perez Gomez",'Club Tau T.A.')),
    mk('Recorbat',    '50+ Home', p('Daniel Bartoll Rios','Arquers Castelldefels'),     p('Daniel Perez Mas'), p('Joan Salvador Bujaraloz Magrina','T.A. Pardinyes')),
    mk('Recorbat',    'Sub 21 Dona', p('Lucia Quiles Perez','Arquers Sant Cugat'),      p('Maria Perez De Tudela Albalat','Arc Montjuic'), None),
    mk('Recorbat',    'Sub 21 Home', p('Jordi Brau Villalon','C.A. Cerdanyola del Valles'), p('Denis Carnicero Huerta',"T.A. L'Arboc"), p('Marti Ussetti Forn')),
    mk('Recorbat',    'Sub 18 Dona', p('Maelyn Macias Martin','Tir Arc Olesa'),         p('Edurne Martinez Perez'), p('Marta Serra Serrano','Club Tau T.A.')),
    mk('Recorbat',    'Sub 18 Home', p('Guiu Domingo Gonzalez','Escola Arquers Barcelona'), p('Didac Perez Bonavila','Tir Arc Olesa'), p('Josep Espanyol Franques')),
    mk('Compost',     'Home',     p('Jordi Ricart Roig','T.A. Caldes de Montbui'),     p('Jose Perez Perez','Arc Montjuic'), p('Eric Pla Bort','Arc Montjuic')),
    mk('Compost',     'Dona',     p('Alexandra Moura Ribeiro',''),                     p('Maria Pitarch Laguna','T.A. Caldes de Montbui'), p('Ester Semis Astier','Arc Montjuic')),
    mk('Compost',     '50+ Home', p('Josep Castello Folch','Arquers Terrassa'),         p('Javier Montesinos Lopez','T.A. Pardinyes'), p('Francesc Castillo Torres')),
    mk('Compost',     'Sub 21 Home', p('Arnau Barbero Diaz','Arquers Terrassa'),        p('Arnau Font Padros'), p('Yuri Lou Giral','Arquers Terrassa')),
    mk('Arc Nu',      'Dona',     p('Oyuna Baturova Tsinguyeva','Arquers Terrassa'),    p('Maria Eugenia Palomar Gutierrez','Arquers Terrassa'), p('Alba Del Puerto Madrid','Arc Montjuic')),
    mk('Arc Nu',      'Home',     p('Carles Pena Costa'),                              p('David Rafael Cardozo Ferreira','T.A. Les Franqueses'), p('Josep Pla Aymerich','Arc Montjuic')),
    mk('Arc Nu',      '50+ Home', p('Diego Del Puerto Angorrilla'),                    p('Jordi Madi Alsina','Arc Sant Celoni'), p('Josep Traveria Murillo','Arquers Sant Cugat')),
    mk('Longbow',     'Dona',     p('Mireia Comas Franch','Draco Sagittariis'),         p('Maria Lopez Bermudez'), None),
    mk('Longbow',     '50+ Home', p('Jose Luis Velasco Molina','Arquers Castelldefels'), p('Miguel Serrahima Garcia','T.A. Les Franqueses'), p('Alfredo Olaya Lafita')),
    mk('Tradicional', 'Dona',     p('Ana Lorente Molero'),                             p('Monica Carreto Penalba','Tir Arc Olesa'), None),
    mk('Tradicional', 'Home',     p('Aleix Montes Llorens'),                           p('Albert Borras Andujar','Arquers Terrassa'), p('Carlos Ruiz Gomez','T.A. Les Franqueses')),
    mk('Tradicional', '50+ Home', p('David Lopez Abad','Tir Arc Olesa'),               p('Jorge Rueda Castro','Arquers Terrassa'), p('Antonio Valle Arias')),
]
al_res = [r for r in al_res if r]

# ── LLIGA 3D ───────────────────────────────────────────────────
td3_lliga_res = [
    mk('Compost',     'Home',     p('Javier Menchon Martinez','T.A. Caldes de Montbui'), p('Andre Sousa'), None),
    mk('Compost',     'Dona',     p('Maria Pitarch Laguna','T.A. Caldes de Montbui'), None, None),
    mk('Compost',     '50+ Home', p('Francesc Josep Marquez Parareda','T.A. Arquers del Moianes'), None, None),
    mk('Arc Nu',      'Home',     p('David Garcia Fernandez','T.A. Rubi'),              p('David Vivo Ballarin'), p('Juan Carlos Sanchez Mirabal','C.A. Cerdanyola del Valles')),
    mk('Arc Nu',      'Dona',     p('Casandra Campo Tellez','T.A. Rubi'),               p('Jessica Mallen Zafra'), p('Olga Moya Bonilla','Club Catala T.A.')),
    mk('Arc Nu',      '50+ Home', p('Maurici Peralta Tolos','Arquers Sant Cugat'),      p('Ricardo Mainou'), None),
    mk('Arc Nu',      '50+ Dona', p('Irma Mercedes Valeriano','Club Catala T.A.'),      None, None),
    mk('Longbow',     'Home',     p('Enrique Flores Delgado'),                         p('Dionisio Martinez Martinez','Club Arquers Montsant'), p('David Alejo Minarro')),
    mk('Longbow',     'Dona',     p('Marta Gelpi Camallonga'),                         p('Tania Martinez Bazan','Club Catala T.A.'), p('Mireia Comas Franch','Draco Sagittariis')),
    mk('Longbow',     '50+ Home', p('Isidro Moyano Garcia'),                           p('Jose Manuel Marti Martinez','Club Catala T.A.'), p('Fortunato Moreno Alejos')),
    mk('Tradicional', 'Home',     p('Victor Lopez Rodriguez','T.A. Les Franqueses'),    p('Helios Artesero Gonzalez','T.A. Sant Andreu de la Barca'), p('Albert Torres Martinez','T.A. Caldes de Montbui')),
    mk('Tradicional', 'Dona',     p("M.Isabel Mompean Gimenez",'T.A. Caldes de Montbui'), p('Patricia Munoz Domenech'), p('Inmaculada Majoral Fernandez','Club Arquers Vallfosca')),
    mk('Tradicional', '50+ Home', p('Antonio Hita Campillo','T.A. Sant Andreu de la Barca'), p('Josep Maria Mora Lesaca'), p('Manuel Pascual Campisto','Club Arquers de Catalunya')),
    mk('Tradicional', '50+ Dona', p('Rosa Farran Peris'),                              p('Maria Cinta Casas Oliveras','Club Catala T.A.'), p('Blanca Pijuan Sobrin')),
]
td3_lliga_res = [r for r in td3_lliga_res if r]

# ── LLIGA CAMP ──────────────────────────────────────────────────
camp_lliga_res = [
    mk('Compost',     '50+ Home', p('Jordi Mata Martinez'),                            p('Josep Oliva Lopez'), p('Gervasio Garcia Barros')),
    mk('Compost',     'Home',     p('Felipe Baena Cocera'),                            p('Bartolome Jimenez Mejias'), p('Javier Menchon Martinez')),
    mk('Compost',     'Dona',     p('Alexandra Moura Ribeiro'),                        p('Maria Pitarch Laguna'), None),
    mk('Longbow',     '50+ Home', p('Jose Manuel Marti Martinez','Club Catala T.A.'),  p('Antoni Ferrando Bartumeu','Club Catala T.A.'), p('Isidro Moyano Garcia','T.A. Zen del Bages')),
    mk('Longbow',     'Home',     p('David Alejo Minarro','T.A. Rubi'),                p('Juan Jose Ruiz Cabeza','Club Catala T.A.'), p('Julian Zazo Gomez','Arc Sant Celoni')),
    mk('Longbow',     'Dona',     p('Marta Gelpi Camallonga','Club Catala T.A.'),      p('Mireia Comas Franch','Draco Sagittariis'), p('Tania Martinez Bazan','Club Catala T.A.')),
    mk('Arc Nu',      '50+ Home', p('Juan Pedro Serrano Manzano'),                    p('Josep Sanchez Lamarca'), p('Felix Perez Cuevas')),
    mk('Arc Nu',      'Home',     p('David Vivo Ballarin'),                            p('Javier Ribatallada Espasa'), p('Victor Villaran Alfonso')),
    mk('Arc Nu',      'Dona',     p('Casandra Campo Tellez'),                         p('Marta Gimeno Bonells','T.A. L\'Hospitalet'), None),
    mk('Recorbat',    'Home',     p('Ignasi Gallardo Andres'),                         p('Daniel Munoz Malagon'), None),
    mk('Recorbat',    'Dona',     p('Jana Cahue Comas'),                               None, None),
    mk('Tradicional', '50+ Home', p('Antonio Hita Campillo'),                          p('Helios Artesero Gonzalez'), p('David Lopez Abad')),
    mk('Tradicional', '50+ Dona', p('Maria Cinta Casas Oliveras'),                    None, None),
    mk('Tradicional', 'Home',     p('Juan Ramon Moya Garcia','Club Catala T.A.'),      p('Pablo Beceiro Sanmateo','Arquers Sant Cugat'), p('Oscar Martinez Casas','T.A. Manresa')),
    mk('Tradicional', 'Dona',     p("M.Isabel Mompean Gimenez",'T.A. Caldes de Montbui'), None, None),
]
camp_lliga_res = [r for r in camp_lliga_res if r]

# ── OUTPUT ─────────────────────────────────────────────────────
def print_comp(nom, data, lloc, resultats):
    print("    {")
    print("      nom: '" + nom + "',")
    print("      data: '" + data + "',")
    print("      lloc: '" + lloc + "',")
    print("      resultats: [")
    for r in resultats:
        print(jsline(r) + ',')
    print("      ]")
    print("    }")

print("// ━━ PASTE THIS INTO disciplines.js ━━━━━━━━━━━━━━━━━━━━━\n")
print("// SALA (array with campionat + lliga):")
print("  sala: [")
print("    { /* existing campionat entry goes here */ },")
print_comp("Lliga Catalana de Sala 2025-26", "oct–des 2025", "Constantí / Torrefarrera / Manresa", sala_res)
print("  ],\n")

print("// AL (lliga only):")
print("  al: [")
print_comp("Lliga Catalana d'Aire Lliure 2025-26", "mar–jun 2026", "Olesa / Olivella / Barcelona / ST.Celoni / Figueres / Esclanyà", al_res)
print("  ],\n")

print("// 3D extra entry to add to existing array:")
print_comp("Lliga Catalana 3D 2025-26", "oct 2025–abr 2026", "Vallfogona / Castellnou / Olivella", td3_lliga_res)
print()

print("// CAMP (array with campionat + lliga):")
print("  camp: [")
print("    { /* existing campionat entry goes here */ },")
print_comp("Lliga Catalana de Camp 2025-26", "gen–mai 2026", "Arc Zen / CCTA / CCTA", camp_lliga_res)
print("  ]")

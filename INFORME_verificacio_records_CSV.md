# Informe: verificació de rècords de Catalunya amb el CSV enriquit

Font: `competiciones_qualification_round_CAT_enriquecido.csv` (4.089 files, 109 competicions, 964 arquers) — creuat amb `DB.records` (`js/db.js`, 227 rècords homologats) i amb el nou `docs/archer_history_archive.json` regenerat.

Només es comparen rècords de **sala** i **aire lliure** (`al`), que són els únics tipus amb rècords a `DB.records`. Camp i 3D no tenen cap rècord homologat al portal, per tant no es poden verificar.

## Com llegir aquest informe

- **Confiança alta**: el camp `NumFlechas` del CSV té un únic valor numèric i coincideix exactament amb les fletxes que implica el format del rècord (p. ex. `18m/60fl` → 60 fletxes). Comparació fiable.
- **Confiança mitjana**: `NumFlechas` conté diversos valors possibles per a la mateixa fila (p. ex. `"72 (senior) / 144 (veterano)"`) perquè Ianseo no distingeix la subcategoria a la columna. La puntuació és físicament compatible amb el nombre de fletxes del rècord, però cal confirmar-ho a l'acta original.
- **Confiança baixa**: no hi ha dada de `NumFlechas` per aquella fila; només es descarten els casos físicament impossibles (puntuació > 10 punts/fletxa).
- Es descarten automàticament les comparacions on la puntuació superaria el màxim físic pel nombre de fletxes del rècord (p. ex. 1.162 punts no pot ser un resultat a 72 fletxes).
- L'aparellament d'atleta és per nom (normalitzat, sense accents, ordre de paraules indiferent). Amb noms comuns hi pot haver falsos positius — **cal verificar la identitat abans d'homologar res**.

## 1. Candidats a nou rècord de Catalunya (superen la millor marca ja homologada per disc+estil+sexe)

Aquests 7 casos superen la marca **més alta ja registrada** per aquella disciplina/estil/sexe (a qualsevol categoria d'edat), no necessàriament la de la mateixa categoria — cal confirmar la categoria d'edat de l'atleta abans de donar-ho per bo.

| Atleta | Puntuació | Disc | Estil/Sexe | Rècord actual superat | Competició CSV | Confiança |
|---|---|---|---|---|---|---|
| BATUROVA TSINGUYEVA Oyuna | **610** | Aire Lliure | Arc Nu Dona | 597 pts (Sènior, 50m/72fl) — Carmen Sanchez Amado (12/05/2024) | 76è CAMPIONAT CATALUNYA AIRE LLIURE 2026 | alta |
| RUIZ LORENTE Carla | **625** | Aire Lliure | Tradicional Dona | 614 pts (Sènior, 30m/72fl) — Miriam Monfort Fernández (17/07/2021) | 74è CAMPIONAT DE CATALUNYA D'AIRE LLIURE 2024 | mitjana (camp NumFlechas ambigu, verificar) |
| LOPEZ RODRIGUEZ Victor | **592** | Sala | Tradicional Home | 586 pts (Sènior, 18m/60fl) — Juanjo Querol Guardiola (24/10/2021) | 57è CAMPIONAT DE CATALUNYA DE TIR EN SALA (2024-2025) | alta |
| LOPEZ RODRIGUEZ Victor | **589** | Sala | Tradicional Home | 586 pts (Sènior, 18m/60fl) — Juanjo Querol Guardiola (24/10/2021) | Campeonato de España de arco tradicional, longbow y desnudo en sala 2024-2025 | alta |
| LOPEZ RODRIGUEZ Victor | **660** | Aire Lliure | Tradicional Home | 642 pts (Sènior, 30m/72fl) — Juanjo Querol Guardiola (03/10/2021) | Campeonato de España IBERDROLA de Arco Tradicional, Longbow y Arco Desnudo al Aire Libre | alta |
| BATUROVA TSINGUYEVA Oyuna | **612** | Aire Lliure | Arc Nu Dona | 597 pts (Sènior, 50m/72fl) — Carmen Sanchez Amado (12/05/2024) | Campeonato de España IBERDROLA de Arco Tradicional, Longbow y Arco Desnudo al Aire Libre 2025-2026 | alta |
| LOPEZ RODRIGUEZ Victor | **663** | Aire Lliure | Tradicional Home | 642 pts (Sènior, 30m/72fl) — Juanjo Querol Guardiola (03/10/2021) | Campeonatos de España Iberdrola de Arco Tradicional, Longbow y Arco Desnudo al Aire Libre 2024 | baixa (num. fletxes desconegut, verificar manualment) |

## 2. Verificació de rècords existents (l'atleta que consta al rècord apareix al CSV igualant o superant la seva pròpia marca)

Útil per confirmar que la marca homologada és correcta, o detectar que l'atleta ja l'ha superada en una altra competició no recollida a `DB.records`.

37 dels 227 rècords tenen almenys una coincidència amb fletxes compatibles al CSV:

| Rècord (disc/estil/cat/sexe) | Marca actual | Titular | Data rècord | Trobat al CSV | Comp. CSV | Estat |
|---|---|---|---|---|---|---|
| Sala/Recorbat/Prebenjamí/Home (12m/60fl) | 488 | Pablo González Hernández | 19/12/2021 | **536** | 55è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2022-2023 | 🟢 SUPERA (alta) |
| Sala/Recorbat/Benjamí/Home (12m/60fl) | 577 | Daniel Molina Serret | 17/12/2023 | **577** | 56è CAMPIONAT CATALUNYA SALA (2023-2024) - R.A.U.S. | 🟡 iguala (alta) |
| Sala/Recorbat/Sub-18/Dona (18m/60fl) | 580 | Lucia Ramos Valiente | 22/02/2022 | **580** | Campeonatos de España de arco recurvo y arco compuesto en sala 2021-2022 | 🟡 iguala (alta) |
| Sala/Recorbat/Sub-21/Dona (18m/60fl) | 583 | Elia Canales Martin | 22/12/2019 | **587** | Campeonato de España de Arco Recurvo y Arco Compuesto en sala 2024 | 🟢 SUPERA (alta) |
| Sala/Recorbat/Sub-21/Dona (18m/60fl) | 583 | Elia Canales Martin | 22/12/2019 | **585** | Campeonatos de España de arco recurvo y arco compuesto en sala 2021-2022 | 🟢 SUPERA (alta) |
| Sala/Recorbat/Sub-21/Dona (18m/60fl) | 583 | Elia Canales Martin | 22/12/2019 | **587** | Campeonato de España de Arco Recurvo y Arco Compuesto en sala 2024-2025 | 🟢 SUPERA (alta) |
| Sala/Recorbat/Sub-21/Dona (18m/60fl) | 583 | Elia Canales Martin | 22/12/2019 | **587** | Campeonatos de España de Arco Recurvo y Compuesto en Sala 2022-2023 | 🟢 SUPERA (alta) |
| Sala/Recorbat/Sènior/Dona (18m/60fl) | 585 | Elia Canales Martin | 22/02/2022 | **587** | Campeonato de España de Arco Recurvo y Arco Compuesto en sala 2024 | 🟢 SUPERA (alta) |
| Sala/Recorbat/Sènior/Dona (18m/60fl) | 585 | Elia Canales Martin | 22/02/2022 | **585** | Campeonatos de España de arco recurvo y arco compuesto en sala 2021-2022 | 🟡 iguala (alta) |
| Sala/Recorbat/Sènior/Dona (18m/60fl) | 585 | Elia Canales Martin | 22/02/2022 | **587** | Campeonato de España de Arco Recurvo y Arco Compuesto en sala 2024-2025 | 🟢 SUPERA (alta) |
| Sala/Recorbat/Sènior/Dona (18m/60fl) | 585 | Elia Canales Martin | 22/02/2022 | **587** | Campeonatos de España de Arco Recurvo y Compuesto en Sala 2022-2023 | 🟢 SUPERA (alta) |
| Sala/Recorbat/+50/Dona (18m/60fl) | 511 | Begoña Perez Gomez | 31/01/2026 | **511** | 58è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2025-2026 | 🟡 iguala (alta) |
| Sala/Compost/Sub-18/Dona (18m/60fl) | 544 | Núria Sinfreu Abad | 14/11/2021 | **548** | Campeonatos de España de arco recurvo y arco compuesto en sala 2021-2022 | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-18/Dona (18m/60fl) | 544 | Núria Sinfreu Abad | 14/11/2021 | **556** | 57è CAMPIONAT DE CATALUNYA DE TIR EN SALA (2024-2025) | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-18/Dona (18m/60fl) | 544 | Núria Sinfreu Abad | 14/11/2021 | **552** | 58è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2025-2026 | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-18/Dona (18m/60fl) | 544 | Núria Sinfreu Abad | 14/11/2021 | **554** | Campeonato de España de Arco Recurvo y Arco Compuesto en sala 2024-2025 | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-18/Dona (18m/60fl) | 544 | Núria Sinfreu Abad | 14/11/2021 | **554** | Campeonato de España de Arco Recurvo y Arco Compuesto en sala 2024-2025 | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-18/Dona (18m/60fl) | 544 | Núria Sinfreu Abad | 14/11/2021 | **547** | Campeonato de España U21, U18, U15 de Arco Recurvo y Compuesto en Sala 2025-2026 | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-18/Dona (18m/60fl) | 544 | Núria Sinfreu Abad | 14/11/2021 | **549** | Campeonato de España Absoluto de Arco Recurvo y Compuesto en Sala. 2025-2026 | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-18/Dona (18m/60fl) | 544 | Núria Sinfreu Abad | 14/11/2021 | **558** | 4ª TIRADA DE LLIGA CATALANA DE SALA (2025-2026) CONSTANTÍ | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-18/Home (18m/60fl) | 572 | Santiago López Padilla | 19/10/2014 | **573** | 56è CAMPIONAT CATALUNYA SALA (2023-2024) - R.A.U.S. | 🟢 SUPERA (alta) |
| Sala/Compost/Sub-21/Dona (18m/60fl) | 558 | Núria Sinfreu Abad | 06/12/2025 | **558** | 4ª TIRADA DE LLIGA CATALANA DE SALA (2025-2026) CONSTANTÍ | 🟡 iguala (alta) |
| Sala/Compost/Sènior/Dona (18m/60fl) | 580 | Maria Pitarch Laguna | 21/01/2024 | **580** | 57è CAMPIONAT DE CATALUNYA DE TIR EN SALA (2024-2025) | 🟡 iguala (alta) |
| Sala/Arc Nu/Aleví/Home (12m/60fl) | 555 | Mario Ruiz Lorente | 14/01/2023 | **555** | 55è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2022-2023 | 🟡 iguala (alta) |
| Sala/Arc Nu/Sub-18/Dona (18m/60fl) | 377 | Myriam Jiménez Cot | 14/01/2023 | **377** | 55è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2022-2023 | 🟡 iguala (alta) |
| Sala/Arc Nu/Sub-18/Dona (18m/60fl) | 377 | Myriam Jiménez Cot | 14/01/2023 | **397** | 4ª TIRADA DE LLIGA CATALANA DE SALA (2025-2026) CONSTANTÍ | 🟢 SUPERA (alta) |
| Sala/Arc Nu/Sub-18/Home (18m/60fl) | 441 | Dídac Romero Sendrós | 10/12/2023 | **465** | 56è CAMPIONAT CATALUNYA SALA (2023-2024) - R.A.U.S. | 🟢 SUPERA (alta) |
| Sala/Arc Nu/Sub-21/Home (18m/60fl) | 465 | Dídac Romero Sendrós | 17/12/2023 | **465** | 56è CAMPIONAT CATALUNYA SALA (2023-2024) - R.A.U.S. | 🟡 iguala (alta) |
| Sala/Arc Nu/Sènior/Dona (18m/60fl) | 528 | Carme Sanchez Amado | 17/12/2023 | **528** | 56è CAMPIONAT CATALUNYA SALA (2023-2024) - R.A.U.S. | 🟡 iguala (alta) |
| Sala/Arc Nu/Sènior/Home (18m/60fl) | 552 | David García Fernández | 14/11/2021 | **554** | Campeonatos de España de precisión en sala 2020 | 🟢 SUPERA (alta) |
| Sala/Arc Nu/+50/Home (18m/60fl) | 508 | Miguel Ramirez Moreno | 17/12/2023 | **508** | 56è CAMPIONAT CATALUNYA SALA (2023-2024) - R.A.U.S. | 🟡 iguala (alta) |
| Sala/Tradicional/Prebenjamí/Dona (12m/60fl) | 508 | Carla Ruiz Lorente | 05/11/2023 | **530** | 58è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2025-2026 | 🟢 SUPERA (alta) |
| Sala/Tradicional/Prebenjamí/Dona (12m/60fl) | 508 | Carla Ruiz Lorente | 05/11/2023 | **521** | 3ª TIRADA DE LLIGA CATALANA DE SALA (2025-2026) MANRESA | 🟢 SUPERA (alta) |
| Sala/Tradicional/Prebenjamí/Dona (12m/60fl) | 508 | Carla Ruiz Lorente | 05/11/2023 | **524** | 4ª TIRADA DE LLIGA CATALANA DE SALA (2025-2026) CONSTANTÍ | 🟢 SUPERA (alta) |
| Sala/Tradicional/Benjamí/Home (12m/60fl) | 579 | Guerau Montes Barnils | 31/01/2026 | **579** | 58è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2025-2026 | 🟡 iguala (alta) |
| Sala/Tradicional/Aleví/Home (18m/60fl) | 502 | Tian Gual Pocurull | 15/11/2025 | **502** | 3ª TIRADA DE LLIGA CATALANA DE SALA (2025-2026) MANRESA | 🟡 iguala (alta) |
| Sala/Tradicional/Sub-15/Dona (18m/60fl) | 333 | Olivia Laplana Mora | 14/01/2023 | **333** | 55è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2022-2023 | 🟡 iguala (alta) |
| Sala/Tradicional/Sub-18/Dona (18m/60fl) | 445 | Ainhoa Bolancel Bejarano | 27/11/2022 | **485** | 56è CAMPIONAT CATALUNYA SALA (2023-2024) - R.A.U.S. | 🟢 SUPERA (alta) |
| Sala/Tradicional/Sènior/Dona (18m/60fl) | 563 | Ana Lorente Molero | 06/12/2025 | **563** | 4ª TIRADA DE LLIGA CATALANA DE SALA (2025-2026) CONSTANTÍ | 🟡 iguala (alta) |
| Sala/Tradicional/+50/Dona (18m/60fl) | 466 | María Ester Pina Loren | 17/12/2023 | **466** | 56è CAMPIONAT CATALUNYA SALA (2023-2024) - R.A.U.S. | 🟡 iguala (alta) |
| Sala/Tradicional/+50/Home (18m/60fl) | 572 | Jorge Rueda Castro | 15/11/2025 | **572** | 3ª TIRADA DE LLIGA CATALANA DE SALA (2025-2026) MANRESA | 🟡 iguala (alta) |
| Sala/Tradicional/Benjamí/Dona (12m/60fl) | 530 | Carla Ruiz Lorente | 31/01/2026 | **530** | 58è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2025-2026 | 🟡 iguala (alta) |
| Sala/Tradicional/Sub-15/Home (18m/60fl) | 453 | Biel Catalan Villalbi | 31/01/2026 | **453** | 58è CAMPIONAT DE CATALUNYA DE TIR EN SALA 2025-2026 | 🟡 iguala (alta) |
| Aire Lliure/Recorbat/Sub-15/Dona (Round 720 (40+40m)) | 672 | Lucía Ramos Valiente | 31/03/2019 | **679** | Campeonato de España Cadetes y Menores 2019 | 🟢 SUPERA (alta) |
| Aire Lliure/Compost/Sub-18/Home (Round 720 (50+50m)) | 623 | Santiago López Padilla | 24/05/2014 | **650** | Campeonato de España IBERDROLA al Aire Libre 2021-2022 | 🟢 SUPERA (alta) |
| Aire Lliure/Compost/Sub-18/Home (Round 720 (50+50m)) | 623 | Santiago López Padilla | 24/05/2014 | **671** | 72è CAMPIONAT DE CATALUNYA D'AIRE LLIURE 2022 | 🟢 SUPERA (alta) |
| Aire Lliure/Compost/Sub-18/Home (Round 720 (50+50m)) | 623 | Santiago López Padilla | 24/05/2014 | **674** | 74è CAMPIONAT DE CATALUNYA D'AIRE LLIURE 2024 | 🟢 SUPERA (mitjana (camp NumFlechas ambigu, verificar)) |
| Aire Lliure/Compost/Sub-21/Home (Round 720 (50+50m)) | 687 | Jordi Ricart Roig | 20/08/2022 | **700** | Campeonato de España IBERDROLA de Arco Recurvo y Arco Compuesto al Aire Libre (Absoluto) | 🟢 SUPERA (alta) |
| Aire Lliure/Tradicional/Benjamí/Dona (Round 720) | 582 | Carla Ruiz Lorente | 30/05/2026 | **625** | 74è CAMPIONAT DE CATALUNYA D'AIRE LLIURE 2024 | 🟢 SUPERA (mitjana (camp NumFlechas ambigu, verificar)) |
| Aire Lliure/Tradicional/Sub-15/Home (20m/72fl) | 587 | Alex Icke Martínez | 09/07/2023 | **621** | 74è CAMPIONAT DE CATALUNYA D'AIRE LLIURE 2024 | 🟢 SUPERA (mitjana (camp NumFlechas ambigu, verificar)) |
| Aire Lliure/Tradicional/Sub-18/Home (30m/72fl) | 499 | Manel Del Rosal Gelonch | 05/03/2023 | **598** | 72è CAMPIONAT DE CATALUNYA D'AIRE LLIURE 2022 | 🟢 SUPERA (alta) |
| Aire Lliure/Arc Nu/Benjamí/Home (18m/72fl) | 597 | Iu Rodríguez Jiménez | 01/04/2023 | **641** | 74è CAMPIONAT DE CATALUNYA D'AIRE LLIURE 2024 | 🟢 SUPERA (mitjana (camp NumFlechas ambigu, verificar)) |
| Aire Lliure/Arc Nu/+50/Home (50m/72fl) | 586 | Carles Peña Costa | 28/05/2023 | **593** | Campeonato de España IBERDROLA de Arco Tradicional, Longbow y Arco Desnudo al Aire Libre | 🟢 SUPERA (alta) |
| Aire Lliure/Arc Nu/+50/Home (50m/72fl) | 586 | Carles Peña Costa | 28/05/2023 | **611** | Campeonato de España IBERDROLA de Arco Tradicional, Longbow y Arco Desnudo al Aire Libre 2025-2026 | 🟢 SUPERA (alta) |
| Aire Lliure/Longbow/Sènior/Home (30m/72fl) | 630 | Enrique Flores Delgado | 09/07/2023 | **630** | Campeonatos de España de Aire Libre 2020-2021 | 🟡 iguala (mitjana (camp NumFlechas ambigu, verificar)) |
| Aire Lliure/Tradicional/+50/Home (Round 720) | 624 | David López Abad | 18/04/2026 | **624** | 2a JORNADA LLIGA CATALANA AIRE LLIURE 2026 (Olivella) | 🟡 iguala (alta) |

## 3. Regeneració de `docs/archer_history_archive.json`

- 109 competicions / 4.089 participacions / 964 arquers únics.
- Tipus de competició pres directament del camp `TipoCompeticion` (abans s'inferia amb `typeConfidence`): `Sala→sala`, `Aire lliure/Aire libre→al`, `3D→trd`, `Campo→camp`, `3D en sala→trd`.
- Cada participació guarda ara `numFlechas` (valor cru del CSV) per fer possible aquest tipus de verificació de rècords en el futur.
- L'any de 86 competicions surt directament del títol; per a 23 competicions sense any al títol s'ha interpolat a partir de l'ID d'Ianseo (`ToId`), que és cronològicament creixent — contrastat amb el prefix d'any dels codis Ianseo (`ES25-`, `abs18`, etc.) quan n'hi havia. El cas més incert és `SAES1203` (ToId=254, molt anterior al rang conegut); s'ha marcat `yearInterpolated:true` a tots aquests perquè es puguin identificar.
- 109 files del CSV no tenen sexe detectable a `Categoria` i per tant no s'han pogut creuar amb `DB.records` (queden igualment a l'arxiu històric).

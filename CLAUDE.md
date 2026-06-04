# FCTA – Portal Web Federació Catalana de Tir amb Arc

## Visió general

Portal web de la Federació Catalana de Tir amb Arc (FCTA). Aplicació web estàtica de
pàgina única (SPA) sense framework: HTML/CSS/JS vanilla. Totes les dades viuen en memòria
(db.js); no hi ha backend ni base de dades persistent.

**Directori arrel:** `C:\Projects\fcta-project\`  
**Punt d'entrada:** `index.html` (un sol fitxer HTML de ~2800 línies)  
**Servidor dev:** `npx serve -l 5173 .` (vegeu `.claude/launch.json`)

---

## Arquitectura

```
index.html          – Tot el markup de totes les seccions (display:none/block per navegar)
js/
  config.js         ← LLEGEIX PRIMER. Font única de veritat: seccions, tipus, tokens
  db.js             – Dades en memòria: circulars, competicions, notícies, documents…
  nav.js            – Navegació: setS(key) llegeix FCTA.sections de config.js
  disciplines.js    – Pàgina de disciplina genèrica: DISC_DATA + renderDiscTab()
  admin.js          – Panell d'administració CRUD (requereix admSession)
  auth.js           – Login admin (admSession)
  circulars.js      – Renderització de circulars
  competitions.js   – Renderització de competicions + resolveStatus()
  tirades.js        – Tirades socials (renderTirades, submitTirada)
  formations.js     – Renderització de formació
  news.js / news_viewer.js – Notícies
  inici.js          – Base de dades de clubs + mapa
  utils.js          – toast(), escHtml(), etc.
  init.js           – Inicialització (updatePendDot, etc.)
css/
  01-variables.css  ← LLEGEIX PRIMER. TOTS els tokens: colors, espais, radis, ombres
  02-senyera.css    – Franja de colors catalans
  03-nav.css        – Barra de navegació superior
  04-hero.css       – Hero de la pàgina principal
  05-layout.css     – Layout genèric, filtres, transicions de secció
  06-circulars.css  – Badges cbadge, cb-* i llista de circulars
  07-competitions.css – Targetes de competició
  08..16            – Mòduls per a seccions específiques
  17-tirades.css    – Tirades socials
  18-llicencies.css – Llicències
  22-documentacio.css – Documentació i pestanyes
  23-inici.css      – Clubs i mapa
  24-disciplines.css – Pàgines de disciplina
  25-transparencia.css – Transparència
  26-assegurances.css – Assegurances
  27-junta.css      – Junta Directiva
  28-arcadaptat.css – Arc Adaptat
  29-comitejutges.css – Comitè de Jutges
  30-pat.css        – PAT (Programa Autonòmic de Tecnificació)
docs/               – PDFs locals (no al repositori git si és gran)
img/                – Imatges
```

---

## Com afegir una nova secció

1. **`js/config.js`** → afegir `{ key: 'laseccio', id: 'LaSecció', label: 'La Secció' }` a `FCTA.sections`
2. **`index.html`** → afegir `<div id="sLaSeccio" style="display:none">...</div>` (estructura hero+contingut)
3. **`css/NN-nom.css`** → crear fitxer CSS nou i afegir `<link>` a `index.html`
4. **Footer** → afegir `<li><a href="#" onclick="setS('laseccio');return false">La Secció</a></li>`
5. NO cal tocar `nav.js`

**Estructura HTML estàndard d'una secció amb hero:**
```html
<div id="sLaSeccio" style="display:none">
  <div class="senyera-h thick">...</div>
  <div class="NOM-hero">
    <div class="container">
      <button class="lic-back-btn" onclick="setS('home')">← Tornar a l'inici</button>
      <div class="lic-hero-badge">🏷️ Subtítol</div>
      <h1>Títol<br><em>FCTA</em></h1>
      <p>Descripció...</p>
    </div>
  </div>
  <div class="senyera-h thin">...</div>
  <section class="section" style="background:var(--offwhite)">
    <div class="container">
      <!-- contingut -->
    </div>
  </section>
</div>
```

**Atenció:** La senyera `thick` HA D'ESTAR dins del `<div id="sXxx">`, no fora.

---

## Sistema de disseny

### Colors (sempre usar variables CSS)
| Variable          | Valor     | Ús                              |
|-------------------|-----------|---------------------------------|
| `--navy-dark`     | `#0F2447` | Heroes, backgrounds foscos      |
| `--navy`          | `#1B3A6B` | Primari                         |
| `--navy-light`    | `#2E5FA3` | Links, accents                  |
| `--gold`          | `#F5B800` | CTA, badges, highlights         |
| `--gold-dark`     | `#e6a800` | Gold hover                      |
| `--red-cat`       | `#CC0001` | Vermell català (em en títols)   |
| `--offwhite`      | `#F4F6FA` | Fons de seccions                |
| `--lightgray`     | `#E8ECF3` | Bordes, divisors                |
| `--gray`          | `#5a6475` | Text secundari, meta            |

### Tipografia
- **Cos:** `Barlow` (Google Fonts)
- **Títols/Condensat:** `Barlow Condensed` — SEMPRE `font-weight:900`, `text-transform:uppercase`
- Títols de secció (`sec-title`): `clamp(1.8rem, 4vw, 2.8rem)`
- El `<em>` dins de `sec-title` pren `color: var(--red-cat)`

### Espaciat
Usar variables `--sp-1` a `--sp-16` (escala de 4px). Evitar valors arbitraris.

### Radis
`--r-sm` (4px) · `--r-md` (8px) · `--r-lg` (10px) · `--r-xl` (12px)

### Ombres
`--shadow-sm` · `--shadow-md` · `--shadow-lg`

### Transicions
`transition: all var(--dur-base) var(--tr)` per a interaccions bàsiques.

### Patrons de component reutilitzables
- **Targeta**: `background:var(--card-bg); border:var(--card-border); border-radius:var(--card-radius); padding:var(--card-pad)`
- **Badge disciplina**: classe `cbadge cb-{tipus}` (definides a `06-circulars.css`)
- **Botó primari**: classe `btn-gold`
- **Botó secundari**: classes `bsm bsm-o` o `bsm bsm-n`
- **Hero fosc**: `background: linear-gradient(135deg, --navy-dark, ...)` + text blanc

---

## Base de dades (`db.js`)

Totes les dades viuen en l'objecte global `DB`:

| Camp              | Tipus     | Descripció                                      |
|-------------------|-----------|-------------------------------------------------|
| `DB.circulars`    | Array     | Circulars federals (type, num, title, url…)     |
| `DB.competitions` | Array     | Competicions (type, status, dateISO, loc…)      |
| `DB.news`         | Array     | Notícies (cat, title, date, img…)               |
| `DB.formations`   | Array     | Cursos i formació                               |
| `DB.tirades`      | Array     | Tirades socials (status: 'pend' o 'valid')      |
| `DB.documents`    | Array     | Documents PDF per disciplina (disc, nom, url)   |
| `DB.clubs`        | Array     | Noms dels clubs (per al selector de tirades)    |

**Disc keys** per a `DB.documents.disc`: `'al'` · `'3d'` · `'camp'` · `'kyudo'` · `'general'`
(definits a `FCTA.disc` en `config.js`)

**Afegir un document** → afegir entrada a `DB.documents` amb un `id` únic i `disc` correcte.
L'admin panel (pestanya Documents) també ho permet en temps d'execució.

---

## Disciplinar (`disciplines.js`)

`DISC_DATA` conté la configuració de cada disciplina (`al`, `3d`, `camp`, `kyudo`).
Cada entrada té: `nom`, `subtitol`, `icon`, `color`, `descripcio`, `format[]`, `categories[]`,
`estils[]`, `lligues[]`, `campionats[]`, `records[]`, `circularsCategoria`.

Les `lligues[].tirades[]` poden tenir `compId` per referenciar una entrada de `DB.competitions`
(en lloc de dades estàtiques). `renderDiscLliga()` fa la resolució automàticament.

---

## Navegació (`nav.js` + `config.js`)

```javascript
setS('circulars')   // navegar a la secció de circulars
setS('home')        // tornar a l'inici
```

La funció `setS(key)`:
1. Amaga totes les seccions (de `FCTA.sectionIds`)
2. Anima l'entrada de la nova secció (`s-enter` + `s-exit` keyframes en `05-layout.css`)
3. Actualitza el highlight del nav

**Temps d'animació:** entrada 380ms (`--dur-slow`), sortida 220ms (`--dur-base`).

---

## Panell d'administració

Accés: botó `⚙ Admin` a la nav. Credencials en `auth.js` (`admSession`).

Pestanyes disponibles: Circulars · Notícies · Competicions · Formació · Tirades · Rècords · Documents

Cada pestanya té CRUD complet: afegir, editar inline, eliminar.
La funció `renderATab(tab)` en `admin.js` despacha al renderer corresponent.

---

## Convencions de codi

### HTML
- IDs de secció: `s` + PascalCase (e.g., `sJuntaDirectiva`)
- Emojis en HTML: sempre com a literal UTF-8 o `&#NNNN;` (no com a entitats named)
- Atributs `onclick` inline per a accions simples; JS separat per a lògica complexa

### CSS
- Un fitxer CSS per secció/component, numerats (`NN-nom.css`)
- Sempre usar variables de `01-variables.css`; mai codificar valors de color en dur
- Nomenclatura de classes: `bloc-element` o `bloc-element--modificador`
- Prefixos per secció: `.pat-*`, `.cj-*`, `.aa-*`, `.jd-*`, `.ass-*`, etc.
- Responsive: breakpoints a `700px` i `480px` (mobile-first NO, desktop-first SÍ)

### JavaScript
- Vanilla JS ES5 (no modules, no import/export, no arrow functions en codi principal)
  — per compatibilitat màxima amb el servidor estàtic actual
- Funcions globals (no namespaced) per als handlers HTML onclick
- Dades globals en `DB` (db.js) i constants en `FCTA` (config.js)
- No usar `var` dins de blocs (hoisting); declarar al principi de funció

### Noms de fitxers
- PDFs locals: `docs/NOM_DESCRIPTIU.pdf` (majúscules, guió baix)
- Imatges: `img/categoria/nom-descriptiu.jpg` (minúscules, guió)

---

## Fitxers que NO s'han de modificar directament

| Fitxer                        | Raó                                            |
|-------------------------------|------------------------------------------------|
| `css/01-variables.css`        | Tokens globals — canvi afecta tot el disseny   |
| `js/config.js`                | Constants globals — canvi afecta nav i DB      |
| `js/db.js` (bCls/bLbl)       | Eliminats — ara a config.js                    |

---

## Tasques habituals

### Afegir una circular
Afegir entrada a `DB.circulars` en `db.js`:
```javascript
{ id: Date.now(), type:'al', num:'CIRC-XXXX', title:'...', desc:'...', day:1, mon:'GEN', year:2026, url:'docs/fitxer.pdf' }
```

### Afegir una competició
Afegir entrada a `DB.competitions` en `db.js`:
```javascript
{ id: Date.now(), type:'al', title:'...', disc:'Aire Lliure', date:'15 jun 2026', dateISO:'2026-06-15', loc:'...', status:'soon', circ:'CIRC-XXXX', url:'#' }
```

### Afegir un document PDF
1. Copiar PDF a `docs/`
2. Afegir a `DB.documents` en `db.js`:
```javascript
{ id: Date.now(), disc:'al', nom:'Nom del document', url:'docs/fitxer.pdf', icon:'📄' }
```

### Canviar un color global
Editar `css/01-variables.css` → canviar la variable `:root`. Mai canviar valors en els fitxers de component.

---

## Regles obligatòries

### No enllaços a fcta.cat
**MAI afegir links que apuntin a `fcta.cat` o qualsevol subdomini seu.** Aquesta web ha de ser completament autosuficient: tot el contingut, navegació i funcionalitat ha d'existir dins del propi portal. Si cal referenciar informació externa, cal incorporar-la directament a `db.js` o als fitxers locals.

Els pdfs descarregals de `https://fcta.cat/wp-content/uploads/...`), i afegeig lo a  `docs/`.

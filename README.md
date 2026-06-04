# FCTA – Federació Catalana de Tir amb Arc
## Web oficial (versió standalone)

Portal web estàtic de la FCTA sense dependències de servidor. Obre `index.html` directament al navegador.

---

## Estructura del projecte

```
fcta-project/
├── index.html              # Punt d'entrada principal
├── README.md               # Aquest fitxer
│
├── css/                    # Fulls d'estil modulars (carregats en ordre numèric)
│   ├── 01-variables.css    # Variables CSS, reset global
│   ├── 02-senyera.css      # Separadors horitzontals senyera catalana
│   ├── 03-nav.css          # Barra de navegació
│   ├── 04-hero.css         # Secció hero principal
│   ├── 05-layout.css       # Ticker, quick-access, seccions genèriques, filtres
│   ├── 06-circulars.css    # Llista de circulars federals
│   ├── 07-competitions.css # Targetes de competicions
│   ├── 08-news.css         # Grid de notícies
│   ├── 09-formations.css   # Targetes de formació
│   ├── 10-social.css       # Tirades socials (tauler + formulari)
│   ├── 11-admin.css        # Panell admin (layout)
│   ├── 12-modal.css        # Modal d'inscripció
│   ├── 13-footer.css       # Peu de pàgina
│   ├── 14-toast.css        # Notificació toast
│   ├── 15-pdf-viewer.css   # Visor de PDFs integrat
│   ├── 16-news-modal.css   # Modal d'article de notícia
│   ├── 17-tirades.css      # Targetes i detall de tirades socials
│   ├── 18-llicencies.css   # Pàgina de llicències
│   ├── 19-utils.css        # Utilitats (collapse senyera adjacent)
│   ├── 20-login.css        # Modal de login administrador
│   ├── 21-admin-panel.css  # Panell admin CRUD (formularis, llistes)
│   └── 22-documentacio.css # Pàgina de documentació (tabs, items)
│
├── js/                     # Mòduls JavaScript (carregats en ordre de dependència)
│   ├── db.js               # Base de dades: circulars, competicions, notícies,
│   │                       #   formació, tirades socials, clubs, PDF_CONTENT, NEWS_CONTENT
│   ├── nav.js              # Navegació entre seccions (setS)
│   ├── circulars.js        # Renderització i filtre de circulars
│   ├── competitions.js     # Renderització i filtre de competicions
│   ├── news.js             # Renderització del grid de notícies
│   ├── formations.js       # Renderització de la graella de formació
│   ├── tirades.js          # Tirades socials: render, filtre, enviar, aprovació
│   ├── pdf_viewer.js       # Visor integrat de PDFs (contingut extret de fcta.cat)
│   ├── news_viewer.js      # Visor d'articles de notícies
│   ├── inscription.js      # Modal d'inscripció a competicions
│   ├── auth.js             # Autenticació: login, logout, gestió de sessió
│   ├── admin.js            # Panell admin: CRUD circulars, notícies,
│   │                       #   competicions, formació, tirades
│   ├── documentacio.js     # Pestanyes de la pàgina de documentació
│   ├── utils.js            # Toast, menú mòbil
│   └── init.js             # Bootstrap (DOMContentLoaded)
│
└── assets/                 # Recursos estàtics (imatges, fonts locals, etc.)
```

---

## Credencials d'administració

| Usuari       | Contrasenya | Rol         |
|-------------|-------------|-------------|
| `admin`      | `fcta2026`  | Superadmin  |
| `secretaria` | `fcta$sec`  | Editor      |

> ⚠️ **Producció**: canvia les credencials a `js/auth.js` i implementa autenticació servidor.

---

## Funcionalitats

- **Circulars federals** — filtres per disciplina, visor integrat, descàrrega directa
- **Competicions** — filtre per tipus, inscripció amb modal, estats (obertes/aviat/tancat)
- **Notícies** — visor d'articles amb contingut real de fcta.cat
- **Formació** — cursos i seminaris amb links directes als PDFs
- **Tirades Socials** — publicació de tirades amistoses per clubs, validació admin
- **Llicències** — informació completa temporada 2025–2026
- **Documentació** — 5 pestanyes: Eleccions, Assemblees, Actes, Professionals, Cursos
- **Panell admin** — CRUD complet per a tots els continguts, protegit per login

---

## Tecnologies

- HTML5 semàntic
- CSS3 modular (22 fitxers, sense frameworks)
- JavaScript vanilla ES5 (15 mòduls, sense dependències)
- Google Fonts: Barlow + Barlow Condensed

---

## Notes de desplegament

Aquest és un lloc **estàtic** que funciona sense servidor. Per publicar-lo:

1. **Netlify Drop** — arrossega la carpeta `fcta-project/` a [netlify.com/drop](https://netlify.com/drop)
2. **GitHub Pages** — puja el contingut de la carpeta al repositori i activa Pages
3. **Qualsevol hosting estàtic** — puja tots els fitxers mantenint l'estructura de carpetes

> Els logos estan incrustats com Base64 a `index.html` per funcionar sense connexió.

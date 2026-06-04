// config.js – Single source of truth for all project constants
// ─────────────────────────────────────────────────────────────
// ADD A NEW SECTION:
//   1. Add an entry to FCTA.sections below
//   2. Add the <div id="s{Id}"> to index.html
//   3. nav.js reads this file — no changes needed there
//
// ADD A NEW DISCIPLINE:
//   Add an entry to FCTA.disc below and a matching entry in DISC_DATA (disciplines.js)
//
// ADD A NEW DOCUMENT CATEGORY:
//   Add an entry to FCTA.docDiscs below and optionally a badge class in 06-circulars.css
// ─────────────────────────────────────────────────────────────

var FCTA = {

  // ── Navigation sections ──────────────────────────────────────
  // key   : lowercase string used in setS() calls and URL hash
  // id    : PascalCase suffix of the HTML element id="s{Id}"
  // label : human-readable name (Catalan)
  sections: [
    { key: 'home',          id: 'Home',          label: 'Inici' },
    { key: 'circulars',     id: 'Circulars',     label: 'Circulars' },
    { key: 'competitions',  id: 'Competitions',  label: 'Competicions' },
    { key: 'news',          id: 'News',          label: 'Notícies' },
    { key: 'formation',     id: 'Formation',     label: 'Formació' },
    { key: 'social',        id: 'Social',        label: 'Tirades Socials' },
    { key: 'llicencies',    id: 'Llicencies',    label: 'Llicències' },
    { key: 'documentacio',  id: 'Documentacio',  label: 'Documentació' },
    { key: 'reglaments',    id: 'Reglaments',    label: 'Reglaments' },
    { key: 'inici',         id: 'Inici',         label: 'Comença' },
    { key: 'disciplina',    id: 'Disciplina',    label: 'Disciplina' },
    { key: 'transparencia', id: 'Transparencia', label: 'Transparència' },
    { key: 'assegurances',  id: 'Assegurances',  label: 'Assegurances' },
    { key: 'juntadirectiva',id: 'JuntaDirectiva',label: 'Junta Directiva' },
    { key: 'arcadaptat',    id: 'ArcAdaptat',    label: 'Arc Adaptat' },
    { key: 'comitejutges',  id: 'ComiteJutges',  label: 'Comitè de Jutges' },
    { key: 'pat',           id: 'PAT',           label: 'PAT' },
    { key: 'calendari',    id: 'Calendari',     label: 'Calendari' },
  ],

  // ── Discipline keys (used in DISC_DATA and DB.documents) ─────
  disc: {
    AL:      'al',      // Aire Lliure i Sala
    CAMP:    'camp',    // Tir de Camp
    D3:      '3d',      // 3D i Tir de Bosc
    KYUDO:   'kyudo',   // Kyudo
    GENERAL: 'general', // Cross-discipline documents
  },

  // ── Competition / circular type metadata ─────────────────────
  typeLabel: {
    al:      'Aire Lliure / Sala',
    camp:    'Camp',
    '3d':    '3D / Bosc',
    sala:    'Sala',
    fed:     'Federació',
    form:    'Formació',
    jut:     'Jutges',
    kyudo:   'Kyudo',
    general: 'General',
  },

  typeCls: {
    al:      'cb-al',
    camp:    'cb-camp',
    '3d':    'cb-3d',
    sala:    'cb-al',
    fed:     'cb-fed',
    form:    'cb-form',
    jut:     'cb-jut',
    kyudo:   'cb-kyudo',
    general: 'cb-general',
    trd:     'cb-3d',  // alias used in competitions
  },

  // ── Competition status labels ─────────────────────────────────
  statusLabel: {
    open:   'Inscripcions obertes',
    soon:   'Pròximament',
    closed: 'Tancat',
  },

  statusCls: {
    open:   's-open',
    soon:   's-soon',
    closed: 's-closed',
  },

  // ── Contact ───────────────────────────────────────────────────
  contact: {
    email:    'info@fcta.cat',
    tel:      '93 308 02 65',
    telHref:  'tel:+34933080265',
    address:  'Rambla Guipúscoa, 23-25, 2on E · 08018 Barcelona',
    hours:    'Dl–Dv: 8:00–14:00h',
    cif:      'Q5855009F',
  },

};

// ── Derived helpers (used by nav.js, admin.js, etc.) ─────────
// Array of PascalCase IDs — replaces the old SECTIONS constant
FCTA.sectionIds = FCTA.sections.map(function(s){ return s.id; });

// Key→Id map — replaces the old hardcoded map in nav.js
FCTA.sectionMap = {};
FCTA.sections.forEach(function(s){ FCTA.sectionMap[s.key] = s.id; });

// Legacy aliases kept for backwards-compatibility
// (db.js still uses bCls / bLbl; they now delegate to FCTA)
var bCls = FCTA.typeCls;
var bLbl = FCTA.typeLabel;

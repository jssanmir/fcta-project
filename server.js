// server.js – FCTA Portal backend
// Express + SQLite + JWT
// Arrencada: node server.js  (o npm start)
// ──────────────────────────────────────────────────────────
'use strict';

require('dotenv').config();

var express  = require('express');
var Database = require('better-sqlite3');
var bcrypt   = require('bcryptjs');
var jwt      = require('jsonwebtoken');
var path     = require('path');
var fs       = require('fs');

// ── Configuració ───────────────────────────────────────────
var PORT       = process.env.PORT       || 3000;
var JWT_SECRET = process.env.JWT_SECRET || 'fcta-dev-secret-CHANGE-IN-PRODUCTION';
var JWT_EXPIRY = process.env.JWT_EXPIRY || '8h';
var DATA_DIR   = path.join(__dirname, 'data');
var DB_PATH    = path.join(DATA_DIR, 'fcta.db');

// ── Assegura que existeix el directori de dades ────────────
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ── Base de dades SQLite ───────────────────────────────────
var db = new Database(DB_PATH);

db.exec([
  'PRAGMA journal_mode = WAL;',   // millor rendiment en lectures concurrents
  'PRAGMA foreign_keys = ON;',

  // Estat de la BD del portal (una sola fila JSON)
  'CREATE TABLE IF NOT EXISTS portal_state (',
  '  id         INTEGER PRIMARY KEY CHECK (id = 1),',
  '  data       TEXT    NOT NULL,',
  '  updated_at TEXT',
  ');',

  // Usuaris admin
  'CREATE TABLE IF NOT EXISTS users (',
  '  id            INTEGER PRIMARY KEY AUTOINCREMENT,',
  '  username      TEXT    UNIQUE NOT NULL,',
  '  password_hash TEXT    NOT NULL,',
  '  role          TEXT    NOT NULL DEFAULT "editor",',
  '  nom           TEXT    NOT NULL',
  ');'
].join('\n'));

// ── Seed d'usuaris inicials si la taula és buida ───────────
var initialUsers = [
  { username: 'admin',      password: process.env.ADMIN_PASS || 'fcta2026',  role: 'superadmin', nom: 'Administrador FCTA' },
  { username: 'secretaria', password: process.env.SEC_PASS   || 'fcta$sec',  role: 'editor',     nom: 'Secretaria FCTA'   }
];

var countRow = db.prepare('SELECT COUNT(*) AS n FROM users').get();
if (countRow.n === 0) {
  var insertUser = db.prepare(
    'INSERT INTO users (username, password_hash, role, nom) VALUES (?, ?, ?, ?)'
  );
  initialUsers.forEach(function (u) {
    var hash = bcrypt.hashSync(u.password, 10);
    insertUser.run(u.username, hash, u.role, u.nom);
  });
  console.log('[FCTA] Usuaris inicials creats. Canvieu les contrasenyes des del panell admin o via variables d\'entorn.');
}

// ── Helpers JWT ────────────────────────────────────────────
function signToken(user) {
  return jwt.sign(
    { sub: user.username, role: user.role, nom: user.nom },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

function verifyToken(req, res, next) {
  var auth = req.headers['authorization'] || '';
  var token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token requerit' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token invàlid o expirat' });
  }
}

// ── Express ────────────────────────────────────────────────
var app = express();
app.use(express.json({ limit: '5mb' }));

// Serveix els fitxers estàtics del portal (index.html, css/, js/, img/, docs/)
app.use(express.static(path.join(__dirname), {
  index: 'index.html',
  dotfiles: 'ignore'
}));

// ── API: Login ─────────────────────────────────────────────
app.post('/api/login', function (req, res) {
  var username = (req.body.username || '').trim();
  var password = req.body.password || '';

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuari i contrasenya obligatoris' });
  }

  var user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    // Retard artificial per dificultar força bruta
    setTimeout(function () {
      res.status(401).json({ error: 'Usuari o contrasenya incorrectes' });
    }, 500);
    return;
  }

  var token = signToken(user);
  res.json({ token: token, nom: user.nom, role: user.role });
});

// ── API: Obtenir l'estat de la BD (públic) ─────────────────
app.get('/api/data', function (req, res) {
  var row = db.prepare('SELECT data FROM portal_state WHERE id = 1').get();
  if (!row) return res.json(null);   // null → client usa valors per defecte de db.js
  res.json(JSON.parse(row.data));
});

// ── API: Desar l'estat de la BD (requereix JWT) ────────────
app.post('/api/data', verifyToken, function (req, res) {
  var data = req.body;
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Cos de la petició invàlid' });
  }
  var now = new Date().toISOString();
  db.prepare([
    'INSERT INTO portal_state (id, data, updated_at)',
    'VALUES (1, ?, ?)',
    'ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at'
  ].join(' ')).run(JSON.stringify(data), now);
  res.json({ ok: true });
});

// ── API: Restablir l'estat (requereix JWT superadmin) ──────
app.delete('/api/data', verifyToken, function (req, res) {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Acció reservada al superadministrador' });
  }
  db.prepare('DELETE FROM portal_state WHERE id = 1').run();
  res.json({ ok: true });
});

// ── API: Canviar contrasenya (requereix JWT) ───────────────
app.post('/api/change-password', verifyToken, function (req, res) {
  var currentPass = req.body.currentPassword || '';
  var newPass     = req.body.newPassword     || '';

  if (newPass.length < 8) {
    return res.status(400).json({ error: 'La nova contrasenya ha de tenir almenys 8 caràcters' });
  }

  var user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.user.sub);
  if (!user || !bcrypt.compareSync(currentPass, user.password_hash)) {
    return res.status(401).json({ error: 'Contrasenya actual incorrecta' });
  }

  db.prepare('UPDATE users SET password_hash = ? WHERE username = ?')
    .run(bcrypt.hashSync(newPass, 10), req.user.sub);

  res.json({ ok: true });
});

// ── Ruta de salut ──────────────────────────────────────────
app.get('/api/health', function (req, res) {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ── SPA fallback: qualsevol ruta desconeguda → index.html ──
app.get('/{*splat}', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Arrencada ──────────────────────────────────────────────
app.listen(PORT, function () {
  console.log('');
  console.log('┌─────────────────────────────────────────────┐');
  console.log('│  FCTA Portal  –  http://localhost:' + PORT + '       │');
  console.log('├─────────────────────────────────────────────┤');
  console.log('│  BD SQLite:  data/fcta.db                   │');
  console.log('│  Mode:       ' + (process.env.NODE_ENV || 'development') + '                        │');
  console.log('└─────────────────────────────────────────────┘');
  console.log('');
  if (!process.env.JWT_SECRET) {
    console.warn('⚠  JWT_SECRET no definit. Usa un secret aleatori en producció!');
    console.warn('   Afegeix JWT_SECRET=<secret_llarg> al fitxer .env\n');
  }
});

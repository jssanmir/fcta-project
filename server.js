// server.js – FCTA Portal backend (hardened)
// Express + SQLite + JWT
// Arrencada: node server.js  (o npm start)
// ──────────────────────────────────────────────────────────
'use strict';

require('dotenv').config();

var express   = require('express');
var helmet    = require('helmet');
var rateLimit = require('express-rate-limit');
var cors      = require('cors');
var Database  = require('better-sqlite3');
var bcrypt    = require('bcryptjs');
var jwt       = require('jsonwebtoken');
var multer    = require('multer');
var path      = require('path');
var fs        = require('fs');
var crypto    = require('crypto');
var nodemailer = require('nodemailer');

// ── Configuració ───────────────────────────────────────────
var PORT        = process.env.PORT       || 3000;
var JWT_SECRET  = process.env.JWT_SECRET || null;
var JWT_EXPIRY  = process.env.JWT_EXPIRY || '8h';
var IS_PROD     = process.env.NODE_ENV === 'production';
var DATA_DIR    = path.join(__dirname, 'data');
var UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
var DB_PATH     = path.join(DATA_DIR, 'fcta.db');
var PORTAL_URL  = (process.env.PORTAL_URL || 'http://localhost:3000').replace(/\/$/, '');

// CRÍTIC: en producció, JWT_SECRET és obligatori
if (IS_PROD && !JWT_SECRET) {
  console.error('ERROR CRÍTIC: JWT_SECRET no definit en producció. Aturant...');
  process.exit(1);
}
if (!JWT_SECRET) {
  JWT_SECRET = 'fcta-dev-INSEGUR-canvia-en-produccio';
  console.warn('AVIS: Usant JWT_SECRET de desenvolupament. Defineix JWT_SECRET al .env!');
}

// ── Email (nodemailer + Gmail) ─────────────────────────────
var _mailTransporter = null;

(function initMailer() {
  var user = process.env.MAIL_USER;
  var pass = process.env.MAIL_PASS;
  if (!user || !pass) {
    console.warn('[FCTA] Email desactivat: defineix MAIL_USER i MAIL_PASS al .env');
    return;
  }
  _mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: user, pass: pass }
  });
  _mailTransporter.verify(function(err) {
    if (err) {
      console.warn('[FCTA] Error connectant al servidor de correu:', err.message);
      _mailTransporter = null;
    } else {
      console.log('[FCTA] Servidor de correu connectat: ' + user);
    }
  });
})();

function sendMail(to, subject, html) {
  if (!_mailTransporter) return Promise.resolve({ skipped: true });
  var from = process.env.MAIL_FROM || process.env.MAIL_USER;
  return _mailTransporter.sendMail({ from: '"FCTA Portal" <' + from + '>', to: to, subject: subject, html: html })
    .catch(function(e) { console.warn('[FCTA] Error enviant email a ' + to + ':', e.message); });
}

function mailActivacio(to, username, password) {
  var subject = 'Accés al Portal FCTA – Compte creat';
  var html = [
    '<div style="font-family:sans-serif;max-width:520px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">',
    '  <div style="background:#0F2447;padding:24px 32px;text-align:center">',
    '    <h1 style="color:#F5B800;margin:0;font-size:1.4rem;letter-spacing:1px">FEDERACIÓ CATALANA DE TIR AMB ARC</h1>',
    '  </div>',
    '  <div style="padding:32px">',
    '    <h2 style="color:#0F2447;margin-top:0">Benvingut/da al Portal FCTA</h2>',
    '    <p>S\'ha creat un compte d\'accés per a tu. Utilitza les credencials següents per entrar:</p>',
    '    <table style="background:#f4f6fa;border-radius:6px;padding:16px 24px;margin:20px 0;width:100%;border-collapse:collapse">',
    '      <tr><td style="padding:6px 0;color:#5a6475;font-size:.9rem">Usuari:</td><td style="font-weight:700;color:#0F2447">' + username + '</td></tr>',
    '      <tr><td style="padding:6px 0;color:#5a6475;font-size:.9rem">Contrasenya inicial:</td><td style="font-weight:700;color:#0F2447;letter-spacing:1px">' + password + '</td></tr>',
    '    </table>',
    '    <p style="color:#CC0001;font-size:.9rem"><strong>Important:</strong> Hauràs de canviar la contrasenya en el primer accés.</p>',
    '    <div style="text-align:center;margin:28px 0">',
    '      <a href="' + PORTAL_URL + '" style="background:#F5B800;color:#0F2447;text-decoration:none;padding:12px 32px;border-radius:6px;font-weight:700;font-size:1rem">Entrar al Portal</a>',
    '    </div>',
    '    <p style="font-size:.85rem;color:#5a6475">Si no esperaves aquest missatge, ignora\'l. Per a qualsevol dubte, contacta amb l\'administrador de la federació.</p>',
    '  </div>',
    '  <div style="background:#f4f6fa;padding:12px 32px;text-align:center;font-size:.8rem;color:#5a6475">',
    '    Federació Catalana de Tir amb Arc · Portal oficial',
    '  </div>',
    '</div>'
  ].join('\n');
  return sendMail(to, subject, html);
}

function mailResetPassword(to, username, password) {
  var subject = 'Portal FCTA – Nova contrasenya temporal';
  var html = [
    '<div style="font-family:sans-serif;max-width:520px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">',
    '  <div style="background:#0F2447;padding:24px 32px;text-align:center">',
    '    <h1 style="color:#F5B800;margin:0;font-size:1.4rem;letter-spacing:1px">FEDERACIÓ CATALANA DE TIR AMB ARC</h1>',
    '  </div>',
    '  <div style="padding:32px">',
    '    <h2 style="color:#0F2447;margin-top:0">Restabliment de contrasenya</h2>',
    '    <p>L\'administrador ha restablert la teva contrasenya. Utilitza les dades següents per tornar a entrar:</p>',
    '    <table style="background:#f4f6fa;border-radius:6px;padding:16px 24px;margin:20px 0;width:100%;border-collapse:collapse">',
    '      <tr><td style="padding:6px 0;color:#5a6475;font-size:.9rem">Usuari:</td><td style="font-weight:700;color:#0F2447">' + username + '</td></tr>',
    '      <tr><td style="padding:6px 0;color:#5a6475;font-size:.9rem">Contrasenya temporal:</td><td style="font-weight:700;color:#0F2447;letter-spacing:1px">' + password + '</td></tr>',
    '    </table>',
    '    <p style="color:#CC0001;font-size:.9rem"><strong>Important:</strong> Hauràs de canviar la contrasenya en el proper accés.</p>',
    '    <div style="text-align:center;margin:28px 0">',
    '      <a href="' + PORTAL_URL + '" style="background:#F5B800;color:#0F2447;text-decoration:none;padding:12px 32px;border-radius:6px;font-weight:700;font-size:1rem">Entrar al Portal</a>',
    '    </div>',
    '  </div>',
    '  <div style="background:#f4f6fa;padding:12px 32px;text-align:center;font-size:.8rem;color:#5a6475">',
    '    Federació Catalana de Tir amb Arc · Portal oficial',
    '  </div>',
    '</div>'
  ].join('\n');
  return sendMail(to, subject, html);
}

// ── Assegura que existeixen els directoris ─────────────────
if (!fs.existsSync(DATA_DIR))    fs.mkdirSync(DATA_DIR,    { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// ── Advertència: volum persistent no configurat ────────────
// A Railway, sense un volum muntat a /app/data, la BD es perd en cada deploy.
// Detectem si sembla un filesystem efímer (mida 0 o fitxer acabat de crear).
if (IS_PROD) {
  var dbExists = fs.existsSync(DB_PATH);
  if (!dbExists) {
    console.warn([
      '╔══════════════════════════════════════════════════════╗',
      '║  ATENCIO: Base de dades no trobada a data/fcta.db    ║',
      '║  Per evitar perdre dades en cada deploy a Railway:   ║',
      '║  1. Railway → Servei → Storage → Add Volume          ║',
      '║  2. Mount Path: /app/data                            ║',
      '║  Sense el volum, les dades es perdran en cada deploy ║',
      '╚══════════════════════════════════════════════════════╝'
    ].join('\n'));
  }
}

// ── Base de dades SQLite ───────────────────────────────────
var db = new Database(DB_PATH);

db.exec([
  'PRAGMA journal_mode = WAL;',
  'PRAGMA foreign_keys = ON;',

  'CREATE TABLE IF NOT EXISTS portal_state (',
  '  id         INTEGER PRIMARY KEY CHECK (id = 1),',
  '  data       TEXT NOT NULL,',
  '  updated_at TEXT',
  ');',

  'CREATE TABLE IF NOT EXISTS users (',
  '  id            INTEGER PRIMARY KEY AUTOINCREMENT,',
  '  username      TEXT UNIQUE NOT NULL,',
  '  password_hash TEXT NOT NULL,',
  '  role          TEXT NOT NULL DEFAULT "editor",',
  '  nom           TEXT NOT NULL,',
  '  must_change_pass INTEGER NOT NULL DEFAULT 0',
  ');',

  // Audit log
  'CREATE TABLE IF NOT EXISTS audit_log (',
  '  id        INTEGER PRIMARY KEY AUTOINCREMENT,',
  '  ts        TEXT NOT NULL,',
  '  username  TEXT NOT NULL,',
  '  action    TEXT NOT NULL,',
  '  detail    TEXT',
  ');'
].join('\n'));

// ── Migracions de columnes (idempotent) ───────────────────
[
  'ALTER TABLE users ADD COLUMN email            TEXT',
  'ALTER TABLE users ADD COLUMN actiu            INTEGER NOT NULL DEFAULT 1',
  'ALTER TABLE users ADD COLUMN totp_secret      TEXT',
  'ALTER TABLE users ADD COLUMN totp_enabled     INTEGER NOT NULL DEFAULT 0',
  'ALTER TABLE users ADD COLUMN must_change_pass INTEGER NOT NULL DEFAULT 0',
].forEach(function(sql){ try{ db.exec(sql); }catch(e){} });

// ── Seed d'usuaris inicials ────────────────────────────────
var countRow = db.prepare('SELECT COUNT(*) AS n FROM users').get();
if (countRow.n === 0) {
  var adminPass = process.env.ADMIN_PASS || 'fcta2026';
  var secPass   = process.env.SEC_PASS   || 'fcta$sec';
  var insert    = db.prepare('INSERT INTO users (username,password_hash,role,nom,must_change_pass) VALUES (?,?,?,?,?)');
  insert.run('admin',      bcrypt.hashSync(adminPass, 12), 'superadmin', 'Administrador FCTA', IS_PROD ? 1 : 0);
  insert.run('secretaria', bcrypt.hashSync(secPass,   12), 'editor',     'Secretaria FCTA',   IS_PROD ? 1 : 0);
  console.log('[FCTA] Usuaris inicials creats.');
}

// ── Restauració des de backup en arrancar amb BD buida ─────
// Si la BD és buida (deploy nou, filesystem efímer) però existeix
// un fitxer SEED_JSON a l'entorn o un backup anterior, el restaura.
(function seedFromEnv() {
  var row = db.prepare('SELECT COUNT(*) AS n FROM portal_state').get();
  if (row.n > 0) return; // BD ja té dades, no fer res

  // Intenta restaurar des de variable d'entorn DB_SEED (base64 JSON)
  var seed = process.env.DB_SEED;
  if (seed) {
    try {
      var data = JSON.parse(Buffer.from(seed, 'base64').toString('utf8'));
      var now  = new Date().toISOString();
      db.prepare('INSERT INTO portal_state (id,data,updated_at) VALUES (1,?,?)')
        .run(JSON.stringify(data), now);
      console.log('[FCTA] Dades restaurades des de DB_SEED.');
    } catch (e) {
      console.warn('[FCTA] Error restaurant DB_SEED:', e.message);
    }
  }
})();

// ── Backup complet: dades + fitxers pujats ────────────────
// Els fitxers pujats des del panell (PDFs, imatges) es guarden a
// data/uploads/ i NO viuen a portal_state — cal incloure'ls a part
// perquè un backup sigui realment complet i restaurable.
function snapshotUploadsDir() {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) return [];
    return fs.readdirSync(UPLOADS_DIR)
      .filter(function (f) {
        try { return fs.statSync(path.join(UPLOADS_DIR, f)).isFile(); }
        catch (e) { return false; }
      })
      .map(function (f) {
        return { name: f, content: fs.readFileSync(path.join(UPLOADS_DIR, f)).toString('base64') };
      });
  } catch (e) {
    console.warn('[FCTA] No s\'han pogut llegir els fitxers pujats per al backup:', e.message);
    return [];
  }
}

function restoreUploadsDir(files) {
  if (!Array.isArray(files)) return 0;
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  var restored = 0;
  files.forEach(function (f) {
    if (!f || !f.name || !f.content) return;
    var name     = path.basename(String(f.name)); // evita path traversal
    var filepath = path.join(UPLOADS_DIR, name);
    if (!filepath.startsWith(UPLOADS_DIR)) return; // seguretat extra
    try {
      fs.writeFileSync(filepath, Buffer.from(f.content, 'base64'));
      restored++;
    } catch (e) { /* fitxer individual fallit: continua amb la resta */ }
  });
  return restored;
}

// ── Backup automàtic en arrencada ─────────────────────────
// Desa una còpia JSON de les dades + fitxers pujats a data/backups/
// Protegeix contra pèrdues accidentals per deploys o errors.
(function autoBackup() {
  try {
    var row = db.prepare('SELECT data, updated_at FROM portal_state WHERE id = 1').get();
    if (!row) return; // BD buida, res a fer

    var backupDir = path.join(DATA_DIR, 'backups');
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    // Manté els últims 10 backups, esborra els més antics
    var files = fs.readdirSync(backupDir)
      .filter(function(f){ return f.endsWith('.json'); })
      .sort();
    while (files.length >= 10) {
      fs.unlinkSync(path.join(backupDir, files.shift()));
    }

    var ts = new Date().toISOString().replace(/[:.]/g, '-');
    var backupPath = path.join(backupDir, 'backup_' + ts + '.json');
    fs.writeFileSync(backupPath, JSON.stringify({
      backup_ts:  new Date().toISOString(),
      updated_at: row.updated_at,
      data:       JSON.parse(row.data),
      uploads:    snapshotUploadsDir()
    }, null, 2));
    console.log('[FCTA] Backup creat: ' + path.basename(backupPath));
  } catch (e) {
    console.warn('[FCTA] No s\'ha pogut crear el backup:', e.message);
  }
})();

// ── TOTP helpers (RFC 6238 · SHA-1 · 30s · 6 dígits) ──────
function base32Decode(s) {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  var bits = 0, value = 0, output = [];
  s = s.toUpperCase().replace(/=+$/, '').replace(/\s/g, '');
  for (var i = 0; i < s.length; i++) {
    var idx = alphabet.indexOf(s[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) { output.push((value >>> (bits - 8)) & 255); bits -= 8; }
  }
  return Buffer.from(output);
}

function totpCode(secret, offsetSteps) {
  var key  = base32Decode(secret);
  var time = Math.floor(Date.now() / 1000 / 30) + (offsetSteps || 0);
  var msg  = Buffer.alloc(8);
  msg.writeUInt32BE(Math.floor(time / 0x100000000), 0);
  msg.writeUInt32BE(time >>> 0, 4);
  var hmac   = crypto.createHmac('sha1', key).update(msg).digest();
  var offset = hmac[19] & 0xf;
  var code   = ((hmac[offset] & 0x7f) << 24) | (hmac[offset+1] << 16) |
               (hmac[offset+2] << 8)  | hmac[offset+3];
  return String(code % 1000000).padStart(6, '0');
}

function totpVerify(secret, token) {
  if (!secret || !token) return false;
  var t = token.replace(/\s/g, '');
  return totpCode(secret, -1) === t || totpCode(secret, 0) === t || totpCode(secret, 1) === t;
}

// ── Audit helper ───────────────────────────────────────────
function audit(username, action, detail) {
  try {
    db.prepare('INSERT INTO audit_log (ts,username,action,detail) VALUES (?,?,?,?)')
      .run(new Date().toISOString(), username, action, detail || null);
  } catch (e) { /* no bloqueja si falla */ }
}

// ── JWT helpers ────────────────────────────────────────────
function signToken(user) {
  return jwt.sign(
    { sub: user.username, role: user.role, nom: user.nom },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

function verifyToken(req, res, next) {
  var auth  = req.headers['authorization'] || '';
  var token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token requerit' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token invàlid o expirat' });
  }
}

function requireRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      audit(req.user.sub, 'FORBIDDEN', req.method + ' ' + req.path);
      return res.status(403).json({ error: 'Permís insuficient' });
    }
    next();
  };
}

// ── Multer: gestió de fitxers pujats ──────────────────────
var storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, UPLOADS_DIR); },
  filename: function (req, file, cb) {
    // Nom aleatori + extensió sanititzada → evita enumeració i path traversal
    var ext  = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, '');
    var rand = crypto.randomBytes(16).toString('hex');
    cb(null, rand + ext);
  }
});

var ALLOWED_PDF_MAGIC = Buffer.from('%PDF');

function pdfFilter(req, file, cb) {
  if (file.mimetype !== 'application/pdf') return cb(null, false);
  cb(null, true);
}

function imgFilter(req, file, cb) {
  var allowed = ['image/jpeg','image/png','image/webp','image/gif'];
  cb(null, allowed.includes(file.mimetype));
}

var uploadPdf = multer({ storage: storage, limits: { fileSize: 20*1024*1024 }, fileFilter: pdfFilter });
var uploadImg = multer({ storage: storage, limits: { fileSize:  5*1024*1024 }, fileFilter: imgFilter });

// ── Validació d'URLs ───────────────────────────────────────
function isSafeUrl(url) {
  if (!url || url === '#') return true;
  try {
    var u = new (require('url').URL)(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (e) {
    // path local (docs/fitxer.pdf) o /uploads/...
    return /^(docs\/|\/uploads\/)/.test(url);
  }
}

// ── Express ────────────────────────────────────────────────
var app = express();

// Railway (i altres reverse proxies) passen el client IP via X-Forwarded-For
app.set('trust proxy', 1);

// ── Security headers (helmet) ──────────────────────────────
// CSP desactivada: el portal és una SPA amb onclick/styles inline a tot arreu.
// Migrar a event listeners externs és un refactor major (futur).
// La resta de headers de seguretat es mantenen actius.
app.use(helmet({
  contentSecurityPolicy:    false,   // desactivada fins a refactor inline → extern
  crossOriginEmbedderPolicy: false,  // necessari per PDFs en iframe
  frameguard: { action: 'sameorigin' }  // anti-clickjacking: permet iframes same-origin
}));

// ── CORS ───────────────────────────────────────────────────
var allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({
  origin: function (origin, cb) {
    // Permet peticions sense origin (same-origin, curl, etc.)
    if (!origin) return cb(null, true);
    if (allowedOrigins.length === 0) return cb(null, true); // dev: tot permès
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS no permès per ' + origin));
  },
  credentials: false
}));

// ── Rate limiting ──────────────────────────────────────────
var loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: 10,                    // màx 10 intents per IP
  message: { error: 'Massa intents. Torna-ho a provar en 15 minuts.' },
  standardHeaders: true,
  legacyHeaders: false
});

var apiLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 min
  max: 120,
  message: { error: 'Massa peticions.' }
});

var uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hora
  max: 30,                    // màx 30 uploads per IP per hora
  message: { error: 'Límit de pujades assolit. Torna-ho a provar en 1 hora.' }
});

app.use('/api/', apiLimiter);
app.use('/api/login', loginLimiter);
app.use('/api/upload', uploadLimiter);

app.use(express.json({ limit: '2mb' }));

// ── Fitxers estàtics ───────────────────────────────────────
app.use(express.static(path.join(__dirname), {
  index: 'index.html',
  dotfiles: 'ignore',
  setHeaders: function (res, filePath) {
    // Headers addicionals per a PDFs i imatges
    if (filePath.endsWith('.pdf')) {
      res.setHeader('Content-Disposition', 'inline');
    }
  }
}));
app.use('/uploads', express.static(UPLOADS_DIR, { dotfiles: 'deny' }));

// ── API: Login ─────────────────────────────────────────────
app.post('/api/login', function (req, res) {
  var username  = String(req.body.username  || '').trim().substring(0, 50);
  var password  = String(req.body.password  || '').substring(0, 200);
  var totpCode  = String(req.body.totpCode  || '').replace(/\s/g, '').substring(0, 6);

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuari i contrasenya obligatoris' });
  }

  var user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

  var dummyHash = '$2a$12$invaliddummyhashfortimingatk00';
  var hash  = user ? user.password_hash : dummyHash;
  var valid = bcrypt.compareSync(password, hash) && !!user;

  if (!valid) {
    audit(username, 'LOGIN_FAIL', req.ip);
    return setTimeout(function () {
      res.status(401).json({ error: 'Usuari o contrasenya incorrectes' });
    }, 500 + Math.random() * 500);
  }

  if (user.actiu === 0) {
    audit(username, 'LOGIN_BLOCKED', req.ip);
    return setTimeout(function () {
      res.status(401).json({ error: 'Compte desactivat. Contacta amb l\'administrador.' });
    }, 500);
  }

  // Si l'usuari té 2FA actiu i no s'ha proporcionat codi → pas MFA
  if (user.totp_enabled && !totpCode) {
    return res.json({ mfaRequired: true });
  }

  // Si s'ha proporcionat codi TOTP → verificar
  if (user.totp_enabled && totpCode) {
    if (!totpVerify(user.totp_secret, totpCode)) {
      audit(username, 'TOTP_FAIL', req.ip);
      return setTimeout(function () {
        res.status(401).json({ error: 'Codi 2FA incorrecte.' });
      }, 500);
    }
    audit(username, 'TOTP_OK', req.ip);
  }

  audit(username, 'LOGIN_OK', req.ip);
  var token = signToken(user);
  res.json({
    token:              token,
    nom:                user.nom,
    role:               user.role,
    mustChangePassword: user.must_change_pass === 1
  });
});

// ── API: Dades públiques ───────────────────────────────────
app.get('/api/data', function (req, res) {
  var row = db.prepare('SELECT data FROM portal_state WHERE id = 1').get();
  if (!row) return res.json(null);
  res.json(JSON.parse(row.data));
});

// ── API: Timestamp de les dades (per a polling de sincronització) ──
app.get('/api/data/ts', function (req, res) {
  var row = db.prepare('SELECT updated_at FROM portal_state WHERE id = 1').get();
  res.json({ updated_at: row ? row.updated_at : null });
});

// ── API: Desar dades (requereix JWT) ──────────────────────
app.post('/api/data', verifyToken, function (req, res) {
  var data = req.body;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ error: 'Cos de la petició invàlid' });
  }

  // Sanititza URLs per evitar javascript: i data: URIs
  var fields = ['circulars','competitions','news','formations','documents'];
  fields.forEach(function (f) {
    if (!Array.isArray(data[f])) return;
    data[f].forEach(function (item) {
      if (item.url && !isSafeUrl(item.url)) item.url = '#';
    });
  });

  var now = new Date().toISOString();
  db.prepare('INSERT INTO portal_state (id,data,updated_at) VALUES (1,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at')
    .run(JSON.stringify(data), now);
  audit(req.user.sub, 'DATA_SAVE', now);
  res.json({ ok: true });
});

// ── API: Restablir (requereix superadmin) ─────────────────
app.delete('/api/data', verifyToken, requireRole('superadmin'), function (req, res) {
  db.prepare('DELETE FROM portal_state WHERE id = 1').run();
  audit(req.user.sub, 'DATA_RESET', req.ip);
  res.json({ ok: true });
});

// ── API: Upload PDF ────────────────────────────────────────
app.post('/api/upload/pdf', verifyToken, function (req, res) {
  uploadPdf.single('file')(req, res, function (err) {
    if (err) return res.status(400).json({ error: err.message || 'Error en pujar el PDF' });
    if (!req.file) return res.status(400).json({ error: 'PDF no rebut o format invàlid (màx. 20 MB)' });

    // Verifica magic bytes (%PDF)
    var fd = fs.openSync(req.file.path, 'r');
    var buf = Buffer.alloc(4);
    fs.readSync(fd, buf, 0, 4, 0);
    fs.closeSync(fd);
    if (!buf.equals(ALLOWED_PDF_MAGIC)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'El fitxer no és un PDF vàlid' });
    }

    audit(req.user.sub, 'UPLOAD_PDF', req.file.filename);
    res.json({ url: '/uploads/' + req.file.filename, nom: req.file.originalname });
  });
});

// ── API: Upload imatge ─────────────────────────────────────
app.post('/api/upload/image', verifyToken, function (req, res) {
  uploadImg.single('file')(req, res, function (err) {
    if (err) return res.status(400).json({ error: err.message || 'Error en pujar la imatge' });
    if (!req.file) return res.status(400).json({ error: 'Imatge no rebuda o format invàlid (jpg, png, webp, gif · màx. 5 MB)' });
    audit(req.user.sub, 'UPLOAD_IMG', req.file.filename);
    res.json({ url: '/uploads/' + req.file.filename, nom: req.file.originalname });
  });
});

// ── API: Eliminar fitxer ───────────────────────────────────
app.delete('/api/upload/:filename', verifyToken, requireRole('superadmin'), function (req, res) {
  var name     = path.basename(req.params.filename);   // evita path traversal
  var filepath = path.join(UPLOADS_DIR, name);
  // Verifica que el fitxer és dins UPLOADS_DIR
  if (!filepath.startsWith(UPLOADS_DIR)) return res.status(400).json({ error: 'Ruta invàlida' });
  if (!fs.existsSync(filepath)) return res.status(404).json({ error: 'Fitxer no trobat' });
  fs.unlinkSync(filepath);
  audit(req.user.sub, 'DELETE_FILE', name);
  res.json({ ok: true });
});

// ── API: Canviar contrasenya ───────────────────────────────
app.post('/api/change-password', verifyToken, function (req, res) {
  var currentPass = String(req.body.currentPassword || '').substring(0, 200);
  var newPass     = String(req.body.newPassword     || '').substring(0, 200);

  if (newPass.length < 10) {
    return res.status(400).json({ error: 'La nova contrasenya ha de tenir almenys 10 caràcters' });
  }
  // Requereix majúscula, minúscula i número
  if (!/[A-Z]/.test(newPass) || !/[a-z]/.test(newPass) || !/[0-9]/.test(newPass)) {
    return res.status(400).json({ error: 'La contrasenya ha de contenir majúscules, minúscules i números' });
  }

  var user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.user.sub);
  if (!user) return res.status(401).json({ error: 'Usuari no trobat' });
  // Si el canvi és forçat (primer accés), no cal verificar la contrasenya actual
  if (user.must_change_pass !== 1 && !bcrypt.compareSync(currentPass, user.password_hash)) {
    return res.status(401).json({ error: 'Contrasenya actual incorrecta' });
  }

  db.prepare('UPDATE users SET password_hash=?, must_change_pass=0 WHERE username=?')
    .run(bcrypt.hashSync(newPass, 12), req.user.sub);
  audit(req.user.sub, 'CHANGE_PASS', null);
  res.json({ ok: true });
});

// ── API: Llistat de backups disponibles ───────────────────
app.get('/api/backups', verifyToken, requireRole('superadmin'), function (req, res) {
  var backupDir = path.join(DATA_DIR, 'backups');
  if (!fs.existsSync(backupDir)) return res.json([]);
  var files = fs.readdirSync(backupDir)
    .filter(function(f){ return f.endsWith('.json'); })
    .sort().reverse()
    .map(function(f) {
      var stat = fs.statSync(path.join(backupDir, f));
      return { name: f, size: stat.size, date: stat.mtime };
    });
  res.json(files);
});

// ── API: Descarregar un backup ─────────────────────────────
app.get('/api/backups/:name', verifyToken, requireRole('superadmin'), function (req, res) {
  var name = path.basename(req.params.name);
  if (!name.endsWith('.json')) return res.status(400).json({ error: 'Fitxer invàlid' });
  var filePath = path.join(DATA_DIR, 'backups', name);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Backup no trobat' });
  res.download(filePath);
});

// ── API: Restaurar des d'un backup ────────────────────────
app.post('/api/backups/:name/restore', verifyToken, requireRole('superadmin'), function (req, res) {
  var name = path.basename(req.params.name);
  if (!name.endsWith('.json')) return res.status(400).json({ error: 'Fitxer invàlid' });
  var filePath = path.join(DATA_DIR, 'backups', name);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Backup no trobat' });
  try {
    var backup = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    var data   = backup.data || backup; // suporta format antic i nou
    var now    = new Date().toISOString();
    db.prepare('INSERT INTO portal_state (id,data,updated_at) VALUES (1,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at')
      .run(JSON.stringify(data), now);
    var restoredFiles = restoreUploadsDir(backup.uploads);
    audit(req.user.sub, 'RESTORE_BACKUP', name + (restoredFiles ? ' (+' + restoredFiles + ' fitxers)' : ''));
    res.json({ ok: true, restored_from: name, restored_files: restoredFiles });
  } catch (e) {
    res.status(500).json({ error: 'Error restaurant el backup: ' + e.message });
  }
});

// ── API: Exportar DB_SEED per a Railway env vars ──────────
// Genera el valor base64 que cal posar a DB_SEED a Railway.
// Quan el servidor arrenca amb BD buida, restaura automàticament.
app.get('/api/export-seed', verifyToken, requireRole('superadmin'), function (req, res) {
  var row = db.prepare('SELECT data FROM portal_state WHERE id = 1').get();
  if (!row) return res.status(404).json({ error: 'No hi ha dades a exportar' });
  var seed = Buffer.from(row.data).toString('base64');
  res.json({
    seed: seed,
    instructions: [
      '1. Copia el valor del camp "seed"',
      '2. Railway → el teu servei → Variables',
      '3. Afegeix: DB_SEED = <valor copiat>',
      '4. El servidor restaurarà automàticament les dades si la BD és buida'
    ]
  });
});

// ── API: Forçar backup manual ──────────────────────────────
app.post('/api/backups', verifyToken, requireRole('superadmin'), function (req, res) {
  try {
    var row = db.prepare('SELECT data, updated_at FROM portal_state WHERE id = 1').get();
    if (!row) return res.status(404).json({ error: 'No hi ha dades a fer backup' });
    var backupDir = path.join(DATA_DIR, 'backups');
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
    var ts       = new Date().toISOString().replace(/[:.]/g, '-');
    var filename = 'manual_' + req.user.sub + '_' + ts + '.json';
    fs.writeFileSync(path.join(backupDir, filename), JSON.stringify({
      backup_ts: new Date().toISOString(), updated_at: row.updated_at,
      data:      JSON.parse(row.data),
      uploads:   snapshotUploadsDir()
    }, null, 2));
    audit(req.user.sub, 'MANUAL_BACKUP', filename);
    res.json({ ok: true, name: filename });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── API: Gestió d'usuaris ──────────────────────────────────
app.get('/api/users', verifyToken, requireRole('superadmin'), function (req, res) {
  var users = db.prepare(
    'SELECT id, username, nom, email, role, actiu, totp_enabled, must_change_pass FROM users ORDER BY id'
  ).all();
  res.json(users);
});

app.post('/api/users', verifyToken, requireRole('superadmin'), function (req, res) {
  var username = String(req.body.username || '').trim().substring(0, 50);
  var password = String(req.body.password || '').substring(0, 200);
  var nom      = String(req.body.nom      || '').trim().substring(0, 100);
  var email    = String(req.body.email    || '').trim().substring(0, 150);
  var role     = ['superadmin','editor'].includes(req.body.role) ? req.body.role : 'editor';

  if (!username || !password || !nom) {
    return res.status(400).json({ error: 'Usuari, contrasenya i nom són obligatoris' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'La contrasenya ha de tenir almenys 8 caràcters' });
  }
  var exists = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (exists) return res.status(409).json({ error: 'Ja existeix un usuari amb aquest nom d\'usuari' });

  var hash = bcrypt.hashSync(password, 12);
  var info = db.prepare(
    'INSERT INTO users (username, password_hash, nom, email, role, actiu, must_change_pass) VALUES (?,?,?,?,?,1,1)'
  ).run(username, hash, nom, email, role);

  audit(req.user.sub, 'USER_CREATE', username + ' (' + role + ')');
  // Envia email d'activació si l'usuari té email
  if (email) mailActivacio(email, username, password);
  res.json({ ok: true, id: info.lastInsertRowid, mailSent: !!(email && _mailTransporter) });
});

app.patch('/api/users/:id', verifyToken, requireRole('superadmin'), function (req, res) {
  var id   = parseInt(req.params.id, 10);
  var user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!user) return res.status(404).json({ error: 'Usuari no trobat' });

  if (typeof req.body.actiu !== 'undefined') {
    var actiu = req.body.actiu ? 1 : 0;
    db.prepare('UPDATE users SET actiu=? WHERE id=?').run(actiu, id);
    audit(req.user.sub, actiu ? 'USER_ENABLE' : 'USER_DISABLE', user.username);
  }
  if (req.body.role && ['superadmin','editor'].includes(req.body.role)) {
    db.prepare('UPDATE users SET role=? WHERE id=?').run(req.body.role, id);
    audit(req.user.sub, 'USER_ROLE', user.username + ' → ' + req.body.role);
  }
  if (req.body.totp_secret !== undefined) {
    var secret  = req.body.totp_secret  || null;
    var enabled = req.body.totp_enabled ? 1 : 0;
    db.prepare('UPDATE users SET totp_secret=?, totp_enabled=? WHERE id=?').run(secret, enabled, id);
    audit(req.user.sub, enabled ? 'TOTP_ENABLE' : 'TOTP_RESET', user.username);
  }
  res.json({ ok: true });
});

app.delete('/api/users/:id', verifyToken, requireRole('superadmin'), function (req, res) {
  var id   = parseInt(req.params.id, 10);
  var user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!user) return res.status(404).json({ error: 'Usuari no trobat' });
  // Impedeix eliminar l'últim superadmin
  var superCount = db.prepare("SELECT COUNT(*) AS n FROM users WHERE role='superadmin'").get().n;
  if (user.role === 'superadmin' && superCount <= 1) {
    return res.status(400).json({ error: 'No es pot eliminar l\'únic superadmin' });
  }
  db.prepare('DELETE FROM users WHERE id=?').run(id);
  audit(req.user.sub, 'USER_DELETE', user.username);
  res.json({ ok: true });
});

app.post('/api/users/:id/reset-password', verifyToken, requireRole('superadmin'), function (req, res) {
  var id       = parseInt(req.params.id, 10);
  var user     = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!user) return res.status(404).json({ error: 'Usuari no trobat' });
  var password = String(req.body.password || '').substring(0, 200);
  if (password.length < 8) return res.status(400).json({ error: 'Mínim 8 caràcters' });
  db.prepare('UPDATE users SET password_hash=?, must_change_pass=1 WHERE id=?')
    .run(bcrypt.hashSync(password, 12), id);
  audit(req.user.sub, 'USER_RESET_PASS', user.username);
  // Envia email de reset si l'usuari té email
  if (user.email) mailResetPassword(user.email, user.username, password);
  res.json({ ok: true, mailSent: !!(user.email && _mailTransporter) });
});

// ── API: Registre d'auditoria ──────────────────────────────
app.get('/api/audit', verifyToken, requireRole('superadmin'), function (req, res) {
  var limit  = Math.min(parseInt(req.query.limit  || 100, 10), 500);
  var offset = parseInt(req.query.offset || 0, 10);
  var rows   = db.prepare(
    'SELECT id, ts, username, action, detail FROM audit_log ORDER BY id DESC LIMIT ? OFFSET ?'
  ).all(limit, offset);
  var total  = db.prepare('SELECT COUNT(*) AS n FROM audit_log').get().n;
  res.json({ rows: rows, total: total });
});

app.post('/api/audit', verifyToken, function (req, res) {
  var action = String(req.body.action || '').trim().substring(0, 80);
  var detail = String(req.body.detail || '').trim().substring(0, 200) || null;
  if (!action) return res.status(400).json({ error: 'action requerit' });
  audit(req.user.sub, action, detail);
  res.json({ ok: true });
});

// ── API: Salut (sense info de versió) ─────────────────────
app.get('/api/health', function (req, res) {
  res.json({ status: 'ok' });
});

// ── Gestió d'errors global ─────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  if (IS_PROD) {
    console.error('Error intern:', err.message);
    return res.status(500).json({ error: 'Error intern del servidor' });
  }
  res.status(500).json({ error: err.message });
});

// ── SPA fallback ───────────────────────────────────────────
app.get('/{*splat}', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Arrencada ──────────────────────────────────────────────
var server = app.listen(PORT, '0.0.0.0', function () {
  console.log('FCTA Portal escoltant a 0.0.0.0:' + PORT);
  console.log('Mode: ' + (process.env.NODE_ENV || 'development'));
});

// Tancament net SIGTERM
process.on('SIGTERM', function () {
  console.log('SIGTERM rebut – tancant...');
  server.close(function () { db.close(); process.exit(0); });
  setTimeout(function () { process.exit(0); }, 10000);
});

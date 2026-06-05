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

// ── Configuració ───────────────────────────────────────────
var PORT        = process.env.PORT       || 3000;
var JWT_SECRET  = process.env.JWT_SECRET || null;
var JWT_EXPIRY  = process.env.JWT_EXPIRY || '8h';
var IS_PROD     = process.env.NODE_ENV === 'production';
var DATA_DIR    = path.join(__dirname, 'data');
var UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
var DB_PATH     = path.join(DATA_DIR, 'fcta.db');

// CRÍTIC: en producció, JWT_SECRET és obligatori
if (IS_PROD && !JWT_SECRET) {
  console.error('ERROR CRÍTIC: JWT_SECRET no definit en producció. Aturant...');
  process.exit(1);
}
if (!JWT_SECRET) {
  JWT_SECRET = 'fcta-dev-INSEGUR-canvia-en-produccio';
  console.warn('AVIS: Usant JWT_SECRET de desenvolupament. Defineix JWT_SECRET al .env!');
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

// ── Backup automàtic en arrencada ─────────────────────────
// Desa una còpia JSON de les dades de producció a data/backups/
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
      data:       JSON.parse(row.data)
    }, null, 2));
    console.log('[FCTA] Backup creat: ' + path.basename(backupPath));
  } catch (e) {
    console.warn('[FCTA] No s\'ha pogut crear el backup:', e.message);
  }
})();

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
  var username = String(req.body.username || '').trim().substring(0, 50);
  var password = String(req.body.password || '').substring(0, 200);

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuari i contrasenya obligatoris' });
  }

  var user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

  // Temps constant independentment de si l'usuari existeix (evita timing attack)
  var dummyHash = '$2a$12$invaliddummyhashfortimingatk00';
  var hash = user ? user.password_hash : dummyHash;
  var valid = bcrypt.compareSync(password, hash) && !!user;

  if (!valid) {
    audit(username, 'LOGIN_FAIL', req.ip);
    return setTimeout(function () {
      res.status(401).json({ error: 'Usuari o contrasenya incorrectes' });
    }, 500 + Math.random() * 500); // retard aleatori 500-1000ms
  }

  audit(username, 'LOGIN_OK', req.ip);
  var token = signToken(user);
  res.json({
    token: token,
    nom:   user.nom,
    role:  user.role,
    mustChangePassword: user.must_change_pass === 1
  });
});

// ── API: Dades públiques ───────────────────────────────────
app.get('/api/data', function (req, res) {
  var row = db.prepare('SELECT data FROM portal_state WHERE id = 1').get();
  if (!row) return res.json(null);
  res.json(JSON.parse(row.data));
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
  if (!user || !bcrypt.compareSync(currentPass, user.password_hash)) {
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
    audit(req.user.sub, 'RESTORE_BACKUP', name);
    res.json({ ok: true, restored_from: name });
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
      data: JSON.parse(row.data)
    }, null, 2));
    audit(req.user.sub, 'MANUAL_BACKUP', filename);
    res.json({ ok: true, name: filename });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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

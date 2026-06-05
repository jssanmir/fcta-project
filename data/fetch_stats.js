/**
 * fetch_stats.js
 * Obté les estadístiques completes de cada tirada de la FCTA des d'Ianseo
 * i genera competition_stats_full.json amb tots els tiradors individuals.
 *
 * Ús: node data/fetch_stats.js
 * Requereix: Node.js >= 18 (fetch natiu) o instal·la node-fetch
 */

const fs = require('fs');
const https = require('https');
const http = require('http');

// ── Competicions FCTA amb ID numèric d'Ianseo ──────────────────────────────
// Les que tenen ianseo com a string alphanumèric → privades a Ianseo, s'afegeixen
// sense dades individuals (accessible: false).
const COMPETITIONS = [
  { id:40, title:"XXI Campionat de Catalunya de Round 900 – XII Memorial Jordi Adell", dateISO:"2025-09-06", type:"al",   disc:"Aire Lliure", ianseo:24295 },
  { id:38, title:"XXXII Trofeu Ciutat de Lleida – III Copa Pirineus – IV Memorial Alfred Piñol", dateISO:"2025-09-27", type:"al",   disc:"Aire Lliure", ianseo:23781 },
  // ── Lliga Catalana Sala 2025-2026 (privades a Ianseo) ──────────────────
  { id:37, title:"1ª Tirada Lliga Catalana de Sala 2025/2026",  dateISO:"2025-10-04", type:"sala", disc:"Sala – 18m", ianseo:'FCTALS1',  privateIanseo:true },
  { id:35, title:"2ª Tirada Lliga Catalana de Sala 2025/2026",  dateISO:"2025-10-18", type:"sala", disc:"Sala – 18m", ianseo:'FCTALS2a', privateIanseo:true },
  { id:32, title:"3ª Tirada Lliga Catalana de Sala 2025/2026",  dateISO:"2025-11-15", type:"sala", disc:"Sala – 18m", ianseo:'FCTALS3a', privateIanseo:true },
  { id:30, title:"4ª Tirada Lliga Catalana de Sala 2025/2026",  dateISO:"2025-12-06", type:"sala", disc:"Sala – 18m", ianseo:'FCTALS4a', privateIanseo:true },
  { id:6,  title:"1ª Tirada Lliga Catalana Camp 2025/26",       dateISO:"2026-01-11", type:"camp", disc:"Tir de Camp",  ianseo:26209 },
  { id:20, title:"1r Campionat Catalunya 3D en Línia 2026",     dateISO:"2026-01-18", type:"trd",  disc:"3D / Bosc",    ianseo:26307 },
  { id:19, title:"I Trofeu Vila de Cambrils",                   dateISO:"2026-01-24", type:"al",   disc:"Aire Lliure", ianseo:26423 },
  { id:8,  title:"58è Campionat de Catalunya de Sala",          dateISO:"2026-01-31", type:"sala", disc:"Sala – 18m",   ianseo:26399 },
  { id:3,  title:"3ª Tirada Lliga Catalana 3D 2025/2026",       dateISO:"2026-02-22", type:"trd",  disc:"3D / Bosc",    ianseo:26790 },
  { id:12, title:"2ª Tirada Lliga Catalana Camp 2026",          dateISO:"2026-03-08", type:"camp", disc:"Tir de Camp",  ianseo:26987 },
  { id:13, title:"1ª Tirada Lliga Catalana Aire Lliure 2026",   dateISO:"2026-03-14", type:"al",   disc:"Aire Lliure", ianseo:27062 },
  { id:5,  title:"Campionat de Catalunya Universitari 2026",    dateISO:"2026-03-28", type:"al",   disc:"Aire Lliure", ianseo:27386 },
  { id:10, title:"4ª Tirada Lliga Catalana 3D 2026",            dateISO:"2026-04-12", type:"trd",  disc:"3D / Bosc",    ianseo:27589 },
  { id:11, title:"2ª Tirada Lliga Catalana Aire Lliure 2026",   dateISO:"2026-04-18", type:"al",   disc:"Aire Lliure", ianseo:27633 },
  { id:9,  title:"3ª Tirada Lliga Catalana Camp 2026",          dateISO:"2026-05-03", type:"camp", disc:"Tir de Camp",  ianseo:27988 },
  { id:2,  title:"56è Campionat de Catalunya de Camp",          dateISO:"2026-05-10", type:"camp", disc:"Tir de Camp",  ianseo:28098 },
  { id:7,  title:"30è Campionat de Catalunya 3D",               dateISO:"2026-05-17", type:"trd",  disc:"3D / Bosc",    ianseo:28099 },
  { id:1,  title:"3ª Tirada Lliga Catalana Aire Lliure 2026 (Montjuïc/Barcelona)", dateISO:"2026-05-30", type:"al", disc:"Aire Lliure", ianseo:28416 },
  { id:15, title:"3ª Tirada Lliga Catalana Aire Lliure 2026 (Esclanyà/Girona)",    dateISO:"2026-05-31", type:"al", disc:"Aire Lliure", ianseo:28417 },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function getUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        resolve({ status: res.statusCode, body: '', redirected: true });
        res.resume();
        return;
      }
      if (res.statusCode === 404) {
        resolve({ status: 404, body: '', notFound: true });
        res.resume();
        return;
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', d => body += d);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

/** Decode HTML entities */
function decodeHtml(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&Agrave;/g,'À').replace(/&Aacute;/g,'Á').replace(/&Egrave;/g,'È')
    .replace(/&Eacute;/g,'É').replace(/&Iacute;/g,'Í').replace(/&Oacute;/g,'Ó')
    .replace(/&Uacute;/g,'Ú').replace(/&Ntilde;/g,'Ñ').replace(/&agrave;/g,'à')
    .replace(/&aacute;/g,'á').replace(/&egrave;/g,'è').replace(/&eacute;/g,'é')
    .replace(/&iacute;/g,'í').replace(/&oacute;/g,'ó').replace(/&uacute;/g,'ú')
    .replace(/&ntilde;/g,'ñ').replace(/&ccedil;/g,'ç').replace(/&Ccedil;/g,'Ç')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Normalitza el camp club del HTML d'Ianseo.
 * Ianseo mostra "COD - Nom Club" o "COD" o "Nom Club".
 * Retorna { code, name } on code és la clau canònica.
 */
function normalizeClub(raw) {
  var s = raw.trim();
  var dashIdx = s.indexOf(' - ');
  if (dashIdx > 0) {
    // Format "COD - Nom Club"
    var code = s.substring(0, dashIdx).trim();
    var name = s.substring(dashIdx + 3).trim();
    return { code: code, name: name };
  }
  // Sense guió: pot ser un codi curt (CACV) o un nom llarg
  var isCode = /^[A-Z0-9]{2,6}$/.test(s);
  return { code: s, name: isCode ? '' : s };
}

/**
 * Parse IC.php HTML to extract divisions and individual archers.
 *
 * Columnes Ianseo IC (qualificació):
 *   pos | nom | club | [puntuació1] … [puntuació_total] | 10+X | X
 *
 * Bug corregit: agafem el MÀXIM dels valors numèrics a partir de la
 * columna 3 (índex 3+), perquè el total sempre és > que X i 10+X.
 */
function parseIC(html) {
  const divisions = [];
  let currentDivision = null;
  let posCounter = 1;

  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;

  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const rowHtml = rowMatch[1];
    const cells = [];
    const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
      cells.push(decodeHtml(cellMatch[1]));
    }

    if (cells.length === 0) continue;

    // ── Capçalera de divisió (colspan) ────────────────────────
    if (rowHtml.toLowerCase().includes('colspan') && cells.length <= 2) {
      // Netejar el nom: eliminar notes entre [brackets] i (parèntesis) al final
      // ex: "Recorbat - Home [Després de 60 Fletxes]" → "Recorbat - Home"
      let divName = cells[0]
        .replace(/\[.*?\]/g, '')    // eliminar [...]
        .replace(/\(.*?\)/g, '')    // eliminar (...)
        .replace(/\s+/g, ' ')
        .trim();
      // Saltar si és el títol de la pàgina o molt llarg
      if (divName && divName.length > 2 && divName.length < 80) {
        currentDivision = { name: divName, archers: [] };
        divisions.push(currentDivision);
        posCounter = 1;
      }
      continue;
    }

    // Saltar files de capçalera (<th>)
    if (rowHtml.includes('<th')) continue;

    if (!currentDivision || cells.length < 4) continue;

    // ── Extreure pos, nom, club ────────────────────────────────
    let pos = null, name = null, clubRaw = null, score = null;

    const firstNum = parseInt(cells[0]);
    const hasExplicitPos = !isNaN(firstNum) && String(firstNum) === cells[0].trim();

    if (hasExplicitPos) {
      // Format: pos | nom | club | [puntuacions per distància "NNN/ R"] | total | 10+X | X
      pos      = firstNum;
      name     = cells[1];
      clubRaw  = cells[2];
    } else {
      // Format sense columna de posició: nom | club | puntuació | …
      pos      = posCounter;
      name     = cells[0];
      clubRaw  = cells[1];
    }

    // Netejar llicències RFETA del nom: "Nom, Lic 30003" → "Nom"
    if (name) name = name.replace(/,?\s*Lic\.?\s+\d+/gi, '').trim();

    // ── Puntuació total: màxim dels valors enters a partir de la 4a col ──
    // Ianseo pot mostrar puntuació per distàncies ("350/ 1", "317/ 1"…)
    // seguit del total i dels comptadors X. El total és sempre el major.
    // parseInt("350/ 1") = 350 (s'ignora la part posterior al '/').
    const scoreStart = hasExplicitPos ? 3 : 2;
    let maxScore = null;
    for (let si = scoreStart; si < cells.length; si++) {
      const v = parseInt(cells[si]);
      if (!isNaN(v) && v > 0) {
        maxScore = (maxScore === null) ? v : Math.max(maxScore, v);
      }
    }
    score = maxScore;

    // ── Club normalitzat ──────────────────────────────────────
    const clubParsed = normalizeClub(clubRaw || '');

    if (name && name.trim().length > 2) {
      posCounter++;
      currentDivision.archers.push({
        pos:   pos || posCounter - 1,
        name:  name.trim(),
        club:  clubParsed.code,          // codi canònic per filtrar
        clubName: clubParsed.name || '', // nom llarg per mostrar
        score: score
      });
    }
  }

  return divisions;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const results = [];

  for (const comp of COMPETITIONS) {
    const year = comp.dateISO.substring(0, 4);
    const url = `https://www.ianseo.net/TourData/${year}/${comp.ianseo}/IC.php`;

    process.stdout.write(`Fetching [${comp.ianseo}] ${comp.title.substring(0, 50)}... `);

    try {
      // Competicions privades → no intentar fetch
      if (comp.privateIanseo) {
        console.log('PRIVATE (results not public on Ianseo)');
        results.push({ ...comp, icUrl: url, accessible: false, totalParticipants: null, divisions: [] });
        continue;
      }

      const res = await getUrl(url);

      if (res.notFound || res.redirected || res.status !== 200) {
        console.log(`SKIP (${res.status || 'redirect'})`);
        results.push({ ...comp, icUrl: url, accessible: false, totalParticipants: null, divisions: [] });
        continue;
      }

      const divisions = parseIC(res.body);
      const totalParticipants = divisions.reduce((s, d) => s + d.archers.length, 0);

      console.log(`OK — ${divisions.length} divisions, ${totalParticipants} archers`);
      results.push({ ...comp, icUrl: url, accessible: true, totalParticipants, divisions });

    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      results.push({ ...comp, icUrl: url, accessible: false, totalParticipants: null, divisions: [], error: err.message });
    }

    // Polite delay
    await new Promise(r => setTimeout(r, 500));
  }

  // Sort by dateISO
  results.sort((a, b) => a.dateISO.localeCompare(b.dateISO));

  const outputPath = __dirname + '/competition_stats_full.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

  const sizeMB = (fs.statSync(outputPath).size / 1024).toFixed(1);
  console.log(`\n✓ Escrit: ${outputPath} (${sizeMB} KB)`);
  console.log(`  ${results.filter(r => r.accessible !== false).length} accessibles / ${results.length} total`);
}

main().catch(console.error);

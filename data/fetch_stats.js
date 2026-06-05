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
const COMPETITIONS = [
  { id:40, title:"XXI Campionat de Catalunya de Round 900 – XII Memorial Jordi Adell", dateISO:"2025-09-06", type:"al",   disc:"Aire Lliure", ianseo:24295 },
  { id:38, title:"XXXII Trofeu Ciutat de Lleida – III Copa Pirineus – IV Memorial Alfred Piñol", dateISO:"2025-09-27", type:"al",   disc:"Aire Lliure", ianseo:23781 },
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
 * Parse IC.php HTML to extract divisions and individual archers.
 * Structure: table with class-header rows and data rows.
 */
function parseIC(html) {
  const divisions = [];
  let currentDivision = null;
  let posCounter = 1;

  // Split by table rows
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

    // Detect division header: typically 1 cell spanning the table, no score
    // or a row with colspan containing division name
    if (rowHtml.toLowerCase().includes('colspan') && cells.length <= 2) {
      const divName = cells[0].replace(/\s+/g, ' ').trim();
      if (divName && divName.length > 2) {
        currentDivision = { name: divName, archers: [] };
        divisions.push(currentDivision);
        posCounter = 1;
      }
      continue;
    }

    // Detect header rows (th) - skip
    if (rowHtml.includes('<th')) continue;

    // Archer data rows: expect at least 3 cells (rank/name, club, score)
    if (!currentDivision || cells.length < 3) continue;

    // Try to extract: pos, name, club, score
    // Common IC.php format: pos | name | club | score(s)
    let pos = null, name = null, club = null, score = null;

    // Check if first cell is a number (position)
    const firstNum = parseInt(cells[0]);
    if (!isNaN(firstNum) && String(firstNum) === cells[0].trim()) {
      pos = firstNum;
      name = cells[1];
      club = cells[2];
      score = cells.length >= 4 ? parseInt(cells[cells.length - 1]) : null;
    } else if (cells.length >= 3) {
      // No explicit position
      pos = posCounter;
      name = cells[0];
      club = cells[1];
      score = parseInt(cells[cells.length - 1]);
    }

    if (name && name.length > 2) {
      posCounter++;
      currentDivision.archers.push({
        pos: pos || posCounter - 1,
        name: name.trim(),
        club: (club || '').trim(),
        score: isNaN(score) ? null : score
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

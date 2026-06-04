// inscription.js – Competition inscription modal
// ──────────────────────────────────────────────────────────

// ── INSCRIPTION MODAL ─────────────────────────────────────────
function openM(cid){
  var c=DB.competitions.find(function(x){return x.id===cid;});
  if(!c)return;
  document.getElementById('mTitle').textContent='Inscripci\u00f3 \u2013 '+c.title;
  var cats=['Senior Mascul\u00ed','Senior Femen\u00ed','J\u00fanior Mascul\u00ed','J\u00fanior Femen\u00ed','Cadet Mascul\u00ed','Cadet Femen\u00ed','Sub-21','Veter\u00e0'].map(function(o){return '<option>'+o+'</option>';}).join('');
  var estils=['Arc Ol\u00edmpic (Recurve)','Arc Nu (Barebow)','Arc de Polses (Compound)','Arc Llarg (Longbow)'].map(function(o){return '<option>'+o+'</option>';}).join('');
  document.getElementById('mBody').innerHTML=
    '<div style="background:#f0f4ff;border-radius:6px;padding:.85rem;margin-bottom:1.2rem;font-size:.85rem;color:var(--navy-dark)">\u{1F4C5} <strong>'+c.date+'</strong> &nbsp; \u{1F4CD} <strong>'+c.loc+'</strong></div>'
    +'<div class="mfg"><label>Nom i Cognoms</label><input type="text" placeholder="El teu nom complet"></div>'
    +'<div class="mrow"><div class="mfg"><label>Llic\u00e8ncia FCTA</label><input type="text" placeholder="CAT-XXXXX"></div>'
    +'<div class="mfg"><label>Club</label><input type="text" placeholder="Nom del club federat"></div></div>'
    +'<div class="mrow"><div class="mfg"><label>Classe</label><select>'+cats+'</select></div>'
    +'<div class="mfg"><label>Divisió</label><select>'+estils+'</select></div></div>'
    +'<div class="mrow"><div class="mfg"><label>Correu electr\u00f2nic</label><input type="email" placeholder="correu@exemple.cat"></div>'
    +'<div class="mfg"><label>Tel\u00e8fon</label><input type="tel" placeholder="6XX XXX XXX"></div></div>'
    +'<p style="font-size:.76rem;color:var(--gray);margin-bottom:.6rem;line-height:1.6">En enviar la inscripci\u00f3 rebr\u00e0s un correu de confirmaci\u00f3. Termini de pagament: 48h.</p>'
    +'<button class="m-sub" onclick="toast(\'Inscripci\u00f3 enviada! Rebr\u00e0s confirmaci\u00f3 per correu.\',\'&#9989;\');closeM()">&#9993;&#65039; Enviar Inscripci\u00f3</button>';
  document.getElementById('mWrap').style.display='flex';
}
function closeM(){document.getElementById('mWrap').style.display='none';}
function closeMOut(e){if(e.target===document.getElementById('mWrap'))closeM();}

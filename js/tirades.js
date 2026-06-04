// tirades.js – Club social rounds: render, submit, approve
// ──────────────────────────────────────────────────────────

// ── TIRADES SOCIALS ──────────────────────────────────────────
DB.tirades = [
  {id:1,nom:"1\u00aa Tirada Social Primavera \u2013 Club Arc Sabadell",club:"Arc Sabadell",tipus:"al",data:"2026-06-07",dataStr:"7 de juny de 2026",hora:"09:30",lloc:"Camp de Tir del Club, Av. de les Eres, Sabadell",desc:"Tirada amistosa d'aire lliure oberta a tots els arquers federats.\n\nDIST\u00c0NCIES: 50m i 30m\nCATEGORIES: Arc ol\u00edmpic, arc nu i arc de polses.\nFORMAT: 1 ronda WA 720\nAFORAMENT: 60 arquers\nINSCRIPCI\u00d3: 8\u20ac per participant. Berenar incl\u00f2s.\nPREMIS: Trofeus als 3 primers de cada categoria.",email:"tirades@arcsabadell.cat",tel:"634 123 456",inscripcio:"https://forms.gle/exemple",img:"img/tirades/tirada_aire_lliure.jpg",status:"valid"},
  {id:2,nom:"Tirada de Bosc Sant Joan \u2013 Tir Arc Olesa",club:"Tir Arc Olesa",tipus:"3d",data:"2026-06-21",dataStr:"21 de juny de 2026",hora:"08:00",lloc:"Bosc de Can Mata, Olesa de Montserrat",desc:"Tirada de bosc i 3D amb motiu de la revetlla de Sant Joan.\n\nFORMAT: 24 dianes 3D en circuit natural de bosc\nDIST\u00c0NCIES: 5-45m (marc desconegut)\nCATEGORIES: Lliure (arc ol\u00edmpic, nu, polses i longbow)\nAFORAMENT: 80 arquers\nINSCRIPCI\u00d3: 10\u20ac. Sopar de revetlla incl\u00f2s (22h).",email:"info@tirarcolesa.cat",tel:"",inscripcio:"Presentaci\u00f3 el dia de la tirada",img:"img/tirades/tirada_3d_bosc.jpg",status:"valid"},
  {id:3,nom:"II Tirada Social Indoor Hivern \u2013 Club Arc Tarragona",club:"Club Arc Tarragona",tipus:"sala",data:"2026-10-18",dataStr:"18 d'octubre de 2026",hora:"10:00",lloc:"Pavell\u00f3 Municipal Esportiu, c/ Lleida 12, Tarragona",desc:"Tirada de sala amistosa per inaugurar la temporada d'hivern.\n\nFORMAT: 3 rondes WA 18m\nDIANA: 40cm o 60cm\nCATEGORIES: Arc ol\u00edmpic i arc nu\nAFORAMENT: 40 arquers\nINSCRIPCI\u00d3: 6\u20ac (4\u20ac menors de 18 anys).",email:"secretaria@arctarragona.cat",tel:"977 123 456",inscripcio:"Inscripci\u00f3 pr\u00e8via per email",img:"img/tirades/tirada_sala.jpg",status:"valid"},
  {id:4,nom:"Tirada de Camp Muntanya \u2013 CA Lleida",club:"CA Lleida",tipus:"camp",data:"2026-07-12",dataStr:"12 de juliol de 2026",hora:"07:30",lloc:"Zona esportiva del Sec\u00e0 de Sant Pere, Lleida",desc:"Tirada de camp amistosa en paratge natural.\n\nFORMAT: 24 dianes WA de camp, marc desconegut\nDIST\u00c0NCIES: 5-60m\nCATEGORIES: Tots els estils benvinguts\nAFORAMENT: 50 arquers\nINSCRIPCI\u00d3: 8\u20ac. Dinar de germanor al camp (12h).",email:"info@caleida.cat",tel:"650 789 012",inscripcio:"Per email o WhatsApp al 650 789 012",img:"img/tirades/tirada_camp.jpg",status:"pend"}
];

var tipusLabels = {al:{lbl:"Aire Lliure",cls:"cb-al"},camp:{lbl:"Tir de Camp",cls:"cb-camp"},"3d":{lbl:"3D / Bosc",cls:"cb-3d"},sala:{lbl:"Sala",cls:"cb-sala"},mixt:{lbl:"Mixt",cls:"cb-fed"}};

function setSTab(tab,btn){
  document.querySelectorAll('.stab').forEach(function(b){b.classList.remove('act')});
  btn.classList.add('act');
  document.getElementById('sSocialTauler').style.display=tab==='tauler'?'block':'none';
  document.getElementById('sSocialNova').style.display=tab==='nova'?'block':'none';
}
function filtSocial(tipus,btn){
  document.querySelectorAll('#socialTypeFilters .fb').forEach(function(b){b.classList.remove('act')});
  btn.classList.add('act');
  renderTirades(tipus);
}
function renderTirades(filter){
  var valid=(DB.tirades||[]).filter(function(t){return t.status==='valid';});
  var data=filter==='all'?valid:valid.filter(function(t){return t.tipus===filter;});
  var grid=document.getElementById('tiradesGrid');
  if(!grid)return;
  if(!data.length){
    grid.innerHTML='<div class="tirada-empty" style="grid-column:1/-1"><span class="te-icon">\u{1F3AF}</span><p>No hi ha tirades d\'aquest tipus planificades.<br>Publiqueu la vostra tirada!</p></div>';
    return;
  }
  grid.innerHTML = '';
  data.forEach(function(t){
    var ti = tipusLabels[t.tipus]||{lbl:t.tipus,cls:'cb-fed'};
    var card = document.createElement('div');
    card.className = 'tirada-card';
    card.onclick = function(){ openTirada(t.id); };

    var imgDiv = document.createElement('div');
    imgDiv.className = 'tirada-img';
    if (t.img && /^(https?:\/\/|\/|img\/)/.test(t.img)) {
      var img = document.createElement('img');
      img.onerror = function(){ this.parentNode.innerHTML='<span class="tirada-img-placeholder">\uD83C\uDFAF</span>'; };
      img.src = t.img;
      imgDiv.appendChild(img);
    } else {
      imgDiv.innerHTML = '<span class="tirada-img-placeholder">\uD83C\uDFAF</span>';
    }
    var tag = document.createElement('span');
    tag.className = 'tirada-tipus-tag ' + ti.cls;
    tag.textContent = ti.lbl;
    imgDiv.appendChild(tag);

    var body = document.createElement('div');
    body.className = 'tirada-body';
    var clubDiv = document.createElement('div');
    clubDiv.className = 'tirada-club';
    clubDiv.textContent = t.club || '';
    var h3 = document.createElement('h3');
    h3.textContent = t.nom || '';
    body.appendChild(clubDiv);
    body.appendChild(h3);
    body.insertAdjacentHTML('beforeend',
      '<div class="tirada-meta">'
      +'<div class="tirada-mi"><span>\uD83D\uDCC5</span><span></span></div>'
      +'<div class="tirada-mi"><span>\uD83D\uDCCD</span><span></span></div>'
      +'</div>'
      +'<div class="tirada-actions"><button class="bsm bsm-n">\u2139\uFE0F Veure detalls</button></div>'
    );
    body.querySelectorAll('.tirada-mi span:last-child')[0].textContent = t.dataStr + (t.hora ? ' \u00B7 ' + t.hora + 'h' : '');
    body.querySelectorAll('.tirada-mi span:last-child')[1].textContent = t.lloc || '';
    body.querySelector('.tirada-actions button').onclick = function(e){ e.stopPropagation(); openTirada(t.id); };

    card.appendChild(imgDiv);
    card.appendChild(body);
    grid.appendChild(card);
  });
}
function openTirada(id){
  var t=(DB.tirades||[]).find(function(x){return x.id===id;});
  if(!t)return;
  var ti=tipusLabels[t.tipus]||{lbl:t.tipus,cls:'cb-fed'};
  var mBody = document.getElementById('mBody');
  document.getElementById('mTitle').textContent = t.nom || '';
  mBody.innerHTML = '';

  if (t.img && /^(https?:\/\/|\/|img\/)/.test(t.img)) {
    var detImg = document.createElement('img');
    detImg.className = 'tirada-detail-img'; detImg.alt = 'Cartell';
    detImg.onerror = function(){ this.style.display='none'; };
    detImg.src = t.img; mBody.appendChild(detImg);
  }

  var meta = document.createElement('div'); meta.className = 'tirada-detail-meta';
  meta.innerHTML = '<div class="tirada-detail-mi"><strong>Tipus</strong><span><span class="cbadge"></span></span></div>'
    +'<div class="tirada-detail-mi"><strong>Club</strong><span></span></div>'
    +'<div class="tirada-detail-mi"><strong>Data</strong><span></span></div>'
    +'<div class="tirada-detail-mi"><strong>Lloc</strong><span></span></div>';
  meta.querySelector('.cbadge').className += ' ' + ti.cls;
  meta.querySelector('.cbadge').textContent = ti.lbl;
  meta.querySelectorAll('.tirada-detail-mi span:last-child')[1].textContent = t.club || '';
  meta.querySelectorAll('.tirada-detail-mi span:last-child')[2].textContent = t.dataStr + (t.hora ? ' a les ' + t.hora + 'h' : '');
  meta.querySelectorAll('.tirada-detail-mi span:last-child')[3].textContent = t.lloc || '';
  if (t.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t.email)) {
    var cRow = document.createElement('div'); cRow.className = 'tirada-detail-mi';
    cRow.innerHTML = '<strong>Contacte</strong><span></span>';
    var mailto = document.createElement('a');
    mailto.href = 'mailto:' + t.email; mailto.style.color = 'var(--navy-light)';
    mailto.textContent = t.email;
    cRow.querySelector('span').appendChild(mailto);
    if (t.tel) cRow.querySelector('span').appendChild(document.createTextNode(' \u00b7 ' + t.tel));
    meta.appendChild(cRow);
  }
  mBody.appendChild(meta);

  var dLabel = document.createElement('div');
  dLabel.style.cssText = "font-family:'Barlow Condensed',sans-serif;font-size:.88rem;font-weight:700;text-transform:uppercase;color:var(--navy-dark);margin:.75rem 0 .4rem";
  dLabel.textContent = 'Descripci\u00f3 i Regles';
  var dBlock = document.createElement('div'); dBlock.className = 'tirada-desc-block';
  dBlock.textContent = t.desc || '';
  mBody.appendChild(dLabel); mBody.appendChild(dBlock);

  var iLabel = document.createElement('div');
  iLabel.style.cssText = "font-family:'Barlow Condensed',sans-serif;font-size:.88rem;font-weight:700;text-transform:uppercase;color:var(--navy-dark);margin:.75rem 0 .4rem";
  iLabel.textContent = 'Inscripcions';
  mBody.appendChild(iLabel);
  if (t.inscripcio && /^https?:\/\//.test(t.inscripcio)) {
    var inscA = document.createElement('a');
    inscA.href = t.inscripcio; inscA.target = '_blank'; inscA.rel = 'noopener';
    inscA.className = 'btn-gold';
    inscA.style.cssText = 'font-size:.85rem;padding:.55rem 1.2rem;display:inline-flex;margin-top:.25rem';
    inscA.textContent = '\ud83d\udd17 Inscriu-te';
    mBody.appendChild(inscA);
  } else {
    var inscS = document.createElement('span');
    inscS.style.cssText = 'font-size:.85rem;color:var(--gray)';
    inscS.textContent = t.inscripcio || 'Consulta amb el club';
    mBody.appendChild(inscS);
  }
  document.getElementById('mWrap').style.display='flex';
}
function populateClubs(){
  var sel=document.getElementById('nt_club');
  if(!sel)return;
  DB.clubs.sort().forEach(function(c){var o=document.createElement('option');o.value=c;o.textContent=c;sel.appendChild(o);});
}
function submitTirada(){
  var nom=(document.getElementById('nt_nom')||{}).value||'';
  var club=(document.getElementById('nt_club')||{}).value||'';
  var tipus=(document.getElementById('nt_tipus')||{}).value||'';
  var data=(document.getElementById('nt_data')||{}).value||'';
  var desc=(document.getElementById('nt_desc')||{}).value||'';
  var email=(document.getElementById('nt_email')||{}).value||'';
  if(!nom.trim()||!club||!tipus||!data||!desc.trim()||!email.trim()){toast('Omple tots els camps obligatoris (*)','&#9888;&#65039;');return;}
  var hora=(document.getElementById('nt_hora')||{}).value||'';
  var lloc=(document.getElementById('nt_lloc')||{}).value||'';
  var tel=(document.getElementById('nt_tel')||{}).value||'';
  var img=(document.getElementById('nt_img')||{}).value||'';
  var insc=(document.getElementById('nt_inscripcio')||{}).value||'';
  var months=['gener','febrer','mar\u00e7','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre'];
  var parts=data.split('-');
  var dataStr=(parts[2]?parseInt(parts[2]):'')+' de '+(months[parseInt(parts[1])-1]||'')+' de '+(parts[0]||'');
  DB.tirades.unshift({id:Date.now(),nom:nom.trim(),club:club,tipus:tipus,data:data,dataStr:dataStr,hora:hora,lloc:lloc,desc:desc.trim(),email:email.trim(),tel:tel,inscripcio:insc,img:img,status:'pend'});
  dbSave();
  updatePendDot();
  toast('Tirada enviada! Ser\u00e0 visible un cop validada per l\'administrador (m\u00e0x. 48h).','&#9989;');
  ['nt_nom','nt_lloc','nt_desc','nt_email','nt_tel','nt_img','nt_inscripcio','nt_hora'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
  ['nt_club','nt_tipus'].forEach(function(id){var el=document.getElementById(id);if(el)el.selectedIndex=0;});
  document.querySelectorAll('.stab').forEach(function(b){b.classList.remove('act')});
  var tabs=document.querySelectorAll('.stab');if(tabs[0])tabs[0].classList.add('act');
  var t=document.getElementById('sSocialTauler');var n=document.getElementById('sSocialNova');
  if(t)t.style.display='block';if(n)n.style.display='none';
}

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
  grid.innerHTML=data.map(function(t){
    var ti=tipusLabels[t.tipus]||{lbl:t.tipus,cls:'cb-fed'};
    var img=t.img?('<img src="'+t.img+'" alt="'+t.nom+'" onerror="this.parentNode.innerHTML=\'<span class=\\\'tirada-img-placeholder\\\'>\u{1F3AF}</span>\'">'):'<span class="tirada-img-placeholder">\u{1F3AF}</span>';
    return '<div class="tirada-card" onclick="openTirada('+t.id+')">'
      +'<div class="tirada-img">'+img+'<span class="tirada-tipus-tag '+ti.cls+'">'+ti.lbl+'</span></div>'
      +'<div class="tirada-body"><div class="tirada-club">'+t.club+'</div>'
      +'<h3>'+t.nom+'</h3>'
      +'<div class="tirada-meta"><div class="tirada-mi"><span>\u{1F4C5}</span><span>'+t.dataStr+(t.hora?' &middot; '+t.hora+'h':'')+'</span></div>'
      +'<div class="tirada-mi"><span>\u{1F4CD}</span><span>'+t.lloc+'</span></div></div>'
      +'<div class="tirada-actions"><button class="bsm bsm-n" onclick="event.stopPropagation();openTirada('+t.id+')">\u2139\uFE0F Veure detalls</button></div>'
      +'</div></div>';
  }).join('');
}
function openTirada(id){
  var t=(DB.tirades||[]).find(function(x){return x.id===id;});
  if(!t)return;
  var ti=tipusLabels[t.tipus]||{lbl:t.tipus,cls:'cb-fed'};
  var imgHtml=t.img?('<img src="'+t.img+'" class="tirada-detail-img" alt="Cartell" onerror="this.style.display=\'none\'">'):'';
  var inscHtml=t.inscripcio&&t.inscripcio.startsWith('http')
    ?('<a href="'+t.inscripcio+'" target="_blank" class="btn-gold" style="font-size:.85rem;padding:.55rem 1.2rem;display:inline-flex;margin-top:.25rem">\u{1F517} Inscriu-te</a>')
    :'<span style="font-size:.85rem;color:var(--gray)">'+(t.inscripcio||'Consulta amb el club')+'</span>';
  document.getElementById('mTitle').textContent=t.nom;
  document.getElementById('mBody').innerHTML=imgHtml
    +'<div class="tirada-detail-meta">'
    +'<div class="tirada-detail-mi"><strong>Tipus</strong><span><span class="cbadge '+ti.cls+'">'+ti.lbl+'</span></span></div>'
    +'<div class="tirada-detail-mi"><strong>Club</strong><span>'+t.club+'</span></div>'
    +'<div class="tirada-detail-mi"><strong>Data</strong><span>'+t.dataStr+(t.hora?' a les '+t.hora+'h':'')+'</span></div>'
    +'<div class="tirada-detail-mi"><strong>Lloc</strong><span>'+t.lloc+'</span></div>'
    +(t.email?'<div class="tirada-detail-mi"><strong>Contacte</strong><span><a href="mailto:'+t.email+'" style="color:var(--navy-light)">'+t.email+'</a>'+(t.tel?' &middot; '+t.tel:'')+'</span></div>':'')
    +'</div>'
    +'<div style="font-family:\'Barlow Condensed\',sans-serif;font-size:.88rem;font-weight:700;text-transform:uppercase;color:var(--navy-dark);margin-bottom:.5rem">Descripci\u00f3 i Regles</div>'
    +'<div class="tirada-desc-block">'+(t.desc||'').replace(/\n/g,'<br>')+'</div>'
    +'<div style="font-family:\'Barlow Condensed\',sans-serif;font-size:.88rem;font-weight:700;text-transform:uppercase;color:var(--navy-dark);margin-bottom:.4rem">Inscripcions</div>'
    +inscHtml;
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

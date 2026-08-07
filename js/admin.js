// admin.js – Admin panel: CRUD for circulars, news, competitions, formations, tirades
// ──────────────────────────────────────────────────────────

// ── Backup manual des de la capçalera del panell ───────────
function admDoBackup() {
  var token = window.dbGetToken ? window.dbGetToken() : '';
  if (!token) { toast('Sessió no iniciada', '⚠️'); return; }
  fetch('/api/backups', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    if (d.ok) toast('Backup creat: ' + d.name, '💾');
    else toast(d.error || 'Error al backup', '⚠️');
  })
  .catch(function(){ toast('Error de connexió al backup', '⚠️'); });
}

// ── ADMIN PANEL ────────────────────────────────────────────
// _admCloseTimer: si es tanca i es torna a obrir el panell abans que
// acabi l'animació de sortida (400ms), cal cancel·lar el setTimeout
// pendent — si no, amaga l'overlay (display:none) 400ms després
// d'haver-lo tornat a obrir, deixant-lo invisible encara que
// admPanel ja tingui la classe 'open'.
var _admCloseTimer = null;
function openAdm(){
  if(!admSession){ openAdmin(); return; }
  if(_admCloseTimer){ clearTimeout(_admCloseTimer); _admCloseTimer=null; }
  document.getElementById('admOverlay').style.display='flex';
  setTimeout(function(){ document.getElementById('admPanel').classList.add('open'); },10);
  var badge=document.getElementById('admUserBadge');
  if(badge) badge.textContent=admSession.nom+' ('+admSession.role+')';
  renderATab('circ');
}
function closeAdm(){
  document.getElementById('admPanel').classList.remove('open');
  if(_admCloseTimer) clearTimeout(_admCloseTimer);
  _admCloseTimer=setTimeout(function(){ document.getElementById('admOverlay').style.display='none'; _admCloseTimer=null; },400);
}
function closeAdmOut(e){ if(e.target===document.getElementById('admOverlay'))closeAdm(); }
function setATab(tab,btn){
  document.querySelectorAll('.adm-tab').forEach(function(b){b.classList.remove('act')});
  btn.classList.add('act');
  renderATab(tab);
}

// ── UPLOAD HELPER ──────────────────────────────────────────
// Genera el widget d'upload (botó + preview + camp ocult amb la URL resultant)
// type: 'pdf' | 'image'
function mkUploadField(label, idUrl, currentUrl, type) {
  var isPdf   = (type === 'pdf');
  var accept  = isPdf ? '.pdf,application/pdf' : '.jpg,.jpeg,.png,.webp,.gif,image/*';
  var preview = '';
  if (currentUrl && !isPdf) {
    preview = '<img id="prev_'+idUrl+'" src="'+escHtml(currentUrl)+'" '
            + 'style="max-width:80px;max-height:60px;border-radius:4px;margin-top:4px;display:block"'+dataAttr('onerror','hideOnError',[])+'>';
  } else if (currentUrl && isPdf) {
    preview = '<a id="prev_'+idUrl+'" href="'+escHtml(currentUrl)+'" target="_blank" '
            + 'style="font-size:.78rem;color:var(--navy-light);display:block;margin-top:4px">📄 '
            + escHtml(currentUrl.split('/').pop())+'</a>';
  } else {
    preview = '<span id="prev_'+idUrl+'" style="font-size:.78rem;color:var(--gray);display:block;margin-top:4px">Cap fitxer seleccionat</span>';
  }

  return '<div class="af-g"><label>'+label+'</label>'
    + '<input type="hidden" id="'+idUrl+'" value="'+escHtml(currentUrl||'')+'">'
    + '<div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">'
    + '<label class="upload-btn" style="cursor:pointer;background:var(--navy);color:white;border-radius:var(--r-md);'
    +   'padding:.4rem .9rem;font-size:.82rem;font-weight:700;display:inline-flex;align-items:center;gap:.4rem">'
    + (isPdf ? '📄 Pujar PDF' : '🖼️ Pujar imatge')
    + '<input type="file" accept="'+accept+'" style="display:none"'+dataAttr('onchange','handleUpload',['@el',idUrl,type])+'>'
    + '</label>'
    + '<span id="ustat_'+idUrl+'" style="font-size:.78rem;color:var(--gray)"></span>'
    + '</div>'
    + preview
    + '</div>';
}

// Puja el fitxer al servidor i actualitza el camp ocult + preview
function handleUpload(input, idUrl, type) {
  var file = input.files[0];
  if (!file) return;
  var stat = document.getElementById('ustat_'+idUrl);
  if (stat) stat.textContent = 'Pujant…';

  var token = window.dbGetToken ? window.dbGetToken() : '';
  var endpoint = type === 'pdf' ? '/api/upload/pdf' : '/api/upload/image';
  var fd = new FormData();
  fd.append('file', file);

  fetch(endpoint, {
    method: 'POST',
    headers: token ? { 'Authorization': 'Bearer '+token } : {},
    body: fd
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    if (d.url) {
      // Desa la URL al camp ocult
      var hiddenInput = document.getElementById(idUrl);
      if (hiddenInput) hiddenInput.value = d.url;
      // Actualitza la preview
      var prev = document.getElementById('prev_'+idUrl);
      if (prev) {
        if (type === 'image') {
          prev.outerHTML = '<img id="prev_'+idUrl+'" src="'+d.url+'" '
            + 'style="max-width:80px;max-height:60px;border-radius:4px;margin-top:4px;display:block">';
        } else {
          prev.outerHTML = '<a id="prev_'+idUrl+'" href="'+d.url+'" target="_blank" '
            + 'style="font-size:.78rem;color:var(--navy-light);display:block;margin-top:4px">📄 '+escHtml(d.nom)+'</a>';
        }
      }
      if (stat) stat.textContent = '✓ '+escHtml(d.nom);
    } else {
      if (stat) stat.textContent = '⚠ '+(d.error||'Error');
      toast(d.error||'Error en pujar el fitxer','⚠️');
    }
  })
  .catch(function(){
    if (stat) stat.textContent = '⚠ Error de connexió';
    toast('Error de connexió en pujar el fitxer','⚠️');
  });
}

// ── CRUD HELPERS ───────────────────────────────────────────
function mkField(label,id,type,val,placeholder,options){
  var inp='';
  if(type==='select'&&options){
    var opts=options.map(function(o){
      var selected=o.val===val?'selected':'';
      return '<option value="'+o.val+'" '+selected+'>'+o.lbl+'</option>';
    }).join('');
    inp='<select id="'+id+'">'+opts+'</select>';
  } else if(type==='textarea'){
    inp='<textarea id="'+id+'" placeholder="'+(placeholder||'')+'">'+escHtml(val||'')+'</textarea>';
  } else {
    inp='<input type="'+(type||'text')+'" id="'+id+'" value="'+escHtml(val||'')+'" placeholder="'+(placeholder||'')+'">';
  }
  return '<div class="af-g"><label>'+label+'</label>'+inp+'</div>';
}
function escHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fv(id){ var e=document.getElementById(id); return e?e.value.trim():''; }
function confirmDel(name,fn){
  if(confirm('Eliminar "'+name+'"?\nAquesta acci\u00f3 no es pot desfer.')){ fn(); }
}

// \u2500\u2500 ORDENACI\u00d3 PER DATA (llistes admin: m\u00e9s recent primer) \u2500\u2500
var ADM_MESOS={gen:0,gener:0,feb:1,febrer:1,mar:2,marc:2,'mar\u00e7':2,abr:3,abril:3,
  mai:4,maig:4,jun:5,juny:5,jul:6,juliol:6,ago:7,agost:7,
  set:8,setembre:8,oct:9,octubre:9,nov:10,novembre:10,des:11,desembre:11};
// Extreu una data aproximada d'un text lliure ("14-15 juny 2026", "24 mai 2026"\u2026)
function admDateKey(str){
  if(!str) return -Infinity;
  var s=String(str).toLowerCase();
  var yearM=s.match(/(19|20)\d{2}/);
  if(!yearM) return -Infinity;
  var year=parseInt(yearM[0],10);
  var monthIdx=0;
  for(var key in ADM_MESOS){
    if(s.indexOf(key)!==-1){ monthIdx=ADM_MESOS[key]; break; }
  }
  var dayM=s.match(/\b(\d{1,2})\b/);
  var day=dayM?parseInt(dayM[1],10):1;
  if(day<1||day>31) day=1;
  return new Date(year,monthIdx,day).getTime();
}
// Data en format ISO (YYYY-MM-DD, p.ex. valor d'un <input type=date>)
function admIsoKey(str){
  if(!str) return -Infinity;
  var t=new Date(str).getTime();
  return isNaN(t)?-Infinity:t;
}
// Data en format DD/MM/AAAA
function admDmyKey(str){
  if(!str) return -Infinity;
  var p=String(str).split('/');
  if(p.length!==3) return admDateKey(str);
  var d=parseInt(p[0],10),m=parseInt(p[1],10)-1,y=parseInt(p[2],10);
  if(isNaN(d)||isNaN(m)||isNaN(y)) return -Infinity;
  return new Date(y,m,d).getTime();
}
// Retorna una c\u00f2pia de l'array ordenada de m\u00e9s recent a m\u00e9s antic segons keyFn
function admSortByDateDesc(arr,keyFn){
  return (arr||[]).slice().sort(function(a,b){ return keyFn(b)-keyFn(a); });
}

// ── TAB RENDERER ───────────────────────────────────────────
function renderATab(tab){
  if(!admSession){ return; }
  var b=document.getElementById('admBody');
  if(!b) return;
  if(tab==='circ')      renderAdmCirculars(b);
  else if(tab==='news')    renderAdmNews(b);
  else if(tab==='comp')    renderAdmComp(b);
  else if(tab==='form')    renderAdmForm(b);
  else if(tab==='tirades') renderAdmTirades(b);
  else if(tab==='records') { b.innerHTML='<div class="adm-records-section"></div>'; renderAdmRecords(b.querySelector('.adm-records-section')); }
  else if(tab==='lligues') renderAdmLligues(b);
  else if(tab==='docs')    renderAdmDocs(b);
  else if(tab==='gen')     renderAdmGenerator(b);
  else if(tab==='backup')  renderAdmBackup(b);
  else if(tab==='usuaris') renderAdmUsuaris(b);
}

// ── CIRCULARS CRUD ─────────────────────────────────────────
function renderAdmCirculars(b){
  var MONS=['GEN','FEB','MAR','ABR','MAI','JUN','JUL','AGO','SET','OCT','NOV','DES'];
  var tipos=[
    {val:'fed',lbl:'Federaci\u00f3'},{val:'al',lbl:'Aire Lliure / Sala'},
    {val:'camp',lbl:'Camp'},{val:'3d',lbl:'3D / Bosc'},
    {val:'jut',lbl:'Jutges'},{val:'form',lbl:'Formaci\u00f3'},{val:'kyudo',lbl:'Kyudo'}
  ];
  b.innerHTML=
    '<div class="crud-form">'
    +'<div class="crud-form-title">&#10010; Afegir Nova Circular</div>'
    +mkField('T\u00edtol *','ac_t','text','','T\u00edtol complet de la circular')
    +'<div class="af-row">'
    +mkField('N\u00famero (CIRC-XXXX) *','ac_n','text','','CIRC-2630')
    +mkField('Classe *','ac_c','select','fed','',tipos)
    +'</div>'
    +'<div class="af-row">'
    +mkField('Data','ac_dt','date','','')
    +mkUploadField('PDF de la circular','ac_u','','pdf')
    +'</div>'
    +mkField('Data de publicaci\u00f3 (opcional)','ac_pub','date','','')
    +'<div style="font-size:.78rem;color:var(--gray);margin:-.6rem 0 .75rem">Deixa-ho buit per publicar-la de seguida. Si hi poses una data futura, la circular es mant\u00e9 oculta al p\u00fablic fins que arribi.</div>'
    +mkField('Descripci\u00f3 breu','ac_d','textarea','','Resum del contingut de la circular')
    +'<button class="a-sub success"'+dataAttr('onclick','crudAddCirc',[])+'>&#10010; Publicar Circular</button>'
    +'</div>'
    +'<div class="adm-st">Circulars publicades <span class="crud-count-badge">'+DB.circulars.length+'</span></div>'
    +'<div class="crud-list" id="circCrudList">'
    +admSortByDateDesc(DB.circulars,function(c){return admDateKey(c.day+' '+c.mon+' '+c.year);}).map(function(c,i){
      var scheduled = c.pubDate && !circIsPublished(c);
      return '<div class="crud-item" id="citem-'+c.id+'">'
        +'<div class="crud-item-info">'
        +'<div class="crud-item-title">'+escHtml(c.num)+' &mdash; '+escHtml(c.title)+'</div>'
        +'<div class="crud-item-meta"><span>'+c.day+' '+c.mon+' '+c.year+'</span><span>'+bLbl[c.type]+'</span>'
        +(c.url&&c.url!=='#'&&!c.url.includes('circulars/?')
          ?'<span style="color:#059669">&#10003; URL</span>'
          :'<span style="color:#dc2626">&#10005; Sense URL directa</span>')
        +(scheduled?'<span style="color:#b45309">&#128337; Programada: '+escHtml(genFmtDate(c.pubDate))+'</span>':'')
        +'</span></div>'
        +'</div>'
        +'<div class="crud-item-acts">'
        +'<button class="btn-edit-crud"'+dataAttr('onclick','crudEditCirc',[c.id])+'>&#9998; Editar</button>'
        +'<button class="btn-del-crud"'+dataAttr('onclick','crudDelCirc',[c.id,c.num])+'>&#128465;</button>'
        +'</div>'
        +'</div>';
    }).join('')
    +'</div>';
}
function crudAddCirc(){
  var t=fv('ac_t'),n=fv('ac_n'),c=fv('ac_c'),d=fv('ac_d'),u=fv('ac_u'),dt=fv('ac_dt'),pub=fv('ac_pub');
  if(!t||!n){toast('Omple el t\u00edtol i el n\u00famero','&#9888;&#65039;');return;}
  var MONS=['GEN','FEB','MAR','ABR','MAI','JUN','JUL','AGO','SET','OCT','NOV','DES'];
  var date=dt?new Date(dt):new Date();
  DB.circulars.unshift({id:Date.now(),type:c||'fed',num:n,title:t,desc:d,
    day:date.getDate(),mon:MONS[date.getMonth()],year:date.getFullYear(),url:u||'#',pubDate:pub||''});
  dbSave();
  admLog('CIRC_ADD', n+' – '+t);
  renderCirc('all');
  renderAdmCirculars(document.getElementById('admBody'));
  toast(pub&&pub>todayISO()?'Circular "'+n+'" programada per al '+genFmtDate(pub)+'!':'Circular "'+n+'" publicada!','&#9989;');
}
function crudEditCirc(id){
  var c=DB.circulars.find(function(x){return x.id===id;});
  if(!c) return;
  var item=document.getElementById('citem-'+id);
  if(!item) return;
  // Remove any existing edit form
  var existing=document.getElementById('cedit-'+id);
  if(existing){existing.remove();return;}
  item.classList.add('editing');
  var tipos=[
    {val:'fed',lbl:'Federaci\u00f3'},{val:'al',lbl:'Aire Lliure / Sala'},
    {val:'camp',lbl:'Camp'},{val:'3d',lbl:'3D / Bosc'},
    {val:'jut',lbl:'Jutges'},{val:'form',lbl:'Formaci\u00f3'},{val:'kyudo',lbl:'Kyudo'}
  ];
  var editDiv=document.createElement('div');
  editDiv.className='crud-edit-form'; editDiv.id='cedit-'+id;
  editDiv.innerHTML=
    '<div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:800;font-size:.9rem;color:var(--navy-dark);text-transform:uppercase;margin-bottom:.75rem">Editar Circular</div>'
    +mkField('T\u00edtol *','ec_t_'+id,'text',c.title,'')
    +'<div class="af-row">'
    +mkField('N\u00famero','ec_n_'+id,'text',c.num,'')
    +mkField('Classe','ec_c_'+id,'select',c.type,'',tipos)
    +'</div>'
    +'<div class="af-row">'
    +mkField('Dia','ec_day_'+id,'number',c.day,'')
    +mkField('Any','ec_yr_'+id,'number',c.year,'')
    +'</div>'
    +mkUploadField('PDF de la circular','ec_u_'+id,c.url&&c.url!=='#'?c.url:'','pdf')
    +mkField('Data de publicaci\u00f3 (opcional)','ec_pub_'+id,'date',c.pubDate||'','')
    +'<div style="font-size:.78rem;color:var(--gray);margin:-.6rem 0 .75rem">Deixa-ho buit per publicar-la de seguida.</div>'
    +mkField('Descripci\u00f3','ec_d_'+id,'textarea',c.desc,'')
    +'<div style="display:flex;gap:.5rem;margin-top:.5rem">'
    +'<button class="a-sub success"'+dataAttr('onclick','crudSaveCirc',[id])+'>&#10003; Desar</button>'
    +'<button class="a-sub" style="background:#64748b"'+dataAttr('onclick','crudCancelCirc',[id])+'>Cancel\u00b7lar</button>'
    +'</div>';
  item.appendChild(editDiv);
}
function crudSaveCirc(id){
  var c=DB.circulars.find(function(x){return x.id===id;});
  if(!c) return;
  var t=fv('ec_t_'+id);
  if(!t){toast('El t\u00edtol no pot estar buit','&#9888;&#65039;');return;}
  c.title=t;
  c.num=fv('ec_n_'+id)||c.num;
  c.type=fv('ec_c_'+id)||c.type;
  c.desc=fv('ec_d_'+id);
  var u=fv('ec_u_'+id); c.url=u||'#';
  var day=parseInt(fv('ec_day_'+id)); if(!isNaN(day)&&day>0&&day<=31) c.day=day;
  var yr=parseInt(fv('ec_yr_'+id)); if(!isNaN(yr)&&yr>2000) c.year=yr;
  c.pubDate=fv('ec_pub_'+id)||'';
  dbSave();
  renderCirc('all');
  renderAdmCirculars(document.getElementById('admBody'));
  toast('Circular "'+c.num+'" desada!','&#9989;');
}
function crudCancelCirc(id){
  var item=document.getElementById('citem-'+id);
  var form=document.getElementById('cedit-'+id);
  if(item) item.classList.remove('editing');
  if(form) form.remove();
}
function crudDelCirc(id,name){
  confirmDel(name,function(){
    DB.circulars=DB.circulars.filter(function(x){return x.id!==id;});
    dbSave();
    admLog('CIRC_DEL', name);
    renderCirc('all');
    renderAdmCirculars(document.getElementById('admBody'));
    toast('Circular eliminada.','&#128465;');
  });
}

// ── NOTICIES CRUD ──────────────────────────────────────────
function renderAdmNews(b){
  b.innerHTML=
    '<div class="crud-form">'
    +'<div class="crud-form-title">&#10010; Afegir Nova Not\u00edcia</div>'
    +mkField('T\u00edtol *','an_t','text','','T\u00edtol de la not\u00edcia')
    +'<div class="af-row">'
    +mkField('Classe','an_c','select','Aire Lliure','',
      ['Aire Lliure','Camp','3D','Sala','Arc Adaptat','Kyudo','Universitari','Institucional'].map(function(v){return{val:v,lbl:v};}))
    +mkField('Data','an_dt','date','','')
    +'</div>'
    +mkField('Resum *','an_d','textarea','','Primer par\u00e0graf de la not\u00edcia')
    +'<div class="af-row">'
    +mkUploadField('Imatge de la not\u00edcia','an_img','','image')
    +mkField('URL Not\u00edcia completa','an_url','url','','https://...')
    +'</div>'
    +'<button class="a-sub success"'+dataAttr('onclick','crudAddNews',[])+'>&#10010; Publicar Not\u00edcia</button>'
    +'</div>'
    +'<div class="adm-st">Not\u00edcies <span class="crud-count-badge">'+DB.news.length+'</span></div>'
    +'<div class="crud-list" id="newsCrudList">'
    +admSortByDateDesc(DB.news,function(n){return admDateKey(n.date);}).map(function(n){
      return '<div class="crud-item" id="nitem-'+n.id+'">'
        +'<div class="crud-item-info">'
        +'<div class="crud-item-title">'+escHtml(n.title)+'</div>'
        +'<div class="crud-item-meta"><span>'+escHtml(n.date)+'</span><span>'+escHtml(n.cat)+'</span></div>'
        +'</div>'
        +'<div class="crud-item-acts">'
        +'<button class="btn-edit-crud"'+dataAttr('onclick','crudEditNews',[n.id])+'>&#9998; Editar</button>'
        +'<button class="btn-del-crud"'+dataAttr('onclick','crudDelNews',[n.id,n.title.substring(0,30)+'...'])+'>&#128465;</button>'
        +'</div>'
        +'</div>';
    }).join('')
    +'</div>';
}
function crudAddNews(){
  var t=fv('an_t'),d=fv('an_d'),c=fv('an_c'),dt=fv('an_dt'),img=fv('an_img'),url=fv('an_url');
  if(!t||!d){toast('Omple el t\u00edtol i el resum','&#9888;&#65039;');return;}
  var M=['gen','feb','mar','abr','mai','jun','jul','ago','set','oct','nov','des'];
  var now=dt?new Date(dt):new Date();
  var dateStr=now.getDate()+' '+M[now.getMonth()]+' '+now.getFullYear();
  DB.news.unshift({id:Date.now(),cat:c||'General',title:t,date:dateStr,desc:d,img:img,url:url||'#'});
  dbSave();
  admLog('NEWS_ADD', t);
  renderNews();
  renderAdmNews(document.getElementById('admBody'));
  toast('Not\u00edcia publicada!','&#9989;');
}
function crudEditNews(id){
  var n=DB.news.find(function(x){return x.id===id;});
  if(!n) return;
  var item=document.getElementById('nitem-'+id);
  if(!item) return;
  var existing=document.getElementById('nedit-'+id);
  if(existing){existing.remove();item.classList.remove('editing');return;}
  item.classList.add('editing');
  var editDiv=document.createElement('div');
  editDiv.className='crud-edit-form'; editDiv.id='nedit-'+id;
  editDiv.innerHTML=
    mkField('T\u00edtol *','en_t_'+id,'text',n.title,'')
    +'<div class="af-row">'
    +mkField('Classe','en_c_'+id,'select',n.cat,'',
      ['Aire Lliure','Camp','3D','Sala','Arc Adaptat','Kyudo','Universitari','Institucional'].map(function(v){return{val:v,lbl:v};}))
    +mkField('Data','en_dt_'+id,'text',n.date,'Ex: 24 mai 2026')
    +'</div>'
    +mkField('Resum','en_d_'+id,'textarea',n.desc,'')
    +'<div class="af-row">'
    +mkUploadField('Imatge de la not\u00edcia','en_img_'+id,n.img||'','image')
    +mkField('URL Not\u00edcia','en_url_'+id,'url',n.url&&n.url!=='#'?n.url:'','https://...')
    +'</div>'
    +'<div style="display:flex;gap:.5rem;margin-top:.5rem">'
    +'<button class="a-sub success"'+dataAttr('onclick','crudSaveNews',[id])+'>&#10003; Desar</button>'
    +'<button class="a-sub" style="background:#64748b"'+dataAttr('onclick','crudCancelNews',[id])+'>Cancel\u00b7lar</button>'
    +'</div>';
  item.appendChild(editDiv);
}
function crudSaveNews(id){
  var n=DB.news.find(function(x){return x.id===id;});
  if(!n) return;
  var t=fv('en_t_'+id); if(!t){toast('El t\u00edtol no pot estar buit','&#9888;&#65039;');return;}
  n.title=t; n.cat=fv('en_c_'+id)||n.cat; n.date=fv('en_dt_'+id)||n.date;
  n.desc=fv('en_d_'+id); n.img=fv('en_img_'+id);
  var u=fv('en_url_'+id); n.url=u||'#';
  if(NEWS_CONTENT[id]){ NEWS_CONTENT[id].title=t; NEWS_CONTENT[id].date=n.date; NEWS_CONTENT[id].cat=n.cat; }
  dbSave();
  renderNews();
  renderAdmNews(document.getElementById('admBody'));
  toast('Not\u00edcia desada!','&#9989;');
}
function crudCancelNews(id){
  var item=document.getElementById('nitem-'+id);
  var form=document.getElementById('nedit-'+id);
  if(item) item.classList.remove('editing');
  if(form) form.remove();
}
function crudDelNews(id,name){
  confirmDel(name,function(){
    DB.news=DB.news.filter(function(x){return x.id!==id;});
    delete NEWS_CONTENT[id];
    dbSave();
    admLog('NEWS_DEL', name);
    renderNews();
    renderAdmNews(document.getElementById('admBody'));
    toast('Not\u00edcia eliminada.','&#128465;');
  });
}

// ── COMPETICIONS CRUD ──────────────────────────────────────
// La competici\u00f3 \u00e9s el centre de tot: en lloc de repetir el n\u00famero de
// circular a m\u00e0 (amb risc d'errors de picada), es tria d'una llista
// real de circulars existents.
function _compCircOptions(){
  var opts=[{val:'',lbl:'\u2014 Cap \u2014'}];
  admSortByDateDesc(DB.circulars,function(c){return admDateKey(c.day+' '+c.mon+' '+c.year);}).forEach(function(c){
    var t=c.title&&c.title.length>40?c.title.substring(0,40)+'\u2026':(c.title||'');
    opts.push({val:c.num, lbl:c.num+' \u2014 '+t});
  });
  return opts;
}
function renderAdmComp(b){
  var tipusOpts=[{val:'al',lbl:'Aire Lliure'},{val:'sala',lbl:'Sala'},{val:'camp',lbl:'Camp'},{val:'trd',lbl:'3D/Bosc'}];
  var estatOpts=[{val:'open',lbl:'Inscripcions obertes'},{val:'soon',lbl:'Pr\u00f2ximament'},{val:'closed',lbl:'Tancat'}];
  b.innerHTML=
    '<div class="crud-form">'
    +'<div class="crud-form-title">&#10010; Afegir Nova Competici\u00f3</div>'
    +mkField('Nom de la competici\u00f3 *','acomp_t','text','','Nom oficial')
    +'<div class="af-row">'
    +mkField('Disciplina','acomp_tp','select','al','',tipusOpts)
    +mkField('Estat','acomp_st','select','soon','',estatOpts)
    +'</div>'
    +'<div class="af-row">'
    +mkField('Dates','acomp_dt','text','','Ex: 14-15 juny 2026')
    +mkField('Seu','acomp_loc','text','','Localitat')
    +'</div>'
    +'<div class="af-row">'
    +mkField('Circular vinculada','acomp_circ','select','','',_compCircOptions())
    +mkField('ID Ianseo','acomp_ianseo','text','','28416')
    +'</div>'
    +'<div class="af-row">'
    +mkField('URL inscripcions','acomp_insc','url','','https://...')
    +mkField('URL m\u00e9s info / resultats','acomp_url','url','','https://...')
    +'</div>'
    +mkField('Disciplina (text lliure)','acomp_disc','text','','Ex: Aire Lliure, Tir de Camp...')
    +'<button class="a-sub success"'+dataAttr('onclick','crudAddComp',[])+'>&#10010; Publicar Competici\u00f3</button>'
    +'</div>'
    +'<div class="adm-st" style="display:flex;align-items:center;justify-content:space-between;gap:.75rem;flex-wrap:wrap">'
    +'<span>Competicions <span class="crud-count-badge">'+DB.competitions.length+'</span></span>'
    +'<button class="bsm bsm-n" style="font-size:.78rem;padding:.35rem .8rem"'+dataAttr('onclick','admExportCompCSV',[])+'>&#11015;&#65039; Exporta CSV</button>'
    +'</div>'
    +'<div class="crud-list">'
    +admSortByDateDesc(DB.competitions,function(c){return c.dateISO?admIsoKey(c.dateISO):admDateKey(c.date);}).map(function(c){
      var sL={open:'Obertes',soon:'Pr\u00f2ximament',closed:'Tancat'};
      return '<div class="crud-item" id="compitem-'+c.id+'">'
        +'<div class="crud-item-info">'
        +'<div class="crud-item-title">'+escHtml(c.title)+'</div>'
        +'<div class="crud-item-meta"><span>'+escHtml(c.date)+'</span><span>'+escHtml(c.loc)+'</span><span>'+sL[c.status]+'</span>'
        +(c.circ&&c.circ!=='#'?'<span style="color:#059669">&#128203; '+escHtml(c.circ)+'</span>':'')
        +(c.ianseo?'<span style="color:#059669">&#128200; Ianseo</span>':'')
        +(c.inscripcio&&c.inscripcio!=='#'?'<span style="color:#059669">&#128221; Inscripcions</span>':'')
        +'</div>'
        +'</div>'
        +'<div class="crud-item-acts">'
        +'<button class="btn-edit-crud"'+dataAttr('onclick','crudEditComp',[c.id])+'>&#9998;</button>'
        +'<button class="btn-del-crud"'+dataAttr('onclick','crudDelComp',[c.id,c.title.substring(0,25)+'...'])+'>&#128465;</button>'
        +'</div>'
        +'</div>';
    }).join('')
    +'</div>';
}
function crudAddComp(){
  var t=fv('acomp_t'); if(!t){toast('Omple el nom','&#9888;&#65039;');return;}
  DB.competitions.unshift({id:Date.now(),type:fv('acomp_tp')||'al',
    title:t,disc:fv('acomp_disc')||fv('acomp_tp'),
    date:fv('acomp_dt'),loc:fv('acomp_loc'),
    status:fv('acomp_st')||'soon',
    circ:fv('acomp_circ'),url:fv('acomp_url')||'#',
    inscripcio:fv('acomp_insc')||'', ianseo:fv('acomp_ianseo')||''});
  dbSave();
  admLog('COMP_ADD', t);
  renderComp('all');
  renderAdmComp(document.getElementById('admBody'));
  toast('Competici\u00f3 publicada!','&#9989;');
}
function crudEditComp(id){
  var c=DB.competitions.find(function(x){return x.id===id;});
  if(!c) return;
  var item=document.getElementById('compitem-'+id);
  if(!item) return;
  var existing=document.getElementById('compedit-'+id);
  if(existing){existing.remove();item.classList.remove('editing');return;}
  item.classList.add('editing');
  var estatOpts=[{val:'open',lbl:'Inscripcions obertes'},{val:'soon',lbl:'Pr\u00f2ximament'},{val:'closed',lbl:'Tancat'}];
  var tipusOpts=[{val:'al',lbl:'Aire Lliure'},{val:'sala',lbl:'Sala'},{val:'camp',lbl:'Camp'},{val:'trd',lbl:'3D/Bosc'}];
  var editDiv=document.createElement('div');
  editDiv.className='crud-edit-form'; editDiv.id='compedit-'+id;
  editDiv.innerHTML=
    mkField('Nom *','ec_comp_t_'+id,'text',c.title,'')
    +'<div class="af-row">'
    +mkField('Estat','ec_comp_st_'+id,'select',c.status,'',estatOpts)
    +mkField('Tipus','ec_comp_tp_'+id,'select',c.type,'',tipusOpts)
    +'</div>'
    +'<div class="af-row">'
    +mkField('Dates','ec_comp_dt_'+id,'text',c.date,'')
    +mkField('Seu','ec_comp_loc_'+id,'text',c.loc,'')
    +'</div>'
    +'<div class="af-row">'
    +mkField('Circular vinculada','ec_comp_circ_'+id,'select',c.circ,'',_compCircOptions())
    +mkField('ID Ianseo','ec_comp_ianseo_'+id,'text',c.ianseo||'','28416')
    +'</div>'
    +'<div class="af-row">'
    +mkField('URL inscripcions','ec_comp_insc_'+id,'url',c.inscripcio&&c.inscripcio!=='#'?c.inscripcio:'','https://...')
    +mkField('URL més info / resultats','ec_comp_url_'+id,'url',c.url&&c.url!=='#'?c.url:'','')
    +'</div>'
    +'<div style="display:flex;gap:.5rem;margin-top:.5rem">'
    +'<button class="a-sub success"'+dataAttr('onclick','crudSaveComp',[id])+'>&#10003; Desar</button>'
    +'<button class="a-sub" style="background:#64748b"'+dataAttr('onclick','crudCancelComp',[id])+'>Cancel\u00b7lar</button>'
    +'</div>';
  item.appendChild(editDiv);
}
function crudCancelComp(id){
  var e=document.getElementById('compedit-'+id); if(e) e.remove();
  var it=document.getElementById('compitem-'+id); if(it) it.classList.remove('editing');
}
function crudSaveComp(id){
  var c=DB.competitions.find(function(x){return x.id===id;});
  if(!c) return;
  var t=fv('ec_comp_t_'+id); if(!t){toast('El nom no pot estar buit','&#9888;&#65039;');return;}
  c.title=t; c.status=fv('ec_comp_st_'+id)||c.status;
  c.type=fv('ec_comp_tp_'+id)||c.type;
  c.date=fv('ec_comp_dt_'+id)||c.date;
  c.loc=fv('ec_comp_loc_'+id)||c.loc;
  c.circ=fv('ec_comp_circ_'+id); c.url=fv('ec_comp_url_'+id)||'#';
  c.inscripcio=fv('ec_comp_insc_'+id)||'';
  c.ianseo=fv('ec_comp_ianseo_'+id)||'';
  dbSave();
  renderComp('all');
  renderAdmComp(document.getElementById('admBody'));
  toast('Competici\u00f3 desada!','&#9989;');
}
function crudDelComp(id,name){
  confirmDel(name,function(){
    DB.competitions=DB.competitions.filter(function(x){return x.id!==id;});
    dbSave();
    admLog('COMP_DEL', name);
    renderComp('all');
    renderAdmComp(document.getElementById('admBody'));
    toast('Competici\u00f3 eliminada.','&#128465;');
  });
}

// \u2500\u2500 EXPORTACI\u00d3 CSV \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Escapa un valor per a un camp CSV (RFC 4180): entre cometes si cont\u00e9
// comes, cometes o salts de l\u00ednia; les cometes internes es dupliquen.
function _csvEsc(v){
  var s=String(v===undefined||v===null?'':v);
  if(/["\n\r,]/.test(s)) s='"'+s.replace(/"/g,'""')+'"';
  return s;
}
function admExportCompCSV(){
  var tipusLbl={al:'Aire Lliure',sala:'Sala',camp:'Camp',trd:'3D/Bosc'};
  var estatLbl={open:'Inscripcions obertes',soon:'Pr\u00f2ximament',closed:'Tancat'};
  var cols=['T\u00edtol','Disciplina','Estat','Data','Data ISO','Seu','Circular','ID Ianseo','URL inscripcions','URL m\u00e9s info / resultats'];
  var rows=admSortByDateDesc(DB.competitions,function(c){return c.dateISO?admIsoKey(c.dateISO):admDateKey(c.date);}).map(function(c){
    return [
      c.title||'', tipusLbl[c.type]||c.disc||c.type||'', estatLbl[c.status]||c.status||'',
      c.date||'', c.dateISO||'', c.loc||'', (c.circ&&c.circ!=='#')?c.circ:'',
      c.ianseo||'', (c.inscripcio&&c.inscripcio!=='#')?c.inscripcio:'', (c.url&&c.url!=='#')?c.url:''
    ].map(_csvEsc).join(',');
  });
  // BOM UTF-8 perqu\u00e8 l'Excel obri correctament els accents
  var csv='\ufeff'+cols.map(_csvEsc).join(',')+'\r\n'+rows.join('\r\n');
  var blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=url;
  a.download='competicions-fcta-'+todayISO()+'.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  admLog('COMP_EXPORT_CSV', DB.competitions.length+' competicions');
  toast('CSV de competicions descarregat ('+DB.competitions.length+' files).','&#128190;');
}

// ── FORMACIÓ CRUD ──────────────────────────────────────────
function renderAdmForm(b){
  b.innerHTML=
    '<div class="crud-form">'
    +'<div class="crud-form-title">&#10010; Afegir Curs / Seminari</div>'
    +mkField('T\u00edtol *','af_t','text','','Nom del curs o seminari')
    +'<div class="af-row">'
    +mkField('Nivell','af_lv','select','General','',
      ['T\u00e8cnics','General','Clubs'].map(function(v){return{val:v,lbl:v};}))
    +mkField('Places','af_pl','text','','Ex: 25 places')
    +'</div>'
    +'<div class="af-row">'
    +mkField('Dates','af_dt','text','','Ex: Setembre 2026')
    +mkField('Icona (emoji)','af_ic','text','\ud83c\udf93','')
    +'</div>'
    +mkField('Descripci\u00f3 *','af_d','textarea','','Continguts, objectius i requisits')
    +'<button class="a-sub success"'+dataAttr('onclick','crudAddForm',[])+'>&#10010; Publicar Curs</button>'
    +'</div>'
    +'<div class="adm-st">Cursos <span class="crud-count-badge">'+DB.formations.length+'</span></div>'
    +'<div class="crud-list">'
    +admSortByDateDesc(DB.formations,function(f){return admDateKey(f.dates);}).map(function(f){
      return '<div class="crud-item" id="fitem-'+f.id+'">'
        +'<div class="crud-item-info">'
        +'<div class="crud-item-title">'+escHtml(f.icon)+' '+escHtml(f.title)+'</div>'
        +'<div class="crud-item-meta"><span>'+escHtml(f.dates)+'</span><span>'+escHtml(f.level)+'</span><span>'+escHtml(f.places)+'</span></div>'
        +'</div>'
        +'<div class="crud-item-acts">'
        +'<button class="btn-edit-crud"'+dataAttr('onclick','crudEditForm',[f.id])+'>&#9998;</button>'
        +'<button class="btn-del-crud"'+dataAttr('onclick','crudDelForm',[f.id,f.title.substring(0,25)+'...'])+'>&#128465;</button>'
        +'</div>'
        +'</div>';
    }).join('')
    +'</div>';
}
function crudAddForm(){
  var t=fv('af_t'),d=fv('af_d'); if(!t||!d){toast('Omple t\u00edtol i descripci\u00f3','&#9888;&#65039;');return;}
  DB.formations.unshift({id:Date.now(),icon:fv('af_ic')||'\ud83c\udf93',
    title:t,level:fv('af_lv')||'General',
    desc:d,dates:fv('af_dt'),places:fv('af_pl'),circ:'',links:[]});
  dbSave();
  admLog('FORM_ADD', t);
  renderForm();
  renderAdmForm(document.getElementById('admBody'));
  toast('Curs publicat!','&#9989;');
}
function crudEditForm(id){
  var f=DB.formations.find(function(x){return x.id===id;});
  if(!f) return;
  var item=document.getElementById('fitem-'+id);
  if(!item) return;
  var existing=document.getElementById('fedit-'+id);
  if(existing){existing.remove();item.classList.remove('editing');return;}
  item.classList.add('editing');
  var editDiv=document.createElement('div');
  editDiv.className='crud-edit-form'; editDiv.id='fedit-'+id;
  editDiv.innerHTML=
    mkField('T\u00edtol *','ef_t_'+id,'text',f.title,'')
    +'<div class="af-row">'
    +mkField('Nivell','ef_lv_'+id,'select',f.level,'',
      ['T\u00e8cnics','General','Clubs'].map(function(v){return{val:v,lbl:v};}))
    +mkField('Icona','ef_ic_'+id,'text',f.icon,'')
    +'</div>'
    +'<div class="af-row">'
    +mkField('Dates','ef_dt_'+id,'text',f.dates,'')
    +mkField('Places','ef_pl_'+id,'text',f.places,'')
    +'</div>'
    +mkField('Descripci\u00f3','ef_d_'+id,'textarea',f.desc,'')
    +'<div style="display:flex;gap:.5rem;margin-top:.5rem">'
    +'<button class="a-sub success"'+dataAttr('onclick','crudSaveForm',[id])+'>&#10003; Desar</button>'
    +'<button class="a-sub" style="background:#64748b"'+dataAttr('onclick','crudCancelForm',[id])+'>Cancel\u00b7lar</button>'
    +'</div>';
  item.appendChild(editDiv);
}
function crudCancelForm(id){
  var e=document.getElementById('fedit-'+id); if(e) e.remove();
  var it=document.getElementById('fitem-'+id); if(it) it.classList.remove('editing');
}
function crudSaveForm(id){
  var f=DB.formations.find(function(x){return x.id===id;});
  if(!f) return;
  var t=fv('ef_t_'+id); if(!t){toast('El t\u00edtol no pot estar buit','&#9888;&#65039;');return;}
  f.title=t; f.level=fv('ef_lv_'+id)||f.level; f.icon=fv('ef_ic_'+id)||f.icon;
  f.dates=fv('ef_dt_'+id); f.places=fv('ef_pl_'+id); f.desc=fv('ef_d_'+id);
  dbSave();
  renderForm();
  renderAdmForm(document.getElementById('admBody'));
  toast('Curs desat!','&#9989;');
}
function crudDelForm(id,name){
  confirmDel(name,function(){
    DB.formations=DB.formations.filter(function(x){return x.id!==id;});
    dbSave();
    admLog('FORM_DEL', name);
    renderForm();
    renderAdmForm(document.getElementById('admBody'));
    toast('Curs eliminat.','&#128465;');
  });
}

// ── TIRADES ADMIN ──────────────────────────────────────────
function renderAdmTirades(b){
  var pend=admSortByDateDesc((DB.tirades||[]).filter(function(t){return t.status==='pend';}),function(t){return admIsoKey(t.data);});
  var valides=admSortByDateDesc((DB.tirades||[]).filter(function(t){return t.status==='valid';}),function(t){return admIsoKey(t.data);});
  var tLbl=function(t){return(tipusLabels&&tipusLabels[t.tipus])?tipusLabels[t.tipus].lbl:t.tipus;};
  b.innerHTML=
    '<div class="adm-st">Tirades pendents <span class="crud-count-badge">'+pend.length+'</span></div>'
    +(pend.length
      ?'<div class="crud-list">'
        +pend.map(function(t){
          return '<div class="crud-item">'
            +'<div class="crud-item-info">'
            +'<div class="crud-item-title">'+escHtml(t.nom)+'</div>'
            +'<div class="crud-item-meta"><span>'+escHtml(t.club)+'</span><span>'+tLbl(t)+'</span><span>'+escHtml(t.dataStr)+'</span></div>'
            +'</div>'
            +'<div class="crud-item-acts">'
            +'<button class="btn-ok-crud"'+dataAttr('onclick','approveT',[t.id])+'>&#10003; Publicar</button>'
            +'<button class="btn-rej-crud"'+dataAttr('onclick','rejectT',[t.id])+'>&#10007; Rebutjar</button>'
            +'</div>'
            +'</div>';
        }).join('')
        +'</div>'
      :'<p style="font-size:.85rem;color:var(--gray);padding:.5rem 0;margin-bottom:1rem">Cap tirada pendent. &#10003;</p>')
    +'<div class="adm-st" style="margin-top:1.25rem">Tirades publicades <span class="crud-count-badge">'+valides.length+'</span></div>'
    +(valides.length
      ?'<div class="crud-list">'
        +valides.map(function(t){
          return '<div class="crud-item">'
            +'<div class="crud-item-info">'
            +'<div class="crud-item-title">'+escHtml(t.nom)+' &mdash; '+escHtml(t.club)+'</div>'
            +'<div class="crud-item-meta"><span>'+tLbl(t)+'</span><span>'+escHtml(t.dataStr)+'</span></div>'
            +'</div>'
            +'<div class="crud-item-acts">'
            +'<button class="btn-del-crud"'+dataAttr('onclick','rejectT',[t.id])+' title="Eliminar">&#128465;</button>'
            +'</div>'
            +'</div>';
        }).join('')
        +'</div>'
      :'<p style="font-size:.85rem;color:var(--gray);padding:.5rem 0">Cap tirada publicada.</p>');
}
function updatePendDot(){
  var n=(DB.tirades||[]).filter(function(t){return t.status==='pend';}).length;
  var el=document.getElementById('pendDot'); if(el)el.textContent=n;
  var nr=(DB.recordsSolicituds||[]).filter(function(r){return r.status==='pend';}).length;
  var elr=document.getElementById('pendDotRecords'); if(elr)elr.textContent=nr;
}
function approveT(id){
  var t=(DB.tirades||[]).find(function(x){return x.id===id;});
  if(t){t.status='valid';dbSave();updatePendDot();renderTirades('all');renderAdmTirades(document.getElementById('admBody'));toast('Tirada "'+t.nom+'" publicada!','&#9989;');}
}
function rejectT(id){
  var t=(DB.tirades||[]).find(function(x){return x.id===id;});
  var nom=t?t.nom:'';
  DB.tirades=(DB.tirades||[]).filter(function(x){return x.id!==id;});
  dbSave();
  updatePendDot();renderTirades('all');renderAdmTirades(document.getElementById('admBody'));
  toast('Tirada'+(nom?' "'+nom+'"':'')+' eliminada.','&#128465;');
}

// ── DOCUMENTS CRUD ─────────────────────────────────────────
var _admDocDisc = 'all';

function renderAdmDocs(b){
  if(!DB.documents) DB.documents = [];
  var discOpts=[
    {val:'al',   lbl:'Aire Lliure / Sala'},
    {val:'3d',   lbl:'3D / Bosc'},
    {val:'camp', lbl:'Tir de Camp'},
    {val:'kyudo',lbl:'Kyudo'},
    {val:'general',lbl:'General (totes les disciplines)'},
  ];
  var discFilterOpts=[{val:'all',lbl:'Totes les disciplines'}].concat(discOpts);
  var iconOpts=[
    {val:'📘',lbl:'📘 Llibre de regles'},
    {val:'📋',lbl:'📋 Reglament'},
    {val:'📊',lbl:'📊 Rànquing / Resultats'},
    {val:'🏆',lbl:'🏆 Rècords'},
    {val:'📐',lbl:'📐 Tècnic / Distàncies'},
    {val:'📄',lbl:'📄 Document general'},
    {val:'🌐',lbl:'🌐 Enllaç extern'},
  ];

  // Filtre actiu
  var docs = _admDocDisc==='all' ? DB.documents : DB.documents.filter(function(d){return d.disc===_admDocDisc;});

  var filterBtns = discFilterOpts.map(function(o){
    var act = _admDocDisc===o.val ? 'act' : '';
    return '<button class="fb '+act+'"'+dataAttr('onclick','admDocFilter',[o.val,'@el'])+'>'+o.lbl+'</button>';
  }).join('');

  b.innerHTML=
    '<div class="crud-form">'
    +'<div class="crud-form-title">&#10010; Afegir Document</div>'
    +mkField('Nom del document *','adoc_nom','text','','Ex: Reglament de Competicions FCTA v1.7')
    +'<div class="af-row">'
    +mkField('Disciplina *','adoc_disc','select','al','',discOpts)
    +mkField('Icona','adoc_icon','select','📄','',iconOpts)
    +'</div>'
    +mkUploadField('PDF del document *','adoc_url','','pdf')
    +'<button class="a-sub success"'+dataAttr('onclick','crudAddDoc',[])+'>&#10010; Publicar Document</button>'
    +'</div>'
    +'<div class="adm-st" style="display:flex;align-items:center;gap:.75rem">'
    +'Documents <span class="crud-count-badge">'+DB.documents.length+'</span>'
    +'<div class="filter-bar" style="margin:0;padding:0;border:none;background:none;flex:1">'+filterBtns+'</div>'
    +'</div>'
    +'<div class="crud-list" id="docCrudList">'
    +_renderDocList(docs)
    +'</div>';
}

function _renderDocList(docs){
  var discLbl={al:'AL/Sala','3d':'3D/Bosc',camp:'Camp',kyudo:'Kyudo',general:'General'};
  if(!docs.length) return '<p style="font-size:.85rem;color:var(--gray);padding:.5rem 0">Cap document per a aquest filtre.</p>';
  return docs.map(function(doc){
    return '<div class="crud-item" id="docitem-'+doc.id+'">'
      +'<div class="crud-item-info">'
      +'<div class="crud-item-title">'+escHtml(doc.icon||'📄')+' '+escHtml(doc.nom)+'</div>'
      +'<div class="crud-item-meta">'
      +'<span class="cbadge cb-'+(doc.disc||'general')+'">'+(discLbl[doc.disc]||doc.disc)+'</span>'
      +(doc.url&&doc.url!=='#'
        ?'<span style="color:#059669">&#10003; URL disponible</span>'
        :'<span style="color:#dc2626">&#10005; Sense URL</span>')
      +'</div>'
      +'</div>'
      +'<div class="crud-item-acts">'
      +(doc.url&&doc.url!=='#'?'<a class="btn-edit-crud" href="'+escHtml(doc.url)+'" target="_blank" style="text-decoration:none">&#128065; Veure</a>':'')
      +'<button class="btn-edit-crud"'+dataAttr('onclick','crudEditDoc',[doc.id])+'>&#9998; Editar</button>'
      +'<button class="btn-del-crud"'+dataAttr('onclick','crudDelDoc',[doc.id,doc.nom.substring(0,30)+'...'])+'>&#128465;</button>'
      +'</div>'
      +'</div>';
  }).join('');
}

function admDocFilter(disc, btn){
  _admDocDisc = disc;
  document.querySelectorAll('#admBody .fb').forEach(function(b){b.classList.remove('act');});
  if(btn) btn.classList.add('act');
  var docs = disc==='all' ? DB.documents : DB.documents.filter(function(d){return d.disc===disc;});
  var list = document.getElementById('docCrudList');
  if(list) list.innerHTML = _renderDocList(docs);
}

function crudAddDoc(){
  var nom = fv('adoc_nom'), url = fv('adoc_url'), disc = fv('adoc_disc'), icon = fv('adoc_icon');
  if(!nom||!url){toast('Omple el nom i la URL del document','&#9888;&#65039;');return;}
  DB.documents.unshift({id:Date.now(), disc:disc||'al', nom:nom, url:url, icon:icon||'📄'});
  dbSave();
  admLog('DOC_ADD', nom);
  // Refresca la vista de docs de la disciplina activa si coincideix
  if(typeof _discActiva!=='undefined' && _discActiva) renderDiscTab('docs');
  renderAdmDocs(document.getElementById('admBody'));
  toast('Document "'+nom+'" publicat!','&#9989;');
}

function crudEditDoc(id){
  var doc = DB.documents.find(function(x){return x.id===id;});
  if(!doc) return;
  var item = document.getElementById('docitem-'+id);
  if(!item) return;
  var existing = document.getElementById('docedit-'+id);
  if(existing){existing.remove();item.classList.remove('editing');return;}
  item.classList.add('editing');
  var discOpts=[
    {val:'al',lbl:'Aire Lliure / Sala'},{val:'3d',lbl:'3D / Bosc'},
    {val:'camp',lbl:'Tir de Camp'},{val:'kyudo',lbl:'Kyudo'},
    {val:'general',lbl:'General'},
  ];
  var iconOpts=[
    {val:'📘',lbl:'📘 Llibre de regles'},{val:'📋',lbl:'📋 Reglament'},
    {val:'📊',lbl:'📊 Rànquing / Resultats'},{val:'🏆',lbl:'🏆 Rècords'},
    {val:'📐',lbl:'📐 Tècnic / Distàncies'},{val:'📄',lbl:'📄 Document general'},
    {val:'🌐',lbl:'🌐 Enllaç extern'},
  ];
  var editDiv = document.createElement('div');
  editDiv.className='crud-edit-form'; editDiv.id='docedit-'+id;
  editDiv.innerHTML=
    mkField('Nom *','edoc_nom_'+id,'text',doc.nom,'')
    +'<div class="af-row">'
    +mkField('Disciplina','edoc_disc_'+id,'select',doc.disc,'',discOpts)
    +mkField('Icona','edoc_icon_'+id,'select',doc.icon||'📄','',iconOpts)
    +'</div>'
    +mkUploadField('PDF del document','edoc_url_'+id,doc.url&&doc.url!=='#'?doc.url:'','pdf')
    +'<div style="display:flex;gap:.5rem;margin-top:.5rem">'
    +'<button class="a-sub success"'+dataAttr('onclick','crudSaveDoc',[id])+'>&#10003; Desar</button>'
    +'<button class="a-sub" style="background:#64748b"'+dataAttr('onclick','crudCancelDoc',[id])+'>Cancel·lar</button>'
    +'</div>';
  item.appendChild(editDiv);
}

function crudSaveDoc(id){
  var doc = DB.documents.find(function(x){return x.id===id;});
  if(!doc) return;
  var nom = fv('edoc_nom_'+id);
  if(!nom){toast('El nom no pot estar buit','&#9888;&#65039;');return;}
  doc.nom  = nom;
  doc.disc = fv('edoc_disc_'+id) || doc.disc;
  doc.icon = fv('edoc_icon_'+id) || doc.icon;
  var u = fv('edoc_url_'+id); doc.url = u || '#';
  dbSave();
  if(typeof _discActiva!=='undefined' && _discActiva) renderDiscTab('docs');
  renderAdmDocs(document.getElementById('admBody'));
  toast('Document desat!','&#9989;');
}

function crudCancelDoc(id){
  var item = document.getElementById('docitem-'+id);
  var form = document.getElementById('docedit-'+id);
  if(item) item.classList.remove('editing');
  if(form) form.remove();
}

function crudDelDoc(id, name){
  confirmDel(name, function(){
    DB.documents = DB.documents.filter(function(x){return x.id!==id;});
    dbSave();
    admLog('DOC_DEL', String(id));
    if(typeof _discActiva!=='undefined' && _discActiva) renderDiscTab('docs');
    renderAdmDocs(document.getElementById('admBody'));
    toast('Document eliminat.','&#128465;');
  });
}

// ── GENERADOR DE CIRCULARS ─────────────────────────────────
function genNextCircNum(){
  var nums=DB.circulars.map(function(c){
    var m=c.num&&c.num.match(/CIRC-(\d+)/);
    return m?parseInt(m[1]):0;
  });
  var max=nums.length?Math.max.apply(null,nums):2620;
  return 'CIRC-'+(max+1);
}

// ── Textos i valors per defecte del generador, per disciplina ──────
// Basats en les darreres circulars de "Format de Competicions" publicades
// per a cada lliga (CIRC-2633 Aire Lliure, CIRC-2634 Sala, CIRC-2635 3D,
// CIRC-2636 Camp, totes de juny 2026) i en el 76è Campionat de Catalunya
// d'Aire Lliure (CIRC-2637), que confirma que inscripció i pagament es
// fan conjuntament a través de la plataforma d'inscripcions — sense
// transferència bancària per separat.
var GEN_DISC_DEFAULTS = {

  al: {
    participants: 'Esportistes federats/ades a la FCTA amb llicència en vigor per a la temporada en curs, de totes les divisions (Recorbat, Compost, Nu, Tradicional, Longbow). Els menors d\'edat han de comptar amb l\'autorització del pare/mare o tutor legal.',
    places: 'Sense límit de places (subjecte a la capacitat de la instal·lació).',
    edatMin: 'Totes les categories, des de Prebenjamí fins a Sènior/+50',
    format: 'Competició individual. Fase classificatòria: doble round (72 fletxes: 36+36) a la distància de cada categoria, en tandes de 6 fletxes amb un temps màxim de 180 segons (30 s/fletxa). Fase eliminatòria individual (semifinals i final) pels 4 millors classificats de cada categoria, sempre que hi hagi més de 3 inscrits/es.\nEs podrà disputar també competició per equips (3 esportistes de les categories Sènior/+50 per club i divisió).',
    rondes: 'Doble round: 72 fletxes (36+36) a la distància de la categoria',
    fletxes: '6 fletxes per tanda · 180 s per tanda (30 s/fletxa) en classificatòria',
    dist: 'RC: 70 m (Sèn./Sub-21) · 60 m (Sub-18/Sub-15) · 40 m (Sub-12) | CO: 50 m (Sèn./Sub-21/Sub-18) · 40 m (Sub-15) | NU/LB/TR: 60 m (Sèn./Sub-21) · 50 m (Sub-18) · 40 m (Sub-15)',
    diana: '122 cm (RC) · 80 cm retallada (CO) · 80 cm (NU/LB/TR) · 60 cm (categories menors)',
    elim: 'Fase eliminatòria (semifinals i final): dos esportistes per diana i tir simultani. Sistema de sets WA per a totes les divisions excepte Compost, que juga per puntuació acumulada (5 tandes de 3 fletxes, 90 s per tanda).',
    lliga: 'Prova puntuable per a la Lliga Catalana d\'Aire Lliure. La classificació final de la lliga es determina pel còmput de totes les tirades disputades, sense descartar-ne cap puntuació. Cada competició adquireix oficialitat amb la publicació de la circular corresponent.',
    desempat: 'RC: en cas d\'empat en sets, tirada de desempat a la diana X; la fletxa més propera al centre guanya. Resta de divisions: major puntuació als 10, 9, 8… fletxes finals, successivament.',
    resultats: 'Gestió i resultats en directe a través de la plataforma Ianseo. Resultats oficials publicats a la web de la FCTA.',
    horari: [['08:30','Recepció d\'arquers i verificació de material'],['09:00','Escalfament oficial'],['09:30','Inici de la competició – 1ª ronda'],['11:30','Inici de la competició – 2ª ronda'],['13:30','Pausa dinar'],['14:30','Eliminatòries'],['17:00','Finals i lliurament de premis']],
    classes: [['Recorbat (RC)','15'],['Compost (CO)','15'],['Tradicional (TR)','12'],['Nu (BB)','12'],['Longbow (LB)','12']],
    formDesc: 'La inscripció es realitza mitjançant el formulari en línia indicat, que inclou el pagament de la taxa d\'inscripció en el mateix procés. La plaça no queda confirmada fins a completar tot el procés d\'inscripció i pagament.\nEn cas d\'arribar al límit de participants, es podrà habilitar una llista d\'espera a través de la mateixa plataforma. No s\'admeten inscripcions fora de termini.',
    pagament: 'La inscripció i el pagament de la taxa es fan conjuntament a través de la plataforma d\'inscripcions en línia; no cal fer cap transferència ni pagament per separat.\nEn cas de renúncia comunicada amb més de 72 h d\'antelació, es retornarà el 50% de l\'import. Passada aquesta data, no hi ha dret a devolució.'
  },

  sala: {
    participants: 'Esportistes federats/ades a la FCTA amb llicència en vigor per a la temporada en curs, de totes les divisions (Recorbat, Compost, Nu, Tradicional, Longbow). Els menors d\'edat han de comptar amb l\'autorització del pare/mare o tutor legal.',
    places: 'Sense límit de places (subjecte a la capacitat de la instal·lació indoor).',
    edatMin: 'Totes les categories, des de Prebenjamí fins a Sènior/+50',
    format: 'Competició individual a 18 m. Ronda de classificació de 60 fletxes (2 rondes de 30), en tandes de 3 fletxes amb un temps màxim de 2 minuts per tanda. Fase eliminatòria individual (semifinals i final) pels 4 millors classificats de cada categoria, sempre que hi hagi més de 3 inscrits/es.',
    rondes: '60 fletxes (2 rondes de 30) a 18 m',
    fletxes: '3 fletxes per tanda · 2 min per tanda',
    dist: '18 m per a totes les categories i divisions',
    diana: '40 cm (triple vertical, RC/CO) · 60 cm (NU/LB/TR i categories menors)',
    elim: 'Fase eliminatòria (semifinals i final): dos esportistes per diana i tir simultani. Sistema de sets WA per a totes les divisions excepte Compost, que juga per puntuació acumulada.',
    lliga: 'Prova puntuable per a la Lliga Catalana de Sala. La classificació final de la lliga es determina pel còmput de totes les tirades disputades, sense descartar-ne cap puntuació. Cada competició adquireix oficialitat amb la publicació de la circular corresponent.',
    desempat: 'RC: en cas d\'empat en sets, tirada de desempat a la diana X; la fletxa més propera al centre guanya. Resta de divisions: major puntuació a les fletxes finals, successivament.',
    resultats: 'Gestió i resultats en directe a través de la plataforma Ianseo. Resultats oficials publicats a la web de la FCTA.',
    horari: [['08:30','Recepció d\'arquers i verificació de material'],['09:00','Escalfament oficial'],['09:30','Inici de la competició – 1ª ronda (30 fletxes)'],['11:00','Inici de la competició – 2ª ronda (30 fletxes)'],['13:00','Pausa dinar'],['14:30','Eliminatòries'],['17:00','Finals i lliurament de premis']],
    classes: [['Recorbat (RC)','15'],['Compost (CO)','15'],['Tradicional (TR)','12'],['Nu (BB)','12'],['Longbow (LB)','12']],
    formDesc: 'La inscripció es realitza mitjançant el formulari en línia indicat, que inclou el pagament de la taxa d\'inscripció en el mateix procés. La plaça no queda confirmada fins a completar tot el procés d\'inscripció i pagament.\nEn cas d\'arribar al límit de participants, es podrà habilitar una llista d\'espera a través de la mateixa plataforma. No s\'admeten inscripcions fora de termini.',
    pagament: 'La inscripció i el pagament de la taxa es fan conjuntament a través de la plataforma d\'inscripcions en línia; no cal fer cap transferència ni pagament per separat.\nEn cas de renúncia comunicada amb més de 72 h d\'antelació, es retornarà el 50% de l\'import. Passada aquesta data, no hi ha dret a devolució.'
  },

  camp: {
    participants: 'Esportistes federats/ades a la FCTA amb llicència en vigor. Divisions: Compost, Recorbat, Nu, Tradicional i Longbow. Classes: Sènior i Sub-15 (la categoria +50 queda integrada dins de Sènior). Els menors d\'edat han de comptar amb l\'autorització del pare/mare o tutor legal.',
    places: 'Cal un mínim de 40 participants inscrits/es per poder celebrar la tirada. En cas de no assolir-se aquest mínim, la competició quedarà suspesa i es retornarà íntegrament l\'import de la inscripció a totes les persones inscrites.',
    edatMin: 'Sub-15 en endavant',
    format: 'Circuit de 24 dianes (12 de distància coneguda i 12 de distància desconeguda). Els 4 primers classificats de cada divisió i sexe disputaran eliminatòries per optar al medaller, sempre que hi hagi un mínim de 4 arquers/eres inscrits/es.',
    rondes: 'Circuit de 24 dianes: 12 conegudes + 12 desconegudes',
    fletxes: 'Segons la distribució de patrulles establerta a la circular de cada competició',
    dist: 'Distàncies variables (conegudes i desconegudes) segons el recorregut homologat del camp de tir',
    diana: 'Cares de diana de camp segons distància, d\'acord amb el Reglament de Competicions FCTA i les regles World Archery',
    elim: 'Eliminatòries (4 primers classificats per divisió i sexe) per optar al medaller. Per tenir dret a trofeus, medalles o reconeixements de la FCTA cal haver participat en 3 de les 3 tirades de la lliga catalana de camp.',
    lliga: 'Prova puntuable per a la Lliga Catalana de Camp. La classificació final de la lliga es determina pel còmput de totes les tirades disputades, sense descartar-ne cap.',
    desempat: 'Segons el Reglament de Competicions FCTA i les regles World Archery de tir de camp.',
    resultats: 'Gestió i resultats en directe a través de la plataforma Ianseo. Resultats oficials publicats a la web de la FCTA.',
    horari: [['08:00','Recepció d\'arquers i verificació de material'],['08:30','Briefing i sorteig de patrulles'],['09:00','Inici circuit conegut (12 dianes)'],['12:00','Pausa'],['12:30','Inici circuit desconegut (12 dianes)'],['15:30','Eliminatòries'],['17:00','Lliurament de premis']],
    classes: [['Sènior','20'],['Sub-15','10']],
    formDesc: 'La inscripció es realitza mitjançant el formulari en línia indicat, que inclou el pagament de la taxa d\'inscripció en el mateix procés. La plaça no queda confirmada fins a completar tot el procés d\'inscripció i pagament. No s\'admeten inscripcions fora de termini.',
    pagament: 'La inscripció i el pagament de la taxa es fan conjuntament a través de la plataforma d\'inscripcions en línia; no cal fer cap transferència ni pagament per separat.\nSi no s\'assoleix el mínim de 40 participants, la competició quedarà suspesa i es retornarà íntegrament l\'import a totes les persones inscrites.'
  },

  '3d': {
    participants: 'Esportistes federats/ades a la FCTA amb llicència en vigor. Divisions: Compost, Nu, Tradicional i Longbow. Classes: Sènior i Sub-15 (la categoria +50 queda integrada dins de Sènior). Els menors d\'edat han de comptar amb l\'autorització del pare/mare o tutor legal.',
    places: 'Límit màxim de 192 esportistes participants.',
    edatMin: 'Sub-15 en endavant',
    format: 'Circuit de 24 dianes 3D. Es disputen 2 torns per divisions (Longbow/Tradicional en un torn, Nu/Compost en l\'altre) si el club només disposa d\'un circuit; amb 2 circuits disponibles, la competició es fa en un únic torn.',
    rondes: 'Circuit de 24 dianes 3D (2 torns segons divisió, si escau)',
    fletxes: 'Segons la distribució de patrulles establerta a la circular de cada competició',
    dist: 'Distàncies desconegudes, segons el recorregut homologat del circuit 3D',
    diana: 'Dianes 3D (figures d\'animal) homologades, d\'acord amb el Reglament de Competicions FCTA i les regles World Archery',
    elim: 'Eliminatòries (4 primers classificats per divisió i sexe) per optar al medaller, sempre que hi hagi un mínim de 4 arquers/eres per divisió i sexe. Per tenir dret a trofeus, medalles o reconeixements de la FCTA cal haver participat en 3 de les 3 tirades de la lliga catalana de 3D.',
    lliga: 'Prova puntuable per a la Lliga Catalana de 3D. La classificació final de la lliga es determina pel còmput de totes les tirades disputades, sense descartar-ne cap.',
    desempat: 'Segons el Reglament de Competicions FCTA i les regles World Archery de tir 3D.',
    resultats: 'Gestió i resultats en directe a través de la plataforma Ianseo. Resultats oficials publicats a la web de la FCTA.',
    horari: [['08:00','Recepció d\'arquers i verificació de material'],['08:30','Briefing i sorteig de patrulles/torns'],['09:00','Inici 1r torn (Longbow/Tradicional)'],['12:00','Pausa'],['12:30','Inici 2n torn (Nu/Compost)'],['15:30','Eliminatòries'],['17:00','Lliurament de premis']],
    classes: [['Sènior','20'],['Sub-15','10']],
    formDesc: 'La inscripció es realitza mitjançant el formulari en línia indicat, que inclou el pagament de la taxa d\'inscripció en el mateix procés. La plaça no queda confirmada fins a completar tot el procés d\'inscripció i pagament. No s\'admeten inscripcions fora de termini.',
    pagament: 'La inscripció i el pagament de la taxa es fan conjuntament a través de la plataforma d\'inscripcions en línia; no cal fer cap transferència ni pagament per separat.'
  },

  kyudo: {
    participants: 'Esportistes federats/ades a la FCTA amb llicència en vigor per a la temporada en curs.',
    places: 'Sense límit de places (subjecte a la capacitat de la instal·lació).',
    edatMin: 'Sub-15 en endavant',
    format: 'Competició individual segons el reglament de Kyudo aplicable. Els detalls específics del format es publicaran amb la circular de cada competició.',
    rondes: 'Segons format establert a la circular de la competició',
    fletxes: '',
    dist: '',
    diana: '',
    elim: '',
    lliga: 'Prova puntuable per a la temporada en curs. Cada competició adquireix oficialitat amb la publicació de la circular corresponent.',
    desempat: '',
    resultats: 'Resultats oficials publicats a la web de la FCTA.',
    horari: [['09:00','Recepció i verificació de material'],['09:30','Inici de la competició'],['13:00','Pausa dinar'],['14:00','Continuació i lliurament de premis']],
    classes: [['General','15']],
    formDesc: 'La inscripció es realitza mitjançant el formulari en línia indicat, que inclou el pagament de la taxa d\'inscripció en el mateix procés.',
    pagament: 'La inscripció i el pagament de la taxa es fan conjuntament a través de la plataforma d\'inscripcions en línia; no cal fer cap transferència ni pagament per separat.'
  },

  fed: {
    participants: 'Esportistes, clubs i/o tècnics federats/ades a la FCTA, segons s\'especifiqui a la convocatòria.',
    places: 'Sense límit de places, subjecte a la capacitat de la instal·lació o de l\'activitat.',
    edatMin: '',
    format: 'Detalls específics segons la naturalesa de l\'activitat convocada.',
    rondes: '',
    fletxes: '',
    dist: '',
    diana: '',
    elim: '',
    lliga: '',
    desempat: '',
    resultats: '',
    horari: [['09:00','Recepció'],['09:30','Inici de l\'activitat']],
    classes: [],
    formDesc: 'La inscripció es realitza mitjançant el formulari en línia indicat, que inclou el pagament (si escau) en el mateix procés.',
    pagament: 'La inscripció i el pagament (si escau) es fan conjuntament a través de la plataforma d\'inscripcions en línia; no cal fer cap transferència ni pagament per separat.'
  }
};
// El generador tracta 'sala' com a subtipus de 'al' a efectes de tipus de
// circular/competició (comparteixen badge 'cb-al'), però amb textos propis.
GEN_DISC_DEFAULTS.al.label = 'Aire Lliure';
GEN_DISC_DEFAULTS.sala.label = 'Sala';
GEN_DISC_DEFAULTS.camp.label = 'Tir de Camp';
GEN_DISC_DEFAULTS['3d'].label = '3D / Bosc';
GEN_DISC_DEFAULTS.kyudo.label = 'Kyudo';
GEN_DISC_DEFAULTS.fed.label = 'Federació (general)';

function renderAdmGenerator(b){
  var discOpts=[
    {val:'al',lbl:'Aire Lliure'},
    {val:'sala',lbl:'Sala'},
    {val:'camp',lbl:'Tir de Camp'},
    {val:'3d',lbl:'3D / Bosc'},
    {val:'kyudo',lbl:'Kyudo'},
    {val:'fed',lbl:'Federació (general)'}
  ];
  var tipusOpts=[
    {val:'lliga',lbl:'Tirada de Lliga Catalana'},
    {val:'campionat',lbl:'Campionat de Catalunya'},
    {val:'interclubs',lbl:'Tirada Interclubs'},
    {val:'trofeu',lbl:'Trofeu / Tirada Social'},
    {val:'copa',lbl:'Copa Catalana'},
    {val:'altre',lbl:'Altra competició'}
  ];
  var suggested=genNextCircNum();
  var d0=GEN_DISC_DEFAULTS.al; // disciplina per defecte en obrir el formulari
  b.innerHTML=
    '<div class="gen-wrap">'
    +'<div class="gen-form-col">'
    +'<div class="crud-form-title">✍️ Generador de Circulars de Competició</div>'
    +'<p style="color:var(--gray);font-size:.82rem;margin:-.25rem 0 1rem">Omple els camps i clica <strong>Generar</strong> per obtenir la circular en format imprimible. En canviar la <strong>disciplina</strong>, els textos genèrics s\'actualitzen automàticament.</p>'

    // ── Identificació ──────────────────────────────────────
    +'<div class="gen-section-label">Identificació</div>'
    +'<div class="af-row">'
    +mkField('Número circular *','gn_num','text',suggested,'CIRC-XXXX')
    +mkField('Disciplina *','gn_disc','select','al','',discOpts)
    +'</div>'
    +mkField('Tipus de competició *','gn_tipus','select','lliga','',tipusOpts)
    +mkField('Títol complet *','gn_title','text','','Ex: 2ª Tirada Lliga Catalana d\'Aire Lliure 2026')

    // ── Organització ───────────────────────────────────────
    +'<div class="gen-section-label">Organització</div>'
    +'<div class="af-row">'
    +mkField('Club organitzador *','gn_club','text','','Ex: Club Arc Barcelona')
    +mkField('Persona de contacte','gn_contact','text','','Nom i cognoms')
    +'</div>'
    +'<div class="af-row">'
    +mkField('Email de contacte *','gn_email','email','','secretaria@clubarc.cat')
    +mkField('Telèfon','gn_tel','text','','Ex: 93 XXX XX XX')
    +'</div>'

    // ── Lloc i Data ────────────────────────────────────────
    +'<div class="gen-section-label">Lloc i Data</div>'
    +mkField('Instal·lació / Recinte *','gn_loc','text','','Ex: Camp de Tir Municipal de Montjuïc')
    +mkField('Adreça completa','gn_addr','text','','Ex: Av. de l\'Estadi s/n, 08038 Barcelona')
    +'<div class="af-row">'
    +mkField('Data competició *','gn_date','date','','')
    +mkField('Data fi (si és 2 dies)','gn_date2','date','','')
    +'</div>'
    +mkField('Termini d\'inscripció *','gn_deadline','date','','')

    // ── Participants ───────────────────────────────────────
    +'<div class="gen-section-label">Participants</div>'
    +mkField('Qui pot participar','gn_participants','textarea',d0.participants,'')
    +'<div class="af-row">'
    +mkField('Límit de places','gn_places','text',d0.places,'')
    +mkField('Edat mínima','gn_edat','text',d0.edatMin,'')
    +'</div>'

    // ── Sistema de competició ──────────────────────────────
    +'<div class="gen-section-label">Sistema de competició</div>'
    +mkField('Format general','gn_format','textarea',d0.format,'')
    +'<div class="af-row">'
    +mkField('Rondes de classificació','gn_rondes','text',d0.rondes,'')
    +mkField('Fletxes per sèrie','gn_fletxes','text',d0.fletxes,'')
    +'</div>'
    +'<div class="af-row">'
    +mkField('Distàncies','gn_dist','text',d0.dist,'')
    +mkField('Tipus de diana','gn_diana','text',d0.diana,'')
    +'</div>'
    +mkField('Sistema d\'eliminatòries','gn_elim','textarea',d0.elim,'')

    // ── Lliga i classificació ──────────────────────────────
    +'<div class="gen-section-label">Lliga i classificació</div>'
    +mkField('Puntuació per a la lliga','gn_lliga','textarea',d0.lliga,'')
    +'<div class="af-row">'
    +mkField('Criteri de desempat','gn_desempat','text',d0.desempat,'')
    +mkField('Publicació resultats','gn_resultats','text',d0.resultats,'')
    +'</div>'

    // ── Horari ─────────────────────────────────────────────
    +'<div class="gen-section-label">Horari de la jornada</div>'
    +'<div id="gen-horari-rows" class="gen-dyn-rows"></div>'
    +'<button class="gen-add-row-btn"'+dataAttr('onclick','genAddHorariRow',[])+'>+ Afegir línia d\'horari</button>'

    // ── Classes i preus ────────────────────────────────────
    +'<div class="gen-section-label">Classes i taxes d\'inscripció</div>'
    +'<div id="gen-cat-rows" class="gen-dyn-rows"></div>'
    +'<button class="gen-add-row-btn"'+dataAttr('onclick','genAddCatRow',[])+'>+ Afegir classe</button>'

    // ── Inscripcions i pagament ────────────────────────────
    // Inscripció i pagament es fan conjuntament a través de la plataforma
    // d'inscripcions en línia (p.ex. Addon Sport): no hi ha camps de
    // transferència bancària perquè no s'utilitza aquest mètode.
    +'<div class="gen-section-label">Inscripcions i pagament</div>'
    +mkField('Formulari / URL d\'inscripció','gn_form_url','url','','https://event.addon-sport.com/... o forms.gle/...')
    +mkField('Instruccions d\'inscripció','gn_form_desc','textarea',d0.formDesc,'')
    +mkField('Forma de pagament','gn_pagament','textarea',d0.pagament,'')

    // ── Informació addicional ──────────────────────────────
    +'<div class="gen-section-label">Informació addicional</div>'
    +mkField('Reglament aplicat','gn_regl','text','Reglament de Competicions FCTA v1.6 · Regles World Archery (darrera edició vigent)','')
    +mkField('Premis i trofeus','gn_premis','textarea',
      'Trofeu als 3 primers classificats de cada classe i categoria.\nMedalla commemorativa a tots els participants.\nLa cerimònia de lliurament de premis es farà al camp de tir un cop finalitzades totes les eliminatòries.',
      '')
    +mkField('Observacions / Notes','gn_notes','textarea',
      'Els arcs, fletxes i equipament han de complir la normativa vigent de la World Archery i el Reglament de Competicions FCTA. L\'organització es reserva el dret de verificar el material en qualsevol moment.\nL\'organització no es responsabilitza dels objectes personals o del material dels participants.\nEls participants han d\'anar degudament identificats amb el dorsal assignat durant tota la competició.',
      '')

    +'<div style="display:flex;gap:.75rem;margin-top:1.25rem;flex-wrap:wrap">'
    +'<button class="a-sub success" style="font-size:.95rem;padding:.6rem 1.4rem"'+dataAttr('onclick','generateCircular',[])+'>📄 Generar Vista Prèvia</button>'
    +'<button class="a-sub" style="background:var(--navy);font-size:.95rem;padding:.6rem 1.4rem"'+dataAttr('onclick','genPublicarCircular',[])+'>✚ Publicar a Circulars</button>'
    +'</div>'
    +'</div>'

    +'<div class="gen-preview-col" id="gen-preview-col">'
    +'<div class="gen-preview-placeholder">&#128196;<br>La vista prèvia apareixerà aquí</div>'
    +'</div>'
    +'</div>';

  // Afegeix l'onchange a la disciplina (fet aquí i no amb dataAttr en línia,
  // per no duplicar el mateix codi al initial render i a genOnDiscChange)
  var discSel=document.getElementById('gn_disc');
  if(discSel){
    discSel.setAttribute('data-onchange','genOnDiscChange');
    discSel.setAttribute('data-onchange-args','["@val"]');
  }

  genFillHorariCats('al');
}

// Reomple les línies d'horari i de classes/taxes segons la disciplina donada
function genFillHorariCats(disc){
  var d=GEN_DISC_DEFAULTS[disc]||GEN_DISC_DEFAULTS.al;
  var hRows=document.getElementById('gen-horari-rows');
  var cRows=document.getElementById('gen-cat-rows');
  if(hRows) hRows.innerHTML='';
  if(cRows) cRows.innerHTML='';
  d.horari.forEach(function(h){ genAddHorariRow(h[0],h[1]); });
  d.classes.forEach(function(c){ genAddCatRow(c[0],c[1]); });
}

// Actualitza els textos genèrics del formulari en canviar la disciplina.
// Sobreescriu els camps de text/format perquè reflecteixin la darrera
// circular de "Format de Competicions" publicada per a cada lliga
// (Aire Lliure, Sala, Camp i 3D) — mantenint intactes les dades pròpies
// de l'esdeveniment (títol, club, dates, contacte, etc.).
function genOnDiscChange(disc){
  var d=GEN_DISC_DEFAULTS[disc]||GEN_DISC_DEFAULTS.al;
  var map={
    gn_participants:d.participants, gn_places:d.places, gn_edat:d.edatMin,
    gn_format:d.format, gn_rondes:d.rondes, gn_fletxes:d.fletxes,
    gn_dist:d.dist, gn_diana:d.diana, gn_elim:d.elim,
    gn_lliga:d.lliga, gn_desempat:d.desempat, gn_resultats:d.resultats,
    gn_form_desc:d.formDesc, gn_pagament:d.pagament
  };
  Object.keys(map).forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.value=map[id];
  });
  genFillHorariCats(disc);
  toast('Textos actualitzats per a '+(d.label||disc),'✍️');
}

function genAddHorariRow(hora,desc){
  var container=document.getElementById('gen-horari-rows');
  if(!container) return;
  var row=document.createElement('div');
  row.className='gen-dyn-row';
  row.innerHTML=
    '<input type="time" class="gen-hora-input" value="'+(hora||'')+'" placeholder="HH:MM">'
    +'<input type="text" class="gen-desc-input" value="'+(desc||'')+'" placeholder="Descripció de l\'activitat" style="flex:1">'
    +'<button class="gen-rm-btn"'+dataAttr('onclick','genRemoveRow',['@el'])+' title="Eliminar">✕</button>';
  container.appendChild(row);
}

function genAddCatRow(cat,preu){
  var container=document.getElementById('gen-cat-rows');
  if(!container) return;
  var row=document.createElement('div');
  row.className='gen-dyn-row';
  row.innerHTML=
    '<input type="text" class="gen-cat-input" value="'+(cat||'')+'" placeholder="Classe" style="flex:2">'
    +'<input type="text" class="gen-preu-input" value="'+(preu||'')+'" placeholder="Preu (€)" style="flex:.8;min-width:70px">'
    +'<button class="gen-rm-btn"'+dataAttr('onclick','genRemoveRow',['@el'])+' title="Eliminar">✕</button>';
  container.appendChild(row);
}

function genRemoveRow(btn){
  var row=btn.parentNode;
  if(row) row.parentNode.removeChild(row);
}

function genFmtDate(iso){
  if(!iso) return '';
  var MONS_LONG=['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre'];
  var parts=iso.split('-');
  if(parts.length<3) return iso;
  return parseInt(parts[2])+' de '+MONS_LONG[parseInt(parts[1])-1]+' de '+parts[0];
}

function genCollectHorari(){
  var rows=document.querySelectorAll('#gen-horari-rows .gen-dyn-row');
  var items=[];
  rows.forEach(function(row){
    var hora=row.querySelector('.gen-hora-input');
    var desc=row.querySelector('.gen-desc-input');
    if(hora&&desc&&(hora.value||desc.value))
      items.push({hora:hora.value,desc:desc.value});
  });
  return items;
}

function genCollectCats(){
  var rows=document.querySelectorAll('#gen-cat-rows .gen-dyn-row');
  var items=[];
  rows.forEach(function(row){
    var cat=row.querySelector('.gen-cat-input');
    var preu=row.querySelector('.gen-preu-input');
    if(cat&&cat.value) items.push({cat:cat.value,preu:preu?preu.value:''});
  });
  return items;
}

function generateCircular(){
  var num=fv('gn_num');
  var title=fv('gn_title');
  if(!num||!title){
    toast('Omple el número i el títol de la circular','⚠️');
    return;
  }
  var disc=fv('gn_disc');
  var discNoms={al:'Aire Lliure',sala:'Sala',camp:'Tir de Camp','3d':'3D / Bosc',kyudo:'Kyudo',fed:'General'};
  var club=fv('gn_club');
  var contact=fv('gn_contact');
  var email=fv('gn_email');
  var tel=fv('gn_tel');
  var loc=fv('gn_loc');
  var addr=fv('gn_addr');
  var date1=fv('gn_date');
  var date2=fv('gn_date2');
  var deadline=fv('gn_deadline');
  var participants=fv('gn_participants');
  var places=fv('gn_places');
  var edat=fv('gn_edat');
  var format=fv('gn_format');
  var rondes=fv('gn_rondes');
  var fletxes=fv('gn_fletxes');
  var dist=fv('gn_dist');
  var diana=fv('gn_diana');
  var elim=fv('gn_elim');
  var lliga=fv('gn_lliga');
  var desempat=fv('gn_desempat');
  var resultats=fv('gn_resultats');
  var formUrl=fv('gn_form_url');
  var formDesc=fv('gn_form_desc');
  var pagament=fv('gn_pagament');
  var regl=fv('gn_regl');
  var premis=fv('gn_premis');
  var notes=fv('gn_notes');
  var horari=genCollectHorari();
  var cats=genCollectCats();

  var dateStr=genFmtDate(date1);
  if(date2) dateStr+=(' i '+genFmtDate(date2));

  var today=new Date();
  var MONS_SHORT=['GEN','FEB','MAR','ABR','MAI','JUN','JUL','AGO','SET','OCT','NOV','DES'];
  var emisData=today.getDate()+' '+MONS_SHORT[today.getMonth()]+' '+today.getFullYear();

  var horariHTML='';
  if(horari.length){
    horariHTML='<table class="circ-table"><thead><tr><th style="width:90px">Hora</th><th>Activitat</th></tr></thead><tbody>';
    horari.forEach(function(h){
      horariHTML+='<tr><td><strong>'+escHtml(h.hora)+'</strong></td><td>'+escHtml(h.desc)+'</td></tr>';
    });
    horariHTML+='</tbody></table>';
  }

  var catsHTML='';
  if(cats.length){
    catsHTML='<table class="circ-table"><thead><tr><th>Classe</th><th style="width:80px;text-align:center">Preu</th></tr></thead><tbody>';
    cats.forEach(function(c){
      catsHTML+='<tr><td>'+escHtml(c.cat)+'</td><td style="text-align:center">'+(c.preu?escHtml(c.preu)+' €':'—')+'</td></tr>';
    });
    catsHTML+='</tbody></table>';
  }

  var css=
    '*{box-sizing:border-box;margin:0;padding:0}'
    +'body{font-family:Arial,Helvetica,sans-serif;font-size:11pt;color:#111;background:#fff;padding:0}'
    +'@page{size:A4;margin:18mm 18mm 22mm 18mm}'
    +'.circ-doc{max-width:175mm;margin:0 auto;padding:10mm 0}'
    +'.circ-header{background:#0F2447;color:#fff;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px}'
    +'.circ-header-left{display:flex;align-items:center;gap:14px}'
    +'.circ-logo-box{width:52px;height:52px;background:#F5B800;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0}'
    +'.circ-org{font-size:8pt;opacity:.75;letter-spacing:.03em;text-transform:uppercase}'
    +'.circ-org-main{font-size:12pt;font-weight:700;letter-spacing:.02em;text-transform:uppercase}'
    +'.circ-num-box{background:#F5B800;color:#0F2447;font-size:10pt;font-weight:700;padding:6px 14px;border-radius:4px;white-space:nowrap;text-align:center}'
    +'.circ-num-box small{display:block;font-size:7.5pt;font-weight:400;opacity:.7}'
    +'.circ-senyera{display:flex;height:6px}'
    +'.circ-senyera div{flex:1}'
    +'.sg{background:#F5C518}.sr{background:#CC0001}'
    +'.circ-title-block{padding:14px 20px 10px;border-bottom:2px solid #E8ECF3}'
    +'.circ-disc-badge{display:inline-block;background:#E8ECF3;color:#1B3A6B;font-size:8.5pt;font-weight:700;padding:3px 10px;border-radius:3px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}'
    +'.circ-title{font-size:16pt;font-weight:700;color:#0F2447;line-height:1.2;text-transform:uppercase;margin-bottom:4px}'
    +'.circ-emit{font-size:8pt;color:#666}'
    +'.circ-body{padding:0 20px}'
    +'.circ-section{margin:14px 0 6px}'
    +'.circ-section-title{font-size:9.5pt;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#1B3A6B;border-left:3px solid #F5B800;padding-left:8px;margin-bottom:8px}'
    +'.circ-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 20px}'
    +'.circ-info-item{font-size:9.5pt}'
    +'.circ-info-label{font-weight:700;color:#333}'
    +'.circ-info-val{color:#111}'
    +'.circ-table{width:100%;border-collapse:collapse;font-size:9.5pt}'
    +'.circ-table th{background:#1B3A6B;color:#fff;font-weight:700;padding:5px 8px;text-align:left;font-size:8.5pt;text-transform:uppercase;letter-spacing:.04em}'
    +'.circ-table td{padding:5px 8px;border-bottom:1px solid #E8ECF3}'
    +'.circ-table tr:nth-child(even) td{background:#F4F6FA}'
    +'.circ-footer{margin-top:18px;padding:10px 20px;background:#F4F6FA;border-top:2px solid #E8ECF3;font-size:8pt;color:#666;display:flex;justify-content:space-between;align-items:center}'
    +'.circ-footer strong{color:#0F2447}'
    +'p{font-size:9.5pt;margin:5px 0;line-height:1.5}'
    +'a{color:#1B3A6B}'
    +'@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';

  var html=
    '<!DOCTYPE html><html lang="ca"><head><meta charset="UTF-8">'
    +'<title>'+escHtml(num)+' – '+escHtml(title)+'</title>'
    +'<style>'+css+'</style></head><body>'
    +'<div class="circ-doc">'

    +'<div class="circ-header">'
    +'<div class="circ-header-left">'
    +'<div class="circ-logo-box">🏹</div>'
    +'<div><div class="circ-org">Federació Catalana de</div><div class="circ-org-main">Tir amb Arc</div></div>'
    +'</div>'
    +'<div class="circ-num-box"><small>Circular oficial</small>'+escHtml(num)+'</div>'
    +'</div>'

    +'<div class="circ-senyera"><div class="sg"></div><div class="sr"></div><div class="sg"></div><div class="sr"></div><div class="sg"></div><div class="sr"></div><div class="sg"></div><div class="sr"></div><div class="sg"></div></div>'

    +'<div class="circ-title-block">'
    +'<div class="circ-disc-badge">'+escHtml(discNoms[disc]||disc)+'</div>'
    +'<div class="circ-title">'+escHtml(title)+'</div>'
    +'<div class="circ-emit">Emesa: '+emisData+(club?' &nbsp;·&nbsp; Organitza: '+escHtml(club):'')+'</div>'
    +'</div>'

    +'<div class="circ-body">';

  // ── 1. Informació general ──────────────────────────────────
  html+='<div class="circ-section"><div class="circ-section-title">Informació general</div>'
    +'<div class="circ-info-grid">';
  if(dateStr)  html+='<div class="circ-info-item"><span class="circ-info-label">Data:</span><br><span class="circ-info-val">'+dateStr+'</span></div>';
  if(loc)      html+='<div class="circ-info-item"><span class="circ-info-label">Lloc:</span><br><span class="circ-info-val">'+escHtml(loc)+'</span></div>';
  if(addr)     html+='<div class="circ-info-item"><span class="circ-info-label">Adreça:</span><br><span class="circ-info-val">'+escHtml(addr)+'</span></div>';
  if(club)     html+='<div class="circ-info-item"><span class="circ-info-label">Club organitzador:</span><br><span class="circ-info-val">'+escHtml(club)+'</span></div>';
  if(deadline) html+='<div class="circ-info-item"><span class="circ-info-label">Termini d\'inscripció:</span><br><span class="circ-info-val">'+genFmtDate(deadline)+'</span></div>';
  if(regl)     html+='<div class="circ-info-item" style="grid-column:1/-1"><span class="circ-info-label">Reglament aplicat:</span> <span class="circ-info-val">'+escHtml(regl)+'</span></div>';
  html+='</div></div>';

  // ── 2. Participants ────────────────────────────────────────
  if(participants||places||edat){
    html+='<div class="circ-section"><div class="circ-section-title">Participants</div>';
    if(participants) html+='<p>'+escHtml(participants).replace(/\n/g,'<br>')+'</p>';
    if(places||edat){
      html+='<div class="circ-info-grid" style="margin-top:6px">';
      if(places) html+='<div class="circ-info-item"><span class="circ-info-label">Places:</span> <span class="circ-info-val">'+escHtml(places)+'</span></div>';
      if(edat)   html+='<div class="circ-info-item"><span class="circ-info-label">Edat mínima:</span> <span class="circ-info-val">'+escHtml(edat)+'</span></div>';
      html+='</div>';
    }
    html+='</div>';
  }

  // ── 3. Sistema de competició ───────────────────────────────
  if(format||rondes||fletxes||dist||diana||elim){
    html+='<div class="circ-section"><div class="circ-section-title">Sistema de competició</div>';
    if(format) html+='<p>'+escHtml(format).replace(/\n/g,'<br>')+'</p>';
    if(rondes||fletxes||dist||diana){
      html+='<div class="circ-info-grid" style="margin-top:6px">';
      if(rondes)  html+='<div class="circ-info-item"><span class="circ-info-label">Rondes:</span><br><span class="circ-info-val">'+escHtml(rondes)+'</span></div>';
      if(fletxes) html+='<div class="circ-info-item"><span class="circ-info-label">Fletxes / Sèrie:</span><br><span class="circ-info-val">'+escHtml(fletxes)+'</span></div>';
      if(dist)    html+='<div class="circ-info-item"><span class="circ-info-label">Distàncies:</span><br><span class="circ-info-val">'+escHtml(dist)+'</span></div>';
      if(diana)   html+='<div class="circ-info-item"><span class="circ-info-label">Tipus de diana:</span><br><span class="circ-info-val">'+escHtml(diana)+'</span></div>';
      html+='</div>';
    }
    if(elim) html+='<p style="margin-top:6px"><span class="circ-info-label">Eliminatòries:</span> '+escHtml(elim).replace(/\n/g,'<br>')+'</p>';
    html+='</div>';
  }

  // ── 4. Lliga i classificació ───────────────────────────────
  if(lliga||desempat||resultats){
    html+='<div class="circ-section"><div class="circ-section-title">Lliga i classificació</div>';
    if(lliga) html+='<p>'+escHtml(lliga).replace(/\n/g,'<br>')+'</p>';
    if(desempat||resultats){
      html+='<div class="circ-info-grid" style="margin-top:6px">';
      if(desempat) html+='<div class="circ-info-item"><span class="circ-info-label">Desempat:</span><br><span class="circ-info-val">'+escHtml(desempat)+'</span></div>';
      if(resultats) html+='<div class="circ-info-item"><span class="circ-info-label">Resultats:</span><br><span class="circ-info-val">'+escHtml(resultats)+'</span></div>';
      html+='</div>';
    }
    html+='</div>';
  }

  // ── 5. Horari ──────────────────────────────────────────────
  if(horariHTML){
    html+='<div class="circ-section"><div class="circ-section-title">Horari de la jornada</div>'+horariHTML+'</div>';
  }

  // ── 6. Classes i taxes ─────────────────────────────────────
  if(catsHTML){
    html+='<div class="circ-section"><div class="circ-section-title">Classes i taxes d\'inscripció</div>'+catsHTML+'</div>';
  }

  // ── 7. Inscripcions i pagament ─────────────────────────────
  var inscHTML='';
  if(deadline)      inscHTML+='<p><span class="circ-info-label">Termini:</span> '+genFmtDate(deadline)+'</p>';
  if(formDesc)      inscHTML+='<p>'+escHtml(formDesc).replace(/\n/g,'<br>')+'</p>';
  if(formUrl)       inscHTML+='<p><span class="circ-info-label">Formulari / inscripció:</span> <a href="'+escHtml(formUrl)+'">'+escHtml(formUrl)+'</a></p>';
  if(pagament)      inscHTML+='<p>'+escHtml(pagament).replace(/\n/g,'<br>')+'</p>';
  if(inscHTML){
    html+='<div class="circ-section"><div class="circ-section-title">Inscripcions i pagament</div>'+inscHTML+'</div>';
  }

  // ── 8. Premis i trofeus ────────────────────────────────────
  if(premis){
    html+='<div class="circ-section"><div class="circ-section-title">Premis i trofeus</div><p>'+escHtml(premis).replace(/\n/g,'<br>')+'</p></div>';
  }

  // ── 9. Observacions ───────────────────────────────────────
  if(notes){
    html+='<div class="circ-section"><div class="circ-section-title">Observacions</div><p>'+escHtml(notes).replace(/\n/g,'<br>')+'</p></div>';
  }

  // ── 10. Contacte organització ──────────────────────────────
  if(contact||email||tel){
    html+='<div class="circ-section"><div class="circ-section-title">Contacte organització</div>'
      +'<div class="circ-info-grid">';
    if(contact) html+='<div class="circ-info-item"><span class="circ-info-label">Persona:</span><br>'+escHtml(contact)+'</div>';
    if(email)   html+='<div class="circ-info-item"><span class="circ-info-label">Email:</span><br><a href="mailto:'+escHtml(email)+'">'+escHtml(email)+'</a></div>';
    if(tel)     html+='<div class="circ-info-item"><span class="circ-info-label">Telèfon:</span><br>'+escHtml(tel)+'</div>';
    html+='</div></div>';
  }

  html+='</div>'; // circ-body

  html+='<div class="circ-footer">'
    +'<span><strong>FCTA</strong> – Federació Catalana de Tir amb Arc &nbsp;·&nbsp; Rambla Guipúscoa 23-25, 08018 Barcelona</span>'
    +'<span>info@fcta.cat &nbsp;·&nbsp; +34 93 308 02 65</span>'
    +'</div>'

    +'</div></body></html>';

  // Store for print
  window._genCircularHTML=html;

  // Show preview
  var col=document.getElementById('gen-preview-col');
  if(!col) return;
  col.innerHTML=
    '<div class="gen-preview-actions">'
    +'<button class="a-sub success"'+dataAttr('onclick','genPrint',[])+'>🖨️ Imprimir / Descarregar PDF</button>'
    +'</div>'
    +'<div class="gen-preview-frame-wrap"><iframe id="gen-iframe" class="gen-preview-iframe"></iframe></div>';

  var iframe=document.getElementById('gen-iframe');
  iframe.onload=function(){};
  iframe.contentDocument.open();
  iframe.contentDocument.write(html);
  iframe.contentDocument.close();

  toast('Circular generada!','📄');
}

function genPrint(){
  if(!window._genCircularHTML){ toast('Genera la circular primer','⚠️'); return; }
  var win=window.open('','_blank','width=900,height=700');
  win.document.write(window._genCircularHTML);
  win.document.close();
  win.focus();
  setTimeout(function(){ win.print(); },400);
}

function genPublicarCircular(){
  var num=fv('gn_num');
  var title=fv('gn_title');
  var disc=fv('gn_disc');
  if(!num||!title){ toast('Omple el número i el títol','⚠️'); return; }
  var MONS=['GEN','FEB','MAR','ABR','MAI','JUN','JUL','AGO','SET','OCT','NOV','DES'];
  var today=new Date();
  var date1=fv('gn_date');
  var d=date1?new Date(date1):today;
  var club=fv('gn_club');
  var loc=fv('gn_loc');
  var desc=(club?'Organitza: '+club+'. ':'')+(loc?'Lloc: '+loc+'. ':'')+(fv('gn_deadline')?'Inscripcions fins '+genFmtDate(fv('gn_deadline'))+'.':'');
  DB.circulars.unshift({
    id:Date.now(),type:disc,num:num,title:title,
    desc:desc,day:d.getDate(),mon:MONS[d.getMonth()],year:d.getFullYear(),url:'#'
  });
  dbSave();
  renderCirc('all');
  toast('Circular "'+num+'" publicada a la llista!','✅');
}

// ── BACKUP / RESTORE ───────────────────────────────────────
var _BK_FIELDS = ['circulars','competitions','news','formations','tirades','documents','recordsSolicituds'];
var _BK_LABELS = {circulars:'Circulars',competitions:'Competicions',news:'Notícies',
  formations:'Formació',tirades:'Tirades',documents:'Documents',recordsSolicituds:'Rècords'};
var _BK_PREFIX = 'fcta_ckpt_';
var _BK_MAX    = 3;

function _bkSnapshot() {
  var snap = { _ts: Date.now(), _v: 1 };
  _BK_FIELDS.forEach(function(k){ if(DB[k]!==undefined) snap[k]=DB[k]; });
  return snap;
}

function _bkApply(snap) {
  _BK_FIELDS.forEach(function(k){ if(snap[k]!==undefined) DB[k]=snap[k]; });
  dbSave();
  if(typeof renderCirc==='function')    renderCirc('all');
  if(typeof renderComp==='function')    renderComp('all');
  if(typeof renderNews==='function')    renderNews();
  if(typeof renderForm==='function')    renderForm();
  if(typeof renderTirades==='function') renderTirades('all');
  if(typeof updatePendDot==='function') updatePendDot();
}

function _bkFmtDate(ts) {
  var d = new Date(ts);
  var pad = function(n){ return n<10?'0'+n:n; };
  return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())
    +' '+pad(d.getHours())+':'+pad(d.getMinutes());
}

function _bkSummary(snap) {
  return _BK_FIELDS.map(function(k){
    var arr = snap[k]; if(!Array.isArray(arr)) return null;
    return '<span style="margin-right:.75rem"><strong>'+arr.length+'</strong> '+_BK_LABELS[k]+'</span>';
  }).filter(Boolean).join('');
}

// ── Fitxers pujats (PDF/imatges) referenciats dins d'un snapshot ──
// Recorre recursivament totes les cadenes del snapshot i recull les
// que apunten a /uploads/... (fitxers pujats des del panell, no
// versionats a git — a diferència de docs/ i img/, que sí ho estan).
function _bkCollectUploadUrls(obj, found) {
  found = found || {};
  if (Array.isArray(obj)) {
    obj.forEach(function(v){ _bkCollectUploadUrls(v, found); });
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(function(k){ _bkCollectUploadUrls(obj[k], found); });
  } else if (typeof obj === 'string' && /^\/uploads\//.test(obj)) {
    found[obj] = true;
  }
  return Object.keys(found);
}

function _bkFileToBase64(blob) {
  return new Promise(function(resolve, reject){
    var reader = new FileReader();
    reader.onload  = function(){ resolve(reader.result); }; // data:mime;base64,....
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Descarrega cada fitxer /uploads/... i el converteix a base64.
// Els errors individuals (fitxer no trobat, etc.) no aturen la resta.
function _bkFetchUploadFiles(urls) {
  var out   = {};
  var chain = Promise.resolve();
  urls.forEach(function(url){
    chain = chain.then(function(){
      return fetch(url)
        .then(function(r){ if(!r.ok) throw new Error('no trobat'); return r.blob(); })
        .then(_bkFileToBase64)
        .then(function(dataUrl){ out[url] = dataUrl; })
        .catch(function(e){ console.warn('Backup: no s\'ha pogut incloure '+url, e); });
    });
  });
  return chain.then(function(){ return out; });
}

// ── Export ──────────────────────────────────────────────────
function bkExport() {
  var snap = _bkSnapshot();
  var urls = _bkCollectUploadUrls(snap);
  if (urls.length) toast('Preparant backup ('+urls.length+' fitxers)…','⏳');

  _bkFetchUploadFiles(urls).then(function(files){
    snap._files = files; // { '/uploads/xxx.pdf': 'data:...;base64,...' }
    var json = JSON.stringify(snap, null, 2);
    var blob = new Blob([json], {type:'application/json'});
    var url  = URL.createObjectURL(blob);
    var d    = new Date(snap._ts);
    var pad  = function(n){ return n<10?'0'+n:n; };
    var name = 'fcta-backup-'+d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())
               +'-'+pad(d.getHours())+pad(d.getMinutes())+'.json';
    var a    = document.createElement('a');
    a.href=url; a.download=name; a.click();
    URL.revokeObjectURL(url);
    var nFiles = Object.keys(files).length;
    toast('Backup descarregat: '+name+(nFiles?' · '+nFiles+' fitxers inclosos':''),'💾');
  });
}

// ── Import ──────────────────────────────────────────────────
function bkImportStart() {
  var inp = document.getElementById('bkFileInput');
  if(inp) inp.click();
}

function bkImportRead(input) {
  var file = input.files[0];
  if(!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var preview = document.getElementById('bkImportPreview');
    try {
      var snap = JSON.parse(e.target.result);
      if(!snap._v){ toast('Fitxer de backup no vàlid','⚠️'); return; }
      var ts = snap._ts ? _bkFmtDate(snap._ts) : 'desconeguda';
      var nFiles = snap._files ? Object.keys(snap._files).length : 0;
      _bkPendingImport = snap; // evita haver d'incrustar tot el JSON en un atribut HTML
      preview.innerHTML =
        '<div class="bk-preview-box">'
        +'<div class="bk-preview-title">📋 Contingut del fitxer</div>'
        +'<div class="bk-preview-meta">Data del backup: <strong>'+ts+'</strong>'
        +(nFiles ? ' · <strong>'+nFiles+'</strong> fitxers (PDF/imatges) inclosos' : '')+'</div>'
        +'<div class="bk-preview-counts">'+_bkSummary(snap)+'</div>'
        +'<div class="bk-preview-warn">⚠️ Aquesta acció substituirà les dades actuals. No es pot desfer.</div>'
        +'<button class="a-sub" style="background:#dc2626;margin-top:.75rem"'+dataAttr('onclick','bkImportConfirm',[])+'>'
        +'&#8635; Aplicar aquest backup</button>'
        +'</div>';
    } catch(err) {
      preview.innerHTML='<div class="bk-preview-box" style="border-color:#dc2626;color:#dc2626">Error llegint el fitxer: '+escHtml(err.message)+'</div>';
    }
    input.value='';
  };
  reader.readAsText(file);
}

// Converteix una data URL (base64) de nou en un Blob binari
function _bkDataUrlToBlob(dataUrl) {
  var parts     = dataUrl.split(',');
  var mimeMatch = parts[0].match(/:(.*?);/);
  var mime      = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  var bin       = atob(parts[1]);
  var arr       = new Uint8Array(bin.length);
  for (var i=0; i<bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], {type: mime});
}

// Repuja els fitxers inclosos al backup (via els endpoints d'upload
// existents, que ja validen tipus/mida) i retorna un mapa
// { url-antiga: url-nova } per actualitzar les referències al snapshot.
function _bkRestoreFiles(files, token) {
  var urls = Object.keys(files || {});
  if (!urls.length) return Promise.resolve({});
  var map   = {};
  var chain = Promise.resolve();
  urls.forEach(function(oldUrl){
    chain = chain.then(function(){
      var blob     = _bkDataUrlToBlob(files[oldUrl]);
      var isPdf    = /\.pdf(\?|$)/i.test(oldUrl);
      var endpoint = isPdf ? '/api/upload/pdf' : '/api/upload/image';
      var origName = oldUrl.split('/').pop();
      var fd = new FormData();
      fd.append('file', blob, origName);
      return fetch(endpoint, {
        method: 'POST',
        headers: token ? {'Authorization':'Bearer '+token} : {},
        body: fd
      }).then(function(r){ return r.json(); })
        .then(function(d){ if (d.url) map[oldUrl] = d.url; })
        .catch(function(){});
    });
  });
  return chain.then(function(){ return map; });
}

// Substitueix, dins de tot el snapshot, les URLs antigues de fitxers
// per les noves URLs assignades en repujar-los.
function _bkRemapUrls(obj, map) {
  if (Array.isArray(obj)) {
    obj.forEach(function(v){ _bkRemapUrls(v, map); });
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(function(k){
      if (typeof obj[k] === 'string' && map[obj[k]]) obj[k] = map[obj[k]];
      else _bkRemapUrls(obj[k], map);
    });
  }
}

var _bkPendingImport = null; // snapshot pendent d'aplicar (desat per bkImportRead)

function bkImportConfirm() {
  if(!confirm('Aplicar el backup?\n\nAixò sobreescriurà TOTES les dades actuals.\nAssegura\'t que tens un backup de l\'estat actual.')) return;
  try {
    var snap  = _bkPendingImport;
    if (!snap) { toast('Cap backup seleccionat','⚠️'); return; }
    var files = snap._files || null;
    delete snap._files;
    _bkPendingImport = null; // consumit; evita reaplicar-lo per accident

    if (files && Object.keys(files).length) {
      var token = window.dbGetToken ? window.dbGetToken() : '';
      toast('Restaurant fitxers…','⏳');
      _bkRestoreFiles(files, token).then(function(map){
        _bkRemapUrls(snap, map);
        _bkApply(snap);
        toast('Backup aplicat correctament · '+Object.keys(map).length+' fitxers restaurats','✅');
        renderAdmBackup(document.getElementById('admBody'));
      });
    } else {
      _bkApply(snap);
      toast('Backup aplicat correctament','✅');
      renderAdmBackup(document.getElementById('admBody'));
    }
  } catch(err) {
    toast('Error al restaurar: '+err.message,'⚠️');
  }
}

// ── Checkpoints ─────────────────────────────────────────────
function bkSaveCheckpoint() {
  var snap = _bkSnapshot();
  var all  = bkGetCheckpoints();
  all.unshift(snap);
  if(all.length > _BK_MAX) all = all.slice(0, _BK_MAX);
  for(var i=0;i<all.length;i++){
    try { localStorage.setItem(_BK_PREFIX+i, JSON.stringify(all[i])); } catch(e) {}
  }
  // Esborra slots sobrants
  for(var j=all.length;j<_BK_MAX;j++){
    localStorage.removeItem(_BK_PREFIX+j);
  }
  toast('Punt de control desat','💾');
  renderAdmBackup(document.getElementById('admBody'));
}

function bkGetCheckpoints() {
  var result = [];
  for(var i=0;i<_BK_MAX;i++){
    try {
      var raw = localStorage.getItem(_BK_PREFIX+i);
      if(raw) result.push(JSON.parse(raw));
    } catch(e) {}
  }
  return result;
}

function bkRestoreCheckpoint(idx) {
  var all = bkGetCheckpoints();
  if(!all[idx]){ toast('Punt de control no trobat','⚠️'); return; }
  var snap = all[idx];
  if(!confirm('Restaurar el punt de control del '+_bkFmtDate(snap._ts)+'?\n\nLes dades actuals seran sobreescrites.')) return;
  _bkApply(snap);
  toast('Punt de control restaurat','✅');
  renderAdmBackup(document.getElementById('admBody'));
}

function bkDeleteCheckpoint(idx) {
  var all = bkGetCheckpoints();
  all.splice(idx, 1);
  for(var i=0;i<_BK_MAX;i++) localStorage.removeItem(_BK_PREFIX+i);
  for(var j=0;j<all.length;j++){
    try { localStorage.setItem(_BK_PREFIX+j, JSON.stringify(all[j])); } catch(e) {}
  }
  toast('Punt de control eliminat','🗑️');
  renderAdmBackup(document.getElementById('admBody'));
}

// ── Renderitzador de la pestanya ─────────────────────────────
function renderAdmBackup(b) {
  var snap = _bkSnapshot();
  var ckpts = bkGetCheckpoints();

  var ckptsHTML = '';
  if(ckpts.length) {
    ckptsHTML = ckpts.map(function(c, i){
      return '<div class="bk-ckpt-row">'
        +'<div class="bk-ckpt-info">'
        +'<div class="bk-ckpt-ts">'+_bkFmtDate(c._ts)+'</div>'
        +'<div class="bk-ckpt-counts">'+_bkSummary(c)+'</div>'
        +'</div>'
        +'<div class="crud-item-acts">'
        +'<button class="btn-edit-crud"'+dataAttr('onclick','bkRestoreCheckpoint',[i])+' title="Restaurar">&#8635; Restaurar</button>'
        +'<button class="btn-del-crud"'+dataAttr('onclick','bkDeleteCheckpoint',[i])+' title="Eliminar">&#128465;</button>'
        +'</div>'
        +'</div>';
    }).join('');
  } else {
    ckptsHTML = '<p style="font-size:.85rem;color:var(--gray);padding:.5rem 0">Cap punt de control desat.</p>';
  }

  b.innerHTML =
    '<div class="bk-wrap">'

    // ── Estat actual ──────────────────────────────────────────
    +'<div class="bk-section">'
    +'<div class="adm-st">Estat actual de la base de dades</div>'
    +'<div class="bk-state-counts">'+_bkSummary(snap)+'</div>'
    +'</div>'

    // ── Export ────────────────────────────────────────────────
    +'<div class="bk-section">'
    +'<div class="adm-st">Exportar backup complet (fitxer JSON)</div>'
    +'<p class="bk-desc">Descàrrega un fitxer JSON amb totes les dades actuals <strong>i els documents/imatges pujats</strong> (PDFs de circulars, imatges de notícies, etc.). Guarda\'l al teu ordinador per poder restaurar-ho tot en qualsevol moment.</p>'
    +'<button class="a-sub success"'+dataAttr('onclick','bkExport',[])+'>&#8681; Descarregar backup ara</button>'
    +'</div>'

    // ── Import ────────────────────────────────────────────────
    +'<div class="bk-section">'
    +'<div class="adm-st">Importar backup (des de fitxer)</div>'
    +'<p class="bk-desc">Selecciona un fitxer JSON exportat anteriorment per restaurar les dades i els fitxers que continguin.</p>'
    +'<input type="file" id="bkFileInput" accept=".json,application/json" style="display:none"'+dataAttr('onchange','bkImportRead',['@el'])+'>'
    +'<button class="a-sub" style="background:var(--navy)"'+dataAttr('onclick','bkImportStart',[])+'>&#8679; Seleccionar fitxer de backup…</button>'
    +'<div id="bkImportPreview" style="margin-top:1rem"></div>'
    +'</div>'

    // ── Checkpoints ────────────────────────────────────────────
    +'<div class="bk-section">'
    +'<div class="adm-st" style="display:flex;align-items:center;gap:.75rem">'
    +'Punts de control ràpids <span class="crud-count-badge">'+ckpts.length+'/'+_BK_MAX+'</span>'
    +(ckpts.length < _BK_MAX
      ? '<button class="a-sub success" style="padding:.25rem .75rem;font-size:.8rem;margin-left:auto"'+dataAttr('onclick','bkSaveCheckpoint',[])+'>+ Desar punt de control ara</button>'
      : '<span style="font-size:.78rem;color:var(--gray);margin-left:auto">Màxim '+_BK_MAX+' punts. Elimina\'n un per afegir-ne un altre.</span>')
    +'</div>'
    +'<p class="bk-desc">Els punts de control es guarden al navegador (localStorage). Ideals per a un desament ràpid abans de fer canvis importants.</p>'
    +'<div class="bk-ckpt-list">'+ckptsHTML+'</div>'
    +'</div>'

    +'</div>'; // bk-wrap
}

// Legacy shims (kept for compatibility)
function addCirc(){ crudAddCirc(); }
function addNews(){ crudAddNews(); }

// ── API HELPERS ────────────────────────────────────────────
function admToken(){ return window.dbGetToken ? window.dbGetToken() : ''; }

function admApiFetch(url, opts, onOk, onErr) {
  opts = opts || {};
  opts.headers = opts.headers || {};
  opts.headers['Authorization'] = 'Bearer ' + admToken();
  if (opts.body && !opts.headers['Content-Type']) {
    opts.headers['Content-Type'] = 'application/json';
  }
  fetch(url, opts)
    .then(function(r){ return r.json().then(function(d){ return { ok: r.ok, data: d }; }); })
    .then(function(r){
      if (r.ok) { if (onOk) onOk(r.data); }
      else { if (onErr) onErr(r.data.error || 'Error desconegut'); else toast(r.data.error || 'Error','⚠️'); }
    })
    .catch(function(e){ var m='Error de connexió'; if(onErr) onErr(m); else toast(m,'⚠️'); });
}

function admLog(action, detail) {
  admApiFetch('/api/audit', {
    method: 'POST',
    body: JSON.stringify({ action: action, detail: detail || null })
  });
}

// ── USUARIS CRUD ───────────────────────────────────────────
var _admUsers = [];   // cache local de la darrera càrrega

function renderAdmUsuaris(b){
  var roles=[{val:'superadmin',lbl:'Superadmin'},{val:'editor',lbl:'Editor'}];

  b.innerHTML=
    '<div class="adm-st" style="display:flex;align-items:center;gap:.6rem">Estat del servei de correu'
    +'<button class="bsm bsm-o" style="padding:.15rem .6rem;font-size:.72rem;margin-left:auto"'+dataAttr('onclick','_admLoadMailStatus',[])+'>&#8635; Comprovar</button>'
    +'</div>'
    +'<div id="mailStatusBox" style="margin-bottom:1.5rem"><p style="padding:.5rem 0;color:var(--gray);font-size:.85rem">Comprovant…</p></div>'
    +'<div class="crud-form">'
    +'<div class="crud-form-title">&#10010; Nou Usuari</div>'
    +'<div class="af-row">'
    +mkField('Nom d\'usuari (login) *','au_username','text','','anna.garcia')
    +mkField('Nom complet *','au_nom','text','','Anna García')
    +'</div>'
    +'<div class="af-row">'
    +mkField('Correu electrònic','au_email','email','','anna@fcta.cat')
    +mkField('Rol *','au_rol','select','editor','',roles)
    +'</div>'
    +'<div class="af-row">'
    +mkField('Contrasenya inicial *','au_pass','password','','Mínim 8 caràcters')
    +mkField('Confirma contrasenya *','au_pass2','password','','Repeteix la contrasenya')
    +'</div>'
    +'<p style="font-size:.82rem;color:var(--gray);margin:.25rem 0 .75rem">&#128274; L\'usuari haurà de canviar la contrasenya en el primer accés.</p>'
    +'<button class="a-sub success"'+dataAttr('onclick','admAddUser',[])+'>&#10010; Crear usuari</button>'
    +'</div>'
    +'<div class="adm-st">Usuaris del sistema <span class="crud-count-badge" id="usersCount">…</span></div>'
    +'<div id="usersTableWrap" style="overflow-x:auto"><p style="padding:1rem;color:var(--gray)">Carregant…</p></div>'
    +'<div id="totpSetupPanel" style="display:none"></div>'
    +'<div class="adm-st" style="margin-top:2rem">Registre d\'auditoria <span class="crud-count-badge" id="auditCount">…</span></div>'
    +'<div id="auditTableWrap" style="overflow-x:auto"><p style="padding:1rem;color:var(--gray)">Carregant…</p></div>';

  _admLoadUsers();
  _admLoadAudit();
  _admLoadMailStatus();
}

function _admLoadMailStatus(){
  var box = document.getElementById('mailStatusBox');
  if (box) box.innerHTML = '<p style="padding:.5rem 0;color:var(--gray);font-size:.85rem">Comprovant…</p>';
  admApiFetch('/api/mail-status', {}, function(s){
    if (!box) return;
    var ok = s.configured && s.connected;
    var color = ok ? '#059669' : '#dc2626';
    var icon  = ok ? '✅' : '⚠️';
    var lines = [];
    lines.push('<div style="font-weight:700;color:'+color+'">'+icon+' '+(ok ? 'Correu operatiu' : 'Correu NO operatiu')+'</div>');
    lines.push('<div style="font-size:.82rem;color:var(--gray);margin-top:.3rem">');
    lines.push('Configurat (MAIL_USER/MAIL_PASS definits): <strong>'+(s.configured?'Sí':'No')+'</strong><br>');
    if (s.user) lines.push('Compte: <strong>'+escHtml(s.user)+'</strong><br>');
    lines.push('Connexió SMTP verificada: <strong>'+(s.connected?'Sí':'No')+'</strong>');
    if (s.lastCheckAt) lines.push(' ('+new Date(s.lastCheckAt).toLocaleString('ca-ES')+')');
    if (s.lastError) lines.push('<br><span style="color:#dc2626">Darrer error: '+escHtml(s.lastError)+'</span>');
    lines.push('</div>');
    if (!s.configured) {
      lines.push('<div style="font-size:.8rem;color:var(--gray);margin-top:.5rem">→ Defineix <code>MAIL_USER</code>, <code>MAIL_PASS</code> i <code>MAIL_FROM</code> a les variables d\'entorn del servidor (Railway → Variables) i torna a desplegar.</div>');
    } else if (!s.connected) {
      lines.push('<div style="font-size:.8rem;color:var(--gray);margin-top:.5rem">→ Les variables existeixen però la connexió falla. Revisa el missatge d\'error de dalt: sol ser una contrasenya d\'aplicació incorrecta/caducada, o Gmail bloquejant l\'inici de sessió des d\'un IP nou (revisa myaccount.google.com/notifications).</div>');
    }
    // Diagnòstic detallat de com arriben (o no) les variables al procés —
    // distingeix "no definida", "definida buida" i "amb espais sobrants",
    // que des de Railway es veuen totes tres igual ("definida").
    if (s.raw) {
      var rawRows = Object.keys(s.raw).map(function(k){
        var r = s.raw[k];
        var st = !r.present ? '<span style="color:#dc2626">no present a process.env</span>'
          : r.length === 0 ? '<span style="color:#dc2626">present però buida</span>'
          : r.trimmedDiffers ? '<span style="color:#b45309">present (' + r.length + ' car.) amb espais en blanc sobrants</span>'
          : '<span style="color:#059669">present (' + r.length + ' car.)</span>';
        return '<tr><td style="padding:2px 8px 2px 0;font-family:monospace">'+k+'</td><td>'+st+'</td></tr>';
      }).join('');
      lines.push('<details style="margin-top:.6rem"><summary style="cursor:pointer;font-size:.78rem;color:var(--gray)">Diagnòstic detallat de les variables</summary>'
        +'<table style="font-size:.78rem;margin-top:.4rem">'+rawRows+'</table></details>');
    }
    box.innerHTML = '<div class="bk-preview-box" style="border-color:'+color+'">'+lines.join('')+'</div>';
  }, function(err){
    if (box) box.innerHTML = '<p style="padding:.5rem 0;color:#dc2626;font-size:.85rem">Error consultant l\'estat: '+escHtml(err)+'</p>';
  });
}

function _admRenderUsersTable(users){
  _admUsers = users;
  var cnt = document.getElementById('usersCount');
  if (cnt) cnt.textContent = users.length;
  var rows = users.map(function(u){
    var rolBadge = u.role === 'superadmin'
      ? '<span style="background:#1B3A6B;color:#fff;padding:2px 8px;border-radius:12px;font-size:.75rem">Superadmin</span>'
      : '<span style="background:#5d4037;color:#fff;padding:2px 8px;border-radius:12px;font-size:.75rem">Editor</span>';
    var statusBadge = u.actiu
      ? '<span style="color:#059669;font-weight:600">● Actiu</span>'
      : '<span style="color:#dc2626;font-weight:600">● Inactiu</span>';
    var mustChg = u.must_change_pass
      ? '<span title="Ha de canviar contrasenya" style="background:#f59e0b;color:#fff;padding:2px 6px;border-radius:10px;font-size:.72rem;margin-left:4px">&#128274;PWD</span>'
      : '';
    var totpBadge = u.totp_enabled
      ? '<span style="background:#059669;color:#fff;padding:2px 8px;border-radius:12px;font-size:.75rem">2FA &#10003;</span>'
      : '<span style="background:#6b7280;color:#fff;padding:2px 8px;border-radius:12px;font-size:.75rem">Sense 2FA</span>';
    var totpBtn = u.totp_enabled
      ? '<button class="usr-act-btn danger" title="Revocar 2FA"'+dataAttr('onclick','admResetTotp',[u.id])+'>&#128274;</button>'
      : '<button class="usr-act-btn ok" title="Configurar 2FA"'+dataAttr('onclick','admShowTotpSetup',[u.id])+'>&#128272;</button>';
    var resetPassBtn = '<button class="usr-act-btn muted" title="Restablir contrasenya"'+dataAttr('onclick','admResetPass',[u.id])+'>&#128273;</button>';
    return '<tr>'
      +'<td style="font-weight:600">'+escHtml(u.username)+'</td>'
      +'<td>'+escHtml(u.nom)+mustChg+'</td>'
      +'<td style="color:var(--gray);font-size:.83rem">'+escHtml(u.email||'—')+'</td>'
      +'<td>'+rolBadge+'</td>'
      +'<td>'+statusBadge+'</td>'
      +'<td>'+totpBadge+'</td>'
      +'<td><div class="usr-acts">'
        +totpBtn+resetPassBtn
        +'<button class="usr-act-btn '+(u.actiu?'warn':'ok')+'" title="'+(u.actiu?'Desactivar':'Activar')+'"'+dataAttr('onclick','admToggleUser',[u.id])+'>'+(u.actiu?'&#9208;':'&#9654;')+'</button>'
        +'<button class="usr-act-btn danger" title="Eliminar usuari"'+dataAttr('onclick','admDelUser',[u.id])+'>&#128465;</button>'
      +'</div></td>'
      +'</tr>';
  }).join('');

  var wrap = document.getElementById('usersTableWrap');
  if (!wrap) return;
  wrap.innerHTML =
    '<table class="adm-grid-table">'
    +'<thead><tr style="background:var(--offwhite);text-align:left">'
    +'<th style="padding:8px 10px">Usuari</th><th style="padding:8px 10px">Nom</th>'
    +'<th style="padding:8px 10px">Email</th><th style="padding:8px 10px">Rol</th>'
    +'<th style="padding:8px 10px">Estat</th><th style="padding:8px 10px">2FA</th>'
    +'<th style="padding:8px 10px">Accions</th>'
    +'</tr></thead>'
    +'<tbody>'+rows+'</tbody>'
    +'</table>';
}

function _admLoadUsers(){
  admApiFetch('/api/users', {}, function(data){
    _admRenderUsersTable(data);
  }, function(err){
    var wrap = document.getElementById('usersTableWrap');
    if (wrap) wrap.innerHTML = '<p style="padding:1rem;color:#dc2626">Error: '+escHtml(err)+'</p>';
  });
}

function _admLoadAudit(offset){
  offset = offset || 0;
  admApiFetch('/api/audit?limit=50&offset='+offset, {}, function(data){
    var cnt = document.getElementById('auditCount');
    if (cnt) cnt.textContent = data.total;
    var rows = (data.rows || []).map(function(r){
      var ts = r.ts ? r.ts.replace('T',' ').slice(0,19) : '—';
      return '<tr>'
        +'<td style="font-size:.78rem;color:var(--gray);white-space:nowrap;padding:5px 10px">'+escHtml(ts)+'</td>'
        +'<td style="padding:5px 10px;font-weight:600;font-size:.83rem">'+escHtml(r.username)+'</td>'
        +'<td style="padding:5px 10px"><span style="background:var(--offwhite);padding:2px 7px;border-radius:10px;font-size:.78rem;font-family:monospace">'+escHtml(r.action)+'</span></td>'
        +'<td style="padding:5px 10px;font-size:.82rem;color:var(--gray)">'+escHtml(r.detail||'')+'</td>'
        +'</tr>';
    }).join('');

    var nav = '';
    if (offset > 0) nav += '<button class="bsm bsm-o"'+dataAttr('onclick','_admLoadAudit',[offset-50])+'>&#8592; Anterior</button> ';
    if (offset + 50 < data.total) nav += '<button class="bsm bsm-o"'+dataAttr('onclick','_admLoadAudit',[offset+50])+'>Següent &#8594;</button>';

    var wrap = document.getElementById('auditTableWrap');
    if (!wrap) return;
    wrap.innerHTML =
      '<table class="adm-grid-table">'
      +'<thead><tr style="background:var(--offwhite);text-align:left">'
      +'<th style="padding:6px 10px">Data/hora</th><th style="padding:6px 10px">Usuari</th>'
      +'<th style="padding:6px 10px">Acció</th><th style="padding:6px 10px">Detall</th>'
      +'</tr></thead>'
      +'<tbody>'+rows+'</tbody>'
      +'</table>'
      +(nav ? '<div style="padding:.75rem;display:flex;gap:.5rem">'+nav+'</div>' : '');
  }, function(err){
    var wrap = document.getElementById('auditTableWrap');
    if (wrap) wrap.innerHTML = '<p style="padding:1rem;color:#dc2626">Error: '+escHtml(err)+'</p>';
  });
}

function admAddUser(){
  var username = fv('au_username'), nom = fv('au_nom');
  var email    = fv('au_email'),    rol = fv('au_rol');
  var pass     = fv('au_pass'),     pass2 = fv('au_pass2');

  if (!username || !nom || !pass) { toast('Usuari, nom i contrasenya són obligatoris','⚠️'); return; }
  if (pass !== pass2)  { toast('Les contrasenyes no coincideixen','⚠️'); return; }
  if (pass.length < 8) { toast('La contrasenya ha de tenir almenys 8 caràcters','⚠️'); return; }

  admApiFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username: username, nom: nom, email: email, role: rol, password: pass })
  }, function(d){
    var msg = 'Usuari "'+username+'" creat.';
    if (d && d.mailSent) msg += ' Email d\'activació enviat a '+email+'.';
    else if (email) msg += ' (Email no configurat al servidor — comunica la contrasenya manualment.)';
    toast(msg, '👤');
    ['au_username','au_nom','au_email','au_pass','au_pass2'].forEach(function(id){
      var el = document.getElementById(id); if (el) el.value = '';
    });
    _admLoadUsers();
    _admLoadAudit();
  });
}

function admDelUser(id){
  var u = _admUsers.filter(function(x){ return x.id===id; })[0];
  if (!u) return;
  confirmDel(u.username + ' ('+u.nom+')', function(){
    admApiFetch('/api/users/'+id, { method:'DELETE' }, function(){
      toast('Usuari eliminat','🗑️');
      _admLoadUsers();
      _admLoadAudit();
    });
  });
}

function admToggleUser(id){
  var u = _admUsers.filter(function(x){ return x.id===id; })[0];
  if (!u) return;
  admApiFetch('/api/users/'+id, {
    method: 'PATCH',
    body: JSON.stringify({ actiu: !u.actiu })
  }, function(){
    toast(u.nom+' '+(u.actiu?'desactivat':'activat'),'👤');
    _admLoadUsers();
    _admLoadAudit();
  });
}

function admResetPass(id){
  var u = _admUsers.filter(function(x){ return x.id===id; })[0];
  if (!u) return;
  var newPass = prompt('Nova contrasenya temporal per a "'+u.username+'" (mínim 8 caràcters):');
  if (!newPass) return;
  if (newPass.length < 8) { toast('Mínim 8 caràcters','⚠️'); return; }
  admApiFetch('/api/users/'+id+'/reset-password', {
    method: 'POST',
    body: JSON.stringify({ password: newPass })
  }, function(d){
    var msg = 'Contrasenya de "'+u.username+'" restablerta.';
    if (d && d.mailSent) msg += ' Email enviat a '+u.email+'.';
    else if (u.email) msg += ' (Email no configurat — comunica la contrasenya manualment.)';
    toast(msg, '🔑');
    _admLoadUsers();
    _admLoadAudit();
  });
}

function admResetTotp(id){
  var u = _admUsers.filter(function(x){ return x.id===id; })[0];
  if (!u) return;
  if (!confirm('Revocar el 2FA de "'+u.nom+'"?\nHaurà de tornar a configurar Google Authenticator.')) return;
  admApiFetch('/api/users/'+id, {
    method: 'PATCH',
    body: JSON.stringify({ totp_secret: null, totp_enabled: false })
  }, function(){
    toast('2FA revocat per a '+u.nom,'🔓');
    _admLoadUsers();
    _admLoadAudit();
    var panel = document.getElementById('totpSetupPanel');
    if (panel) { panel.style.display='none'; panel.innerHTML=''; }
  });
}

function admShowTotpSetup(id){
  var u = _admUsers.filter(function(x){ return x.id===id; })[0];
  if (!u) { toast('Usuari no trobat','⚠️'); return; }

  var secret = new OTPAuth.Secret({ size: 20 });
  var secretB32 = secret.base32;

  var totp = new OTPAuth.TOTP({
    issuer: 'FCTA Admin',
    label: u.email || u.username,
    algorithm: 'SHA1', digits: 6, period: 30,
    secret: secret
  });
  var uri = totp.toString();

  var panel = document.getElementById('totpSetupPanel');
  if (!panel) return;
  panel.style.display = '';
  panel.innerHTML =
    '<div class="crud-form" style="margin-top:1.5rem;border:2px solid var(--navy-light)">'
    +'<div class="crud-form-title">&#128272; Configurar 2FA per a '+escHtml(u.nom)+'</div>'
    +'<div style="display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start">'
    +'<div>'
    +'<p style="font-size:.88rem;color:var(--gray);margin:0 0 .75rem">1. Obre <strong>Google Authenticator</strong> i escaneja el QR:</p>'
    +'<div id="totpQr" style="background:#fff;padding:10px;display:inline-block;border-radius:8px"></div>'
    +'</div>'
    +'<div style="flex:1;min-width:220px">'
    +'<p style="font-size:.88rem;color:var(--gray);margin:0 0 .5rem">2. O introdueix manualment el secret:</p>'
    +'<code style="background:var(--offwhite);padding:6px 10px;border-radius:6px;font-size:.82rem;word-break:break-all;display:block;margin-bottom:1rem">'+escHtml(secretB32)+'</code>'
    +'<p style="font-size:.88rem;color:var(--gray);margin:0 0 .5rem">3. Introdueix el codi generat per verificar:</p>'
    +'<input type="text" id="totpVerifyCode" placeholder="000000" maxlength="6" inputmode="numeric"'
    +' style="width:140px;font-size:1.3rem;letter-spacing:.2em;text-align:center;padding:8px;border:2px solid var(--navy-light);border-radius:8px"'
    +dataEnterAttr('admVerifyTotp',[id,secretB32])+'>'
    +'<div style="margin-top:.75rem;display:flex;gap:.5rem">'
    +'<button class="a-sub success"'+dataAttr('onclick','admVerifyTotp',[id,secretB32])+'>&#10003; Verificar i activar</button>'
    +'<button class="a-sub a-del"'+dataAttr('onclick','admCancelTotpSetup',[])+'>Cancel·lar</button>'
    +'</div>'
    +'<div id="totpVerifyErr" style="display:none;color:#dc2626;font-size:.85rem;margin-top:.5rem">Codi incorrecte.</div>'
    +'</div>'
    +'</div>'
    +'</div>';

  panel.scrollIntoView({ behavior:'smooth', block:'nearest' });
  try {
    var qrEl = document.getElementById('totpQr');
    qrEl.innerHTML = '';
    new QRCode(qrEl, { text: uri, width: 160, height: 160, correctLevel: QRCode.CorrectLevel.M });
  } catch(ex) { document.getElementById('totpQr').textContent = 'Error generant QR'; }
}

function admVerifyTotp(id, secretB32){
  var code = (document.getElementById('totpVerifyCode')||{}).value || '';
  var errEl = document.getElementById('totpVerifyErr');
  var valid = false;
  try {
    var totp = new OTPAuth.TOTP({ secret: OTPAuth.Secret.fromBase32(secretB32), digits:6, period:30 });
    valid = (totp.validate({ token: code.replace(/\s/g,''), window:1 }) !== null);
  } catch(ex) { valid = false; }

  if (valid) {
    admApiFetch('/api/users/'+id, {
      method: 'PATCH',
      body: JSON.stringify({ totp_secret: secretB32, totp_enabled: true })
    }, function(){
      var u = _admUsers.filter(function(x){ return x.id===id; })[0];
      toast('2FA activat per a '+(u?u.nom:'usuari')+' ✓','🔐');
      _admLoadUsers();
      _admLoadAudit();
      var panel = document.getElementById('totpSetupPanel');
      if (panel) { panel.style.display='none'; panel.innerHTML=''; }
    });
  } else {
    if (errEl) errEl.style.display = 'block';
    document.getElementById('totpVerifyCode').value = '';
    document.getElementById('totpVerifyCode').focus();
  }
}

function admCancelTotpSetup(){
  var panel = document.getElementById('totpSetupPanel');
  if (panel) { panel.style.display='none'; panel.innerHTML=''; }
}

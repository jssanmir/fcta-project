// auth.js – Login / logout / session management (server-side auth)
// ──────────────────────────────────────────────────────────

var admSession = null;

function openAdmin(){
  if(admSession){ openAdm(); return; }
  document.getElementById('loginOverlay').style.display='flex';
  setTimeout(function(){ var u=document.getElementById('loginUser'); if(u)u.focus(); },100);
}

function doLogin(){
  var u=(document.getElementById('loginUser')||{}).value||'';
  var p=(document.getElementById('loginPass')||{}).value||'';
  var btn=document.querySelector('.login-submit');
  var err=document.getElementById('loginError');

  if(!u||!p){
    err.style.display='block';
    err.textContent='Omple l\'usuari i la contrasenya.';
    return;
  }

  // Desactiva el botó mentre s'autentica
  if(btn) btn.disabled=true;

  fetch('/api/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({username:u.trim(),password:p})
  })
  .then(function(res){ return res.json().then(function(d){ return {ok:res.ok,data:d}; }); })
  .then(function(r){
    if(r.ok){
      // Desa el token i obre el panell
      window.dbSetToken(r.data.token);
      admSession={nom:r.data.nom, role:r.data.role, user:u.trim()};
      document.getElementById('loginOverlay').style.display='none';
      err.style.display='none';
      document.getElementById('loginUser').value='';
      document.getElementById('loginPass').value='';
      openAdm();
    } else {
      err.style.display='block';
      err.textContent=r.data.error||'Usuari o contrasenya incorrectes.';
      document.getElementById('loginPass').value='';
      document.getElementById('loginPass').focus();
      setTimeout(function(){ if(btn) btn.disabled=false; },2000);
    }
  })
  .catch(function(){
    err.style.display='block';
    err.textContent='Error de connexió. Comprova que el servidor estigui en marxa.';
    if(btn) btn.disabled=false;
  });
}

function cancelLogin(){
  document.getElementById('loginOverlay').style.display='none';
  document.getElementById('loginError').style.display='none';
  document.getElementById('loginUser').value='';
  document.getElementById('loginPass').value='';
}

function doLogout(){
  admSession=null;
  window.dbClearToken();
  closeAdm();
  toast('Sessió tancada correctament.','&#128682;');
}

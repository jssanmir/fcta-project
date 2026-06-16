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
      window.dbSetToken(r.data.token);
      admSession={nom:r.data.nom, role:r.data.role, user:u.trim()};
      // Comprova si l'usuari té 2FA actiu
      var dbUser = (DB.users||[]).filter(function(x){ return x.email===u.trim()||x.nom===u.trim(); })[0];
      if(dbUser && dbUser.totpEnabled && dbUser.totpSecret){
        // Guarda sessió pendent i mostra pas TOTP
        window._pendingTotpUser = dbUser;
        document.getElementById('loginUser').value='';
        document.getElementById('loginPass').value='';
        document.getElementById('loginStep1').style.display='none';
        document.getElementById('totpStep').style.display='';
        document.getElementById('totpError').style.display='none';
        setTimeout(function(){ var c=document.getElementById('totpCode'); if(c)c.focus(); },100);
      } else {
        document.getElementById('loginOverlay').style.display='none';
        err.style.display='none';
        document.getElementById('loginUser').value='';
        document.getElementById('loginPass').value='';
        openAdm();
      }
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

function doTotp(){
  var code=(document.getElementById('totpCode')||{}).value||'';
  var err=document.getElementById('totpError');
  var u=window._pendingTotpUser;
  if(!u||!u.totpSecret){ err.style.display='block'; err.textContent='Error intern. Torna a iniciar sessió.'; return; }
  var valid=false;
  try{
    var totp=new OTPAuth.TOTP({ secret: OTPAuth.Secret.fromBase32(u.totpSecret), digits:6, period:30 });
    valid=(totp.validate({ token: code.replace(/\s/g,''), window:1 }) !== null);
  } catch(ex){ valid=false; }
  if(valid){
    window._pendingTotpUser=null;
    document.getElementById('loginOverlay').style.display='none';
    document.getElementById('totpStep').style.display='none';
    document.getElementById('loginStep1').style.display='';
    document.getElementById('totpCode').value='';
    err.style.display='none';
    openAdm();
  } else {
    err.style.display='block';
    err.textContent='Codi incorrecte. Torna-ho a intentar.';
    document.getElementById('totpCode').value='';
    document.getElementById('totpCode').focus();
  }
}

function cancelLogin(){
  document.getElementById('loginOverlay').style.display='none';
  document.getElementById('loginError').style.display='none';
  document.getElementById('totpError').style.display='none';
  document.getElementById('loginUser').value='';
  document.getElementById('loginPass').value='';
  document.getElementById('totpCode').value='';
  document.getElementById('loginStep1').style.display='';
  document.getElementById('totpStep').style.display='none';
  admSession=null;
  window._pendingTotpUser=null;
  if(window.dbClearToken) window.dbClearToken();
}

function doLogout(){
  admSession=null;
  window.dbClearToken();
  closeAdm();
  toast('Sessió tancada correctament.','&#128682;');
}

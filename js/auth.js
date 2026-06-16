// auth.js – Login / logout / session management
// Flux: 1) Contrasenya  2) Canvi obligatori  3) TOTP (si actiu)
// ──────────────────────────────────────────────────────────

var admSession = null;

// Credencials pendents durant el flux MFA
window._pendingLogin = null;

// ── Helpers de pas (step) ──────────────────────────────────
function _showLoginStep(stepId) {
  ['loginStep1','changePassStep','totpStep'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = (id === stepId) ? '' : 'none';
  });
}

function _loginError(id, msg) {
  var el = document.getElementById(id);
  if (el) { el.style.display = 'block'; el.textContent = msg; }
}
function _loginErrorClear(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// ── Obrir overlay de login ─────────────────────────────────
function openAdmin() {
  if (admSession) { openAdm(); return; }
  document.getElementById('loginOverlay').style.display = 'flex';
  _showLoginStep('loginStep1');
  setTimeout(function() {
    var u = document.getElementById('loginUser');
    if (u) u.focus();
  }, 100);
}

// ── PAS 1: Contrasenya ─────────────────────────────────────
function doLogin() {
  var u   = (document.getElementById('loginUser') || {}).value || '';
  var p   = (document.getElementById('loginPass') || {}).value || '';
  var btn = document.querySelector('.login-submit');

  _loginErrorClear('loginError');

  if (!u || !p) {
    _loginError('loginError', 'Omple l\'usuari i la contrasenya.');
    return;
  }

  if (btn) btn.disabled = true;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: u.trim(), password: p })
  })
  .then(function(res) { return res.json().then(function(d) { return { ok: res.ok, data: d }; }); })
  .then(function(r) {
    if (r.ok) {
      if (r.data.mfaRequired) {
        // Guarda credencials per al segon intent amb codi TOTP
        window._pendingLogin = { username: u.trim(), password: p };
        document.getElementById('loginUser').value = '';
        document.getElementById('loginPass').value = '';
        _showLoginStep('totpStep');
        _loginErrorClear('totpError');
        setTimeout(function() {
          var c = document.getElementById('totpCode');
          if (c) { c.value = ''; c.focus(); }
        }, 100);
      } else if (r.data.mustChangePassword) {
        // Guarda sessió i mostra pas de canvi de contrasenya
        window.dbSetToken(r.data.token);
        admSession = { nom: r.data.nom, role: r.data.role, user: u.trim() };
        document.getElementById('loginUser').value = '';
        document.getElementById('loginPass').value = '';
        _showLoginStep('changePassStep');
        _loginErrorClear('changePassError');
        setTimeout(function() {
          var f = document.getElementById('cpCurrentPass');
          if (f) f.focus();
        }, 100);
      } else {
        window.dbSetToken(r.data.token);
        admSession = { nom: r.data.nom, role: r.data.role, user: u.trim() };
        _finishLogin();
      }
    } else {
      _loginError('loginError', r.data.error || 'Usuari o contrasenya incorrectes.');
      document.getElementById('loginPass').value = '';
      document.getElementById('loginPass').focus();
      setTimeout(function() { if (btn) btn.disabled = false; }, 2000);
    }
  })
  .catch(function() {
    _loginError('loginError', 'Error de connexió. Comprova que el servidor estigui en marxa.');
    if (btn) btn.disabled = false;
  });
}

// ── PAS 2: TOTP (2FA) ──────────────────────────────────────
function doTotp() {
  var code = (document.getElementById('totpCode') || {}).value || '';
  var pend = window._pendingLogin;

  _loginErrorClear('totpError');

  if (!pend) {
    _loginError('totpError', 'Sessió expirada. Torna a iniciar sessió.');
    return;
  }
  if (!code || code.replace(/\s/g, '').length !== 6) {
    _loginError('totpError', 'Introdueix el codi de 6 dígits.');
    return;
  }

  var btn = document.getElementById('totpSubmitBtn');
  if (btn) btn.disabled = true;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: pend.username,
      password: pend.password,
      totpCode: code.replace(/\s/g, '')
    })
  })
  .then(function(res) { return res.json().then(function(d) { return { ok: res.ok, data: d }; }); })
  .then(function(r) {
    if (r.ok) {
      window._pendingLogin = null;
      window.dbSetToken(r.data.token);
      admSession = { nom: r.data.nom, role: r.data.role, user: pend.username };
      document.getElementById('totpCode').value = '';
      if (r.data.mustChangePassword) {
        _showLoginStep('changePassStep');
        _loginErrorClear('changePassError');
        setTimeout(function() {
          var f = document.getElementById('cpCurrentPass');
          if (f) f.focus();
        }, 100);
      } else {
        _finishLogin();
      }
    } else {
      _loginError('totpError', r.data.error || 'Codi incorrecte. Torna-ho a intentar.');
      document.getElementById('totpCode').value = '';
      document.getElementById('totpCode').focus();
      setTimeout(function() { if (btn) btn.disabled = false; }, 1500);
    }
  })
  .catch(function() {
    _loginError('totpError', 'Error de connexió.');
    if (btn) btn.disabled = false;
  });
}

// ── PAS 3: Canvi obligatori de contrasenya ─────────────────
function doChangePass() {
  var current  = (document.getElementById('cpCurrentPass')  || {}).value || '';
  var newPass  = (document.getElementById('cpNewPass')      || {}).value || '';
  var confirm  = (document.getElementById('cpConfirmPass')  || {}).value || '';
  var btn      = document.getElementById('cpSubmitBtn');

  _loginErrorClear('changePassError');

  if (!current || !newPass || !confirm) {
    _loginError('changePassError', 'Omple tots els camps.');
    return;
  }
  if (newPass !== confirm) {
    _loginError('changePassError', 'Les contrasenyes no coincideixen.');
    return;
  }
  if (newPass.length < 10) {
    _loginError('changePassError', 'Mínim 10 caràcters.');
    return;
  }
  if (!/[A-Z]/.test(newPass) || !/[a-z]/.test(newPass) || !/[0-9]/.test(newPass)) {
    _loginError('changePassError', 'Ha de contenir majúscules, minúscules i números.');
    return;
  }

  if (btn) btn.disabled = true;

  fetch('/api/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (window.dbGetToken() || '')
    },
    body: JSON.stringify({ currentPassword: current, newPassword: newPass })
  })
  .then(function(res) { return res.json().then(function(d) { return { ok: res.ok, data: d }; }); })
  .then(function(r) {
    if (r.ok) {
      document.getElementById('cpCurrentPass').value  = '';
      document.getElementById('cpNewPass').value      = '';
      document.getElementById('cpConfirmPass').value  = '';
      toast('Contrasenya canviada correctament.', '🔐');
      _finishLogin();
    } else {
      _loginError('changePassError', r.data.error || 'Error al canviar la contrasenya.');
      setTimeout(function() { if (btn) btn.disabled = false; }, 1500);
    }
  })
  .catch(function() {
    _loginError('changePassError', 'Error de connexió.');
    if (btn) btn.disabled = false;
  });
}

// ── Finalitzar login i obrir admin ────────────────────────
function _finishLogin() {
  document.getElementById('loginOverlay').style.display = 'none';
  _showLoginStep('loginStep1');
  openAdm();
}

// ── Cancel·lar / tancar login ──────────────────────────────
function cancelLogin() {
  document.getElementById('loginOverlay').style.display = 'none';
  _showLoginStep('loginStep1');
  ['loginError','totpError','changePassError'].forEach(function(id) { _loginErrorClear(id); });
  ['loginUser','loginPass','totpCode','cpCurrentPass','cpNewPass','cpConfirmPass'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  admSession = null;
  window._pendingLogin = null;
  if (window.dbClearToken) window.dbClearToken();
}

// ── Logout ─────────────────────────────────────────────────
function doLogout() {
  admSession = null;
  window.dbClearToken();
  closeAdm();
  toast('Sessió tancada correctament.', '&#128682;');
}

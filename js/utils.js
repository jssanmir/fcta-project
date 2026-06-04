// utils.js – Toast notifications & mobile menu
// ──────────────────────────────────────────────────────────

// ── TOAST ─────────────────────────────────────────────────────
function toast(msg,icon){
  var t=document.getElementById('toast');
  document.getElementById('tMsg').textContent=msg;
  document.getElementById('tIcon').innerHTML=icon||'&#9989;';
  t.style.display='flex';
  clearTimeout(window._tt);
  window._tt=setTimeout(function(){t.style.display='none';},4000);
}

// ── MOBILE MENU ───────────────────────────────────────────────
function toggleMenu(){
  var nl=document.getElementById('navLinks');
  if(nl.style.display==='flex'){nl.style.display='none';}
  else{nl.style.cssText='display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(15,36,71,.98);padding:1.2rem;z-index:999;gap:.2rem';}
}
document.addEventListener('click',function(e){
  var nl=document.getElementById('navLinks');
  var ham=document.querySelector('.hamburger');
  if(nl&&nl.style.display==='flex'&&!nl.contains(e.target)&&e.target!==ham){nl.style.display='none';}
});

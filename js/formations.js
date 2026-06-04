// formations.js – Formations grid render
// ──────────────────────────────────────────────────────────

function renderForm(){
  var lc = {T\u00e8cnics:'cb-al', General:'cb-fed', Clubs:'cb-camp'};
  document.getElementById('formGrid').innerHTML = DB.formations.map(function(f){
    var badgeCls = lc[f.level] || 'cb-fed';
    var linksHtml = f.links.map(function(l){
      var circKey = null;
      if(l.url && l.url.indexOf('CIRC_2607') > -1) circKey = 'CIRC-2607';
      if(l.url && l.url.indexOf('CIRC_2504') > -1) circKey = 'CIRC-2504';
      if(l.url && l.url.indexOf('CIRC_2511') > -1) circKey = 'CIRC-2511';
      if(l.url && l.url.indexOf('CIRC_2410') > -1) circKey = 'CIRC-2410';
      if(l.url && l.url.indexOf('CIRC_2435') > -1) circKey = 'CIRC-2435';
      if(l.url && l.url.indexOf('CIRC_2447') > -1) circKey = 'CIRC-2447';
      if(circKey){
        return '<button onclick="openPDF(\'' + circKey + '\')" class="form-link" style="background:none;border:none;padding:0;text-align:left;cursor:pointer;color:var(--navy-light);font-family:inherit;font-size:.78rem">&#128065; ' + l.txt.replace('\ud83d\udcc4 ','') + '</button>';
      }
      return '<a href="' + l.url + '" target="_blank" class="form-link">' + l.txt + '</a>';
    }).join('');
    return '<div class="form-card">'
      + '<div class="form-card-icon">' + f.icon + '</div>'
      + '<span class="cbadge ' + badgeCls + '">' + f.level + '</span>'
      + '<h3>' + f.title + '</h3>'
      + '<p>' + f.desc + '</p>'
      + '<div class="form-meta"><span>&#128197; <strong>' + f.dates + '</strong></span><span>&#128101; <strong>' + f.places + '</strong></span></div>'
      + '<div class="form-links">' + linksHtml + '</div>'
      + '<button class="bsm bsm-n" onclick="toast(\'Redirigint a la inscripci\u00f3...\',\'&#127891;\')">Inscriu-te</button>'
      + '</div>';
  }).join('');
}

/* La Reine du Nord est pensée pour le téléphone uniquement.
   Sur un écran large (ordinateur, tablette), la page s'affiche dans un cadre de téléphone,
   avec un QR code pour la retrouver sur mobile. */
(function () {
  var full = false;
  try { full = /[?&]ecran=1/.test(location.search) || sessionStorage.getItem('rdn-ecran') === '1'; if (/[?&]ecran=1/.test(location.search)) sessionStorage.setItem('rdn-ecran', '1'); } catch (e) {}
  if (full || window.innerWidth < 760) return;
  if (window.stop) window.stop();
  var src = location.href;
  var title = document.title || 'La Reine du Nord';
  var html = '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + title + '</title>' +
    '<style>' +
    '*{box-sizing:border-box}html,body{height:100%;margin:0}' +
    'body{background:#23161b;color:#f6f1ec;font-family:"IBM Plex Sans","Segoe UI",system-ui,sans-serif;display:flex;align-items:center;justify-content:center;gap:clamp(32px,6vw,96px);padding:24px;overflow:hidden}' +
    '.ph{flex:none;width:414px;height:868px;transform-origin:center;border-radius:56px;background:#0f0a0b;padding:12px;box-shadow:0 0 0 2px #4a3b3e,0 40px 90px rgba(0,0,0,.5);position:relative}' +
    '.ph iframe{display:block;width:390px;height:844px;border:0;border-radius:44px;background:#f3ede7}' +
    '.ph p{position:absolute;inset:12px;margin:0;display:grid;place-items:center;text-align:center;padding:40px;color:#80706f;font-size:15px;z-index:-1}' +
    '.side{max-width:340px;display:flex;flex-direction:column;gap:18px}' +
    '.k{font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#f2b544;margin:0}' +
    'h1{margin:0;font-size:44px;line-height:1;font-weight:800;text-transform:uppercase}' +
    '.side p{margin:0;font-size:17px;line-height:1.5;color:#e3d6cf}' +
    '.qr{background:#f6f1ec;border-radius:16px;padding:14px;width:200px}.qr img{display:block;width:100%;height:auto}' +
    'a{color:#c9b8b0;font-size:14px}a:hover{color:#f6f1ec}' +
    '@media (max-width:900px){.side{display:none}}' +
    '</style></head>' +
    '<body><div class="ph" id="ph"><p>Si l’aperçu ne s’affiche pas, scanne le QR code avec ton téléphone.</p><iframe src="' + src.replace(/"/g, '&quot;') + '" title="' + title + ' sur téléphone" allow="fullscreen; clipboard-write"></iframe></div>' +
    '<div class="side"><p class="k">Version mobile</p><h1>La Reine du Nord se joue sur téléphone</h1>' +
    '<p>Scanne le QR code pour rouler sur Paris-Roubaix Femmes depuis ton mobile. À gauche, tu as l’aperçu tel qu’il s’affiche sur un téléphone.</p>' +
    '<div class="qr"><img src="qr.png" alt="QR code vers le site La Reine du Nord"></div>' +
    '<a href="?ecran=1">Ouvrir quand même en grand écran</a></div></body>';
  document.documentElement.innerHTML = html;
  function fit() { var ph = document.getElementById('ph'); if (!ph) return; var s = Math.min(1, (window.innerHeight - 48) / 868); ph.style.transform = 'scale(' + s + ')'; ph.style.margin = (-(868 * (1 - s)) / 2) + 'px ' + (-(414 * (1 - s)) / 2) + 'px'; }
  fit(); window.addEventListener('resize', function () { if (window.innerWidth < 760) location.reload(); else fit(); });
})();

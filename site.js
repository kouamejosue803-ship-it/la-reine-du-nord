(() => {
'use strict';
const $ = s => document.querySelector(s);

/* Site La Reine du Nord : scripts partagés par toutes les pages */
/* ---------- Données (vérifiées, avril 2026) ---------- */
const FEMMES = [
  { y:2026, n:'Franziska Koch', c:'GER', team:'FDJ United-SUEZ', t:'Bat Marianne Vos au sprint sur la piste du vélodrome, le jour où les femmes ferment la journée pour la première fois.' },
  { y:2025, n:'Pauline Ferrand-Prévot', c:'FRA', team:'Visma-Lease a Bike', t:'Première Française à gagner, pour sa toute première participation, après une attaque en solitaire.' },
  { y:2024, n:'Lotte Kopecky', c:'BEL', team:'SD Worx-Protime', t:'Championne du monde, elle gagne le sprint d\'un petit groupe d\'échappées.' },
  { y:2023, n:'Alison Jackson', c:'CAN', team:'EF Education-TIBCO-SVB', t:'Partie dans l\'échappée du matin, elle va au bout et crée la surprise.' },
  { y:2022, n:'Elisa Longo Borghini', c:'ITA', team:'Trek-Segafredo', t:'Troisième l\'année d\'avant, elle part seule à une trentaine de kilomètres de l\'arrivée.' },
  { y:2021, n:'Lizzie Deignan', c:'GBR', team:'Trek-Segafredo', t:'La première gagnante de l\'histoire, après 82 km en solitaire dans la boue.' }
];
const HOMMES = [
  { y:2026, n:'Wout van Aert', c:'BEL' }, { y:2025, n:'Mathieu van der Poel', c:'NED' }, { y:2024, n:'Mathieu van der Poel', c:'NED' },
  { y:2023, n:'Mathieu van der Poel', c:'NED' }, { y:2022, n:'Dylan van Baarle', c:'NED' }, { y:2021, n:'Sonny Colbrelli', c:'ITA' }
];
const COUNTRY = { GER:'Allemagne', FRA:'France', BEL:'Belgique', CAN:'Canada', ITA:'Italie', GBR:'Royaume-Uni', NED:'Pays-Bas' };
const v3 = c => `<rect width="6" height="12" fill="${c[0]}"/><rect x="6" width="6" height="12" fill="${c[1]}"/><rect x="12" width="6" height="12" fill="${c[2]}"/>`;
const h3 = c => `<rect width="18" height="4" fill="${c[0]}"/><rect y="4" width="18" height="4" fill="${c[1]}"/><rect y="8" width="18" height="4" fill="${c[2]}"/>`;
const FLAGS = {
  FRA: v3(['#0055A4','#fff','#EF4135']), ITA: v3(['#009246','#fff','#CE2B37']), BEL: v3(['#111','#FDDA24','#EF3340']),
  NED: h3(['#AE1C28','#fff','#21468B']), GER: h3(['#111','#DD0000','#FFCE00']),
  GBR: '<rect width="18" height="12" fill="#012169"/><path d="M0 0L18 12M18 0L0 12" stroke="#fff" stroke-width="2.4"/><path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" stroke-width=".9"/><rect x="7.2" width="3.6" height="12" fill="#fff"/><rect y="4.2" width="18" height="3.6" fill="#fff"/><rect x="8" width="2" height="12" fill="#C8102E"/><rect y="5" width="18" height="2" fill="#C8102E"/>',
  CAN: '<rect width="18" height="12" fill="#fff"/><rect width="4.5" height="12" fill="#D80621"/><rect x="13.5" width="4.5" height="12" fill="#D80621"/><path d="M9 3l1 2 1.5-.5-.5 2 1-.3L9 9 6 6.2l1 .3-.5-2L8 5z" fill="#D80621"/>'
};
const flag = c => `<span class="flag" title="${COUNTRY[c]}"><svg viewBox="0 0 18 12" aria-hidden="true">${FLAGS[c]}</svg></span>`;

/* ---------- Gagnantes ---------- */
if ($('#winners')) $('#winners').innerHTML = FEMMES.map((w, i) => `
  <article class="win${i === 0 ? ' latest' : ''}">
    <div class="yr">${w.y}</div>
    <div class="who">${w.n}</div>
    <div class="meta">${flag(w.c)} ${COUNTRY[w.c]} · ${w.team}</div>
    <p>${w.t}</p>
  </article>`).join('');

/* ---------- Écart en chiffres ---------- */
const GAPS = [
  { l:'Distance', h:258.3, f:143.1, u:'km', fmt: v => v.toLocaleString('fr-FR') + ' km' },
  { l:'Secteurs pavés', h:30, f:20, fmt: v => String(v) },
  { l:'Kilomètres de pavés', h:54.8, f:33.7, fmt: v => v.toLocaleString('fr-FR') + ' km' },
  { l:'Éditions courues (2026)', h:123, f:6, fmt: v => String(v) },
  { l:'Prime de la victoire en 2021', h:30000, f:1535, fmt: v => v.toLocaleString('fr-FR') + ' €' }
];
if ($('#bars')) $('#bars').innerHTML = GAPS.map(g => `
  <div class="bar-row">
    <div class="lbl">${g.l}<span>femmes = ${Math.round(g.f / g.h * 100)} % des hommes</span></div>
    <div class="bar"><span class="who">Hommes</span><span class="track"><span class="fill" style="width:100%"></span></span><span class="v">${g.fmt(g.h)}</span></div>
    <div class="bar f"><span class="who">Femmes</span><span class="track"><span class="fill" style="width:${(g.f / g.h * 100).toFixed(1)}%"></span></span><span class="v">${g.fmt(g.f)}</span></div>
  </div>`).join('') + '<small>Sources : A.S.O. via Tour Magazin (parcours 2026), Cyclingnews (primes 2021).</small>';

/* ---------- Palmarès + filtres ---------- */
const rows = [];
for (let y = 2026; y >= 2021; y--){
  const f = FEMMES.find(w => w.y === y), h = HOMMES.find(w => w.y === y);
  rows.push({ ...f, k:'fem' }, { ...h, k:'hom' });
}
if ($('#edList')) $('#edList').innerHTML = rows.map(r => `
  <li class="ed ${r.k}" data-k="${r.k}">
    <span class="y">${r.y}</span>
    <span class="n">${r.n}</span>
    <span class="c">${flag(r.c)} ${COUNTRY[r.c]} · <span class="tag">${r.k === 'fem' ? 'Femmes' : 'Hommes'}</span></span>
  </li>`).join('');
function setTab(b){
  document.querySelectorAll('.tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
  const f = b.dataset.f;
  document.querySelectorAll('.ed').forEach(li => { li.hidden = f !== 'all' && li.dataset.k !== f; });
}
document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => setTab(b)));
// palmares.html#femmes ou #hommes ouvre directement le bon filtre
const tabFromHash = () => { const m = { '#femmes': 'fem', '#hommes': 'hom' }[location.hash]; const b = m && document.querySelector(`.tabs button[data-f="${m}"]`); if (b) setTab(b); };
tabFromHash(); addEventListener('hashchange', tabFromHash);

/* ---------- Menu mobile ---------- */
$('#menuBtn').addEventListener('click', () => {
  const open = $('#mobileNav').classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', open);
});
document.querySelectorAll('#mobileNav a').forEach(a => a.addEventListener('click', () => { $('#mobileNav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false'); }));

/* =====================================================================
   Illustrations génératives (canvas) : pas de photos, des créations graphiques
   ===================================================================== */
const hash = (a, b = 0) => { let h = Math.imul(a | 0, 374761393) ^ Math.imul((b | 0) + 1013, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
const COB = ['#7F6F5C','#8A7A65','#776754','#93836D','#6E604F','#9A8B76','#85745E','#A39379'];
const STAR = ['#999','#E8D36A','#F4B63F','#F28B3C','#E8553A','#C4173C'];

function cobbles(ctx, x0, y0, w, h, cw = 22, rh = 16, seed = 1, light = 0){
  ctx.fillStyle = '#2E2820'; ctx.fillRect(x0, y0, w, h);
  for (let r = 0; r * rh < h + rh; r++){
    const off = (r & 1) ? cw / 2 : 0;
    for (let c = -1; c * cw < w + cw; c++){
      const hh = hash(r + seed * 97, c + seed * 31);
      const x = x0 + c * cw + off + (hash(r, c + 5) - .5) * 3, y = y0 + r * rh;
      const col = COB[Math.floor(hh * COB.length)];
      ctx.fillStyle = col;
      roundRect(ctx, x + 1.6, y + 1.6, cw - 3.2, rh - 3.2, Math.min(5, rh / 3)); ctx.fill();
      if (light){ ctx.fillStyle = `rgba(255,245,225,${0.12 + hh * 0.1})`; roundRect(ctx, x + 2.5, y + 2.5, cw * 0.55, rh * 0.32, 3); ctx.fill(); }
    }
  }
}
function roundRect(ctx, x, y, w, h, r){ ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); }
function swoosh(ctx, W, H, o = {}){
  ctx.save(); ctx.globalCompositeOperation = 'screen';
  const g = ctx.createLinearGradient(W * .4, 0, W, H);
  g.addColorStop(0, 'rgba(194,50,79,.95)'); g.addColorStop(.55, 'rgba(255,90,90,.9)'); g.addColorStop(1, 'rgba(255,138,61,.95)');
  ctx.strokeStyle = g; ctx.lineCap = 'round';
  const s = o.scale || 1;
  ctx.lineWidth = Math.max(40, W * .11) * s;
  ctx.beginPath(); ctx.moveTo(W * (o.x || .55), H * 1.15); ctx.bezierCurveTo(W * .62, H * .55, W * .95, H * .55, W * 1.12, H * -.1); ctx.stroke();
  ctx.lineWidth = Math.max(18, W * .045) * s; ctx.globalAlpha = .85;
  ctx.beginPath(); ctx.moveTo(W * ((o.x || .55) + .2), H * 1.2); ctx.bezierCurveTo(W * .82, H * .7, W * 1.02, H * .45, W * 1.2, H * .3); ctx.stroke();
  ctx.restore();
}
function bike(ctx, x, y, s, jersey, ghost){
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (ghost){ ctx.globalAlpha = .4; ctx.shadowColor = '#9FE8FF'; ctx.shadowBlur = 14; }
  else { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(4, 5, 11, 26, 0, 0, 6.29); ctx.fill(); }
  ctx.fillStyle = ghost ? '#CFF4FF' : '#121212'; roundRect(ctx, -2.4, -28, 4.8, 17, 2.4); ctx.fill(); roundRect(ctx, -2.4, 11, 4.8, 17, 2.4); ctx.fill();
  ctx.strokeStyle = ghost ? '#E8FBFF' : '#BFC5CE'; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, 12); ctx.moveTo(-8, -16); ctx.lineTo(8, -16); ctx.stroke();
  ctx.fillStyle = ghost ? '#DDF6FF' : jersey;
  ctx.beginPath(); ctx.moveTo(-10, -5); ctx.quadraticCurveTo(0, -11, 10, -5); ctx.lineTo(7, 10); ctx.quadraticCurveTo(0, 13, -7, 10); ctx.closePath(); ctx.fill();
  ctx.fillStyle = ghost ? '#F4FDFF' : '#F2F2F2'; ctx.beginPath(); ctx.ellipse(0, -9, 5.4, 6.6, 0, 0, 6.29); ctx.fill();
  ctx.restore();
}
function fields(ctx, W, H, seed){
  const cols = ['#3B4A2C','#46552F','#6B6436','#3F4B33','#4E4329','#55602F'];
  const band = Math.max(60, H / 4);
  for (let i = 0; i * band < H + band; i++){ ctx.fillStyle = cols[Math.floor(hash(i, seed) * cols.length)]; ctx.fillRect(0, i * band, W, band + 1);
    ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x < W; x += 10 + (i % 3) * 3){ ctx.moveTo(x, i * band); ctx.lineTo(x, i * band + band); } ctx.stroke(); }
}

const ROUTE = [[0,50.329,3.395],[11,50.258,3.416],[22,50.186,3.5],[31,50.218,3.476],[36,50.192,3.455],[44.5,50.288,3.505],[50,50.318,3.468],[55,50.354,3.405],[61.5,50.38,3.375],[66,50.372,3.33],[72.5,50.412,3.322],[77,50.44,3.34],[83.5,50.452,3.275],[88,50.475,3.243],[91,50.486,3.2],[94.5,50.479,3.103],[102.5,50.508,3.112],[106,50.54,3.125],[110.5,50.528,3.177],[118,50.568,3.215],[123.2,50.594,3.262],[126,50.604,3.24],[128.3,50.596,3.207],[135,50.652,3.19],[143.1,50.69,3.163]];
const SECT = [[29.3,.8,2],[36,1.5,3],[43,1.6,3],[55,2.5,4],[61.5,1.6,3],[66,3.2,4],[72.5,2.4,3],[77,2.4,4],[83.5,1.4,3],[88,1.7,3],[91,2.3,4],[94.5,3,5],[102.5,.7,2],[106,1.4,3],[110.5,.5,2],[123.2,1.8,4],[126,2.1,5],[128.3,1.1,2],[135,1.4,2],[141.7,.3,1]];
const TOWNS = [[0,'Denain'],[22,'Solesmes'],[55,'Haveluy'],[94.5,'Mons-en-Pévèle'],[110.5,'Templeuve'],[126,"Carrefour de l'Arbre"],[143.1,'Roubaix']];
function routeDrawer(ctx, W, H, pad, labels){
  const K = Math.cos(50.45 * Math.PI / 180);
  const P = ROUTE.map(r => ({ km: r[0], x: (r[2] - 3.3) * K, y: -(r[1] - 50.45) }));
  const xs = P.map(p => p.x), ys = P.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const sc = Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2) / (maxY - minY));
  const ox = (W - (maxX - minX) * sc) / 2, oy = (H - (maxY - minY) * sc) / 2;
  const at = km => { for (let i = 1; i < P.length; i++){ if (km <= P[i].km){ const a = P[i-1], b = P[i], t = (km - a.km) / (b.km - a.km); return [ox + ((a.x + (b.x - a.x) * t) - minX) * sc, oy + ((a.y + (b.y - a.y) * t) - minY) * sc]; } } const l = P[P.length-1]; return [ox + (l.x - minX) * sc, oy + (l.y - minY) * sc]; };
  const seg = (a, b) => { ctx.beginPath(); let p = at(a); ctx.moveTo(p[0], p[1]); for (const q of P) if (q.km > a && q.km < b){ const pp = at(q.km); ctx.lineTo(pp[0], pp[1]); } p = at(b); ctx.lineTo(p[0], p[1]); };
  const u = Math.max(1, W / 420);
  ctx.lineJoin = ctx.lineCap = 'round';
  seg(0, 143.1); ctx.strokeStyle = '#000'; ctx.lineWidth = 8 * u; ctx.stroke();
  seg(0, 143.1); ctx.strokeStyle = '#5A6070'; ctx.lineWidth = 4 * u; ctx.stroke();
  for (const s of SECT){ seg(s[0], s[0] + s[1]); ctx.strokeStyle = STAR[s[2]]; ctx.lineWidth = (4 + s[2]) * u; ctx.stroke(); }
  const st = at(0), fi = at(143.1);
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(st[0], st[1], 6 * u, 0, 6.29); ctx.fill();
  ctx.fillStyle = '#C2324F'; ctx.beginPath(); ctx.arc(fi[0], fi[1], 7 * u, 0, 6.29); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2 * u; ctx.stroke();
  if (labels){
    ctx.font = `600 ${Math.round(12 * u)}px Archivo, sans-serif`; ctx.fillStyle = '#D9DBE0';
    for (const [km, name] of TOWNS){ const p = at(km); const below = km === 0; ctx.fillText(name, p[0] + (below ? -ctx.measureText(name).width - 10 * u : 9 * u), p[1] + (below ? 16 * u : -7 * u)); }
    // légende
    ctx.font = `600 ${Math.round(11 * u)}px Archivo, sans-serif`;
    for (let k = 1; k <= 5; k++){ ctx.fillStyle = STAR[k]; ctx.fillRect(14 * u, H - (14 + (6 - k) * 17) * u, 18 * u, 6 * u); ctx.fillStyle = '#B7BAC2'; ctx.fillText('★'.repeat(k), 38 * u, H - (8 + (6 - k) * 17) * u); }
  }
}

const ART = {
  hero(ctx, W, H){
    fields(ctx, W, H, 3);
    ctx.save(); ctx.translate(W * .42, H * .5); ctx.rotate(-0.42);
    const rw = Math.max(170, H * .42);
    ctx.fillStyle = '#5E4E3B'; ctx.fillRect(-W, -rw / 2 - 18, W * 2.2, rw + 36);
    ctx.save(); ctx.beginPath(); ctx.rect(-W, -rw / 2, W * 2.2, rw); ctx.clip(); cobbles(ctx, -W, -rw / 2, W * 2.2, rw, 30, 21, 7, 1); ctx.restore();
    const cols = ['#C2324F','#5A7BD8','#E0C341','#47B26B','#F2F2F2','#D9544F','#9A6BD1'];
    for (let i = 0; i < 14; i++){ bike(ctx, -W * .12 + i * (W * .07) + (hash(i, 2) - .5) * 30, (hash(i, 3) - .5) * rw * .6, Math.max(1.2, H / 380), cols[i % cols.length], i % 4 === 3); }
    ctx.restore();
    // ombres portées latérales + éléments graphiques
    swoosh(ctx, W, H, { x: .58 });
    const g = ctx.createLinearGradient(0, H, 0, H * .35); g.addColorStop(0, 'rgba(0,0,0,.72)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  },
  paves(ctx, W, H){
    cobbles(ctx, 0, 0, W, H, 46, 32, 11, 1);
    ctx.fillStyle = 'rgba(80,110,50,.35)'; for (let i = 0; i < 40; i++){ ctx.beginPath(); ctx.arc(hash(i, 1) * W, hash(i, 2) * H, 2 + hash(i, 3) * 4, 0, 6.29); ctx.fill(); }
    const g = ctx.createRadialGradient(W * .3, H * .3, 10, W * .5, H * .5, W * .8); g.addColorStop(0, 'rgba(255,240,210,.12)'); g.addColorStop(1, 'rgba(0,0,0,.45)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  },
  parcours(ctx, W, H){ ctx.fillStyle = '#10141A'; ctx.fillRect(0, 0, W, H); routeDrawer(ctx, W, H, Math.min(W, H) * .14, false); },
  carte(ctx, W, H){ ctx.fillStyle = '#0E1013'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,.04)'; ctx.lineWidth = 1; for (let x = 0; x < W; x += 40){ ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 40){ ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    routeDrawer(ctx, W, H, Math.min(W, H) * .12, true); },
  trophee(ctx, W, H){
    const g = ctx.createRadialGradient(W * .5, H * .38, 10, W * .5, H * .5, Math.max(W, H) * .7); g.addColorStop(0, '#3A3530'); g.addColorStop(1, '#0F0E0D');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const s = Math.min(W, H) / 280, cx = W * .5, base = H * .82;
    ctx.fillStyle = '#1D1B19'; ctx.fillRect(cx - 70 * s, base - 46 * s, 140 * s, 46 * s);
    ctx.fillStyle = '#C8A44E'; ctx.fillRect(cx - 44 * s, base - 30 * s, 88 * s, 14 * s);
    ctx.fillStyle = '#7F6F5C'; ctx.beginPath();
    ctx.moveTo(cx - 62 * s, base - 50 * s); ctx.lineTo(cx - 56 * s, base - 128 * s); ctx.lineTo(cx + 50 * s, base - 136 * s); ctx.lineTo(cx + 64 * s, base - 54 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,240,210,.18)'; ctx.beginPath(); ctx.moveTo(cx - 52 * s, base - 120 * s); ctx.lineTo(cx + 44 * s, base - 128 * s); ctx.lineTo(cx + 40 * s, base - 108 * s); ctx.lineTo(cx - 50 * s, base - 100 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.moveTo(cx + 20 * s, base - 132 * s); ctx.lineTo(cx + 50 * s, base - 136 * s); ctx.lineTo(cx + 64 * s, base - 54 * s); ctx.lineTo(cx + 30 * s, base - 52 * s); ctx.closePath(); ctx.fill();
    swoosh(ctx, W, H, { x: .75, scale: .5 });
  },
  velodrome(ctx, W, H){
    ctx.fillStyle = '#1B1D21'; ctx.fillRect(0, 0, W, H);
    const cx = W * .5, cy = H * .55, rx = W * .44, ry = H * .5;
    ctx.fillStyle = '#C9C1B1'; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.29); ctx.fill();
    ctx.fillStyle = '#2F5A2A'; ctx.beginPath(); ctx.ellipse(cx, cy, rx * .78, ry * .62, 0, 0, 6.29); ctx.fill();
    ctx.strokeStyle = '#3B7BD8'; ctx.lineWidth = Math.max(3, W / 160); ctx.beginPath(); ctx.ellipse(cx, cy, rx * .8, ry * .65, 0, 0, 6.29); ctx.stroke();
    ctx.strokeStyle = '#D9544F'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx, cy, rx * .86, ry * .75, 0, 0, 6.29); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.fillRect(cx - 3, cy + ry * .62, 6, ry * .36);
    for (let i = 0; i < 7; i++){ const a = 1.7 + i * .09; bike(ctx, cx + Math.cos(a) * rx * .9, cy + Math.sin(a) * ry * .86, Math.max(.9, W / 600), ['#C2324F','#F2F2F2','#5A7BD8','#E0C341'][i % 4], false); }
    swoosh(ctx, W, H, { x: .7, scale: .6 });
  },
  elles(ctx, W, H){
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#C2324F'); g.addColorStop(1, '#FF8A3D');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = .18; cobbles(ctx, 0, 0, W, H, 40, 28, 4, 0); ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.font = `400 ${Math.round(H * .9)}px "Bebas Neue", sans-serif`; ctx.textBaseline = 'bottom'; ctx.fillText('2021', W * .3, H * 1.08);
    for (let i = 0; i < 6; i++) bike(ctx, W * .18 + i * W * .13, H * .78 - (i % 2) * 20, Math.max(1.1, H / 220), '#fff', false);
  },
  ecart(ctx, W, H){
    ctx.fillStyle = '#0E1013'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#5A5D66'; ctx.fillRect(W * .12, H * .25, W * .76, H * .18);
    ctx.fillStyle = '#C2324F'; ctx.fillRect(W * .12, H * .55, W * .76 * .554, H * .18);
  },
  jeu(ctx, W, H){ ART['jeu-grand'](ctx, W, H, true); },
  'jeu-grand'(ctx, W, H, small){
    fields(ctx, W, H, 9);
    const rw = W * (small ? .62 : .5), x0 = W / 2 - rw / 2;
    ctx.fillStyle = '#34373C'; ctx.fillRect(x0, 0, rw, H);
    ctx.fillStyle = '#5E4E3B'; ctx.fillRect(x0 - 10, 0, rw + 20, H * .5);
    cobbles(ctx, x0 + rw * .14, 0, rw * .72, H * .5, small ? 12 : 22, small ? 9 : 16, 5, 0);
    ctx.fillStyle = 'rgba(240,240,240,.75)'; for (let y = H * .5 + 10; y < H; y += 40) ctx.fillRect(W / 2 - 2, y, 4, 20);
    const s = small ? Math.max(.55, H / 120) : Math.max(1.3, H / 330);
    bike(ctx, W / 2 + rw * .1, H * .78, s, '#C2324F', false);
    bike(ctx, W / 2 - rw * .22, H * .62, s, '#5A7BD8', false);
    bike(ctx, W / 2 + rw * .26, H * .36, s, '#fff', true);
    bike(ctx, W / 2 - rw * .08, H * .2, s, '#fff', true);
    if (!small){
      ctx.font = `700 ${Math.round(12 * s / 1.3)}px Archivo, sans-serif`; ctx.textAlign = 'center';
      const lab = (x, y, t, bg, col) => { const w = ctx.measureText(t).width + 16; ctx.fillStyle = bg; roundRect(ctx, x - w / 2, y - 11, w, 22, 11); ctx.fill(); ctx.fillStyle = col; ctx.textBaseline = 'middle'; ctx.fillText(t, x, y + 1); };
      lab(W / 2 + rw * .26, H * .36 - 50 * s / 1.3, 'PRO · HOLOGRAMME', 'rgba(120,220,255,.25)', '#E8FBFF');
      lab(W / 2 + rw * .1, H * .78 + 52 * s / 1.3, 'TOI', '#C2324F', '#fff');
      // jauges
      const gx = 24, gy = 24, gw = Math.min(220, W * .38);
      ctx.fillStyle = 'rgba(14,16,20,.85)'; roundRect(ctx, gx, gy, gw, 104, 10); ctx.fill();
      [['Énergie', .72, '#3CCB9A'], ['Hydratation', .41, '#F4B63F'], ['Alimentation', .88, '#3CCB9A']].forEach(([t, v, c], i) => {
        ctx.textAlign = 'left'; ctx.fillStyle = '#E9ECF1'; ctx.font = '600 12px Archivo, sans-serif'; ctx.fillText(t, gx + 12, gy + 18 + i * 30);
        ctx.fillStyle = '#0B0D11'; ctx.fillRect(gx + 12, gy + 26 + i * 30, gw - 24, 7); ctx.fillStyle = c; ctx.fillRect(gx + 12, gy + 26 + i * 30, (gw - 24) * v, 7);
      });
    }
  }
};

function paint(cv){
  const r = cv.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = Math.round(r.width), H = Math.round(r.height);
  if (cv._w === W && cv._h === H) return;
  cv._w = W; cv._h = H;
  cv.width = W * dpr; cv.height = H * dpr;
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const fn = ART[cv.dataset.art]; if (fn) fn(ctx, W, H);
}
const canvases = [...document.querySelectorAll('canvas[data-art]')];
const ro = new ResizeObserver(entries => entries.forEach(e => paint(e.target)));
canvases.forEach(cv => ro.observe(cv));
// Repeindre une fois les polices chargées (titres dessinés dans les canvas)
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => canvases.forEach(cv => { cv._w = 0; paint(cv); }));

/* =====================================================================
   Fond de pavés : plus on descend, plus la page se pave
   ===================================================================== */
(function(){
  const cv = document.getElementById('pavesBg'), ctx = cv.getContext('2d');
  const COLS = ['#ECE6DC','#E6DFD3','#EFEAE1','#E2DACD','#E9E2D7','#F1ECE4'];
  const CW = 58, RH = 38, PARA = .35;
  let W = 0, H = 0, dpr = 1, pend = false;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function size(){ dpr = Math.min(2, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; draw(); }
  function progress(){ const max = document.documentElement.scrollHeight - innerHeight; return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 1; }
  function draw(){
    pend = false;
    const p = reduce ? 1 : progress(), off = reduce ? 0 : scrollY * PARA;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);
    const r0 = Math.floor(off / RH) - 1, r1 = Math.ceil((off + H) / RH) + 1;
    let laid = 0;
    for (let r = r0; r <= r1; r++){
      const y = r * RH - off, shift = (r & 1) ? CW / 2 : 0;
      for (let c = -1; c * CW < W + CW; c++){
        // seuil propre à chaque pavé : la page se remplit au hasard, du bas vers le haut de l'écran
        const hh = hash(r * 7 + 3, c * 13 + 5), sy = Math.min(1, Math.max(0, (y + RH) / (H + RH)));
        const th = .03 + .78 * (hh * .7 + (1 - sy) * .3);
        const k = Math.min(1, Math.max(0, (p - th) / .07));
        if (k <= 0) continue;
        laid++;
        const e = easeOut(k), x = c * CW + shift + (hash(r, c) - .5) * 4;
        const w = (CW - 6) * (.55 + .45 * e), h = (RH - 6) * (.55 + .45 * e);
        const cx = x + CW / 2, cy = y + RH / 2 - (1 - e) * 10;
        ctx.globalAlpha = e;
        ctx.fillStyle = 'rgba(120,100,80,.10)'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(cx - w / 2 + 1.5, cy - h / 2 + 2.5, w, h, 9) : ctx.rect(cx - w / 2 + 1.5, cy - h / 2 + 2.5, w, h); ctx.fill();
        ctx.fillStyle = COLS[Math.floor(hh * COLS.length)]; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(cx - w / 2, cy - h / 2, w, h, 9) : ctx.rect(cx - w / 2, cy - h / 2, w, h); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(cx - w / 2 + 6, cy - h / 2 + 4, w * .45, 3);
      }
    }
    ctx.globalAlpha = 1;
    document.getElementById('paveCount').textContent = Math.round(p * 100);
  }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  addEventListener('scroll', () => { if (!pend){ pend = true; requestAnimationFrame(draw); } }, { passive: true });
  addEventListener('resize', size);
  size();
})();
})();

// Hero core: the center of the cube is the origin of knowledge. Five pathway sparks flow out to their codes.
(() => {
  const art = document.querySelector('.hero-art.orbit-stage'), stage = art && art.querySelector('.hero-cube-stage');
  if (!art || !stage) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fx = document.createElement('canvas'); fx.className = 'hero-core-fx'; fx.setAttribute('aria-hidden', 'true'); art.appendChild(fx);
  const hit = document.createElement('a'); hit.className = 'hero-core-hit'; hit.href = 'knowledge-helix';
  hit.setAttribute('aria-label', 'The Origin: curiosity and logic. Open the Knowledge Helix'); art.appendChild(hit);
  ['pointerdown', 'mousedown', 'touchstart'].forEach(ev => hit.addEventListener(ev, e => e.stopPropagation(), { passive: true }));
  hit.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); location.href = hit.href; });
  const tip = document.createElement('span'); tip.className = 'hero-core-tip'; tip.textContent = 'The Origin: Curiosity + Logic · Click'; art.appendChild(tip);
  const P = [['DT ↔ IN', '#b45aff', 227, -140], ['RS ↔ DS', '#2aa6ff', 267, 70], ['AI ↔ IV', '#46c96a', 97, 210], ['CR ↔ SL', '#f3b742', -223, 170], ['ED ↔ IM', '#1fd0c8', -243, -110]];
  const x = fx.getContext('2d'); let W = 0, H = 0, cx = 0, cy = 0, dpr = 1;
  function size() {
    const a = art.getBoundingClientRect(), s = stage.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2);
    W = a.width; H = a.height; fx.width = W * dpr; fx.height = H * dpr; fx.style.width = W + 'px'; fx.style.height = H + 'px';
    cx = s.left - a.left + s.width / 2; cy = s.top - a.top + s.height / 2;
    hit.style.left = cx + 'px'; hit.style.top = cy + 'px'; tip.style.left = (cx + 40) + 'px'; tip.style.top = (cy - 70) + 'px';
  }
  new ResizeObserver(size).observe(art); size();
  const k = () => Math.min(W / 660, H / 518, 1.4);
  function curve(p) { const s = k(), ex = cx + p[2] * s, ey = cy + p[3] * s, i = P.indexOf(p);
    const mx = (cx + ex) / 2 + (i % 2 ? 60 : -60) * s, my = (cy + ey) / 2 + (i < 3 ? -50 : 40) * s; return [ex, ey, mx, my]; }
  const at = (t, ex, ey, mx, my) => [(1 - t) ** 2 * cx + 2 * (1 - t) * t * mx + t * t * ex, (1 - t) ** 2 * cy + 2 * (1 - t) * t * my + t * t * ey];
  let hover = false; hit.addEventListener('pointerenter', () => hover = true); hit.addEventListener('pointerleave', () => hover = false);
  hit.addEventListener('focus', () => hover = true); hit.addEventListener('blur', () => hover = false);
  function frame(ms) {
    const t = ms / 1000, s = k(); x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, W, H);
    const pulse = still ? 1 : 1 + Math.sin(t * 2.2) * 0.12, R = 46 * s * pulse * (hover ? 1.2 : 1);
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(.35, 'rgba(233,216,255,.75)'); g.addColorStop(1, 'rgba(155,92,255,0)');
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();
    x.strokeStyle = 'rgba(233,216,255,.45)'; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, 62 * s * pulse, 0, 7); x.stroke();
    P.forEach((p, i) => {
      const [ex, ey, mx, my] = curve(p); x.save(); x.shadowColor = p[1]; x.shadowBlur = 10;
      x.setLineDash([4, 10]); x.lineDashOffset = still ? 0 : -t * 18; x.strokeStyle = p[1]; x.globalAlpha = .75; x.lineWidth = 2;
      x.beginPath(); x.moveTo(cx, cy); x.quadraticCurveTo(mx, my, ex, ey); x.stroke(); x.setLineDash([]); x.globalAlpha = 1;
      for (let j = 0; j < 3; j++) { const u = still ? [.35, .62, .85][j] : ((t * 0.18 + j / 3 + i * 0.13) % 1);
        const [px, py] = at(u, ex, ey, mx, my); x.fillStyle = p[1]; x.globalAlpha = Math.min(1, u * 4, (1 - u) * 4 + .2);
        x.beginPath(); x.arc(px, py, (2.5 + 3 * Math.sin(u * Math.PI)) * Math.max(s, .6), 0, 7); x.fill(); }
      x.globalAlpha = 1; x.font = `800 ${Math.max(10, 13 * s)}px Manrope, Inter, sans-serif`; x.textAlign = 'center'; x.fillText(p[0], ex, ey - 12 * s); x.restore();
    });
    if (!still) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

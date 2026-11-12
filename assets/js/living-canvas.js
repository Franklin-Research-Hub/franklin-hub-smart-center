// The Living Canvas™ — Franklin HUB SMART Center
// Different Faces. Different Perspectives. One Interconnected World.
// Each portrait is rebuilt as thousands of 3D facets that can be rotated, broken into Cubist planes and recomposed.
import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';

const root = document.getElementById('lc');
if (root) init();

function init() {
  const stage = root.querySelector('.lc-stage');
  const canvas = stage.querySelector('canvas');
  const loading = stage.querySelector('.lc-loading');
  const fallback = stage.querySelector('.lc-fallback');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const K = JSON.parse(document.getElementById('lc-knowledge').textContent);
  const PORTRAITS = JSON.parse(document.getElementById('lc-portraits').textContent);
  const PRESETS = JSON.parse(document.getElementById('lc-presets').textContent);
  const DISC = ['art', 'science', 'math', 'tech', 'ai', 'culture', 'environment'];

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    if (!renderer.getContext()) throw new Error('no webgl');
  } catch (e) { loading.hidden = true; canvas.hidden = true; fallback.hidden = false; return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 120);
  const HOME = new THREE.Vector3(0, 0.3, 17);
  camera.position.copy(HOME);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
  controls.minDistance = 7; controls.maxDistance = 30; controls.target.set(0, 0.3, 0); controls.saveState();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x2a1d55, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(-4, 5, 10); scene.add(key);
  const violet = new THREE.PointLight(0xa070ff, 40, 40); violet.position.set(-8, 2, 6); scene.add(violet);
  const cyan = new THREE.PointLight(0x35d6ee, 30, 40); cyan.position.set(8, -1, 6); scene.add(cyan);

  // ---------- knowledge ribbons + pedestal
  const RIB = [['art', 'ART & DESIGN'], ['tech', 'TECHNOLOGY'], ['ai', 'AI & DATA'], ['culture', 'CULTURE & STORYTELLING'], ['environment', 'ENVIRONMENT & HEALTH'], ['math', 'MATHEMATICS'], ['science', 'SCIENCE']];
  const ribbons = new THREE.Group(); scene.add(ribbons);
  const ribbonMeshes = [];
  RIB.forEach(([d, label], i) => {
    const a0 = i / RIB.length * Math.PI * 2, col = new THREE.Color(K[d].color);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 0.5, 64, 1, true, a0, 0.7),
      new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.6, transparent: true, opacity: 0.38, side: THREE.DoubleSide, depthWrite: false }));
    m.position.y = -2.4 + (i % 4) * 1.5; m.rotation.x = i % 2 ? 0.16 : -0.12; m.userData = { disc: d, name: label, mid: a0 + 0.35 };
    const c = document.createElement('canvas'); c.width = 512; c.height = 96; const x = c.getContext('2d');
    x.font = '800 40px Manrope, DM Sans, sans-serif'; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = K[d].color; x.shadowBlur = 18; x.fillText(label, 256, 48);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
    const mid = a0 + 0.35; sp.position.set(Math.sin(mid) * 7.05, m.position.y + 0.55, Math.cos(mid) * 7.05); sp.scale.set(2.6, 0.49, 1);
    sp.userData = { disc: d, name: label, mid };
    ribbons.add(m, sp); ribbonMeshes.push(m, sp);
  });
  const ped = new THREE.Group(); ped.position.y = -4.4; scene.add(ped);
  [[3.6, 0x9b5cff], [4.4, 0x35d6ee], [5.1, 0xf3b742]].forEach(([r, c], i) => {
    const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 12, 120), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.85 - i * 0.2 }));
    t.rotation.x = Math.PI / 2; ped.add(t);
  });

  // ---------- palettes: 'original' keeps every portrait's own colors; others are artistic duotones
  const PAL = {
    original: null,
    violet: ['#1c0f3d', '#7856e8', '#e6dcff'], blue: ['#0b1a44', '#3b82f6', '#dbeafe'], teal: ['#062b33', '#1fb6cf', '#d6fbff'],
    gold: ['#2e1a03', '#f3b742', '#fff4d6'], orange: ['#2d0f02', '#fb923c', '#ffedd5'], pink: ['#2d0618', '#ec4899', '#ffe0f0'],
  };

  // ---------- state
  const S = { portrait: 0, perspective: 'cubist', palette: 'original', depth: 60, motion: reduced ? 'still' : 'interactive', layers: new Set(DISC), selected: null, seed: 11 };
  const spin = { x: 0, y: 0 };
  let P = null;          // current portrait: { mesh, n, base(Float32Array), z, cx, cy, cluster, orig(Float32Array), clusters[] }
  const holder = new THREE.Group(); scene.add(holder);
  const mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const cache = {};

  function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  async function fetchPortrait(i) {
    const id = PORTRAITS[i].id;
    if (!cache[id]) cache[id] = fetch(`/assets/canvas/p${id}.json`).then(r => { if (!r.ok) throw new Error('missing'); return r.json(); });
    return cache[id];
  }
  async function loadPortrait(i) {
    loading.hidden = false; loading.textContent = 'Loading portrait…';
    let d;
    try { d = await fetchPortrait(i); } catch (e) { loading.textContent = 'This portrait could not load. Please try another.'; return; }
    S.portrait = i;
    const n = d.c.length / 6, scale = 9.2 / d.w;
    const base = new Float32Array(n * 9), orig = new Float32Array(n * 9), cx = new Float32Array(n), cy = new Float32Array(n), z = new Float32Array(n);
    for (let t = 0; t < n; t++) {
      let sx = 0, sy = 0;
      for (let v = 0; v < 3; v++) {
        const x = (d.t[t * 6 + v * 2] - d.w / 2) * scale, y = (d.h / 2 - d.t[t * 6 + v * 2 + 1]) * scale;
        base[t * 9 + v * 3] = x; base[t * 9 + v * 3 + 1] = y; sx += x; sy += y;
      }
      cx[t] = sx / 3; cy[t] = sy / 3; z[t] = d.z[t];
      const hex = d.c.substr(t * 6, 6), col = new THREE.Color('#' + hex);
      for (let v = 0; v < 3; v++) { orig[t * 9 + v * 3] = col.r; orig[t * 9 + v * 3 + 1] = col.g; orig[t * 9 + v * 3 + 2] = col.b; }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 9), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 9), 3));
    if (P) { holder.remove(P.mesh); P.mesh.geometry.dispose(); }
    const mesh = new THREE.Mesh(geo, mat); holder.add(mesh);
    P = { mesh, n, base, orig, cx, cy, z, h: d.h * scale, cluster: new Int16Array(n), clusters: [] };
    partition(S.seed);
    paint(); loading.hidden = true; root.classList.add('is-ready');
    root.querySelectorAll('.lc-pick button').forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    say('Now showing: ' + PORTRAITS[i].alt + '.');
  }

  // Cubist planes: a Voronoi partition of the facets; every plane gets its own depth, tilt and offset.
  function partition(seed) {
    const r = mulberry(seed), N = 30, centers = [];
    for (let k = 0; k < N; k++) { const t = Math.floor(r() * P.n); centers.push([P.cx[t], P.cy[t]]); }
    for (let t = 0; t < P.n; t++) {
      let best = 0, bd = 1e9;
      for (let k = 0; k < N; k++) { const dx = P.cx[t] - centers[k][0], dy = P.cy[t] - centers[k][1], dd = dx * dx + dy * dy; if (dd < bd) { bd = dd; best = k; } }
      P.cluster[t] = best;
    }
    P.clusters = centers.map(([x, y], k) => ({
      x, y, disc: DISC[k % DISC.length],
      r: { dz: (r() - .5) * 2, rot: (r() - .5) * 2, dx: (r() - .5) * 2, dy: (r() - .5) * 2, ry: (r() - .5) * 2 },
      now: { dz: 0, rot: 0, dx: 0, dy: 0, ry: 0 },
    }));
  }
  function goal(c) {
    const d = S.depth / 60, r = c.r;
    if (S.perspective === 'abstract') return { dz: r.dz * 0.7 * d, rot: r.rot * 0.07, dx: c.x * 0.05 + r.dx * 0.07, dy: c.y * 0.04 + r.dy * 0.07, ry: r.ry * 0.25 };
    if (S.perspective === 'modern') return { dz: 0, rot: 0, dx: 0, dy: 0, ry: 0 };
    return { dz: r.dz * 0.32 * d, rot: r.rot * 0.035, dx: r.dx * 0.035, dy: r.dy * 0.035, ry: r.ry * 0.12 };
  }

  function paint() {
    if (!P) return;
    const col = P.mesh.geometry.attributes.color.array, pal = PAL[S.palette];
    const a = pal && new THREE.Color(pal[0]), b = pal && new THREE.Color(pal[1]), c = pal && new THREE.Color(pal[2]), tmp = new THREE.Color();
    for (let t = 0; t < P.n; t++) {
      const cl = P.clusters[P.cluster[t]], on = S.layers.has(cl.disc);
      const sel = S.selected && S.selected.cluster === P.cluster[t], same = S.selected && S.selected.disc === cl.disc;
      for (let v = 0; v < 3; v++) {
        const o = t * 9 + v * 3; let R = P.orig[o], G = P.orig[o + 1], B = P.orig[o + 2];
        if (pal) { const L = 0.2126 * R + 0.7152 * G + 0.0722 * B; L < 0.5 ? tmp.copy(a).lerp(b, L * 2) : tmp.copy(b).lerp(c, (L - 0.5) * 2); R = tmp.r; G = tmp.g; B = tmp.b; }
        let k = on ? 1 : 0.18; if (sel) k = 1.45; else if (same) k = 1.18;
        col[o] = Math.min(1, R * k); col[o + 1] = Math.min(1, G * k); col[o + 2] = Math.min(1, B * k);
      }
    }
    P.mesh.geometry.attributes.color.needsUpdate = true;
    ribbonMeshes.forEach(r => { const on = S.layers.has(r.userData.disc), sel = S.selected && S.selected.disc === r.userData.disc; r.userData.op = r.isSprite ? (on ? 1 : 0.15) : (on ? (sel ? 0.75 : 0.38) : 0.06); if (!r.isSprite) r.material.emissiveIntensity = sel ? 1.2 : 0.6; });
  }

  // ---------- loop
  const clock = new THREE.Clock(); let tour = null;
  const pw = new THREE.Vector3(99, 99, 0);
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    const dist = w < 520 ? 24 : w < 800 ? 20 : 17; HOME.setLength(dist); camera.position.setLength(dist); controls.saveState();
  }
  new ResizeObserver(resize).observe(stage); resize();
  renderer.setAnimationLoop(() => {
    const t = clock.getElapsedTime(), still = S.motion === 'still';
    if (P) {
      const pos = P.mesh.geometry.attributes.position.array, d = S.depth / 60;
      P.clusters.forEach(c => { const g = goal(c); for (const k in g) c.now[k] += (g[k] - c.now[k]) * 0.08; });
      for (let i = 0; i < P.n; i++) {
        const c = P.clusters[P.cluster[i]], n = c.now;
        let fz = 0;
        if (S.motion === 'flow') fz = Math.sin(t * 0.8 + P.cluster[i]) * 0.12 * (d + 0.3);
        if (S.motion === 'interactive') { const dx = P.cx[i] - pw.x, dy = P.cy[i] - pw.y, dd = Math.hypot(dx, dy); if (dd < 1.4) fz = (1.4 - dd) / 1.4 * 1.0; }
        const cs = Math.cos(n.rot), sn = Math.sin(n.rot), zb = P.z[i] * 1.6 * (S.perspective === 'modern' ? d * 0.6 + 0.2 : d * 0.8 + 0.2) + n.dz + fz;
        for (let v = 0; v < 3; v++) {
          const o = i * 9 + v * 3, x = P.base[o] - c.x, y = P.base[o + 1] - c.y;
          const rx = x * cs - y * sn, ry = x * sn + y * cs;
          pos[o] = c.x + rx + n.dx; pos[o + 1] = c.y + ry + n.dy; pos[o + 2] = zb + rx * Math.sin(n.ry) * 0.6;
        }
      }
      P.mesh.geometry.attributes.position.needsUpdate = true; P.mesh.geometry.computeBoundingSphere();
    }
    if (!still) ribbons.rotation.y = t * 0.12;
    ribbonMeshes.forEach(r => { const f = Math.cos(r.userData.mid + ribbons.rotation.y); const k = f > 0.35 ? Math.max(0.1, 1 - (f - 0.35) * 2.4) : 1; r.material.opacity = (r.userData.op ?? 0.38) * k; });
    if (S.motion === 'flow') { holder.rotation.y = spin.y + Math.sin(t * 0.3) * 0.3; violet.position.x = -8 + Math.sin(t * 0.4) * 2; }
    else holder.rotation.y += (spin.y - holder.rotation.y) * 0.12;
    holder.rotation.x += (spin.x - holder.rotation.x) * 0.12;
    ped.rotation.y = still ? 0 : t * 0.2;
    controls.update(); renderer.render(scene, camera);
  });

  // ---------- picking
  const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.6), ptr = new THREE.Vector2();
  let down = null;
  function setPointer(e) {
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera); const hit = new THREE.Vector3();
    if (ray.ray.intersectPlane(plane, hit)) pw.copy(holder.worldToLocal(hit));
  }
  canvas.addEventListener('pointermove', setPointer);
  canvas.addEventListener('pointerleave', () => pw.set(99, 99, 0));
  canvas.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; stopTour(); });
  canvas.addEventListener('pointerup', e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    setPointer(e);
    const hits = ray.intersectObjects(P ? [P.mesh, ...ribbonMeshes] : ribbonMeshes, false);
    const h = hits.find(x => x.object === (P && P.mesh) ? S.layers.has(P.clusters[P.cluster[x.faceIndex]].disc) : (x.object.material.opacity > 0.2));
    if (!h) return select(null);
    if (P && h.object === P.mesh) { const k = P.cluster[h.faceIndex]; select({ disc: P.clusters[k].disc, cluster: k, name: 'Cubist plane ' + (k + 1) }); }
    else select({ disc: h.object.userData.disc, name: h.object.userData.name });
  });

  // ---------- knowledge panel
  const know = root.querySelector('.lc-know');
  function select(sel) {
    S.selected = sel; paint();
    root.querySelectorAll('.lc-layers label').forEach(l => l.classList.toggle('is-sel', !!sel && l.querySelector('input').value === sel.disc));
    if (!sel) {
      know.classList.remove('is-open'); know.style.removeProperty('--c');
      know.querySelector('.lc-k-tag').textContent = 'KNOWLEDGE'; know.querySelector('h3').textContent = 'Select any part of the portrait';
      know.querySelector('.lc-k-body').textContent = 'Click or tap a Cubist plane or a glowing ribbon to see how it connects to art, science, mathematics, technology, AI, culture, and the environment.';
      know.querySelector('.lc-k-try').textContent = ''; return;
    }
    const k = K[sel.disc];
    know.classList.add('is-open'); know.style.setProperty('--c', k.color);
    know.querySelector('.lc-k-tag').textContent = (k.label + ' · ' + (sel.name || '')).toUpperCase();
    know.querySelector('h3').textContent = k.title; know.querySelector('.lc-k-body').textContent = k.body;
    know.querySelector('.lc-k-try').textContent = 'Try this: ' + k.activity;
  }

  // ---------- controls
  const press = (name, v) => root.querySelectorAll(`[data-seg="${name}"] button`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v)));
  function seg(name, fn) { root.querySelectorAll(`[data-seg="${name}"] button`).forEach(b => b.addEventListener('click', () => { press(name, b.dataset.v); fn(b.dataset.v); paint(); })); }
  seg('perspective', v => S.perspective = v); seg('palette', v => S.palette = v); seg('motion', v => S.motion = v);
  press('motion', S.motion);
  const depth = root.querySelector('#lc-depth'), out = root.querySelector('#lc-depth-out');
  const setDepth = v => { S.depth = Math.max(0, Math.min(100, v)); depth.value = S.depth; out.textContent = S.depth; };
  depth.addEventListener('input', () => setDepth(+depth.value));
  root.querySelector('#lc-depth-minus').addEventListener('click', () => setDepth(S.depth - 10));
  root.querySelector('#lc-depth-plus').addEventListener('click', () => setDepth(S.depth + 10));
  root.querySelectorAll('.lc-layers input').forEach(i => i.addEventListener('change', () => { i.checked ? S.layers.add(i.value) : S.layers.delete(i.value); paint(); }));
  root.querySelectorAll('.lc-layers .lc-info').forEach(b => b.addEventListener('click', () => select({ disc: b.dataset.d, name: K[b.dataset.d].label })));
  root.querySelectorAll('.lc-pick button').forEach((b, i) => b.addEventListener('click', () => { stopTour(); select(null); loadPortrait(i); }));

  root.querySelector('#lc-reimagine').addEventListener('click', () => {
    if (!P) return; S.seed = Math.floor(Math.random() * 1e9); partition(S.seed);
    if (S.perspective === 'modern') { S.perspective = 'cubist'; press('perspective', 'cubist'); }
    select(null); say('A new geometric arrangement was created.');
  });
  function reset() {
    S.seed = 11; Object.assign(S, { perspective: 'cubist', palette: 'original', layers: new Set(DISC) }); setDepth(60);
    press('perspective', 'cubist'); press('palette', 'original');
    root.querySelectorAll('.lc-layers input').forEach(i => i.checked = true);
    if (P) partition(S.seed); select(null); controls.reset(); spin.x = spin.y = 0;
  }
  root.querySelector('#lc-reset').addEventListener('click', () => { stopTour(); reset(); say('The original composition was restored.'); });
  root.querySelector('#lc-camera').addEventListener('click', () => { controls.reset(); spin.x = spin.y = 0; });
  root.querySelector('#lc-export').addEventListener('click', () => {
    renderer.render(scene, camera);
    const a = document.createElement('a'); a.download = 'franklin-hub-living-canvas.png'; a.href = canvas.toDataURL('image/png'); a.click();
    say('Your canvas was downloaded as a PNG image.');
  });

  // ---------- The Canvas Collection
  async function applyPreset(i) {
    const p = PRESETS[i]; if (!p) return; stopTour();
    if (S.portrait !== p.portrait || !P) await loadPortrait(p.portrait);
    S.seed = p.seed; partition(p.seed);
    S.perspective = p.perspective; S.palette = p.palette; S.motion = p.motion; setDepth(p.depth);
    press('perspective', p.perspective); press('palette', p.palette); press('motion', p.motion);
    root.querySelectorAll('.lc-col button').forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    select({ disc: p.disc, name: p.name }); say(p.name + ' is now on the canvas.');
  }
  root.querySelectorAll('.lc-col button').forEach((b, i) => b.addEventListener('click', () => { applyPreset(i); stage.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); }));

  // ---------- guided tour ("Watch the Experience")
  const tourBtn = document.getElementById('lc-tour');
  const STEPS = [
    () => { S.motion = 'flow'; press('motion', 'flow'); select({ disc: 'art', name: 'Art & Design' }); },
    () => { S.perspective = 'abstract'; press('perspective', 'abstract'); select({ disc: 'math', name: 'Mathematics' }); },
    () => { loadPortrait((S.portrait + 4) % PORTRAITS.length); S.perspective = 'cubist'; press('perspective', 'cubist'); select({ disc: 'culture', name: 'Culture & Storytelling' }); },
    () => { S.palette = 'teal'; press('palette', 'teal'); setDepth(90); select({ disc: 'science', name: 'Science' }); },
    () => { partition(Math.floor(Math.random() * 1e9)); select({ disc: 'ai', name: 'AI & Data' }); },
    () => { loadPortrait((S.portrait + 7) % PORTRAITS.length); S.palette = 'original'; press('palette', 'original'); setDepth(60); select({ disc: 'tech', name: 'Technology' }); },
    () => { S.perspective = 'modern'; press('perspective', 'modern'); select({ disc: 'environment', name: 'Environment & Health' }); },
  ];
  function stopTour() { if (!tour) return; clearInterval(tour); tour = null; tourBtn.setAttribute('aria-pressed', 'false'); tourBtn.querySelector('span').textContent = 'Watch the Experience'; }
  tourBtn.addEventListener('click', () => {
    if (tour) return stopTour();
    stage.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    let i = 0; STEPS[0](); paint(); tourBtn.setAttribute('aria-pressed', 'true'); tourBtn.querySelector('span').textContent = 'Stop the tour';
    tour = setInterval(() => { i++; if (i >= STEPS.length) return stopTour(); STEPS[i](); paint(); spin.y = Math.sin(i) * 0.5; }, 3400);
  });
  document.getElementById('lc-create').addEventListener('click', e => { e.preventDefault(); stage.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); canvas.focus({ preventScroll: true }); });

  canvas.addEventListener('keydown', e => {
    const s = 0.18;
    if (e.key === 'ArrowLeft') spin.y -= s; else if (e.key === 'ArrowRight') spin.y += s;
    else if (e.key === 'ArrowUp') spin.x -= s; else if (e.key === 'ArrowDown') spin.x += s;
    else if (e.key === '+' || e.key === '=') camera.position.multiplyScalar(0.9);
    else if (e.key === '-' || e.key === '_') camera.position.multiplyScalar(1.1);
    else return; e.preventDefault();
  });
  const live = root.querySelector('.lc-live'); function say(t) { live.textContent = t; }
  window.__livingCanvas = { applyPreset, loadPortrait, reset, snapshot: () => { renderer.render(scene, camera); return canvas.toDataURL('image/png'); }, state: S, get P() { return P; } };
  select(null); loadPortrait(0);
}

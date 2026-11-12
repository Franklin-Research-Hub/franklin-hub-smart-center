// Arts & Design banner: one interactive Living Canvas™ portrait (turns toward the cursor; facets ripple where you point).
import * as THREE from 'three';
const box = document.querySelector('.lcb');
if (box) init();
async function init() {
  const canvas = box.querySelector('canvas'), fallback = box.querySelector('img');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let r;
  try { r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); if (!r.getContext()) throw 0; }
  catch (e) { canvas.hidden = true; fallback.hidden = false; return; }
  r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.outputColorSpace = THREE.SRGBColorSpace;
  let d; try { d = await (await fetch('/assets/canvas/p' + box.dataset.p + '.json')).json(); } catch (e) { canvas.hidden = true; fallback.hidden = false; return; }
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100); cam.position.set(0, 0, 18);
  const n = d.c.length / 6, sc = 9.6 / d.w, pos = new Float32Array(n * 9), base = new Float32Array(n * 9), col = new Float32Array(n * 9), cx = new Float32Array(n), cy = new Float32Array(n), z = new Float32Array(n);
  for (let t = 0; t < n; t++) {
    let sx = 0, sy = 0; const c = new THREE.Color('#' + d.c.substr(t * 6, 6));
    for (let v = 0; v < 3; v++) { const x = (d.t[t * 6 + v * 2] - d.w / 2) * sc, y = (d.h / 2 - d.t[t * 6 + v * 2 + 1]) * sc; base[t * 9 + v * 3] = x; base[t * 9 + v * 3 + 1] = y; sx += x; sy += y; col[t * 9 + v * 3] = c.r; col[t * 9 + v * 3 + 1] = c.g; col[t * 9 + v * 3 + 2] = c.b; }
    cx[t] = sx / 3; cy[t] = sy / 3; z[t] = d.z[t];
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })); const grp = new THREE.Group(); grp.add(mesh); scene.add(grp);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.04, 8, 120), new THREE.MeshBasicMaterial({ color: 0x9b5cff, transparent: true, opacity: .7 })); ring.rotation.x = Math.PI / 2; ring.position.y = -3.6; scene.add(ring);
  const ptr = { x: 0, y: 0, on: false }, hit = new THREE.Vector2(99, 99), ray = new THREE.Raycaster(), pl = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), v3 = new THREE.Vector3(), ndc = new THREE.Vector2();
  box.addEventListener('pointermove', e => { const b = canvas.getBoundingClientRect(); ptr.x = (e.clientX - b.left) / b.width * 2 - 1; ptr.y = -((e.clientY - b.top) / b.height * 2 - 1); ptr.on = true;
    ndc.set(ptr.x, ptr.y); ray.setFromCamera(ndc, cam); if (ray.ray.intersectPlane(pl, v3)) { grp.worldToLocal(v3); hit.set(v3.x, v3.y); } });
  box.addEventListener('pointerleave', () => { ptr.on = false; hit.set(99, 99); });
  const fit = () => { const w = box.clientWidth, h = box.clientHeight; r.setSize(w, h, false); cam.aspect = w / h; cam.position.z = w / h < 1.3 ? 22 : 18; cam.updateProjectionMatrix(); };
  new ResizeObserver(fit).observe(box); fit();
  const clock = new THREE.Clock(); let ry = 0, rx = 0;
  r.setAnimationLoop(() => {
    const t = clock.getElapsedTime();
    const ty = ptr.on ? ptr.x * 0.55 : (still ? 0 : Math.sin(t * 0.35) * 0.35), tx = ptr.on ? -ptr.y * 0.3 : 0;
    ry += (ty - ry) * 0.07; rx += (tx - rx) * 0.07; grp.rotation.set(rx, ry, 0);
    for (let i = 0; i < n; i++) {
      const dd = Math.hypot(cx[i] - hit.x, cy[i] - hit.y), push = dd < 1.6 ? (1.6 - dd) / 1.6 * 1.3 : 0;
      const wave = still ? 0 : Math.sin(t * 1.2 + cx[i] * 0.8) * 0.04, zz = z[i] * 1.5 + push + wave;
      for (let v = 0; v < 3; v++) { const o = i * 9 + v * 3; pos[o] = base[o]; pos[o + 1] = base[o + 1]; pos[o + 2] = zz; }
    }
    g.attributes.position.needsUpdate = true; ring.rotation.z = t * 0.2;
    r.render(scene, cam);
  });
  box.classList.add('is-ready');
}

/**
 * Textures de pedra generades amb codi (sense fotos de stock):
 * marbre, granit, pedra natural i porcellànic. Soroll de valors + fBm.
 */
import type { MaterialId } from '../data/empresa';

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function makeNoise(seed: number) {
  const r = rng(seed);
  const N = 256;
  const p = new Uint8Array(N * 2);
  const v = new Float32Array(N);
  for (let i = 0; i < N; i++) { p[i] = i; v[i] = r(); }
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j]!, p[i]!]; }
  for (let i = 0; i < N; i++) p[N + i] = p[i]!;
  const s = (t: number) => t * t * (3 - 2 * t);
  const at = (x: number, y: number) => v[p[(p[x & 255]! + (y & 255)) & 511]! & 255]!;
  const noise = (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
    const u = s(xf), w = s(yf);
    return a + (b - a) * u + (c - a) * w + (a - b - c + d) * u * w;
  };
  return (x: number, y: number, oct = 5) => {
    let f = 0, amp = 0.5, fr = 1;
    for (let o = 0; o < oct; o++) { f += amp * noise(x * fr, y * fr); fr *= 2; amp *= 0.5; }
    return f;
  };
}

const mix = (a: number[], b: number[], t: number) => a.map((x, i) => x + (b[i]! - x) * t);

export function generaPixels(W: number, H: number, id: MaterialId, seed = 7): Uint8ClampedArray {
  const img = { data: new Uint8ClampedArray(W * H * 4) };
  const fbm = makeNoise(seed);
  const r = rng(seed * 31);
  const sc = 1 / Math.max(W, H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const nx = x * sc, ny = y * sc;
      let c: number[];
      if (id === 'marmol') {
        // Vetes llargues en diagonal: direcció dominant + turbulència suau.
        const t = fbm(nx * 2.2, ny * 2.2, 6);
        const fase = (nx * 0.9 + ny * 0.45) * 7 + t * 5.5;
        const v = Math.abs(Math.sin(fase));
        const halo = Math.pow(1 - v, 7);
        const nucli = Math.pow(1 - v, 38);
        const t2 = fbm(nx * 5 + 9, ny * 5 + 3, 5);
        const fina = Math.pow(1 - Math.abs(Math.sin((nx * 0.5 - ny * 1.1) * 11 + t2 * 7)), 70);
        c = mix([245, 243, 239], [231, 228, 222], fbm(nx * 4 + 20, ny * 4, 4));
        c = mix(c, [196, 192, 186], halo * 0.45);
        c = mix(c, [108, 104, 100], nucli * 0.85 + fina * 0.35);
        c = mix(c, [169, 130, 74], Math.pow(1 - v, 90) * 0.4);
      } else if (id === 'granito') {
        const base = fbm(nx * 40, ny * 40, 3);
        c = mix([150, 148, 146], [205, 203, 200], base);
        const k = r();
        if (k < 0.16) c = mix(c, [32, 32, 34], 0.85);
        else if (k < 0.26) c = mix(c, [240, 238, 236], 0.8);
        else if (k < 0.29) c = mix(c, [176, 150, 140], 0.7);
      } else if (id === 'piedra') {
        const capes = Math.sin((ny * 14 + fbm(nx * 2, ny * 6, 5) * 3) * Math.PI) * 0.5 + 0.5;
        c = mix([214, 196, 168], [232, 220, 198], capes);
        c = mix(c, [190, 168, 138], fbm(nx * 10, ny * 10) * 0.6);
        if (r() < 0.012) c = mix(c, [150, 128, 100], 0.6);
      } else {
        const t = fbm(nx * 2.5, ny * 2.5, 5);
        const v = Math.abs(Math.sin((nx * 1.4 - ny * 2.1 + t * 2.6) * Math.PI));
        c = mix([40, 39, 37], [52, 50, 48], fbm(nx * 6, ny * 6));
        c = mix(c, [205, 200, 192], Math.pow(1 - v, 80) * 0.85);
      }
      const i = (y * W + x) * 4;
      img.data[i] = c[0]!; img.data[i + 1] = c[1]!; img.data[i + 2] = c[2]!; img.data[i + 3] = 255;
    }
  }
  return img.data;
}

/**
 * Pinta la textura en un canvas. El càlcul es fa en un Web Worker perquè no
 * bloquegi la pàgina; si no n'hi ha, es fa directament.
 */
let worker: Worker | null = null;
let seq = 0;
const pendents = new Map<number, HTMLCanvasElement>();

export function pintaPedra(canvas: HTMLCanvasElement, id: MaterialId, seed = 7): void {
  const W = canvas.width, H = canvas.height;
  const dibuixa = (data: Uint8ClampedArray) => {
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.putImageData(new ImageData(new Uint8ClampedArray(data), W, H), 0, 0);
  };
  if (typeof Worker === 'undefined') return dibuixa(generaPixels(W, H, id, seed));
  if (!worker) {
    worker = new Worker(new URL('./piedra.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e: MessageEvent<{ n: number; data: Uint8ClampedArray<ArrayBuffer> }>) => {
      const c = pendents.get(e.data.n);
      pendents.delete(e.data.n);
      if (c) {
        const ctx = c.getContext('2d');
        if (ctx) ctx.putImageData(new ImageData(e.data.data, c.width, c.height), 0, 0);
      }
    };
  }
  const n = ++seq;
  pendents.set(n, canvas);
  worker.postMessage({ n, W, H, id, seed });
}

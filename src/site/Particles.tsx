import { useEffect, useRef } from "react";
import type { Theme } from "./hooks";
import { chapters, placement, type ShapeName } from "./nav";

type V3 = [number, number, number];

function makeShapes(N: number): Record<ShapeName, V3[]> {
  let s = 7;
  const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const many = (f: (i: number) => V3) => Array.from({ length: N }, (_, i) => f(i));

  const sphere = many((i) => {
    const g = Math.PI * (3 - Math.sqrt(5)), y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), t = g * i;
    return [Math.cos(t) * rr, y, Math.sin(t) * rr];
  });

  const word = (() => {
    const c = document.createElement("canvas"), W = 900, H = 260; c.width = W; c.height = H;
    const x = c.getContext("2d")!;
    x.fillStyle = "#fff"; x.textAlign = "center"; x.textBaseline = "middle";
    let fs = 230; x.font = `italic 400 ${fs}px "Instrument Serif", Georgia, serif`;
    const mw = x.measureText("Madame").width;
    if (mw > W * 0.94) { fs = Math.floor((fs * W * 0.94) / mw); x.font = `italic 400 ${fs}px "Instrument Serif", Georgia, serif`; }
    x.fillText("Madame", W / 2, H / 2 + 10);
    const d = x.getImageData(0, 0, W, H).data, pts: V3[] = [];
    for (let yy = 0; yy < H; yy += 2) for (let xx = 0; xx < W; xx += 2) if (d[(yy * W + xx) * 4 + 3] > 128) pts.push([((xx - W / 2) / (W / 2)) * 1.6, (-(yy - H / 2) / (W / 2)) * 1.6, (r() - 0.5) * 0.06]);
    return many(() => pts[Math.floor(r() * pts.length)] ?? [0, 0, 0]);
  })();

  const towers: { x: number; z: number; w: number; h: number }[] = [];
  for (let gx = -2; gx <= 2; gx++) for (let gz = -2; gz <= 2; gz++) { if (r() < 0.25) continue; towers.push({ x: gx * 0.32, z: gz * 0.32, w: 0.1 + r() * 0.08, h: 0.3 + r() * (1 - Math.hypot(gx, gz) * 0.2) * 1.1 }); }
  const city = many((i) => {
    const t = towers[i % towers.length]; const u = r(); let px: number, py: number, pz: number;
    if (r() < 0.6) { const e = Math.floor(r() * 12), sg = [-1, 1], hs = [0, 1];
      if (e < 4) { px = sg[e & 1]; pz = sg[(e >> 1) & 1]; py = u; } else if (e < 8) { px = u * 2 - 1; pz = sg[e & 1]; py = hs[(e >> 1) & 1]; } else { pz = u * 2 - 1; px = sg[e & 1]; py = hs[(e >> 1) & 1]; } }
    else { px = r() * 2 - 1; pz = r() < 0.5 ? -1 : 1; py = Math.floor(r() * 10) / 10; if (r() < 0.5) [px, pz] = [pz, px]; }
    return [t.x + px * t.w, -0.75 + py * t.h, t.z + pz * t.w];
  });

  const galaxy = many((i) => {
    const arm = i % 3, d = Math.pow(r(), 0.7) * 1.25, a = d * 3.2 + (arm * Math.PI * 2) / 3 + (r() - 0.5) * 0.5;
    return [Math.cos(a) * d, (r() - 0.5) * 0.12 * (1.3 - d), Math.sin(a) * d];
  });

  const helix = many((i) => {
    const t = (i / N) * Math.PI * 10, strand = i % 2 ? Math.PI : 0, rung = i % 9 === 0;
    const rr = rung ? (r() * 2 - 1) * 0.4 : 0.4;
    return [Math.cos(t + strand) * rr, (i / N) * 2.4 - 1.2, Math.sin(t + strand) * rr];
  });

  const book = many(() => { // an open book: two curved pages + a spine
    const side = r() < 0.5 ? -1 : 1, u = r(), v = r() * 2 - 1;
    const x = side * u * 1.3, lift = Math.sin(u * Math.PI) * 0.25 + (1 - u) * 0.1;
    return [x, lift - 0.1, v * 0.8];
  });

  const reel = many((i) => { // film reel: rim, hub, five holes
    const k = i % 10;
    if (k < 5) { const a = r() * Math.PI * 2; return [Math.cos(a) * 1.05, Math.sin(a) * 1.05, (r() - 0.5) * 0.1]; }
    if (k < 7) { const a = r() * Math.PI * 2, rr = 0.18; return [Math.cos(a) * rr, Math.sin(a) * rr, (r() - 0.5) * 0.1]; }
    const hole = Math.floor(r() * 5), ha = (hole / 5) * Math.PI * 2, a = r() * Math.PI * 2;
    return [Math.cos(ha) * 0.6 + Math.cos(a) * 0.22, Math.sin(ha) * 0.6 + Math.sin(a) * 0.22, (r() - 0.5) * 0.08];
  });

  const wave = many(() => { // a sound-wave surface
    const x = r() * 2 - 1, z = r() * 2 - 1;
    return [x * 1.6, Math.sin(x * 6) * 0.18 * Math.cos(z * 2) + Math.sin(x * 13 + z * 3) * 0.05, z * 0.7];
  });

  const ring = many((i) => {
    const t = (i / N) * Math.PI * 2 * 97, u = (i / N) * Math.PI * 2, R = 1.05, rr = 0.32 + 0.04 * Math.sin(u * 9);
    return [(R + rr * Math.cos(t)) * Math.cos(u), rr * Math.sin(t), (R + rr * Math.cos(t)) * Math.sin(u)];
  });

  return { sphere, word, city, galaxy, helix, book, reel, wave, ring };
}

/**
 * The fixed particle universe behind the whole site. It morphs between shapes
 * as each chapter scrolls through the middle of the screen, drifts with the
 * cursor, and moves aside from it.
 */
export function Particles({ theme, reduced }: { theme: Theme; reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d")!;
    const mobile = innerWidth < 760;
    const N = mobile ? 1300 : 2600;
    let shapes = makeShapes(N);
    // rebuild once the serif has loaded so "Madame" is drawn in the right face
    document.fonts?.load('italic 100px "Instrument Serif"').then(() => { shapes = makeShapes(N); }).catch(() => {});
    const pos: V3[] = shapes.sphere.map((p) => [...p] as V3);
    const spark = Array.from({ length: N }, (_, i) => i % 23 === 0);

    const css = getComputedStyle(document.documentElement);
    const dark = theme === "dark";
    const cMain = dark ? "#3ee0a1" : css.getPropertyValue("--emerald").trim();
    const cNear = dark ? "#d9ffee" : css.getPropertyValue("--ink").trim();
    const cSpark = css.getPropertyValue("--spark").trim();

    let W = 0, H = 0, raf = 0;
    const size = () => { const dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); addEventListener("resize", size);

    let mx = -9999, my = -9999, tiltX = 0, tiltY = 0, tX = 0, tY = 0;
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; tY = (e.clientX / W - 0.5) * 0.6; tX = (e.clientY / H - 0.5) * 0.35; };
    const onLeave = () => { mx = my = -9999; };
    addEventListener("pointermove", onMove); document.addEventListener("pointerleave", onLeave);

    const els = chapters.map((c) => document.getElementById(c.id));
    const progress = () => { // continuous chapter index, based on what crosses the middle of the screen
      const mid = innerHeight / 2; let best = 0;
      els.forEach((el, i) => { if (!el) return; const r = el.getBoundingClientRect(); if (r.top <= mid) best = i + Math.min(1, Math.max(0, (mid - r.top) / r.height)) - 0.5; });
      return Math.max(0, Math.min(chapters.length - 1, best));
    };
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    let rot = 0, last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(50, now - last); last = now;
      const p = progress(), a = Math.floor(p), b = Math.min(chapters.length - 1, a + 1), f = ease(p - a);
      const sa = chapters[a].shape, sb = chapters[b].shape, A = shapes[sa], B = shapes[sb];
      const pa = placement[sa], pb = placement[sb];
      const pl = pa.map((v, k) => v + (pb[k] - v) * f);
      if (mobile) { pl[0] = 0.5; pl[1] = Math.min(pl[1], 0.3); pl[3] *= sa === "sphere" || sa === "word" ? 0.85 : 0.4; }
      const wordW = sa === "word" ? 1 - f : sb === "word" ? f : 0;
      const flat = sa === "book" || sa === "wave" ? 1 - f : sb === "book" || sb === "wave" ? f : 0;

      tiltX += (tX - tiltX) * 0.05; tiltY += (tY - tiltY) * 0.05;
      if (!reduced) rot += dt * 0.00016;
      const ry = (rot + tiltY) * (1 - wordW) + tiltY * 0.4 * wordW;
      const rx = tiltX + 0.45 * flat;
      const cyR = Math.cos(ry), syR = Math.sin(ry), cxR = Math.cos(rx), sxR = Math.sin(rx);
      let scale = Math.min(W, H) * 0.34 * pl[2];
      scale += (Math.min(scale, (W * 0.42) / 1.6) - scale) * wordW;
      const ox = W * pl[0], oy = H * pl[1];

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      for (let i = 0; i < N; i++) {
        const ta = A[i], tb = B[i], q = pos[i];
        const k = reduced ? 1 : 0.08 + (i % 7) * 0.006;
        q[0] += (ta[0] + (tb[0] - ta[0]) * f - q[0]) * k;
        q[1] += (ta[1] + (tb[1] - ta[1]) * f - q[1]) * k;
        q[2] += (ta[2] + (tb[2] - ta[2]) * f - q[2]) * k;
        let x = q[0] * cyR - q[2] * syR, z = q[0] * syR + q[2] * cyR, y = q[1];
        const y2 = y * cxR - z * sxR; z = y * sxR + z * cxR; y = y2;
        const per = 2.6 / (2.6 + z);
        let X = ox + x * scale * per, Y = oy - y * scale * per;
        const dx = X - mx, dy = Y - my, d2 = dx * dx + dy * dy;
        if (d2 < 12100) { const d = Math.sqrt(d2) || 1, push = (1 - d / 110) * 24; X += (dx / d) * push; Y += (dy / d) * push; }
        const depth = (1 - z) * 0.5;
        const sz = (spark[i] ? 2 : 1.2) * per * (mobile ? 0.9 : 1);
        ctx.globalAlpha = Math.max(0.06, Math.min(1, (dark ? 0.25 : 0.2) + depth * (dark ? 0.75 : 0.55) + wordW * 0.2)) * pl[3];
        ctx.fillStyle = spark[i] ? cSpark : depth > 0.58 ? cNear : cMain;
        ctx.fillRect(X, Y, sz, sz);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave); };
  }, [theme, reduced]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}

import { useState, type PointerEvent } from "react";
import { now, person } from "../data";
import { useClock } from "./hooks";
import { Barcode } from "./bits";

/** Constellation drawn around the particle sphere. Coordinates are in a 600×520 box. */
export const constellation = [
  { id: "about", n: "01", label: "Madame", x: 300, y: 40 },
  { id: "work", n: "02", label: "Work", x: 498, y: 112, current: true },
  { id: "now", n: "03", label: "Now", x: 572, y: 262 },
  { id: "fieldwork", n: "04", label: "Field work", x: 500, y: 410 },
  { id: "library", n: "05", label: "Library", x: 300, y: 486 },
  { id: "watch", n: "06", label: "Watch", x: 100, y: 410 },
  { id: "listening", n: "07", label: "Listening", x: 28, y: 262 },
  { id: "contact", n: "08", label: "Contact", x: 102, y: 112 },
] as const;
const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [0, 4], [1, 5]];

function Constellation() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <svg viewBox="0 0 600 520" className="h-auto w-full overflow-visible" role="navigation" aria-label="Constellation map of this site">
      <g fill="none" strokeLinecap="round">
        {edges.map(([a, b], i) => {
          const A = constellation[a], B = constellation[b], lit = hover === a || hover === b, len = Math.hypot(B.x - A.x, B.y - A.y);
          return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={lit ? "var(--emerald)" : "var(--ink)"} strokeOpacity={lit ? 0.9 : i > 7 ? 0.08 : 0.2} strokeWidth={lit ? 1.5 : 1}
            strokeDasharray={len} strokeDashoffset={len} style={{ animation: `draw 1.4s ${0.8 + i * 0.1}s cubic-bezier(.6,0,.2,1) forwards`, transition: "stroke .3s, stroke-opacity .3s" }} />;
        })}
      </g>
      {constellation.map((s, i) => {
        const lit = hover === i, current = "current" in s, right = s.x >= 300, mid = s.x === 300;
        const tx = mid ? s.x : s.x + (right ? 20 : -20), anchor = mid ? "middle" : right ? "start" : "end", ty = mid ? (s.y < 260 ? -26 : 34) : 0;
        return (
          <a key={s.id} href={`#${s.id}`} aria-label={`${s.n} ${s.label}`} className="group outline-none"
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
            style={{ animation: `rise .8s ${0.6 + i * 0.08}s both` }}>
            <circle cx={s.x} cy={s.y} r="30" fill="transparent" />
            {current && <circle cx={s.x} cy={s.y} r="6" fill="none" stroke="var(--spark)" strokeWidth="1.5" className="pulse-ring" />}
            <circle cx={s.x} cy={s.y} r={lit ? 16 : 0} fill="var(--emerald)" opacity="0.2" style={{ transition: "r .35s" }} />
            <g transform={`translate(${s.x - 12} ${s.y - 12})`}>
              <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z"
                style={{ transformBox: "fill-box", transformOrigin: "center", transform: `scale(${lit ? 0.95 : 0.7})`, transition: "transform .3s" }}
                fill={current ? "url(#spark-grad)" : lit ? "var(--emerald)" : "var(--ink)"} />
            </g>
            <text x={tx} y={s.y - 4 + ty} textAnchor={anchor} className="font-mono" fontSize="10" letterSpacing="1.6" fill={current ? "var(--spark)" : "var(--muted)"}>{s.n}</text>
            <text x={tx} y={s.y + 15 + ty} textAnchor={anchor} className="font-serif" fontSize="22" fontStyle={lit ? "italic" : "normal"} fill={lit ? "var(--emerald-ink)" : "var(--ink)"} style={{ transition: "fill .3s" }}>{s.label}</text>
            <circle cx={s.x} cy={s.y} r="22" fill="none" stroke="var(--spark)" strokeWidth="1.5" className="opacity-0 group-focus-visible:opacity-100" />
          </a>
        );
      })}
      <defs><linearGradient id="spark-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b8cff" /><stop offset="1" stopColor="var(--spark)" /></linearGradient></defs>
    </svg>
  );
}

export function Hero() {
  const clock = useClock();
  const [pos, setPos] = useState({ ra: "05h 35m", dec: "+26° 54′" });
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    const ra = fx * 24, dec = 90 - fy * 180, pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
    setPos({ ra: `${pad(ra)}h ${pad((ra % 1) * 60)}m`, dec: `${dec >= 0 ? "+" : "−"}${pad(Math.abs(dec))}° ${pad((Math.abs(dec) % 1) * 60)}′` });
  };

  return (
    <section id="top" onPointerMove={onMove} className="relative min-h-[100svh] overflow-hidden px-4 pb-8 pt-24 sm:px-8">
      <span className="reg left-4 top-20 text-muted sm:left-8" /><span className="reg right-4 top-20 text-muted sm:right-8" />

      {/* constellation sits exactly around the particle sphere (70% / 47% of the viewport) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden={false}>
        <div className="pointer-events-auto absolute" style={{ left: "70%", top: "47%", width: "min(80vh, 46vw)", transform: "translate(-50%, -50%)" }}>
          <Constellation />
        </div>
        <div className="stamp thump absolute right-8 top-24 text-[11px]" style={{ ["--r" as string]: "-9deg", animationDelay: "2.2s" }}>✶ {person.availability}</div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-[1400px] flex-col justify-end">
        <div className="max-w-[680px]">
          <p className="label rise text-muted" style={{ animationDelay: ".1s" }}><span className="text-spark">✶</span> File 001 — the universe of</p>
          <p className="rise mt-[38vh] font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic text-emerald-ink md:mt-6" style={{ animationDelay: ".2s" }}>Hello, I’m Madame —</p>
          <h1 className="rise font-serif text-[clamp(4.2rem,11.5vw,10.5rem)] leading-[0.82] tracking-[-0.035em]" style={{ animationDelay: ".3s" }}>
            Mahek<br />
            <span className="relative inline-block pl-[0.5em]">
              Fatima<span className="text-spark">.</span>
              <svg aria-hidden viewBox="0 0 300 20" className="absolute -bottom-2 left-[0.5em] h-4 w-[85%]" preserveAspectRatio="none">
                <path d="M2 14 C 80 4, 180 4, 298 10" fill="none" stroke="var(--emerald)" strokeWidth="3" strokeLinecap="round" strokeDasharray="320" strokeDashoffset="320" style={{ animation: "draw 1.2s 1s cubic-bezier(.6,0,.2,1) forwards" }} />
              </svg>
            </span>
          </h1>
          <p className="rise mt-9 max-w-md text-[17px] leading-relaxed text-muted" style={{ animationDelay: ".55s" }}><span className="text-ink">{person.title}.</span> {person.line}</p>
          <div className="rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: ".7s" }}>
            <a href="#about" className="group inline-flex items-center gap-3 rounded-full bg-emerald px-6 py-3 font-medium text-bg transition-transform hover:-translate-y-0.5">Enter the universe <span className="transition-transform group-hover:translate-x-1">→</span></a>
            <a href={`mailto:${person.email}`} className="link-u font-medium">Write to Madame</a>
          </div>
        </div>

        <div className="mt-10 grid gap-3 border-t border-line pt-4 text-muted sm:grid-cols-2 lg:grid-cols-4">
          <p className="label">Jaipur · {person.coords}</p>
          <p className="label">Local time · {clock} IST</p>
          <p className="label hidden lg:block" aria-hidden>Cursor · RA {pos.ra} · Dec {pos.dec}</p>
          <a href="#now" className="label flex items-center gap-2 text-ink lg:justify-end">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spark opacity-60" /><span className="relative h-2 w-2 rounded-full bg-spark" /></span>
            Now: {now[0].text.split(" — ")[0]}
          </a>
        </div>
      </div>
      <Barcode value="madame-universe" className="absolute bottom-24 right-8 hidden h-7 w-28 text-ink/40 xl:block" />
    </section>
  );
}

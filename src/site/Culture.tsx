import { useRef, useState } from "react";
import { following, listenArabic, listenChannels, listenEnglish, listenFaith, moreWaiting, reading, shelves, wantToRead, watchGroups } from "../data";
import { SectionHead } from "./bits";

const wrap = "relative scroll-mt-16 px-4 py-24 sm:px-8 md:py-32";

const spineTone: Record<string, string[]> = {
  ink: ["bg-ink text-bg", "bg-panel text-ink border border-line", "bg-ink/85 text-bg"],
  emerald: ["bg-emerald text-bg", "bg-paper text-ink border border-line", "bg-emerald/70 text-bg", "bg-ink text-bg"],
  spark: ["bg-spark text-bg", "bg-paper text-ink border border-line", "bg-emerald text-bg"],
};
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export function Library() {
  return (
    <section id="library" className={`${wrap} md:pt-[34vh]`}>
      <div className="mx-auto max-w-[1400px]">
        <SectionHead file="005" id="library" title="The" italic="library.">
          Non-fiction only — real, technical, Islamic, psychology. No novels, no romance. Every spine here is something I’ve finished.
        </SectionHead>

        {/* nightstand */}
        <div className="reveal mb-16 grid items-stretch gap-5 md:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-hidden rounded-sm border border-line bg-paper p-7">
            <span aria-hidden className="absolute right-10 top-0 h-20 w-5 bg-spark [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]" />
            <p className="label text-muted"><span className="text-spark">✶</span> On the nightstand · reading now</p>
            <p className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[0.95]">{reading.title}</p>
            <p className="label mt-3 text-muted">{reading.author}</p>
          </div>
          <div className="rounded-sm border border-line p-7">
            <p className="label text-muted">Up next</p>
            <ol className="mt-4 space-y-2.5">
              {wantToRead.map((b, i) => (
                <li key={b.title} className="flex items-baseline gap-3">
                  <span className="label text-emerald-ink">0{i + 1}</span>
                  <span className="font-serif text-xl leading-tight">{b.title}{b.note && <em className="text-muted"> ({b.note})</em>}</span>
                  <span className="label ml-auto hidden shrink-0 text-muted sm:inline">{b.author}</span>
                </li>
              ))}
            </ol>
            <p className="label mt-4 text-muted">+ {moreWaiting} more waiting</p>
          </div>
        </div>

        {/* shelves */}
        <div className="space-y-14">
          {shelves.map((sh) => (
            <div key={sh.name} className="reveal grid gap-6 lg:grid-cols-[220px_1fr]">
              <div>
                <h3 className="font-serif text-3xl italic">{sh.name}</h3>
                <p className="label mt-2 text-muted">{sh.note}</p>
                <p className="label mt-1 text-muted">{sh.books.length} books</p>
              </div>
              <div className="flex items-end gap-1.5 overflow-x-auto border-b-[6px] border-ink pl-1 pt-20 sm:gap-2">
                {sh.books.map((b, i) => {
                  const h = hash(b.title), tones = spineTone[sh.tone];
                  const long = b.title.length > 22, height = 210 + (h % 70), width = long ? 74 : 46 + Math.round(b.title.length * 0.7);
                  return (
                    <button key={b.title} aria-label={`${b.title}${b.author ? `, by ${b.author}` : ""}`}
                      className={`group relative flex shrink-0 flex-col items-center justify-between rounded-t-[3px] px-1.5 py-3 transition-transform duration-500 hover:-translate-y-5 focus-visible:-translate-y-5 ${tones[i % tones.length]}`}
                      style={{ height, width, transform: h % 9 === 0 ? "rotate(-2.5deg)" : undefined }}>
                      <span className="h-px w-[70%] bg-current opacity-30" />
                      <span className="spine max-h-[78%] overflow-hidden font-serif text-[15px] leading-[1.05]">{b.title.replace(/’/g, "'")}</span>
                      <span className="spine label max-h-[22%] overflow-hidden !text-[8px] opacity-70">{b.author?.split(" ").slice(-1)[0] ?? ""}</span>
                      <span className="pointer-events-none absolute -top-14 left-0 z-10 w-max max-w-[240px] rounded-sm bg-ink px-3 py-2 text-left text-bg opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="block font-serif text-base leading-tight">{b.title}</span>
                        {b.author && <span className="label block !text-[9px] opacity-70">{b.author}</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Watch() {
  const [group, setGroup] = useState<string>("All");
  const strip = useRef<HTMLDivElement>(null);
  const frames = watchGroups.flatMap((g) => g.titles.map((t) => ({ t, g: g.name }))).filter((f) => group === "All" || f.g === group);
  const nudge = (d: number) => strip.current?.scrollBy({ left: d * strip.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="watch" className={wrap}>
      <div className="mx-auto max-w-[1400px]">
        <SectionHead file="006" id="watch" title="The" italic="watchlist.">
          Mostly real stories about systems under pressure — money, minds, machines and speed. Plus a little popcorn.
        </SectionHead>

        <div className="reveal mb-5 flex flex-wrap items-center gap-2">
          {["All", ...watchGroups.map((g) => g.name)].map((g) => (
            <button key={g} onClick={() => setGroup(g)} aria-pressed={group === g}
              className={`label rounded-full border px-3.5 py-2 transition-colors ${group === g ? "border-emerald bg-emerald text-bg" : "border-line hover:border-emerald"}`}>
              {g}{g !== "All" && <span className="ml-1.5 opacity-60">{watchGroups.find((x) => x.name === g)?.titles.length}</span>}
            </button>
          ))}
          <span className="ml-auto hidden gap-2 sm:flex">
            <button onClick={() => nudge(-1)} aria-label="Scroll film strip left" className="label h-9 w-9 rounded-full border border-line hover:border-emerald">←</button>
            <button onClick={() => nudge(1)} aria-label="Scroll film strip right" className="label h-9 w-9 rounded-full border border-line hover:border-emerald">→</button>
          </span>
        </div>

        <div className="reveal overflow-hidden rounded-sm bg-[#0c0f0d] text-[#efe6d6] shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
          <div className="sprockets" />
          <div ref={strip} className="flex snap-x gap-2 overflow-x-auto px-2 py-1 [scrollbar-width:none]" key={group}>
            {frames.map((f, i) => (
              <div key={f.t + i} className="group relative flex h-44 w-56 shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[3px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-4 transition-colors hover:border-[#2bb673]"
                style={{ animation: `rise .5s ${Math.min(i, 12) * 0.03}s both` }}>
                <span className="flex justify-between font-mono text-[10px] tracking-[.16em] text-white/50"><span>{String(i + 1).padStart(2, "0")}A</span><span>{f.g}</span></span>
                <span className="font-serif text-[1.65rem] leading-[1.02] transition-colors group-hover:text-[#7fe0b0]">{f.t}</span>
                <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(43,182,115,.25),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
          <div className="sprockets" />
        </div>
        {group !== "All" && <p className="label mt-3 text-muted">{watchGroups.find((g) => g.name === group)?.line}</p>}

        <div className="mt-14">
          <p className="label reveal mb-4 text-muted"><span className="text-spark">✶</span> Following, every season</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {following.map((s, i) => (
              <div key={s.name} className="reveal group relative h-44 overflow-hidden rounded-sm border border-line bg-paper p-5" style={{ transitionDelay: `${i * 80}ms` }}>
                <svg aria-hidden viewBox="0 0 200 120" className="absolute inset-0 h-full w-full text-emerald opacity-30 transition-opacity group-hover:opacity-70" preserveAspectRatio="none">
                  {i === 0 && <path d="M10 95 C 40 20, 80 110, 110 60 S 170 10, 190 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="400" className="[stroke-dashoffset:400] group-hover:[stroke-dashoffset:0] [transition:stroke-dashoffset_1.6s]" />}
                  {i === 1 && <><path d="M15 100 Q 100 -30 185 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" /><circle cx="160" cy="62" r="7" fill="var(--spark)" /></>}
                  {i === 2 && <><rect x="10" y="10" width="180" height="100" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x1="100" y1="10" x2="100" y2="110" stroke="currentColor" /><circle cx="100" cy="60" r="18" fill="none" stroke="currentColor" /></>}
                </svg>
                <div className="relative flex h-full flex-col justify-end">
                  <p className="font-serif text-4xl">{s.name}</p>
                  <p className="label mt-2 text-muted">{s.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Lane({ title, items }: { title: string; items: readonly (readonly [string, string])[] }) {
  return (
    <div className="reveal rounded-sm border border-line bg-paper/90 p-6 backdrop-blur-sm">
      <p className="label text-muted">{title}</p>
      <ol className="mt-4">
        {items.map(([name, builds], i) => (
          <li key={name} className="group grid grid-cols-[32px_1fr_auto] items-center gap-3 border-t border-line py-3.5">
            <span className="label text-emerald-ink">0{i + 1}</span>
            <span>
              <span className="block font-serif text-2xl leading-tight">{name}</span>
              <span className="label mt-1 block !text-[10px] text-muted">builds · {builds}</span>
            </span>
            <span aria-hidden className="flex h-5 items-end gap-[3px] opacity-30 transition-opacity group-hover:opacity-100">
              {[0, 1, 2, 3].map((b) => <span key={b} className="w-[3px] origin-bottom rounded-full bg-emerald motion-safe:animate-[eq_1s_ease-in-out_infinite_alternate]" style={{ height: `${30 + ((i + b) * 23) % 70}%`, animationDelay: `${b * 0.15}s` }} />)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Listening() {
  return (
    <section id="listening" className={wrap}>
      <div className="mx-auto max-w-[1400px]">
        <SectionHead file="007" id="listening" title="Listening" italic="lanes.">
          Two languages, one habit: voices that make me think harder. Each says what it builds in me.
        </SectionHead>
        <div className="grid gap-5 md:grid-cols-2">
          <Lane title="English lane" items={listenEnglish.slice(0, 5)} />
          <Lane title="Arabic lane" items={listenArabic.slice(0, 5)} />
        </div>

        <details className="reveal group mt-8 border-t border-line">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-3xl sm:text-4xl">More listening <em className="text-muted">— {listenEnglish.length + listenArabic.length - 10 + listenFaith.length} voices</em></span>
            <span className="label text-muted transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="grid gap-8 pb-6 md:grid-cols-3">
            {[
              ["More in English", listenEnglish.slice(5)],
              ["More in Arabic", listenArabic.slice(5)],
              ["Faith & wisdom", listenFaith],
            ].map(([title, list]) => (
              <div key={title as string}>
                <p className="label mb-3 text-emerald-ink">{title as string}</p>
                <ul className="space-y-2">
                  {(list as readonly (readonly [string, string])[]).map(([n, b]) => (
                    <li key={n} className="flex items-baseline justify-between gap-3 border-b border-line pb-2"><span className="font-serif text-lg">{n}</span><span className="label shrink-0 !text-[9px] text-muted">{b}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pb-4">
            <span className="label py-2 text-muted">Also on YouTube:</span>
            {listenChannels.map((c) => <a key={c.href} href={c.href} target="_blank" rel="noreferrer" className="label rounded-full border border-line px-3 py-2 hover:border-emerald">{c.label} ↗</a>)}
          </div>
        </details>
      </div>
    </section>
  );
}

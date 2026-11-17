import { useRef, useState, type KeyboardEvent } from "react";
import { archive, projects } from "../data";
import { Barcode, SectionHead, StatusPill } from "./bits";

export function Work() {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(0); // bumps on change to replay the paper animation
  const listRef = useRef<HTMLDivElement>(null);
  const p = projects[i];
  const pick = (n: number) => { setI(n); setFlip((f) => f + 1); };

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + projects.length) % projects.length;
    pick(n);
    listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[n]?.focus();
  };

  return (
    <section id="work" className="relative scroll-mt-20 px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead file="002" id="work" title="Selected" italic="work.">
          Ten files from the archive. Pick one — each is a system I designed, built and tested end to end.
        </SectionHead>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* index */}
          <div ref={listRef} role="tablist" aria-label="Projects" aria-orientation="vertical" onKeyDown={onKey}
            className="reveal -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 lg:col-span-5 lg:mx-0 lg:block lg:overflow-visible lg:px-0">
            {projects.map((pr, n) => (
              <button key={pr.id} role="tab" aria-selected={n === i} aria-controls="dossier" tabIndex={n === i ? 0 : -1}
                onClick={() => pick(n)}
                className={`group flex shrink-0 snap-start items-baseline gap-4 rounded-full border px-4 py-2 text-left transition-all lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-4
                  ${n === i ? "border-emerald bg-emerald/10 lg:bg-transparent" : "border-line"}`}>
                <span className={`label hidden w-8 lg:inline ${n === i ? "text-spark" : "text-muted"}`}>{String(n + 1).padStart(2, "0")}</span>
                <span className={`whitespace-nowrap font-serif text-xl leading-none transition-all lg:text-[2.1rem] ${n === i ? "italic text-emerald-ink lg:translate-x-2" : "group-hover:translate-x-1"}`}>{pr.name}</span>
                <span className="ml-auto hidden lg:inline"><StatusPill status={pr.status} /></span>
              </button>
            ))}
            <p className="label mt-4 hidden text-muted lg:block">↑ ↓ to flip through</p>
          </div>

          {/* dossier */}
          <div className="reveal lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <div className="relative">
                {/* sheets behind */}
                <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-[1.4deg] rounded-sm border border-line bg-panel" />
                <div aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[0.6deg] rounded-sm border border-line bg-panel" />
                {/* folder tab */}
                <div className="label absolute -top-7 left-6 rounded-t-md border border-b-0 border-line bg-paper px-4 py-1.5 text-muted">
                  File 002.{String(i + 1).padStart(2, "0")}
                </div>
                <article id="dossier" role="tabpanel" aria-live="polite" key={flip}
                  className="relative overflow-hidden rounded-sm border border-line bg-paper p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)] sm:p-10"
                  style={{ animation: "rise .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <span className="reg right-4 top-4 text-muted" />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="label text-muted">{p.kicker}</p>
                    <span className="label text-muted">{p.year}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.9] tracking-[-0.02em]">{p.name}</h3>
                  <p className="mt-6 max-w-xl text-[17px] leading-relaxed">{p.summary}</p>

                  <div className="mt-8 border-t border-dashed border-line pt-6">
                    <p className="label mb-4 text-muted">Evidence</p>
                    <ul className="space-y-3">
                      {p.evidence.map((e, k) => (
                        <li key={k} className="flex gap-4 text-[15px] leading-relaxed text-muted">
                          <span className="label pt-1 text-emerald-ink">{String(k + 1).padStart(2, "0")}</span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {p.stack.map((s) => <span key={s} className="label rounded-full border border-line px-3 py-1.5 !text-[10px] text-ink">{s}</span>)}
                  </div>

                  <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                    <div className="flex flex-wrap gap-3">
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="rounded-full bg-emerald px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5">Visit live ↗</a>}
                      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="rounded-full border border-ink px-5 py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-bg">Read the code ↗</a>}
                    </div>
                    <div className="text-right text-ink/70">
                      <Barcode value={p.id} className="ml-auto h-8 w-32" />
                      <p className="label mt-1 !text-[9px] text-muted">MF-{p.id.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="stamp thump absolute right-6 top-16 text-[10px] sm:right-10 sm:top-20" style={{ ["--r" as string]: "8deg" }}>
                    {p.status}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        {/* archive drawer */}
        <details className="reveal group mt-20 border-t border-line">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-3xl sm:text-4xl">The archive <em className="text-muted">— {archive.length} more files</em></span>
            <span className="label text-muted transition-transform group-open:rotate-45">+</span>
          </summary>
          <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {archive.map((a, n) => (
              <li key={a.repo} className="bg-bg">
                <a href={`https://github.com/Maherimtiyaz/${a.repo}`} target="_blank" rel="noreferrer" className="group block h-full p-5 transition-colors hover:bg-panel">
                  <p className="label text-muted">A-{String(n + 1).padStart(2, "0")}</p>
                  <p className="mt-3 font-serif text-2xl group-hover:italic group-hover:text-emerald-ink">{a.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.line}</p>
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}

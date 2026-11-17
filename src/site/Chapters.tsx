import { useState } from "react";
import { compass, fieldwork, instruments, now, person, talks, words } from "../data";
import { SectionHead, Star4 } from "./bits";
import { useClock } from "./hooks";

const wrap = "relative scroll-mt-16 px-4 py-24 sm:px-8 md:py-32";

export function About() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <section id="about" className={`${wrap} md:pt-[44vh]`}>
      <div className="mx-auto max-w-[1400px]">
        <SectionHead file="001" id="about" title="Also known as" italic="Madame.">
          Thousands of small parts, arranged with intent — that’s how I think about systems, and about people.
        </SectionHead>

        <div className="reveal mb-16 flex flex-wrap items-baseline gap-x-8 gap-y-2">
          {words.map((w, i) => (
            <span key={w} className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-none">
              <span className={i === 1 ? "italic text-emerald-ink" : ""}>{w}</span>
              {i < words.length - 1 && <span className="ml-8 text-spark">·</span>}
            </span>
          ))}
        </div>

        <p className="label reveal mb-5 text-muted"><span className="text-spark">✶</span> Three things I could talk about for hours — tap a card</p>
        <div className="grid gap-5 md:grid-cols-3">
          {talks.map((t, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className={`flip h-[300px] ${flipped === i ? "on" : ""}`}>
                <button onClick={() => setFlipped(i)} aria-expanded={flipped === i} inert={flipped === i}
                  className="flip-face flip-front flex flex-col justify-between rounded-sm border border-line bg-paper p-6 text-left transition-colors hover:border-emerald">
                  <span className="flex items-center justify-between"><span className="label text-muted">Topic 0{i + 1}</span><span className="label text-emerald-ink">flip ↻</span></span>
                  <span>
                    <span className="block font-serif text-[2.1rem] leading-[1.02]">{t.front}</span>
                    <span className="label mt-4 block text-muted">{t.sub}</span>
                  </span>
                </button>
                <div className="flip-face flip-back flex flex-col justify-between rounded-sm bg-emerald p-6 text-bg" inert={flipped !== i}>
                  <button onClick={() => setFlipped(null)} className="label self-start opacity-80">↺ back</button>
                  <p className="font-serif text-[1.75rem] italic leading-[1.1]">“{t.back}”</p>
                  <a href={t.link} className="label underline underline-offset-4">{t.linkLabel} →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Now() {
  return (
    <section id="now" className={wrap}>
      <div className="mx-auto max-w-[1400px]">
        <SectionHead file="003" id="now" title="Now &" italic="next.">
          The current star, and where it’s heading.
        </SectionHead>
        <div className="grid gap-10 lg:grid-cols-12">
          <ol className="lg:col-span-7">
            {now.map((n, i) => (
              <li key={i} className="reveal grid grid-cols-[110px_1fr] items-baseline gap-x-6 border-b border-line py-5" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className={`label ${n.tag === "competing" ? "text-spark" : "text-emerald-ink"}`}><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />{n.tag}</span>
                <p className="text-lg leading-relaxed">{n.text}</p>
              </li>
            ))}
          </ol>
          <div className="space-y-5 lg:col-span-5">
            <div className="reveal rounded-sm border border-line bg-paper p-6">
              <p className="label text-muted">Six months out</p>
              <p className="mt-3 font-serif text-[1.8rem] leading-[1.1]">{compass.goal}</p>
            </div>
            <div className="reveal rounded-sm bg-emerald p-6 text-bg">
              <p className="label opacity-80">The long dream</p>
              <p className="mt-3 font-serif text-[1.8rem] italic leading-[1.1]">{compass.dream}</p>
            </div>
          </div>
        </div>

        <div className="reveal mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
          <figure>
            <p className="label text-muted"><span className="text-spark">✶</span> A line I live by</p>
            <blockquote className="mt-4 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.02]">“{compass.line}”</blockquote>
            <figcaption className="label mt-4 text-muted">— {compass.lineSource}</figcaption>
          </figure>
          <div>
            <p className="label text-muted"><span className="text-spark">✶</span> Notes to my younger self</p>
            <ul className="mt-4 space-y-5">
              {compass.advice.map((a, i) => (
                <li key={i} className="flex gap-4 text-lg leading-relaxed"><span className="label pt-1.5 text-emerald-ink">0{i + 1}</span><span>{a}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FieldWork() {
  return (
    <section id="fieldwork" className={wrap}>
      <div className="mx-auto max-w-[1400px]">
        <SectionHead file="004" id="fieldwork" title="Field" italic="work.">
          Where I’ve worked, what I’ve merged, where I’ve competed — and the instruments I reach for.
        </SectionHead>
        <ol>
          {fieldwork.map((f, i) => (
            <li key={i} className="reveal group grid gap-4 border-b border-line py-7 md:grid-cols-12 md:gap-8">
              <p className="label pt-2 text-muted md:col-span-2">{f.when}</p>
              <div className="md:col-span-4">
                <h3 className="font-serif text-4xl leading-none transition-all group-hover:italic group-hover:text-emerald-ink">{f.what}</h3>
                <p className="label mt-3 text-muted">{f.where}</p>
              </div>
              <ul className="space-y-2 md:col-span-6">
                {f.notes.map((n, k) => <li key={k} className="flex gap-3 leading-relaxed text-muted"><span className="pt-[7px] text-emerald-ink"><Star4 size={8} /></span><span>{n}</span></li>)}
              </ul>
            </li>
          ))}
        </ol>
        <div className="reveal mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {instruments.map((g, i) => (
            <div key={g.group} className="bg-bg p-5">
              <p className="label text-spark">0{i + 1}</p>
              <h3 className="mt-2 font-serif text-2xl italic">{g.group}</h3>
              <ul className="mt-4 space-y-1.5">{g.items.map((it) => <li key={it} className="font-mono text-[12.5px] text-muted">— {it}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const clock = useClock();
  return (
    <section id="contact" className="relative scroll-mt-16 px-4 pb-10 pt-24 sm:px-8 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal relative overflow-hidden rounded-sm border border-line bg-paper/90 p-6 backdrop-blur-sm sm:p-12 lg:p-16">
          <span className="reg left-4 top-4 text-muted" /><span className="reg right-4 top-4 text-muted" />
          <span className="reg bottom-4 left-4 text-muted" /><span className="reg bottom-4 right-4 text-muted" />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <p className="label text-muted"><span className="text-spark">✶</span> File 008 — correspondence</p>
            <div className="stamp text-[11px]" style={{ transform: "rotate(-6deg)" }}>✶ {person.availability}</div>
          </div>
          <h2 className="mt-12 font-serif text-[clamp(3.2rem,10vw,9rem)] leading-[0.85] tracking-[-0.03em]">Write to <em className="text-emerald-ink">Madame.</em></h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{person.availabilityDetail}</p>
          <a href={`mailto:${person.email}`} className="group mt-10 inline-flex max-w-full items-center gap-4 border-b-2 border-emerald pb-2 font-serif text-[clamp(1.4rem,4vw,3rem)] italic transition-colors hover:text-emerald-ink">
            <span className="truncate">{person.email}</span><span className="not-italic transition-transform group-hover:translate-x-2">→</span>
          </a>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {person.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between bg-paper p-5 transition-colors hover:bg-panel">
                <span><span className="label block text-muted">{l.label}</span><span className="mt-2 block font-serif text-2xl group-hover:italic">{l.handle}</span></span>
                <span className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </a>
            ))}
          </div>
          <p className="mt-12 text-right font-serif text-4xl italic text-emerald-ink">— Madame</p>
        </div>
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 text-muted">
          <p className="label">© 2026 {person.name} · Jaipur · {clock} IST</p>
          <a href="#top" className="label link-u text-ink">Back to the stars ↑</a>
        </footer>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { constellation } from "./Hero";
import type { Theme } from "./hooks";

export function TopBar({ theme, toggle, active }: { theme: Theme; toggle: () => void; active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const current = constellation.find((c) => c.id === active);

  return (
    <>
      <div className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-line bg-bg/75 backdrop-blur-md" : ""}`}>
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
          <a href="#top" className="flex items-baseline gap-2" aria-label="Back to top">
            <span className="font-serif text-2xl italic">Madame</span>
            <span className="text-spark">✶</span>
          </a>
          <p className="label hidden text-muted md:block" aria-live="polite">
            {current ? <>Reading <span className="text-ink">{current.n} · {current.label}</span></> : "File 001 · the map"}
          </p>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="label flex h-9 items-center gap-2 rounded-full border border-line px-3 transition-colors hover:border-emerald">
              <span className="relative h-3.5 w-3.5 overflow-hidden rounded-full border border-current">
                <span className={`absolute inset-y-0 left-0 w-1/2 bg-current transition-transform duration-500 ${theme === "light" ? "translate-x-full" : ""}`} />
              </span>
              <span className="hidden sm:inline">{theme === "dark" ? "Night" : "Atlas"}</span>
            </button>
            <button onClick={() => setOpen(true)} aria-expanded={open} aria-controls="index-overlay"
              className="label flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-bg transition-transform hover:-translate-y-0.5">
              Index
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="index-overlay" role="dialog" aria-modal="true" aria-label="Site index" className="fixed inset-0 z-[70] overflow-y-auto bg-bg/95 backdrop-blur-xl">
          <div className="mx-auto flex min-h-full max-w-[1400px] flex-col px-4 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <p className="label text-muted"><span className="text-spark">✶</span> Index of files</p>
              <button onClick={() => setOpen(false)} autoFocus className="label rounded-full border border-line px-4 py-2 hover:border-emerald">Close ✕</button>
            </div>
            <ol className="mt-10 flex-1">
              {constellation.map((c, i) => (
                <li key={c.id} className="border-b border-line" style={{ animation: `rise .6s ${i * 0.05}s both` }}>
                  <a href={`#${c.id}`} onClick={() => setOpen(false)} className="group flex items-baseline gap-6 py-4 sm:py-5">
                    <span className="label w-8 text-muted">{c.n}</span>
                    <span className="font-serif text-5xl leading-none transition-all group-hover:translate-x-3 group-hover:italic group-hover:text-emerald-ink sm:text-7xl">{c.label}</span>
                    {"current" in c && <span className="label ml-auto text-spark">● happening now</span>}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

import { chapters } from "./nav";

/** Right-hand chapter rail: a vertical constellation. Desktop only. */
export function Rail({ active }: { active: string }) {
  return (
    <nav aria-label="Chapters" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1560px]:block">
      <ol className="relative flex flex-col gap-3.5">
        <span aria-hidden className="absolute bottom-1 right-[5px] top-1 w-px bg-line" />
        {chapters.map((c) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={on ? "location" : undefined} className="group flex items-center justify-end gap-3">
                <span className={`label !text-[10px] transition-all ${on ? "text-ink opacity-100" : "translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>{c.n} {c.label}</span>
                <svg aria-hidden width="11" height="11" viewBox="0 0 24 24" className={`relative transition-all duration-500 ${on ? "scale-125 text-spark" : "text-muted group-hover:text-emerald"}`}>
                  <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" fill="currentColor" />
                </svg>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

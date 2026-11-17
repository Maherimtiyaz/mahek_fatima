import type { ReactNode } from "react";
import type { Status } from "../data";

/** Deterministic barcode from a string — decoration for the paper files. */
export function Barcode({ value, className = "" }: { value: string; className?: string }) {
  let h = 2166136261;
  const bars: number[] = [];
  for (let i = 0; i < 46; i++) {
    h ^= value.charCodeAt(i % value.length) + i;
    h = Math.imul(h, 16777619) >>> 0;
    bars.push((h % 3) + 1);
  }
  let x = 0;
  return (
    <svg aria-hidden viewBox="0 0 140 34" className={className} preserveAspectRatio="none">
      {bars.map((b, i) => {
        const r = i % 2 === 0 ? <rect key={i} x={x} y={0} width={b} height={34} fill="currentColor" /> : null;
        x += b + (i % 2 === 0 ? 0 : 0.6);
        return r;
      })}
    </svg>
  );
}

export function Star4({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" fill="currentColor" />
    </svg>
  );
}

const statusStyle: Record<Status, string> = {
  live: "text-spark border-spark",
  shipped: "text-emerald-ink border-emerald",
  building: "text-ink border-line",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`label inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 !text-[10px] ${statusStyle[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "live" ? "bg-spark" : status === "shipped" ? "bg-emerald" : "bg-muted"}`} />
      {status}
    </span>
  );
}

export function SectionHead({ file, title, italic, children, id }: { file: string; title: string; italic?: string; children?: ReactNode; id: string }) {
  return (
    <header className="reveal relative mb-12 grid gap-6 border-t border-line pt-6 md:mb-16 md:grid-cols-12">
      <div className="md:col-span-3">
        <p className="label text-muted">
          <span className="text-spark">✶</span> FILE {file}
        </p>
        <p className="label mt-1 text-muted">/{id}</p>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.02em]">
          {title} {italic && <em className="text-emerald-ink">{italic}</em>}
        </h2>
        {children && <div className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">{children}</div>}
      </div>
    </header>
  );
}

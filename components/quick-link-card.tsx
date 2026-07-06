import React from "react";

type QuickLinkCardProps = {
  item: {
    code: string;
    title: string;
    detail: string;
  };
};

export function QuickLinkCard({ item }: QuickLinkCardProps) {
  return (
    <div className="flex items-center justify-between rounded-[1.2rem] border border-[color:var(--outline-variant)]/70 bg-white/70 px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(17,36,68,0.08)] dark:bg-white/6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--primary)] text-xs font-bold uppercase tracking-[0.16em] text-white">
          {item.code}
        </div>
        <div>
          <p className="font-semibold text-[color:var(--foreground)]">{item.title}</p>
          <p className="text-sm text-[color:var(--muted)]">{item.detail}</p>
        </div>
      </div>
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--secondary)]">
        Open
      </span>
    </div>
  );
}

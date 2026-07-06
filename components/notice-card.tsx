import React from "react";

type NoticeCardProps = {
  notice: {
    tag: string;
    date: string;
    title: string;
    description: string;
    source: string;
    accent: string;
  };
};

export function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <article className="surface-card relative overflow-hidden p-6 sm:p-7">
      <div className={`absolute inset-y-0 left-0 w-1 ${notice.accent}`} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[color:var(--secondary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--secondary-deep)]">
            {notice.tag}
          </span>
          {notice.tag === "Academic" ? (
            <span className="h-2.5 w-2.5 rounded-full bg-[#bf2d2d]" />
          ) : null}
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
          {notice.date}
        </p>
      </div>
      <h2 className="mt-4 text-2xl font-semibold leading-9 text-[color:var(--primary)]">
        {notice.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted)]">
        {notice.description}
      </p>
      <div className="mt-5 flex flex-col gap-3 border-t border-[color:var(--outline-variant)]/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--muted)]">{notice.source}</p>
        <button className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--secondary)]">
          Read More
        </button>
      </div>
    </article>
  );
}

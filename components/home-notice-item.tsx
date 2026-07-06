import React from "react";

type HomeNoticeItemProps = {
  notice: {
    date: string;
    title: string;
  };
};

export function HomeNoticeItem({ notice }: HomeNoticeItemProps) {
  return (
    <div className="border-b border-[color:var(--outline-variant)]/70 pb-4 last:border-b-0 last:pb-0">
      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
        {notice.date}
      </p>
      <p className="mt-2 text-base font-semibold text-[color:var(--foreground)]">
        {notice.title}
      </p>
    </div>
  );
}

import React from "react";

type TimelineItemProps = {
  item: {
    status: string;
    title: string;
    meta: string;
    description: string;
    tone: string;
  };
  index: number;
  isLast: boolean;
};

export function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  return (
    <article className={isLast ? "pb-0" : "pb-8"}>
      <span
        className={`absolute -left-[7px] mt-1 h-3.5 w-3.5 rounded-full ${item.tone}`}
        style={{ top: `${index * 136 + 4}px` }}
      />
      <div className={item.status === "Completed" ? "opacity-70" : ""}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
            {item.title}
          </h3>
          <span className="rounded-full bg-[color:var(--secondary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--secondary-deep)]">
            {item.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-[color:var(--muted)]">{item.meta}</p>
        <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
          {item.description}
        </p>
      </div>
    </article>
  );
}

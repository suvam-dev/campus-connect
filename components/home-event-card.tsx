import React from "react";

type HomeEventCardProps = {
  event: {
    month: string;
    day: string;
    tag: string;
    title: string;
    location: string;
  };
  index: number;
};

export function HomeEventCard({ event, index }: HomeEventCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-[color:var(--outline-variant)]/70 bg-white/72 shadow-[0_18px_40px_rgba(17,36,68,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(17,36,68,0.14)] dark:bg-white/6">
      <div
        className={`h-40 ${
          index === 0
            ? "bg-[linear-gradient(135deg,#082447,#234a73)]"
            : index === 1
              ? "bg-[linear-gradient(135deg,#7a4d09,#bb8c2e)]"
              : "bg-[linear-gradient(135deg,#113240,#27657d)]"
        } p-5 text-white`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="rounded-2xl bg-white/14 px-3 py-2 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">
              {event.month}
            </p>
            <p className="mt-1 font-serif text-3xl">{event.day}</p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/74">
            {event.tag}
          </p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-7 text-[color:var(--foreground)]">
          {event.title}
        </h3>
        <p className="mt-3 text-sm text-[color:var(--muted)]">{event.location}</p>
      </div>
    </article>
  );
}

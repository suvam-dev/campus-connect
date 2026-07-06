import React from "react";

type EventCardProps = {
  event: {
    month: string;
    day: string;
    tag: string;
    title: string;
    place: string;
    meta: string;
    tone: string;
  };
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-[color:var(--outline-variant)]/70 bg-white/76 shadow-[0_18px_40px_rgba(17,36,68,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(17,36,68,0.14)] dark:bg-white/6">
      <div className={`h-48 bg-gradient-to-br ${event.tone} p-5 text-white`}>
        <div className="flex h-full items-start justify-between">
          <div className="rounded-2xl bg-white/14 px-3 py-2 text-center backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">
              {event.month}
            </p>
            <p className="mt-1 font-serif text-3xl">{event.day}</p>
          </div>
          <span className="rounded-full bg-white/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
            {event.tag}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-7 text-[color:var(--foreground)]">
          {event.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{event.place}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--secondary)]">
          {event.meta}
        </p>
      </div>
    </article>
  );
}

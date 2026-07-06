import React from "react";

type BookmarkCardProps = {
  item: {
    code: string;
    title: string;
    description: string;
  };
  index: number;
};

export function BookmarkCard({ item, index }: BookmarkCardProps) {
  return (
    <article className="rounded-[1.4rem] border border-[color:var(--outline-variant)]/70 bg-white/75 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(17,36,68,0.08)] dark:bg-white/6">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xs font-bold uppercase tracking-[0.16em] text-white ${
          index === 0 ? "bg-[#c19322]" : index === 1 ? "bg-[#123d71]" : "bg-[#4b6076]"
        }`}
      >
        {item.code}
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-7 text-[color:var(--foreground)]">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
        {item.description}
      </p>
    </article>
  );
}

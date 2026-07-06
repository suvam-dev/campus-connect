import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { NoticeCard } from "@/components/notice-card";

export const metadata: Metadata = {
  title: "Notices | Campus Connect",
  description: "Latest academic, placement, general, and administrative notices.",
};

const filters = ["All Notices", "Academic", "Placement", "General", "Administrative"];

const notices = [
  {
    tag: "Academic",
    date: "July 6, 2026 • 10:30 AM",
    title: "Revised mid-semester examination schedule released for Autumn 2026-27",
    description:
      "Venue changes affect core engineering papers and select common electives. Students should re-check exam cells before hall reporting.",
    source: "Academic Section",
    accent: "bg-[#c8951b]",
  },
  {
    tag: "Placement",
    date: "July 5, 2026 • 4:15 PM",
    title: "Registration open for Phase 1 pre-placement talks",
    description:
      "Eligible students must confirm attendance on the ERP portal before slot allocation closes. Company-specific sessions will be locked after submission.",
    source: "Career Development Centre",
    accent: "bg-[#123e74]",
  },
  {
    tag: "Administrative",
    date: "July 4, 2026",
    title: "Campus water supply maintenance announced for Saturday blocks",
    description:
      "Low pressure is expected near halls of residence and the old academic zone while the central purification line undergoes maintenance.",
    source: "Estate Office",
    accent: "bg-[#39536a]",
  },
  {
    tag: "General",
    date: "July 2, 2026",
    title: "Call for papers opened for the annual campus technology symposium",
    description:
      "Research abstracts, demos, and student-led project submissions are invited across computing, energy, materials, and design systems.",
    source: "Technology Students' Gymkhana",
    accent: "bg-[#6b5612]",
  },
];

export default function NoticesPage() {
  return (
    <SiteShell active="notices">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-10">
        <p className="section-kicker">Notice Board</p>
        <h1 className="mt-3 font-serif text-4xl text-[color:var(--primary)] sm:text-5xl">
          Academic and administrative updates without the inbox chaos.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
          Track urgent circulars, placement communication, and campus-wide operational changes
          from one filtered stream.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[0.32fr_0.68fr] lg:px-10">
        <aside className="surface-card h-fit p-7">
          <input
            type="text"
            placeholder="Search notices..."
            className="w-full rounded-full border border-[color:var(--outline-variant)] bg-white/80 px-5 py-3 text-sm text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--primary)] dark:bg-white/6"
          />
          <div className="mt-7">
            <p className="section-kicker">Categories</p>
            <div className="mt-4 grid gap-2">
              {filters.map((filter, index) => (
                <label
                  key={filter}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-[color:var(--foreground)] transition hover:bg-white/70 dark:hover:bg-white/6"
                >
                  <span
                    className={`h-3 w-3 rounded-full border border-[color:var(--outline-variant)] ${
                      index === 0 ? "bg-[color:var(--primary)]" : "bg-transparent"
                    }`}
                  />
                  {filter}
                </label>
              ))}
            </div>
          </div>
          <div className="mt-7">
            <p className="section-kicker">Sort By</p>
            <div className="mt-4 rounded-2xl border border-[color:var(--outline-variant)] bg-white/80 px-4 py-3 text-sm text-[color:var(--foreground)] dark:bg-white/6">
              Newest First
            </div>
          </div>
        </aside>

        <div className="grid gap-4">
          {notices.map((notice) => (
            <NoticeCard key={notice.title} notice={notice} />
          ))}

          <button className="mx-auto mt-4 rounded-full border border-[color:var(--outline-variant)] bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--primary)] dark:bg-white/6">
            Load More Notices
          </button>
        </div>
      </section>
    </SiteShell>
  );
}

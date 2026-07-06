import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Bookmarks | Campus Connect",
  description: "Saved resources, account settings, and registered events for students.",
};

const savedItems = [
  {
    code: "ML",
    title: "Advanced Machine Learning Syllabus",
    description: "Reference materials and grading structure for the Autumn 2026 offering.",
  },
  {
    code: "RP",
    title: "Neural Systems Research Paper Stack",
    description: "Saved papers from the central library repository for thesis preparation.",
  },
  {
    code: "PL",
    title: "Campus Placement Guidelines",
    description: "Updated registration and interview rules for the current placement cycle.",
  },
];

const timeline = [
  {
    status: "Upcoming",
    title: "Kshitij Innovation Track",
    meta: "August 18 to August 21, 2026 • Main Campus",
    description: "Registered for the autonomous systems challenge and hardware demo arena.",
    tone: "bg-[#b98a21]",
  },
  {
    status: "Tomorrow",
    title: "Alumni Guest Lecture: AI Governance",
    meta: "July 7, 2026 • Netaji Auditorium",
    description: "Recommended for final-year CS, EE, and law-and-technology electives.",
    tone: "bg-[#153f73]",
  },
  {
    status: "Completed",
    title: "Spring Fest Coordination Meet",
    meta: "June 28, 2026 • Student Activity Center",
    description: "Core volunteer planning review completed.",
    tone: "bg-[#7e8793]",
  },
];

export default function BookmarksPage() {
  return (
    <SiteShell active="bookmarks">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <div className="grid gap-8">
            <div className="surface-card p-7 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,#123d71,#c3982c)] font-serif text-3xl text-white shadow-[0_14px_28px_rgba(18,61,113,0.28)]">
                AS
              </div>
              <h1 className="mt-5 font-serif text-3xl text-[color:var(--primary)]">Aarav Sharma</h1>
              <p className="mt-2 text-sm text-[color:var(--muted)]">Roll No. 20CS10001</p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[color:var(--outline-variant)]/70 pt-6 text-left">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Department
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
                    Computer Science and Engineering
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Year
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
                    Senior
                  </p>
                </div>
              </div>
              <button className="mt-6 rounded-full bg-[color:var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Edit Profile
              </button>
            </div>

            <div className="surface-card p-7">
              <h2 className="section-title">Account Settings</h2>
              <div className="mt-6 grid gap-2">
                {["Privacy Settings", "Notifications", "Security"].map((item) => (
                  <button
                    key={item}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 text-left text-sm text-[color:var(--foreground)] transition hover:bg-white/70 dark:hover:bg-white/6"
                  >
                    <span>{item}</span>
                    <span className="text-[color:var(--secondary)]">Open</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="surface-card p-7">
              <div className="flex items-center justify-between">
                <h2 className="section-title">My Bookmarks</h2>
                <span className="section-kicker">Saved Resources</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {savedItems.map((item, index) => (
                  <article
                    key={item.title}
                    className="rounded-[1.4rem] border border-[color:var(--outline-variant)]/70 bg-white/75 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(17,36,68,0.08)] dark:bg-white/6"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xs font-bold uppercase tracking-[0.16em] text-white ${
                        index === 0
                          ? "bg-[#c19322]"
                          : index === 1
                            ? "bg-[#123d71]"
                            : "bg-[#4b6076]"
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
                ))}
              </div>
            </div>

            <div className="surface-card p-7">
              <h2 className="section-title">Registered Events</h2>
              <div className="relative mt-8 border-l border-[color:var(--outline-variant)] pl-6">
                {timeline.map((item, index) => (
                  <article
                    key={item.title}
                    className={index === timeline.length - 1 ? "pb-0" : "pb-8"}
                  >
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

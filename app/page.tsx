import type { Metadata } from "next";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Campus Connect | IIT Kharagpur",
  description: "Student home for events, notices, bookmarks, and academic resources.",
};

const quickLinks = [
  { code: "SP", title: "Student Portal", detail: "Attendance, academics, and registration" },
  { code: "ERP", title: "ERP System", detail: "Administration and semester workflows" },
  { code: "LIB", title: "Central Library", detail: "Digital access and reading rooms" },
];

const notices = [
  { date: "July 6, 2026", title: "Autumn semester hostel move-in windows released" },
  { date: "July 4, 2026", title: "Innovation grant applications open for student teams" },
  { date: "July 2, 2026", title: "Main library extends late-night access during registration week" },
];

const events = [
  {
    month: "Jul",
    day: "12",
    tag: "Research",
    title: "AI for Sustainable Infrastructure Colloquium",
    location: "Nalanda Complex",
  },
  {
    month: "Jul",
    day: "18",
    tag: "Culture",
    title: "Monsoon Music Evening at TOAT",
    location: "Tagore Open Air Theatre",
  },
  {
    month: "Jul",
    day: "24",
    tag: "Workshop",
    title: "Robotics Fabrication Bootcamp",
    location: "CSE Robotics Lab",
  },
];

export default function HomePage() {
  return (
    <SiteShell active="home">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:pb-18 lg:pt-16">
        <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,rgba(246,249,253,0.94),rgba(230,237,246,0.78)),radial-gradient(circle_at_top_right,rgba(186,146,54,0.18),transparent_30%)] p-8 shadow-[0_24px_80px_rgba(12,24,48,0.12)] dark:border-white/8 dark:bg-[linear-gradient(135deg,rgba(13,23,37,0.96),rgba(17,28,42,0.88)),radial-gradient(circle_at_top_right,rgba(186,146,54,0.16),transparent_30%)] sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[color:var(--secondary)]">
            Student Digital Commons
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-[color:var(--primary)] sm:text-5xl lg:text-6xl">
            Welcome to Campus Connect, the central IIT Kharagpur student portal.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Track institutional notices, discover campus events, and keep your most-used
            academic resources in one place without the usual ERP clutter.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="rounded-full bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--primary-strong)]"
            >
              Explore Events
            </Link>
            <Link
              href="/notices"
              className="rounded-full border border-[color:var(--outline-variant)] bg-white/75 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)] transition hover:-translate-y-0.5 dark:bg-white/8"
            >
              View Notices
            </Link>
          </div>
        </div>

        <aside className="surface-card flex flex-col gap-5 self-stretch p-7">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--secondary)]">
              Featured Event
            </p>
            <span className="rounded-full bg-[color:var(--secondary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--secondary-deep)]">
              Today
            </span>
          </div>
          <div className="rounded-[1.5rem] border border-[color:var(--outline-variant)]/70 bg-[linear-gradient(180deg,rgba(11,31,58,0.96),rgba(22,46,77,0.88))] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--footer-accent)]">
              Annual Tech Symposium
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight">
              Systems, Semiconductors, and Scaled Intelligence.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/76">
              Three days of keynote talks, lab showcases, startup demos, and research posters
              across engineering departments.
            </p>
            <Link
              href="/events"
              className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--footer-accent)]"
            >
              View schedule
            </Link>
          </div>
        </aside>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-20">
        <div className="grid gap-8">
          <div className="surface-card p-7">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Quick Links</h2>
              <span className="section-kicker">Academic Tools</span>
            </div>
            <div className="mt-6 grid gap-3">
              {quickLinks.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-[1.2rem] border border-[color:var(--outline-variant)]/70 bg-white/70 px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(17,36,68,0.08)] dark:bg-white/6"
                >
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
              ))}
            </div>
          </div>

          <div className="surface-card p-7">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Notice Board</h2>
              <Link href="/notices" className="section-kicker">
                View All
              </Link>
            </div>
            <div className="mt-6 grid gap-4">
              {notices.map((notice) => (
                <div
                  key={notice.title}
                  className="border-b border-[color:var(--outline-variant)]/70 pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    {notice.date}
                  </p>
                  <p className="mt-2 text-base font-semibold text-[color:var(--foreground)]">
                    {notice.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-card p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Campus Calendar</p>
              <h2 className="section-title mt-2">Upcoming Events</h2>
            </div>
            <Link href="/events" className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--secondary)]">
              Browse All
            </Link>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
              <article
                key={event.title}
                className="overflow-hidden rounded-[1.6rem] border border-[color:var(--outline-variant)]/70 bg-white/72 shadow-[0_18px_40px_rgba(17,36,68,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(17,36,68,0.14)] dark:bg-white/6"
              >
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
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Events | Campus Connect",
  description: "Browse academic, technical, and cultural events at IIT Kharagpur.",
};

const categories = [
  "All Events",
  "Academic and Research",
  "Technical Symposia",
  "Cultural Fests",
  "Sports Tournaments",
  "Guest Lectures",
];

const events = [
  {
    month: "Jul",
    day: "12",
    tag: "Technical",
    title: "Advanced Autonomous Robotics Symposium",
    place: "Kalpana Chawla Space Technology Cell, Room 204",
    meta: "10:00 AM to 4:00 PM",
    tone: "from-[#102847] to-[#285a87]",
  },
  {
    month: "Jul",
    day: "18",
    tag: "Cultural",
    title: "Monsoon Classics at Spring Fest Prelims",
    place: "Tagore Open Air Theatre",
    meta: "6:00 PM onwards",
    tone: "from-[#81540a] to-[#c89a34]",
  },
  {
    month: "Jul",
    day: "24",
    tag: "Guest Lecture",
    title: "Quantum Computing and Applied Cryptography",
    place: "Raman Auditorium, Main Building",
    meta: "Hosted by CSE Department",
    tone: "from-[#203343] to-[#467083]",
  },
  {
    month: "Jul",
    day: "27",
    tag: "Workshop",
    title: "Design Thinking for Hardware Startups",
    place: "Rajendra Prasad Hall Seminar Room",
    meta: "2:00 PM to 5:00 PM",
    tone: "from-[#38465a] to-[#596b85]",
  },
  {
    month: "Aug",
    day: "02",
    tag: "Research",
    title: "Energy Systems Poster Forum",
    place: "Vikramshila Atrium",
    meta: "Student and faculty showcase",
    tone: "from-[#203e34] to-[#4b7a61]",
  },
  {
    month: "Aug",
    day: "05",
    tag: "Community",
    title: "Open Campus Collaboration Fair",
    place: "Technology Students' Gymkhana Lawns",
    meta: "Cross-club recruiting and demos",
    tone: "from-[#4e2c57] to-[#7b4f88]",
  },
];

export default function EventsPage() {
  return (
    <SiteShell active="events">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-10">
        <p className="section-kicker">Discover Events</p>
        <h1 className="mt-3 font-serif text-4xl text-[color:var(--primary)] sm:text-5xl">
          Technical symposia, cultural nights, workshops, and talks.
        </h1>
        <div className="surface-card mt-8 flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search for symposia, fests, workshops, lectures..."
            className="w-full rounded-full border border-[color:var(--outline-variant)] bg-white/80 px-5 py-3 text-sm text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--primary)] dark:bg-white/6"
          />
          <button className="rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Filter
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {["All", "This Week", "Workshops", "Technical", "Cultural"].map((chip, index) => (
            <button
              key={chip}
              className={
                index === 0
                  ? "rounded-full bg-[color:var(--primary)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                  : "rounded-full border border-[color:var(--outline-variant)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)] dark:bg-white/6"
              }
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[0.34fr_0.66fr] lg:px-10">
        <aside className="surface-card h-fit p-7">
          <h2 className="section-title">Categories</h2>
          <div className="mt-6 grid gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={
                  index === 0
                    ? "rounded-2xl bg-[color:var(--secondary-soft)] px-4 py-3 text-left text-sm font-semibold text-[color:var(--primary)]"
                    : "rounded-2xl px-4 py-3 text-left text-sm text-[color:var(--muted)] transition hover:bg-white/70 hover:text-[color:var(--primary)] dark:hover:bg-white/6"
                }
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.title}
              className="overflow-hidden rounded-[1.75rem] border border-[color:var(--outline-variant)]/70 bg-white/76 shadow-[0_18px_40px_rgba(17,36,68,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(17,36,68,0.14)] dark:bg-white/6"
            >
              <div className={`h-48 bg-gradient-to-br ${event.tone} p-5 text-white`}>
                <div className="flex h-full items-start justify-between">
                  <div className="rounded-2xl bg-white/14 px-3 py-2 text-center backdrop-blur">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">{event.month}</p>
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
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

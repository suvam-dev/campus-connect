import Link from "next/link";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

type NavKey = "home" | "events" | "notices" | "bookmarks";

type SiteShellProps = {
  active: NavKey;
  children: ReactNode;
};

const navItems: Array<{ key: NavKey; href: string; label: string }> = [
  { key: "home", href: "/", label: "Home" },
  { key: "events", href: "/events", label: "Events" },
  { key: "notices", href: "/notices", label: "Notices" },
  { key: "bookmarks", href: "/bookmarks", label: "Bookmarks" },
];

function navClass(isActive: boolean) {
  return isActive
    ? "border-b-2 border-[color:var(--secondary)] pb-1 text-[color:var(--primary)]"
    : "text-[color:var(--muted)] transition hover:text-[color:var(--primary)]";
}

export function SiteShell({ active, children }: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(186,146,54,0.16),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(17,36,68,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.72),_rgba(240,244,249,0.94))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(214,176,72,0.12),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(121,157,214,0.16),_transparent_26%),linear-gradient(180deg,_rgba(8,14,24,0.98),_rgba(12,20,31,0.98))]" />
      <header className="sticky top-0 z-50 border-b border-[color:var(--outline-variant)]/70 bg-[color:var(--surface-overlay)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-serif text-lg font-semibold tracking-[0.16em] text-[color:var(--secondary)] uppercase">
                IIT Kharagpur
              </span>
              <span className="mt-1 text-xs uppercase tracking-[0.34em] text-[color:var(--muted)]">
                Campus Connect
              </span>
            </Link>
            <div className="hidden h-10 w-px bg-[color:var(--outline-variant)]/70 md:block" />
            <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
              {navItems.map((item) => (
                <Link key={item.key} href={item.href} className={navClass(item.key === active)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/bookmarks"
              className="rounded-full bg-[color:var(--primary)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--primary-strong)]"
            >
              Student Login
            </Link>
          </div>
        </div>
      </header>
      <main className="relative z-10 flex-1">{children}</main>
      <footer className="relative z-10 border-t border-[color:var(--outline-variant)]/70 bg-[color:var(--tertiary)] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
          <div>
            <p className="font-serif text-2xl">IIT Kharagpur</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/78">
              A unified student-facing portal for academic notices, flagship events, saved
              resources, and campus life updates.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--footer-accent)]">
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
              <Link href="/">Home</Link>
              <Link href="/events">Events</Link>
              <Link href="/notices">Notice Board</Link>
            </div>
          </div>
          <div className="lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--footer-accent)]">
              Institution
            </p>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Dedicated to the service of the nation.
              <br />
              © 2026 IIT Kharagpur.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

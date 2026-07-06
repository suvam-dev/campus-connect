"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = root.classList.contains("dark") || prefersDark;

    root.classList.toggle("dark", initialDark);
    setIsDark(initialDark);
    setReady(true);
  }, []);

  function toggleTheme() {
    const nextDark = !isDark;
    document.documentElement.classList.toggle("dark", nextDark);
    setIsDark(nextDark);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-[color:var(--outline-variant)] bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)] transition hover:-translate-y-0.5 hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
      aria-label="Toggle color theme"
    >
      {ready ? (isDark ? "Light" : "Dark") : "Theme"}
    </button>
  );
}

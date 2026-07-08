"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { UserButton, SignInButton, SignUpButton, Show } from '@clerk/nextjs';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Notices', path: '/notices' },
  { name: 'Directory', path: '/profile' },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-indigo-700 transition-colors shadow-sm select-none">
        CC
      </div>
      <span className="font-semibold text-[17px] tracking-tight text-slate-900 dark:text-white">
        Campus Connect
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on route change
  React.useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [pathname, open]);

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between h-16 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">

          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-8">
            <Logo />

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={cn(
                      "relative px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="header-active-indicator"
                        className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-md -z-10"
                        transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                      />
                    )}
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: search + actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex relative w-56 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500 h-9 text-sm"
              />
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <Show when="signed-in">
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white dark:border-slate-950" />
                  </Button>
                </Link>
                <div className="ml-2">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800"
                      }
                    }}
                  />
                </div>
              </Show>

              <Show when="signed-out">
                <div className="hidden md:flex items-center gap-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                      Log in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold rounded-full px-5">
                      Sign up
                    </Button>
                  </SignUpButton>
                </div>
              </Show>
            </div>

            {/* Hamburger — mobile only */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* ── Premium Full-Screen Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl flex flex-col md:hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 shrink-0">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full w-10 h-10 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col px-6 pt-8 gap-6 overflow-y-auto">
              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-4xl font-bold tracking-tight transition-colors flex items-center",
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-900 dark:text-white hover:text-indigo-600"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Auth footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="p-6 shrink-0"
            >
              <Show when="signed-out">
                <div className="flex flex-col gap-3">
                  <SignUpButton mode="modal">
                    <Button className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold shadow-lg shadow-indigo-600/20">
                      Sign up
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-semibold text-slate-900 dark:text-white border-slate-200 dark:border-slate-800">
                      Log in
                    </Button>
                  </SignInButton>
                </div>
              </Show>

              <Show when="signed-in">
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-3xl">
                  <UserButton />
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-slate-900 dark:text-white">My Account</span>
                    <span className="text-sm text-slate-500">Manage settings</span>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto text-slate-500 bg-white dark:bg-slate-800 rounded-full w-10 h-10 shadow-sm">
                    <Bell className="w-5 h-5" />
                  </Button>
                </div>
              </Show>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

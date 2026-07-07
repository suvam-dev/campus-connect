"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Menu } from 'lucide-react';
import { cn } from './lib/utils';
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
  { name: 'Directory', path: '/profile' }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between h-16 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-bold group-hover:bg-slate-800 dark:group-hover:bg-slate-100 transition-colors">
              CC
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900 dark:text-white">
              Campus Connect
            </span>
          </Link>
          
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

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700"
            />
          </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-slate-500 dark:text-slate-400">
            <Menu className="w-5 h-5" />
          </Button>
          
          <Show when="signed-out">
            <SignInButton mode="modal" />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}

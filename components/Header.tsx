"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Menu } from 'lucide-react';
import { cn } from './lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Notices', path: '/notices' },
  { name: 'Directory', path: '/profile' }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-16 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold group-hover:bg-slate-800 transition-colors">
              CC
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">
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
                      ? "text-slate-900" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="header-active-indicator"
                      className="absolute inset-0 bg-slate-100 rounded-md -z-10"
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
              className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-slate-200"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-slate-500">
            <Menu className="w-5 h-5" />
          </Button>
          
          <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-transparent hover:ring-slate-200 transition-all">
            <AvatarImage src="" alt="@user" />
            <AvatarFallback className="bg-slate-100 text-slate-900 font-medium text-xs">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

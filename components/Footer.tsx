"use client";

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 mt-12">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 text-center md:text-left">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start gap-4">
            {/* Logo — identical to navbar */}
            <Link href="/" className="flex items-center gap-2.5 group w-fit mx-auto md:mx-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-indigo-700 transition-colors shadow-sm select-none">
                CC
              </div>
              <span className="font-semibold text-[17px] tracking-tight text-slate-900 dark:text-white">
                Campus Connect
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your central hub for campus events, notices, and community connections.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 text-sm tracking-wide uppercase">Explore</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/events" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Events</Link></li>
              <li><Link href="/notices" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Notices</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 text-sm tracking-wide uppercase">Account</h4>
            <ul className="space-y-2.5">
              <li><Link href="/profile" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Profile</Link></li>
              <li><Link href="/bookmarks" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Bookmarks</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 text-sm tracking-wide uppercase">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Campus Connect. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}

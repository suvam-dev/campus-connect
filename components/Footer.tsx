"use client";

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 mt-12">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-bold text-slate-900 mb-3">Campus Connect</div>
            <p className="text-sm text-slate-600">
              Your central hub for campus events, notices, and community connections.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition">Home</Link></li>
              <li><Link href="/events" className="text-sm text-slate-600 hover:text-slate-900 transition">Events</Link></li>
              <li><Link href="/notices" className="text-sm text-slate-600 hover:text-slate-900 transition">Notices</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Account</h4>
            <ul className="space-y-2">
              <li><Link href="/profile" className="text-sm text-slate-600 hover:text-slate-900 transition">Profile</Link></li>
              <li><Link href="/bookmarks" className="text-sm text-slate-600 hover:text-slate-900 transition">Bookmarks</Link></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Settings</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Privacy</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Terms</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs text-slate-600 text-center">
            © 2024 Campus Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

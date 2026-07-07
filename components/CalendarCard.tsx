"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';

export function CalendarCard({ className }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
    >
      <Card className={cn("group cursor-pointer rounded-2xl border-slate-200 shadow-sm relative overflow-hidden min-h-[160px]", className)}>
        {/* Subtle background gradient to make it stand out just a bit, but maintaining light theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-80" />
        
        <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-white text-indigo-600 border border-indigo-100 shadow-sm">
              <CalendarDays className="w-6 h-6" />
            </div>
            <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
              View Academic<br />Calendar
            </h3>
            <p className="text-xs text-indigo-600 mt-2 font-medium group-hover:translate-x-1 transition-transform inline-block">
              2026-2027 Session →
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

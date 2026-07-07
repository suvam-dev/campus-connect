"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, ArrowUpRight } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';

interface EventCardProps {
  title: string;
  venue: string;
  date: string;
  index?: number;
  className?: string;
}

export function EventCard({ title, venue, date, index = 0, className }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn("group hover:border-slate-300 transition-all cursor-pointer rounded-2xl shadow-sm border-slate-200 overflow-hidden", className)}>
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
              <CalendarDays className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {title}
            </h3>
            
            <div className="flex flex-col gap-1.5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{venue}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

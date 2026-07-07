"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, ArrowUpRight } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface EventCardProps {
  id?: string;
  title: string;
  venue: string;
  date: string;
  tags?: string[];
  index?: number;
  className?: string;
}

export function EventCard({ id, title, venue, date, tags, index = 0, className }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn("group hover:border-blue-300/60 transition-all cursor-pointer rounded-2xl shadow-sm border-slate-200 overflow-hidden flex flex-col bg-gradient-to-br from-blue-50/50 to-indigo-50/20", className)}>
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
              <CalendarDays className="w-5 h-5" />
            </div>
            {id ? (
              <Link href={`/events/${id}`}>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors cursor-pointer" />
              </Link>
            ) : (
              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            )}
          </div>

          <div className="flex flex-col gap-3 flex-grow">
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {title}
            </h3>
            
            <div className="flex flex-col gap-1.5 text-sm text-slate-500 mb-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{venue}</span>
              </div>
            </div>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1 mb-4">
                {tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
            {id ? (
              <Link href={`/events/${id}`} className="flex-1">
                <Button variant="outline" className="w-full h-9 text-xs font-semibold rounded-lg border-slate-200">
                  Read More
                </Button>
              </Link>
            ) : (
              <Button variant="outline" className="flex-1 h-9 text-xs font-semibold rounded-lg border-slate-200">
                Read More
              </Button>
            )}
            <Button className="flex-1 h-9 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700">
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

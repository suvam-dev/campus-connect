"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';

interface NoticeCardProps {
  title: string;
  category: string;
  date: string;
  index?: number;
  className?: string;
}

export function NoticeCard({ title, category, date, index = 0, className }: NoticeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn("group hover:border-slate-300 transition-all cursor-pointer rounded-2xl shadow-sm border-slate-200", className)}>
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {date}
            </span>
          </div>
          
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-slate-900 leading-snug line-clamp-2">
              {title}
            </h3>
            <div className="mt-0.5 p-1 rounded-md text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

interface ImportantTodayCardProps {
  title: string;
  subtitle?: string;
  category: string;
  timeTag: string;
  icon: React.ReactNode;
  iconBgClassName?: string;
  index?: number;
  className?: string;
}

export function ImportantTodayCard({
  title,
  subtitle,
  category,
  timeTag,
  icon,
  iconBgClassName = "bg-indigo-50 text-indigo-600",
  index = 0,
  className
}: ImportantTodayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="w-full min-w-[280px] sm:min-w-[320px]"
    >
      <Card className={cn("hover:shadow-md transition-shadow cursor-pointer rounded-2xl border border-slate-100", className)}>
        <CardContent className="p-4 flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", iconBgClassName)}>
            {icon}
          </div>
          
          <div className="flex flex-col flex-grow min-w-0">
            <h4 className="font-bold text-sm text-slate-900 truncate">{title}</h4>
            {subtitle && <p className="text-xs text-slate-500 font-medium truncate">{subtitle}</p>}
            
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-md bg-indigo-50 text-indigo-700">
                {category}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{timeTag}</span>
            </div>
          </div>
          
          <div className="shrink-0 text-slate-300">
            <ChevronRight className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

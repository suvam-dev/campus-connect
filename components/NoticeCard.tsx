"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface NoticeCardProps {
  id?: string;
  title: string;
  category: string;
  date: string;
  tags?: string[];
  index?: number;
  className?: string;
}

export function NoticeCard({ id, title, category, date, tags, index = 0, className }: NoticeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn("group hover:border-amber-300/60 transition-all cursor-pointer rounded-2xl shadow-sm border-slate-200 flex flex-col h-full bg-gradient-to-br from-amber-50/50 to-orange-50/20", className)}>
        <CardContent className="p-5 flex flex-col gap-3 flex-grow">
          <div className="flex items-center justify-between mb-2">
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
            {id ? (
              <Link href={`/notices/${id}`}>
                <div className="mt-0.5 p-1 rounded-md text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900 transition-colors cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ) : (
              <div className="mt-0.5 p-1 rounded-md text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 pb-2">
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 text-[10px] font-medium text-slate-500 bg-slate-100 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
            {id ? (
              <Link href={`/notices/${id}`} className="flex-1">
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
              Acknowledge
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

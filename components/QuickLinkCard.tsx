"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Library, Bus, Utensils, Map as MapIcon, LucideIcon } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  Library,
  Bus,
  Utensils,
  Map: MapIcon
};

interface QuickLinkCardProps {
  title: string;
  iconName: string;
  index?: number;
  className?: string;
}

export function QuickLinkCard({ title, iconName, index = 0, className }: QuickLinkCardProps) {
  const Icon = ICON_MAP[iconName] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={cn("group cursor-pointer hover:border-slate-300 transition-all rounded-2xl shadow-sm border-slate-200 bg-gradient-to-b from-slate-50/80 to-white aspect-square flex items-center justify-center", className)}>
        <CardContent className="p-4 flex flex-col items-center justify-center gap-3 w-full">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 text-center transition-colors">
            {title}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

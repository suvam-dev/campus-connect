"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Library, Bus, Utensils, Map as MapIcon, Hotel, Users, LucideIcon } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  Library,
  Bus,
  Utensils,
  Map: MapIcon,
  Hotel,
  Users
};

const COLOR_MAP: Record<string, string> = {
  BookOpen: "text-indigo-500 group-hover:text-indigo-600",
  GraduationCap: "text-blue-500 group-hover:text-blue-600",
  Library: "text-emerald-500 group-hover:text-emerald-600",
  Bus: "text-amber-500 group-hover:text-amber-600",
  Utensils: "text-rose-500 group-hover:text-rose-600",
  Map: "text-violet-500 group-hover:text-violet-600",
  Hotel: "text-cyan-500 group-hover:text-cyan-600",
  Users: "text-pink-500 group-hover:text-pink-600",
};

interface QuickLinkCardProps {
  title: string;
  iconName: string;
  index?: number;
  className?: string;
}

export function QuickLinkCard({ title, iconName, index = 0, className }: QuickLinkCardProps) {
  const Icon = ICON_MAP[iconName] || BookOpen;
  const colorClass = COLOR_MAP[iconName] || "text-indigo-500";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-3"
    >
      <Card className={cn("group cursor-pointer hover:shadow-md transition-all rounded-[1.5rem] shadow-sm border border-slate-100 bg-white aspect-square flex items-center justify-center w-[4.25rem] h-[4.25rem] sm:w-20 sm:h-20 md:w-24 md:h-24", className)}>
        <CardContent className="p-0 flex items-center justify-center w-full h-full">
          <Icon className={cn("w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 stroke-[1.5]", colorClass)} />
        </CardContent>
      </Card>
      <span className="text-xs font-bold text-slate-700 text-center">
        {title}
      </span>
    </motion.div>
  );
}

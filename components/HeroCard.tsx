"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface HeroCardProps {
  title: string;
  venue: string;
  date: string;
  imageUrl?: string;
  className?: string;
}

export function HeroCard({ title, venue, date, imageUrl, className }: HeroCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn("group cursor-pointer", className)}
    >
      <Card className="overflow-hidden border-slate-200 shadow-sm h-full flex flex-col justify-end relative rounded-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundColor: '#f8fafc'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90" />
        
        <CardContent className="relative z-10 p-6 md:p-8 flex flex-col gap-4">
          <div className="inline-flex items-center rounded-md bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white w-fit border border-white/20">
            Featured Event
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-2xl">
            {title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-slate-200 text-sm mt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-300" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-300" />
              <span>{venue}</span>
            </div>
          </div>

          <div className="mt-4">
            <Button className="bg-white text-slate-900 hover:bg-slate-100 font-medium rounded-lg">
              Register Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

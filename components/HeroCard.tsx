"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Star, Users, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface HeroCardProps {
  title: string;
  subtitle: string;
  description?: string;
  imageUrl?: string;
  className?: string;
}

export function HeroCard({ title, subtitle, description, imageUrl, className }: HeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full relative rounded-[2rem] overflow-hidden", className)}
    >
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'url(https://upload.wikimedia.org/wikipedia/commons/a/ae/Spring_Fest_IIT_Kharagpur_-_Jim_Ankan_Deka_photography.jpg)',
          backgroundColor: '#0f172a'
        }}
      />
      <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full min-h-[450px] md:min-h-[500px] flex flex-col justify-between p-8 md:p-12 lg:p-16">
        
        {/* Top / Main Text */}
        <div className="max-w-2xl flex flex-col gap-4 mt-4">
          <div className="inline-flex items-center rounded-md bg-indigo-600/80 backdrop-blur-md px-3 py-1 text-xs font-bold tracking-widest uppercase text-white w-fit">
            Featured Event
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mt-2">
            {title}
          </h1>
          
          <h2 className="text-xl md:text-2xl font-semibold text-slate-100">
            {subtitle}
          </h2>

          {description && (
            <div className="p-3 border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-sm rounded-lg mt-2 max-w-lg">
              <p className="text-sm md:text-base text-slate-200">
                {description}
              </p>
            </div>
          )}

          <div className="mt-6">
            <Button className="bg-white text-indigo-900 hover:bg-slate-100 font-bold rounded-xl px-8 py-6 text-lg h-auto">
              Register Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats (Glassmorphism) */}
        <div className="mt-12 lg:mt-0 lg:absolute lg:bottom-12 lg:right-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 p-px rounded-2xl overflow-hidden backdrop-blur-md border border-white/20">
            
            <div className="bg-slate-950/40 backdrop-blur-xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 text-center">
              <Calendar className="w-6 h-6 text-indigo-300" />
              <div>
                <div className="text-xs font-medium text-slate-300">Starts in</div>
                <div className="text-sm font-bold text-white">6 Days</div>
              </div>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 text-center">
              <Star className="w-6 h-6 text-indigo-300" />
              <div>
                <div className="text-xs font-medium text-slate-300">120+</div>
                <div className="text-sm font-bold text-white">Events</div>
              </div>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 text-center">
              <Users className="w-6 h-6 text-indigo-300" />
              <div>
                <div className="text-xs font-medium text-slate-300">25,000+</div>
                <div className="text-sm font-bold text-white">Participants</div>
              </div>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 text-center">
              <MapPin className="w-6 h-6 text-indigo-300" />
              <div>
                <div className="text-xs font-medium text-slate-300">100 Acre</div>
                <div className="text-sm font-bold text-white">Campus</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}

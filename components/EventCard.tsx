"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';
import { Button, buttonVariants } from './ui/button';

interface EventCardProps {
  id?: string;
  title: string;
  venue: string;
  date: string;
  imageUrl?: string;
  tags?: string[];
  index?: number;
  className?: string;
  variant?: 'default' | 'compact';
}

const FALLBACK_IMAGE = '/images/event-fallback.svg';

export function EventCard({ id, title, venue, date, imageUrl, tags, index = 0, className, variant = 'default' }: EventCardProps) {
  // Treat empty string as missing — always fall back to local SVG
  const resolvedSrc = imageUrl?.trim() || FALLBACK_IMAGE;
  const [imgSrc, setImgSrc] = useState<string>(resolvedSrc);
  const [imgError, setImgError] = useState(false);

  let month = "JUL";
  let day = "09";
  let timeStr = date;
  
  try {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      day = d.toLocaleDateString('en-US', { day: '2-digit' });
      
      const now = new Date();
      if (d.toDateString() === now.toDateString()) {
        timeStr = `Today, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
      } else {
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        if (d.toDateString() === tomorrow.toDateString()) {
           timeStr = `Tomorrow, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        } else {
           timeStr = `${d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        }
      }
    }
  } catch (e) {
    // fallback
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="h-full"
    >
      <Card className={cn("group h-full flex flex-col overflow-hidden border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 rounded-[20px] bg-white", className)}>
        {/* Top Image Section */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden shrink-0">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={() => {
              if (!imgError) {
                setImgError(true);
                setImgSrc(FALLBACK_IMAGE);
              }
            }}
          />
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-2 min-w-[3.5rem] h-[3.5rem]">
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#5235FF] leading-none mb-1">{month}</span>
            <span className="text-xl font-bold leading-none text-slate-900">{day}</span>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 flex flex-col flex-grow">
          <h3 className={cn("font-bold text-[22px] line-clamp-2 mb-4 leading-snug tracking-tight transition-colors", 
            variant === 'compact' ? "text-[#5235FF]" : "text-slate-900 group-hover:text-[#5235FF]"
          )}>
            {title}
          </h3>
          
          <div className="flex flex-col gap-3 text-[14px] text-slate-500 font-medium flex-grow mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-[18px] h-[18px] text-slate-400" />
              <span className="truncate">{venue}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-[18px] h-[18px] text-slate-400" />
              <span>{timeStr}</span>
            </div>
          </div>

          {variant === 'default' ? (
            <>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 text-[12px] font-semibold tracking-wide rounded-lg bg-blue-50 text-blue-600">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
                
              <div className="flex items-center gap-4 mt-auto ">
                <Link 
                  href={id ? `/events/${id}` : "#"} 
                  className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-12 flex-2 shrink-0 rounded-xl border-slate-200 text-slate-600 hover:text-[#5235FF] hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-none")}
                >
                  <ArrowRight className="w-[22px] h-[22px]" />
                </Link>
                
                {id ? (
                  <Link 
                    href={`/events/${id}`}
                    className={cn(buttonVariants({ variant: "default" }), "flex-5 bg-[#5235FF] hover:bg-indigo-700 text-white rounded-md h-12 font-semibold text-[15px] shadow-none hover:shadow-sm transition-all")}
                  >
                    Register
                  </Link>
                ) : (
                  <Button className="flex-5 bg-[#5235FF] hover:bg-indigo-700 text-white rounded-md h-12 font-semibold text-[15px] shadow-none hover:shadow-sm transition-all">
                    Coming Soon
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between mt-auto pt-6">
              {tags && tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 text-[11px] font-bold tracking-wide rounded-md bg-indigo-50 text-[#5235FF] uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : <div />}
              <Link href={id ? `/events/${id}` : "#"} className="p-1 shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-[20px] h-[20px] text-slate-500 hover:text-[#5235FF] transition-colors" />
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

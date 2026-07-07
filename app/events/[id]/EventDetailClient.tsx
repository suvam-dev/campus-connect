"use client";

import React, { useState } from 'react';
import { PageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, MapPin, Clock, ArrowLeft, Share2, Bookmark, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetailClient({ event }: { event: any }) {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    // Show a success toast or mock registration state
    setIsRegistered(true);
    setTimeout(() => {
      alert("Successfully registered for " + event.title + "!");
    }, 100);
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto pb-12">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/events" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-slate-200">
              <Share2 className="w-4 h-4 text-slate-600" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-slate-200">
              <Bookmark className="w-4 h-4 text-slate-600" />
            </Button>
          </div>
        </div>

        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10 shadow-sm"
        >
          <img 
            src={event.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop'} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wide uppercase rounded-md bg-indigo-500/20 text-indigo-100 backdrop-blur-md border border-indigo-500/30">
              {event.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl">
              {event.title}
            </h1>
          </div>
        </motion.div>

        {/* Two Column Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Details (70%) */}
          <div className="lg:w-[70%]">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About this Event</h2>
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap mb-8">
                {event.description}
              </p>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">Tags & Topics</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tags && event.tags.length > 0 ? (
                  event.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-lg bg-slate-100 text-slate-600">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm italic">No specific tags for this event.</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Registration Card (30%) */}
          <div className="lg:w-[30%] relative">
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-6"
            >
              <Card className="rounded-3xl border-slate-200 shadow-xl shadow-slate-200/40 bg-white overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="font-bold text-lg text-slate-900 mb-6">Date & Location</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
                        <CalendarDays className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{event.date}</p>
                        <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {event.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 line-clamp-2">{event.venue}</p>
                        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-0.5 inline-block">View on Map</a>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {isRegistered ? (
                      <motion.div
                        key="registered"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl py-4 flex flex-col items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        <span className="font-bold text-sm">You're Registered!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unregistered"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <Button 
                          onClick={handleRegister}
                          className="w-full h-12 text-base font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
                        >
                          Register Now
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <p className="text-xs text-center text-slate-400 mt-4 font-medium">
                    Limited seats available. Register early!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { EmptyState } from '@/components/shared';
import { EventCard } from '@/components/EventCard';
import { ImagesVariant } from '@/components/blocks/demo';
import { 
  Search, SlidersHorizontal, ChevronDown, Calendar, 
  Terminal, Theater, Wrench, Mic, BookOpen, Trophy, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Events', icon: null },
  { id: 'technical', label: 'Technical', icon: <Terminal className="w-4 h-4" /> },
  { id: 'cultural', label: 'Cultural', icon: <Theater className="w-4 h-4" /> },
  { id: 'workshop', label: 'Workshop', icon: <Wrench className="w-4 h-4" /> },
  { id: 'lecture', label: 'Guest Lecture', icon: <Mic className="w-4 h-4" /> },
  { id: 'academic', label: 'Academic', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'sports', label: 'Sports', icon: <Trophy className="w-4 h-4" /> }
];

export default function EventsClient({ initialEvents }: { initialEvents: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');

  const filteredEvents = React.useMemo(() => {
    let result = initialEvents || [];
    if (currentCategory !== 'all') {
      result = result.filter((e: any) => e.category.toLowerCase() === currentCategory.toLowerCase());
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e: any) => 
        e.title.toLowerCase().includes(q) ||
        e.shortDescription?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [initialEvents, currentCategory, searchQuery]);

  const events = filteredEvents;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCategoryClick = (id: string) => {
    setCurrentCategory(id);
  };

  return (
    <PageLayout className="bg-slate-50/50">
      <div className="max-w-7xl mx-auto w-full">
      {/* Header Section with Wave Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[2.5rem] p-8 md:p-12 mb-8 border border-white shadow-sm">
        {/* Decorative elements to mimic mockup */}
        <div className="absolute top-0 right-0 w-[600px] h-full overflow-hidden pointer-events-none hidden md:block">
           <svg viewBox="0 0 800 400" className="absolute right-[-10%] top-[-20%] w-[120%] h-[140%] text-white/50" fill="currentColor">
              <path d="M 0,200 C 200,0 400,400 800,200 L 800,0 L 0,0 Z" />
              <path d="M 0,400 C 300,200 500,600 800,400 L 800,0 L 0,0 Z" className="text-purple-100/30" />
           </svg>
           {/* Floating Icons mimicking the 3D icons */}
           <div className="absolute top-12 right-40 bg-white p-5 rounded-3xl shadow-xl shadow-indigo-100/80 rotate-12">
             <Calendar className="w-10 h-10 text-indigo-600" />
           </div>
           <div className="absolute bottom-12 right-72 bg-white p-4 rounded-3xl shadow-xl shadow-purple-100/80 -rotate-12">
             <div className="w-8 h-8 border-2 border-indigo-400 rounded-lg flex items-center justify-center bg-indigo-50">
               <span className="text-xs font-bold text-indigo-500">Tix</span>
             </div>
           </div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
            Discover <span className="text-indigo-600">Events</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium mb-10">
            Find and register for exciting campus events
          </p>

          <form onSubmit={handleSearch} className="flex items-center gap-3 w-full bg-white p-2 rounded-2xl shadow-sm border border-slate-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input 
              type="text" 
              placeholder="Search events by name, venue or keyword..." 
              className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 h-12 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="button" variant="outline" className="h-11 rounded-xl border-slate-200 font-semibold text-slate-700 flex items-center gap-2 px-5 hover:bg-slate-50">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </form>

          {/* Category Pills */}
          <div className="flex items-center gap-3 mt-6 overflow-x-auto pb-2 hide-scrollbar">
            {FILTER_OPTIONS.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold transition-all border ${
                    isActive 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                    : 'bg-white border-white text-slate-600 hover:bg-slate-50 hover:border-slate-200 shadow-sm'
                  }`}
                >
                  {cat.icon && <span className={`${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>{cat.icon}</span>}
                  {cat.label}
                </button>
              );
            })}
            <button className="flex items-center gap-1 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold bg-white border border-white text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              More <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-bold flex items-center gap-2 text-slate-500">
          <Calendar className="w-4 h-4 text-indigo-400" />
          Showing {events.length} event{events.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">Sort by</span>
          <Button variant="outline" className="h-9 rounded-xl border-slate-200 bg-white font-semibold flex items-center gap-2 text-slate-600 hover:text-slate-900 shadow-sm">
            Upcoming <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, idx) => (
             <EventCard 
                key={event.id}
                id={event.id}
                title={event.title}
                venue={event.venue}
                date={`${event.date} ${event.time}`}
                imageUrl={event.image || undefined}
                tags={event.tags}
                index={idx}
             />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No events found" 
          description="Try adjusting your search or filters to find what you're looking for." 
          icon="search" 
        />
      )}

      {/* Bottom Banner */}
      <div className="bg-[#5235FF] rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 mt-12 relative overflow-hidden shadow-lg shadow-indigo-600/20">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://upload.wikimedia.org/wikipedia/commons/0/09/Bubai_manna_21.jpg')] bg-cover mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5235FF] via-indigo-600/95 to-indigo-500/90" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-sm hidden sm:flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Don't miss out on amazing events!</h3>
            <p className="text-indigo-100 font-medium text-lg">Register early and be a part of unforgettable experiences.</p>
          </div>
        </div>
        
        <Link href="/dashboard" className="relative z-10 w-full md:w-auto">
          <Button className="w-full md:w-auto bg-white hover:bg-slate-50 text-indigo-700 font-bold rounded-2xl h-14 px-8 flex items-center gap-2 shadow-sm text-lg transition-transform hover:scale-105 active:scale-95">
            View My Registrations <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Mobile Preview Variant as requested */}
      <div className="block md:hidden mt-8 rounded-3xl overflow-hidden">
        <ImagesVariant />
      </div>
      </div>
    </PageLayout>
  );
}

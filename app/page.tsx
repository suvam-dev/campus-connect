"use client";

import React from 'react';
import { PageLayout } from '@/components/layouts';
import { HeroCard } from '@/components/HeroCard';
import { NoticeCard } from '@/components/NoticeCard';
import { EventCard } from '@/components/EventCard';
import { QuickLinkCard } from '@/components/QuickLinkCard';
import { CalendarCard } from '@/components/CalendarCard';
import { 
  BookOpen, 
  GraduationCap, 
  Library, 
  Bus,
  Utensils,
  Map,
  Dna,
  Mic,
  Leaf,
  Music
} from 'lucide-react';

const NOTICES = [
  { id: 1, title: "Mid-Semester Exams Schedule Released", category: "Academic", date: "Today" },
  { id: 2, title: "Hostel Allocation for Incoming Freshers", category: "Admin", date: "Yesterday" },
  { id: 3, title: "Library Timings Extended for Finals", category: "Campus", date: "2d ago" },
];

const EVENTS = [
  { id: 1, title: "Guest Lecture by Dr. Sarah Chen", venue: "Auditorium", date: "Tomorrow, 4 PM", icon: Mic },
  { id: 2, title: "AI in Sustainable Engineering", venue: "Tech Lab 4", date: "Friday, 10 AM", icon: Leaf },
  { id: 3, title: "Spring Fest Prelims", venue: "Open Air Theatre", date: "Saturday, 6 PM", icon: Music },
];

const QUICK_LINKS = [
  { id: 1, title: "ERP", icon: BookOpen },
  { id: 2, title: "Courses", icon: GraduationCap },
  { id: 3, title: "Library", icon: Library },
  { id: 4, title: "Transport", icon: Bus },
  { id: 5, title: "Mess", icon: Utensils },
  { id: 6, title: "Map", icon: Map },
];

export default function Home() {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">
          
          {/* Left Column: Notices Feed (3 cols on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">Notice Board</h2>
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View All</button>
            </div>
            
            <div className="flex flex-col gap-3">
              {NOTICES.map((notice, idx) => (
                <NoticeCard 
                  key={notice.id}
                  title={notice.title}
                  category={notice.category}
                  date={notice.date}
                  index={idx}
                />
              ))}
            </div>
            
            {/* Quick Links Widget (Mobile shows below, Desktop shows here or right. Let's put it here to balance) */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-4">Quick Links</h2>
              <div className="grid grid-cols-3 gap-3">
                {QUICK_LINKS.map((link, idx) => (
                  <QuickLinkCard 
                    key={link.id}
                    title={link.title}
                    icon={link.icon}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Hero & Main Events (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <HeroCard 
              title="Advanced Robotics Workshop 2026"
              venue="Innovation Hub, Sector 3"
              date="Starts Monday, 9:00 AM"
              imageUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2940&auto=format&fit=crop"
              className="h-[400px]"
            />
            
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">Upcoming Events</h2>
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Calendar</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EVENTS.slice(0,2).map((event, idx) => (
                <EventCard 
                  key={event.id}
                  title={event.title}
                  venue={event.venue}
                  date={event.date}
                  index={idx}
                  className="h-full min-h-[200px]"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Calendar & Extra (3 cols on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <CalendarCard />
            
            <div className="flex flex-col gap-4">
              {/* Remaining Event */}
              {EVENTS.slice(2).map((event, idx) => (
                <EventCard 
                  key={event.id}
                  title={event.title}
                  venue={event.venue}
                  date={event.date}
                  index={idx + 2}
                />
              ))}
            </div>
          </div>
          
        </div>
    </PageLayout>
  );
}

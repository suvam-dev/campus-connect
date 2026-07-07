import React from 'react';
import { PageLayout } from '@/components/layouts';
import { HeroCard } from '@/components/HeroCard';
import { NoticeCard } from '@/components/NoticeCard';
import { EventCard } from '@/components/EventCard';
import { QuickLinkCard } from '@/components/QuickLinkCard';
import { CalendarCard } from '@/components/CalendarCard';
// Direct DB imports removed in favor of REST API
import { 
  BookOpen, 
  GraduationCap, 
  Library, 
  Bus,
  Utensils,
  Map,
} from 'lucide-react';

const QUICK_LINKS = [
  { id: 1, title: "ERP", iconName: "BookOpen" },
  { id: 2, title: "Courses", iconName: "GraduationCap" },
  { id: 3, title: "Library", iconName: "Library" },
  { id: 4, title: "Transport", iconName: "Bus" },
  { id: 5, title: "Mess", iconName: "Utensils" },
  { id: 6, title: "Map", iconName: "Map" },
];

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let dbEvents = [];
  let dbNotices = [];
  
  const revalidateTime = process.env.NODE_ENV === 'development' ? 5 : 900;
  
  try {
    const eventsRes = await fetch(`${baseUrl}/api/events?limit=6`, { next: { revalidate: revalidateTime } });
    if (eventsRes.ok) dbEvents = await eventsRes.json();
    
    const noticesRes = await fetch(`${baseUrl}/api/notices?limit=5`, { next: { revalidate: revalidateTime } });
    if (noticesRes.ok) dbNotices = await noticesRes.json();
  } catch (error) {
    console.error("Failed to fetch data on home page:", error);
  }

  const notices = dbNotices.map((n: any) => ({
    id: n.id,
    title: n.title,
    category: n.category,
    date: n.date,
    tags: n.tags || [],
  }));

  const events = dbEvents.map((e: any) => ({
    id: e.id,
    title: e.title,
    venue: e.venue,
    date: `${e.date} ${e.time}`,
    tags: e.tags || [],
  }));

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
              {notices.map((notice: any, idx: number) => (
                <NoticeCard 
                  key={notice.id}
                  title={notice.title}
                  category={notice.category}
                  date={notice.date}
                  tags={notice.tags}
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
                    iconName={link.iconName}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Hero & Main Events (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <HeroCard 
              title="Kshitij 2026: Asia's Largest Techno-Management Fest"
              venue="IIT Kharagpur Campus"
              date="Starts Friday, 9:00 AM"
              imageUrl="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop"
              className="h-[400px]"
            />
            
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">Upcoming Events</h2>
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Calendar</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.slice(0,2).map((event: any, idx: number) => (
                <EventCard 
                  key={event.id}
                  title={event.title}
                  venue={event.venue}
                  date={event.date}
                  tags={event.tags}
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
              {events.slice(2).map((event: any, idx: number) => (
                <EventCard 
                  key={event.id}
                  title={event.title}
                  venue={event.venue}
                  date={event.date}
                  tags={event.tags}
                  index={idx + 2}
                />
              ))}
            </div>
          </div>
          
        </div>
    </PageLayout>
  );
}

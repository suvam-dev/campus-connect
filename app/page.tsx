import React from 'react';
import { PageLayout } from '@/components/layouts';
import { HeroCarousel } from '@/components/HeroCarousel';
import { EventCard } from '@/components/EventCard';
import { QuickLinkCard } from '@/components/QuickLinkCard';
import { ImportantTodayCard } from '@/components/ImportantTodayCard';
import { currentUser } from "@clerk/nextjs/server";
import { BookOpen, Trophy, Cpu, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import type { SerializedEvent } from '@/lib/types';

interface PageEvent {
  id: string;
  title: string;
  venue: string;
  date: string;
  imageUrl?: string;
  tags: string[];
}

const QUICK_LINKS = [
  { id: 1, title: "ERP", iconName: "BookOpen" },
  { id: 2, title: "Courses", iconName: "GraduationCap" },
  { id: 3, title: "Library", iconName: "Library" },
  { id: 4, title: "Transport", iconName: "Bus" },
  { id: 5, title: "Mess", iconName: "Utensils" },
  { id: 6, title: "Map", iconName: "Map" },
  { id: 7, title: "Hostel", iconName: "Hotel" },
  { id: 8, title: "Directory", iconName: "Users" },
];

export default async function Home() {
  let dbEvents: SerializedEvent[] = [];
  try {
    const { getEvents } = await import("@/lib/services/eventService");
    dbEvents = await getEvents(3);
  } catch (error) {
    console.error("Failed to fetch data on home page:", error);
  }

  const events: PageEvent[] = dbEvents.map((e) => ({
    id: e.id,
    title: e.title,
    venue: e.venue,
    date: `${e.date} ${e.time}`,
    imageUrl: e.image,
    tags: e.tags || [],
  }));
  
  const user = await currentUser();
  const firstName = user?.firstName || "Student";
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const tomorrowStr = new Date(now.getTime() + 86400000).toISOString();
  const threeDaysLaterStr = new Date(now.getTime() + 86400000 * 3).toISOString();

  return (
    <PageLayout className="bg-white">
      <div className="flex flex-col gap-10 lg:gap-14 w-full">
        
        {/* Greeting Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Welcome back, {firstName} <span className="text-3xl">👋</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg font-medium text-sm">
            <CalendarIcon className="w-4 h-4" />
            <span>{dateStr} • {timeStr}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section>
          <HeroCarousel />
        </section>

        {/* Important Today Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Important Today</h2>
            <Button variant="link" className="text-indigo-600 font-semibold text-sm">View all</Button>
          </div>
          
          <div className="flex overflow-x-auto pb-4 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x hide-scrollbar">
            <div className="snap-start shrink-0 w-[85%] sm:w-auto">
              <ImportantTodayCard 
                title="Mid Semester Exams"
                subtitle="Schedule Released"
                category="Academic"
                timeTag="+ TODAY"
                icon={<BookOpen className="w-6 h-6" />}
                iconBgClassName="bg-indigo-100 text-indigo-600"
              />
            </div>
            <div className="snap-start shrink-0 w-[85%] sm:w-auto">
              <ImportantTodayCard 
                title="Hackathon 2026"
                subtitle="Registrations Open"
                category="Event"
                timeTag="ENDS IN 5 DAYS"
                icon={<Trophy className="w-6 h-6" />}
                iconBgClassName="bg-amber-100 text-amber-600"
              />
            </div>
            <div className="snap-start shrink-0 w-[85%] sm:w-auto">
              <ImportantTodayCard 
                title="Robotics Workshop"
                subtitle="This Weekend"
                category="Workshop"
                timeTag="+ 2 DAYS LEFT"
                icon={<Cpu className="w-6 h-6" />}
                iconBgClassName="bg-emerald-100 text-emerald-600"
              />
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Upcoming Events</h2>
            <Link href="/events">
              <Button variant="link" className="text-indigo-600 font-semibold text-sm flex items-center gap-1">
                More events <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6 my-10">
            {events.length > 0 ? (
              events.map((event: PageEvent) => (
                <CarouselItem key={event.id} className="pl-4 sm:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                  <EventCard 
                    id={event.id}
                    title={event.title}
                    venue={event.venue}
                    date={event.date}
                    imageUrl={event.imageUrl}
                    tags={event.tags}
                   
                    variant="compact"
                  />
                </CarouselItem>
              ))
            ) : (
              // Fallback skeleton/demo cards if no events found
              <>
                <CarouselItem className="pl-4 sm:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                  <EventCard 
                    title="Guest Lecture by Dr. Sarah Chen"
                    venue="Takshashila"
                    date={new Date().toISOString()}
                    tags={["ROBOTICS", "HEALTHCARE"]}
                    index={0}
                    variant="compact"
                  />
                </CarouselItem>
                <CarouselItem className="pl-4 sm:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                  <EventCard 
                    title="Hackathon 2026: Code Innovation"
                    venue="Nalanda Complex"
                    date={tomorrowStr}
                    tags={["HACKATHON", "CODING"]}
                    index={1}
                    variant="compact"
                  />
                </CarouselItem>
                <CarouselItem className="pl-4 sm:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                  <EventCard 
                    title="Photography Walk"
                    venue="Central Campus"
                    date={threeDaysLaterStr}
                    tags={["PHOTOGRAPHY", "CREATIVE"]}
                    index={2}
                    variant="compact"
                  />
                </CarouselItem>
              </>
            )}
            </CarouselContent>
          </Carousel>
        </section>

        {/* Quick Access Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Quick Access</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-4 justify-items-center">
            {QUICK_LINKS.map((link, idx) => (
              <QuickLinkCard 
                key={link.id}
                title={link.title}
                iconName={link.iconName}
                index={idx}
                className="w-full"
              />
            ))}
          </div>
        </section>

      </div>

      {/* Call to Action Section */}
      <section className="w-full mt-12 mb-4">
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Don&apos;t miss out on amazing events!</h2>
            <p className="text-indigo-100 text-lg mb-8">
              Register early and be a part of unforgettable experiences.
            </p>
            <Link href="/events">
              <Button className="bg-white text-indigo-600 hover:bg-slate-100 font-bold px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                Explore All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

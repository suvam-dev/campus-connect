"use client";

import React, { useState } from 'react';
import { PageLayout } from '@/components/layouts';
import { PageHeader, FilterBar, CardGrid } from '@/components/shared';
import { Calendar, MapPin, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const EVENTS = [
  {
    id: 1,
    title: "Advanced Autonomous Robotics Symposium",
    venue: "Kalpana Chawla Space Technology Cell, RM 204",
    date: "Oct 24, 2024",
    time: "10:00 AM - 4:00 PM",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    description: "Learn about cutting-edge robotics technology and innovations"
  },
  {
    id: 2,
    title: "Spring Fest: Inter-College Classical Arts Showcase",
    venue: "Tagore Open Air Theatre (TOAT)",
    date: "Oct 28, 2024",
    time: "6:00 PM Onwards",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
    description: "Experience traditional and contemporary art performances"
  },
  {
    id: 3,
    title: "Future of Quantum Computing in Cryptography",
    venue: "Raman Auditorium, Main Building",
    date: "Nov 2, 2024",
    time: "2:00 PM",
    category: "Guest Lecture",
    image: "https://images.unsplash.com/photo-1535976066051-41be0c4bdd72?w=800&auto=format&fit=crop",
    description: "Expert insights on quantum computing and cybersecurity"
  },
  {
    id: 4,
    title: "Design Thinking for Hardware Startups",
    venue: "Rajendra Prasad Hall of Residence",
    date: "Nov 5, 2024",
    time: "2:00 PM - 5:00 PM",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    description: "Learn how to design products for hardware startups"
  },
];

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Events' },
  { id: 'technical', label: 'Technical' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'lecture', label: 'Guest Lecture' },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Technical': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  'Cultural': 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  'Workshop': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  'Guest Lecture': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
};

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(EVENTS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = EVENTS.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.venue.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleFilterChange = (filters: string[]) => {
    if (filters.length === 0 || filters.includes('all')) {
      setFilteredEvents(EVENTS);
    } else {
      const filtered = EVENTS.filter(event =>
        filters.some(f => event.category.toLowerCase().includes(f))
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Discover Events"
        description="Find and register for upcoming campus events"
      />

      <div className="mb-8">
        <FilterBar
          placeholder="Search events by name or venue..."
          filters={FILTER_OPTIONS}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filteredEvents.length > 0 ? (
        <CardGrid cols="3" gap="lg">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="h-full"
            >
              <Card className="group h-full flex flex-col overflow-hidden border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 rounded-2xl bg-white">
                <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className={`border-none font-semibold ${CATEGORY_COLORS[event.category] || 'bg-slate-100 text-slate-700'}`}>
                      {event.category}
                    </Badge>
                  </div>

                  {/* Bookmark */}
                  <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-indigo-600 transition-colors shadow-sm backdrop-blur-sm">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-slate-900 line-clamp-2 mb-3 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="mt-0.5 p-1.5 rounded-md bg-slate-50 border border-slate-100 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="line-clamp-2 font-medium leading-snug pt-1">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="p-1.5 rounded-md bg-slate-50 border border-slate-100 text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{event.date} • {event.time}</span>
                    </div>
                  </div>

                  <Button className="mt-6 w-full shadow-sm font-semibold rounded-xl">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 rounded-3xl border border-dashed border-slate-200 bg-white"
        >
          <p className="text-lg font-semibold text-slate-900 mb-2">No events found</p>
          <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
        </motion.div>
      )}
    </PageLayout>
  );
}

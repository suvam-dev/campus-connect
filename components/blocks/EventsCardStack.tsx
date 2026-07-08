"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, MapPin, Tag } from "lucide-react"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "@/components/blocks/animated-cards-stack"
import { Button } from "@/components/ui/button"

export function EventsCardStack({ events }: { events: any[] }) {
  if (!events || events.length === 0) return null;

  // Limit to top 5-7 events for the stack to prevent it from being too long
  const displayEvents = events.slice(0, 7);

  return (
    <section className="bg-slate-900 rounded-[3rem] px-4 py-16 md:px-8 relative overflow-hidden mt-12 mb-12 shadow-2xl shadow-indigo-900/20">
      <div className="absolute inset-0 opacity-[0.1] bg-[url('https://upload.wikimedia.org/wikipedia/commons/0/09/Bubai_manna_21.jpg')] bg-cover mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-slate-900/95 to-purple-950/90" />
      
      <div className="relative z-10">
        <h2 className="text-center text-4xl md:text-5xl font-black text-white tracking-tight">
          Featured <span className="text-indigo-400">Events</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-medium text-slate-300">
          Scroll to explore the most exciting upcoming events on campus.
        </p>
      </div>
      
      <ContainerScroll className="container h-[300vh] relative z-10">
        <div className="sticky left-0 top-0 h-svh w-full py-12 flex items-center justify-center">
          <CardsContainer className="mx-auto size-full h-[520px] w-[340px] md:w-[400px]">
            {displayEvents.map((event, index) => (
              <CardTransformed
                arrayLength={displayEvents.length}
                key={event.id || index}
                index={index + 2}
                variant={"dark"}
                className="overflow-hidden border border-slate-700/50 bg-slate-800/90 !p-0 shadow-xl backdrop-blur-xl"
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-[220px] w-full shrink-0">
                    <img
                      src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"}
                      alt={event.title}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-block px-2.5 py-1 mb-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-md">
                        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                          {event.category || 'Event'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1 bg-slate-900/50">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span className="text-sm font-medium line-clamp-1">{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                        <span className="text-sm font-medium line-clamp-1">{event.venue}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">
                      {event.shortDescription || "Join us for this exciting event!"}
                    </p>
                    
                    <Link href={`/events/${event.id}`} className="mt-auto block w-full">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-12 font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  )
}

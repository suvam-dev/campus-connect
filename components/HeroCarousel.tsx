"use client";

import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { HeroCard } from '@/components/HeroCard';

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <HeroCard 
            title="KSHITIJ 2026"
            subtitle="Asia's Largest Techno-Management Fest"
            description="A celebration of innovation, leadership and creativity. Join thousands of students from across Asia."
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/ae/Spring_Fest_IIT_Kharagpur_-_Jim_Ankan_Deka_photography.jpg"
          />
        </CarouselItem>
        <CarouselItem>
          <HeroCard 
            title="Welcome to IIT KGP"
            subtitle="Dedicated to the service of the Nation"
            description="Experience world-class education at the oldest and largest Indian Institute of Technology."
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/e/eb/IIT_Main_Building_1955.jpg"
          />
        </CarouselItem>
        <CarouselItem>
          <HeroCard 
            title="World Class Infrastructure"
            subtitle="Nalanda Academic Complex"
            description="State-of-the-art facilities spread across our lush green 2,100 acre campus."
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/2/2e/Entrance_Gate_of_IIT_Kharagpur.jpg"
          />
        </CarouselItem>
      </CarouselContent>
      <div className="absolute bottom-6 right-16 hidden md:flex items-center gap-2">
        <CarouselPrevious className="relative inset-0 translate-y-0 h-10 w-10 border-white/20 bg-black/20 hover:bg-black/40 text-white" />
        <CarouselNext className="relative inset-0 translate-y-0 h-10 w-10 border-white/20 bg-black/20 hover:bg-black/40 text-white" />
      </div>
    </Carousel>
  );
}

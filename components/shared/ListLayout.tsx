"use client";

import React from 'react';
import { cn } from '../lib/utils';

interface ListLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ListLayout({ sidebar, children, className = '' }: ListLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12", className)}>
      {/* Content takes priority on mobile, but on desktop let's put sidebar on the left or keep it configurable. Assuming sidebar left for now based on original */}
      <aside className="lg:col-span-3 order-last lg:order-first">
        <div className="sticky top-28 space-y-6">
          {sidebar}
        </div>
      </aside>
      
      {/* Content */}
      <div className="lg:col-span-9 order-first lg:order-last">
        {children}
      </div>
    </div>
  );
}

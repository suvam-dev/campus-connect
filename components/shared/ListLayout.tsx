"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ListLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  mobileSidebarPosition?: 'top' | 'bottom';
}

export function ListLayout({ sidebar, children, className = '', mobileSidebarPosition = 'bottom' }: ListLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12", className)}>
      <aside className={cn(
        "lg:col-span-3 lg:order-first",
        mobileSidebarPosition === 'bottom' ? "order-last" : "order-first"
      )}>
        <div className="sticky top-28 space-y-6">
          {sidebar}
        </div>
      </aside>
      
      <div className={cn(
        "lg:col-span-9 lg:order-last",
        mobileSidebarPosition === 'bottom' ? "order-first" : "order-last"
      )}>
        {children}
      </div>
    </div>
  );
}

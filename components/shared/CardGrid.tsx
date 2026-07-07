"use client";

import React from 'react';
import { cn } from '../lib/utils';

interface CardGridProps {
  children: React.ReactNode;
  cols?: 'auto' | '1' | '2' | '3' | '4';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CardGrid({ 
  children, 
  cols = 'auto',
  gap = 'md',
  className = '' 
}: CardGridProps) {
  const colsMap = {
    'auto': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const gapMap = {
    'sm': 'gap-4',
    'md': 'gap-6',
    'lg': 'gap-8'
  };

  return (
    <div className={cn("grid auto-rows-min", colsMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  );
}

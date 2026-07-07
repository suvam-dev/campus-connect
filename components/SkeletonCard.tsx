"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './lib/utils';
import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className={cn("rounded-2xl border-slate-200 shadow-sm", className)}>
        <CardContent className="p-6 flex flex-col gap-4">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-3 mt-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

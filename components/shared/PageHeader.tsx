"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, action, className = '' }: PageHeaderProps) {
  return (
    <div className={`mb-12 relative ${className}`}>
      {/* Subtle background glow for premium feel */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/10 blur-[100px] rounded-full -z-10 pointer-events-none hidden md:block" />
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-slate-600 mt-4 leading-relaxed font-medium">
              {description}
            </p>
          )}
        </motion.div>
        
        {action && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex-shrink-0"
          >
            {action}
          </motion.div>
        )}
      </div>
      
      {/* Refined separator */}
      <div className="mt-8 h-px w-full bg-gradient-to-r from-slate-200 via-slate-200/50 to-transparent" />
    </div>
  );
}

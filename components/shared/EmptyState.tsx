"use client";

import React from "react";
import { motion } from "framer-motion";
import { SearchX, FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: "search" | "folder";
}

export function EmptyState({ title = "No results found", description = "Try adjusting your search or filters.", icon = "search" }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center text-center py-24 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm w-full"
    >
      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500">
        {icon === "search" ? <SearchX size={32} /> : <FolderOpen size={32} />}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm">{description}</p>
    </motion.div>
  );
}

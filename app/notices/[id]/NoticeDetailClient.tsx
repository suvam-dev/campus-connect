"use client";

import React, { useState } from 'react';
import { PageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, ArrowLeft, Share2, Bookmark, CheckCircle2, FileText, Briefcase, Settings, BookOpen, AlertCircle, Trophy, Home, Library, Building } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_COLORS: Record<string, string> = {
  'Academic': 'bg-blue-100 text-blue-700 border-blue-200',
  'Placement': 'bg-purple-100 text-purple-700 border-purple-200',
  'Administrative': 'bg-orange-100 text-orange-700 border-orange-200',
  'Admin': 'bg-orange-100 text-orange-700 border-orange-200',
  'General': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Campus': 'bg-teal-100 text-teal-700 border-teal-200',
  'Sports': 'bg-red-100 text-red-700 border-red-200',
};

const ICON_MAP: Record<string, any> = {
  AlertCircle,
  Briefcase,
  Settings,
  BookOpen,
  FileText,
  Trophy,
  Home,
  Library
};

export default function NoticeDetailClient({ notice }: { notice: any }) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const Icon = ICON_MAP[notice.iconType] || FileText;
  const badgeColor = CATEGORY_COLORS[notice.category] || 'bg-slate-100 text-slate-700 border-slate-200';

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    setTimeout(() => {
      alert("Successfully acknowledged notice: " + notice.title);
    }, 100);
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto pb-12">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/notices" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Notices
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-slate-200">
              <Share2 className="w-4 h-4 text-slate-600" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-slate-200">
              <Bookmark className="w-4 h-4 text-slate-600" />
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 pb-8 border-b border-slate-200"
        >
          <div className="flex items-start gap-6">
            <div className={`p-4 rounded-3xl shrink-0 ${badgeColor.replace('border-', '').replace('text-', 'text-').replace('bg-', 'bg-').split(' ')[0]} bg-opacity-50`}>
              <Icon className={`w-10 h-10 ${badgeColor.split(' ')[1]}`} />
            </div>
            <div>
              <span className={`inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wide uppercase rounded-md border ${badgeColor}`}>
                {notice.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight max-w-4xl">
                {notice.title}
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Two Column Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Details (70%) */}
          <div className="lg:w-[70%]">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12"
            >
              <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600">
                <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap">
                  {notice.description}
                </p>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-4 mt-12 pt-8 border-t border-slate-100 flex items-center gap-2">
                Tags & Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {notice.tags && notice.tags.length > 0 ? (
                  notice.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm italic">No specific tags for this notice.</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Info Card (30%) */}
          <div className="lg:w-[30%] relative">
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-6"
            >
              <Card className="rounded-3xl border-slate-200 shadow-xl shadow-slate-200/40 bg-white overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="font-bold text-lg text-slate-900 mb-6">Notice Information</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
                        <CalendarDays className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{notice.date}</p>
                        <p className="text-sm text-slate-500 mt-0.5">Published Date</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-slate-50 text-slate-600 shrink-0">
                        <Building className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 line-clamp-2">{notice.source || "Administration"}</p>
                        <p className="text-sm text-slate-500 mt-0.5">Issuing Department</p>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {isAcknowledged ? (
                      <motion.div
                        key="acknowledged"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl py-4 flex flex-col items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        <span className="font-bold text-sm">Acknowledged!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unacknowledged"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <Button 
                          onClick={handleAcknowledge}
                          className="w-full h-12 text-base font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
                        >
                          Acknowledge Notice
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <p className="text-xs text-center text-slate-400 mt-4 font-medium">
                    Confirm that you have read this notice.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}

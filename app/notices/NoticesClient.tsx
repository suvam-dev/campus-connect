"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { PageHeader, FilterBar, ListLayout } from '@/components/shared';
import { AlertCircle, FileText, Briefcase, Settings, BookOpen, ChevronRight, Filter, Trophy, Home, Library } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'All Notices' },
  { id: 'academic', label: 'Academic' },
  { id: 'placement', label: 'Placement' },
  { id: 'general', label: 'General' },
  { id: 'administrative', label: 'Administrative' },
  { id: 'admin', label: 'Admin' },
  { id: 'campus', label: 'Campus' },
  { id: 'sports', label: 'Sports' }
];

const CATEGORY_COLORS: Record<string, string> = {
  'Academic': 'bg-blue-100 text-blue-700',
  'Placement': 'bg-purple-100 text-purple-700',
  'Administrative': 'bg-orange-100 text-orange-700',
  'Admin': 'bg-orange-100 text-orange-700',
  'General': 'bg-emerald-100 text-emerald-700',
  'Campus': 'bg-teal-100 text-teal-700',
  'Sports': 'bg-red-100 text-red-700',
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

export default function NoticesClient({ initialNotices }: { initialNotices: any[] }) {
  const [filteredNotices, setFilteredNotices] = useState(initialNotices);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, activeCategory);
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    applyFilters(searchQuery, categoryId);
  };

  const applyFilters = (query: string, category: string) => {
    let result = initialNotices;
    
    if (category !== 'all') {
      result = result.filter(n => n.category.toLowerCase() === category);
    }
    
    if (query) {
      result = result.filter(n => 
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredNotices(result);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Notice Board"
        description="Stay updated with the latest academic and administrative announcements"
      />

      <ListLayout
        sidebar={
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Categories</h3>
                </div>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                          isActive 
                            ? 'bg-slate-900 text-white font-medium shadow-md shadow-slate-900/10' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardContent className="p-5">
                <h3 className="font-semibold text-slate-900 mb-4">Sort By</h3>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Unread First</option>
                </select>
              </CardContent>
            </Card>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="mb-8">
            <FilterBar
              placeholder="Search notices by keyword..."
              onSearch={handleSearch}
            />
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice, idx) => {
                  const Icon = ICON_MAP[notice.iconType] || FileText;
                  
                  return (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                    >
                      <Card className={`group relative overflow-hidden transition-all duration-300 rounded-2xl border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer bg-white ${notice.isUnread ? 'ring-1 ring-indigo-100' : ''}`}>
                        {notice.isUnread && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl" />
                        )}
                        <CardContent className="p-6">
                          <div className="flex gap-5">
                            <div className={`flex-shrink-0 p-3.5 rounded-2xl transition-colors ${CATEGORY_COLORS[notice.category] || 'bg-slate-100 text-slate-600'}`}>
                              <Icon className="w-6 h-6" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div>
                                  <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                      {notice.title}
                                    </h3>
                                    {notice.isUnread && (
                                      <span className="shrink-0 flex h-2 w-2 rounded-full bg-indigo-500" />
                                    )}
                                  </div>
                                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    {notice.source}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 pt-1">
                                  <Badge variant="secondary" className={`border-none font-semibold ${CATEGORY_COLORS[notice.category] || 'bg-slate-100 text-slate-700'}`}>
                                    {notice.category}
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-slate-600 line-clamp-2 mb-4 leading-relaxed mt-3">
                                {notice.description}
                              </p>

                              {notice.tags && notice.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {notice.tags.map((tag: string, i: number) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-medium text-slate-500 bg-slate-100 rounded-md">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                                <span className="text-sm font-medium text-slate-400">{notice.date}</span>
                                <Link href={`/notices/${notice.id}`}>
                                  <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 -mr-4 rounded-xl font-semibold">
                                    Read Full Notice <ChevronRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 rounded-3xl border border-dashed border-slate-200 bg-white"
                >
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-slate-900 mb-1">No notices found</p>
                  <p className="text-sm text-slate-500">Try adjusting your search or category filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {filteredNotices.length > 0 && (
            <div className="flex justify-center mt-10 pt-4">
              <Button variant="outline" className="rounded-full px-8 border-slate-300 hover:bg-slate-50 font-semibold shadow-sm">
                Load More Announcements
              </Button>
            </div>
          )}
        </div>
      </ListLayout>
    </PageLayout>
  );
}

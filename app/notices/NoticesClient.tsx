"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layouts';
import { 
  Search, SlidersHorizontal, ChevronDown, Calendar, 
  LayoutGrid, SortDesc, BookOpen, Building2, Library, Trophy, 
  ChevronRight, Briefcase, FileText, Settings, Bell, Circle,
  Home, AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
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

const CATEGORIES = [
  { id: 'all', label: 'All Notices', count: 24, icon: Bell },
  { id: 'academic', label: 'Academic', count: 8, icon: BookOpen },
  { id: 'placement', label: 'Placement', count: 3, icon: Briefcase },
  { id: 'general', label: 'General', count: 4, icon: FileText },
  { id: 'administrative', label: 'Administrative', count: 3, icon: Settings },
  { id: 'admin', label: 'Admin', count: 2, icon: Building2 },
  { id: 'campus', label: 'Campus', count: 2, icon: Library },
  { id: 'sports', label: 'Sports', count: 2, icon: Trophy }
];

const CATEGORY_STYLES: Record<string, { bg: string, text: string, iconBg: string, iconText: string, icon: any }> = {
  'Academic': { bg: 'bg-indigo-50', text: 'text-indigo-600', iconBg: 'bg-indigo-50', iconText: 'text-indigo-600', icon: BookOpen },
  'Placement': { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-50', iconText: 'text-purple-600', icon: Briefcase },
  'Administrative': { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-50', iconText: 'text-orange-600', icon: Settings },
  'Admin': { bg: 'bg-orange-50', text: 'text-orange-500', iconBg: 'bg-orange-50', iconText: 'text-orange-500', icon: Building2 },
  'General': { bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', icon: FileText },
  'Campus': { bg: 'bg-emerald-50', text: 'text-emerald-500', iconBg: 'bg-emerald-50', iconText: 'text-emerald-500', icon: Library },
  'Sports': { bg: 'bg-red-50', text: 'text-red-500', iconBg: 'bg-red-50', iconText: 'text-red-500', icon: Trophy },
};

export default function NoticesClient({ initialNotices }: { initialNotices: any[] }) {
  const [filteredNotices, setFilteredNotices] = useState(initialNotices);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(searchQuery, activeCategory);
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
    <PageLayout className="bg-slate-50/50">
      <div className="max-w-7xl mx-auto w-full pt-8 pb-16">
        
        {/* Header Section */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-12 p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Background Decorative Waves */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {/* Top Wave */}
            <svg className="absolute top-0 left-0 w-full text-indigo-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
            
            {/* Bottom Wave */}
            <svg className="absolute bottom-0 left-0 w-full transform rotate-180 text-purple-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>

            {/* Glowing Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] right-[20%] w-80 h-80 bg-purple-100/50 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0B1527] mb-4">
              Notice Board
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Stay informed with the latest academic and administrative announcements.
            </p>
          </div>
          <div className="relative z-10 w-64 h-64 hidden md:block shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-full blur-3xl opacity-60" />
            <Image 
              src="/images/notice-meghaphone.png" 
              alt="Announcement Megaphone" 
              fill
              className="object-contain drop-shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 scale-135 transition-transform"
              priority
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Categories */}
            <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center gap-2 mb-3 px-3 pt-2">
                  <LayoutGrid className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Categories</h3>
                </div>
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        isActive 
                          ? 'bg-[#5235FF] text-white shadow-md shadow-indigo-600/20 font-semibold' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{cat.label}</span>
                      </div>
                      <span className={`${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Sort By */}
            <Card className="border-slate-100 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4 px-3 pt-2">
                  <SortDesc className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Sort By</h3>
                </div>
                <div className="px-3 pb-2">
                  <div className="relative">
                    <select className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer text-sm">
                      <option>Newest First</option>
                      <option>Oldest First</option>
                      <option>Unread First</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Search and Filter Row */}
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search notices by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm font-medium"
                />
              </form>
              <Button variant="outline" className="h-14 rounded-2xl border-slate-200 bg-white shadow-sm px-6 font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, idx) => {
                    const style = CATEGORY_STYLES[notice.category] || { 
                      bg: 'bg-slate-50', text: 'text-slate-600', iconBg: 'bg-slate-50', iconText: 'text-slate-600' 
                    };
                    const Icon = ICON_MAP[notice.iconType] || FileText;

                    return (
                      <motion.div
                        key={notice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                      >
                        <Link href={`/notices/${notice.id}`} className="block">
                          <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl bg-white overflow-hidden group cursor-pointer">
                            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
                            
                            {/* Left Icon Box */}
                            <div className={`shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center ${style.iconBg}`}>
                              <Icon className={`w-10 h-10 ${style.iconText}`} />
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 min-w-0 flex flex-col">
                              {/* Header Row */}
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-xl text-slate-900 group-hover:text-[#5235FF] transition-colors line-clamp-2">
                                    {notice.title}
                                  </h3>
                                  {notice.isUnread && (
                                    <Circle className="w-2.5 h-2.5 fill-[#5235FF] text-[#5235FF] shrink-0" />
                                  )}
                                </div>
                                <Badge variant="secondary" className={`shrink-0 border-none px-3 py-1 text-xs font-semibold rounded-lg ${style.bg} ${style.text}`}>
                                  {notice.category}
                                </Badge>
                              </div>

                              {/* Source */}
                              <p className={`text-[11px] font-bold uppercase tracking-wider mb-3 ${style.text}`}>
                                {notice.source || 'CAMPUS ADMINISTRATION'}
                              </p>

                              {/* Description */}
                              <p className="text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                                {notice.description}
                              </p>

                              {/* Footer Row */}
                              <div className="mt-auto flex items-center justify-between pt-4">
                                <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                                  <Calendar className="w-[18px] h-[18px]" />
                                  {notice.date}
                                </div>
                                <div className="flex items-center text-[#5235FF] font-bold text-sm group-hover:translate-x-1 transition-transform">
                                  Read Full Notice <ChevronRight className="w-[18px] h-[18px] ml-1" />
                                </div>
                              </div>
                            </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-24 rounded-3xl border border-dashed border-slate-200 bg-white"
                  >
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-xl font-bold text-slate-900 mb-2">No notices found</p>
                    <p className="text-slate-500 font-medium">Try adjusting your search or category filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {filteredNotices.length > 0 && (
              <div className="flex justify-center mt-10">
                <Button variant="outline" className="h-12 rounded-full px-8 border-slate-200 bg-white shadow-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all">
                  Load More Announcements <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

          </div>
        </div>
      </div>
    </PageLayout>
  );
}

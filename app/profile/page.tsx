"use client";

import React from 'react';
import { PageLayout } from '@/components/layouts';
import { CardGrid, ListLayout } from '@/components/shared';
import { Lock, Bell, Shield, BookOpen, FileText, Award, ChevronRight, Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  return (
    <PageLayout>
      <ListLayout
        sidebar={
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
              <div className="h-32 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-900" />
              <CardContent className="px-6 pb-6 pt-0 relative">
                <div className="flex flex-col items-center -mt-12">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-50 shadow-md flex items-center justify-center text-3xl font-extrabold text-indigo-900 tracking-tight z-10">
                    AS
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 mt-4 tracking-tight">Aarav Sharma</h1>
                  <p className="text-sm font-medium text-slate-500 mt-1">Roll No. 20CS10001</p>
                  
                  <div className="w-full mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Department</p>
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1">Computer Science</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Year</p>
                      <p className="text-sm font-semibold text-slate-800">Senior</p>
                    </div>
                  </div>

                  <Button className="w-full mt-6 shadow-sm font-semibold rounded-xl" variant="default">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-4 tracking-tight">Account Settings</h3>
                <div className="space-y-1">
                  {[
                    { icon: Lock, label: 'Privacy Settings' },
                    { icon: Bell, label: 'Notifications' },
                    { icon: Shield, label: 'Security' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition-colors text-left group border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm group-hover:text-indigo-600 transition-all">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        }
      >
        <div className="space-y-6">
          {/* My Bookmarks */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Bookmarks</h2>
                  <Button variant="ghost" className="text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <CardGrid cols="2" gap="md">
                  {[
                    {
                      icon: BookOpen,
                      color: 'bg-blue-100 text-blue-700 border-blue-200',
                      title: 'Advanced Machine Learning Syllabus',
                      description: 'Reference materials and grading structure for Autumn 2024.'
                    },
                    {
                      icon: FileText,
                      color: 'bg-purple-100 text-purple-700 border-purple-200',
                      title: 'Neural Systems Research Paper',
                      description: 'Saved papers from library for thesis preparation.'
                    },
                    {
                      icon: Award,
                      color: 'bg-orange-100 text-orange-700 border-orange-200',
                      title: 'Campus Placement Guidelines',
                      description: 'Updated registration and interview rules.'
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color} mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </CardGrid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Registered Events */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Registered Events</h2>
                
                <div className="space-y-4">
                  {[
                    {
                      status: 'Upcoming',
                      title: 'Kshitij Innovation Track',
                      date: 'August 18-21, 2026',
                      description: 'Registered for autonomous systems challenge',
                      color: 'bg-orange-500',
                      statusColor: 'bg-orange-100 text-orange-700'
                    },
                    {
                      status: 'Tomorrow',
                      title: 'Alumni Guest Lecture: AI Governance',
                      date: 'July 7, 2026 • Netaji Auditorium',
                      description: 'Recommended for final-year CS students',
                      color: 'bg-indigo-500',
                      statusColor: 'bg-indigo-100 text-indigo-700'
                    },
                    {
                      status: 'Completed',
                      title: 'Spring Fest Coordination Meet',
                      date: 'June 28, 2026',
                      description: 'Core volunteer planning completed',
                      color: 'bg-slate-300',
                      statusColor: 'bg-slate-100 text-slate-600',
                      completed: true
                    },
                  ].map((event, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors ${event.completed ? 'opacity-60 grayscale-[50%]' : ''}`}
                    >
                      <div className={`flex-shrink-0 w-1.5 ${event.color} rounded-full`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {event.title}
                          </h3>
                          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap self-start ${event.statusColor}`}>
                            {event.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {event.date}
                          </p>
                          <p className="text-sm text-slate-700">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ListLayout>
    </PageLayout>
  );
}

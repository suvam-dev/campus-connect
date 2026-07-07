"use client";

import React from 'react';
import { PageLayout } from '@/components/layouts';
import { PageHeader, CardGrid } from '@/components/shared';
import { BookOpen, FileText, Award, Trash2 } from 'lucide-react';

export default function BookmarksPage() {
  const bookmarks = [
    {
      id: 1,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      code: 'ML',
      title: 'Advanced Machine Learning Syllabus',
      description: 'Reference materials and grading structure for the Autumn 2026 offering.',
      date: 'Added 2 weeks ago'
    },
    {
      id: 2,
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      code: 'RP',
      title: 'Neural Systems Research Paper Stack',
      description: 'Saved papers from the central library repository for thesis preparation.',
      date: 'Added 1 month ago'
    },
    {
      id: 3,
      icon: Award,
      color: 'bg-orange-100 text-orange-600',
      code: 'PL',
      title: 'Campus Placement Guidelines',
      description: 'Updated registration and interview rules for the current placement cycle.',
      date: 'Added 3 days ago'
    },
  ];

  return (
    <PageLayout>
      <PageHeader
        title="My Bookmarks"
        description="Saved resources and important documents"
      />

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Saved Resources</h2>
          <span className="text-sm text-slate-600">
            {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <CardGrid cols="3" gap="lg">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bookmark.color} text-xl font-bold`}>
                {bookmark.code}
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
              {bookmark.title}
            </h3>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2">
              {bookmark.description}
            </p>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-4">
                {bookmark.date}
              </p>
              <button className="w-full py-2 px-4 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium text-sm">
                Open Resource
              </button>
            </div>
          </div>
        ))}
      </CardGrid>

      <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Registered Events</h2>
        
        <div className="space-y-4">
          {[
            {
              status: 'Upcoming',
              title: 'Kshitij Innovation Track',
              meta: 'August 18 to 21, 2026 • Main Campus',
              description: 'Registered for the autonomous systems challenge',
              color: 'bg-orange-500'
            },
            {
              status: 'Tomorrow',
              title: 'Alumni Guest Lecture: AI Governance',
              meta: 'July 7, 2026 • Netaji Auditorium',
              description: 'Recommended for final-year CS students',
              color: 'bg-blue-500'
            },
            {
              status: 'Completed',
              title: 'Spring Fest Coordination Meet',
              meta: 'June 28, 2026 • Student Activity Center',
              description: 'Core volunteer planning completed',
              color: 'bg-slate-400',
              completed: true
            },
          ].map((event, idx) => (
            <div
              key={idx}
              className={`flex gap-4 pb-4 border-b border-slate-300 last:border-0 ${event.completed ? 'opacity-60' : ''}`}
            >
              <div className="flex-shrink-0">
                <div className={`w-1 h-auto min-h-[80px] rounded-full ${event.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">
                    {event.title}
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                    {event.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  {event.meta}
                </p>
                <p className="text-sm text-slate-700">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

"use client";

import React, { useState, useTransition } from 'react';
import { PageLayout } from '@/components/layouts';
import { ListLayout, CardGrid } from '@/components/shared';
import { Lock, Bell, Shield, BookOpen, FileText, Award, ChevronRight, CheckCircle2, UserCircle2, Loader2, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateProfile } from '@/app/actions/profileActions';

// Using the same schema from the server for client-side validation
const profileSchema = z.object({
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  phone: z.string().regex(/^\+91[0-9]{10}$/, "Must be a valid Indian phone number starting with +91 (e.g. +919876543210)"),
  collegeEmail: z.string().email("Invalid email").endsWith("@kgpian.iitkgp.ac.in", "Must be a valid @kgpian.iitkgp.ac.in email"),
  rollNumber: z.string().regex(/^[0-9]{2}[A-Z]{2}[0-9]{5}$/i, "Invalid Roll Number (e.g. 20CS10001)"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileClient({ initialProfile, stats }: { initialProfile: Record<string, unknown>, stats: Record<string, unknown> }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      gender: (initialProfile.gender as "Male" | "Female" | "Other" | "Prefer not to say") || "Prefer not to say",
      phone: (initialProfile.phone as string) || "",
      collegeEmail: (initialProfile.collegeEmail as string) || "",
      rollNumber: (initialProfile.rollNumber as string) || "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    setMessage(null);
    startTransition(async () => {
      const result = await updateProfile(data);
      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update profile.' });
      }
    });
  };

  const getProgressPercentage = () => {
    let completed = 0;
    const total = 4; // 4 required fields
    const values = form.getValues();
    if (values.gender && values.gender !== "Prefer not to say") completed++;
    if (values.phone && profileSchema.shape.phone.safeParse(values.phone).success) completed++;
    if (values.collegeEmail && profileSchema.shape.collegeEmail.safeParse(values.collegeEmail).success) completed++;
    if (values.rollNumber && profileSchema.shape.rollNumber.safeParse(values.rollNumber).success) completed++;
    return Math.round((completed / total) * 100);
  };

  const progress = initialProfile.profileCompleted ? 100 : getProgressPercentage();
  const isComplete = progress === 100;

  return (
    <PageLayout className="bg-slate-50/50">
      <div className="max-w-7xl mx-auto w-full pb-12">
        <ListLayout
          sidebar={
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="border-slate-200 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden bg-white">
                <div className="h-32 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
                <CardContent className="px-6 pb-6 pt-0 relative">
                  <div className="flex flex-col items-center -mt-12">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center overflow-hidden z-10 relative">
                      {initialProfile.profileImage ? (
                        <img src={initialProfile.profileImage as string} alt={initialProfile.name as string} className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle2 className="w-16 h-16 text-slate-300" />
                      )}
                      
                      {/* Circular Progress overlay */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                        <circle cx="50" cy="50" r="46" fill="transparent" stroke={isComplete ? "#10b981" : "#6366f1"} strokeWidth="4" strokeDasharray={`${progress * 2.89} 289`} className="transition-all duration-1000 ease-out" />
                      </svg>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-slate-900 mt-4 tracking-tight">{initialProfile.name as string}</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">{initialProfile.email as string}</p>
                    
                    {!initialProfile.profileCompleted && (
                      <div className="mt-4 py-1.5 px-3 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-bold tracking-wide uppercase flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Profile {progress}% Complete
                      </div>
                    )}
                    {initialProfile.profileCompleted && (
                      <div className="mt-4 py-1.5 px-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-wide uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Profile
                      </div>
                    )}
                    
                    {(initialProfile.department || initialProfile.year) && (
                      <div className="w-full mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Department</p>
                          <p className="text-sm font-semibold text-slate-800 line-clamp-1">{(initialProfile.department as string) || '-'}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Year</p>
                          <p className="text-sm font-semibold text-slate-800">{(initialProfile.year as string) || '-'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="border-slate-200 shadow-sm rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-2">
                  <div className="space-y-1">
                    {[
                      { icon: Lock, label: 'Privacy Settings' },
                      { icon: Bell, label: 'Notifications' },
                      { icon: Shield, label: 'Security' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                            <item.icon className="w-5 h-5" />
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
            
            {/* Complete Profile Form */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card className="border-slate-200 shadow-sm rounded-3xl bg-white overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/50 p-6 sm:px-8">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Personal Information</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Complete these details to register for campus events.
                  </p>
                </div>
                
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Roll Number</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 20CS10001"
                          {...form.register('rollNumber')}
                          className="flex h-11 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 uppercase"
                        />
                        {form.formState.errors.rollNumber && (
                          <p className="text-xs text-red-500 font-medium">{form.formState.errors.rollNumber.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">College Email</label>
                        <input 
                          type="email" 
                          placeholder="student@kgpian.iitkgp.ac.in"
                          {...form.register('collegeEmail')}
                          className="flex h-11 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {form.formState.errors.collegeEmail && (
                          <p className="text-xs text-red-500 font-medium">{form.formState.errors.collegeEmail.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                        <input 
                          type="text" 
                          placeholder="+919876543210"
                          {...form.register('phone')}
                          className="flex h-11 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-xs text-red-500 font-medium">{form.formState.errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Gender</label>
                        <select 
                          {...form.register('gender')}
                          className="flex h-11 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:border-transparent"
                        >
                          <option value="Prefer not to say">Prefer not to say</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {form.formState.errors.gender && (
                          <p className="text-xs text-red-500 font-medium">{form.formState.errors.gender.message}</p>
                        )}
                      </div>
                    </div>

                    {message && (
                      <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {message.text}
                      </div>
                    )}

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <Button 
                        type="submit" 
                        disabled={isPending}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 h-11 font-semibold"
                      >
                        {isPending ? (
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                        ) : (
                          <><Save className="w-4 h-4 mr-2" /> Save Profile</>
                        )}
                      </Button>
                    </div>

                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* My Bookmarks */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="border-slate-200 shadow-sm rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Bookmarks</h2>
                    <Button variant="ghost" className="text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 h-9 px-4 text-sm">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>

                  <CardGrid cols="2" gap="md">
                    {[
                      {
                        icon: BookOpen,
                        color: 'bg-blue-50 text-blue-600 border-blue-100',
                        title: 'Advanced Machine Learning Syllabus',
                        description: 'Reference materials and grading structure for Autumn 2024.'
                      },
                      {
                        icon: FileText,
                        color: 'bg-purple-50 text-purple-600 border-purple-100',
                        title: 'Neural Systems Research Paper',
                        description: 'Saved papers from library for thesis preparation.'
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-100 bg-white p-5 hover:border-slate-200 hover:shadow-md hover:shadow-slate-200/50 transition-all cursor-pointer group"
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
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

            {/* Registered Events (Timeline Style) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="border-slate-200 shadow-sm rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Registered Events</h2>
                    <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                      {stats.eventsRegistered as number} Total
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        status: 'Upcoming',
                        title: 'Kshitij Innovation Track',
                        date: 'August 18-21, 2026',
                        description: 'Registered for autonomous systems challenge',
                        color: 'bg-orange-500',
                        statusColor: 'bg-orange-50 text-orange-700 border border-orange-200'
                      },
                      {
                        status: 'Tomorrow',
                        title: 'Alumni Guest Lecture: AI Governance',
                        date: 'July 7, 2026 • Netaji Auditorium',
                        description: 'Recommended for final-year CS students',
                        color: 'bg-indigo-500',
                        statusColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      },
                      {
                        status: 'Completed',
                        title: 'Spring Fest Coordination Meet',
                        date: 'June 28, 2026',
                        description: 'Core volunteer planning completed',
                        color: 'bg-slate-300',
                        statusColor: 'bg-slate-50 text-slate-600 border border-slate-200',
                        completed: true
                      },
                    ].map((event, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-5 group ${event.completed ? 'opacity-60' : ''}`}
                      >
                        <div className="flex flex-col items-center mt-1">
                          <div className={`w-3 h-3 rounded-full ${event.color} ring-4 ring-slate-50`} />
                          {idx !== 2 && <div className="w-0.5 h-full bg-slate-100 mt-2 rounded-full" />}
                        </div>
                        
                        <div className="flex-1 pb-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                            <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                              {event.title}
                            </h3>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md whitespace-nowrap self-start sm:self-auto ${event.statusColor}`}>
                              {event.status}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            {event.date}
                          </p>
                          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </ListLayout>
      </div>
    </PageLayout>
  );
}

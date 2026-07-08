"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/app/actions/profileActions';
import { PageLayout } from '@/components/layouts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

// Simplified schema per user instructions
const profileSchema = z.object({
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    message: "Please select a valid gender",
  }),
  phone: z.string().regex(/^\+91[0-9]{10}$/, "Must be a valid Indian phone number starting with +91 (e.g. +919876543210)"),
  collegeEmail: z.string().email("Invalid email").endsWith("@kgpian.iitkgp.ac.in", "Must be a valid @kgpian.iitkgp.ac.in email"),
  rollNumber: z.string().regex(/^[0-9]{2}[A-Z]{2}[0-9]{5}$/i, "Invalid Roll Number (e.g. 20CS10001)"),
  hall: z.string().min(1, "Hall of Residence is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export interface InitialProfile {
  name: string;
  email: string;
  phone: string;
  collegeEmail: string;
  rollNumber: string;
  hall: string;
  department: string;
  year: string;
  profileImage: string;
  gender: string;
}

export default function OnboardingClient({ initialProfile }: { initialProfile: InitialProfile }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      gender: (initialProfile.gender as "Male" | "Female" | "Other" | "Prefer not to say") || "Prefer not to say",
      phone: initialProfile.phone || "",
      collegeEmail: initialProfile.collegeEmail || "",
      rollNumber: initialProfile.rollNumber || "",
      hall: initialProfile.hall || "",
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    startTransition(async () => {
      const result = await updateProfile(data);
      if (result.success) {
        toast.success('Profile completed successfully!');
        router.push('/dashboard');
      } else {
        toast.error(result.error || 'Failed to complete profile.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome to Campus Connect!
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-medium">
          Let&apos;s set up your profile before you start exploring events.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-slate-200 shadow-xl rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-6 sm:p-10">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Roll Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 20CS10001"
                    {...form.register('rollNumber')}
                    className="flex h-12 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 uppercase"
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
                    className="flex h-12 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
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
                    className="flex h-12 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-xs text-red-500 font-medium">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Hall of Residence</label>
                  <input 
                    type="text" 
                    placeholder="e.g. LLR Hall"
                    {...form.register('hall')}
                    className="flex h-12 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                  />
                  {form.formState.errors.hall && (
                    <p className="text-xs text-red-500 font-medium">{form.formState.errors.hall.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Gender</label>
                  <select 
                    {...form.register('gender')}
                    className="flex h-12 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
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

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 text-base font-bold shadow-sm"
                >
                  {isPending ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Setting up profile...</>
                  ) : (
                    <><span className="mr-2">Complete Profile</span> <ArrowRight className="w-5 h-5" /></>
                  )}
                </Button>

              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

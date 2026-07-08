import React from 'react';
import { getProfile } from '@/app/actions/profileActions';
import ProfileClient from './ProfileClient';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

export default async function ProfilePage() {
  const { userId, redirectToSignIn } = await auth();
  
  if (!userId) {
    return redirectToSignIn();
  }

  const data = await getProfile();
  
  if (!data || !data.success || !data.profile) {
    redirect("/");
  }

  // Fetch registered events
  const { getUserRegisteredEvents } = await import('@/app/actions/registrationActions');
  const registeredEventsRes = await getUserRegisteredEvents();
  const registeredEvents = registeredEventsRes.events || [];

  return <ProfileClient initialProfile={data.profile} stats={data.stats} registeredEvents={registeredEvents} />;
}

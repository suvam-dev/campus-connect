import React from 'react';
import { getProfile } from '@/app/actions/profileActions';
import ProfileClient from './ProfileClient';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const data = await getProfile();
  
  if (!data || !data.success || !data.profile) {
    redirect("/sign-in");
  }

  return <ProfileClient initialProfile={data.profile} stats={data.stats} />;
}

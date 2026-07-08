import React from 'react';
import { notFound } from 'next/navigation';
import EventDetailClient from './EventDetailClient';
import { checkRegistrationStatus } from '@/app/actions/registrationActions';


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage(props: PageProps) {
  const params = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  
  let event = null;
  
  try {
    const res = await fetch(`${baseUrl}/api/events/${params.id}`, { next: { tags: ['events'] } });
    if (!res.ok) {
      if (res.status === 404) return notFound();
      throw new Error("Failed to fetch event");
    }
    event = await res.json();
  } catch (error) {
    console.error("Failed to fetch event detail:", error);
    return notFound();
  }

  const { isRegistered, registrationId } = await checkRegistrationStatus(params.id);

  return <EventDetailClient event={event} isRegisteredInitial={isRegistered} registrationIdInitial={registrationId} />;
}

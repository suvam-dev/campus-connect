import React from 'react';
import { notFound } from 'next/navigation';
import EventDetailClient from './EventDetailClient';
import { checkRegistrationStatus } from '@/app/actions/registrationActions';


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage(props: PageProps) {
  const params = await props.params;
  let event = null;
  try {
    const { getEventById } = await import("@/lib/services/eventService");
    event = await getEventById(params.id);
    if (!event) return notFound();
  } catch (error) {
    console.error("Failed to fetch event detail:", error);
    return notFound();
  }

  const { isRegistered, registrationId } = await checkRegistrationStatus(params.id);

  return <EventDetailClient event={event} isRegisteredInitial={isRegistered} registrationIdInitial={registrationId} />;
}

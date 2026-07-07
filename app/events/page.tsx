import React from 'react';
import EventsClient from './EventsClient';
// DB calls refactored to REST API

export const dynamic = 'force-dynamic';

export default async function EventsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  let initialEvents = [];
  try {
    const params = new URLSearchParams();
    if (searchParams.q) params.set('q', searchParams.q as string);
    if (searchParams.categories) params.set('categories', searchParams.categories as string);

    const res = await fetch(`${baseUrl}/api/events?${params.toString()}`, { cache: 'no-store' });
    if (res.ok) {
      initialEvents = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return <EventsClient initialEvents={initialEvents} />;
}

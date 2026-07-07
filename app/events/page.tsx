import React from 'react';
import EventsClient from './EventsClient';
// DB calls refactored to REST API

export default async function EventsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  let initialEvents = [];
  try {
    const res = await fetch(`${baseUrl}/api/events`, { next: { revalidate: 900 } });
    if (res.ok) {
      initialEvents = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return <EventsClient initialEvents={initialEvents} />;
}

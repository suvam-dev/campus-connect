import React from 'react';
import EventsClient from './EventsClient';
// DB calls refactored to REST API


import { getEvents } from "@/lib/services/eventService";

export default async function EventsPage() {
  let initialEvents: any[] = [];
  try {
    initialEvents = await getEvents();
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
  return <EventsClient initialEvents={initialEvents} />;
}

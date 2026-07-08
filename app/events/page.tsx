import React from 'react';
import EventsClient from './EventsClient';
import { getEvents } from "@/lib/services/eventService";
import type { SerializedEvent } from "@/lib/types";

export default async function EventsPage() {
  let initialEvents: SerializedEvent[] = [];
  try {
    initialEvents = await getEvents();
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
  return <EventsClient initialEvents={initialEvents} />;
}

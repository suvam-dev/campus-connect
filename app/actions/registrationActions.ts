"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import { connectDB } from "@/lib/mongodb";
import type { RegistrationResult, RegisteredEvent } from "@/lib/types";

interface PopulatedEvent {
  _id: { toString(): string };
  title: string;
  venue: string;
  date: string;
  time: string;
  image?: string;
  description?: string;
}

interface PopulatedRegistration {
  _id: { toString(): string };
  status: string;
  registeredAt: Date;
  event: PopulatedEvent | null;
}

export async function registerForEvent(eventId: string): Promise<RegistrationResult> {
  try {
    const { dbUser } = await getCurrentUser();
    if (!dbUser) {
      return { success: false, error: "Please log in to register." };
    }

    if (!dbUser.profileCompleted) {
      return { success: false, error: "INCOMPLETE_PROFILE" };
    }

    await connectDB();

    const event = await Event.findById(eventId).lean();
    if (!event) {
      return { success: false, error: "Event not found." };
    }

    if (event.status !== 'published') {
      return { success: false, error: "Event is not open for registration." };
    }

    // Check deadline
    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline as string | number | Date)) {
      return { success: false, error: "Registration deadline has passed." };
    }

    // Check capacity
    if (event.capacity && event.capacity > 0) {
      const currentCount = await Registration.countDocuments({ event: eventId, status: 'registered' });
      if (currentCount >= event.capacity) {
        return { success: false, error: "Event is at full capacity." };
      }
    }

    // Attempt to register
    const reg = await Registration.create({
      user: dbUser._id,
      event: eventId,
    });

    revalidatePath(`/events/${eventId}`);
    return { success: true, registrationId: reg._id.toString() };
    
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return { success: false, error: "You are already registered for this event." };
    }
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: message };
  }
}

export async function checkRegistrationStatus(eventId: string): Promise<{ isRegistered: boolean; registrationId?: string }> {
  try {
    const { dbUser } = await getCurrentUser();
    if (!dbUser) return { isRegistered: false };

    await connectDB();
    const existing = await Registration.findOne({ user: dbUser._id, event: eventId }).lean();
    
    if (existing) {
      return { isRegistered: true, registrationId: existing._id.toString() };
    }
    
    return { isRegistered: false };
  } catch (err: unknown) {
    return { isRegistered: false };
  }
}

export async function getUserRegisteredEvents(): Promise<{ success: boolean; events: RegisteredEvent[] }> {
  try {
    const { dbUser } = await getCurrentUser();
    if (!dbUser) return { success: false, events: [] };

    await connectDB();
    const registrations = (await Registration.find({ user: dbUser._id })
      .populate('event')
      .sort({ registeredAt: -1 })
      .lean()) as unknown as PopulatedRegistration[];
    
    // Map data safely for client consumption
    const events = registrations
      .filter((r) => r.event) // Ensure event wasn't deleted
      .map((r) => {
        const event = r.event as PopulatedEvent;
        return {
          id: event._id.toString(),
          title: event.title,
          venue: event.venue,
          date: event.date,
          time: event.time,
          image: event.image,
          description: event.description,
          status: r.status, // Registration status
          registeredAt: new Date(r.registeredAt).toISOString(),
        };
      });

    return { success: true, events };
  } catch (err: unknown) {
    console.error("getUserRegisteredEvents error:", err);
    return { success: false, events: [] };
  }
}

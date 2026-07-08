"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import { connectDB } from "@/lib/mongodb";

export async function registerForEvent(eventId: string) {
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
    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
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
    
  } catch (error: any) {
    if (error.code === 11000) {
      return { success: false, error: "You are already registered for this event." };
    }
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}

export async function checkRegistrationStatus(eventId: string) {
  try {
    const { dbUser } = await getCurrentUser();
    if (!dbUser) return { isRegistered: false };

    await connectDB();
    const existing = await Registration.findOne({ user: dbUser._id, event: eventId }).lean();
    
    if (existing) {
      return { isRegistered: true, registrationId: (existing as any)._id.toString() };
    }
    
    return { isRegistered: false };
  } catch (err: any) {
    return { isRegistered: false };
  }
}

export async function getUserRegisteredEvents() {
  try {
    const { dbUser } = await getCurrentUser();
    if (!dbUser) return { success: false, events: [] };

    await connectDB();
    const registrations = await Registration.find({ user: dbUser._id })
      .populate('event')
      .sort({ registeredAt: -1 })
      .lean();
    
    // Map data safely for client consumption
    const events = registrations
      .filter((r: any) => r.event) // Ensure event wasn't deleted
      .map((r: any) => {
        const event = r.event;
        return {
          id: event._id.toString(),
          title: event.title,
          venue: event.venue,
          date: event.date,
          time: event.time,
          image: event.image,
          description: event.description,
          status: r.status, // Registration status
          registeredAt: r.registeredAt.toISOString(),
        };
      });

    return { success: true, events };
  } catch (err: any) {
    console.error("getUserRegisteredEvents error:", err);
    return { success: false, events: [] };
  }
}

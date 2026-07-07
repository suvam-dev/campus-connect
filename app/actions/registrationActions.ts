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
  } catch (err) {
    return { isRegistered: false };
  }
}

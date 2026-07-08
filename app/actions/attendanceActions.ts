"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, requireAdmin } from "@/lib/auth";
import Registration from "@/models/Registration";
import { connectDB } from "@/lib/mongodb";

interface RegistrationUser {
  _id: { toString(): string };
  name: string;
  email: string;
}

interface PopulatedRegistration {
  _id: { toString(): string };
  event: { toString(): string };
  checkedIn: boolean;
  user: RegistrationUser;
}

export async function markAttendance(registrationId: string) {
  try {
    const { dbUser } = await getCurrentUser();
    
    // Only admins can mark attendance
    await requireAdmin();

    await connectDB();

    const registration = (await Registration.findById(registrationId).populate("user").lean()) as unknown as PopulatedRegistration | null;
    
    if (!registration) {
      return { success: false, error: "Registration not found." };
    }

    if (registration.checkedIn) {
      return { success: false, error: "User has already checked in." };
    }

    await Registration.findByIdAndUpdate(registrationId, {
      checkedIn: true,
      attendance: {
        checkedInAt: new Date(),
        checkedInBy: dbUser?._id,
      }
    });

    revalidatePath(`/admin/events/${registration.event.toString()}/scan`);
    
    return { 
      success: true, 
      user: {
        name: registration.user.name,
        email: registration.user.email,
      }
    };
    
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: message };
  }
}

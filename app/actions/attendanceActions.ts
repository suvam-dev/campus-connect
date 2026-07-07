"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import Registration from "@/models/Registration";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";

export async function markAttendance(registrationId: string) {
  try {
    const { dbUser } = await getCurrentUser();
    
    // Only admins can mark attendance
    await requireAdmin();

    await connectDB();

    const registration = await Registration.findById(registrationId).populate("user").lean();
    
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

    revalidatePath(`/admin/events/${(registration as any).event}/scan`);
    
    return { 
      success: true, 
      user: {
        name: (registration.user as any).name,
        email: (registration.user as any).email,
      }
    };
    
  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}

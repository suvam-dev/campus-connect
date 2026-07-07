"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Registration from "@/models/Registration";
import { z } from "zod";

const profileSchema = z.object({
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  phone: z.string().regex(/^\+91[0-9]{10}$/, "Must be a valid Indian phone number starting with +91"),
  collegeEmail: z.string().email("Invalid email address").endsWith("@kgpian.iitkgp.ac.in", "Must be a valid @kgpian.iitkgp.ac.in email"),
  rollNumber: z.string().regex(/^[0-9]{2}[A-Z]{2}[0-9]{5}$/i, "Invalid Roll Number format (e.g. 20CS10001)"),
});

export async function getProfile() {
  try {
    const { dbUser } = await getCurrentUser();
    if (!dbUser) return null;

    await connectDB();
    
    // Fetch quick stats
    const eventsRegistered = await Registration.countDocuments({ user: dbUser._id, status: 'registered' });
    
    // Return safe profile object
    return {
      success: true,
      profile: {
        clerkId: dbUser.clerkId,
        name: dbUser.name,
        email: dbUser.email,
        profileImage: dbUser.profileImage,
        gender: dbUser.gender || "",
        phone: dbUser.phone || "",
        collegeEmail: dbUser.collegeEmail || "",
        rollNumber: dbUser.rollNumber || "",
        department: dbUser.department || "",
        year: dbUser.year || "",
        profileCompleted: dbUser.profileCompleted || false,
      },
      stats: {
        eventsRegistered,
        bookmarks: 0, // Placeholder for future implementation
        certificates: 0,
        attendance: 0
      }
    };
  } catch (error) {
    console.error("getProfile error:", error);
    return { success: false, error: "Failed to load profile" };
  }
}

export async function updateProfile(data: {
  gender: string;
  phone: string;
  collegeEmail: string;
  rollNumber: string;
}) {
  try {
    const { dbUser } = await getCurrentUser();
    if (!dbUser) return { success: false, error: "Unauthorized" };

    // Validate using Zod
    const validatedData = profileSchema.parse(data);
    
    // Auto-uppercase roll number
    const upperRollNumber = validatedData.rollNumber.toUpperCase();
    
    // Extract department and year from Roll Number (e.g., 20CS10001 -> Year 2020, Dept CS)
    const yearPrefix = upperRollNumber.substring(0, 2);
    const deptCode = upperRollNumber.substring(2, 4);
    
    // A mapping of KGP dept codes (simplified)
    const DEPT_MAP: Record<string, string> = {
      'CS': 'Computer Science',
      'EC': 'Electronics',
      'EE': 'Electrical',
      'ME': 'Mechanical',
      'CE': 'Civil',
      'CH': 'Chemical',
      'MT': 'Metallurgy',
      'AE': 'Aerospace',
      'AG': 'Agricultural',
      'AR': 'Architecture',
      'BT': 'Biotechnology',
      'MI': 'Mining',
      'IM': 'Industrial'
    };
    
    const departmentName = DEPT_MAP[deptCode] || deptCode;
    const yearNumber = parseInt(yearPrefix, 10);
    const currentYear = new Date().getFullYear() % 100; 
    let yearString = "First Year";
    
    if (yearNumber === currentYear) yearString = "First Year";
    else if (yearNumber === currentYear - 1) yearString = "Second Year";
    else if (yearNumber === currentYear - 2) yearString = "Third Year";
    else if (yearNumber === currentYear - 3) yearString = "Fourth Year";
    else if (yearNumber === currentYear - 4) yearString = "Fifth Year";
    else yearString = "Alumni";

    await connectDB();
    
    await User.findByIdAndUpdate(dbUser._id, {
      gender: validatedData.gender,
      phone: validatedData.phone,
      collegeEmail: validatedData.collegeEmail,
      rollNumber: upperRollNumber,
      department: departmentName,
      year: yearString,
      profileCompleted: true
    });

    revalidatePath("/profile");
    
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error("updateProfile error:", error);
    return { success: false, error: "Failed to update profile." };
  }
}

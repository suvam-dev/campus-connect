import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import OnboardingClient from "./OnboardingClient";

export default async function OnboardingPage() {
  const { dbUser, isNewUser } = await getCurrentUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  if (dbUser.profileCompleted) {
    redirect("/dashboard");
  }

  // We pass the partial profile down
  const initialProfile = {
    name: dbUser.name || "",
    email: dbUser.email || "",
    phone: dbUser.phone || "",
    collegeEmail: dbUser.collegeEmail || "",
    rollNumber: dbUser.rollNumber || "",
    hall: dbUser.hall || "",
    department: dbUser.department || "",
    year: dbUser.year || "",
    profileImage: dbUser.profileImage || "",
    gender: dbUser.gender || "Prefer not to say",
  };

  return <OnboardingClient initialProfile={initialProfile} />;
}

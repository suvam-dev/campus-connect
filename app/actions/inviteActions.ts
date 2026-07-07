"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import Invite from "@/models/Invite";
import { connectDB } from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

export async function sendInvite(formData: FormData) {
  const email = formData.get("email") as string;
  const society = formData.get("society") as string;
  const role = (formData.get("role") as string) || "society_admin";

  if (!email || !society) {
    throw new Error("Email and Society are required");
  }

  // Authorization: Must have 'canInviteAdmins' for this society or be super_admin
  const user = await requireAdmin(society, "canInviteAdmins");

  await connectDB();
  const token = `invite_${uuidv4()}`;
  
  await Invite.findOneAndUpdate(
    { email: email.toLowerCase(), society },
    {
      $set: {
        email: email.toLowerCase(),
        society,
        role,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        invitedBy: user.dbUser._id,
        status: "pending",
      },
    },
    { upsert: true, new: true }
  );

  // You would typically trigger an email here using Resend / SendGrid etc.

  revalidatePath("/admin");
  redirect("/admin");
}

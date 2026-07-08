"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Society from "@/models/Society";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createSociety(formData: FormData) {
  const user = await requireAdmin(); // super_admin only

  const name        = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || "";
  const logo        = (formData.get("logo") as string)?.trim() || "";
  const slugInput   = (formData.get("slug") as string)?.trim();

  if (!name) {
    throw new Error("Society name is required.");
  }

  const slug = slugInput ? toSlug(slugInput) : toSlug(name);

  if (!slug) {
    throw new Error("Could not generate a valid slug from the name provided.");
  }

  await connectDB();

  const existing = await Society.findOne({ slug });
  if (existing) {
    throw new Error(`A society with slug "${slug}" already exists. Choose a different name or slug.`);
  }

  await Society.create({
    name,
    description,
    logo,
    slug,
    admins: [],
    members: [],
    createdBy: user.dbUser._id,
  });

  revalidatePath("/super-admin/societies");
  redirect("/super-admin/societies");
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import Event from "@/models/Event";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const venue = formData.get("venue") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const tagsStr = formData.get("tags") as string;
  const status = formData.get("status") as string || "Published";
  const capacityStr = formData.get("capacity") as string;
  const registrationDeadline = formData.get("registrationDeadline") as string;

  if (!title || !venue || !date || !time || !category) {
    throw new Error("Missing required fields");
  }

  const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : [];
  const capacity = capacityStr ? parseInt(capacityStr, 10) : undefined;

  await connectDB();
  const newEvent = await Event.create({
    title,
    venue,
    date,
    time,
    category,
    description,
    image,
    tags,
    status,
    capacity,
    registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : undefined,
  });

  revalidatePath('/');
  revalidatePath('/events');
  revalidatePath('/admin/events');

  redirect('/admin/events');
}

export async function updateEvent(id: string, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const venue = formData.get("venue") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const tagsStr = formData.get("tags") as string;
  const status = formData.get("status") as string || "Published";
  const capacityStr = formData.get("capacity") as string;
  const registrationDeadline = formData.get("registrationDeadline") as string;

  const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : [];
  const capacity = capacityStr ? parseInt(capacityStr, 10) : undefined;

  await connectDB();
  await Event.findByIdAndUpdate(id, {
    title,
    venue,
    date,
    time,
    category,
    description,
    image,
    tags,
    status,
    capacity,
    registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : undefined,
  });

  revalidatePath('/');
  revalidatePath('/events');
  revalidatePath(`/events/${id}`);
  revalidatePath('/admin/events');

  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  await connectDB();
  
  await Event.findByIdAndDelete(id);
  
  revalidatePath('/');
  revalidatePath('/events');
  revalidatePath('/admin/events');
}

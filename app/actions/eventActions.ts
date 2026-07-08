"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import Event from "@/models/Event";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { createEventSchema, updateEventSchema } from "@/lib/validations";

export async function createEvent(formData: FormData) {
  await requireAdmin();

  const raw = {
    title: formData.get("title") as string,
    venue: formData.get("venue") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    category: formData.get("category") as string,
    description: (formData.get("description") as string) || "",
    image: (formData.get("image") as string) || "",
    tags: (formData.get("tags") as string)
      ? (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    status: (formData.get("status") as string) || "published",
    capacity: formData.get("capacity")
      ? parseInt(formData.get("capacity") as string, 10)
      : undefined,
    registrationDeadline: (formData.get("registrationDeadline") as string) || undefined,
  };

  // Validate with Zod — throws ZodError with details on failure
  const validated = createEventSchema.parse(raw);

  await connectDB();
  await Event.create({
    ...validated,
    registrationDeadline: validated.registrationDeadline
      ? new Date(validated.registrationDeadline)
      : undefined,
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");

  redirect("/admin/events");
}

export async function updateEvent(id: string, formData: FormData) {
  await requireAdmin();

  const raw = {
    title: formData.get("title") as string,
    venue: formData.get("venue") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    category: formData.get("category") as string,
    description: (formData.get("description") as string) || "",
    image: (formData.get("image") as string) || "",
    tags: (formData.get("tags") as string)
      ? (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    status: (formData.get("status") as string) || "published",
    capacity: formData.get("capacity")
      ? parseInt(formData.get("capacity") as string, 10)
      : undefined,
    registrationDeadline: (formData.get("registrationDeadline") as string) || undefined,
  };

  // Validate with Zod
  const validated = updateEventSchema.parse(raw);

  await connectDB();
  await Event.findByIdAndUpdate(id, {
    ...validated,
    registrationDeadline: validated.registrationDeadline
      ? new Date(validated.registrationDeadline)
      : undefined,
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  revalidatePath("/admin/events");

  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  await connectDB();

  await Event.findByIdAndDelete(id);

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

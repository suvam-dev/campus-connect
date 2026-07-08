import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { requireAdmin } from "@/lib/adminAuth";
import { updateEventSchema } from "@/lib/validations";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/events/[id]  — public
export async function GET(request: NextRequest, props: Params) {
  const params = await props.params;
  try {
    await connectDB();

    const event = await Event.findById(params.id).lean();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const serialized = {
      id: (event._id as { toString(): string }).toString(),
      title: event.title as string,
      venue: event.venue as string,
      date: event.date as string,
      time: event.time as string,
      category: event.category as string,
      image: event.image as string | undefined,
      description: event.description as string | undefined,
      tags: (event.tags || []) as string[],
    };

    return NextResponse.json(serialized, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`GET /api/events/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch event", details: message },
      { status: 500 }
    );
  }
}

// PATCH /api/events/[id]  — admin only
export async function PATCH(request: NextRequest, props: Params) {
  const params = await props.params;

  try {
    await requireAdmin(request);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === "unauthenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await request.json();

    // Validate with Zod (partial — all fields optional for PATCH)
    const parseResult = updateEventSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updatedEvent = await Event.findByIdAndUpdate(params.id, parseResult.data, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event updated successfully", event: updatedEvent },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`PATCH /api/events/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to update event", details: message },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]  — admin only
export async function DELETE(request: NextRequest, props: Params) {
  const params = await props.params;

  try {
    await requireAdmin(request);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === "unauthenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();

    const deletedEvent = await Event.findByIdAndDelete(params.id);

    if (!deletedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`DELETE /api/events/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete event", details: message },
      { status: 500 }
    );
  }
}

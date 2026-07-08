import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/events/[id]
export async function GET(request: NextRequest, props: Params) {
  const params = await props.params;
  try {
    await connectDB();
    
    const event = await Event.findById(params.id).lean();
    
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    
    const serialized = {
      id: (event as any)._id.toString(),
      title: (event as any).title,
      venue: (event as any).venue,
      date: (event as any).date,
      time: (event as any).time,
      category: (event as any).category,
      image: (event as any).image,
      description: (event as any).description,
      tags: (event as any).tags || [],
    };
    
    return NextResponse.json(serialized, { status: 200 });
  } catch (error: any) {
    console.error(`GET /api/events/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch event", details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/events/[id]
export async function PATCH(request: NextRequest, props: Params) {
  const params = await props.params;
  try {
    await connectDB();
    const body = await request.json();
    
    const updatedEvent = await Event.findByIdAndUpdate(params.id, body, {
      new: true, // return the updated document
      runValidators: true,
    });
    
    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    
    return NextResponse.json(
      { message: "Event updated successfully", event: updatedEvent },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`PATCH /api/events/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to update event", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]
export async function DELETE(request: NextRequest, props: Params) {
  const params = await props.params;
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
  } catch (error: any) {
    console.error(`DELETE /api/events/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete event", details: error.message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

// GET /api/events
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Parse query params (e.g., ?limit=3)
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    
    let query = Event.find({}).sort({ date: 1 });
    
    if (limit > 0) {
      query = query.limit(limit);
    }
    
    const events = await query.lean();
    
    // Serialize Mongoose doc
    const serialized = events.map((e: any) => ({
      id: e._id.toString(),
      title: e.title,
      venue: e.venue,
      date: e.date,
      time: e.time,
      category: e.category,
      image: e.image,
      description: e.description,
      tags: e.tags || [],
    }));

    return NextResponse.json(serialized, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/events
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newEvent = await Event.create(body);
    
    // On-demand revalidation to update frontend caches instantly
    revalidatePath('/');
    revalidatePath('/events');
    
    return NextResponse.json(
      { message: "Event created successfully", id: newEvent._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      { error: "Failed to create event", details: error.message },
      { status: 500 }
    );
  }
}

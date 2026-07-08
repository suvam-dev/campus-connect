import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { requireAdmin } from "@/lib/adminAuth";

// GET /api/events
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Parse query params (e.g., ?limit=3&q=tech&categories=Technical,Workshop)
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const q = searchParams.get("q");
    const categories = searchParams.get("categories");
    
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    
    const filter: any = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { venue: { $regex: q, $options: 'i' } }
      ];
    }
    
    if (categories) {
      // Split by comma, case insensitive regex for each category
      const catArray = categories.split(',').map(c => new RegExp(c.trim(), 'i'));
      filter.category = { $in: catArray };
    }

    let query = Event.find(filter).sort({ date: 1 });
    
    if (limit > 0 && limit < 100) {
      query = query.limit(limit);
    } else {
      query = query.limit(100); // max 100
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

// POST /api/events  — admin only
export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg === "unauthenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await request.json();

    const newEvent = await Event.create(body);

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

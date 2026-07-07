import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";

// GET /api/notices
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Parse query params (e.g., ?limit=3)
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 0;
    
    let query = Notice.find({}).sort({ date: -1 });
    
    if (limit > 0) {
      query = query.limit(limit);
    }
    
    const notices = await query.lean();
    
    // Serialize Mongoose doc
    const serialized = notices.map((n: any) => ({
      id: n._id.toString(),
      title: n.title,
      category: n.category,
      date: n.date,
      description: n.description,
      source: n.source,
      isUnread: n.isUnread,
      iconType: n.iconType,
      tags: n.tags || [],
    }));

    return NextResponse.json(serialized, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/notices error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notices", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/notices
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newNotice = await Notice.create(body);
    
    // On-demand revalidation to update frontend caches instantly
    revalidatePath('/');
    revalidatePath('/notices');
    
    return NextResponse.json(
      { message: "Notice created successfully", id: newNotice._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/notices error:", error);
    return NextResponse.json(
      { error: "Failed to create notice", details: error.message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { requireAdmin } from "@/lib/adminAuth";

import { createNoticeSchema } from "@/lib/validations";

// GET /api/notices  — public
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 0;

    let query = Notice.find({}).sort({ date: -1 });

    if (limit > 0) {
      query = query.limit(limit);
    }

    const notices = await query.lean();

    const serialized = notices.map((n) => ({
      id: (n._id as { toString(): string }).toString(),
      title: n.title as string,
      category: n.category as string,
      date: n.date as string,
      description: n.description as string,
      source: n.source as string,
      isUnread: (n.isUnread || false) as boolean,
      iconType: n.iconType as string,
      tags: (n.tags || []) as string[],
    }));

    return NextResponse.json(serialized, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("GET /api/notices error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notices", details: message },
      { status: 500 }
    );
  }
}

// POST /api/notices  — admin only
export async function POST(request: NextRequest) {
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

    // Validate with Zod
    const parseResult = createNoticeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newNotice = await Notice.create(parseResult.data);

    revalidatePath('/');
    revalidatePath('/notices');

    return NextResponse.json(
      { message: "Notice created successfully", id: newNotice._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("POST /api/notices error:", error);
    return NextResponse.json(
      { error: "Failed to create notice", details: message },
      { status: 500 }
    );
  }
}

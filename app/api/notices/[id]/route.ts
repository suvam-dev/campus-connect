import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { requireAdmin } from "@/lib/adminAuth";

import { updateNoticeSchema } from "@/lib/validations";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/notices/[id]  — public
export async function GET(request: NextRequest, props: Params) {
  const params = await props.params;
  try {
    await connectDB();

    const notice = await Notice.findById(params.id).lean();

    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    const serialized = {
      id: (notice._id as { toString(): string }).toString(),
      title: notice.title as string,
      category: notice.category as string,
      date: notice.date as string,
      description: notice.description as string,
      source: notice.source as string,
      isUnread: (notice.isUnread || false) as boolean,
      iconType: notice.iconType as string,
      tags: (notice.tags || []) as string[],
    };

    return NextResponse.json(serialized, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`GET /api/notices/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch notice", details: message },
      { status: 500 }
    );
  }
}

// PATCH /api/notices/[id]  — admin only
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

    // Validate with Zod
    const parseResult = updateNoticeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updatedNotice = await Notice.findByIdAndUpdate(params.id, parseResult.data, {
      new: true,
      runValidators: true,
    });

    if (!updatedNotice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Notice updated successfully", notice: updatedNotice },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`PATCH /api/notices/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to update notice", details: message },
      { status: 500 }
    );
  }
}

// DELETE /api/notices/[id]  — admin only
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

    const deletedNotice = await Notice.findByIdAndDelete(params.id);

    if (!deletedNotice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Notice deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`DELETE /api/notices/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete notice", details: message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { requireAdmin } from "@/lib/adminAuth";

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
      id: (notice as any)._id.toString(),
      title: (notice as any).title,
      category: (notice as any).category,
      date: (notice as any).date,
      description: (notice as any).description,
      source: (notice as any).source,
      isUnread: (notice as any).isUnread,
      iconType: (notice as any).iconType,
      tags: (notice as any).tags || [],
    };

    return NextResponse.json(serialized, { status: 200 });
  } catch (error: any) {
    console.error(`GET /api/notices/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch notice", details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/notices/[id]  — admin only
export async function PATCH(request: NextRequest, props: Params) {
  const params = await props.params;

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

    const updatedNotice = await Notice.findByIdAndUpdate(params.id, body, {
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
  } catch (error: any) {
    console.error(`PATCH /api/notices/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to update notice", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/notices/[id]  — admin only
export async function DELETE(request: NextRequest, props: Params) {
  const params = await props.params;

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

    const deletedNotice = await Notice.findByIdAndDelete(params.id);

    if (!deletedNotice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Notice deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`DELETE /api/notices/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete notice", details: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    await connectDB();

    const eventId = params.id;
    const event = await Event.findById(eventId).lean();

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    const registrations = await Registration.find({ event: eventId })
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .lean();

    // Create CSV header
    const headers = ["Name", "Email", "Role", "Status", "Registered At"];
    
    // Create CSV rows
    const rows = registrations.map((reg: any) => {
      const user = reg.user || {};
      return [
        `"${(user.name || "").replace(/"/g, '""')}"`,
        `"${(user.email || "").replace(/"/g, '""')}"`,
        `"${(user.role || "").replace(/"/g, '""')}"`,
        `"${reg.status || "Registered"}"`,
        `"${new Date(reg.createdAt).toISOString()}"`
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="registrations_${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv"`
      }
    });

  } catch (err: any) {
    console.error("Export error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

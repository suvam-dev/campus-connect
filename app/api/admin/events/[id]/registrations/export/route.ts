import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import { requireAdmin } from "@/lib/auth";

interface PopulatedUser {
  name?: string;
  email?: string;
  role?: string;
}

interface PopulatedRegistration {
  user?: PopulatedUser;
  status?: string;
  createdAt: Date;
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await connectDB();

    const params = await context.params;
    const eventId = params.id;
    const event = await Event.findById(eventId).lean();

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    const registrations = (await Registration.find({ event: eventId })
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .lean()) as unknown as PopulatedRegistration[];

    // Create CSV header
    const csvHeaders = ["Name", "Email", "Role", "Status", "Registered At"];
    
    // Create CSV rows
    const rows = registrations.map((reg) => {
      const user = reg.user || {};
      return [
        `"${(user.name || "").replace(/"/g, '""')}"`,
        `"${(user.email || "").replace(/"/g, '""')}"`,
        `"${(user.role || "").replace(/"/g, '""')}"`,
        `"${reg.status || "Registered"}"`,
        `"${new Date(reg.createdAt).toISOString()}"`
      ].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...rows].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="registrations_${(event.title as string).replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv"`
      }
    });

  } catch (err: unknown) {
    console.error("Export error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

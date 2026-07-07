import React from "react";
import { requireAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { notFound } from "next/navigation";
import ScanClient from "./ScanClient";
import { PageLayout } from "@/components/layouts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ScanPage(props: PageProps) {
  await requireAdmin();
  const params = await props.params;

  await connectDB();
  const event = await Event.findById(params.id).lean();

  if (!event) {
    return notFound();
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Scan Attendance</h1>
        <p className="text-slate-600 mb-8">Event: {event.title}</p>
        
        <ScanClient eventId={params.id} />
      </div>
    </PageLayout>
  );
}

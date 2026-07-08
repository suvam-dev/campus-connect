import React from "react";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { requireAdmin } from "@/lib/auth";
import { PageLayout } from "@/components/layouts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Download, QrCode } from "lucide-react";
import DeleteEventButton from "./DeleteEventButton";
import Registration from "@/models/Registration";

export default async function AdminEventsPage() {
  await requireAdmin();
  await connectDB();

  // Fetch all events
  const events = await Event.find({}).sort({ date: -1 }).lean();

  // Fetch registration counts for each event
  const eventsWithStats = await Promise.all(
    events.map(async (event) => {
      const regCount = await Registration.countDocuments({ event: event._id });
      return { ...event, regCount };
    })
  );

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Manage Events</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of all events and registrations</p>
          </div>
          <Link href="/admin/events/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 md:border border-slate-200 dark:border-slate-800 md:rounded-xl overflow-hidden md:shadow-sm">
          {/* Desktop Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Registrations</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {eventsWithStats.map((event: any) => (
                  <tr key={event._id.toString()} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {event.title}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'Published' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400'
                          : event.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-400/10 dark:text-rose-400'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-400/10 dark:text-amber-400'
                      }`}>
                        {event.status || 'Published'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{event.regCount}</span>
                        {event.capacity && (
                          <span className="text-slate-400 dark:text-slate-500">/ {event.capacity}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/events/${event._id}/scan`}>
                          <Button variant="ghost" size="icon" title="Scan QR Code">
                            <QrCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </Button>
                        </Link>
                        <a href={`/api/admin/events/${event._id}/registrations/export`} download>
                          <Button variant="ghost" size="icon" title="Export CSV">
                            <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </Button>
                        </a>
                        <Link href={`/admin/events/${event._id}/edit`}>
                          <Button variant="ghost" size="icon" title="Edit Event">
                            <Edit className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </Button>
                        </Link>
                        <DeleteEventButton eventId={event._id.toString()} />
                      </div>
                    </td>
                  </tr>
                ))}
                {eventsWithStats.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                      No events found. Create your first event!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-4 p-4">
            {eventsWithStats.map((event: any) => (
              <div key={event._id.toString()} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{event.title}</h3>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                  </div>
                  <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'Published' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400'
                      : event.status === 'Cancelled'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-400/10 dark:text-rose-400'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-400/10 dark:text-amber-400'
                  }`}>
                    {event.status || 'Published'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Registrations</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {event.regCount} {event.capacity && <span className="text-slate-400">/ {event.capacity}</span>}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/events/${event._id}/scan`}>
                      <Button variant="secondary" size="icon" className="w-9 h-9 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </Link>
                    <a href={`/api/admin/events/${event._id}/registrations/export`} download>
                      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                    <Link href={`/admin/events/${event._id}/edit`}>
                      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <div className="scale-90 origin-center">
                      <DeleteEventButton eventId={event._id.toString()} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {eventsWithStats.length === 0 && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                No events found. Create your first event!
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

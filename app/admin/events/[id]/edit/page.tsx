import React from "react";
import { updateEvent } from "@/app/actions/eventActions";
import RichTextEditor from "@/components/shared/RichTextEditor";
import ImageUpload from "@/components/shared/ImageUpload";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  await connectDB();

  const event = await Event.findById(params.id).lean();
  if (!event) return notFound();

  const updateEventWithId = updateEvent.bind(null, event._id.toString());

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Edit Event</h1>
      
      <form action={updateEventWithId} className="bg-white dark:bg-slate-900 shadow-sm rounded-lg p-6 space-y-4 border border-slate-200 dark:border-slate-800">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
          <input type="text" id="title" name="title" required defaultValue={event.title}
                 className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date (YYYY-MM-DD)</label>
            <input type="text" id="date" name="date" required defaultValue={event.date}
                   className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Time</label>
            <input type="text" id="time" name="time" required defaultValue={event.time}
                   className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
          </div>
        </div>

        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Venue</label>
          <input type="text" id="venue" name="venue" required defaultValue={event.venue}
                 className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
          <select id="category" name="category" required defaultValue={event.category}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white">
            <option value="Cultural">Cultural</option>
            <option value="Technical">Technical</option>
            <option value="Sports">Sports</option>
            <option value="Academic">Academic</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Event Image / Banner</label>
          <ImageUpload name="image" defaultValue={event.image} />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
          <input type="text" id="tags" name="tags" defaultValue={event.tags?.join(", ")}
                 className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
          <RichTextEditor name="description" defaultValue={event.description} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 pt-4 mt-4">
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Capacity (optional)</label>
            <input type="number" id="capacity" name="capacity" defaultValue={event.capacity} min="1"
                   className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
          </div>
          <div>
            <label htmlFor="registrationDeadline" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Reg. Deadline (optional)</label>
            <input type="date" id="registrationDeadline" name="registrationDeadline" 
                   defaultValue={event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().split('T')[0] : ''}
                   className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
            <select id="status" name="status" defaultValue={event.status || "Published"}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-slate-800 dark:border-slate-700 dark:text-white">
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}

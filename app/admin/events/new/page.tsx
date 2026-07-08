import React from "react";
import { createEvent } from "@/app/actions/eventActions";
import RichTextEditor from "@/components/shared/RichTextEditor";
import ImageUpload from "@/components/shared/ImageUpload";

export default function NewEventPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Create New Event</h1>
      
      <form action={createEvent} className="bg-white shadow-sm rounded-lg p-6 space-y-4">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
          <input type="text" id="title" name="title" required
                 className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date (YYYY-MM-DD)</label>
            <input type="text" id="date" name="date" required placeholder="2024-10-15"
                   className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-700">Time</label>
            <input type="text" id="time" name="time" required placeholder="5:30 PM"
                   className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
          </div>
        </div>

        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-slate-700">Venue</label>
          <input type="text" id="venue" name="venue" required
                 className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
          <select id="category" name="category" required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
            <option value="Cultural">Cultural</option>
            <option value="Technical">Technical</option>
            <option value="Sports">Sports</option>
            <option value="Academic">Academic</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">Event Image / Banner</label>
          <ImageUpload name="image" />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-slate-700">Tags (comma separated)</label>
          <input type="text" id="tags" name="tags" placeholder="Tech, Career, Workshop"
                 className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <RichTextEditor name="description" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-200 pt-4 mt-4">
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-slate-700">Capacity (optional)</label>
            <input type="number" id="capacity" name="capacity" placeholder="e.g. 100" min="1"
                   className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
          </div>
          <div>
            <label htmlFor="registrationDeadline" className="block text-sm font-medium text-slate-700">Reg. Deadline (optional)</label>
            <input type="date" id="registrationDeadline" name="registrationDeadline"
                   className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
            <select id="status" name="status" defaultValue="published"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Event
          </button>
        </div>

      </form>
    </div>
  );
}

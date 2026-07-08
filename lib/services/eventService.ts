import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { unstable_cache } from "next/cache";
import type { SerializedEvent } from "@/lib/types";

export const getEvents = unstable_cache(
  async (limit: number = 100): Promise<SerializedEvent[]> => {
    await connectDB();
    const query = Event.find({ status: 'published' }).sort({ date: 1 }).limit(limit);
    const events = await query.lean();
    
    return events.map((e) => ({
      id: (e._id as { toString(): string }).toString(),
      title: e.title as string,
      venue: e.venue as string,
      date: e.date as string,
      time: e.time as string,
      category: e.category as string,
      image: e.image as string | undefined,
      description: e.description as string | undefined,
      tags: (e.tags || []) as string[],
    }));
  },
  ['events-list'],
  { tags: ['events'] }
);

export const getEventById = unstable_cache(
  async (id: string): Promise<SerializedEvent | null> => {
    await connectDB();
    const e = await Event.findById(id).lean();
    if (!e) return null;
    
    return {
      id: (e._id as { toString(): string }).toString(),
      title: e.title as string,
      venue: e.venue as string,
      date: e.date as string,
      time: e.time as string,
      category: e.category as string,
      image: e.image as string | undefined,
      description: e.description as string | undefined,
      tags: (e.tags || []) as string[],
    };
  },
  ['event-detail'],
  { tags: ['events'] }
);

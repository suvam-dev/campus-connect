import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { unstable_cache } from "next/cache";

export const getEvents = unstable_cache(
  async (limit: number = 100) => {
    await connectDB();
    const query = Event.find({}).sort({ date: 1 }).limit(limit);
    const events = await query.lean();
    
    return events.map((e: any) => ({
      id: e._id.toString(),
      title: e.title,
      venue: e.venue,
      date: e.date,
      time: e.time,
      category: e.category,
      image: e.image,
      description: e.description,
      tags: e.tags || [],
    }));
  },
  ['events-list'],
  { tags: ['events'] }
);

export const getEventById = unstable_cache(
  async (id: string) => {
    await connectDB();
    const e = await Event.findById(id).lean() as any;
    if (!e) return null;
    
    return {
      id: e._id.toString(),
      title: e.title,
      venue: e.venue,
      date: e.date,
      time: e.time,
      category: e.category,
      image: e.image,
      description: e.description,
      tags: e.tags || [],
    };
  },
  ['event-detail'],
  { tags: ['events'] }
);

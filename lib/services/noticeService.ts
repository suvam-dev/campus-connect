import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { unstable_cache } from "next/cache";
import type { SerializedNotice } from "@/lib/types";

export const getNotices = unstable_cache(
  async (limit: number = 100): Promise<SerializedNotice[]> => {
    await connectDB();
    const query = Notice.find({}).sort({ createdAt: -1 }).limit(limit);
    const notices = await query.lean();
    
    return notices.map((n) => ({
      id: (n._id as { toString(): string }).toString(),
      title: n.title as string,
      description: n.description as string,
      category: n.category as string,
      date: new Date(n.createdAt as string | number | Date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      source: n.source as string,
      iconType: n.iconType as string,
      isUnread: (n.isUnread || false) as boolean,
      tags: (n.tags || []) as string[],
    }));
  },
  ['notices-list'],
  { tags: ['notices'] }
);

export const getNoticeById = unstable_cache(
  async (id: string): Promise<SerializedNotice | null> => {
    await connectDB();
    const n = await Notice.findById(id).lean();
    if (!n) return null;
    
    return {
      id: (n._id as { toString(): string }).toString(),
      title: n.title as string,
      description: n.description as string,
      category: n.category as string,
      date: new Date(n.createdAt as string | number | Date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      source: n.source as string,
      iconType: n.iconType as string,
      isUnread: (n.isUnread || false) as boolean,
      tags: (n.tags || []) as string[],
    };
  },
  ['notice-detail'],
  { tags: ['notices'] }
);

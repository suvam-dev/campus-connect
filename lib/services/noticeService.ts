import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { unstable_cache } from "next/cache";

export const getNotices = unstable_cache(
  async (limit: number = 100) => {
    await connectDB();
    const query = Notice.find({}).sort({ createdAt: -1 }).limit(limit);
    const notices = await query.lean();
    
    return notices.map((n: any) => ({
      id: n._id.toString(),
      title: n.title,
      description: n.description,
      category: n.category,
      date: new Date(n.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      source: n.source,
      iconType: n.iconType,
      isUnread: n.isUnread || false,
    }));
  },
  ['notices-list'],
  { tags: ['notices'] }
);

export const getNoticeById = unstable_cache(
  async (id: string) => {
    await connectDB();
    const n = await Notice.findById(id).lean() as any;
    if (!n) return null;
    
    return {
      id: n._id.toString(),
      title: n.title,
      description: n.description,
      category: n.category,
      date: new Date(n.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      source: n.source,
      iconType: n.iconType,
      isUnread: n.isUnread || false,
    };
  },
  ['notice-detail'],
  { tags: ['notices'] }
);

import { connectDB } from '../../../../lib/mongodb';
import Society from '../../../../models/Society';
import { getCurrentUserFromReq } from '../../../../lib/adminAuth';

export async function GET(req: Request) {
  await connectDB();
  const headers = req.headers;

  // allow unauthenticated read if CLERK_SKIP_AUTH or public
  const user = await getCurrentUserFromReq(headers);

  try {
    if (user && user.role === 'super_admin') {
      const all = await Society.find({}).lean();
      return new Response(JSON.stringify(all), { status: 200 });
    }

    // For non-super users, return societies where user is admin or member
    if (user) {
      const ids = (user.societies || []).map((x: any) => x.toString());
      const list = await Society.find({ $or: [{ _id: { $in: ids } }, { members: user._id }, { admins: user._id }] }).lean();
      return new Response(JSON.stringify(list), { status: 200 });
    }

    // Public read (no user) - return basic society list
    const publicList = await Society.find({}, { name: 1, slug: 1, description: 1 }).lean();
    return new Response(JSON.stringify(publicList), { status: 200 });
  } catch (err: any) {
    return new Response(String(err?.message || err), { status: 500 });
  }
}

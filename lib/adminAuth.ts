import { connectDB } from './mongodb';
import User from '../models/User';
import { checkPermission } from './rbac';
import { getAuth } from '@clerk/nextjs/server';

/**
 * Admin auth helper using Clerk's server SDK.
 * - For local dev, set CLERK_SKIP_AUTH=true to bypass auth (returns seeded super_admin).
 * - In production, uses getAuth(req) to obtain Clerk userId and maps to local User.clerkId.
 */
export async function getCurrentUserFromReq(reqOrHeaders: Request | Headers) {
  await connectDB();

  const skip = process.env.CLERK_SKIP_AUTH === 'true';
  if (skip) {
    const su = await User.findOne({ role: 'super_admin' }).lean();
    if (su) return su;
    return null;
  }

  // If a Request is provided, use Clerk getAuth
  try {
    // getAuth accepts undefined in some versions; pass the Request when available
    const maybeReq = (reqOrHeaders as Request) || undefined;
    const auth = getAuth(maybeReq as any);
    const clerkUserId = auth?.userId || auth?.user_id || null;
    if (clerkUserId) {
      const user = await User.findOne({ clerkId: clerkUserId }).lean();
      return user || null;
    }
  } catch (err) {
    // fall back to header parsing if Request not available or Clerk not configured
  }

  // Finally, if headers were passed, try legacy header
  const headers = reqOrHeaders as Headers;
  if (headers && typeof headers.get === 'function') {
    const clerkId = headers.get('x-clerk-id') || headers.get('x-clerk-user-id');
    if (clerkId) {
      const user = await User.findOne({ clerkId }).lean();
      return user || null;
    }
  }

  return null;
}

export async function requireAdmin(reqOrHeaders: Request | Headers, societyId?: string, permission?: string) {
  const user = await getCurrentUserFromReq(reqOrHeaders);
  if (!user) throw new Error('unauthenticated');
  if (user.role === 'super_admin') return user;
  if (societyId && permission) {
    const ok = await checkPermission(user._id, societyId, permission as any);
    if (!ok) throw new Error('forbidden');
  }
  return user;
}

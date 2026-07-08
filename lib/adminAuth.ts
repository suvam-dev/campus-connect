import { connectDB } from './mongodb';
import User from '../models/User';
import { checkPermission, PermissionName } from './rbac';
import { getAuth } from '@clerk/nextjs/server';
import type { DbUser } from './types';

/**
 * Admin auth helper using Clerk's server SDK.
 * - For local dev, set CLERK_SKIP_AUTH=true to bypass auth (returns seeded super_admin).
 * - In production, uses getAuth(req) to obtain Clerk userId and maps to local User.clerkId.
 */
export async function getCurrentUserFromReq(reqOrHeaders: Request | Headers): Promise<DbUser | null> {
  await connectDB();

  const skip = process.env.CLERK_SKIP_AUTH === 'true' && process.env.NODE_ENV !== 'production';
  if (skip) {
    const su = await User.findOne({ role: 'super_admin' }).lean();
    if (su) {
      return {
        ...su,
        _id: su._id.toString(),
      } as unknown as DbUser;
    }
    return null;
  }

  // If a Request is provided, use Clerk getAuth
  try {
    // getAuth accepts undefined in some versions; pass the Request when available
    const maybeReq = (reqOrHeaders instanceof Request) ? reqOrHeaders : undefined;
    const auth = getAuth(maybeReq as Parameters<typeof getAuth>[0]);
    const clerkUserId = auth?.userId || null;
    if (clerkUserId) {
      const user = await User.findOne({ clerkId: clerkUserId }).lean();
      if (user) {
        return {
          ...user,
          _id: user._id.toString(),
        } as unknown as DbUser;
      }
      return null;
    }
  } catch (err: unknown) {
    // Log instead of silently swallowing — helps debug auth misconfiguration
    console.warn('Clerk getAuth fallback:', err instanceof Error ? err.message : err);
  }

  // Finally, if headers were passed, try legacy header
  const headers = reqOrHeaders as Headers;
  if (headers && typeof headers.get === 'function') {
    const clerkId = headers.get('x-clerk-id') || headers.get('x-clerk-user-id');
    if (clerkId) {
      const user = await User.findOne({ clerkId }).lean();
      if (user) {
        return {
          ...user,
          _id: user._id.toString(),
        } as unknown as DbUser;
      }
      return null;
    }
  }

  return null;
}

export async function requireAdmin(reqOrHeaders: Request | Headers, societyId?: string, permission?: PermissionName): Promise<DbUser> {
  const user = await getCurrentUserFromReq(reqOrHeaders);
  if (!user) throw new Error('unauthenticated');
  if (user.role === 'super_admin') return user;
  if (societyId && permission) {
    const ok = await checkPermission(user._id, societyId, permission);
    if (!ok) throw new Error('forbidden');
  }
  return user;
}

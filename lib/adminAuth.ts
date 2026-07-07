import { connectDB } from './mongodb';
import User from '../models/User';
import { checkPermission } from './rbac';

/**
 * Lightweight admin auth helper.
 * - In production, set up Clerk and the reverse proxy to inject 'x-clerk-id' header or integrate @clerk/nextjs and adapt this helper.
 * - For local dev, set CLERK_SKIP_AUTH=true to bypass auth (not for production).
 */
export async function getCurrentUserFromReq(headers: Headers) {
  await connectDB();

  const skip = process.env.CLERK_SKIP_AUTH === 'true';
  if (skip) {
    // Return a super_admin seeded user if present
    const su = await User.findOne({ role: 'super_admin' }).lean();
    if (su) return su;
    return null;
  }

  // Expect integration to provide a clerk-id header (x-clerk-id)
  const clerkId = headers.get('x-clerk-id') || headers.get('x-clerk-user-id');
  if (!clerkId) return null;

  const user = await User.findOne({ clerkId }).lean();
  return user || null;
}

export async function requireAdmin(headers: Headers, societyId?: string, permission?: string) {
  const user = await getCurrentUserFromReq(headers);
  if (!user) throw new Error('unauthenticated');
  if (user.role === 'super_admin') return user;
  if (societyId && permission) {
    const ok = await checkPermission(user._id, societyId, permission as any);
    if (!ok) throw new Error('forbidden');
  }
  return user;
}

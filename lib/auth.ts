import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "./mongodb";
import User from "../models/User";
import { checkPermission, PermissionName } from "./rbac";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

/**
 * Wraps Clerk's currentUser and fetches the local MongoDB User.
 * This acts as the single source of truth for authenticated user identity.
 */
export async function getCurrentUser() {
  const skip = process.env.CLERK_SKIP_AUTH === 'true' && process.env.NODE_ENV !== 'production';
  
  if (skip) {
    await connectDB();
    const su = await User.findOne({ role: 'super_admin' }).lean();
    if (su) {
      return {
        id: su.clerkId || 'local_admin_id',
        email: su.email,
        name: su.name || 'Super Admin',
        image: su.profileImage,
        dbUser: su
      };
    }
  }

  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new UnauthorizedError();
  }

  await connectDB();
  const email = clerkUser.primaryEmailAddress?.emailAddress;
  
  let dbUser = await User.findOne({ clerkId: clerkUser.id });
  
  if (!dbUser && email) {
    dbUser = await User.findOne({ email });
    if (dbUser) {
      dbUser.clerkId = clerkUser.id;
      await dbUser.save();
    }
  }
  
  if (!dbUser) {
    // First-time sign-in: create a local DB user with the default 'student' role.
    // To promote a user to super_admin, update their role directly in the database.
    dbUser = await User.create({
      clerkId: clerkUser.id,
      email: email,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      profileImage: clerkUser.imageUrl,
      role: 'student',
    });
  }

  return {
    id: clerkUser.id,
    email: email,
    name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
    image: clerkUser.imageUrl,
    dbUser: dbUser.toObject ? dbUser.toObject() : dbUser, // local MongoDB user for RBAC
  };
}

/**
 * Requires a super_admin role, OR optionally a specific society permission.
 */
export async function requireAdmin(societyId?: string, permission?: PermissionName) {
  const user = await getCurrentUser();
  
  if (!user.dbUser) {
    throw new ForbiddenError('No associated database user found.');
  }

  if (user.dbUser.role === 'super_admin') {
    return user;
  }

  if (societyId && permission) {
    const ok = await checkPermission(user.dbUser._id, societyId, permission);
    if (!ok) {
      throw new ForbiddenError(`Missing permission: ${permission}`);
    }
  } else {
    // If no specific society check, they must be super_admin.
    throw new ForbiddenError('Requires super_admin role.');
  }

  return user;
}

/**
 * General role requirement helper.
 */
export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser();
  if (!user.dbUser || !allowedRoles.includes(user.dbUser.role)) {
    throw new ForbiddenError(`Requires one of roles: ${allowedRoles.join(', ')}`);
  }
  return user;
}

import { connectDB } from './mongodb';
import User from '../models/User';

export type ClerkProfile = {
  clerkId?: string;
  email?: string;
  name?: string;
  phone?: string;
  profileImage?: string;
};

export async function upsertClerkUser(profile: ClerkProfile) {
  await connectDB();

  const { clerkId, email, name, phone, profileImage } = profile;

  // Prefer matching by clerkId, fall back to email
  const query: any = {};
  if (clerkId) query.$or = [{ clerkId }, { email }];
  else if (email) query.email = email;

  const update: any = {
    clerkId: clerkId || undefined,
    email,
    name,
    phone,
    profileImage,
    isActive: true,
  };

  // Remove undefined fields to avoid overwriting with undefined
  Object.keys(update).forEach((k) => update[k] === undefined && delete update[k]);

  const opts = { upsert: true, new: true, setDefaultsOnInsert: true };

  const user = await User.findOneAndUpdate(query, { $set: update }, opts);
  return user;
}

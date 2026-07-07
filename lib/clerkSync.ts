import { connectDB } from './mongodb';
import User from '../models/User';
import fs from 'fs';
import path from 'path';
import Invite from '../models/Invite';
import Society from '../models/Society';

export type ClerkProfile = {
  clerkId?: string;
  email?: string;
  name?: string;
  phone?: string;
  profileImage?: string;
};

function safeReadPackageJson() {
  try {
    const p = path.resolve(process.cwd(), 'package.json');
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

export function detectClerkSDK() {
  const pkg = safeReadPackageJson();
  if (!pkg) return { flavor: 'none' };
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const clerkPkgs = Object.keys(deps).filter((k) => k.startsWith('@clerk/') || k.startsWith('clerk-'));
  if (clerkPkgs.length === 0) return { flavor: 'none' };

  // pick the first clerk package and extract major version
  const name = clerkPkgs[0];
  const ver = deps[name];
  const m = (ver || '').match(/\d+/);
  const major = m ? parseInt(m[0], 10) : NaN;
  if (!isNaN(major)) {
    if (major >= 7) return { flavor: 'current', package: name, version: ver };
    if (major >= 5 && major <= 6) return { flavor: 'core2', package: name, version: ver };
  }
  return { flavor: 'unknown', package: name, version: ver };
}

function normalizeClerkPayload(raw: any): ClerkProfile {
  if (!raw) return {};
  const data = raw.data || raw.user || raw.object || raw;

  const clerkId = data.id || data.user_id || data.user?.id;

  // email extraction: many shapes exist
  const email =
    data.email ||
    data.email_address ||
    data.primary_email_address ||
    (data.email_addresses && data.email_addresses[0] && data.email_addresses[0].email_address) ||
    data.user?.email_addresses?.[0]?.email_address ||
    data.user?.primary_email_address ||
    data.user?.primary_email?.email;

  const name =
    data.name ||
    `${data.first_name || ''} ${data.last_name || ''}`.trim() ||
    [data.user?.first_name, data.user?.last_name].filter(Boolean).join(' ') ||
    data.user?.name;

  const profileImage = data.profile_image_url || data.avatar_url || data.user?.profile_image_url || data.user?.image_url;
  const phone = data.phone || data.phone_number || data.user?.phone_number;

  return { clerkId, email, name, phone, profileImage };
}

/**
 * Upsert a local user using Clerk data. Accepts either a normalized ClerkProfile or a raw Clerk webhook payload/object.
 *
 * After creating/updating the user, auto-accept any pending Invite matching the user's email (and not expired).
 * If invite.role === 'society_admin', the user is added to the society admins array and given role 'society_admin'.
 */
export async function upsertClerkUser(profileOrRaw: ClerkProfile | any) {
  await connectDB();

  const profile = (profileOrRaw && (profileOrRaw.clerkId || profileOrRaw.email)) ? profileOrRaw : normalizeClerkPayload(profileOrRaw);

  const { clerkId, email, name, phone, profileImage } = profile as ClerkProfile;

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

  // Auto-accept pending invite (if any)
  try {
    if (email) {
      const now = new Date();
      const invite = await Invite.findOne({ email: email.toLowerCase(), status: 'pending', expiresAt: { $gt: now } });
      if (invite) {
        // Apply invite role
        if (invite.role === 'society_admin') {
          // Add society to user's societies and add to Society.admins
          if (!user.societies) user.societies = [];
          const sid = invite.society;
          if (!user.societies.find((x: any) => x.toString() === sid.toString())) user.societies.push(sid);

          // Update user's role to society_admin if not already elevated
          if (user.role !== 'super_admin') {
            user.role = 'society_admin';
          }

          // Ensure society record has this user in admins
          try {
            const society = await Society.findById(sid);
            if (society) {
              society.admins = society.admins || [];
              if (!society.admins.find((id: any) => id.toString() === user._id.toString())) {
                society.admins.push(user._id);
                await society.save();
              }
            }
          } catch (err) {
            console.warn('Failed to attach user to society admins:', err?.message || err);
          }
        } else if (invite.role === 'student') {
          // Add user to society members
          const sid = invite.society;
          if (!user.societies) user.societies = [];
          if (!user.societies.find((x: any) => x.toString() === sid.toString())) user.societies.push(sid);

          try {
            const society = await Society.findById(sid);
            if (society) {
              society.members = society.members || [];
              if (!society.members.find((id: any) => id.toString() === user._id.toString())) {
                society.members.push(user._id);
                await society.save();
              }
            }
          } catch (err) {
            console.warn('Failed to attach user to society members:', err?.message || err);
          }
        }

        invite.status = 'accepted';
        await invite.save();
        await user.save();
        console.log('Accepted invite for user', email, 'society', invite.society.toString());
      }
    }
  } catch (err) {
    console.warn('Invite processing error:', err?.message || err);
  }

  return user;
}

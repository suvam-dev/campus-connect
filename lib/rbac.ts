import { connectDB } from './mongodb';
import User from '../models/User';
import Society from '../models/Society';
import Permission from '../models/Permission';

export type PermissionName =
  | 'canCreateEvent'
  | 'canEditEvent'
  | 'canDeleteEvent'
  | 'canViewRegistrations'
  | 'canExportCSV'
  | 'canPublishNotice'
  | 'canManageSociety'
  | 'canInviteAdmins';

/**
 * Checks whether a user has a given permission for a society.
 * Rules:
 * - super_admin always allowed
 * - If a Permission doc exists for (user,society) and includes permission -> allowed
 * - If user is in society.admins and has no explicit Permission doc, allow a default admin set (manage/create/edit/view/export/publish/invite)
 */
export async function checkPermission(userId: string, societyId: string, permission: PermissionName) {
  await connectDB();

  const user = await User.findById(userId).lean();
  if (!user) return false;

  if (user.role === 'super_admin') return true;

  // look for explicit permission grant
  const grant = await Permission.findOne({ user: user._id, society: societyId }).lean();
  if (grant && Array.isArray(grant.permissions) && grant.permissions.includes(permission)) return true;

  // fallback: if user is a society admin (member of society.admins), grant an opinionated default admin set
  try {
    const society = await Society.findById(societyId).lean();
    if (!society) return false;
    const isAdmin = Array.isArray(society.admins) && society.admins.map(String).includes(String(user._id));
    if (isAdmin) {
      const defaultAdminPerms: PermissionName[] = [
        'canCreateEvent',
        'canEditEvent',
        'canDeleteEvent',
        'canViewRegistrations',
        'canExportCSV',
        'canPublishNotice',
        'canInviteAdmins',
        'canManageSociety',
      ];
      return defaultAdminPerms.includes(permission);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('RBAC fallback check failed', message);
  }

  return false;
}

export async function requirePermission(userId: string, societyId: string, permission: PermissionName) {
  const ok = await checkPermission(userId, societyId, permission);
  if (!ok) throw new Error('forbidden');
  return true;
}

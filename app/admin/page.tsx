import React from 'react';
import { headers } from 'next/headers';
import { connectDB } from '../../lib/mongodb';
import Society from '../../models/Society';
import { getCurrentUserFromReq } from '../../lib/adminAuth';

type Props = {};

export default async function AdminPage(props: Props) {
  await connectDB();
  const hdrs = headers();
  const user: any = await getCurrentUserFromReq(hdrs);

  let societies: any[] = [];
  if (user && user.role === 'super_admin') {
    societies = await Society.find({}).lean();
  } else if (user) {
    const ids = (user.societies || []).map((x: any) => x.toString());
    societies = await Society.find({ $or: [{ _id: { $in: ids } }, { members: user._id }, { admins: user._id }] }).lean();
  } else {
    societies = await Society.find({}, { name: 1, slug: 1, description: 1 }).lean();
  }

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium">My Societies</h2>
            <p className="text-sm text-slate-500">Quick access to societies you manage</p>

            {(!societies || societies.length === 0) && (
              <div className="mt-4 text-sm text-slate-400">{user ? 'No societies found.' : 'Public list'}</div>
            )}

            <ul className="mt-4 space-y-3">
              {societies.map((s) => (
                <li key={s._id} className="p-3 border rounded hover:shadow">
                  <a href={`/admin/societies/${s._id}`} className="block">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-sm text-slate-500">{s.description}</div>
                      </div>
                      <div className="text-sm text-slate-400">{s.slug}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium">Quick Actions</h3>
            <div className="mt-3 space-y-2">
              <a className="block px-3 py-2 bg-slate-50 rounded hover:bg-slate-100" href="/admin/events/new">
                Create Event
              </a>
              <a className="block px-3 py-2 bg-slate-50 rounded hover:bg-slate-100" href="/admin/invites/new">
                Invite Admin
              </a>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-medium">Current User</h4>
              {user ? (
                <div className="text-sm text-slate-600">
                  <div className="font-semibold">{user.name || user.email}</div>
                  <div className="text-xs text-slate-400">{user.email}</div>
                  <div className="text-xs text-slate-400">Role: {user.role}</div>
                </div>
              ) : (
                <div className="text-sm text-slate-400">Not signed in</div>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

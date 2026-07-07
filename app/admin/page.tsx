import React, { useEffect, useState } from 'react';

type Society = { _id: string; name: string; slug: string; description?: string };

export default function AdminPage() {
  const [societies, setSocieties] = useState<Society[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/societies')
      .then((r) => r.json())
      .then(setSocieties)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium">My Societies</h2>
            <p className="text-sm text-slate-500">Quick access to societies you manage</p>

            {error && <div className="text-red-600">{error}</div>}
            {!societies && !error && <div className="mt-4 text-sm text-slate-400">Loading…</div>}
            {societies?.length === 0 && <div className="mt-4 text-sm text-slate-400">No societies found.</div>}

            <ul className="mt-4 space-y-3">
              {societies?.map((s) => (
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
        </aside>
      </section>
    </div>
  );
}

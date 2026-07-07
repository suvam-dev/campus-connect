import React, { useEffect, useState } from 'react';

export default function SocietyAdminPage({ params }: { params: { id: string } }) {
  const [society, setSociety] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/societies')
      .then((r) => r.json())
      .then((list) => {
        const s = list.find((x: any) => x._id === params.id);
        setSociety(s || null);
      })
      .catch((e) => setError(String(e)));
  }, [params.id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!society) return <div className="text-slate-400">Loading…</div>;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded p-4 shadow">
        <h2 className="text-xl font-semibold">{society.name}</h2>
        <p className="text-sm text-slate-500">{society.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded p-4 shadow">Events list (TODO)</div>
        <aside className="bg-white rounded p-4 shadow">Members & Settings (TODO)</aside>
      </div>
    </div>
  );
}

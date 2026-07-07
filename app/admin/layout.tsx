import React from 'react';

export const metadata = {
  title: 'Admin - Campus Connect',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-slate-900">
        <div className="max-w-7xl mx-auto p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Manage societies, events, registrations and invites</p>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

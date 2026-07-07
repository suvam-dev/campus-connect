import React from 'react';
import { AdminLayoutShell } from '@/components/admin/AdminLayoutShell';

export const metadata = {
  title: 'Admin - Campus Connect',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { label: "Admin Dashboard", href: "/admin" },
  ];

  return (
    <AdminLayoutShell breadcrumbs={breadcrumbs}>
      {children}
    </AdminLayoutShell>
  );
}

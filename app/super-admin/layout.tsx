import React from 'react';
import { AdminLayoutShell } from '@/components/admin/AdminLayoutShell';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'Super Admin - Campus Connect',
};

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || user.dbUser.role !== 'super_admin') {
    redirect('/unauthorized'); // Redirect if not super_admin
  }

  const breadcrumbs = [
    { label: "Super Admin", href: "/super-admin" },
  ];

  return (
    <AdminLayoutShell isSuperAdmin={true} breadcrumbs={breadcrumbs}>
      {children}
    </AdminLayoutShell>
  );
}

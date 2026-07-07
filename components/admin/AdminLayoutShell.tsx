"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutShellProps {
  children: React.ReactNode;
  isSuperAdmin?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AdminLayoutShell({ children, isSuperAdmin = false, breadcrumbs = [] }: AdminLayoutShellProps) {
  return (
    <SidebarProvider>
      <AdminSidebar isSuperAdmin={isSuperAdmin} />
      <div className="flex flex-col flex-1 w-full min-h-screen">
        <AdminHeader breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-4 md:p-6 bg-slate-50 dark:bg-slate-900/50">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

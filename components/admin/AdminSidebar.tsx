"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Building2, CalendarDays, Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar({ isSuperAdmin = false }: { isSuperAdmin?: boolean }) {
  const pathname = usePathname();

  const superAdminItems = [
    { title: "Dashboard", url: "/super-admin", icon: LayoutDashboard },
    { title: "Users", url: "/super-admin/users", icon: Users },
    { title: "Societies", url: "/super-admin/societies", icon: Building2 },
    { title: "Settings", url: "/super-admin/settings", icon: Settings },
  ];

  const adminItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "My Societies", url: "/admin/societies", icon: Building2 },
    { title: "Events", url: "/admin/events", icon: CalendarDays },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const items = isSuperAdmin ? superAdminItems : adminItems;

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex h-16 items-center justify-center border-b border-sidebar-border">
        <div className="font-semibold text-lg flex items-center gap-2 px-2 w-full">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="size-4" />
          </div>
          <span className="truncate">{isSuperAdmin ? "Super Admin" : "Society Admin"}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || (pathname.startsWith(item.url + '/') && item.url !== '/admin' && item.url !== '/super-admin');
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton render={<Link href={item.url} />} isActive={isActive} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/" />} tooltip="Return to App">
              <ArrowLeft />
              <span>Return to App</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

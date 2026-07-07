import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";

interface AdminHeaderProps {
  breadcrumbs?: { label: string; href?: string }[];
}

export function AdminHeader({ breadcrumbs = [] }: AdminHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between bg-white dark:bg-slate-950">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="hidden md:block">
                    {!isLast && crumb.href ? (
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        {/* We can add search, notifications here in the future */}
        <UserButton />
      </div>
    </header>
  );
}

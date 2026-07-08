import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Society from '@/models/Society';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2, CalendarDays, Users } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default async function AdminPage() {
  await connectDB();
  
  let user: any = null;
  try {
    const authData = await getCurrentUser();
    if (authData) user = authData.dbUser;
  } catch (err: any) {
    // Not signed in
  }

  let societies: any[] = [];
  if (user && user.role === 'super_admin') {
    societies = await Society.find({}).lean();
  } else if (user) {
    const ids = (user.societies || []).map((x: any) => x.toString());
    societies = await Society.find({ $or: [{ _id: { $in: ids } }, { members: user._id }, { admins: user._id }] }).lean();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Society Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your assigned societies and events.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Societies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{societies.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Across all managed societies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>My Societies</CardTitle>
            <CardDescription>Quick access to your managed organizations.</CardDescription>
          </CardHeader>
          <CardContent>
            {!societies || societies.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                  <p>No societies found.</p>
               </div>
            ) : (
              <div className="space-y-4">
                {societies.map((s) => (
                  <div key={s._id.toString()} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md border bg-slate-50 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{s.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">{s.description || s.slug}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/admin/societies/${s._id.toString()}`} 
                      className={buttonVariants({ variant: "secondary", size: "sm" })}
                    >
                      Manage
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link 
              href="/admin/events/new" 
              className={buttonVariants({ variant: "outline", className: "w-full justify-start" })}
            >
              <CalendarDays className="mr-2 h-4 w-4" /> Create New Event
            </Link>
            <Link 
              href="/admin/invites/new" 
              className={buttonVariants({ variant: "outline", className: "w-full justify-start" })}
            >
              <Users className="mr-2 h-4 w-4" /> Invite Admin or Member
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

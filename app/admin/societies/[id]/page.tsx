import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Society from '@/models/Society';
import Event from '@/models/Event';
import User from '@/models/User';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function SocietyAdminPage({ params }: { params: { id: string } }) {
  await connectDB();
  
  const society = await Society.findById(params.id).lean();
  if (!society) return notFound();

  // Fetch related events and members
  const events = await Event.find({ societyId: society._id }).sort({ date: -1 }).lean();
  const members = await User.find({ _id: { $in: society.members || [] } }).lean();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{society.name}</h1>
          <p className="text-muted-foreground">{society.description || "Manage society details, events, and members."}</p>
        </div>
        <Button asChild>
          <Link href={`/admin/events/new?societyId=${society._id.toString()}`}>
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(society.admins || []).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>Recent and upcoming events for this society.</CardDescription>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground">
                No events found.
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((e: any) => (
                  <div key={e._id.toString()} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-semibold">{e.title}</h4>
                      <p className="text-sm text-muted-foreground">{new Date(e.date).toLocaleDateString()} @ {e.venue}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/events/${e._id.toString()}/edit`}>Manage</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>People in this society.</CardDescription>
          </CardHeader>
          <CardContent>
            {members.length === 0 ? (
               <div className="text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground">
                 No members found.
               </div>
            ) : (
              <div className="space-y-4">
                {members.slice(0, 5).map((m: any) => (
                  <div key={m._id.toString()} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{m.name || m.email}</h4>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                    </div>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                ))}
                {members.length > 5 && (
                  <Button variant="link" className="w-full">View all {members.length} members</Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

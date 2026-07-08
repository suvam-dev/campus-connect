import React from 'react';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { DataTable } from '@/components/admin/DataTable';
import { columns, UserRow } from './columns';

export default async function UsersPage() {
  await connectDB();
  
  interface MongooseUserLean {
    _id: { toString(): string };
    name?: string;
    email: string;
    role: 'student' | 'society_admin' | 'super_admin';
    createdAt?: Date;
  }

  // Fetch users and map to clean object (lean)
  const users = (await User.find({}).sort({ createdAt: -1 }).lean()) as unknown as MongooseUserLean[];
  
  const formattedUsers: UserRow[] = users.map((u) => ({
    _id: u._id.toString(),
    name: u.name || "Unknown",
    email: u.email,
    role: u.role,
    createdAt: u.createdAt ? u.createdAt.toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage platform users and roles.</p>
      </div>

      <DataTable columns={columns} data={formattedUsers} searchKey="email" />
    </div>
  );
}

import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Society from '@/models/Society';
import { DataTable } from '@/components/admin/DataTable';
import { columns, SocietyRow } from './columns';
import { buttonVariants } from '@/components/ui/button-variants';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function SocietiesPage() {
  await connectDB();
  
  interface MongooseSocietyLean {
    _id: { toString(): string };
    name: string;
    slug: string;
    members?: unknown[];
    admins?: unknown[];
    createdAt?: Date;
  }

  const societies = (await Society.find({}).sort({ createdAt: -1 }).lean()) as unknown as MongooseSocietyLean[];
  
  const formattedSocieties: SocietyRow[] = societies.map((s) => ({
    _id: s._id.toString(),
    name: s.name,
    slug: s.slug,
    membersCount: s.members ? s.members.length : 0,
    adminsCount: s.admins ? s.admins.length : 0,
    createdAt: s.createdAt ? s.createdAt.toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Societies</h1>
          <p className="text-muted-foreground">Manage all societies on the platform.</p>
        </div>
        <Link href="/super-admin/societies/new" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" /> Add Society
        </Link>
      </div>

      <DataTable columns={columns} data={formattedSocieties} searchKey="name" />
    </div>
  );
}

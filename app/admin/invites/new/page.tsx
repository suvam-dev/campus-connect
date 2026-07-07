import React from "react";
import { sendInvite } from "@/app/actions/inviteActions";
import { connectDB } from "@/lib/mongodb";
import Society from "@/models/Society";
import { getCurrentUser } from "@/lib/auth";

export default async function NewInvitePage() {
  await connectDB();
  
  let user: any = null;
  try {
    const authResult = await getCurrentUser();
    user = authResult.dbUser;
  } catch (err) {
    // Handle unauthenticated
  }

  let societies: any[] = [];
  if (user && user.role === 'super_admin') {
    societies = await Society.find({}).lean();
  } else if (user) {
    const ids = (user.societies || []).map((x: any) => x.toString());
    societies = await Society.find({ $or: [{ _id: { $in: ids } }, { members: user._id }, { admins: user._id }] }).lean();
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Invite Admin</h1>
      
      <form action={sendInvite} className="bg-white shadow-sm rounded-lg p-6 space-y-4">
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
          <input type="email" id="email" name="email" required placeholder="user@example.com"
                 className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
        </div>

        <div>
          <label htmlFor="society" className="block text-sm font-medium text-slate-700">Society</label>
          <select id="society" name="society" required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
            {societies.map((s) => (
              <option key={s._id.toString()} value={s._id.toString()}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
          <select id="role" name="role" required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
            <option value="society_admin">Society Admin</option>
          </select>
        </div>

        <div className="pt-4">
          <button type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Send Invite
          </button>
        </div>

      </form>
    </div>
  );
}

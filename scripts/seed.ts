import 'dotenv/config';
import { connectDB } from '../lib/mongodb';
import Society from '../models/Society';
import User from '../models/User';
import Event from '../models/Event';
import Notice from '../models/Notice';
import Registration from '../models/Registration';
import Invite from '../models/Invite';

async function upsertSociety(slug: string, data: any) {
  return Society.findOneAndUpdate({ slug }, { $set: data }, { upsert: true, new: true });
}

async function upsertUser(email: string, data: any) {
  return User.findOneAndUpdate({ email }, { $set: data }, { upsert: true, new: true });
}

async function main() {
  await connectDB();

  console.log('Seeding societies...');

  const ieee = await upsertSociety('ieee', {
    name: 'IEEE',
    description: 'Institute of Electrical and Electronics Engineers',
    slug: 'ieee',
  });

  const gdg = await upsertSociety('gdg', {
    name: 'GDG',
    description: 'Google Developer Group',
    slug: 'gdg',
  });

  const photo = await upsertSociety('photography-club', {
    name: 'Photography Club',
    description: 'Campus photography society',
    slug: 'photography-club',
  });

  console.log('Seeding users...');

  const superAdmin = await upsertUser('super@campus.local', {
    clerkId: 'superadmin-placeholder',
    name: 'Super Admin',
    email: 'super@campus.local',
    role: 'super_admin',
    isActive: true,
  });

  const alice = await upsertUser('alice@student.edu', {
    clerkId: 'alice-clerk-placeholder',
    name: 'Alice Student',
    email: 'alice@student.edu',
    role: 'student',
    year: '2',
    department: 'CSE',
  });

  const bob = await upsertUser('bob@ieee.org', {
    clerkId: 'bob-clerk-placeholder',
    name: 'Bob SocietyAdmin',
    email: 'bob@ieee.org',
    role: 'society_admin',
    year: '3',
    department: 'ECE',
  });

  // Attach admins/members
  ieee.admins = ieee.admins || [];
  if (!ieee.admins.find((id: any) => id.toString() === (bob._id as any).toString())) ieee.admins.push(bob._id);
  if (!ieee.members) ieee.members = [];
  if (!ieee.members.find((id: any) => id.toString() === (alice._id as any).toString())) ieee.members.push(alice._id);
  await ieee.save();

  // Create a sample event using existing Event model
  console.log('Seeding an event...');
  const sampleEvent = await Event.findOneAndUpdate(
    { title: 'Intro to Robotics' },
    {
      $setOnInsert: {
        title: 'Intro to Robotics',
        venue: 'Auditorium',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        category: 'Workshop',
        tags: ['robotics', 'workshop'],
        image: '',
        description: 'Hands-on robotics workshop for beginners',
      },
    },
    { upsert: true, new: true }
  );

  // Create a registration (if not exists)
  try {
    await Registration.create({ user: alice._id, event: sampleEvent._id });
  } catch (err: any) {
    if (err.code === 11000) {
      console.log('Registration already exists');
    } else {
      console.warn('Registration error:', err.message || err);
    }
  }

  // Seed a notice
  await Notice.findOneAndUpdate(
    { title: 'Welcome to Campus Connect' },
    {
      $setOnInsert: {
        title: 'Welcome to Campus Connect',
        category: 'General',
        date: new Date().toISOString().split('T')[0],
        description: 'Platform is live. Register for events using Clerk sign-in.',
        source: 'Admin',
      },
    },
    { upsert: true }
  );

  // Seed an invite example
  const token = `invite_${Date.now().toString(36)}`;
  await Invite.findOneAndUpdate(
    { email: 'newadmin@ieee.org', society: ieee._id },
    {
      $set: {
        email: 'newadmin@ieee.org',
        society: ieee._id,
        role: 'society_admin',
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        invitedBy: superAdmin._id,
      },
    },
    { upsert: true, new: true }
  );

  // Create an example Permission grant for Bob (society admin)
  const Permission = require('../models/Permission').default;
  try {
    await Permission.findOneAndUpdate(
      { user: bob._id, society: ieee._id },
      {
        $set: {
          user: bob._id,
          society: ieee._id,
          permissions: ['canCreateEvent', 'canEditEvent', 'canViewRegistrations', 'canExportCSV', 'canInviteAdmins'],
          createdBy: superAdmin._id,
        },
      },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.warn('Failed to create permission grant', err?.message || err);
  }

  console.log('Seeding complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});

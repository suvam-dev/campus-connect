Seed script

Run instructions:

1. Ensure MONGODB_URI is set in your environment (or in a .env file at project root).

2. Run with npx (no permanent dev dependency required):

   npx ts-node --transpile-only scripts/seed.ts

Notes:
- The script uses the project's lib/connectDB helper (lib/mongodb.ts).
- It upserts societies, users, a sample event, a notice, a sample registration, and an invite. It will not delete existing data.
- Replace placeholder clerkId values with real Clerk IDs when syncing real users.

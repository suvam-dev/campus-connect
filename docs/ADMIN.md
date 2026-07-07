Admin API & Frontend

Quick start

1. Environment
   - Set MONGODB_URI
   - Option A (recommended): Install Clerk and configure your Next.js app with @clerk/nextjs. Ensure requests to server include the Clerk user (server-side) or set up your proxy to include 'x-clerk-id' header.
   - Option B (local dev): Set CLERK_SKIP_AUTH=true to bypass auth and use the seeded super_admin user.

2. Routes
   - GET /api/admin/societies - lists societies (scoped)
   - POST /api/admin/events - create event (body must include society)
   - GET /api/admin/registrations?eventId=... - list registrations
   - POST /api/admin/invites - invite a user (body: { email, society, role })

3. Frontend
   - /admin - dashboard
   - /admin/societies/[id] - society admin page (stub)

4. Security
   - By default the helper expects a header 'x-clerk-id' identifying Clerk user id. For production, integrate Clerk SDK and adapt getCurrentUserFromReq in lib/adminAuth.ts to extract the authenticated user server-side.

5. Seed
   - scripts/seed.ts creates a super_admin and sample society; run it once.

Contact
- Ask the dev to help wire Clerk middleware (@clerk/nextjs) into Next.js App Router for fully automatic server-side auth.

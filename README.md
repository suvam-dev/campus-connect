# Campus Connect

> A modern campus portal for IIT Kharagpur — built for students, managed by societies.

Browse events, read notices, register for activities, and manage society content through a role-based admin dashboard. Built with Next.js 16 App Router, Clerk auth, MongoDB, and Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [Roles & Permissions](#roles--permissions)
- [Authentication & Auth Flow](#authentication--auth-flow)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Admin Dashboard](#admin-dashboard)
- [Component Architecture](#component-architecture)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Known Issues & Gotchas](#known-issues--gotchas)

---

## Features

### Student-facing
| Feature | Description |
|---|---|
| Home feed | Personalized greeting, hero carousel, "Important Today" highlights, upcoming events, quick access links |
| Events | Browse, search, and filter events by category; list/grid toggle; one-click registration |
| Notices | Read official announcements posted by societies |
| Profile | Set roll number, hall, department, year; view your registrations |
| Bookmarks | Save events and notices for later |
| Onboarding | First-time setup flow after sign-up to collect campus profile data |

### Society Admin
| Feature | Description |
|---|---|
| Event management | Create, edit, publish, draft, and delete events with rich-text descriptions and image uploads |
| Notice management | Post and manage official notices |
| Registrations | View and manage who registered for each event |
| Attendance | Scan QR codes at the door to mark attendance |
| Invite system | Invite other users to co-admin a society |

### Super Admin
| Feature | Description |
|---|---|
| User management | View all users, change roles, activate/deactivate accounts |
| Society management | Create societies, assign admins, manage membership |
| Platform settings | Platform-wide configuration |

---

## Tech Stack

| Layer | Package | Version |
|---|---|---|
| Framework | `next` | 16.2.10 |
| Language | TypeScript | ^5 |
| UI primitives | `shadcn/ui` (base-nova style) | — |
| Styling | Tailwind CSS v4, `tw-animate-css` | ^4 |
| Animation | `framer-motion`, `motion` | ^12 |
| Icons | `lucide-react` | ^1.23 |
| Auth | `@clerk/nextjs` | ^7.5 |
| Database | MongoDB via `mongoose` | ^9.7 |
| Rich text | `@tiptap/react` + extensions | ^3.27 |
| Forms | `react-hook-form` + `zod` | ^7 / ^4 |
| Tables | `@tanstack/react-table` | ^8.21 |
| Image upload | `next-cloudinary` | ^6.17 |
| Carousel | `embla-carousel-react` | ^8.6 |
| QR code | `qrcode.react`, `@yudiel/react-qr-scanner` | — |
| Toast | `sonner` | ^2 |
| Command palette | `cmdk` | ^1 |
| Data fetching | `swr` | ^2.4 |
| Fonts | Geist (via `next/font/google`) | — |

---

## Project Structure

```
campus-connect/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout — ClerkProvider, ThemeProvider, Toaster
│   ├── page.tsx                    # Home page (Server Component)
│   ├── globals.css                 # Global styles, Tailwind base, CSS variables
│   │
│   ├── events/
│   │   ├── page.tsx                # Server shell — fetches events, renders EventsClient
│   │   ├── EventsClient.tsx        # Client Component — filter/search/view-toggle UI
│   │   └── [id]/
│   │       └── page.tsx            # Event detail page
│   │
│   ├── notices/
│   │   ├── page.tsx
│   │   ├── NoticesClient.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── profile/
│   │   ├── page.tsx
│   │   └── ProfileClient.tsx       # Registration history, profile edit form
│   │
│   ├── onboarding/
│   │   ├── page.tsx
│   │   └── OnboardingClient.tsx    # Multi-step campus profile form
│   │
│   ├── bookmarks/
│   │   └── page.tsx
│   │
│   ├── sign-in/[[...sign-in]]/
│   │   └── page.tsx                # Clerk-hosted sign-in component
│   ├── sign-up/[[...sign-up]]/
│   │   └── page.tsx
│   │
│   ├── admin/                      # Society admin dashboard
│   │   ├── layout.tsx              # Admin shell with sidebar
│   │   ├── page.tsx                # Dashboard overview
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── events/                 # Event CRUD
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── invites/
│   │   │   └── page.tsx
│   │   └── societies/
│   │       └── page.tsx
│   │
│   ├── super-admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── users/page.tsx
│   │   └── societies/page.tsx
│   │
│   ├── actions/                    # Next.js Server Actions
│   │   ├── eventActions.ts         # createEvent, updateEvent, deleteEvent, publishEvent
│   │   ├── profileActions.ts       # updateProfile, completeOnboarding
│   │   ├── registrationActions.ts  # registerForEvent, cancelRegistration
│   │   ├── attendanceActions.ts    # markAttendance
│   │   └── inviteActions.ts        # sendInvite, acceptInvite
│   │
│   └── api/                        # Route Handlers (REST)
│       ├── events/
│       │   ├── route.ts            # GET (list), POST (create)
│       │   └── [id]/route.ts       # GET, PATCH, DELETE
│       ├── notices/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── admin/
│       │   ├── events/route.ts
│       │   ├── registrations/route.ts
│       │   └── societies/route.ts
│       ├── clerk/
│       │   └── webhook/route.ts    # Clerk user sync webhook
│       └── seed/
│           └── route.ts            # Dev-only database seeder
│
├── components/
│   ├── ui/                         # shadcn/ui base primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── table.tsx
│   │   └── ...
│   │
│   ├── shared/                     # Reusable layout/utility components
│   │   ├── index.ts                # Barrel exports
│   │   ├── CardGrid.tsx            # Responsive grid wrapper
│   │   ├── ListLayout.tsx          # Sidebar + main content layout
│   │   ├── FilterBar.tsx           # Category/search filter strip
│   │   ├── EmptyState.tsx          # Empty list placeholder
│   │   ├── PageHeader.tsx          # Page title + breadcrumb
│   │   ├── RegisterButton.tsx      # Event registration CTA
│   │   ├── RichTextEditor.tsx      # Tiptap editor wrapper
│   │   ├── RichTextRenderer.tsx    # Renders Tiptap JSON
│   │   └── ImageUpload.tsx         # Cloudinary upload widget
│   │
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── AdminLayoutShell.tsx
│   │   └── DataTable.tsx           # TanStack Table with sort/filter/pagination
│   │
│   ├── layouts/
│   │   └── PageLayout.tsx          # Public page shell with Header/Footer
│   │
│   ├── blocks/
│   │   ├── events-swipe/           # Swipeable event card group
│   │   └── animated-cards-stack.tsx
│   │
│   ├── EventCard.tsx               # Event summary card (grid + compact variants)
│   ├── NoticeCard.tsx              # Notice summary card
│   ├── HeroCarousel.tsx            # Auto-playing hero banner
│   ├── ImportantTodayCard.tsx      # Highlight card for the home feed
│   ├── QuickLinkCard.tsx           # Quick-access link tile
│   ├── Header.tsx                  # Top nav with auth state
│   ├── Footer.tsx
│   └── ThemeProvider.tsx           # next-themes wrapper
│
├── lib/
│   ├── utils.ts                    # cn(), extractPlainText()
│   ├── mongodb.ts                  # Mongoose connection singleton
│   ├── auth.ts                     # Server-side auth helpers (getCurrentUser, etc.)
│   ├── adminAuth.ts                # Admin route guard helpers
│   ├── rbac.ts                     # checkPermission(), requirePermission()
│   ├── clerkSync.ts                # Upsert Clerk user → MongoDB User
│   ├── verifyClerkWebhook.ts       # Svix webhook signature verification
│   └── services/
│       ├── eventService.ts         # getEvents(), getEvent(), ...
│       └── noticeService.ts
│
├── models/                         # Mongoose schemas
│   ├── User.ts
│   ├── Event.ts
│   ├── Notice.ts
│   ├── Society.ts
│   ├── Registration.ts
│   ├── Invite.ts
│   └── Permission.ts
│
├── hooks/
│   └── use-mobile.ts
│
├── scripts/
│   └── seed.ts                     # Populates DB with sample data
│
├── proxy.ts                        # Clerk middleware — route protection
├── next.config.ts
├── tailwind.config.ts              # (Tailwind v4 uses CSS config in globals.css)
├── tsconfig.json
└── components.json                 # shadcn/ui config
```

---

## Data Models

### User
```ts
{
  clerkId: string;          // synced from Clerk on sign-in
  name: string;
  email: string;            // unique, indexed
  phone?: string;
  rollNumber?: string;      // e.g. "22CS10001"
  hall?: string;            // residential hall
  department?: string;
  year?: string;            // "1st", "2nd", ...
  profileImage?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  collegeEmail?: string;
  profileCompleted: boolean;
  role: 'student' | 'society_admin' | 'super_admin';
  societies: Society[];     // refs
  isActive: boolean;
}
```

### Event
```ts
{
  title: string;
  venue: string;
  date: string;             // "YYYY-MM-DD"
  time: string;             // "HH:MM"
  category: string;
  tags: string[];
  image?: string;           // Cloudinary URL
  description?: string;     // Tiptap JSON string
  status: 'draft' | 'published' | 'cancelled';
  capacity: number;         // 0 = unlimited
  registrationDeadline?: Date;
}
```

### Notice
```ts
{
  title: string;
  content: string;          // Tiptap JSON string
  category: string;
  society: Society;         // ref
  author: User;             // ref
  isPinned: boolean;
  status: 'draft' | 'published';
}
```

### Society
```ts
{
  name: string;
  description?: string;
  logo?: string;
  slug: string;             // unique, used in URLs
  admins: User[];           // refs
  members: User[];
  createdBy: User;
}
```

### Registration
```ts
{
  user: User;               // ref
  event: Event;             // ref
  status: 'registered' | 'attended' | 'cancelled';
  registeredAt: Date;
}
```

### Permission
```ts
{
  user: User;               // ref
  society: Society;         // ref
  permissions: PermissionName[];
}

type PermissionName =
  | 'canCreateEvent'   | 'canEditEvent'      | 'canDeleteEvent'
  | 'canViewRegistrations' | 'canExportCSV'
  | 'canPublishNotice' | 'canManageSociety'  | 'canInviteAdmins';
```

### Invite
```ts
{
  email: string;
  society: Society;         // ref
  invitedBy: User;          // ref
  status: 'pending' | 'accepted' | 'expired';
  token: string;            // UUID
  expiresAt: Date;
}
```

---

## Roles & Permissions

| Role | Access |
|---|---|
| `student` | Public pages, own profile, register for events, bookmarks |
| `society_admin` | All of the above + admin panel for their society (events, notices, registrations, invites) |
| `super_admin` | Full platform access — manage all users, societies, and content |

### How permissions work

Permissions are checked server-side via `lib/rbac.ts`:

1. If the user is `super_admin` → always allowed.
2. If a `Permission` document exists for `(user, society)` and includes the requested permission → allowed.
3. Fallback: if the user is in `society.admins` and no `Permission` doc exists, they receive a default full admin set automatically.

```ts
// Example usage in a Server Action
await requirePermission(userId, societyId, 'canCreateEvent');
```

---

## Authentication & Auth Flow

Auth is handled by [Clerk](https://clerk.com). Clerk manages sessions, sign-in/sign-up UI, OAuth, and JWT issuance.

### Route protection

`proxy.ts` (the Clerk middleware) runs on every request. It protects all routes **except**:

| Public routes |
|---|
| `/` |
| `/events/**` |
| `/notices/**` |
| `/sign-in/**` |
| `/sign-up/**` |
| `/api/webhooks/**` |

### User sync

When a user signs up or updates their Clerk profile, Clerk fires a webhook to `/api/clerk/webhook`. The handler uses `lib/clerkSync.ts` to upsert the Clerk user into the MongoDB `User` collection. This keeps your DB in sync without polling.

### Onboarding

After the first sign-in, users who have not completed their profile (`profileCompleted: false`) are redirected to `/onboarding` to fill in:

- Roll number
- Department
- Hall of residence
- Year of study
- Gender (optional)
- College email (optional)

Once submitted, `profileCompleted` is set to `true` and they proceed to the app.

### Local development note

Use **development Clerk keys** (`pk_test_` / `sk_test_`) locally. Production keys (`pk_live_`) point to a custom Clerk domain (e.g. `clerk.yourdomain.com`) that won't resolve to `localhost`, causing `Failed to load Clerk JS` errors in the browser.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database — [MongoDB Atlas](https://cloud.mongodb.com) free tier works fine
- A [Clerk](https://clerk.com) account
- A [Cloudinary](https://cloudinary.com) account (optional — only needed for image uploads)

### 1. Clone and install

```bash
git clone <repo-url>
cd campus-connect
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` — see [Environment Variables](#environment-variables) below for details.

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The first time you visit, you'll be prompted to sign up via Clerk and then complete the onboarding form.

### 4. Seed sample data (optional)

```bash
npx ts-node scripts/seed.ts
```

This populates the database with sample events, notices, and a society so you have something to look at immediately.

### 5. Set up the Clerk webhook (optional for local dev)

To test the user-sync webhook locally, use a tunnel tool like [ngrok](https://ngrok.com):

```bash
ngrok http 3000
```

Then register the webhook in the Clerk dashboard:

```
POST https://<your-ngrok-url>/api/clerk/webhook
```

Events to listen for: `user.created`, `user.updated`.

Copy the **Signing Secret** to `CLERK_WEBHOOK_SECRET` in `.env.local`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | Full MongoDB connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key (`pk_test_...` for dev) |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key (`sk_test_...` for dev) |
| `CLERK_WEBHOOK_SECRET` | ✅ | Svix webhook signing secret from Clerk dashboard |
| `NEXT_PUBLIC_APP_URL` | ✅ | Base URL — `http://localhost:3000` in dev |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | ✅ | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | ✅ | `/sign-up` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | ✅ | `/` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | ✅ | `/` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ☑️ optional | Your Cloudinary cloud name |
| `CLOUDINARY_URL` | ☑️ optional | Full Cloudinary URL with API key/secret |

```env
# .env.local

MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/campus-connect"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."

NEXT_PUBLIC_APP_URL="http://localhost:3000"

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_URL="cloudinary://api_key:api_secret@your_cloud_name"
```

---

## Available Scripts

```bash
npm run dev       # Development server with Turbopack HMR
npm run build     # Production build
npm run start     # Serve the production build
npm run lint      # ESLint
```

---

## API Reference

All routes are under `/api`. Protected routes require a valid Clerk session cookie or Bearer token.

### Events

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/events` | Public | List events. Query: `?limit=`, `?page=`, `?category=`, `?search=`, `?status=` |
| `POST` | `/api/events` | Admin | Create a new event |
| `GET` | `/api/events/:id` | Public | Get a single event by ID |
| `PATCH` | `/api/events/:id` | Admin | Update event fields |
| `DELETE` | `/api/events/:id` | Admin | Delete an event |

### Notices

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/notices` | Public | List notices. Query: `?limit=`, `?page=`, `?category=` |
| `POST` | `/api/notices` | Admin | Create a notice |
| `GET` | `/api/notices/:id` | Public | Get a single notice |
| `PATCH` | `/api/notices/:id` | Admin | Update a notice |
| `DELETE` | `/api/notices/:id` | Admin | Delete a notice |

### Admin

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/events` | Admin | List events for the admin's society |
| `GET` | `/api/admin/registrations` | Admin | List registrations |
| `GET` | `/api/admin/societies` | Super Admin | List all societies |

### Webhooks & Utilities

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/clerk/webhook` | Clerk signature | Clerk user sync |
| `GET` | `/api/seed` | Dev only | Populate DB with sample data |

---

## Admin Dashboard

The admin area lives under `/admin`. Access is restricted to users with `society_admin` or `super_admin` role.

### Layout

The admin shell (`components/admin/AdminLayoutShell.tsx`) provides:

- Collapsible sidebar (`AdminSidebar.tsx`) with navigation links
- Top header (`AdminHeader.tsx`) with breadcrumbs, notifications, and user menu
- Responsive — collapses to a drawer on mobile

### Event management workflow

1. Navigate to **Admin → Events**
2. Click **New Event** to open the create form
3. Fill in title, date/time, venue, category, tags, and description (rich-text editor)
4. Upload a cover image via Cloudinary
5. Save as **Draft** or **Publish** directly
6. From the events table, use the actions menu to edit, publish/unpublish, or delete

### Attendance

1. Open an event's detail page in the admin panel
2. A QR code is generated per registration
3. Use **Admin → Attendance** and scan attendee QR codes with the device camera

### Inviting co-admins

1. Go to **Admin → Invites**
2. Enter the email address of the person to invite
3. They receive an invite link; on acceptance their role is upgraded to `society_admin` for your society

---

## Component Architecture

### Server vs Client Components

The project defaults to **Server Components**. Client Components (`"use client"`) are used only when:

- Event listeners or interactivity is needed (filter UI, carousels, forms)
- Browser-only APIs are accessed (`window`, `localStorage`)
- React hooks are required (`useState`, `useEffect`, etc.)

### Shared components

| Component | Type | Purpose |
|---|---|---|
| `CardGrid` | Client | Responsive CSS grid wrapper with configurable columns and gap |
| `ListLayout` | Client | Two-column layout — sidebar + main, mobile-aware ordering |
| `FilterBar` | Client | Horizontal category chips + search input |
| `EmptyState` | Server | Illustrated empty list placeholder |
| `PageHeader` | Server | Page title, subtitle, optional action button |
| `RegisterButton` | Client | Event registration with optimistic UI and toast feedback |
| `RichTextEditor` | Client | Tiptap v3 editor with formatting toolbar |
| `RichTextRenderer` | Server | Renders Tiptap JSON to HTML safely |
| `ImageUpload` | Client | Cloudinary upload with preview and drag-and-drop |

### `cn()` utility

All class merging uses the `cn()` helper from `lib/utils.ts`:

```ts
import { cn } from '@/lib/utils';

// Merges Tailwind classes, handles conditional classes, resolves conflicts
cn("px-4 py-2", isActive && "bg-indigo-600", className)
```

It wraps `clsx` + `tailwind-merge` to eliminate duplicate/conflicting Tailwind classes.

---

## Deployment

The project is configured for [Vercel](https://vercel.com).

### Steps

1. Push to GitHub and import the repo in Vercel
2. Add all environment variables from `.env.example` in the Vercel project settings
3. Set `NEXT_PUBLIC_APP_URL` to your production domain
4. Use production Clerk keys (`pk_live_` / `sk_live_`)
5. Register the Clerk webhook pointing at `https://your-domain.com/api/clerk/webhook`
6. Deploy

Vercel injects `VERCEL_OIDC_TOKEN` automatically — do not set it manually.

### MongoDB Atlas

Ensure your Atlas cluster's IP access list includes Vercel's egress IPs, or set it to `0.0.0.0/0` (allow all) for simplicity during development. For production, use Vercel's dedicated outbound IP feature.

---

## Contributing

1. Branch off `main` — use `feat/`, `fix/`, or `chore/` prefixes
2. Keep Server Components as the default; add `"use client"` only when needed
3. All new components must be fully typed — no `any`
4. Use the `@/` path alias for all imports (never relative `../lib/...`)
5. Use `cn()` for all className construction
6. Run `npm run lint` and fix all warnings before opening a PR
7. Keep PR titles under 70 characters; put detail in the description

---

## Known Issues & Gotchas

### Clerk JS fails to load locally with production keys
If you see `Failed to load Clerk JS` in the browser console pointing to a custom domain, you're using `pk_live_` keys locally. Switch to `pk_test_` / `sk_test_` keys for local development.

### Date hydration mismatch
Event dates are rendered with `{ timeZone: 'UTC' }` to ensure server (Node, UTC) and browser produce the same formatted output. If you pass a non-ISO date string to `EventCard`, the formatting may silently fall back to the hardcoded defaults.

### Cross-origin dev resource warnings
You may see `Blocked cross-origin request to Next.js dev resource` warnings if you open the app from a URL other than `localhost:3000` (e.g., the network IP). Add the origin to `allowedDevOrigins` in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.0.0.2'],
};
```

### Fast Refresh full reloads
Clerk server constants trigger a full Fast Refresh reload on `.env.local` changes. This is expected — restart the dev server after changing Clerk keys.

### API routes require authentication by default
The `/api/events` and `/api/notices` GET routes are public, but all mutation routes (`POST`, `PATCH`, `DELETE`) require a valid Clerk session. Unauthenticated requests are redirected to `/sign-in`.

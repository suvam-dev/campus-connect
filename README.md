# Campus Connect

A modern campus portal for IIT Kharagpur — built for students, managed by societies. Browse events and notices, register for activities, and manage society content through a role-based admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

---

## Features

### For Students
- **Home feed** — personalized greeting, hero carousel, "Important Today" highlights, upcoming events, and quick access links to campus resources
- **Events** — browse all events with filtering by category, search, list/grid toggle; register with one click
- **Notices** — read announcements and official notices
- **Profile** — complete your campus profile (roll number, hall, department, year) and manage registrations
- **Bookmarks** — save events and notices for later

### For Society Admins
- **Admin panel** — create, edit, publish, and delete events; manage registrations; invite co-admins; post notices
- **Attendance** — scan QR codes to mark attendance at events
- **Invite system** — invite other users to join a society as admins

### For Super Admins
- **Super-admin panel** — manage all societies, users, and platform-wide settings

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS v4, shadcn/ui (base-nova) |
| Icons | Lucide React |
| Animation | Framer Motion / Motion |
| Auth | Clerk (`@clerk/nextjs` v7) |
| Database | MongoDB via Mongoose |
| Rich text | Tiptap v3 |
| Forms | React Hook Form + Zod |
| Tables | TanStack Table v8 |
| Image upload | Cloudinary (`next-cloudinary`) |
| Carousel | Embla Carousel |
| QR | `qrcode.react`, `@yudiel/react-qr-scanner` |
| Toast | Sonner |

---

## Project Structure

```
campus-connect/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (ClerkProvider, ThemeProvider)
│   ├── page.tsx                # Home page (server component)
│   ├── events/                 # Events list + detail
│   │   ├── page.tsx
│   │   ├── EventsClient.tsx
│   │   └── [id]/
│   ├── notices/                # Notices list + detail
│   ├── profile/                # User profile management
│   ├── onboarding/             # First-time profile setup
│   ├── bookmarks/              # Saved items
│   ├── sign-in/ sign-up/       # Clerk auth pages
│   ├── admin/                  # Society admin dashboard
│   │   ├── events/             # Event CRUD
│   │   ├── invites/
│   │   └── societies/
│   ├── super-admin/            # Platform-level management
│   │   ├── users/
│   │   └── societies/
│   ├── actions/                # Server Actions
│   │   ├── eventActions.ts
│   │   ├── profileActions.ts
│   │   ├── registrationActions.ts
│   │   ├── attendanceActions.ts
│   │   └── inviteActions.ts
│   └── api/                    # Route Handlers
│       ├── events/
│       ├── notices/
│       ├── admin/
│       ├── clerk/              # Clerk webhook
│       └── seed/
│
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── shared/                 # Reusable layout components
│   │   ├── CardGrid.tsx
│   │   ├── ListLayout.tsx
│   │   ├── FilterBar.tsx
│   │   ├── EmptyState.tsx
│   │   ├── PageHeader.tsx
│   │   ├── RegisterButton.tsx
│   │   ├── RichTextEditor.tsx
│   │   └── RichTextRenderer.tsx
│   ├── admin/                  # Admin-specific components
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── AdminLayoutShell.tsx
│   │   └── DataTable.tsx
│   ├── layouts/
│   │   └── PageLayout.tsx
│   ├── blocks/                 # Composed page-level blocks
│   ├── EventCard.tsx
│   ├── NoticeCard.tsx
│   ├── HeroCarousel.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ThemeProvider.tsx
│
├── lib/
│   ├── utils.ts                # cn(), extractPlainText()
│   ├── mongodb.ts              # Mongoose connection singleton
│   ├── auth.ts                 # Server-side auth helpers
│   ├── adminAuth.ts            # Admin route protection
│   ├── rbac.ts                 # Role/permission checks
│   ├── clerkSync.ts            # Clerk ↔ MongoDB user sync
│   ├── verifyClerkWebhook.ts   # Webhook signature verification
│   └── services/
│       ├── eventService.ts
│       └── noticeService.ts
│
├── models/                     # Mongoose schemas
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
│   └── seed.ts                 # DB seed script
│
├── proxy.ts                    # Clerk middleware (route protection)
└── next.config.ts
```

---

## Roles & Permissions

| Role | Access |
|---|---|
| `student` | Public pages, profile, register for events, bookmarks |
| `society_admin` | Admin panel for their society — create/edit/delete events, post notices, manage registrations, invite admins |
| `super_admin` | Full platform access — manage all users, societies, and content |

Permissions are checked server-side via `lib/rbac.ts` using a `Permission` model that stores per-user, per-society grants. Society admins get a default full permission set automatically.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or Atlas)
- A [Clerk](https://clerk.com) account
- A [Cloudinary](https://cloudinary.com) account (for image uploads)

### 1. Clone and install

```bash
git clone <repo-url>
cd campus-connect
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

```env
# MongoDB
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/campus-connect"

# Clerk — use development keys locally (pk_test_... / sk_test_...)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Clerk redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Cloudinary (optional — for event image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_URL="cloudinary://api_key:api_secret@your_cloud_name"
```

> **Important:** Use `pk_test_` / `sk_test_` keys in local development. Production keys (`pk_live_`) reference a custom domain that won't resolve to `localhost`.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Seed sample data (optional)

```bash
npx ts-node scripts/seed.ts
```

---

## Authentication

Auth is handled by [Clerk](https://clerk.com). The middleware in `proxy.ts` protects all routes except:

- `/` (home)
- `/events/**`
- `/notices/**`
- `/sign-in/**`
- `/sign-up/**`
- `/api/webhooks/**`

On first sign-in, users are redirected to `/onboarding` to complete their campus profile (roll number, department, hall, year).

### Clerk Webhook

Clerk fires a webhook on user creation/update to keep the MongoDB `User` collection in sync. Set up the webhook endpoint in your Clerk dashboard:

```
POST https://your-domain.com/api/clerk/webhook
```

Add the signing secret to `CLERK_WEBHOOK_SECRET` in `.env.local`.

---

## Available Scripts

```bash
npm run dev       # Start development server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## API Routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/events` | List events (supports `?limit=`, `?page=`, `?category=`, `?search=`) |
| `POST` | `/api/events` | Create event (admin only) |
| `GET` | `/api/events/[id]` | Get single event |
| `PATCH` | `/api/events/[id]` | Update event (admin only) |
| `DELETE` | `/api/events/[id]` | Delete event (admin only) |
| `GET` | `/api/notices` | List notices |
| `POST` | `/api/notices` | Create notice (admin only) |
| `GET` | `/api/admin/...` | Admin-scoped endpoints |
| `POST` | `/api/clerk/webhook` | Clerk user sync webhook |
| `GET` | `/api/seed` | Seed database (dev only) |

---

## Deployment

The project is configured for [Vercel](https://vercel.com). Connect the repository and add all environment variables from `.env.example` in the Vercel project settings. The `VERCEL_OIDC_TOKEN` is injected automatically by Vercel CLI and does not need to be set manually.

For production:

1. Use a production Clerk instance with `pk_live_` keys
2. Set `NEXT_PUBLIC_APP_URL` to your production domain
3. Register the Clerk webhook pointing at `https://your-domain.com/api/clerk/webhook`
4. Ensure `CLERK_WEBHOOK_SECRET` matches the signing secret from Clerk dashboard

---

## Contributing

1. Branch off `main` — use `feat/`, `fix/`, or `chore/` prefixes
2. Keep Server Components as the default; add `"use client"` only when required (event handlers, hooks, browser APIs)
3. All new components must be fully typed — no `any`
4. Run `npm run lint` before opening a PR

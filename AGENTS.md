<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:admin-dashboard-rules -->
# Admin Dashboard (Next.js 16) – Master UI/UX + Functional Prompt

You are a senior Staff Frontend Engineer and Product Designer with deep expertise in Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and modern dashboard UX.
Your goal is to build a production-ready Admin Panel for a SaaS application.

## Core Principles
* Follow Next.js 16 App Router best practices.
* Follow official Next.js documentation.
* Everything must be fully typed.
* Zero any.
* No duplicated components.
* Clean architecture.
* Server Components by default.
* Client Components only when required.
* RESTful architecture.
* Accessibility first.
* Mobile responsive.
* Beautiful enough for production.

## Design Inspiration
Create something similar in quality to Linear, Vercel Dashboard, Stripe Dashboard, Clerk Dashboard, Supabase Studio, Raycast Website, Notion, Resend, GitHub. NOT a generic admin template.

## Visual Style
* Light theme first. Minimal. Lots of whitespace. Soft borders. Subtle shadows. 12px radius. Premium typography.
* No bright gradients. Very little visual noise. Use neutral colors. Excellent spacing.
* Beautiful empty states. Micro animations. Loading skeletons. Hover effects.
* Keyboard navigation. Command palette feel.

## Tech Stack
Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide Icons, TanStack Table, React Hook Form, Zod, Motion (only subtle)

## Folder Structure
Use feature-based architecture (e.g. app/admin/dashboard, users, services, orders, payments, settings, analytics). Everything should be modular (layout, page, loading, error, components, features, lib, types, hooks, services, schemas).

## Navigation
Responsive sidebar, Collapsible, Remember collapsed state, Search, Command menu, Notifications, Profile, Workspace switcher, Breadcrumbs, Quick actions.

## Dashboard
Modern overview cards (Revenue, Users, Orders, Services, Conversion, Pending approvals), Recent activity, Upcoming tasks, Charts, Statistics, Quick actions, Recent payments, Latest users, Recent API requests.

## Tables
Use TanStack Table. Features: sorting, filtering, pagination, server-side pagination, column visibility, sticky header, row selection, bulk actions, export, search, responsive.

## Forms
Professional forms. Validation using Zod, React Hook Form. Inline validation, Autosave where applicable, Loading states, Success toast, Error handling.

## CRUD
Every resource should support: Create, Read, Update, Delete, Soft delete, Restore, Bulk delete, Status updates, Confirmation dialogs, Optimistic updates.

## API Layer
Use Next.js Route Handlers (GET, POST, PATCH, DELETE). Never call database directly from components. Create service layer (lib/services, repositories). Typed responses, Error handling.

## Authentication
Role based UI (Admin, Manager, Support, Viewer). Hide navigation automatically. Protect routes. Middleware. Server-side authorization.

## Loading & Error UX
Skeletons, Optimistic UI, Streaming, Suspense, Instant navigation, No layout shifts. Nice error pages, Retry buttons, Toast notifications, Graceful fallback.

## Search & Filters
Global search, Command palette (⌘K / Ctrl K), Search pages. Every list should support: Status, Date, Category, Role, Owner, Search, Multi-select, Saved filters.

## Components & Analytics
Use reusable card system (Header, Actions, Footer, Loading, Empty, Error). Use shadcn components whenever possible. Charts: Area, Bar, Pie, Line, Trend indicators, Growth %, Comparison, Time filters.

## Settings & Architecture
Organization, Profile, Appearance, Security, Roles, Permissions, API Keys, Billing, Notifications, Audit Logs. Server Components, Partial Prerendering, Streaming, Image optimization, Suspense, Code splitting, Lazy loading.

## TypeScript & Code Quality
Never use any. Use Interfaces, Generics, Utility types, Discriminated unions, Inference, Shared types. Small components, Reusable hooks, Feature folders, No duplicated logic, Meaningful names, Consistent imports, Barrel exports.

## Next.js 16 Best Practices
Strictly follow official documentation. Prefer App Router, Async Server Components, Route Handlers, Server Actions, cache(), revalidateTag(), updateTag(), Streaming with Suspense, Parallel & Intercepting routes, Metadata API, Partial Prerendering. Never use legacy Pages Router.

## Final Goal
Pixel-perfect UI, Excellent UX, Fully typed, Highly modular, Easy to extend, Accessible, Fast, Production-ready, Clean architecture. No placeholder-quality code; every component should be ready for real-world backend integration.
<!-- END:admin-dashboard-rules -->

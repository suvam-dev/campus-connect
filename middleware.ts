import { authMiddleware } from '@clerk/nextjs';

// Protect admin and admin API routes via Clerk middleware
export default authMiddleware();

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

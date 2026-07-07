import { connectDB } from '../../../../lib/mongodb';
import Registration from '../../../../models/Registration';
import { requireAdmin } from '../../../../lib/adminAuth';

export async function GET(req: Request) {
  await connectDB();
  const headers = req.headers;
  const url = new URL(req.url);
  const eventId = url.searchParams.get('eventId');
  if (!eventId) return new Response('eventId required', { status: 400 });

  try {
    // need society context to authorize — assume event contains society in future; for now require super_admin or allow CLERK_SKIP_AUTH
    const user = await requireAdmin(headers, undefined, undefined);
    if (!user) return new Response('unauthenticated', { status: 401 });

    const regs = await Registration.find({ event: eventId }).populate('user', 'name email rollNumber department year phone').lean();
    return new Response(JSON.stringify(regs), { status: 200 });
  } catch (err: any) {
    const message = err?.message || String(err);
    if (message === 'unauthenticated') return new Response('unauthenticated', { status: 401 });
    if (message === 'forbidden') return new Response('forbidden', { status: 403 });
    return new Response(message, { status: 500 });
  }
}

import { connectDB } from '../../../../lib/mongodb';
import Event from '../../../../models/Event';
import { requireAdmin } from '../../../../lib/adminAuth';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const societyId = body.society;
  if (!societyId) return new Response('society required', { status: 400 });

  try {
    const user = await requireAdmin(req, societyId, 'canCreateEvent');

    const e = new Event({
      title: body.title,
      venue: body.venue,
      date: body.date,
      time: body.time,
      category: body.category,
      tags: body.tags || [],
      image: body.image || '',
      description: body.description || '',
      createdBy: user._id,
      society: societyId,
    });

    await e.save();
    return new Response(JSON.stringify(e), { status: 201 });
  } catch (err: any) {
    const message = err?.message || String(err);
    if (message === 'unauthenticated') return new Response('unauthenticated', { status: 401 });
    if (message === 'forbidden') return new Response('forbidden', { status: 403 });
    return new Response(message, { status: 500 });
  }
}

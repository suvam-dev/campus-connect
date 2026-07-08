import { connectDB } from '../../../../lib/mongodb';
import Event from '../../../../models/Event';
import { requireAdmin } from '../../../../lib/adminAuth';

import { createEventSchema } from '../../../../lib/validations';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const societyId = body.society as string;
  if (!societyId) return new Response('society required', { status: 400 });

  try {
    const user = await requireAdmin(req, societyId, 'canCreateEvent');

    // Validate using Zod schema
    const parseResult = createEventSchema.safeParse(body);
    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: "Validation failed", details: parseResult.error.flatten().fieldErrors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const e = new Event({
      ...parseResult.data,
      createdBy: user._id,
      society: societyId,
    });

    await e.save();
    return new Response(JSON.stringify(e), { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message === 'unauthenticated') return new Response('unauthenticated', { status: 401 });
    if (message === 'forbidden') return new Response('forbidden', { status: 403 });
    return new Response(message, { status: 500 });
  }
}

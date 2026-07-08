import { connectDB } from '../../../../lib/mongodb';
import Invite from '../../../../models/Invite';
import { requireAdmin } from '../../../../lib/adminAuth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  await connectDB();
  const headers = req.headers;
  const body = await req.json();

  const { email, society, role } = body;
  if (!email || !society) return new Response('email and society required', { status: 400 });

  try {
    // Only admins of the society or super_admin can invite
    const user = await requireAdmin(req, society, 'canInviteAdmins');

    const token = `invite_${uuidv4()}`;
    const invite = await Invite.findOneAndUpdate(
      { email: email.toLowerCase(), society },
      {
        $set: {
          email: email.toLowerCase(),
          society,
          role: role || 'society_admin',
          token,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          invitedBy: user._id,
          status: 'pending',
        },
      },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify({ inviteId: invite._id, token: invite.token }), { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message === 'unauthenticated') return new Response('unauthenticated', { status: 401 });
    if (message === 'forbidden') return new Response('forbidden', { status: 403 });
    return new Response(message, { status: 500 });
  }
}

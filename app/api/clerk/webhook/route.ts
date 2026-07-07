import { upsertClerkUser, detectClerkSDK } from '../../../../lib/clerkSync';

// Next.js App Router route handler
export async function POST(req: Request) {
  const raw = await req.text();

  // Verify signature if secret is configured
  const signatureHeader = req.headers.get('clerk-signature') || req.headers.get('x-clerk-signature') || req.headers.get('Clerk-Signature');
  const { verifyClerkWebhook } = await import('../../../../lib/verifyClerkWebhook');
  const ok = verifyClerkWebhook(raw, signatureHeader);
  if (!ok) {
    console.warn('Clerk webhook signature verification failed');
    return new Response('invalid signature', { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(raw);
  } catch (err) {
    return new Response('invalid json', { status: 400 });
  }

  // Payload shapes vary by Clerk webhook type/version. Be resilient.
  const eventType = payload.type || payload.event || payload.name;
  const data = payload.data || payload.user || payload.object || payload;

  // Attempt to extract user fields from common Clerk shapes
  const clerkId = data.id || data.user_id || data.user?.id;
  const email =
    data.email ||
    data.email_address ||
    data.primary_email_address ||
    (data.email_addresses && data.email_addresses[0] && data.email_addresses[0].email_address) ||
    data.user?.email_addresses?.[0]?.email_address ||
    data.user?.primary_email_address;

  const name = data.name || `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.user?.first_name || data.user?.last_name || undefined;
  const profileImage = data.profile_image_url || data.avatar_url || data.user?.profile_image_url;
  const phone = data.phone || data.user?.phone_number;

  if (!clerkId && !email) {
    return new Response('no user info in payload', { status: 400 });
  }

  try {
    const sdk = detectClerkSDK();
    console.log('Detected Clerk SDK:', sdk);
    const user = await upsertClerkUser({ clerkId, email, name, phone, profileImage });
    console.log('Clerk webhook processed:', { eventType, clerkId, email, userId: user?._id });
    return new Response('ok');
  } catch (err: any) {
    console.error('Error handling Clerk webhook:', err?.message || err);
    return new Response('internal error', { status: 500 });
  }
}

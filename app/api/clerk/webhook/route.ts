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

  interface WebhookData {
    id?: string;
    user_id?: string;
    email?: string;
    email_address?: string;
    primary_email_address?: string;
    email_addresses?: Array<{ email_address: string }>;
    name?: string;
    first_name?: string;
    last_name?: string;
    profile_image_url?: string;
    avatar_url?: string;
    phone?: string;
    phone_number?: string;
    user?: {
      id?: string;
      email_addresses?: Array<{ email_address: string }>;
      primary_email_address?: string;
      first_name?: string;
      last_name?: string;
      profile_image_url?: string;
      phone_number?: string;
    };
  }

  interface WebhookPayload {
    type?: string;
    event?: string;
    name?: string;
    data?: WebhookData;
    user?: WebhookData;
    object?: WebhookData;
  }

  let payload: WebhookPayload & WebhookData;
  try {
    payload = JSON.parse(raw) as WebhookPayload & WebhookData;
  } catch (err: unknown) {
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
    // Explicitly type the argument passed to upsertClerkUser to avoid implicit any/unmatched type issues
    const user = await upsertClerkUser({
      clerkId: clerkId || undefined,
      email: email || undefined,
      name: name || undefined,
      phone: phone || undefined,
      profileImage: profileImage || undefined,
    });
    console.log('Clerk webhook processed:', { eventType, clerkId, email, userId: user?._id });
    return new Response('ok');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error handling Clerk webhook:', message);
    return new Response('internal error', { status: 500 });
  }
}

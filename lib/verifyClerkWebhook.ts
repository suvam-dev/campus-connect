import crypto from 'crypto';

export function verifyClerkWebhook(rawBody: string, signatureHeader?: string | null) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    // If secret not configured, skip verification (safe default during local dev but warn)
    console.warn('CLERK_WEBHOOK_SECRET not set — skipping Clerk webhook signature verification');
    return true;
  }

  if (!signatureHeader) return false;

  // Common header formats: 'sha256=<hex>' or raw hex. Support both.
  let incomingSig = signatureHeader;
  if (incomingSig.startsWith('sha256=')) incomingSig = incomingSig.slice('sha256='.length);
  incomingSig = incomingSig.trim();

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(rawBody, 'utf8');
  const expected = hmac.digest('hex');

  try {
    const incomingBuf = Buffer.from(incomingSig, 'hex');
    const expectedBuf = Buffer.from(expected, 'hex');
    if (incomingBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(incomingBuf, expectedBuf);
  } catch (err) {
    return false;
  }
}

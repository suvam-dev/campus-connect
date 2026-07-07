import crypto from 'crypto';

// Verifies Clerk webhook signatures.
// Supports header formats like: "t=TIMESTAMP,v1=HEX_SIG" where the signature is HMAC-SHA256(secret, `${TIMESTAMP}.${rawBody}`).
// Falls back to older simple `sha256=...` header if present.
export function verifyClerkWebhook(rawBody: string, signatureHeader?: string | null, toleranceSeconds = 300) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('CLERK_WEBHOOK_SECRET not set — skipping Clerk webhook signature verification');
    return true;
  }

  if (!signatureHeader) return false;

  // header may contain multiple comma-separated parts: t=...,v1=...,v1=...
  const parts = signatureHeader.split(',').map((s) => s.trim());
  const map: Record<string, string[]> = {};
  for (const p of parts) {
    const [k, v] = p.split('=');
    if (!k || !v) continue;
    map[k] = map[k] || [];
    map[k].push(v);
  }

  // If timestamp present, validate v1 signatures against `${timestamp}.${rawBody}`
  if (map.t && map.v1 && map.v1.length > 0) {
    const ts = map.t[0];
    const payload = `${ts}.${rawBody}`;
    const expectedHmac = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');

    for (const sig of map.v1) {
      try {
        const incomingBuf = Buffer.from(sig, 'hex');
        const expectedBuf = Buffer.from(expectedHmac, 'hex');
        if (incomingBuf.length === expectedBuf.length && crypto.timingSafeEqual(incomingBuf, expectedBuf)) {
          // check timestamp tolerance
          const now = Math.floor(Date.now() / 1000);
          const tsNum = parseInt(ts, 10);
          if (isNaN(tsNum)) return false;
          if (Math.abs(now - tsNum) > toleranceSeconds) {
            console.warn('Clerk webhook timestamp outside tolerance', { now, ts: tsNum, toleranceSeconds });
            return false;
          }
          return true;
        }
      } catch (err) {
        // continue checking other signatures
      }
    }
    return false;
  }

  // Backwards-compatible: support headers like 'sha256=<hex>' or single hex value
  let incomingSig = signatureHeader;
  if (incomingSig.startsWith('sha256=')) incomingSig = incomingSig.slice('sha256='.length);
  incomingSig = incomingSig.trim();

  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(rawBody, 'utf8');
    const expected = hmac.digest('hex');
    const incomingBuf = Buffer.from(incomingSig, 'hex');
    const expectedBuf = Buffer.from(expected, 'hex');
    if (incomingBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(incomingBuf, expectedBuf);
  } catch (err) {
    return false;
  }
}

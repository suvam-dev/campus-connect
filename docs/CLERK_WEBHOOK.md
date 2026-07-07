Clerk webhook setup

1. Add environment variable CLERK_WEBHOOK_SECRET with the signing secret from Clerk.

2. Configure Clerk dashboard to send webhooks to:

   https://your-domain.com/api/clerk/webhook

3. The route expects the Clerk signature header (clerk-signature or x-clerk-signature). It verifies the HMAC SHA256 of the raw request body using CLERK_WEBHOOK_SECRET.

4. During local development, if CLERK_WEBHOOK_SECRET is not set, verification is skipped but a warning is printed — avoid this in production.

5. The webhook upserts or creates a local MongoDB user document matching the Clerk user by clerkId or email.

6. To test locally, use a tool to send a POST with raw JSON body and compute sha256 HMAC hex with the secret and set header "clerk-signature: sha256=<hex>".

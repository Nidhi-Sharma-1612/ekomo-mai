import "server-only";
import Stripe from "stripe";

let cachedClient: Stripe | null = null;

/** Lazily constructed so builds/pages that never touch Stripe don't require the env var. */
export function getStripe(): Stripe {
  if (cachedClient) return cachedClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable. Add it to .env.local.");
  }

  cachedClient = new Stripe(secretKey);
  return cachedClient;
}

/**
 * Absolute site origin for building Stripe redirect URLs (success/cancel).
 * Override with NEXT_PUBLIC_SITE_URL if the deployment domain ever changes;
 * otherwise defaults to the known dev/production origins.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return process.env.NODE_ENV === "production"
    ? "https://louise.weblaucher.com"
    : "http://localhost:3000";
}

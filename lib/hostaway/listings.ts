/**
 * The Hostaway account we have credentials for manages 3 of the 4 listings
 * shown on the site. Slugs and short "resort" display names aren't reliably
 * derivable from the API response, so they're pinned here manually. The 4th
 * property (Lahaina Shores) isn't under this Hostaway account — it stays as
 * static content in lib/data/properties.ts until that's resolved.
 */
export const HOSTAWAY_LISTINGS = [
  { id: 240142, slug: "oceanfront-studio-honeymoon", resort: "The Mahana" },
  { id: 240143, slug: "the-mahana-802", resort: "The Mahana" },
  { id: 240144, slug: "honua-kai-ocean-view", resort: "Honua Kai Resort & Spa" },
] as const;

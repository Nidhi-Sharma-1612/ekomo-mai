/**
 * The 3 listings shown on the site. Slugs and short "resort" display names
 * aren't reliably derivable from the API response, so they're pinned here
 * manually.
 */
export const HOSTAWAY_LISTINGS = [
  { id: 240142, slug: "oceanfront-studio-honeymoon", resort: "The Mahana" },
  { id: 240143, slug: "the-mahana-802", resort: "The Mahana" },
  { id: 240144, slug: "honua-kai-ocean-view", resort: "Honua Kai Resort & Spa" },
  { id: 591423, slug: "the-mahana-311", resort: "The Mahana" },
] as const;

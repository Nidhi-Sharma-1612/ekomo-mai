import type { Property } from "@/lib/types";
import lahainaShores from "@/public/images/properties/lahaina-shores.jpeg";

/**
 * Lahaina Shores isn't managed under the Hostaway account we have
 * credentials for (confirmed via the API — only 3 of the 4 listings exist
 * on that account), so it stays as hand-curated static content until that's
 * resolved. Every other property is fetched live — see
 * lib/hostaway/getProperties.ts.
 */
export const staticProperties: Property[] = [
  {
    id: "240824",
    slug: "lahaina-shores-oceanfront-studio",
    name: "Lahaina Shores Oceanfront Studio",
    resort: "Lahaina Shores",
    location: "Lahaina, Maui",
    tagline: "Ocean breeze and sunsets from the 4th floor",
    description:
      "A recently renovated fourth-floor studio at Lahaina Shores, right on the water in historic Lahaina town.",
    longDescription:
      "Lahaina Shores puts you right on the water at the edge of historic Lahaina town, walkable to local restaurants, galleries, and the harbor. This fourth-floor studio was recently renovated and catches the ocean breeze and evening sunsets straight from the lanai.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [
      "Oceanfront lanai",
      "Fully equipped kitchen",
      "Resort pool access",
      "Free WiFi",
      "Walk to Lahaina town",
      "Beach gear provided",
    ],
    images: [{ src: lahainaShores, alt: "Lahaina Shores oceanfront view at sunset" }],
    nightlyRateFrom: 750,
    address: "475 Front St, Lahaina, HI 96761",
    coordinates: { lat: 20.8712, lng: -156.6807 },
    source: "static",
    checkInTime: "4:00 PM",
    checkOutTime: "10:00 AM",
    cleaningFee: 150,
    checkinFee: 0,
    taxRatePercent: 0,
    guestStayTax: 0,
    guestNightlyTax: 0,
    guestPerPersonPerNightTax: 0,
    cancellationTiers: [
      { window: "14+ days before check-in", refund: "Full refund" },
      { window: "7–13 days before check-in", refund: "50% refund" },
      { window: "Within 7 days of check-in", refund: "No refund" },
    ],
  },
];

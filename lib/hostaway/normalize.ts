import type { CancellationTier, Property } from "@/lib/types";

/** Strips emoji and stray symbols the listing name uses for OTA marketing flair. */
function cleanTagline(raw: string): string {
  return raw
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\*+/g, "")
    .replace(/!{2,}/g, "!")
    .replace(/\s+/g, " ")
    .trim();
}

function formatHour(hour: number | null | undefined): string {
  if (hour == null) return "—";
  const period = hour >= 12 ? "PM" : "AM";
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelveHour}:00 ${period}`;
}

/**
 * Hostaway's listing.cancellationPolicy field returns a policy *name*, not
 * the full refund-tier text — the exact wording lives behind a separate
 * cancellation-policies lookup we haven't wired up. These are the standard,
 * widely-published definitions for each named tier; confirm against the
 * client's actual configured policy before relying on this for real guest
 * disputes.
 */
const CANCELLATION_POLICIES: Record<string, CancellationTier[]> = {
  flexible: [
    { window: "24+ hours before check-in", refund: "Full refund" },
    { window: "Within 24 hours of check-in", refund: "No refund" },
  ],
  moderate: [
    { window: "5+ days before check-in", refund: "Full refund" },
    { window: "Within 5 days of check-in", refund: "No refund" },
  ],
  firm: [
    { window: "30+ days before check-in", refund: "Full refund" },
    { window: "7–29 days before check-in", refund: "50% refund" },
    { window: "Within 7 days of check-in", refund: "No refund" },
  ],
  strict: [
    { window: "14+ days before check-in", refund: "Full refund" },
    { window: "7–13 days before check-in", refund: "50% refund" },
    { window: "Within 7 days of check-in", refund: "No refund" },
  ],
  super_strict_30: [
    { window: "30+ days before check-in", refund: "50% refund" },
    { window: "Within 30 days of check-in", refund: "No refund" },
  ],
  super_strict_60: [
    { window: "60+ days before check-in", refund: "50% refund" },
    { window: "Within 60 days of check-in", refund: "No refund" },
  ],
};

const DEFAULT_CANCELLATION_TIERS: CancellationTier[] = CANCELLATION_POLICIES.strict;

function cancellationTiersFor(policyName: string | null | undefined): CancellationTier[] {
  if (!policyName) return DEFAULT_CANCELLATION_TIERS;
  return CANCELLATION_POLICIES[policyName] ?? DEFAULT_CANCELLATION_TIERS;
}

interface HostawayImage {
  url: string;
  caption?: string | null;
  sortOrder?: number | null;
}

interface HostawayAmenity {
  amenityName: string;
}

/** Raw Hostaway listing object -> the Property shape every component consumes. */
export function normalizeListing(
  raw: Record<string, unknown>,
  config: { slug: string; resort: string }
): Property {
  const images = ((raw.listingImages as HostawayImage[]) ?? [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((img) => ({
      src: img.url,
      alt: img.caption?.trim() || `Photo of ${raw.internalListingName ?? config.resort}`,
    }));

  const amenities = ((raw.listingAmenities as HostawayAmenity[]) ?? [])
    .map((a) => a.amenityName)
    .filter(Boolean);

  const city = (raw.city as string) ?? "";
  const state = (raw.state as string) ?? "";
  const street = (raw.publicAddress as string) ?? (raw.address as string) ?? "";
  const zipcode = (raw.zipcode as string) ?? "";

  const rawName = (raw.name as string) ?? (raw.internalListingName as string) ?? config.resort;

  return {
    id: String(raw.id),
    slug: config.slug,
    name: (raw.internalListingName as string) || config.resort,
    resort: config.resort,
    location: city ? `${city}, Maui` : "Maui",
    tagline: cleanTagline(rawName),
    description: cleanTagline(rawName),
    longDescription: ((raw.description as string) ?? "").trim(),
    bedrooms: (raw.bedroomsNumber as number) ?? 1,
    bathrooms: (raw.bathroomsNumber as number) ?? 1,
    maxGuests: (raw.personCapacity as number) ?? 2,
    amenities,
    images,
    nightlyRateFrom: typeof raw.price === "number" ? Math.round(raw.price as number) : null,
    address: [street, city && state ? `${city}, ${state}` : city, zipcode].filter(Boolean).join(", "),
    coordinates: { lat: (raw.lat as number) ?? 0, lng: (raw.lng as number) ?? 0 },
    source: "hostaway",
    hostawayListingId: raw.id as number,
    checkInTime: formatHour(raw.checkInTimeStart as number | null),
    checkOutTime: formatHour(raw.checkOutTime as number | null),
    houseRulesText: (raw.houseRules as string | null) ?? undefined,
    cancellationPolicyName: (raw.cancellationPolicy as string | null) ?? undefined,
    cancellationTiers: cancellationTiersFor(raw.cancellationPolicy as string | null),
    cleaningFee: (raw.cleaningFee as number) ?? 0,
    checkinFee: (raw.checkinFee as number) ?? 0,
    // Disabled for now — Hostaway's propertyRentTax field (5%) doesn't reflect
    // Maui's real combined tax rate, so tax is omitted until that's confirmed.
    taxRatePercent: 0,
    guestStayTax: (raw.guestStayTax as number) ?? 0,
    guestNightlyTax: (raw.guestNightlyTax as number) ?? 0,
    guestPerPersonPerNightTax: (raw.guestPerPersonPerNightTax as number) ?? 0,
  };
}

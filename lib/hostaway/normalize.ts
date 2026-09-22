import type { HostawayCancellationPolicy } from "@/lib/hostaway/client";
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
 * Hostaway's listing.cancellationPolicy field is a generic legacy/channel
 * code (always "strict" on this account, regardless of the real configured
 * policy) — not what's actually shown to guests. The real policy lives
 * behind listing.cancellationPolicyId, resolved against the account's
 * /v1/cancellationPolicies list (see lib/hostaway/client.ts), whose tiers
 * are converted here into display text.
 */
function cancellationTiersFromPolicy(
  policy: HostawayCancellationPolicy | undefined
): CancellationTier[] {
  const items = policy?.cancellationPolicyItem ?? [];
  if (items.length === 0) {
    return [{ window: "Any time before check-in", refund: "No refund" }];
  }

  const sorted = [...items].sort((a, b) => a.timeDelta - b.timeDelta);
  const tiers: CancellationTier[] = sorted.map((item) => {
    const days = Math.round(Math.abs(item.timeDelta) / 86_400);
    const refund = item.refundAmount >= 100 ? "Full refund" : `${item.refundAmount}% refund`;
    return { window: `${days}+ days before check-in`, refund };
  });

  const lastDays = Math.round(Math.abs(sorted[sorted.length - 1].timeDelta) / 86_400);
  tiers.push({ window: `Within ${lastDays} days of check-in`, refund: "No refund" });

  return tiers;
}

interface HostawayImage {
  url: string;
  caption?: string | null;
  sortOrder?: number | null;
}

interface HostawayAmenity {
  amenityName: string;
}

/** Hawaii's combined Transient Accommodations Tax + General Excise Tax + Maui county surcharge, confirmed with the client. */
const HAWAII_HOTEL_TAX_PERCENT = 18.712;

/** Raw Hostaway listing object -> the Property shape every component consumes. */
export function normalizeListing(
  raw: Record<string, unknown>,
  config: { slug: string; resort: string },
  cancellationPolicies: HostawayCancellationPolicy[] = []
): Property {
  const matchedPolicy = cancellationPolicies.find((p) => p.id === raw.cancellationPolicyId);
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
    cancellationPolicyName: matchedPolicy?.name ?? (raw.cancellationPolicy as string | null) ?? undefined,
    cancellationTiers: cancellationTiersFromPolicy(matchedPolicy),
    cleaningFee: (raw.cleaningFee as number) ?? 0,
    checkinFee: (raw.checkinFee as number) ?? 0,
    // Confirmed with the client: 18.712% combined Hawaii hotel tax, applied to all listings.
    taxRatePercent: HAWAII_HOTEL_TAX_PERCENT,
    guestStayTax: (raw.guestStayTax as number) ?? 0,
    guestNightlyTax: (raw.guestNightlyTax as number) ?? 0,
    guestPerPersonPerNightTax: (raw.guestPerPersonPerNightTax as number) ?? 0,
  };
}

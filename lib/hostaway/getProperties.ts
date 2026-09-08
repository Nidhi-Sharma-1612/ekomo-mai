import "server-only";
import type { Property } from "@/lib/types";
import { staticProperties } from "@/lib/data/properties";
import { HOSTAWAY_LISTINGS } from "@/lib/hostaway/listings";
import { normalizeListing } from "@/lib/hostaway/normalize";
import { fetchListing } from "@/lib/hostaway/client";
import { getAverageNightlyRate } from "@/lib/hostaway/pricing";

async function withLiveRate(property: Property): Promise<Property> {
  if (!property.hostawayListingId) return property;
  const averageRate = await getAverageNightlyRate(property.hostawayListingId);
  return averageRate ? { ...property, nightlyRateFrom: averageRate } : property;
}

async function fetchLiveProperties(): Promise<Property[]> {
  const results = await Promise.allSettled(
    HOSTAWAY_LISTINGS.map(async (config) => {
      const raw = await fetchListing(config.id);
      return withLiveRate(normalizeListing(raw, config));
    })
  );

  const properties: Property[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      properties.push(result.value);
    } else {
      // Don't let one failed listing take down the whole site — log and skip it.
      console.error("Failed to fetch Hostaway listing:", result.reason);
    }
  }
  return properties;
}

/** All properties shown on the site: live Hostaway listings + the static fallback(s). */
export async function getAllProperties(): Promise<Property[]> {
  const live = await fetchLiveProperties();
  return [...live, ...staticProperties];
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const staticMatch = staticProperties.find((p) => p.slug === slug);
  if (staticMatch) return staticMatch;

  const config = HOSTAWAY_LISTINGS.find((l) => l.slug === slug);
  if (!config) return undefined;

  const raw = await fetchListing(config.id);
  return withLiveRate(normalizeListing(raw, config));
}

export function getAllSlugs(): string[] {
  return [...HOSTAWAY_LISTINGS.map((l) => l.slug), ...staticProperties.map((p) => p.slug)];
}

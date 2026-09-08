import "server-only";
import { fetchReviews } from "@/lib/hostaway/client";
import { HOSTAWAY_LISTINGS } from "@/lib/hostaway/listings";
import type { Testimonial } from "@/lib/types";

/** Reviews sometimes carry a "Title\nPositive: ..." shape — flatten to one clean sentence. */
function cleanReviewText(raw: string): string {
  return raw.replace(/\s*\n+\s*/g, " ").trim();
}

const MIN_REVIEW_LENGTH = 40;
const MIN_RATING_OUT_OF_10 = 8;
const MAX_PER_LISTING = 3;

/**
 * Real guest reviews pulled from Hostaway, filtered to genuinely positive,
 * substantive ones and diversified across properties. Falls back to an empty
 * list (never fake content) if the API is unreachable — callers should show
 * curated static testimonials only as a last resort.
 */
export async function getFeaturedTestimonials(limit = 6): Promise<Testimonial[]> {
  let raw;
  try {
    raw = await fetchReviews({ limit: 500 });
  } catch {
    return [];
  }

  const resortByListingId = new Map(HOSTAWAY_LISTINGS.map((l) => [l.id as number, l.resort]));

  const candidates = raw
    .filter(
      (r) =>
        r.status === "published" &&
        r.isHidden !== 1 &&
        typeof r.publicReview === "string" &&
        r.publicReview.trim().length >= MIN_REVIEW_LENGTH &&
        typeof r.rating === "number" &&
        r.rating >= MIN_RATING_OUT_OF_10 &&
        resortByListingId.has(r.listingMapId)
    )
    .sort((a, b) => new Date(b.submittedAt ?? 0).getTime() - new Date(a.submittedAt ?? 0).getTime());

  const perListingCount = new Map<number, number>();
  const testimonials: Testimonial[] = [];

  for (const review of candidates) {
    const count = perListingCount.get(review.listingMapId) ?? 0;
    if (count >= MAX_PER_LISTING) continue;
    perListingCount.set(review.listingMapId, count + 1);

    testimonials.push({
      id: String(review.id),
      quote: cleanReviewText(review.publicReview as string),
      author: review.guestName || review.reviewerName || "Verified Guest",
      location: resortByListingId.get(review.listingMapId) ?? "Maui, Hawaii",
      rating: Math.round((review.rating as number) / 2),
    });

    if (testimonials.length >= limit) break;
  }

  return testimonials;
}

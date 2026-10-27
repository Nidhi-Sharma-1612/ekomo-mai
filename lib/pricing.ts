import type { Property } from "@/lib/types";

export interface PriceBreakdown {
  nights: number;
  nightlySubtotal: number;
  cleaningFee: number;
  checkinFee: number;
  tax: number;
  total: number;
}

/**
 * Mirrors Hostaway's own fee model: a percentage tax on the rental subtotal
 * and cleaning fee, plus optional flat per-stay/per-night/per-guest-night taxes, added on top
 * of the nightly subtotal and flat fees. Used both server-side (to charge the
 * correct amount in Stripe) and client-side (to preview the total before checkout).
 */
export function calculateTotal(
  property: Pick<
    Property,
    "cleaningFee" | "checkinFee" | "taxRatePercent" | "guestStayTax" | "guestNightlyTax" | "guestPerPersonPerNightTax"
  >,
  nightlySubtotal: number,
  nights: number,
  guests: number
): PriceBreakdown {
  const cleaningFee = property.cleaningFee ?? 0;
  const checkinFee = property.checkinFee ?? 0;

  // Hawaii's hotel tax applies to the cleaning fee as well as the rent —
  // matches Hostaway's own price calculation (tax = rate × (rent + cleaning)).
  const tax =
    (nightlySubtotal + cleaningFee) * ((property.taxRatePercent ?? 0) / 100) +
    (property.guestStayTax ?? 0) +
    (property.guestNightlyTax ?? 0) * nights +
    (property.guestPerPersonPerNightTax ?? 0) * guests * nights;

  const total = nightlySubtotal + cleaningFee + checkinFee + tax;

  return { nights, nightlySubtotal, cleaningFee, checkinFee, tax, total };
}

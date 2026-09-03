/**
 * Standard house rules & cancellation policy — not yet confirmed by the
 * client. These reflect typical terms for a resort-condo short-term rental
 * (self check-in, no parties/pets/smoking, moderate cancellation window).
 * Replace with Louis & Kristine's actual policy, or pull it live from
 * Hostaway, before launch.
 */
export const checkInTime = "4:00 PM";
export const checkOutTime = "10:00 AM";

export const allowedRules = [
  "Self check-in with door code",
  "Long-term stays allowed",
  "Well-behaved guests of all ages welcome",
];

export const notAllowedRules = [
  "No smoking or vaping",
  "No parties or events",
  "No pets",
  "Quiet hours 10 PM – 8 AM",
];

export const cancellationTiers = [
  { window: "14+ days before check-in", refund: "Full refund" },
  { window: "7–13 days before check-in", refund: "50% refund" },
  { window: "Within 7 days of check-in", refund: "No refund" },
];

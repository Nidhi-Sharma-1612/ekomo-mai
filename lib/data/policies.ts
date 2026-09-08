/**
 * Fallback house-rule content used only when a property has no live
 * Hostaway house-rules text (currently: the static Lahaina Shores listing).
 * Live-sourced properties use their real check-in/out times, cancellation
 * tiers, and house rules from Hostaway instead — see
 * lib/hostaway/normalize.ts.
 */
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

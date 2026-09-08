import "server-only";
import { fetchCalendar } from "@/lib/hostaway/client";

/** True only if every night in [checkIn, checkOut) is actually bookable. */
export async function isRangeAvailable(
  hostawayListingId: number,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  try {
    const days = await fetchCalendar(hostawayListingId, checkIn, checkOut);
    const nights = days.filter((d) => d.date < checkOut); // calendar end date is inclusive of checkout day itself
    if (nights.length === 0) return true;
    return nights.every((d) => Boolean(d.isAvailable) && d.status === "available");
  } catch {
    // If the availability check itself fails, don't hide the property —
    // fall back to "unknown" (treated as available) rather than a false negative.
    return true;
  }
}

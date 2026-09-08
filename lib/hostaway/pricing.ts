import "server-only";
import { fetchCalendarCached } from "@/lib/hostaway/client";
import { addDays, toISODate } from "@/lib/date";

const RATE_WINDOW_DAYS = 180;

/**
 * A representative "from $X/night" figure for listing cards — an average
 * over the next 180 days of live calendar pricing, matching the same window
 * PropertyBookingCard uses for the detail-page headline. Cheaper/simpler
 * than the raw Hostaway `price` field, which can be a stale default that
 * doesn't reflect what guests are actually quoted.
 */
export async function getAverageNightlyRate(hostawayListingId: number): Promise<number | null> {
  const today = new Date();
  const startDate = toISODate(today);
  const endDate = toISODate(addDays(today, RATE_WINDOW_DAYS));

  try {
    const days = await fetchCalendarCached(hostawayListingId, startDate, endDate);
    if (days.length === 0) return null;
    const total = days.reduce((sum, d) => sum + d.price, 0);
    return Math.round(total / days.length);
  } catch {
    return null;
  }
}

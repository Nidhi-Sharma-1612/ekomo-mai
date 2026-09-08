import { NextResponse } from "next/server";
import { fetchCalendar } from "@/lib/hostaway/client";
import { HOSTAWAY_LISTINGS } from "@/lib/hostaway/listings";

export interface AggregateAvailabilityDay {
  date: string;
  /** True if at least one property is bookable that night. */
  isAvailable: boolean;
  /** Lowest minimum-stay requirement among properties available that night — the most permissive real option. */
  minimumStay: number;
}

/**
 * Availability aggregated across every live Hostaway listing — used by the
 * homepage's "search all homes" widget, which isn't tied to one property so
 * per-date pricing wouldn't mean much here (each unit has its own rate).
 * A date only shows as unavailable if every property is booked that night.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "startDate and endDate query params are required (YYYY-MM-DD)." },
      { status: 400 }
    );
  }

  try {
    const results = await Promise.allSettled(
      HOSTAWAY_LISTINGS.map((listing) => fetchCalendar(listing.id, startDate, endDate))
    );

    const availableCountByDate = new Map<string, number>();
    const minStayByDate = new Map<string, number>();
    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      for (const day of result.value) {
        const isAvailable = Boolean(day.isAvailable) && day.status === "available";
        if (isAvailable) {
          availableCountByDate.set(day.date, (availableCountByDate.get(day.date) ?? 0) + 1);
          const minStay = day.minimumStay ?? 1;
          minStayByDate.set(day.date, Math.min(minStayByDate.get(day.date) ?? minStay, minStay));
        } else if (!availableCountByDate.has(day.date)) {
          availableCountByDate.set(day.date, 0);
        }
      }
    }

    const days: AggregateAvailabilityDay[] = Array.from(availableCountByDate.entries()).map(
      ([date, count]) => ({ date, isAvailable: count > 0, minimumStay: minStayByDate.get(date) ?? 1 })
    );

    return NextResponse.json(days, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 502 }
    );
  }
}

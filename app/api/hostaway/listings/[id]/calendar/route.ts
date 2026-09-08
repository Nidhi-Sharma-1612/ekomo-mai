import { NextResponse } from "next/server";
import { fetchCalendar } from "@/lib/hostaway/client";

export interface CalendarDayResponse {
  date: string;
  isAvailable: boolean;
  price: number;
  minimumStay: number;
}

/**
 * Live availability + per-night pricing for one listing. Never cached
 * (booking-critical data) — the calendar UI calls this client-side.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
    const days = await fetchCalendar(id, startDate, endDate);

    const sanitized: CalendarDayResponse[] = days.map((day) => ({
      date: day.date,
      isAvailable: Boolean(day.isAvailable) && day.status === "available",
      price: day.price,
      minimumStay: day.minimumStay ?? 1,
    }));

    return NextResponse.json(sanitized, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 502 }
    );
  }
}

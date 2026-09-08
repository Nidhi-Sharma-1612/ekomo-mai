"use client";

import { useEffect, useState, type FormEvent } from "react";
import DateRangeCalendar from "@/components/DateRangeCalendar";
import { addDays, formatDisplayDate, isAfter, nightsBetween, parseISODate, toISODate } from "@/lib/date";
import { calculateTotal } from "@/lib/pricing";
import type { Property } from "@/lib/types";
import { MailIcon, PhoneIcon } from "@/components/FooterIcons";

export default function PropertyBookingCard({
  property,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}: {
  property: Property;
  /** ISO (yyyy-mm-dd) — carried over from a homepage/listing-page search. */
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}) {
  const [checkIn, setCheckIn] = useState<Date | null>(() =>
    initialCheckIn ? parseISODate(initialCheckIn) : null
  );
  const [checkOut, setCheckOut] = useState<Date | null>(() =>
    initialCheckOut ? parseISODate(initialCheckOut) : null
  );
  const [guests, setGuests] = useState(() =>
    initialGuests ? Math.min(property.maxGuests, Math.max(1, initialGuests)) : 2
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set());
  const [priceByDate, setPriceByDate] = useState<Record<string, number>>({});
  const [minStayByDate, setMinStayByDate] = useState<Record<string, number>>({});
  const [availabilityLoading, setAvailabilityLoading] = useState(() => Boolean(property.hostawayListingId));
  const [availabilityError, setAvailabilityError] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Load live availability + pricing for the next year, once, on mount.
  useEffect(() => {
    if (!property.hostawayListingId) return;

    const controller = new AbortController();
    const today = new Date();
    const startDate = toISODate(today);
    const endDate = toISODate(addDays(today, 365));

    fetch(
      `/api/hostaway/listings/${property.hostawayListingId}/calendar?startDate=${startDate}&endDate=${endDate}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load availability");
        return res.json();
      })
      .then((days: { date: string; isAvailable: boolean; price: number; minimumStay: number }[]) => {
        const blocked = new Set<string>();
        const prices: Record<string, number> = {};
        const minStays: Record<string, number> = {};
        for (const day of days) {
          if (!day.isAvailable) blocked.add(day.date);
          prices[day.date] = day.price;
          minStays[day.date] = day.minimumStay;
        }
        setUnavailableDates(blocked);
        setPriceByDate(prices);
        setMinStayByDate(minStays);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setAvailabilityError(true);
      })
      .finally(() => setAvailabilityLoading(false));

    return () => controller.abort();
  }, [property.hostawayListingId]);

  function handleSelectDate(date: Date) {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }

    if (isAfter(date, checkIn)) {
      const minNights = minStayByDate[toISODate(checkIn)] ?? 1;
      if (nightsBetween(checkIn, date) < minNights) return; // calendar already disables these; guard anyway
      setCheckOut(date);
      setCalendarOpen(false);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  }

  function handleClearDates() {
    setCheckIn(null);
    setCheckOut(null);
  }

  function adjustGuests(delta: number) {
    setGuests((g) => Math.min(property.maxGuests, Math.max(1, g + delta)));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkIn || !checkOut) {
      setBookingError("Pick your check-in and check-out dates to continue.");
      return;
    }

    const minNights = minStayByDate[toISODate(checkIn)] ?? 1;
    if (nightsBetween(checkIn, checkOut) < minNights) {
      setBookingError(`This property requires a minimum stay of ${minNights} nights for that check-in date.`);
      return;
    }

    setBookingError(null);
    setBookingSubmitting(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: property.slug,
          checkIn: toISODate(checkIn),
          checkOut: toISODate(checkOut),
          guests,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Something went wrong starting checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Something went wrong starting checkout.");
      setBookingSubmitting(false);
    }
  }

  // Once live pricing has loaded, prefer a 180-day rolling average over the
  // listing's static "price" field — Hostaway's static field can be a stale
  // default that doesn't match what the live calendar actually charges, and a
  // ~6-month window tracks closest to what OTA-style booking widgets show.
  const rateWindowEnd = toISODate(addDays(new Date(), 180));
  const priceValues = Object.entries(priceByDate)
    .filter(([date]) => date <= rateWindowEnd)
    .map(([, price]) => price);
  const averageNightlyRate =
    priceValues.length > 0
      ? Math.round(priceValues.reduce((sum, p) => sum + p, 0) / priceValues.length)
      : property.nightlyRateFrom;

  const nightlyRateFrom = checkIn ? priceByDate[toISODate(checkIn)] : undefined;
  const displayRate = nightlyRateFrom ?? averageNightlyRate;

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;

  let priceBreakdown = null;
  if (checkIn && checkOut && nights > 0) {
    let nightlySubtotal = 0;
    let cursor = checkIn;
    for (let i = 0; i < nights; i++) {
      nightlySubtotal += priceByDate[toISODate(cursor)] ?? averageNightlyRate ?? 0;
      cursor = addDays(cursor, 1);
    }
    priceBreakdown = calculateTotal(property, nightlySubtotal, nights, guests);
  }

  return (
    <div className="sticky top-28 rounded-3xl bg-sand-dark/40 p-8 shadow-sm ring-1 ring-ink/5">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">Nightly Rate</p>
      <p className="mt-2 flex items-baseline gap-1 font-serif text-3xl text-ink">
        {property.hostawayListingId && availabilityLoading ? (
          <span className="font-sans text-lg font-normal text-ink/40">Checking live rates…</span>
        ) : displayRate ? (
          <>
            ${displayRate}
            <span className="text-base font-sans font-normal text-ink/50">/ night</span>
          </>
        ) : (
          "Rates available on inquiry"
        )}
      </p>
      {property.hostawayListingId && !availabilityLoading && (
        <p className="mt-1 text-xs text-ink/45">
          {availabilityError
            ? "Couldn't load live availability — contact us to confirm dates."
            : "Live availability shown below"}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10">
          <button
            type="button"
            onClick={() => setCalendarOpen((v) => !v)}
            className="flex flex-col items-start gap-0.5 border-r border-ink/10 px-4 py-3 text-left transition-colors hover:bg-sand-dark/30"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
              Check-in
            </span>
            <span className="text-sm font-medium text-ink">
              {checkIn ? formatDisplayDate(checkIn) : "Add date"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setCalendarOpen((v) => !v)}
            className="flex flex-col items-start gap-0.5 px-4 py-3 text-left transition-colors hover:bg-sand-dark/30"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
              Check-out
            </span>
            <span className="text-sm font-medium text-ink">
              {checkOut ? formatDisplayDate(checkOut) : "Add date"}
            </span>
          </button>
        </div>

        {calendarOpen && (
          <div className="rounded-2xl bg-white p-4 ring-1 ring-ink/10">
            <DateRangeCalendar
              checkIn={checkIn}
              checkOut={checkOut}
              onSelect={handleSelectDate}
              onClear={handleClearDates}
              unavailableDates={unavailableDates}
              priceByDate={priceByDate}
              minStayByDate={minStayByDate}
              singleMonth
            />
          </div>
        )}

        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-ink/10">
          <span className="text-sm font-medium text-ink">
            {guests} guest{guests > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => adjustGuests(-1)}
              aria-label="Decrease guests"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ocean hover:text-ocean disabled:opacity-30"
              disabled={guests <= 1}
            >
              &minus;
            </button>
            <button
              type="button"
              onClick={() => adjustGuests(1)}
              aria-label="Increase guests"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ocean hover:text-ocean disabled:opacity-30"
              disabled={guests >= property.maxGuests}
            >
              +
            </button>
          </div>
        </div>

        {priceBreakdown && (
          <div className="space-y-2 rounded-2xl bg-white px-4 py-3.5 text-sm ring-1 ring-ink/10">
            <div className="flex items-center justify-between text-ink/70">
              <span>
                ${(priceBreakdown.nightlySubtotal / priceBreakdown.nights).toFixed(0)} x{" "}
                {priceBreakdown.nights} night{priceBreakdown.nights > 1 ? "s" : ""}
              </span>
              <span>${priceBreakdown.nightlySubtotal.toFixed(2)}</span>
            </div>
            {priceBreakdown.cleaningFee > 0 && (
              <div className="flex items-center justify-between text-ink/70">
                <span>Cleaning fee</span>
                <span>${priceBreakdown.cleaningFee.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.checkinFee > 0 && (
              <div className="flex items-center justify-between text-ink/70">
                <span>Check-in fee</span>
                <span>${priceBreakdown.checkinFee.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.tax > 0 && (
              <div className="flex items-center justify-between text-ink/70">
                <span>Taxes</span>
                <span>${priceBreakdown.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-ink/10 pt-2 font-semibold text-ink">
              <span>Total</span>
              <span>${priceBreakdown.total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {bookingError && <p className="text-sm text-red-500">{bookingError}</p>}

        <button
          type="submit"
          disabled={bookingSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {bookingSubmitting ? "Redirecting to checkout…" : "Book Now"}
        </button>
      </form>

      <div className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm text-ink/60">
        <p className="font-semibold text-ink/70">Questions before you book?</p>
        <a
          href="mailto:pahiatrinh@gmail.com"
          className="flex items-center gap-2.5 font-semibold text-ocean transition-colors hover:text-ocean-deep"
        >
          <MailIcon className="shrink-0" />
          pahiatrinh@gmail.com
        </a>
        <a
          href="tel:+17707145258"
          className="flex items-center gap-2.5 font-semibold text-ocean transition-colors hover:text-ocean-deep"
        >
          <PhoneIcon className="shrink-0" />
          +1 (770) 714-5258
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink/10 pt-4 text-[11px] font-semibold uppercase tracking-wide text-ink/45">
        <span>Superhost Rated</span>
        <span aria-hidden="true">&middot;</span>
        <span>Book Direct, No Fees</span>
      </div>
    </div>
  );
}

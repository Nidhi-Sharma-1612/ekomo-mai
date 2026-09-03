"use client";

import { useState, type FormEvent } from "react";
import DateRangeCalendar from "@/components/DateRangeCalendar";
import { formatDisplayDate, isAfter } from "@/lib/date";
import type { Property } from "@/lib/types";
import { MailIcon, PhoneIcon } from "@/components/FooterIcons";

export default function PropertyBookingCard({ property }: { property: Property }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [calendarOpen, setCalendarOpen] = useState(false);

  function handleSelectDate(date: Date) {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }

    if (isAfter(date, checkIn)) {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No-op for now — wire up to Stripe checkout once payments are integrated.
  }

  return (
    <div className="sticky top-28 rounded-3xl bg-sand-dark/40 p-8 shadow-sm ring-1 ring-ink/5">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">Nightly Rate</p>
      <p className="mt-2 flex items-baseline gap-1 font-serif text-3xl text-ink">
        {property.nightlyRateFrom ? (
          <>
            ${property.nightlyRateFrom}
            <span className="text-base font-sans font-normal text-ink/50">/ night</span>
          </>
        ) : (
          "Rates available on inquiry"
        )}
      </p>

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

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-deep"
        >
          Book Now
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

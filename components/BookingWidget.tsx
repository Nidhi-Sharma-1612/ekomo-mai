"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import DateRangeCalendar from "@/components/DateRangeCalendar";
import { formatDisplayDate, isAfter, toISODate } from "@/lib/date";

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-ocean">
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9.5H20.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 3V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-ocean">
      <circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 19.5C3.5 16.4624 6.13401 14 9 14C11.866 14 14.5 16.4624 14.5 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15.5 6.5C16.8807 6.5 18 7.61929 18 9C18 10.3807 16.8807 11.5 15.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17 14.2C19.0141 14.7439 20.5 16.6461 20.5 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function BookingWidget() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const widgetRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    }
    if (calendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [calendarOpen]);

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
    setGuests((g) => Math.min(10, Math.max(1, g + delta)));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No live inventory yet — routes to the properties list with the
    // search intent preserved. Swap for a real Hostaway availability
    // search once the API is connected.
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", toISODate(checkIn));
    if (checkOut) params.set("checkOut", toISODate(checkOut));
    params.set("guests", String(guests));
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      ref={widgetRef}
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-2 rounded-4xl bg-white/98 p-3 shadow-[0_20px_60px_-15px_rgba(10,79,87,0.35)] ring-1 ring-black/5 backdrop-blur-md sm:p-3 md:flex-row md:items-stretch md:gap-0 md:rounded-full"
    >
      <button
        type="button"
        onClick={() => setCalendarOpen((v) => !v)}
        className="flex flex-1 items-center gap-3 rounded-2xl px-5 py-3 text-left transition-colors hover:bg-sand-dark/30 md:rounded-none"
      >
        <CalendarIcon />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">
            Check-in
          </span>
          <span className="text-sm font-medium text-ink">
            {checkIn ? formatDisplayDate(checkIn) : "Add date"}
          </span>
        </div>
      </button>

      <div className="hidden w-px shrink-0 self-center bg-ink/10 md:block md:h-10" />
      <div className="h-px shrink-0 bg-ink/10 md:hidden" />

      <button
        type="button"
        onClick={() => setCalendarOpen((v) => !v)}
        className="flex flex-1 items-center gap-3 rounded-2xl px-5 py-3 text-left transition-colors hover:bg-sand-dark/30 md:rounded-none"
      >
        <CalendarIcon />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">
            Check-out
          </span>
          <span className="text-sm font-medium text-ink">
            {checkOut ? formatDisplayDate(checkOut) : "Add date"}
          </span>
        </div>
      </button>

      <div className="hidden w-px shrink-0 self-center bg-ink/10 md:block md:h-10" />
      <div className="h-px shrink-0 bg-ink/10 md:hidden" />

      <div className="flex flex-1 items-center gap-3 rounded-2xl px-5 py-3 text-left md:rounded-none">
        <UsersIcon />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">
            Guests
          </span>
          <span className="text-sm font-medium text-ink">
            {guests} guest{guests > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
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
            disabled={guests >= 10}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-deep md:mt-0 md:ml-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="whitespace-nowrap">Check Availability</span>
      </button>

      {calendarOpen && (
        <div className="absolute left-0 right-0 top-full z-30 mt-3 max-w-full rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-black/5 md:left-1/2 md:right-auto md:w-115 md:-translate-x-1/2">
          <DateRangeCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onSelect={handleSelectDate}
            onClear={handleClearDates}
          />
        </div>
      )}
    </form>
  );
}

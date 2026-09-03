"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  buildMonthGrid,
  formatMonthYear,
  isAfter,
  isBefore,
  isSameDay,
  startOfDay,
  type CalendarDay,
} from "@/lib/date";

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

export default function DateRangeCalendar({
  checkIn,
  checkOut,
  onSelect,
  onClear,
  singleMonth = false,
}: {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (date: Date) => void;
  onClear: () => void;
  /** Force a single month even at widths that would normally show two — for narrow containers like a sidebar. */
  singleMonth?: boolean;
}) {
  const today = startOfDay(new Date());
  const [viewMonth, setViewMonth] = useState(() => addMonths(checkIn ?? today, 0));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const secondMonth = addMonths(viewMonth, 1);
  const canGoBack = isAfter(viewMonth, today) || viewMonth.getMonth() === today.getMonth();

  const previewEnd =
    checkIn && !checkOut && hoverDate && isAfter(hoverDate, checkIn) ? hoverDate : null;
  const rangeEnd = checkOut ?? previewEnd;

  function renderMonth(monthDate: Date, key: string) {
    const weeks = buildMonthGrid(monthDate.getFullYear(), monthDate.getMonth());

    return (
      <div key={key} className="flex-1">
        <p className="text-center font-serif text-sm text-ink">
          {formatMonthYear(monthDate)}
        </p>

        <div className="mt-2 grid grid-cols-7 gap-y-1 text-center text-[10px] font-semibold uppercase tracking-wide text-ink/40">
          {weekdayLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        <div className="mt-0.5 flex flex-col gap-0.5">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7">
              {week.map((day, dayIdx) => (
                <DayCell
                  key={dayIdx}
                  day={day}
                  today={today}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  rangeEnd={rangeEnd}
                  onSelect={onSelect}
                  onHover={setHoverDate}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" onMouseLeave={() => setHoverDate(null)}>
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => canGoBack && setViewMonth((m) => addMonths(m, -1))}
          disabled={!canGoBack}
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-sand-dark disabled:opacity-0"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/40">
          Select check-in &amp; check-out
        </span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-sand-dark"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>

      <div className={`mt-2 flex flex-col gap-4 ${singleMonth ? "" : "md:flex-row md:gap-5"}`}>
        {renderMonth(viewMonth, "month-0")}
        {!singleMonth && <div className="hidden md:block">{renderMonth(secondMonth, "month-1")}</div>}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-ink/60 underline-offset-2 hover:text-ocean hover:underline"
        >
          Clear dates
        </button>
        <div className="flex items-center gap-3 text-[11px] text-ink/50">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-ocean-deep" /> Selected
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-ocean/20" /> In range
          </span>
        </div>
      </div>
    </div>
  );
}

function DayCell({
  day,
  today,
  checkIn,
  checkOut,
  rangeEnd,
  onSelect,
  onHover,
}: {
  day: CalendarDay;
  today: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  rangeEnd: Date | null;
  onSelect: (date: Date) => void;
  onHover: (date: Date | null) => void;
}) {
  const { date, isCurrentMonth } = day;
  const isPast = isBefore(date, today);
  const disabled = isPast || !isCurrentMonth;

  const isStart = isSameDay(date, checkIn);
  const isEnd = isSameDay(date, checkOut) || (!checkOut && isSameDay(date, rangeEnd) && !isStart);
  const inRange =
    !!checkIn &&
    !!rangeEnd &&
    isAfter(date, checkIn) &&
    isBefore(date, rangeEnd) &&
    isCurrentMonth;

  const showBarLeft = (inRange || isEnd) && !isStart;
  const showBarRight = (inRange || isStart) && !isEnd;
  const showBar = isCurrentMonth && !!checkIn && !!rangeEnd && (inRange || isStart || isEnd);

  return (
    <div className="relative flex h-8 w-full items-center justify-center">
      {showBar && (
        <div
          aria-hidden="true"
          className="absolute inset-y-0.5 bg-ocean/15"
          style={{
            left: showBarLeft ? 0 : "50%",
            right: showBarRight ? 0 : "50%",
          }}
        />
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelect(date)}
        onMouseEnter={() => onHover(date)}
        className={[
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
          disabled
            ? "cursor-not-allowed text-ink/20"
            : isStart || isEnd
              ? "bg-ocean-deep text-white shadow-sm"
              : "text-ink hover:bg-sand-dark",
        ].join(" ")}
      >
        {date.getDate()}
      </button>
    </div>
  );
}

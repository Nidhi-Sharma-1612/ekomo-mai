"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getAmenityIcon } from "@/components/AmenityIcon";

const INITIAL_COUNT = 8;

export default function AmenitiesList({ amenities }: { amenities: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = amenities.length > INITIAL_COUNT;
  const visible = expanded ? amenities : amenities.slice(0, INITIAL_COUNT);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {visible.map((amenity) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <li key={amenity} className="flex items-center gap-3 text-sm text-ink/75">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-palm/10 text-palm">
                <Icon size={16} strokeWidth={1.75} />
              </span>
              {amenity}
            </li>
          );
        })}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ocean transition-colors hover:border-ocean hover:text-ocean-deep"
        >
          {expanded ? "Show less" : `Show all ${amenities.length} amenities`}
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}

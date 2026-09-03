import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/lib/types";
import { BathIcon, BedIcon, GuestsIcon } from "@/components/PropertyIcons";

export default function PropertyCard({
  property,
  adaptive = false,
  emphasis = false,
}: {
  property: Property;
  /** Full-bleed image with an overlay caption, sized to fill a parent grid cell — for the bento-style "Our Homes" layout. */
  adaptive?: boolean;
  /** Slightly larger type treatment for a featured/hero card. */
  emphasis?: boolean;
}) {
  const cover = property.images[0];

  if (adaptive) {
    return (
      <Link
        href={`/properties/${property.slug}`}
        className="group relative isolate flex h-full min-h-56 flex-col justify-end overflow-hidden rounded-3xl shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-xl"
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ocean-deep/95 via-ocean-deep/45 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-ocean-deep">
          {property.location}
        </span>
        {property.nightlyRateFrom && (
          <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold tracking-wide text-ocean-deep">
            ${property.nightlyRateFrom}/night
          </span>
        )}

        <div className="relative z-10 p-6 text-white">
          <p
            className={`font-serif italic text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${emphasis ? "text-base" : "text-sm"}`}
          >
            {property.resort}
          </p>
          <h3 className={`mt-1 font-serif drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] ${emphasis ? "text-2xl" : "text-lg"}`}>
            {property.name}
          </h3>
          {emphasis && (
            <p className="mt-2 max-w-sm text-sm text-sand/90">{property.tagline}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-sand/85">
            <span className="flex items-center gap-1.5">
              <BedIcon /> {property.bedrooms} bd
            </span>
            <span className="flex items-center gap-1.5">
              <BathIcon /> {property.bathrooms} ba
            </span>
            <span className="flex items-center gap-1.5">
              <GuestsIcon /> Sleeps {property.maxGuests}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-ocean-deep">
          {property.location}
        </span>
      </div>
      <div className="p-6">
        <p className="font-serif text-sm italic text-gold">{property.resort}</p>
        <h3 className="mt-1 font-serif text-xl text-ink">{property.name}</h3>
        <p className="mt-2 text-sm text-ink/70">{property.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/60">
          <span className="flex items-center gap-1.5">
            <BedIcon /> {property.bedrooms} bd
          </span>
          <span className="flex items-center gap-1.5">
            <BathIcon /> {property.bathrooms} ba
          </span>
          <span className="flex items-center gap-1.5">
            <GuestsIcon /> Sleeps {property.maxGuests}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="text-sm text-ink/60">
            {property.nightlyRateFrom
              ? `From $${property.nightlyRateFrom}/night`
              : "Rates on inquiry"}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-ocean transition-colors group-hover:text-ocean-deep">
            View Details
            <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

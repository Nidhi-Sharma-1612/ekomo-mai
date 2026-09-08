import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProperties } from "@/lib/hostaway/getProperties";
import PropertyCard from "@/components/PropertyCard";
import SectionHeading from "@/components/SectionHeading";

export default async function FeaturedProperties() {
  const properties = await getAllProperties();
  const [featured, ...rest] = properties;

  if (!featured) return null;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our Homes"
            title="Oceanfront condos across West Maui"
            description="Every unit is hand-managed by us, not a faceless property manager — hosted, cleaned, and checked in with real Aloha spirit."
          />
          <Link
            href="/properties"
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-ocean transition-colors hover:text-ocean-deep sm:inline-flex"
          >
            View all properties
            <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/*
          Purpose-built for exactly 3 properties: one tall featured card on the
          left, the other two stacked on the right. Grid auto-placement fills
          both right-hand cells without needing per-card span overrides, so
          there's no gap or uneven sizing at any breakpoint.
        */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:grid-rows-2 sm:h-140">
          <div className="sm:row-span-2">
            <PropertyCard property={featured} adaptive emphasis />
          </div>
          {rest.map((property) => (
            <PropertyCard key={property.id} property={property} adaptive />
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-semibold text-ocean">
            View all properties
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

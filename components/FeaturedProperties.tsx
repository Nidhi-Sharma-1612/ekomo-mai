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

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:h-140">
          {/*
            The bento layout (featured card spanning 2x2, one wide card, two
            square cards) only makes sense once lg:grid-cols-4 kicks in. Below
            that, no col-span overrides are applied at all — every card falls
            back to the plain 2-column tablet / 1-column mobile grid, so all
            four render at a consistent, uniform size instead of two full-width
            cards followed by two half-width ones.
          */}
          <div className="lg:col-span-2 lg:row-span-2">
            <PropertyCard property={featured} adaptive emphasis />
          </div>
          {rest.map((property, i) => (
            <div key={property.id} className={i === 0 ? "lg:col-span-2 lg:row-span-1" : "lg:col-span-1 lg:row-span-1"}>
              <PropertyCard property={property} adaptive />
            </div>
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

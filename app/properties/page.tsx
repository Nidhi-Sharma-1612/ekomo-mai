import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PropertyGrid from "@/components/PropertyGrid";
import Reveal from "@/components/Reveal";
import { properties } from "@/lib/data/properties";
import heroImage from "@/public/images/stock/beach-palms-sailboat.jpg";

export const metadata: Metadata = {
  title: "Properties | E Komo Mai Vacation Rentals",
  description:
    "Browse our oceanfront condos across Lahaina and Kaanapali, Maui — hand-managed by Louis & Kristine Trinh.",
};

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Homes"
        title="Every property, hand-managed"
        description="From honeymoon studios to resort-style condos with room for the family — each one hosted with real Aloha spirit."
        image={heroImage}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/10 pb-8">
              <p className="font-serif text-lg text-ink">
                Showing all {properties.length} properties
              </p>
              <p className="text-sm text-ink/60">
                Oceanfront condos in Lahaina &amp; Kaanapali, West Maui
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            <PropertyGrid properties={properties} columns={2} />
          </div>
        </div>
      </section>
    </>
  );
}

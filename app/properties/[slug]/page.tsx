import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { properties, getPropertyBySlug } from "@/lib/data/properties";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyGrid from "@/components/PropertyGrid";
import PropertyBookingCard from "@/components/PropertyBookingCard";
import MapEmbed from "@/components/MapEmbed";
import GoodToKnow from "@/components/GoodToKnow";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { ArrowLeft } from "lucide-react";
import { BathIcon, BedIcon, CheckIcon, GuestsIcon } from "@/components/PropertyIcons";
import { PinIcon } from "@/components/FooterIcons";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata(
  props: PageProps<"/properties/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const property = getPropertyBySlug(slug);

  if (!property) return {};

  return {
    title: `${property.name} | E Komo Mai Vacation Rentals`,
    description: property.description,
  };
}

export default async function PropertyDetailPage(
  props: PageProps<"/properties/[slug]">
) {
  const { slug } = await props.params;
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  const otherProperties = properties.filter((p) => p.slug !== slug);

  return (
    <>
      <section className="pt-10">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/properties"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ocean transition-colors hover:text-ocean-deep"
          >
            <ArrowLeft size={16} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
            Back to all properties
          </Link>

          <Reveal className="mt-6">
            <PropertyGallery images={property.images} />
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        {/*
          A single flattened grid so the booking card can slot in right after the
          header on mobile (via `order`) while still sitting beside the content as
          a tall sidebar on desktop (via explicit col/row placement). The booking
          card is deliberately NOT wrapped in <Reveal> — a transform on any
          ancestor (even translate-y-0) creates a new containing block and would
          break its `sticky` positioning.
        */}
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2 lg:col-start-1 lg:row-start-1">
            <div className="flex items-center gap-2 font-serif text-base italic text-gold">
              <span>{property.resort}</span>
              <span aria-hidden="true" className="text-ink/30">&middot;</span>
              <span className="inline-flex items-center gap-1 not-italic text-sm font-sans font-semibold text-ink/60">
                <PinIcon className="text-ocean" />
                {property.location}
              </span>
            </div>
            <h1 className="mt-2 font-serif text-4xl text-ink">{property.name}</h1>
            <p className="mt-3 text-lg text-ink/70">{property.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-6 border-y border-ink/10 py-5 text-sm text-ink/70">
              <span className="flex items-center gap-2">
                <BedIcon className="text-ocean" />
                {property.bedrooms} Bedroom{property.bedrooms > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-2">
                <BathIcon className="text-ocean" />
                {property.bathrooms} Bathroom{property.bathrooms > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-2">
                <GuestsIcon className="text-ocean" />
                Sleeps {property.maxGuests}
              </span>
            </div>

            <div className="mt-8 space-y-4 text-base leading-relaxed text-ink/80">
              <p>{property.longDescription}</p>
            </div>
          </Reveal>

          <div className="order-2 lg:order-0 lg:col-start-3 lg:row-span-4 lg:row-start-1">
            <PropertyBookingCard property={property} />
          </div>

          <Reveal
            delay={100}
            className="order-3 lg:order-0 lg:col-span-2 lg:col-start-1 lg:row-start-2"
          >
            <h2 className="font-serif text-2xl text-ink">Amenities</h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {property.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-3 text-sm text-ink/75">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-palm/10 text-palm">
                    <CheckIcon />
                  </span>
                  {amenity}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={150}
            className="order-4 lg:order-0 lg:col-span-2 lg:col-start-1 lg:row-start-3"
          >
            <h2 className="font-serif text-2xl text-ink">Location</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink/70">
              <PinIcon className="text-ocean" />
              {property.address}
            </p>
            <div className="mt-4">
              <MapEmbed
                lat={property.coordinates.lat}
                lng={property.coordinates.lng}
                label={`${property.resort}, ${property.location}`}
              />
            </div>
          </Reveal>

          <Reveal
            delay={200}
            className="order-5 lg:order-0 lg:col-span-2 lg:col-start-1 lg:row-start-4"
          >
            <GoodToKnow />
          </Reveal>
        </div>
      </section>

      {otherProperties.length > 0 && (
        <section className="border-t border-ink/10 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <SectionHeading eyebrow="More Homes" title="You might also like" />
            </Reveal>
            <div className="mt-12">
              <PropertyGrid properties={otherProperties} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

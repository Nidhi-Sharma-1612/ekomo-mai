import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProperties, getAllSlugs, getPropertyBySlug } from "@/lib/hostaway/getProperties";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyGrid from "@/components/PropertyGrid";
import PropertyBookingCard from "@/components/PropertyBookingCard";
import MapEmbed from "@/components/MapEmbed";
import GoodToKnow from "@/components/GoodToKnow";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { parseDescriptionBlocks } from "@/lib/formatDescription";
import AmenitiesList from "@/components/AmenitiesList";
import { ArrowLeft } from "lucide-react";
import { BathIcon, BedIcon, GuestsIcon } from "@/components/PropertyIcons";
import { PinIcon } from "@/components/FooterIcons";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Revalidate periodically so listing details, and the fallback price shown
// before the live calendar loads, stay in sync with Hostaway.
export const revalidate = 3600;

export async function generateMetadata(
  props: PageProps<"/properties/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const property = await getPropertyBySlug(slug);

  if (!property) return {};

  return {
    title: `${property.name} | LahainaOceanfrontRentals`,
    description: property.description,
  };
}

export default async function PropertyDetailPage(
  props: PageProps<"/properties/[slug]">
) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const initialCheckIn = typeof searchParams.checkIn === "string" ? searchParams.checkIn : undefined;
  const initialCheckOut = typeof searchParams.checkOut === "string" ? searchParams.checkOut : undefined;
  const initialGuests = typeof searchParams.guests === "string" ? Number(searchParams.guests) : undefined;

  const allProperties = await getAllProperties();
  const otherProperties = allProperties.filter((p) => p.slug !== slug);
  const descriptionBlocks = parseDescriptionBlocks(property.longDescription);

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

            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/80">
              {descriptionBlocks.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h3 key={i} className="pt-2 font-serif text-xl text-ink first:pt-0">
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="space-y-2.5">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i}>{block.text}</p>;
              })}
            </div>
          </Reveal>

          <div className="order-2 lg:order-0 lg:col-start-3 lg:row-span-4 lg:row-start-1">
            <PropertyBookingCard
              property={property}
              initialCheckIn={initialCheckIn}
              initialCheckOut={initialCheckOut}
              initialGuests={initialGuests}
            />
          </div>

          <Reveal
            delay={100}
            className="order-3 lg:order-0 lg:col-span-2 lg:col-start-1 lg:row-start-2"
          >
            <h2 className="font-serif text-2xl text-ink">Amenities</h2>
            <div className="mt-6">
              <AmenitiesList amenities={property.amenities} />
            </div>
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
            <GoodToKnow property={property} />
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

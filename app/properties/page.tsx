import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PropertyGrid from "@/components/PropertyGrid";
import Reveal from "@/components/Reveal";
import { getAllProperties } from "@/lib/hostaway/getProperties";
import { isRangeAvailable } from "@/lib/hostaway/availability";
import { formatDisplayDate, parseISODate } from "@/lib/date";
import heroImage from "@/public/images/stock/beach-palms-sailboat.jpg";
import { getPageSections, str } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Properties | LahainaOceanfrontRentals",
  description:
    "Browse our oceanfront condos across Lahaina and Kaanapali, Maui — hand-managed by Louis & Kristine Trinh.",
};

export default async function PropertiesPage(props: PageProps<"/properties">) {
  const searchParams = await props.searchParams;
  const checkIn = typeof searchParams.checkIn === "string" ? searchParams.checkIn : undefined;
  const checkOut = typeof searchParams.checkOut === "string" ? searchParams.checkOut : undefined;
  const guests = typeof searchParams.guests === "string" ? Number(searchParams.guests) : undefined;
  const hasSearch = Boolean(checkIn && checkOut);

  const [allProperties, sections] = await Promise.all([
    getAllProperties(),
    getPageSections("properties"),
  ]);
  const intro = sections.intro ?? {};
  const eyebrow = str(intro, "eyebrow", "Our Homes");
  const heroTitle = str(intro, "heading", "Every property, hand-managed");
  const heroDescription = str(
    intro,
    "description",
    "From honeymoon studios to resort-style condos with room for the family — each one hosted with real Aloha spirit.",
  );
  const regionText = str(intro, "regionText", "Oceanfront condos in Lahaina & Kaanapali, West Maui");

  let properties = allProperties;
  if (guests) {
    properties = properties.filter((p) => p.maxGuests >= guests);
  }

  if (checkIn && checkOut) {
    const checks = await Promise.all(
      properties
        .filter((p) => p.hostawayListingId)
        .map(async (p) => ({
          id: p.id,
          available: await isRangeAvailable(p.hostawayListingId!, checkIn, checkOut),
        }))
    );
    const unavailableIds = new Set(checks.filter((c) => !c.available).map((c) => c.id));
    properties = properties.filter((p) => !unavailableIds.has(p.id));
  }

  // Carry the search forward into each property's detail-page link.
  const searchQuery = hasSearch
    ? `?${new URLSearchParams({
        checkIn: checkIn ?? "",
        checkOut: checkOut ?? "",
        ...(guests ? { guests: String(guests) } : {}),
      }).toString()}`
    : undefined;

  return (
    <>
      <PageHero eyebrow={eyebrow} title={heroTitle} description={heroDescription} image={heroImage} />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/10 pb-8">
              <p className="font-serif text-lg text-ink">
                {hasSearch
                  ? properties.length > 0
                    ? `${properties.length} propert${properties.length > 1 ? "ies" : "y"} available for these dates`
                    : "No properties available for these dates"
                  : `Showing all ${properties.length} properties`}
              </p>
              <p className="text-sm text-ink/60">
                {hasSearch && checkIn && checkOut && parseISODate(checkIn) && parseISODate(checkOut) ? (
                  <>
                    {formatDisplayDate(parseISODate(checkIn)!)} &ndash; {formatDisplayDate(parseISODate(checkOut)!)}
                    {guests ? `, ${guests} guest${guests > 1 ? "s" : ""}` : ""}
                  </>
                ) : (
                  regionText
                )}
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            {properties.length > 0 ? (
              <PropertyGrid properties={properties} columns={2} searchQuery={searchQuery} />
            ) : (
              <p className="text-center text-ink/60">
                None of our properties are available for these dates — try a different range or fewer guests.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

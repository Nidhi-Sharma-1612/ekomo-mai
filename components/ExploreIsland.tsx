import SectionHeading from "@/components/SectionHeading";
import beachPalms from "@/public/images/stock/beach-palms-sailboat.jpg";
import reef from "@/public/images/stock/snorkeling-reef.jpg";
import paddleboard from "@/public/images/stock/paddleboard-sunset.jpg";
import birdsSunrise from "@/public/images/stock/beach-birds-sunrise.jpg";
import { FishIcon, PaddleboardIcon, SunriseIcon, UmbrellaIcon } from "@/components/ExploreIcons";
import { getPageSections, str } from "@/lib/cms";

// Icon and layout offset stay fixed per tile position — only the label and
// image are CMS-editable, so an admin can't accidentally break the icon
// lookup by editing a raw "icon name" text field.
const highlights = [
  {
    image: beachPalms.src,
    alt: "Palm-lined beach with a sailboat on the sand",
    label: "Days on the Sand",
    icon: UmbrellaIcon,
    offset: "",
  },
  {
    image: reef.src,
    alt: "Diver exploring a tropical reef teeming with fish",
    label: "Reef Diving & Snorkeling",
    icon: FishIcon,
    offset: "lg:mt-10",
  },
  {
    image: paddleboard.src,
    alt: "Paddleboarder silhouetted against a calm sunset sea",
    label: "Paddleboarding at Sunset",
    icon: PaddleboardIcon,
    offset: "",
  },
  {
    image: birdsSunrise.src,
    alt: "Birds flying over the shore at sunrise",
    label: "Sunrise Beach Walks",
    icon: SunriseIcon,
    offset: "lg:mt-10",
  },
];

function isTileOverrides(value: unknown): value is { label: string; image: string }[] {
  return (
    Array.isArray(value) &&
    value.length === highlights.length &&
    value.every(
      (v) =>
        v &&
        typeof v === "object" &&
        typeof (v as { label?: unknown }).label === "string" &&
        typeof (v as { image?: unknown }).image === "string",
    )
  );
}

export default async function ExploreIsland() {
  const sections = await getPageSections("home");
  const explore = sections.explore ?? {};
  const overrides = isTileOverrides(explore.items) ? explore.items : null;

  const tiles = highlights.map((tile, i) => ({
    ...tile,
    label: overrides ? overrides[i].label : tile.label,
    image: overrides ? overrides[i].image : tile.image,
  }));

  return (
    <section className="bg-sand-dark/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={str(explore, "eyebrow", "Explore the Island")}
          title={str(explore, "heading", "More than just a place to stay")}
          description={str(
            explore,
            "description",
            "Every condo puts you minutes from the beaches, reefs, and sunsets that make Maui unlike anywhere else.",
          )}
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {tiles.map((item) => (
            <div
              key={item.label}
              className={`group relative aspect-3/4 overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl ${item.offset}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- CMS-managed URL can be any domain */}
              <img
                src={item.image}
                alt={item.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ocean-deep/90 via-ocean-deep/20 to-transparent" />

              <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ocean-deep shadow-sm">
                <item.icon className="h-4.5 w-4.5" />
              </span>

              <p className="absolute inset-x-0 bottom-0 p-4 font-serif text-base leading-snug text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

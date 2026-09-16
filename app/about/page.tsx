import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { HeartIcon, PalmIcon, StarIcon } from "@/components/StoryIcons";
import { FishIcon, PaddleboardIcon, SunriseIcon, UmbrellaIcon } from "@/components/ExploreIcons";
import heroImage from "@/public/images/stock/paddleboard-sunset.jpg";
import founders from "@/public/images/about/founders.jpeg";
import reef from "@/public/images/stock/snorkeling-reef.jpg";
import { getPageSections, str } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About Us | LahainaOceanfrontRentals",
  description:
    "Meet Louis & Kristine Trinh, the founders of LahainaOceanfrontRentals, and the Aloha-spirit story behind every stay.",
};

const facts = [
  { icon: PalmIcon, label: "On Maui since 1995", accent: "bg-palm/10 text-palm" },
  { icon: HeartIcon, label: "Hosted personally, always", accent: "bg-gold/15 text-gold" },
  { icon: StarIcon, label: "Superhost & Premier Host rated", accent: "bg-ocean/10 text-ocean" },
];

const highlights = [
  { icon: SunriseIcon, label: "Sunrise on Haleakala" },
  { icon: FishIcon, label: "World-Class Snorkeling" },
  { icon: PaddleboardIcon, label: "Surfing & Paddleboarding" },
  { icon: UmbrellaIcon, label: "The Road to Hana" },
];

export default async function AboutPage() {
  const sections = await getPageSections("about");
  const story = sections.story ?? {};

  const eyebrow = str(story, "eyebrow", "About Us");
  const title = str(story, "title", "A love for Maui since 1995");
  const tag = str(story, "tag", "Louis & Kristine Trinh");
  const heading = str(story, "heading", "Captivated by the islands, one visit at a time");
  const paragraph1 = str(
    story,
    "paragraph1",
    "We've been captivated by the enchanting beauty of the Hawaiian Islands since 1995. There's something truly special about Maui — pristine beaches, the winding Road to Hana, sunrise hikes up Haleakala, world-class snorkeling and surfing, and a food scene that punches well above its size.",
  );
  const paragraph2 = str(
    story,
    "paragraph2",
    "And despite all it offers, Maui never feels too crowded — it's a genuine sanctuary for reconnecting with nature. Visit between December and April and you might even catch humpback whales breaching just offshore.",
  );
  const paragraph3 = str(
    story,
    "paragraph3",
    "We started LahainaOceanfrontRentals to share that feeling with every guest who stays with us — hosting each condo the way we'd want to be hosted ourselves.",
  );

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} image={heroImage} />

      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden="true"
          className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-palm/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-tl-[5rem] rounded-tr-2xl rounded-br-[5rem] rounded-bl-2xl shadow-xl shadow-ocean-deep/10 sm:aspect-4/3">
              <Image
                src={founders}
                alt="Louis and Kristine Trinh on a boat off the coast of Maui"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 left-6 rounded-2xl bg-gold px-6 py-4 shadow-xl ring-1 ring-ink/5 sm:left-10">
              <p className="font-serif text-2xl text-white">1995</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                Falling for Maui
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-serif text-lg italic text-gold">{tag}</p>
            <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">{heading}</h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70">{paragraph1}</p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">{paragraph2}</p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">{paragraph3}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {facts.map((fact) => (
                <span
                  key={fact.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink/70 shadow-sm ring-1 ring-ink/5"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${fact.accent}`}>
                    <fact.icon className="h-3.5 w-3.5" />
                  </span>
                  {fact.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="relative aspect-21/9 overflow-hidden rounded-3xl">
            <Image
              src={reef}
              alt="Scuba divers exploring a Hawaiian reef"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ocean-deep/80 via-ocean-deep/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-8 gap-y-3 p-6 sm:p-8">
              {highlights.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

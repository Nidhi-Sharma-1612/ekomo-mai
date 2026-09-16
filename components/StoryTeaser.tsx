import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import founders from "@/public/images/about/founders.jpeg";
import { HeartIcon, PalmIcon, StarIcon } from "@/components/StoryIcons";
import { getPageSections, str } from "@/lib/cms";

const facts = [
  { icon: PalmIcon, label: "30 years exploring Maui", accent: "bg-palm/10 text-palm" },
  { icon: HeartIcon, label: "Hosted personally, always", accent: "bg-gold/15 text-gold" },
  { icon: StarIcon, label: "Superhost & Premier Host rated", accent: "bg-ocean/10 text-ocean" },
];

export default async function StoryTeaser() {
  const sections = await getPageSections("home");
  const about = sections.about ?? {};

  const eyebrow = str(about, "eyebrow", "Our Story");
  const heading = str(about, "heading", "Aloha, from Louis & Kristine");
  const paragraph1 = str(
    about,
    "paragraph1",
    "We've been captivated by the enchanting beauty of the Hawaiian Islands since 1995. Maui holds something truly special — pristine beaches, the Road to Hana, sunrise over Haleakala, and a pace of life that never feels crowded, no matter the season.",
  );
  const paragraph2 = str(
    about,
    "paragraph2",
    "We built LahainaOceanfrontRentals to share that feeling with every guest who stays with us — real Aloha spirit, from booking to check-out.",
  );
  const linkLabel = str(about, "linkLabel", "Read our full story");

  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-palm/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-tl-[5rem] rounded-tr-2xl rounded-br-[5rem] rounded-bl-2xl shadow-xl shadow-ocean-deep/10 sm:aspect-4/3">
            <Image
              src={founders}
              alt="Louis and Kristine Trinh, founders of LahainaOceanfrontRentals, on a boat off the coast of Maui"
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
        </div>

        <div>
          <p className="font-serif text-lg italic text-gold">{eyebrow}</p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">{heading}</h2>
          <p className="mt-6 text-base leading-relaxed text-ink/70">{paragraph1}</p>
          <p className="mt-4 text-base leading-relaxed text-ink/70">{paragraph2}</p>

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

          <p className="mt-6 font-serif text-lg italic text-ink/80">
            &mdash; Louis &amp; Kristine, Founders
          </p>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-ocean px-7 py-3 text-sm font-semibold text-ocean transition-colors hover:bg-ocean hover:text-white"
          >
            {linkLabel}
            <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

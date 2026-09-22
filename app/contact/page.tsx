import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import Reveal from "@/components/Reveal";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from "@/components/FooterIcons";
import heroImage from "@/public/images/stock/poolside-dusk.jpg";
import { getPageSections, getSiteSettings, str } from "@/lib/cms";
import { getAllProperties } from "@/lib/hostaway/getProperties";

export const metadata: Metadata = {
  title: "Contact Us | LahainaOceanfrontRentals",
  description:
    "Get in touch with Louis & Kristine Trinh to plan your Maui stay, check availability, or ask a question about a property.",
};

export default async function ContactPage() {
  const [sections, settings, properties] = await Promise.all([
    getPageSections("contact"),
    getSiteSettings(),
    getAllProperties(),
  ]);
  const propertyNames = properties.map((p) => p.name);
  const intro = sections.intro ?? {};

  const eyebrow = str(intro, "eyebrow", "Get in Touch");
  const heroTitle = str(intro, "heading", "Let's plan your Maui stay");
  const heroDescription = str(
    intro,
    "description",
    "Questions about a property, dates, or the island itself? We usually respond within the hour.",
  );
  const formHeading = str(intro, "formHeading", "Send us a message");
  const formSubtext = str(
    intro,
    "formSubtext",
    "Fill out the form below and we'll get back to you shortly.",
  );
  const trustNote = str(
    intro,
    "trustNote",
    "Held to Airbnb Superhost and VRBO Premier Host standards — expect a reply within the hour during normal waking hours in Hawaii.",
  );

  const email = settings?.email ?? "pahiatrinh@gmail.com";
  const phone = settings?.phone ?? "+1 (770) 714-5258";
  const phoneDigits = phone.replace(/[^\d+]/g, "");
  const facebookUrl = settings?.socialLinks?.facebook ?? "https://www.facebook.com/E.Komo.Mai.Maui";
  const instagramUrl = settings?.socialLinks?.instagram ?? "https://www.instagram.com/westmauirentals/";
  const pageHeroImage = str(intro, "heroImage", heroImage.src);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={heroTitle} description={heroDescription} image={pageHeroImage} />

      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden="true"
          className="absolute -left-20 top-0 -z-10 h-72 w-72 rounded-full bg-ocean/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-3">
          <Reveal className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-ink/5 lg:col-span-2 sm:p-10">
            <h2 className="font-serif text-2xl text-ink">{formHeading}</h2>
            <p className="mt-2 text-sm text-ink/60">{formSubtext}</p>
            <div className="mt-8">
              <ContactForm email={email} propertyNames={propertyNames} />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={100} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
              <h3 className="font-serif text-lg text-ink">Direct Contact</h3>
              <p className="mt-2 text-sm font-medium text-ink/80">Louis & Kristine Trinh</p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 font-semibold text-ocean transition-colors hover:text-ocean-deep"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                    <MailIcon />
                  </span>
                  {email}
                </a>
                <a
                  href={`tel:${phoneDigits}`}
                  className="flex items-center gap-3 font-semibold text-ocean transition-colors hover:text-ocean-deep"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                    <PhoneIcon />
                  </span>
                  {phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={150} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
              <h3 className="font-serif text-lg text-ink">Follow Along</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean/10 text-ocean transition-colors hover:bg-ocean hover:text-white"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean/10 text-ocean transition-colors hover:bg-ocean hover:text-white"
                >
                  <InstagramIcon />
                </a>
              </div>
            </Reveal>

            <Reveal delay={200} className="rounded-3xl bg-gold/10 p-6">
              <p className="text-sm leading-relaxed text-ink/70">{trustNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <MapEmbed lat={20.9367} lng={-156.6947} label="West Maui, Hawaii" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

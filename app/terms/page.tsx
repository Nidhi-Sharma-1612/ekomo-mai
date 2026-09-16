import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import heroImage from "@/public/images/stock/beach-birds-sunrise.jpg";
import { getPageSections, str } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Terms & Conditions | LahainaOceanfrontRentals",
  description:
    "The terms and conditions for booking and staying at a LahainaOceanfrontRentals property.",
};

const DEFAULT_SECTIONS = [
  {
    heading: "Acceptance of Terms",
    body: "By using this website or booking a stay with LahainaOceanfrontRentals, you agree to the terms outlined below. If you do not agree, please do not use this site or book a property with us.",
  },
  {
    heading: "Bookings & Payments",
    body: "Rates shown on this website are our best current estimate and are subject to change until confirmed at the time of booking. Payment is collected securely online at checkout to confirm your reservation.",
  },
  {
    heading: "Cancellation Policy",
    body: 'Each property listing includes a "Good to Know" section with its cancellation window and refund tiers. Please review the specific policy for your property before booking — see an example on any property page.',
  },
  {
    heading: "House Rules",
    body: "Standard house rules (check-in/check-out times, no smoking, no parties, no pets, and quiet hours) apply to all stays unless otherwise noted on the property page. Violation of house rules may result in loss of deposit or removal from the property without refund.",
  },
  {
    heading: "Guest Responsibilities",
    body: "Guests are responsible for leaving the property in the condition it was found, reporting any damage promptly, and complying with the resort or building's own rules where applicable.",
  },
  {
    heading: "Liability & Damages",
    body: "LahainaOceanfrontRentals is not liable for personal injury, loss, or damage to personal property during your stay, except where required by law. Guests may be charged for damage beyond normal wear and tear.",
  },
  {
    heading: "Intellectual Property",
    body: "All text, photos, and branding on this website belong to LahainaOceanfrontRentals and may not be reproduced without permission.",
  },
  {
    heading: "Governing Law",
    body: "These terms are governed by the laws of the State of Hawaii, without regard to conflict-of-law principles.",
  },
  {
    heading: "Changes to These Terms",
    body: 'We may update these terms from time to time. The "last updated" date above reflects the most recent revision.',
  },
  {
    heading: "Contact Us",
    body: "Questions about these terms? Email us at pahiatrinh@gmail.com.",
  },
];

function isSectionList(value: unknown): value is { heading: string; body: string }[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => v && typeof v === "object" && "heading" in v && "body" in v)
  );
}

export default async function TermsPage() {
  const pageSections = await getPageSections("terms");
  const body = pageSections.body ?? {};

  const lastUpdated = str(body, "lastUpdated", "Last updated September 2026");
  const legalSections = isSectionList(body.sections) ? body.sections : DEFAULT_SECTIONS;
  const pageHeroImage = str(body, "heroImage", heroImage.src);

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description={lastUpdated}
        image={pageHeroImage}
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-10 text-base leading-relaxed text-ink/80">
            {legalSections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-2xl text-ink">{section.heading}</h2>
                {section.heading === "Cancellation Policy" ? (
                  <p className="mt-3">
                    Each property listing includes a &ldquo;Good to Know&rdquo; section with its
                    cancellation window and refund tiers. Please review the specific policy for
                    your property before booking — see an example on any{" "}
                    <Link href="/properties" className="font-semibold text-ocean hover:text-ocean-deep">
                      property page
                    </Link>
                    .
                  </p>
                ) : (
                  section.body.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mt-3">
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

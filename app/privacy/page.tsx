import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import heroImage from "@/public/images/stock/snorkeling-reef.jpg";
import { getPageSections, str } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Privacy Policy | LahainaOceanfrontRentals",
  description:
    "How LahainaOceanfrontRentals collects, uses, and protects your information.",
};

const DEFAULT_SECTIONS = [
  {
    heading: "Introduction",
    body: 'LahainaOceanfrontRentals ("we," "us," or "our") respects your privacy. This policy explains what information we collect through this website, how we use it, and the choices you have.',
  },
  {
    heading: "Information We Collect",
    body: "Contact form submissions — name, email address, phone number, travel dates, and any message you send us.\n\nBooking inquiries — property preferences, check-in/check-out dates, and number of guests entered into the booking widget.\n\nUsage data — pages visited and general device/browser information collected automatically for basic site analytics.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information you provide to respond to inquiries, coordinate bookings and stays, and improve this website. We do not sell your personal information.",
  },
  {
    heading: "Sharing Your Information",
    body: "We may share limited information with service providers who help us operate this business — for example, our property management/booking platform (Hostaway) and our payment processor (Stripe) to handle reservations and payments securely. We do not share your information with third parties for their own marketing purposes.",
  },
  {
    heading: "Cookies",
    body: "This site may use basic cookies or similar technologies to remember preferences and understand how visitors use the site. You can disable cookies in your browser settings, though some features may not work as intended.",
  },
  {
    heading: "Data Security",
    body: "We take reasonable steps to protect the information you share with us. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
  },
  {
    heading: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us using the details below.",
  },
  {
    heading: "Children's Privacy",
    body: "This website is not directed at children under 13, and we do not knowingly collect personal information from children.",
  },
  {
    heading: "Changes to This Policy",
    body: 'We may update this policy from time to time. The "last updated" date above reflects the most recent revision.',
  },
  {
    heading: "Contact Us",
    body: "Questions about this policy? Email us at pahiatrinh@gmail.com.",
  },
];

function isSectionList(value: unknown): value is { heading: string; body: string }[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => v && typeof v === "object" && "heading" in v && "body" in v)
  );
}

export default async function PrivacyPolicyPage() {
  const pageSections = await getPageSections("privacy-policy");
  const body = pageSections.body ?? {};

  const lastUpdated = str(body, "lastUpdated", "Last updated September 2026");
  const legalSections = isSectionList(body.sections) ? body.sections : DEFAULT_SECTIONS;

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description={lastUpdated} image={heroImage} />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-10 text-base leading-relaxed text-ink/80">
            {legalSections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-2xl text-ink">{section.heading}</h2>
                {section.body.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mt-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

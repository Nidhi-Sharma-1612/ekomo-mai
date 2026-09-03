import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import heroImage from "@/public/images/stock/beach-birds-sunrise.jpg";

export const metadata: Metadata = {
  title: "Terms & Conditions | E Komo Mai Vacation Rentals",
  description:
    "The terms and conditions for booking and staying at an E Komo Mai Vacation Rentals property.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Last updated September 2026"
        image={heroImage}
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-10 text-base leading-relaxed text-ink/80">
            <div>
              <h2 className="font-serif text-2xl text-ink">Acceptance of Terms</h2>
              <p className="mt-3">
                By using this website or booking a stay with E Komo Mai
                Vacation Rentals, you agree to the terms outlined below. If
                you do not agree, please do not use this site or book a
                property with us.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Bookings &amp; Payments</h2>
              <p className="mt-3">
                Rates shown on this website are our best current estimate and
                are subject to change until confirmed at the time of booking.
                A deposit or full payment may be required to secure your
                reservation; accepted payment methods will be provided during
                checkout once our online payment system is live.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Cancellation Policy</h2>
              <p className="mt-3">
                Each property listing includes a &ldquo;Good to Know&rdquo;
                section with its cancellation window and refund tiers. Please
                review the specific policy for your property before booking —
                see an example on any{" "}
                <Link href="/properties" className="font-semibold text-ocean hover:text-ocean-deep">
                  property page
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">House Rules</h2>
              <p className="mt-3">
                Standard house rules (check-in/check-out times, no smoking, no
                parties, no pets, and quiet hours) apply to all stays unless
                otherwise noted on the property page. Violation of house
                rules may result in loss of deposit or removal from the
                property without refund.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Guest Responsibilities</h2>
              <p className="mt-3">
                Guests are responsible for leaving the property in the
                condition it was found, reporting any damage promptly, and
                complying with the resort or building&rsquo;s own rules where
                applicable.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Liability &amp; Damages</h2>
              <p className="mt-3">
                E Komo Mai Vacation Rentals is not liable for personal injury,
                loss, or damage to personal property during your stay, except
                where required by law. Guests may be charged for damage
                beyond normal wear and tear.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Intellectual Property</h2>
              <p className="mt-3">
                All text, photos, and branding on this website belong to E
                Komo Mai Vacation Rentals and may not be reproduced without
                permission.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Governing Law</h2>
              <p className="mt-3">
                These terms are governed by the laws of the State of Hawaii,
                without regard to conflict-of-law principles.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Changes to These Terms</h2>
              <p className="mt-3">
                We may update these terms from time to time. The &ldquo;last
                updated&rdquo; date above reflects the most recent revision.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Contact Us</h2>
              <p className="mt-3">
                Questions about these terms? Email us at{" "}
                <a href="mailto:pahiatrinh@gmail.com" className="font-semibold text-ocean hover:text-ocean-deep">
                  pahiatrinh@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

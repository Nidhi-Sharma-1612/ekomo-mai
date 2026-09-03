import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import heroImage from "@/public/images/stock/snorkeling-reef.jpg";

export const metadata: Metadata = {
  title: "Privacy Policy | E Komo Mai Vacation Rentals",
  description:
    "How E Komo Mai Vacation Rentals collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated September 2026"
        image={heroImage}
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-10 text-base leading-relaxed text-ink/80">
            <div>
              <h2 className="font-serif text-2xl text-ink">Introduction</h2>
              <p className="mt-3">
                E Komo Mai Vacation Rentals (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
                or &ldquo;our&rdquo;) respects your privacy. This policy
                explains what information we collect through this website,
                how we use it, and the choices you have.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Information We Collect</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Contact form submissions</strong> — name, email
                  address, phone number, travel dates, and any message you
                  send us.
                </li>
                <li>
                  <strong>Booking inquiries</strong> — property preferences,
                  check-in/check-out dates, and number of guests entered into
                  the booking widget.
                </li>
                <li>
                  <strong>Usage data</strong> — pages visited and general
                  device/browser information collected automatically for
                  basic site analytics.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">How We Use Your Information</h2>
              <p className="mt-3">
                We use the information you provide to respond to inquiries,
                coordinate bookings and stays, and improve this website. We do
                not sell your personal information.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Sharing Your Information</h2>
              <p className="mt-3">
                We may share limited information with service providers who
                help us operate this business — for example, our property
                management/booking platform (Hostaway) and, once integrated,
                a payment processor (such as Stripe) to handle reservations
                and payments securely. We do not share your information with
                third parties for their own marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Cookies</h2>
              <p className="mt-3">
                This site may use basic cookies or similar technologies to
                remember preferences and understand how visitors use the
                site. You can disable cookies in your browser settings, though
                some features may not work as intended.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Data Security</h2>
              <p className="mt-3">
                We take reasonable steps to protect the information you share
                with us. No method of transmission over the internet is
                completely secure, so we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Your Rights</h2>
              <p className="mt-3">
                You may request access to, correction of, or deletion of your
                personal information at any time by contacting us using the
                details below.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Children&rsquo;s Privacy</h2>
              <p className="mt-3">
                This website is not directed at children under 13, and we do
                not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Changes to This Policy</h2>
              <p className="mt-3">
                We may update this policy from time to time. The &ldquo;last
                updated&rdquo; date above reflects the most recent revision.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink">Contact Us</h2>
              <p className="mt-3">
                Questions about this policy? Email us at{" "}
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

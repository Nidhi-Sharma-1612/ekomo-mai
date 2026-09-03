import Link from "next/link";
import Image from "next/image";
import { Building2, House, Info, MessageCircle } from "lucide-react";
import logo from "@/public/images/logo.png";
import companyLogo from "@/public/images/company-logo.png";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/FooterIcons";

const exploreLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/properties", label: "Properties", icon: Building2 },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ocean-deep text-sand">
      <div
        aria-hidden="true"
        className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-palm/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src={logo}
            alt="E Komo Mai Vacation Rentals"
            className="h-14 w-auto brightness-0 invert opacity-90"
          />
          <p className="mt-4 max-w-sm text-sm text-sand/70">
            Handpicked oceanfront condos across West Maui, hosted with real
            Aloha spirit by Louis &amp; Kristine Trinh.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="https://www.facebook.com/E.Komo.Mai.Maui"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sand transition-colors hover:bg-gold hover:text-ocean-deep"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/westmauirentals/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sand transition-colors hover:bg-gold hover:text-ocean-deep"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sand/50">
            Explore
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2.5 text-sand/80 transition-colors hover:text-gold"
                >
                  <link.icon size={15} strokeWidth={1.75} className="shrink-0 text-gold" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sand/50">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-sand/80">
            <li>
              <a
                href="mailto:pahiatrinh@gmail.com"
                className="flex items-center gap-2.5 transition-colors hover:text-gold"
              >
                <MailIcon className="shrink-0 text-gold" />
                pahiatrinh@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+17707145258"
                className="flex items-center gap-2.5 transition-colors hover:text-gold"
              >
                <PhoneIcon className="shrink-0 text-gold" />
                +1 (770) 714-5258
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-sand/60">
              <PinIcon className="shrink-0 text-gold" />
              West Maui, Hawaii
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-sand/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-sand/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} E Komo Mai Vacation Rentals. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span>Design and Developed by</span>
            <Image src={companyLogo} alt="Design by Dial" className="h-5 w-auto" />
          </div>

          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-gold">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

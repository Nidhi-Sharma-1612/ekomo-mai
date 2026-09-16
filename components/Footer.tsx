import Link from "next/link";
import Image from "next/image";
import { Building2, House, Info, MessageCircle } from "lucide-react";
import logo from "@/public/images/logo.png";
import companyLogo from "@/public/images/company-logo.png";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/FooterIcons";
import { getPageSections, getSiteSettings, str } from "@/lib/cms";

const exploreLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/properties", label: "Properties", icon: Building2 },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: MessageCircle },
];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export default async function Footer() {
  const [settings, sections] = await Promise.all([getSiteSettings(), getPageSections("global")]);
  const footer = sections.footer ?? {};

  const cmsExploreLabels = footer.exploreLinks;
  const exploreLinksResolved = exploreLinks.map((link, i) => ({
    ...link,
    label:
      isStringArray(cmsExploreLabels) && cmsExploreLabels.length === exploreLinks.length
        ? cmsExploreLabels[i]
        : link.label,
  }));
  const privacyLabel = str(footer, "privacyLabel", "Privacy Policy");
  const termsLabel = str(footer, "termsLabel", "Terms & Conditions");

  const brandName = settings?.siteName ?? "LahainaOceanfrontRentals";
  const logoUrl = settings?.logoUrl ?? null;
  const tagline =
    settings?.footerTagline ??
    "Handpicked oceanfront condos across West Maui, hosted with real Aloha spirit by Louis & Kristine Trinh.";
  const email = settings?.email ?? "pahiatrinh@gmail.com";
  const phone = settings?.phone ?? "+1 (770) 714-5258";
  const address = settings?.address ?? "West Maui, Hawaii";
  const copyrightName = settings?.copyrightName ?? brandName;
  const facebookUrl = settings?.socialLinks?.facebook ?? "https://www.facebook.com/E.Komo.Mai.Maui";
  const instagramUrl = settings?.socialLinks?.instagram ?? "https://www.instagram.com/westmauirentals/";
  const phoneDigits = phone.replace(/[^\d+]/g, "");

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
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- CMS-managed URL can be any domain
            <img
              src={logoUrl}
              alt={brandName}
              className="h-14 w-auto rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
            />
          ) : (
            <Image
              src={logo}
              alt={brandName}
              className="h-14 w-auto rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
            />
          )}
          <p className="mt-4 max-w-sm text-sm text-sand/70">{tagline}</p>

          <div className="mt-6 flex gap-3">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sand transition-colors hover:bg-gold hover:text-ocean-deep"
            >
              <FacebookIcon />
            </a>
            <a
              href={instagramUrl}
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
            {exploreLinksResolved.map((link) => (
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
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-gold"
              >
                <MailIcon className="shrink-0 text-gold" />
                {email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${phoneDigits}`}
                className="flex items-center gap-2.5 transition-colors hover:text-gold"
              >
                <PhoneIcon className="shrink-0 text-gold" />
                {phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-sand/60">
              <PinIcon className="shrink-0 text-gold" />
              {address}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-sand/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-sand/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span>Design and Developed by</span>
            <Image src={companyLogo} alt="Design by Dial" className="h-5 w-auto" />
          </div>

          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-gold">{privacyLabel}</Link>
            <Link href="/terms" className="transition-colors hover:text-gold">{termsLabel}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

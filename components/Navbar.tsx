import { getPageSections, getSiteSettings } from "@/lib/cms";
import NavbarClient from "@/components/NavbarClient";

const defaultLinks = [
  { href: "/", defaultLabel: "Home" },
  { href: "/properties", defaultLabel: "Properties" },
  { href: "/about", defaultLabel: "About" },
  { href: "/contact", defaultLabel: "Contact" },
];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export default async function Navbar() {
  const [sections, settings] = await Promise.all([getPageSections("global"), getSiteSettings()]);
  const navbar = sections.navbar ?? {};

  const brandName = settings?.siteName ?? "LahainaOceanfrontRentals";
  const logoUrl = settings?.logoUrl ?? null;
  const ctaLabel =
    typeof navbar.ctaLabel === "string" && navbar.ctaLabel ? navbar.ctaLabel : "Book Now";

  const cmsLabels = navbar.navLinks;
  const links = defaultLinks.map((link, i) => ({
    href: link.href,
    label:
      isStringArray(cmsLabels) && cmsLabels.length === defaultLinks.length
        ? cmsLabels[i]
        : link.defaultLabel,
  }));

  return <NavbarClient brandName={brandName} logoUrl={logoUrl} links={links} ctaLabel={ctaLabel} />;
}

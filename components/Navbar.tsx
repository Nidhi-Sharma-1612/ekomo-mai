"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/public/images/logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Only the homepage has a full-bleed hero worth showing through a
  // transparent navbar — every other page keeps the solid bar throughout.
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        isHome ? "fixed" : "sticky",
        "top-0 inset-x-0 z-50 transition-colors duration-300",
        overHero
          ? "bg-transparent"
          : "border-b border-sand-dark bg-sand/90 backdrop-blur",
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src={logo}
            alt="E Komo Mai Vacation Rentals"
            className={[
              "h-12 w-auto transition-all duration-300",
              overHero ? "brightness-0 invert drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" : "",
            ].join(" ")}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "text-sm font-medium tracking-wide transition-colors",
                overHero
                  ? "text-sand/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] hover:text-gold"
                  : "text-ink/80 hover:text-ocean",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/properties"
            className="inline-flex items-center rounded-full bg-ocean px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-deep"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={[
              "block h-0.5 w-6 transition-transform",
              overHero ? "bg-white" : "bg-ink",
              open ? "translate-y-2 rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-6 transition-opacity",
              overHero ? "bg-white" : "bg-ink",
              open ? "opacity-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-6 transition-transform",
              overHero ? "bg-white" : "bg-ink",
              open ? "-translate-y-2 -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      <nav
        className={[
          "grid overflow-hidden border-t border-sand-dark bg-sand transition-[grid-template-rows] duration-300 ease-out md:hidden",
          open ? "grid-rows-[minmax(0,1fr)]" : "grid-rows-[minmax(0,0fr)] border-t-0",
        ].join(" ")}
      >
        <div className="flex min-h-0 flex-col gap-4 px-6 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-ink/80"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/properties"
            className="inline-flex items-center justify-center rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      </nav>
    </header>
  );
}

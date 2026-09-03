import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Home, Tag } from "lucide-react";
import bg from "@/public/images/stock/beach-birds-sunrise.jpg";

const trustSignals = [
  { icon: BadgeCheck, label: "Superhost Rated" },
  { icon: Tag, label: "Book Direct, No Fees" },
  { icon: Home, label: "Hosted by Real Locals" },
];

export default function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <Image
        src={bg}
        alt="Sunrise over a Maui beach with birds flying overhead"
        fill
        sizes="100vw"
        className="animate-cta-zoom object-cover"
      />
      <div className="absolute inset-0 bg-ocean-deep/80" />
      <div className="absolute inset-0 bg-linear-to-b from-ocean-deep/50 via-transparent to-ocean-deep/50" />

      <div className="relative mx-auto max-w-3xl px-6 text-center text-sand">
        <p className="font-serif text-lg italic text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          Start Planning
        </p>
        <h2 className="mt-2 font-serif text-3xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] sm:text-4xl">
          Ready to feel the Aloha spirit?
        </h2>
        <p className="mt-4 text-base text-sand/85">
          Reach out and we&rsquo;ll help you find the right oceanfront condo for
          your Maui getaway.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/properties"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-ocean-deep transition-colors hover:bg-white"
          >
            Browse Properties
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-sand/40 px-8 py-3.5 text-sm font-semibold text-sand transition-colors hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

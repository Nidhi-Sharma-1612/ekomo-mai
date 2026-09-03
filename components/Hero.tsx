import Image from "next/image";
import heroImageA from "@/public/images/stock/hero-beach-sunset.jpg";
import heroImageB from "@/public/images/stock/beach-palms-sailboat.jpg";
import WaveDivider from "@/components/WaveDivider";
import BookingWidget from "@/components/BookingWidget";

export default function Hero() {
  return (
    <section className="relative min-h-[110dvh]">
      <div className="absolute inset-0 overflow-hidden bg-ocean-deep">
        <Image
          src={heroImageA}
          alt="Golden sunset over a Maui beach"
          fill
          priority
          sizes="100vw"
          className="hero-bg-layer object-cover"
        />
        <Image
          src={heroImageB}
          alt="Palm trees and a sailboat on a tropical Maui beach"
          fill
          sizes="100vw"
          className="hero-bg-layer hero-bg-layer-2 object-cover"
        />

        {/* Contrast scrim so the headline and widget stay readable over any frame */}
        <div className="absolute inset-0 bg-linear-to-t from-ocean-deep/95 via-ocean-deep/60 to-ocean-deep/55" />
        <div className="absolute inset-0 bg-ocean-deep/25" />

        {/* Sits at the true bottom of this taller-than-viewport section, so it only appears once the user scrolls. */}
        <WaveDivider className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24" />
      </div>

      {/* Exactly one viewport tall, so the scroll cue stays visible on first load while the wave (above) stays hidden below the fold. */}
      <div className="relative z-10 flex min-h-dvh flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-32 text-center sm:py-20">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
            <p className="animate-fade-in-up font-serif text-lg italic text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] [animation-delay:0.05s]">
              E Komo Mai &mdash; Welcome
            </p>
            <h1 className="animate-fade-in-up mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl [animation-delay:0.15s]">
              Your Gateway to{" "}
              <span className="text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                Maui&rsquo;s
              </span>{" "}
              Paradise
            </h1>
            <p className="animate-fade-in-up mt-6 max-w-xl text-lg text-sand/90 [animation-delay:0.25s]">
              Handpicked oceanfront condos in Lahaina &amp; Kaanapali, hosted with
              real Aloha spirit &mdash; and the front-row sunsets to prove it.
            </p>
          </div>

          <div className="relative z-20 mx-auto mt-12 w-full max-w-5xl sm:mt-14">
            <BookingWidget />
          </div>
        </div>

        <div className="hidden justify-center pb-10 sm:flex sm:pb-14">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-sand/40 text-sand/80"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}

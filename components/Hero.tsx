import Image from "next/image";
import heroImageA from "@/public/images/stock/hero-beach-sunset.jpg";
import WaveDivider from "@/components/WaveDivider";
import BookingWidget from "@/components/BookingWidget";
import { getPageSections, str } from "@/lib/cms";

export default async function Hero() {
  const sections = await getPageSections("home");
  const hero = sections.hero ?? {};

  const eyebrow = str(hero, "eyebrow", "Lahaina Ocean Front Rentals — Welcome");
  const heading = str(hero, "heading", "Your Gateway to Maui's Paradise");
  const description = str(
    hero,
    "description",
    "Handpicked oceanfront condos in Lahaina & Kaanapali, hosted with real Aloha spirit — and the front-row sunsets to prove it.",
  );

  // Preserves the original gold-accent styling on "Maui's" when that exact
  // word is present, but degrades gracefully to plain text if an editor
  // changes the heading to something that doesn't include it.
  const accentWord = "Maui's";
  const accentIndex = heading.indexOf(accentWord);
  const headingBefore = accentIndex >= 0 ? heading.slice(0, accentIndex) : heading;
  const headingAfter = accentIndex >= 0 ? heading.slice(accentIndex + accentWord.length) : "";

  return (
    <section className="relative min-h-[110dvh]">
      <div className="absolute inset-0 overflow-hidden bg-ocean-deep">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroImageA.src}
          className="hero-video absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <Image
          src={heroImageA}
          alt="Golden sunset over a Maui beach"
          fill
          priority
          sizes="100vw"
          className="hero-video-fallback object-cover"
        />

        {/* Contrast scrim so the headline and widget stay readable over any frame — kept light enough that the video's real color still shows through */}
        <div className="absolute inset-0 bg-linear-to-t from-ocean-deep/60 via-ocean-deep/30 to-ocean-deep/25" />
        <div className="absolute inset-0 bg-ocean-deep/10" />

        {/* Sits at the true bottom of this taller-than-viewport section, so it only appears once the user scrolls. */}
        <WaveDivider className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24" />
      </div>

      {/* Exactly one viewport tall, so the scroll cue stays visible on first load while the wave (above) stays hidden below the fold. */}
      <div className="relative z-10 flex min-h-dvh flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-32 text-center sm:py-20">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
            <p className="animate-fade-in-up font-serif text-lg italic text-gold text-shadow-[0_1px_3px_rgba(0,0,0,0.85),0_2px_10px_rgba(0,0,0,0.5)] [animation-delay:0.05s]">
              {eyebrow}
            </p>
            <h1 className="animate-fade-in-up mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-white text-shadow-[0_2px_4px_rgba(0,0,0,0.8),0_4px_20px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl [animation-delay:0.15s]">
              {accentIndex >= 0 ? (
                <>
                  {headingBefore}
                  <span className="text-gold text-shadow-[0_2px_4px_rgba(0,0,0,0.85),0_4px_20px_rgba(0,0,0,0.55)]">
                    {accentWord}
                  </span>
                  {headingAfter}
                </>
              ) : (
                heading
              )}
            </h1>
            <p className="animate-fade-in-up mt-6 max-w-xl text-lg text-sand/90 text-shadow-[0_1px_3px_rgba(0,0,0,0.75),0_2px_12px_rgba(0,0,0,0.45)] [animation-delay:0.25s]">
              {description}
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
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}

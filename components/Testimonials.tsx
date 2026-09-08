import { testimonials as fallbackTestimonials } from "@/lib/data/testimonials";
import { getFeaturedTestimonials } from "@/lib/hostaway/reviews";
import SectionHeading from "@/components/SectionHeading";
import { StarIcon } from "@/components/StoryIcons";
import type { Testimonial } from "@/lib/types";

const accents = ["bg-ocean/10 text-ocean", "bg-palm/10 text-palm", "bg-gold/15 text-gold"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const rating = testimonial.rating ?? 5;

  return (
    <figure className="relative flex h-80 w-72 shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:w-95 sm:p-8">
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="absolute -right-2 -top-2 h-20 w-20 text-ocean/5"
        fill="currentColor"
      >
        <path d="M9.5 20C7 20 5 18 5 15.2C5 11 8 7.5 12.5 5.5L13.8 7.8C10.8 9.3 9 11.3 8.6 13.3C8.9 13.1 9.4 13 10 13C12 13 13.5 14.5 13.5 16.5C13.5 18.5 12 20 9.5 20ZM22.5 20C20 20 18 18 18 15.2C18 11 21 7.5 25.5 5.5L26.8 7.8C23.8 9.3 22 11.3 21.6 13.3C21.9 13.1 22.4 13 23 13C25 13 26.5 14.5 26.5 16.5C26.5 18.5 25 20 22.5 20Z" />
      </svg>

      <div className="relative z-10">
        <div className="flex gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, starIdx) => (
            <StarIcon key={starIdx} className="h-4 w-4" filled={starIdx < rating} />
          ))}
        </div>
        <blockquote className="mt-4 line-clamp-5 font-serif text-lg italic leading-relaxed text-ink">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="relative z-10 mt-6 flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-sm font-semibold ${accents[index % accents.length]}`}
        >
          {initials(testimonial.author)}
        </span>
        <div className="text-sm text-ink/60">
          <span className="block font-semibold text-ink">{testimonial.author}</span>
          <span className="block text-xs">{testimonial.location}</span>
        </div>
      </figcaption>
    </figure>
  );
}

export default async function Testimonials() {
  const liveTestimonials = await getFeaturedTestimonials();
  const testimonials = liveTestimonials.length > 0 ? liveTestimonials : fallbackTestimonials;
  const track = [...testimonials, ...testimonials];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Guest Stories"
          title="What guests are saying"
          align="center"
        />
      </div>

      <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {track.map((testimonial, i) => (
            <TestimonialCard key={`${testimonial.id}-${i}`} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

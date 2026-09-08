import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import ServiceHighlights from "@/components/ServiceHighlights";
import StoryTeaser from "@/components/StoryTeaser";
import ExploreIsland from "@/components/ExploreIsland";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

// Revalidate periodically so the featured properties stay in sync with
// Hostaway (price, description, photos) without needing a full redeploy.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <FeaturedProperties />
      </Reveal>
      <Reveal>
        <ServiceHighlights />
      </Reveal>
      <Reveal>
        <StoryTeaser />
      </Reveal>
      <Reveal>
        <ExploreIsland />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}

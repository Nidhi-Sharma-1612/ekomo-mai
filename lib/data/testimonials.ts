import type { Testimonial } from "@/lib/types";

/**
 * Fallback testimonials shown only if live Hostaway reviews fail to load
 * (see lib/hostaway/reviews.ts) — real guest reviews are the primary source.
 * Fictional names/locations, for that fallback case only.
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "The oceanfront view from the lanai alone was worth the trip. Communication with Louis & Kristine was fast and easy the whole way through.",
    author: "Sarah Mitchell",
    location: "Seattle, WA",
  },
  {
    id: "2",
    quote:
      "Everything was spotless and exactly as pictured. Check-in was seamless and the beach gear in the closet was such a nice touch.",
    author: "James Whitfield",
    location: "Denver, CO",
  },
  {
    id: "3",
    quote:
      "Felt like staying with friends who happen to know all the best spots on the island. We're already planning our next stay.",
    author: "Priya Nair",
    location: "Austin, TX",
  },
  {
    id: "4",
    quote:
      "Waking up to that sunrise every morning never got old. The condo had everything we needed and then some.",
    author: "Emily Carter",
    location: "Portland, OR",
  },
  {
    id: "5",
    quote:
      "Booking direct made everything so much simpler than an OTA. Pricing was upfront with zero surprise fees at checkout.",
    author: "Marcus Reyes",
    location: "Chicago, IL",
  },
  {
    id: "6",
    quote:
      "We had a small maintenance question and got a reply within minutes. That kind of responsiveness is rare these days.",
    author: "Hannah Bergström",
    location: "Minneapolis, MN",
  },
];

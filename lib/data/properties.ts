import type { Property } from "@/lib/types";

import balconyOceanView from "@/public/images/properties/mahana-1013/balcony-ocean-view.webp";
import balconyBreakfast from "@/public/images/properties/mahana-1013/balcony-breakfast.webp";
import bedroomOceanView from "@/public/images/properties/mahana-1013/bedroom-ocean-view.jpeg";
import aerialBeachView from "@/public/images/properties/mahana-1013/aerial-beach-view.webp";
import kitchen from "@/public/images/properties/mahana-1013/kitchen.webp";

import mahana802BalconySunset from "@/public/images/properties/mahana-802-photos/balcony-sunset.webp";
import mahana802BedroomOceanView from "@/public/images/properties/mahana-802-photos/bedroom-ocean-view.webp";
import mahana802BedroomAlt from "@/public/images/properties/mahana-802-photos/bedroom-alt.webp";
import mahana802Kitchen from "@/public/images/properties/mahana-802-photos/kitchen.webp";
import mahana802KitchenSinkView from "@/public/images/properties/mahana-802-photos/kitchen-sink-view.webp";

import honuaKaiResortPool from "@/public/images/properties/honua-kai-hokulani-514/resort-pool.webp";
import honuaKaiBalconyView from "@/public/images/properties/honua-kai-hokulani-514/balcony-view.webp";
import honuaKaiLivingRoom from "@/public/images/properties/honua-kai-hokulani-514/living-room.webp";
import honuaKaiBedroom from "@/public/images/properties/honua-kai-hokulani-514/bedroom.webp";
import honuaKaiBedroomDetail from "@/public/images/properties/honua-kai-hokulani-514/bedroom-detail.webp";

import lahainaShores from "@/public/images/properties/lahaina-shores.jpeg";

/**
 * Static listing data for the 4 real units, shaped to mirror a Hostaway
 * listing object (id, name, bedrooms/bathrooms, maxGuests, amenities,
 * images, description). Swap this module for a Hostaway API fetch later —
 * every component below only depends on the `Property` type, not this file.
 *
 * nightlyRateFrom: the original site showed "$750K" / "$1,250K" / "$580K"
 * with no /night label (a real-estate theme's price field, not a rental
 * rate). These are the same figures with the "K" stripped as a best-guess
 * nightly rate — confirm the real number with the client and replace once
 * Hostaway's live pricing is wired in.
 *
 * coordinates: approximate public resort locations — swap for the exact
 * unit address once available.
 */
export const properties: Property[] = [
  {
    id: "240142",
    slug: "oceanfront-studio-honeymoon",
    name: "The Mahana — Unit 1013",
    resort: "The Mahana",
    location: "Kaanapali, Maui",
    tagline: "Best views on Maui — perfect for honeymooners",
    description:
      "A newly renovated 10th-floor oceanfront studio with sweeping Pacific views and front-row sunsets.",
    longDescription:
      "Perched on the 10th floor with unobstructed ocean views in every direction, this newly renovated studio was made for slow mornings on the lanai and golden-hour sunsets. Inside you'll find a king-sized memory foam mattress, blackout shades, and a fully equipped kitchen — just steps from the water, it's the kind of view guests remember long after they've flown home.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [
      "Oceanfront lanai",
      "Fully equipped kitchen",
      "King memory foam mattress",
      "Blackout shades",
      "Resort pool access",
      "Free WiFi",
      "In-unit A/C",
      "Beach gear provided",
    ],
    images: [
      { src: balconyOceanView, alt: "Oceanfront lanai with wine and ocean view at The Mahana" },
      { src: bedroomOceanView, alt: "Bedroom with floor-to-ceiling ocean views" },
      { src: balconyBreakfast, alt: "Breakfast set up on the oceanfront lanai" },
      { src: kitchen, alt: "Fully equipped kitchen with quartz countertops" },
      { src: aerialBeachView, alt: "Aerial view of the beach and palm trees below the resort" },
    ],
    nightlyRateFrom: 750,
    address: "110 Kaanapali Shores Pl, Lahaina, HI 96761",
    coordinates: { lat: 20.9367, lng: -156.6947 },
  },
  {
    id: "240143",
    slug: "the-mahana-802",
    name: "The Mahana — Unit 802",
    resort: "The Mahana",
    location: "Kaanapali, Maui",
    tagline: "Unobstructed ocean views of Molokai & Lanai — no resort fees",
    description:
      "A studio condo on the 8th floor of The Mahana with an unobstructed ocean view overlooking the neighboring islands of Molokai and Lanai, and zero resort fees.",
    longDescription:
      "The Mahana is one of West Maui's quieter oceanfront resorts, and Unit 802 sits eight floors up with an unobstructed ocean view stretching out to the neighboring islands of Molokai and Lanai. Recently renovated with a brand-new king mattress and a clean, coastal-modern interior, it's a peaceful home base for exploring Kaanapali Beach and beyond — with none of the resort fees many nearby properties charge.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [
      "Ocean-view lanai",
      "New king mattress",
      "Fully equipped kitchen",
      "No resort fees",
      "Resort pool & BBQ area",
      "Free WiFi",
      "On-site parking",
      "Beach gear provided",
    ],
    images: [
      { src: mahana802BalconySunset, alt: "Sunset from the oceanfront lanai at The Mahana Unit 802" },
      { src: mahana802BedroomOceanView, alt: "Bedroom with sliding glass doors to the ocean-view lanai" },
      { src: mahana802BedroomAlt, alt: "King bed with coastal-blue palm print wallpaper" },
      { src: mahana802Kitchen, alt: "Fully equipped kitchen with stainless steel appliances" },
      { src: mahana802KitchenSinkView, alt: "Kitchen sink with gold fixtures and an ocean view beyond the bed" },
    ],
    nightlyRateFrom: 1250,
    address: "110 Kaanapali Shores Pl, Lahaina, HI 96761",
    coordinates: { lat: 20.9367, lng: -156.6947 },
  },
  {
    id: "240144",
    slug: "honua-kai-ocean-view",
    name: "Honua Kai — Hokulani Unit 514",
    resort: "Honua Kai Resort & Spa",
    location: "Kaanapali, Maui",
    tagline: "Partial ocean view, sleeps 4, zero resort or parking fees",
    description:
      "A bright unit in the Hokulani tower at Honua Kai with a partial ocean view from the lanai, a plush king bed and a queen sofa sleeper, and zero resort or parking fees.",
    longDescription:
      "Honua Kai is one of Kaanapali's most amenity-rich resorts — four pools, five spas, and beachfront dining at Duke's, all just steps from your door. This Hokulani-tower unit has a partial ocean view from the lanai, a plush king bed plus a queen sofa sleeper for up to four guests, and none of the resort or parking fees charged elsewhere on property.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    amenities: [
      "Partial ocean-view lanai",
      "King bed + queen sofa sleeper",
      "No resort or parking fees",
      "4 resort pools & 5 spas",
      "Beachfront dining at Duke's",
      "Fitness center",
      "Fully equipped kitchen",
      "Free WiFi",
    ],
    images: [
      { src: honuaKaiResortPool, alt: "Honua Kai resort pool and waterfall with the Hokulani tower behind" },
      { src: honuaKaiBalconyView, alt: "Lanai view over palm trees toward the ocean" },
      { src: honuaKaiLivingRoom, alt: "Living room and kitchen with queen sofa sleeper" },
      { src: honuaKaiBedroom, alt: "King bedroom with Hawaiian sea turtle wall art" },
      { src: honuaKaiBedroomDetail, alt: "Bedroom nightstand detail with orchids" },
    ],
    nightlyRateFrom: 580,
    address: "130 Kai Malina Pkwy, Lahaina, HI 96761",
    coordinates: { lat: 20.9414, lng: -156.6949 },
  },
  {
    id: "240824",
    slug: "lahaina-shores-oceanfront-studio",
    name: "Lahaina Shores Oceanfront Studio",
    resort: "Lahaina Shores",
    location: "Lahaina, Maui",
    tagline: "Ocean breeze and sunsets from the 4th floor",
    description:
      "A recently renovated fourth-floor studio at Lahaina Shores, right on the water in historic Lahaina town.",
    longDescription:
      "Lahaina Shores puts you right on the water at the edge of historic Lahaina town, walkable to local restaurants, galleries, and the harbor. This fourth-floor studio was recently renovated and catches the ocean breeze and evening sunsets straight from the lanai.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [
      "Oceanfront lanai",
      "Fully equipped kitchen",
      "Resort pool access",
      "Free WiFi",
      "Walk to Lahaina town",
      "Beach gear provided",
    ],
    images: [{ src: lahainaShores, alt: "Lahaina Shores oceanfront view at sunset" }],
    nightlyRateFrom: 750,
    address: "475 Front St, Lahaina, HI 96761",
    coordinates: { lat: 20.8712, lng: -156.6807 },
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

import type { StaticImageData } from "next/image";

export interface PropertyImage {
  /** Local static import OR a remote Hostaway image URL. */
  src: StaticImageData | string;
  alt: string;
}

export interface CancellationTier {
  window: string;
  refund: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  resort: string;
  location: string;
  tagline: string;
  description: string;
  longDescription: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  images: PropertyImage[];
  /** Nightly rate placeholder — replace with live Hostaway pricing once the API is connected. */
  nightlyRateFrom: number | null;
  address: string;
  coordinates: { lat: number; lng: number };
  /** Where this property's data came from — drives whether live availability can be fetched. */
  source: "hostaway" | "static";
  /** Numeric Hostaway listing ID — only present for source: "hostaway". */
  hostawayListingId?: number;
  checkInTime: string;
  checkOutTime: string;
  houseRulesText?: string;
  cancellationPolicyName?: string;
  cancellationTiers: CancellationTier[];
  /** Flat one-time fee added to every stay. */
  cleaningFee: number;
  /** One-time check-in fee, if the host charges one. */
  checkinFee: number;
  /** Percentage tax rate applied to the rental subtotal (e.g. 5 => 5%). */
  taxRatePercent: number;
  /** Flat per-stay tax on top of the percentage rate. */
  guestStayTax: number;
  /** Flat per-night tax on top of the percentage rate. */
  guestNightlyTax: number;
  /** Flat per-guest-per-night tax on top of the percentage rate. */
  guestPerPersonPerNightTax: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  /** Star rating out of 5 — defaults to 5 for illustrative testimonials without a real rating. */
  rating?: number;
}

export interface ServiceHighlight {
  id: string;
  title: string;
  description: string;
}

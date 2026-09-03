import type { StaticImageData } from "next/image";

export interface PropertyImage {
  src: StaticImageData;
  alt: string;
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
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export interface ServiceHighlight {
  id: string;
  title: string;
  description: string;
}

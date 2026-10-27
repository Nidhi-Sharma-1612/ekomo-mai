"use client";

import Image from "next/image";
import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import type { PropertyImage } from "@/lib/types";
import PropertyGalleryCarousel from "@/components/PropertyGalleryCarousel";
import PropertyPhotoViewer from "@/components/PropertyPhotoViewer";

export default function PropertyGallery({ images }: { images: PropertyImage[] }) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [main, ...rest] = images;

  if (!main) return null;

  const thumbs = rest.slice(0, 4);

  return (
    <>
      {/* Mobile: swipeable carousel showing every photo; tap to open full-screen */}
      <div className="sm:hidden">
        <PropertyGalleryCarousel images={images} onOpen={setViewerIndex} />
      </div>

      {/* sm+: Airbnb-style grid (falls back to a single wide image when there's only one photo) */}
      <div className="relative hidden sm:block">
        {rest.length === 0 ? (
          <button
            type="button"
            onClick={() => setViewerIndex(0)}
            className="relative block aspect-21/9 w-full overflow-hidden rounded-3xl"
          >
            <Image src={main.src} alt={main.alt} fill priority sizes="100vw" className="object-cover" />
          </button>
        ) : (
          <div
            className={[
              "grid h-[26rem] gap-2 overflow-hidden rounded-3xl lg:h-[30rem]",
              thumbs.length > 2 ? "grid-cols-4 grid-rows-2" : "grid-cols-3 grid-rows-2",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setViewerIndex(0)}
              className="group relative col-span-2 row-span-2 overflow-hidden"
            >
              <Image
                src={main.src}
                alt={main.alt}
                fill
                priority
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
            {thumbs.map((image, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setViewerIndex(i + 1)}
                className={[
                  "group relative overflow-hidden",
                  thumbs.length === 1 ? "row-span-2" : "",
                ].join(" ")}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        )}

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => setViewerIndex(0)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-md ring-1 ring-ink/10 transition-colors hover:bg-sand"
          >
            <LayoutGrid size={16} />
            Show all {images.length} photos
          </button>
        )}
      </div>

      {viewerIndex !== null && (
        <PropertyPhotoViewer
          images={images}
          index={viewerIndex}
          onIndexChange={setViewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}

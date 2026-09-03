"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PropertyImage } from "@/lib/types";

export default function PropertyGalleryCarousel({ images }: { images: PropertyImage[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-3xl"
      >
        {images.map((image, i) => (
          <div key={i} className="relative aspect-4/3 w-full shrink-0 snap-center">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white">
            {index + 1} / {images.length}
          </span>

          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => goTo(i)}
                className={[
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/50",
                ].join(" ")}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PropertyImage } from "@/lib/types";

/**
 * Full-screen photo viewer for a listing's complete Hostaway photo set.
 * Rendered through a portal so ancestors with transforms (e.g. Reveal's
 * entrance animation) can't trap the fixed overlay inside the page flow.
 */
export default function PropertyPhotoViewer({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: PropertyImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + count) % count),
    [index, count, onIndexChange]
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go, onClose]);

  // Lock page scroll while the viewer is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Keep the active thumbnail in view as the user pages through.
  useEffect(() => {
    const active = thumbStripRef.current?.children[index] as HTMLElement | undefined;
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  const current = images[index];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Property photos"
      className="fixed inset-0 z-100 flex flex-col bg-ink/95 text-white"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-sm font-semibold">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photos"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <Image
          key={index}
          src={current.src}
          alt={current.alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition-colors hover:bg-white sm:left-6"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition-colors hover:bg-white sm:right-6"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div ref={thumbStripRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        {images.map((image, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onIndexChange(i)}
            aria-label={`Show photo ${i + 1}`}
            className={[
              "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-opacity",
              i === index ? "opacity-100 ring-2 ring-gold" : "opacity-50 hover:opacity-90",
            ].join(" ")}
          >
            <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Background hero video, loaded only on tablet/desktop widths and only after
 * the page has finished loading — so the multi-MB file never competes with the
 * hero photo, fonts, or scripts. Phones (and reduced-motion users, via CSS)
 * just keep the hero photo underneath.
 *
 * No `poster`: the hero photo already sits directly beneath this element, and
 * browsers fetch a poster even when the video is display:none — which made
 * phones download a full-size copy of the hero image for nothing.
 */
export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    function start() {
      const video = videoRef.current;
      if (!video) return;
      video.src = src;
      video.play().catch(() => {
        // Autoplay can still be refused (e.g. low-power mode) — the poster stays up.
      });
    }

    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [src]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      className="hero-video absolute inset-0 hidden h-full w-full object-cover md:block"
    />
  );
}

import Image from "next/image";
import type { PropertyImage } from "@/lib/types";
import PropertyGalleryCarousel from "@/components/PropertyGalleryCarousel";

export default function PropertyGallery({ images }: { images: PropertyImage[] }) {
  const [main, ...rest] = images;

  if (!main) return null;

  return (
    <>
      {/* Mobile: swipeable carousel showing every photo */}
      <div className="sm:hidden">
        <PropertyGalleryCarousel images={images} />
      </div>

      {/* sm+: grid layout (falls back to a single wide image when there's only one photo) */}
      <div className="hidden sm:block">
        {rest.length === 0 ? (
          <div className="relative aspect-21/9 overflow-hidden rounded-3xl">
            <Image src={main.src} alt={main.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3 sm:grid-rows-2">
            <div className="relative overflow-hidden rounded-3xl sm:col-span-2 sm:row-span-2">
              <Image
                src={main.src}
                alt={main.alt}
                fill
                priority
                sizes="(min-width: 640px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            {rest.slice(0, 2).map((image, i) => (
              <div key={i} className="relative aspect-4/3 overflow-hidden rounded-3xl">
                <Image src={image.src} alt={image.alt} fill sizes="33vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import { ArrowRight, MapPin } from "lucide-react";

export default function MapEmbed({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const delta = 0.01;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-3xl ring-1 ring-ink/10">
      <iframe
        title={`Map showing the location of ${label}`}
        src={src}
        className="h-80 w-full grayscale-15"
        loading="lazy"
      />
      <div className="flex items-center justify-between bg-white px-5 py-3 text-sm">
        <span className="flex items-center gap-2 text-ink/60">
          <MapPin size={16} strokeWidth={1.75} className="text-ocean" />
          {label}
        </span>
        <a
          href={directionsHref}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-1.5 font-semibold text-ocean transition-colors hover:text-ocean-deep"
        >
          Get Directions
          <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

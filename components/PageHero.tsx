import Image, { type StaticImageData } from "next/image";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: StaticImageData;
}) {
  return (
    <section className="relative flex h-[50vh] min-h-[360px] items-end overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ocean-deep/90 via-ocean-deep/55 to-ocean-deep/45" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 text-sand">
        <p className="font-serif text-lg italic text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{eyebrow}</p>
        <h1 className="mt-2 max-w-2xl font-serif text-4xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-xl text-base text-sand/85">{description}</p>
        )}
      </div>
    </section>
  );
}

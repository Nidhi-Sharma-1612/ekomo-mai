import { serviceHighlights } from "@/lib/data/services";
import SectionHeading from "@/components/SectionHeading";
import {
  ChatIcon,
  GiftIcon,
  KeyIcon,
  SparkleIcon,
  TagIcon,
  WrenchIcon,
} from "@/components/ServiceIcons";
import { getPageSections, str } from "@/lib/cms";

const icons = {
  "check-in": KeyIcon,
  cleanliness: SparkleIcon,
  maintenance: WrenchIcon,
  pricing: TagIcon,
  communication: ChatIcon,
  amenities: GiftIcon,
} as const;

const accents = [
  { badge: "bg-ocean/10 text-ocean", ring: "hover:ring-ocean/30" },
  { badge: "bg-palm/10 text-palm", ring: "hover:ring-palm/30" },
  { badge: "bg-gold/15 text-gold", ring: "hover:ring-gold/40" },
];

function isItemOverrides(value: unknown): value is { title: string; description: string }[] {
  return (
    Array.isArray(value) &&
    value.length === serviceHighlights.length &&
    value.every(
      (v) =>
        v &&
        typeof v === "object" &&
        typeof (v as { title?: unknown }).title === "string" &&
        typeof (v as { description?: unknown }).description === "string",
    )
  );
}

export default async function ServiceHighlights() {
  const sections = await getPageSections("home");
  const services = sections.services ?? {};
  const overrides = isItemOverrides(services.items) ? services.items : null;
  const items = serviceHighlights.map((service, i) => ({
    ...service,
    title: overrides ? overrides[i].title : service.title,
    description: overrides ? overrides[i].description : service.description,
  }));

  return (
    <section className="bg-sand-dark/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={str(services, "eyebrow", "What We Offer")}
          title={str(services, "heading", "Hospitality that feels like Aloha")}
          description={str(
            services,
            "description",
            "Every stay is backed by the same standards we'd want for our own family — because for us, this island is personal.",
          )}
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = icons[service.id as keyof typeof icons];
            const accent = accents[i % accents.length];

            return (
              <div
                key={service.id}
                className={`rounded-2xl bg-white p-8 shadow-sm ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:shadow-lg ${accent.ring}`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${accent.badge}`}>
                  <Icon />
                </div>
                <h3 className="mt-5 font-serif text-xl text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { Property } from "@/lib/types";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";

export default function PropertyGrid({
  properties,
  columns = 3,
}: {
  properties: Property[];
  /** Number of columns at desktop width — pick whatever divides the list evenly. */
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-10 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
    >
      {properties.map((property, i) => (
        <Reveal key={property.id} delay={i * 100}>
          <PropertyCard property={property} />
        </Reveal>
      ))}
    </div>
  );
}

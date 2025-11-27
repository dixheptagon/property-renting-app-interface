import { PropertyCard } from "./product-list-component/propety.card";
import { Property } from "../_types";

export default function PropertyList({
  properties,
}: {
  properties: Property[];
}) {
  return (
    <main id="property-list" className="mx-auto mt-4">
      {/* Property Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {properties.map((property: Property) => (
          <PropertyCard key={property.uid} property={property} />
        ))}
      </div>
    </main>
  );
}

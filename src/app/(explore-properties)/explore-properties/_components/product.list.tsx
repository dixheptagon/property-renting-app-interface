import Link from "next/link";
import { dummyProperties, Property } from "../_dummy-data/properties";
import { PropertyCard } from "./product-list-component/propety.card";

export default function PropertyList() {
  return (
    <main id="property-list" className="mx-auto mt-4">
      {/* Property Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dummyProperties.map((property: Property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
}

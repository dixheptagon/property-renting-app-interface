import Link from "next/link";
import { dummyProperties, Property } from "../_data/properties";
import { PropertyCard } from "./propety.card";

export default function PropertyList() {
  return (
    <main
      id="property-list"
      className="mx-auto max-w-7xl scroll-mt-16 px-4 py-12 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="mb-8 text-center sm:mb-12">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Newest Listings
        </h2>
        <p className="text-base text-gray-600 sm:text-lg">
          Discover amazing places to stay around the world
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dummyProperties.map((property: Property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <Link href="/explore-properties">
          <button className="rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600">
            Load More Properties
          </button>
        </Link>
      </div>
    </main>
  );
}

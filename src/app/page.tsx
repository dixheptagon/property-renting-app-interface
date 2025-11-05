"use client";

import Navbar from "./(landing-page)/_components/navbar";
import Hero from "./(landing-page)/_components/hero";
import PropertyList from "./(landing-page)/_components/property.list";
import { usePropertyList } from "./(landing-page)/_hooks/use.property.list";
import LoadingData from "@/components/ui/loading.data";

export default function Page() {
  // Use TanStack Query for data fetching
  const { data: properties, isLoading, isError, error } = usePropertyList();
  const propertiesData = properties?.data || [];
  return (
    <main className="h-full">
      <Navbar />
      <Hero />

      {/* Property List */}
      <div>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingData />
          </div>
        ) : isError ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <p className="mb-2 text-red-600">Error loading properties</p>
              <p className="text-sm text-gray-600">
                {error?.message || "Something went wrong"}
              </p>
            </div>
          </div>
        ) : propertiesData.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600">No properties found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your filters or search criteria
              </p>
            </div>
          </div>
        ) : (
          <PropertyList properties={propertiesData} />
        )}
      </div>
    </main>
  );
}

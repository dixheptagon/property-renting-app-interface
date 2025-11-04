"use client";

import { useSearchParams } from "next/navigation";
import FilteringBox from "./_components/filtering.box";
import { SortBy } from "./_components/filtering-box-component/sort.by";
import { LimitShows } from "./_components/filtering-box-component/limit.shows";
import { PaginationComponent } from "./_components/filtering-box-component/pagination";
import PropertyList from "./_components/product.list";
import { usePropertyList } from "./_hooks/use.property.list";
import LoadingOverlay from "@/components/ui/loading.overlay";
import LoadingData from "@/components/ui/loading.data";

export default function Page() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const amenities = searchParams.get("amenities")?.split(",") || [];
  const rules = searchParams.get("rules")?.split(",") || [];
  const sortBy = searchParams.get("sortBy") || "updated_at";
  const limit = parseInt(searchParams.get("limit") || "12");
  const page = parseInt(searchParams.get("page") || "1");

  // Use TanStack Query for data fetching
  const {
    data: properties,
    pagination,
    isLoading,
    isError,
    error,
  } = usePropertyList();

  console.log(properties);

  return (
    <main className="mx-10 mt-25 grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <FilteringBox category={category} amenities={amenities} rules={rules} />
      </div>

      <div className="col-span-3 mb-6">
        {/* Controls Section */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <SortBy value={sortBy} />
            <LimitShows value={limit} />
          </div>
          <div className="text-muted-foreground hidden text-sm lg:block">
            Showing {Math.min((page - 1) * limit + 1, pagination.total)} -{" "}
            {Math.min(page * limit, pagination.total)} of {pagination.total}{" "}
            results
          </div>
        </div>

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
          ) : properties.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600">No properties found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="overflow-hidden rounded-lg border bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  {/* Property Image */}
                  <div className="relative h-48 bg-gray-200">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={
                          property.images.find((img) => img.is_main)?.url ||
                          property.images[0].url
                        }
                        alt={property.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-300">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
                      {property.title}
                    </h3>
                    <p className="mb-2 line-clamp-2 text-sm text-gray-600">
                      {property.address}, {property.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">
                          {property.rating_avg.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({property.rating_count})
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ${property.base_price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">per night</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <PaginationComponent
            totalItemCount={pagination.total}
            limit={limit}
            currentPage={page}
          />
        </div>
      </div>
    </main>
  );
}

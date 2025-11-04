"use client";

import { useSearchParams } from "next/navigation";
import FilteringBox from "./_components/filtering.box";
import { SortBy } from "./_components/filtering-box-component/sort.by";
import { LimitShows } from "./_components/filtering-box-component/limit.shows";
import PropertyList from "./_components/product.list";
import { usePropertyList } from "./_hooks/use.property.list";
import LoadingData from "@/components/ui/loading.data";
import { PaginationComponent } from "./_components/filtering-box-component/pagination";

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

  const propertiesData = properties?.data || [];

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
            <PropertyList properties={propertiesData} />
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

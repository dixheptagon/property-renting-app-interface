"use client";

import FilteringBox from "./_components/filtering.box";
import { SortBy } from "./_components/filtering-box-component/sort.by";
import { LimitShows } from "./_components/filtering-box-component/limit.shows";
import PropertyList from "./_components/product.list";
import { usePropertyList } from "./_hooks/use.property.list";
import LoadingData from "@/components/ui/loading.data";
import { PaginationComponent } from "./_components/filtering-box-component/pagination";
import Footer from "./_components/footer";
import { usePropertySearchParams } from "./_hooks/use.property.search.params";

export default function Page() {
  const { filters, clearAll } = usePropertySearchParams();

  const sortBy = filters.sortBy || "updated_at";
  const limit = filters.limit || 12;
  const page = filters.page || 1;

  // Use TanStack Query for data fetching
  const {
    data: properties,
    isLoading,
    isError,
    error,
    refetch,
  } = usePropertyList();

  const propertiesData = properties?.data || [];
  const paginationData = properties?.pagination || {};

  const handleClearFilters = () => {
    clearAll();
  };

  return (
    <div>
      <main className="mx-4 mt-38 grid w-auto grid-cols-1 gap-6 md:mx-10 md:mt-25 md:grid-cols-4">
        <div className="md:col-span-1">
          <FilteringBox onClearFilters={handleClearFilters} />
        </div>

        <div className="mb-6 md:col-span-3">
          {/* Controls Section */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:flex-row sm:items-center">
            <div className="flex flex-col gap-4 md:flex-row">
              <SortBy value={sortBy} />
              <LimitShows value={limit} />
            </div>
            <div className="text-muted-foreground hidden text-sm lg:block">
              Showing {Math.min((page - 1) * limit + 1, paginationData.total)} -{" "}
              {Math.min(page * limit, paginationData.total)} of{" "}
              {paginationData.total} results
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
                  <button
                    onClick={() => refetch()}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Retry
                  </button>
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

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <PaginationComponent
              totalItemCount={paginationData.total}
              limit={paginationData.limit}
              currentPage={page}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { usePurchaseList } from "./_hooks/use.purchase.list";
import { usePurchaseSearchParams } from "./_utils/search.params";
import PageHeader from "./_components/page.header";
import FilterSection from "./_components/filter.section";
import ActiveFilters from "./_components/filter-components/active.filters";
import PurchaseTable from "./_components/purchase.table";
import PurchaseCard from "./_components/purchase.card";
import PaginationSection from "./_components/pagination.section";
import EmptyState from "./_components/empty.state";
import LoadingData from "@/components/ui/loading.data";
import { TriangleAlert } from "lucide-react";

export default function Page() {
  const {
    purchases,
    totalItems,
    totalPages,
    currentPage,
    limit,
    loading,
    error,
    filters,
    refetch,
  } = usePurchaseList();

  console.log("purchases", purchases);
  console.log("filters", filters);

  const {
    setPage,
    setLimit,
    toggleStatus,
    clearStatusFilters,
    setSortBy,
    setDateRange,
    clearAllFilters,
  } = usePurchaseSearchParams();

  console.log("error", error);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />

        <div className="min-h-screen bg-white px-4 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingData message="Loading Purchase List..." />
            </div>
          ) : error && error?.status !== 404 ? (
            <div className="flex flex-col items-center justify-center">
              <span className="rounded-full bg-red-100 p-6">
                <TriangleAlert className="h-8 w-8 text-red-500" />
              </span>
              <h3 className="mb-2 text-xl font-semibold text-gray-700">
                Error Loading Purchases
              </h3>
              <p className="mb-4 text-gray-500">{error?.message}</p>
              <button
                onClick={() => refetch()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <FilterSection
                selectedStatus={filters.status}
                onToggleStatus={(status) =>
                  toggleStatus(status, filters.status)
                }
                onClearFilters={clearStatusFilters}
                onSortBy={setSortBy}
                currentSortBy={filters.sort_by}
                currentSortDir={filters.sort_dir}
              />

              <ActiveFilters
                selectedStatus={filters.status}
                onToggleStatus={(status) =>
                  toggleStatus(status, filters.status)
                }
              />

              <PurchaseTable purchases={purchases} />

              <PaginationSection
                totalItemCount={totalItems}
                limit={limit}
                currentPage={currentPage}
                onPageChange={setPage}
                onLimitChange={setLimit}
              />

              {/* Mobile Card View */}
              <section className="space-y-4 lg:hidden">
                {purchases.map((purchase, index) => (
                  <PurchaseCard key={index} purchase={purchase} />
                ))}
              </section>

              {/* Empty State */}
              {purchases.length === 0 && (
                <EmptyState onClearFilters={clearAllFilters} />
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

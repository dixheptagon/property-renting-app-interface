"use client";

import { useOrderSearchParams } from "./_utils/search.params";
import { useOrderList } from "./_hooks/use.order.list";
import OrderListHeader from "./_components/page.header";
import OrderListFilters from "./_components/order-list.filter";
import OrderListStats from "./_components/stats.section";
import OrderListTableHeader from "./_components/order-list.table.header";
import OrderListTableBody from "./_components/order-list.table.body";
import OrderListCard from "./_components/order-list.card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../_components/app-sidebar";
import LoadingData from "@/components/ui/loading.data";
import { TriangleAlert } from "lucide-react";
import EmptyState from "./_components/empty.state";
import PaginationSection from "./_components/pagination.section";

export default function OrderList() {
  const { setPage, setLimit, toggleStatus, setSortBy, clearAllFilters } =
    useOrderSearchParams();

  const {
    orders,
    loading,
    filters,
    error,
    refetch,
    totalItems,
    totalPages,
    currentPage,
    limit,
    statictics,
  } = useOrderList();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <OrderListHeader />
        <div className="min-h-screen bg-white px-4 py-4">
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
              <OrderListFilters
                selectedStatus={filters.status || []}
                onToggleStatus={(status) =>
                  toggleStatus(status, filters.status || [])
                }
                onClearFilters={clearAllFilters}
                onSortBy={setSortBy}
                currentSortBy={filters.sort_by}
                currentSortDir={filters.sort_dir}
              />

              <OrderListStats statictics={statictics} />

              <section className="mt-4 hidden space-y-4 lg:block">
                <OrderListTableHeader />
                <OrderListTableBody orders={orders} />
              </section>

              <PaginationSection
                totalItemCount={totalItems}
                limit={limit}
                currentPage={currentPage}
                onPageChange={setPage}
                onLimitChange={setLimit}
              />

              {/* Mobile Card View */}
              <section className="mt-4 space-y-4 lg:hidden">
                {orders.map((order, index) => (
                  <OrderListCard key={index} order={order} />
                ))}
              </section>

              {/* Empty State */}
              {orders.length === 0 && (
                <EmptyState onClearFilters={clearAllFilters} />
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

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

export default function OrderList() {
  const {
    setPage,
    setLimit,
    toggleStatus,
    setCategoryFilter,
    clearStatusFilters,
    setSortBy,
    setDateRange,
    clearAllFilters,
  } = useOrderSearchParams();

  const { orders, loading, filters } = useOrderList();

  console.log(orders);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <OrderListHeader />
        <div className="min-h-screen bg-white px-4 py-4">
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

          <OrderListStats />

          <section className="mt-4 hidden space-y-4 lg:block">
            <OrderListTableHeader />
            <OrderListTableBody orders={orders} />
          </section>

          {/* Mobile Card View */}
          <section className="mt-4 space-y-4 lg:hidden">
            {orders.map((order, index) => (
              <OrderListCard key={index} order={order} />
            ))}
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

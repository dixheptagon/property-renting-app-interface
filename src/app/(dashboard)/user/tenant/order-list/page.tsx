"use client";

import { useOrderSearchParams } from "./_utils/search.params";
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
    clearStatusFilters,
    setSortBy,
    setDateRange,
    clearAllFilters,
  } = useOrderSearchParams();

  // Mock data - in real implementation this would come from a hook
  const orders = [
    {
      id: "#10001",
      propertyName: "Sunset Beach Villa",
      roomType: "Deluxe Ocean View",
      status: "confirmed" as const,
      customer: "John Doe",
      expiredAt: "2025-10-25 14:30",
      statusColor: "bg-green-500",
    },
    {
      id: "#10002",
      propertyName: "Mountain Paradise Resort",
      roomType: "Family Suite",
      status: "pending" as const,
      customer: "Jane Smith",
      expiredAt: "Nov 20, 2025 / Nov 22, 2025",
      statusColor: "bg-yellow-500",
    },
    {
      id: "#10003",
      propertyName: "Urban Loft Apartment",
      roomType: "Studio Premium",
      status: "processing" as const,
      customer: "Mike Johnson",
      expiredAt: "2025-10-22 16:45",
      statusColor: "bg-blue-500",
    },
  ];

  // Mock filters - in real implementation this would come from URL params
  const filters = {
    status: [] as any[],
    sort_by: "created_at",
    sort_dir: "desc" as const,
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <OrderListHeader />
        <div className="min-h-screen bg-white px-4 py-4">
          <OrderListFilters
            selectedStatus={filters.status}
            onToggleStatus={(status) => toggleStatus(status, filters.status)}
            onClearFilters={clearStatusFilters}
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

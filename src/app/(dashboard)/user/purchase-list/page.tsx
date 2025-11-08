"use client";

import { useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { Purchase, PurchaseStatus } from "./_types/purchase.status";
import PageHeader from "./_components/page.header";
import FilterSection from "./_components/filter.section";
import ActiveFilters from "./_components/filter-components/active.filters";
import PurchaseTable from "./_components/purchase.table";
import PurchaseCard from "./_components/purchase.card";
import PaginationSection from "./_components/pagination.section";
import EmptyState from "./_components/empty.state";

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState<PurchaseStatus[]>([]);

  // Sample data
  const purchases: Purchase[] = [
    {
      id: "#2024-001",
      property: "Villa Sunrise Bali",
      checkIn: "15 Nov 2024",
      checkOut: "20 Nov 2024",
      price: "Rp5.500.000,00",
      status: "confirmed",
    },
    {
      id: "#2024-002",
      property: "Beach House Lombok",
      checkIn: "22 Nov 2024",
      checkOut: "25 Nov 2024",
      price: "Rp3.200.000,00",
      status: "pending_payment",
    },
    {
      id: "#2024-003",
      property: "Mountain Cabin Bandung",
      checkIn: "01 Dec 2024",
      checkOut: "03 Dec 2024",
      price: "Rp2.100.000,00",
      status: "processing",
    },
    {
      id: "#2024-004",
      property: "Urban Loft Jakarta",
      checkIn: "10 Dec 2024",
      checkOut: "12 Dec 2024",
      price: "Rp1.800.000,00",
      status: "cancelled",
    },
    {
      id: "#2024-005",
      property: "Seaside Resort Bali",
      checkIn: "05 Nov 2024",
      checkOut: "08 Nov 2024",
      price: "Rp4.500.000,00",
      status: "completed",
    },
  ];

  const toggleStatus = (status: PurchaseStatus): void => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const clearFilters = (): void => {
    setSelectedStatus([]);
  };

  const filteredPurchases: Purchase[] =
    selectedStatus.length > 0
      ? purchases.filter((p) => selectedStatus.includes(p.status))
      : purchases;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />

        <div className="min-h-screen bg-white px-4 py-6">
          <FilterSection
            selectedStatus={selectedStatus}
            onToggleStatus={toggleStatus}
            onClearFilters={clearFilters}
          />

          <ActiveFilters
            selectedStatus={selectedStatus}
            onToggleStatus={toggleStatus}
          />

          <PurchaseTable purchases={filteredPurchases} />

          <PaginationSection
            totalItemCount={12}
            limit={5}
            currentPage={1}
            onPageChange={() => console.log("test")}
          />

          {/* Mobile Card View */}
          <section className="space-y-4 lg:hidden">
            {filteredPurchases.map((purchase, index) => (
              <PurchaseCard key={index} purchase={purchase} />
            ))}
          </section>

          {/* Empty State */}
          {filteredPurchases.length === 0 && (
            <EmptyState onClearFilters={clearFilters} />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

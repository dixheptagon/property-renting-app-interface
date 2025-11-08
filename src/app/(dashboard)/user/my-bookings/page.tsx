"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { Sparkles, FileText } from "lucide-react";
import PageHeader from "./_components/page.header";
import BookingCard from "./_components/booking.card";
import OrderHistoryCard from "./_components/order.history.card";
import QuickStats from "./_components/quick.stats";
import { useMyBookings } from "./_hooks/use.my.bookings";
import LoadingData from "@/components/ui/loading.data";
import { Button } from "@/components/ui/button";

export default function MyBooking() {
  const { bookings, totalCompleted, loading, error, refetch } = useMyBookings();

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <PageHeader />
          <div className="flex min-h-screen items-center justify-center bg-white px-4 py-6">
            <LoadingData />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <PageHeader />
          <div className="flex min-h-screen items-center justify-center bg-white px-4 py-6">
            <div className="text-center">
              <p className="text-red-600">Error loading bookings: {error}</p>
            </div>

            <Button
              className="mt-6 w-full py-4 text-base shadow-md md:py-6 md:text-lg"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />

        <div className="min-h-screen bg-white px-4 py-6">
          {/* Active E-tickets Section */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                Active E-tickets
              </span>
            </div>

            {bookings ? (
              bookings.map((booking) => (
                <BookingCard key={booking.order_id} booking={booking} />
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">No active bookings found</p>
              </div>
            )}
          </div>

          {/* Order List Section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                Order History
              </span>
            </div>

            <OrderHistoryCard />
          </div>

          <QuickStats
            totalCompleted={totalCompleted}
            activeBookings={bookings.length}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { useAwaitingReviews } from "./_hooks/use.awaiting.reviews";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import PageHeader from "./_components/page.header";
import LoadingData from "@/components/ui/loading.data";
import { Button } from "@/components/ui/button";
import { CircleX, FileText, Star } from "lucide-react";
import AwaitingReviewCard from "./_components/awaiting.review.card";
import OrderHistoryCard from "./_components/order.history.card";

export default function MyReviews() {
  const { awaitingReviews, isLoading, isError, error, refetch } =
    useAwaitingReviews();

  console.log(awaitingReviews);

  if (isLoading) {
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

  if (isError) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <PageHeader />
          <div className="flex min-h-screen items-center justify-center bg-white px-4 py-6">
            <div className="text-center">
              <p className="text-red-600">
                Error loading My Reviews: {error?.message}
              </p>
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
              <Star className="h-6 w-6 stroke-3 text-yellow-500" />
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                Awaiting Review
              </span>
            </div>
          </div>

          {awaitingReviews && awaitingReviews.length > 0 ? (
            awaitingReviews.map((review) => (
              <AwaitingReviewCard key={review.booking_uid} review={review} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-gray-500">
              <CircleX className="h-10 w-10 stroke-2 text-gray-400" />
              <p className="text-lg">No awaiting reviews found</p>
            </div>
          )}

          {/* Purchase List Section */}
          <div>
            <div className="my-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                Purchase History
              </span>
            </div>

            <OrderHistoryCard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

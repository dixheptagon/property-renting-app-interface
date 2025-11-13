"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "../_components/app-sidebar";
import PageHeader from "./_components/page.header";
import { FileText, Star } from "lucide-react";
import OrderHistoryCard from "./_components/order.history.card";
import { Tabs } from "@/components/ui/tabs";
import AwaitingReviews from "./_components/awaiting.reviews";
import CompleteReviews from "./_components/complete.reviews";

export default function MyReviews() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />

        <div className="min-h-screen bg-white px-4 py-6">
          <div className="mx-auto w-full">
            {/* Tabs  */}
            <Tabs defaultValue="awaiting_reviews">
              <TabsList className="mx-auto h-12 w-full">
                <TabsTrigger
                  value="awaiting_reviews"
                  className="text-md p-4 font-semibold"
                >
                  <Star className="h-6 w-6 stroke-3 text-yellow-500" />
                  Awating Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="completed_reviews"
                  className="text-md p-4 font-semibold"
                >
                  <Star className="h-6 w-6 fill-yellow-500 stroke-3 text-yellow-500" />
                  Completed Reviews
                </TabsTrigger>
              </TabsList>

              {/* Tabs Content */}
              <TabsContent value="awaiting_reviews">
                <AwaitingReviews />
              </TabsContent>
              <TabsContent value="completed_reviews" className="w-full">
                <CompleteReviews />
              </TabsContent>
            </Tabs>
          </div>

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

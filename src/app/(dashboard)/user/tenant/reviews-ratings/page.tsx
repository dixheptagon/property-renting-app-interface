import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReviewStats from "./_components/review.stats";
import { AppSidebar } from "../../_components/app-sidebar";
import PageHeader from "./_components/page.header";
import FilterSection from "./_components/filter.section";
import ReviewsData from "./_components/reviews.data";

export default function Reviews() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Page Header */}
        <PageHeader />

        <div className="min-h-screen space-y-4 bg-white px-4 py-4">
          <FilterSection />

          <ReviewStats />

          <ReviewsData />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

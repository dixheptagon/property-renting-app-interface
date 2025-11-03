import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { HousePlus } from "lucide-react";
import { SalesReport } from "./_components/sales.report";
import PropertyReport from "./_components/property.report";
import { AppSidebar } from "../../_components/app-sidebar";

export default function MyAccomodation() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-semibold sm:text-base">Report</span>
              <Button className="group/btn transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
                <HousePlus className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-15" />
                Add New Accomodation
              </Button>
            </div>
          </div>
        </header>

        <div className="min-h-screen space-y-2 bg-white px-4 py-4">
          <SalesReport />

          <PropertyReport />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

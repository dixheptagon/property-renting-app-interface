import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import PropertySelect from "./page-header-components/property.select";

export default function PageHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex w-full items-center justify-between">
          {/* Title */}
          <span className="text-sm font-semibold sm:text-base">
            Reviews & Ratings
          </span>

          {/* Choose Property Button */}

          <PropertySelect />
        </div>
      </div>
    </header>
  );
}

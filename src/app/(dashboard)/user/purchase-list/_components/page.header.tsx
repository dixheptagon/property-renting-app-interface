import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DateRangePicker } from "./date.range.picker";

interface PageHeaderProps {
  title?: string;
}

export default function PageHeader({
  title = "Purchase List",
}: PageHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-semibold sm:text-base">{title}</span>
          <DateRangePicker />
        </div>
      </div>
    </header>
  );
}

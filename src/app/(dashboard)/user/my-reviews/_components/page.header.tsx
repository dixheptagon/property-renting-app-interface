import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  title?: string;
}

export default function PageHeader({ title = "My Reviews" }: PageHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <span className="text-sm font-semibold sm:text-base">{title}</span>
      </div>
    </header>
  );
}

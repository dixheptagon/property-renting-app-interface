import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { usePurchaseSearchParams } from "../_utils/search.params";
import { DateRangePicker } from "./filter-components/date.range.picker";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarOff } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  onDateRangeChange?: (dateFrom: string, dateTo: string) => void;
}

export default function PageHeader({
  title = "Purchase List",
  onDateRangeChange,
}: PageHeaderProps) {
  const { setDateRange: setSearchDateRange } = usePurchaseSearchParams();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateRangeChange = (dateFrom: string, dateTo: string) => {
    if (onDateRangeChange) {
      onDateRangeChange(dateFrom, dateTo);
    } else {
      setSearchDateRange(dateFrom, dateTo);
    }
  };

  const handleClearDateRange = () => {
    setSearchDateRange("", "");
    setDateRange(undefined);
  };

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

          <div className="flex items-center gap-3">
            {/* Clear Date Range */}
            {dateRange && (
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={handleClearDateRange}
              >
                <CalendarOff />
                Clear Date Range
              </Button>
            )}

            <DateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

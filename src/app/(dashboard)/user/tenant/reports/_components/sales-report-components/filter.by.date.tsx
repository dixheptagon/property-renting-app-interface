"use client";

import * as React from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSalesReportSearchParams } from "../../_hooks/use.sales.report.search.params";

export function FilterByDate() {
  const isMobile = useIsMobile();
  const today = new Date();

  const { setDateRange: setReviewDateRange, filters } =
    useSalesReportSearchParams();

  // Convert filters date strings to Date objects for the calendar
  const dateRange: DateRange | undefined = React.useMemo(() => {
    if (filters.sales_date_from && filters.sales_date_to) {
      return {
        from: new Date(filters.sales_date_from),
        to: new Date(filters.sales_date_to),
      };
    }
    // Default to last 30 days if no filters set
    return {
      from: new Date(addDays(today, -30).getTime()),
      to: today,
    };
  }, [filters.sales_date_from, filters.sales_date_to, today]);

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setReviewDateRange(
      newDateRange?.from ? newDateRange.from.toISOString() : null,
      newDateRange?.to ? newDateRange.to.toISOString() : null
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!dateRange}
          className="justify-start bg-blue-600 text-left font-semibold hover:bg-blue-700 data-[empty=false]:text-white data-[empty=true]:text-white data-[state=open]:bg-blue-700"
        >
          <CalendarIcon />
          {dateRange?.from && dateRange?.to ? (
            <>
              {format(dateRange.from, "LLL dd, y")} to{" "}
              {format(dateRange.to, "LLL dd, y")}
            </>
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="m-4 w-auto shadow-md">
        <Calendar
          mode="range"
          defaultMonth={
            dateRange?.from && dateRange.to ? dateRange.from : new Date()
          }
          selected={dateRange}
          onSelect={handleDateRangeChange}
          numberOfMonths={isMobile ? 1 : 2}
          disabled={{ after: today }}
          min={30}
          max={186}
        />
        <div className="text-muted-foreground my-3 text-center text-xs">
          A minimum of 30 days is required & maximum of 6 months
        </div>

        {/* With Presets */}
        <div className="flex gap-2 border-t px-4 pt-4">
          {[
            { label: "In a month", value: 30 },
            { label: "In 2 months", value: 60 },
            { label: "In 3 months", value: 90 },
            { label: "In 6 months", value: 180 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const newDate = addDays(new Date(), -preset.value);
                handleDateRangeChange({ from: newDate, to: today });
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

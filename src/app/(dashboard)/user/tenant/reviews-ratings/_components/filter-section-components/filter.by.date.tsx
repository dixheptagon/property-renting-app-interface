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
import { useReviewSearchParams } from "../../_hooks/use.review.search.params";

export function FilterByDate() {
  const isMobile = useIsMobile();
  const today = new Date();

  const { setDateRange: setReviewDateRange, filters } = useReviewSearchParams();

  // Convert filters date strings to Date objects for the calendar
  const dateRange: DateRange | undefined = React.useMemo(() => {
    if (filters.date_from && filters.date_to) {
      return {
        from: new Date(filters.date_from),
        to: new Date(filters.date_to),
      };
    }
    // Default to last 30 days if no filters set
    return {
      from: new Date(addDays(today, -30).getTime()),
      to: today,
    };
  }, [filters.date_from, filters.date_to, today]);

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
          className="justify-center bg-blue-600 text-left font-semibold hover:bg-blue-700 data-[empty=false]:text-white data-[empty=true]:text-white data-[state=open]:bg-blue-700"
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
        />
        <div className="text-muted-foreground text-center text-xs">
          A minimum of 7 days is required
        </div>

        {/* With Presets */}
        <div className="flex gap-2 border-t px-4 pt-4">
          {[
            { label: "In a week", value: 7 },
            { label: "In 2 weeks", value: 14 },
            { label: "In a month", value: 30 },
            { label: "In 2 months", value: 60 },
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

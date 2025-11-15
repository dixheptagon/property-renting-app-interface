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
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30), // a month ago
    to: today,
  });

  const { setDateRange: setReviewDateRange } = useReviewSearchParams();

  React.useEffect(() => {
    if (dateRange) {
      setReviewDateRange(
        dateRange.from ? dateRange.from.toISOString() : null,
        dateRange.to ? dateRange.to.toISOString() : null
      );
    }
  }, [dateRange]);

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
          onSelect={setDateRange}
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
                setDateRange({ from: newDate, to: today });
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

"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangePicker() {
  const today = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3), // 3 days ago
    to: today,
  });

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
          numberOfMonths={2}
          min={3}
          disabled={{
            after: today,
          }}
        />
        <div className="text-muted-foreground text-center text-xs">
          A minimum of 3 days is required
        </div>
      </PopoverContent>
    </Popover>
  );
}

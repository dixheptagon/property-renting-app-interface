"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBookingStore } from "@/stores/booking.store";

const isPastDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export default function DatePickerRange() {
  const { dateRange, setDateRange } = useBookingStore();
  const [mode, setMode] = useState<"single" | "range">("single");
  const [open, setOpen] = useState(false);

  const handleDateSelect = (range: DateRange | undefined) => {
    if (!range || !range.from) return;

    // Check if this is a new check-in date (different from current from)
    const isNewStart =
      !dateRange?.from || range.from.getTime() !== dateRange.from.getTime();

    if (isNewStart) {
      // Start a new range selection
      setDateRange({ from: range.from, to: undefined });
      setMode("range");
    } else if (
      range.to &&
      range.to > range.from &&
      range.to.getTime() !== range.from.getTime()
    ) {
      // Complete the range selection
      setDateRange(range);
      setMode("single");
      setOpen(false); // Close popover after selecting both dates
    } else if (range.to && range.to.getTime() === range.from.getTime()) {
      // Same day selection - don't allow
      return;
    } else {
      // Invalid selection (e.g., check-out before check-in) - reset
      setDateRange({ from: range.from, to: undefined });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      // Clear date range when opening the picker
      setDateRange(undefined);
      setMode("single");
    } else if (!newOpen && mode === "range" && !dateRange?.to) {
      // If closing without selecting check-out, reset
      setDateRange(undefined);
      setMode("single");
    }
  };

  return (
    <div className="w-full space-y-2">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className="w-full justify-between p-5 font-normal"
          >
            {dateRange?.from instanceof Date && dateRange?.to instanceof Date
              ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
              : dateRange?.from instanceof Date
                ? `Check-in: ${dateRange.from.toLocaleDateString()} - Select check-out`
                : "Pick a date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateSelect}
            disabled={isPastDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

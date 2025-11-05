// LandingPageDatePicker Component
"use client";
import * as React from "react";
import { ChevronDownIcon, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "../../../../_utils/format.date";

interface LandingPageDatePickerProps {
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
}

export function LandingPageDatePicker({
  onDateRangeChange,
}: LandingPageDatePickerProps) {
  const today = new Date();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    if (onDateRangeChange) {
      onDateRangeChange(newDateRange);
    }
  };

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="h-10 w-full justify-between font-medium text-gray-900 focus:ring-3 focus:ring-gray-500"
          >
            <span className="truncate">
              {dateRange
                ? `${formatDate(dateRange?.from)} - ${formatDate(dateRange?.to)}`
                : "Pick dates"}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start"
          side="bottom"
          avoidCollisions={false}
        >
          <div className="grid grid-cols-2 gap-4 border-b bg-gray-100 p-4 text-sm font-semibold text-gray-600">
            <div>
              <h2 className="mb-1">Check-in</h2>
              <p className="text-base text-black">
                {formatDate(dateRange?.from)}
              </p>
            </div>
            <div>
              <h2 className="mb-1">Check-out</h2>
              <p className="text-base text-black">
                {formatDate(dateRange?.to)}
              </p>
            </div>
          </div>
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={isMobile ? 1 : 2}
            className="rounded-lg"
            disabled={{
              before: today,
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

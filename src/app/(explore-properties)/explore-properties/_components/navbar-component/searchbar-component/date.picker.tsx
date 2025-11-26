// LandingPageDatePicker Component
"use client";
import * as React from "react";
import { ChevronDownIcon, CalendarDays, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "../../../_utils/format.date";
import { usePropertySearchParams } from "../../../_hooks/use.property.search.params";

export function LandingPageDatePicker() {
  const today = new Date();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const {
    setDateRange: setPropertyDateRange,
    filters,
    clearDateRange,
  } = usePropertySearchParams();

  // Convert filters date strings to Date objects for initial state
  const initialDateRange: DateRange | undefined = React.useMemo(() => {
    if (filters.checkin && filters.checkout) {
      return {
        from: new Date(filters.checkin),
        to: new Date(filters.checkout),
      };
    }
    return undefined;
  }, [filters.checkin, filters.checkout]);

  const [localDateRange, setLocalDateRange] = React.useState<
    DateRange | undefined
  >(initialDateRange);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setLocalDateRange(range);
  };

  React.useEffect(() => {
    if (
      localDateRange?.from?.toISOString() === filters.checkin &&
      localDateRange?.to?.toISOString() === filters.checkout
    )
      return;

    if (localDateRange?.from && localDateRange?.to) {
      setPropertyDateRange(
        localDateRange.from.toISOString(),
        localDateRange.to.toISOString()
      );
    }
  }, [localDateRange, setPropertyDateRange, filters.checkin, filters.checkout]);

  React.useEffect(() => {
    setLocalDateRange(initialDateRange);
  }, [initialDateRange]);

  const handleClearDateRange = () => {
    setLocalDateRange(undefined);
    setPropertyDateRange("", "");
  };

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="h-10 w-full text-start font-medium text-gray-900 focus:ring-3 focus:ring-gray-500"
          >
            <CalendarDays className="h-4 w-4" />
            <span className="truncate">
              {localDateRange?.from && localDateRange?.to
                ? `${formatDate(localDateRange?.from)} - ${formatDate(localDateRange?.to)}`
                : "Pick dates"}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0" />
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
                {formatDate(localDateRange?.from)}
              </p>
            </div>
            <div>
              <h2 className="mb-1">Check-out</h2>
              <p className="text-base text-black">
                {formatDate(localDateRange?.to)}
              </p>
            </div>
          </div>
          <Calendar
            mode="range"
            defaultMonth={
              localDateRange?.from && localDateRange.to
                ? localDateRange.from
                : new Date()
            }
            selected={localDateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={isMobile ? 1 : 2}
            className="rounded-lg"
            disabled={{
              before: today,
            }}
            min={1}
          />

          {localDateRange?.from && localDateRange?.to && (
            <div className="flex justify-center border-t p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearDateRange}
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
                Clear dates
              </Button>
            </div>
          )}

          <div className="text-muted-foreground my-4 text-center text-xs">
            A minimum of 1 nights is required
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

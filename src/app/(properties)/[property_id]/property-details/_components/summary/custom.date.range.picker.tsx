"use client";

import { useMemo } from "react";
import { ChevronDownIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/app/(properties)/property-details/_components/summary/custom.calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBookingStore } from "@/app/(properties)/_stores/booking.store";
import {
  PeakSeasonRate,
  RoomUnavailability,
} from "@/app/(properties)/property-details/_types/property";

export default function DatePickerRange({
  room_unavailabilities,
  room_price,
  peak_season_price,
}: {
  room_unavailabilities: RoomUnavailability[];
  room_price: number;
  peak_season_price: PeakSeasonRate[];
}) {
  // 🔒 Compute disabled days from unavailabilities
  const disabledDays = useMemo(
    () => [
      { before: new Date() },
      ...room_unavailabilities.map((item) => ({
        from: new Date(item.start_date),
        to: new Date(item.end_date),
      })),
    ],
    [room_unavailabilities]
  );

  // 🧠 Flatten unavailable date ranges into a sorted array of actual Date objects
  const unavailableDates = useMemo(() => {
    const allDates: Date[] = [];
    room_unavailabilities.forEach((u) => {
      const start = new Date(u.start_date);
      const end = new Date(u.end_date);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        allDates.push(new Date(d));
      }
    });
    return allDates.sort((a, b) => a.getTime() - b.getTime());
  }, [room_unavailabilities]);

  const { dateRange, setDateRange } = useBookingStore();

  // 🧩 Handle select logic
  const handleSelect = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from) {
      setDateRange(undefined);
      return;
    }

    // cari tanggal disabled terdekat setelah check-in
    const nextUnavailable = unavailableDates.find((d) => d > dateRange.from!);

    // jika user pilih check-out yang melewati unavailable date
    if (dateRange.to && nextUnavailable && dateRange.to >= nextUnavailable) {
      // batasi check-out sebelum tanggal unavailable
      const adjustedTo = new Date(nextUnavailable);
      adjustedTo.setDate(adjustedTo.getDate() - 1);
      setDateRange({ from: dateRange.from, to: adjustedTo });
    } else {
      setDateRange(dateRange);
    }
  };

  return (
    <div className="w-full space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className="w-full justify-between p-5 font-normal"
          >
            {dateRange?.from instanceof Date && dateRange?.to instanceof Date
              ? `${dateRange.from.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} - ${dateRange.to.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}`
              : dateRange?.from instanceof Date
                ? `Check-in: ${dateRange.from.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} - Select check-out`
                : "Pick a date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto overflow-hidden p-0"
          align="start"
          sideOffset={-200}
          alignOffset={-10}
        >
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleSelect}
            disabled={disabledDays}
            room_price={room_price}
            peak_season_price={peak_season_price}
            room_unavailabilities={room_unavailabilities}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

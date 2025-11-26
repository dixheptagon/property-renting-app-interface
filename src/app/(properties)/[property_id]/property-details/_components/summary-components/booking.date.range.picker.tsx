"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  addDays,
  eachDayOfInterval,
  isAfter,
  isBefore,
  isEqual,
  startOfDay,
} from "date-fns";
import { useEffect, useState } from "react";
import {
  BookingCalendar,
  CalendarDayButton,
} from "./booking-calendar-components/booking.calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import RoomAvailabilityLegend from "./booking-calendar-components/room.availability.legend";
import { DateRange } from "react-day-picker";
import { formatDate } from "../../_utils/format.date";
import { useBookingStore } from "@/app/(properties)/_stores/booking.store";
import { formatPriceShort } from "../../_utils/format.price.short";

export default function BookingDateRangePicker() {
  const isMobile = useIsMobile();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [hasSelected, setHasSelected] = useState(false);
  const { dateRange: storedDateRange, setDateRange: setStoredDateRange } =
    useBookingStore();

  const { property, selectedRoom } = useBookingStore();

  // Map room unavailability data to a more usable format
  const roomUnavailabilities = (property?.room_unavailabilities || []).filter(
    (unavailability) => unavailability.room_id === selectedRoom?.id
  );
  const DatesUnavailabilities = roomUnavailabilities.flatMap(
    (unavailability) => {
      return eachDayOfInterval({
        start: new Date(unavailability.start_date),
        end: new Date(unavailability.end_date),
      });
    }
  );

  //   Map Peak Season Dates
  const peakSeasonRates = (property?.peak_season_rates || []).filter(
    (rate) => !rate.room_id || rate.room_id === selectedRoom?.id
  );
  const peakSeasonDates = peakSeasonRates.flatMap((peakSeason) => {
    return eachDayOfInterval({
      start: new Date(peakSeason.start_date),
      end: new Date(peakSeason.end_date),
    });
  });

  const [dynamicDisabledDates, setDynamicDisabledDates] = useState<any[]>([]);

  // Update dynamic disabled dates based on the selected date range
  useEffect(() => {
    if (!dateRange?.from) {
      setDynamicDisabledDates([]);
      return;
    }

    // Normalize dates to start of day for accurate comparison
    const from = startOfDay(dateRange.from);
    const normalizedUnavail = DatesUnavailabilities.map((d) => startOfDay(d));

    // Split unavailable dates into before and after the selected 'from' date
    const after = normalizedUnavail
      .filter((d) => isAfter(d, from))
      .sort((a, b) => +a - +b); // ascending

    const before = normalizedUnavail
      .filter((d) => isBefore(d, from))
      .sort((a, b) => +b - +a); // descending

    const nextUnavailable = after.length > 0 ? after[0] : undefined;
    const prevUnavailable = before.length > 0 ? before[0] : undefined;

    // CASE: Selected 'from' date is on an unavailable date
    const isOnUnavailable = normalizedUnavail.some((d) => isEqual(d, from));
    if (isOnUnavailable) {
      // Option: clear dynamic disabled (or block further selection)
      setDynamicDisabledDates([]);
      return;
    }

    if (
      nextUnavailable &&
      (!prevUnavailable || isBefore(nextUnavailable, from))
    ) {
      // Next unavailable date is closer
      setDynamicDisabledDates([{ after: addDays(nextUnavailable, -1) }]);
      return;
    }

    if (prevUnavailable) {
      // Previous unavailable date is closer
      setDynamicDisabledDates([{ before: addDays(prevUnavailable, 1) }]);
      return;
    }

    // No unavailable dates found, clear dynamic disabled dates
    setDynamicDisabledDates([]);
  }, [dateRange?.from]);

  // 🧩 Handle select logic
  const handleDateSelect = (range: DateRange | undefined) => {
    if (range?.from) setHasSelected(true);
    setDateRange(range);
    setStoredDateRange(range);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!dateRange?.from && !dateRange?.to}
          className="data-[empty=true]:text-muted-foreground w-full justify-start p-5 text-left font-normal"
          onClick={() => {
            setDateRange(undefined);
            setDynamicDisabledDates([]);
            setHasSelected(false);
          }}
        >
          <CalendarIcon />
          {storedDateRange?.from && storedDateRange?.to ? (
            `${formatDate(storedDateRange.from)} - ${formatDate(storedDateRange.to)}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={-200}
        className="w-auto p-0 shadow-lg"
      >
        <RoomAvailabilityLegend />
        <hr />
        <BookingCalendar
          mode="range"
          numberOfMonths={isMobile ? 1 : 2}
          defaultMonth={dateRange?.from || new Date()}
          min={1}
          modifiers={{
            past: { before: new Date() },
            unavailable: DatesUnavailabilities,
            peak: peakSeasonDates,
          }}
          modifiersClassNames={{
            past: "opacity-50 cursor-not-allowed",
            unavailable:
              "[&>button]:line-through bg-red-300  opacity-50 text-red-700 cursor-not-allowed",
            peak: "bg-yellow-100 text-yellow-800 font-medium",
          }}
          selected={dateRange}
          onSelect={handleDateSelect}
          disabled={[
            ...DatesUnavailabilities,
            { before: new Date(addDays(new Date(), 1)) },
            ...dynamicDisabledDates,
          ]}
          className="rounded-b-lg [--cell-size:--spacing(9)] md:[--cell-size:--spacing(10)]"
          formatters={{
            formatMonthDropdown: (date) =>
              date.toLocaleString("default", { month: "long" }),
          }}
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const isWeekend =
                day.date.getDay() === 0 || day.date.getDay() === 6;

              const isPeak = peakSeasonDates.some(
                (d) => d.toDateString() === day.date.toDateString()
              );

              // Harga dasar
              let basePrice = selectedRoom?.base_price || 0;

              // Kalau peak season, tambahkan adjustment
              if (isPeak) {
                const peakSeason = peakSeasonRates.find((ps) => {
                  const start = startOfDay(new Date(ps.start_date));
                  const end = startOfDay(new Date(ps.end_date));
                  const dayNormalized = startOfDay(day.date);
                  return dayNormalized >= start && dayNormalized <= end;
                });
                const adjustment = peakSeason
                  ? Number(peakSeason.adjustment_value)
                  : 0;
                const adjusted =
                  Number(basePrice) + Number(basePrice * adjustment) / 100;
                basePrice = adjusted;
              }

              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}
                  {!modifiers.outside && (
                    <span
                      className={`text-xs ${
                        isPeak
                          ? "font-semibold text-yellow-700"
                          : "text-gray-800"
                      }`}
                    >
                      {formatPriceShort(basePrice)}
                    </span>
                  )}
                </CalendarDayButton>
              );
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

import {
  Property,
  Room,
} from "@/app/(properties)/property-details/_types/property";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type DateRange } from "react-day-picker";
import { differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";

interface BookingState {
  property: Property | null;
  propertyId: string | null;
  propertyName: string | null;
  selectedRoom: Room | null;
  dateRange: DateRange | undefined;
  guests: number;
  totalNights: number;
  total: number;

  basePrice: number;
  normalNights: number;
  peakSeasonPrice: number;
  peakSeasonNights: number;

  // Actions
  setProperty: (property: Property) => void;
  setRoom: (room: Room) => void;
  setDateRange: (dateRange: DateRange | undefined) => void;
  setGuests: (count: number) => void;
  calculateTotal: () => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      property: null,
      propertyId: null,
      propertyName: null,
      selectedRoom: null,
      dateRange: undefined,
      guests: 1,
      totalNights: 0,
      total: 0,

      basePrice: 0,
      normalNights: 0,
      peakSeasonPrice: 0,
      peakSeasonNights: 0,

      setProperty: (property) =>
        set({
          property,
          propertyId: property.uid,
          propertyName: property.title,
        }),

      setRoom: (room) => {
        set({ selectedRoom: room });
        get().calculateTotal();
      },

      setDateRange: (dateRange) => {
        set({ dateRange });
        get().calculateTotal();
      },
      setGuests: (count) => set({ guests: count }),

      calculateTotal: () => {
        const { dateRange, selectedRoom, property } = get();
        if (!dateRange?.from || !dateRange?.to || !selectedRoom || !property)
          return;

        const days = eachDayOfInterval({
          start: dateRange.from,
          end: dateRange.to,
        });

        let total = 0;
        let normalNights = 0;
        let peakSeasonNights = 0;

        days.forEach((day) => {
          const peak = property.peak_season_rates.find((rate) => {
            const start = new Date(rate.start_date);
            const end = new Date(rate.end_date);
            return (
              (!rate.room_id || rate.room_id === selectedRoom.id) &&
              day >= start &&
              day <= end
            );
          });

          if (peak) {
            peakSeasonNights++;
            const peakPrice =
              peak.adjustment_type === "percentage"
                ? selectedRoom.base_price * (1 + peak.adjustment_value / 100)
                : selectedRoom.base_price + peak.adjustment_value;
            total += peakPrice;
          } else {
            normalNights++;
            total += selectedRoom.base_price;
          }
        });

        set({
          totalNights: days.length - 1,
          total,
          basePrice: selectedRoom.base_price,
          normalNights,
          peakSeasonPrice:
            selectedRoom.base_price +
              (property.peak_season_rates.find(
                (rate) => !rate.room_id || rate.room_id === selectedRoom.id
              )?.adjustment_type === "percentage"
                ? (selectedRoom.base_price *
                    (property.peak_season_rates.find(
                      (rate) =>
                        !rate.room_id || rate.room_id === selectedRoom.id
                    )?.adjustment_value || 0)) /
                  100
                : property.peak_season_rates.find(
                    (rate) => !rate.room_id || rate.room_id === selectedRoom.id
                  )?.adjustment_value || 0) || selectedRoom.base_price,
          peakSeasonNights,
        });
      },

      clearBooking: () => {
        const currentProperty = get().property;
        set({
          selectedRoom: null,
          dateRange: undefined,
          guests: 1,
          totalNights: 0,
          total: 0,
          basePrice: 0,
          normalNights: 0,
          peakSeasonPrice: 0,
          peakSeasonNights: 0,
        });
        // Keep property data so calculateTotal can work when dates are selected again
      },
    }),
    {
      name: "booking-storage",

      partialize: (state) => ({
        propertyId: state.propertyId,
        propertyName: state.propertyName,
        selectedRoom: state.selectedRoom,
      }),
    }
  )
);

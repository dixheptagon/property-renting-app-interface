import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type DateRange } from "react-day-picker";
import { eachDayOfInterval } from "date-fns";
import {
  Property,
  RoomData,
} from "../[property_id]/property-details/_types/property";

interface BookingState {
  property: Property | null;
  propertyId: string | null;
  propertyName: string | null;
  selectedRoom: RoomData | null;
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
  setRoom: (room: RoomData) => void;
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

        const nights = days.length - 1; // total nights
        if (nights <= 0) return;

        let total = 0;
        let normalNights = 0;
        let peakSeasonNights = 0;
        const basePrice = Number(selectedRoom.base_price);

        // Helper to convert date to date-only number for comparison
        const toDateOnly = (date: Date): number => {
          return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        };

        // Hanya loop sebanyak malam (bukan termasuk check-out)
        for (let i = 0; i < nights; i++) {
          const day = days[i]; // hari menginap
          const dayOnly = toDateOnly(day);

          const peak = property.peak_season_rates.find((rate) => {
            const start = toDateOnly(new Date(rate.start_date));
            const end = toDateOnly(new Date(rate.end_date));
            const roomMatch = !rate.room_id || rate.room_id === selectedRoom.id;
            const dateMatch = dayOnly >= start && dayOnly <= end;
            return roomMatch && dateMatch;
          });

          let nightPrice: number;
          if (peak) {
            peakSeasonNights++;
            nightPrice =
              peak.adjustment_type === "percentage"
                ? basePrice * (1 + peak.adjustment_value / 100)
                : basePrice + peak.adjustment_value;
          } else {
            normalNights++;
            nightPrice = basePrice;
          }

          total += nightPrice;
        }

        // Optional: hitung peak price rata-rata atau contoh
        const peakRateDates = property.peak_season_rates.find(
          (rate) => !rate.room_id || rate.room_id === selectedRoom.id
        );

        const peakSeasonPrice = peakRateDates
          ? peakRateDates.adjustment_type === "percentage"
            ? basePrice * (1 + peakRateDates.adjustment_value / 100)
            : basePrice + peakRateDates.adjustment_value
          : basePrice;

        set({
          totalNights: nights,
          total,
          basePrice,
          normalNights,
          peakSeasonNights,
          peakSeasonPrice,
        });
      },

      clearBooking: () => {
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
        property: state.property,
        propertyId: state.propertyId,
        propertyName: state.propertyName,
        selectedRoom: state.selectedRoom,
        dateRange: state.dateRange,
        basePrice: state.basePrice,
        normalNights: state.normalNights,
        peakSeasonPrice: state.peakSeasonPrice,
        peakSeasonNights: state.peakSeasonNights,
        totalNights: state.totalNights,
        total: state.total,
      }),
    }
  )
);

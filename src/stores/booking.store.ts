import { Property, Room } from "@/types/property";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type DateRange } from "react-day-picker";

interface BookingState {
  property: Property | null;
  propertyId: string | null;
  propertyName: string | null;
  selectedRoom: Room | null;
  dateRange: DateRange | undefined;
  guests: number;
  totalNights: number;
  total: number;

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
        const state = get();
        if (
          !state.selectedRoom ||
          !state.dateRange?.from ||
          !state.dateRange?.to
        ) {
          return;
        }

        const checkIn = new Date(state.dateRange.from);
        const checkOut = new Date(state.dateRange.to);
        console.log(checkIn, checkOut);
        const nights = Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );

        const total = state.selectedRoom.base_price * nights;

        set({
          totalNights: nights,
          total,
        });
      },

      clearBooking: () =>
        set({
          property: null,
          propertyId: null,
          propertyName: null,
          selectedRoom: null,
          dateRange: undefined,
          guests: 1,
          totalNights: 0,
          total: 0,
        }),
    }),
    {
      name: "booking-storage",
    }
  )
);

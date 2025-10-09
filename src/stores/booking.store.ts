import { useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Room {
  id: string;
  name: string;
  type: string;
  pricePerNight: number;
}

interface BookingState {
  propertyId: string | null;
  propertyName: string | null;
  selectedRoom: Room | null;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalNights: number;
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;

  // Actions
  setProperty: (id: string, name: string) => void;
  setRoom: (room: Room) => void;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setGuests: (count: number) => void;
  calculateTotal: () => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      propertyId: null,
      propertyName: null,
      selectedRoom: null,
      checkInDate: '',
      checkOutDate: '',
      guests: 2,
      totalNights: 0,
      subtotal: 0,
      tax: 0,
      serviceFee: 0,
      total: 0,

      setProperty: (id, name) => set({ propertyId: id, propertyName: name }),

      setRoom: (room) => {
        set({ selectedRoom: room });
        get().calculateTotal();
      },

      setCheckInDate: (date) => {
        set({ checkInDate: date });
        get().calculateTotal();
      },

      setCheckOutDate: (date) => {
        set({ checkOutDate: date });
        get().calculateTotal();
      },

      setGuests: (count) => set({ guests: count }),

      calculateTotal: () => {
        const state = get();
        if (!state.selectedRoom || !state.checkInDate || !state.checkOutDate) {
          return;
        }

        const checkIn = new Date(state.checkInDate);
        const checkOut = new Date(state.checkOutDate);
        const nights = Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );

        const subtotal = state.selectedRoom.pricePerNight * nights;
        const tax = subtotal * 0.11; // 11% tax
        const serviceFee = subtotal * 0.05; // 5% service fee
        const total = subtotal + tax + serviceFee;

        set({
          totalNights: nights,
          subtotal,
          tax,
          serviceFee,
          total,
        });
      },

      clearBooking: () =>
        set({
          propertyId: null,
          propertyName: null,
          selectedRoom: null,
          checkInDate: '',
          checkOutDate: '',
          guests: 2,
          totalNights: 0,
          subtotal: 0,
          tax: 0,
          serviceFee: 0,
          total: 0,
        }),
    }),
    {
      name: 'booking-storage',
    }
  )
);

// ============================================
// MOCK STORE FOR DEMO - Remove this when using real Zustand
// ============================================
export const useMockBookingStore = () => {
  const [state] = useState({
    selectedRoom: {
      id: '1',
      name: 'Deluxe Ocean View',
      type: 'Deluxe',
      pricePerNight: 850000,
    },
    checkInDate: '2025-10-31',
    checkOutDate: '2025-11-02',
    guests: 2,
    totalNights: 2,
    subtotal: 1700000,
    tax: 187000,
    serviceFee: 85000,
    total: 1972000,
  });
  return state;
};

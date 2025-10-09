'use client';
import { useMockBookingStore } from '@/stores/booking.store';
import { Calendar, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';

export default function PropertySummary() {
  // Replace with real Zustand store: const bookingState = useBookingStore();
  const bookingState = useMockBookingStore();

  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select date';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

  const handleBookNow = () => {
    // Navigate to payment page or show confirmation
    console.log('Booking:', bookingState);
    alert('Proceeding to payment...');
  };

  if (!bookingState.selectedRoom) {
    return (
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-lg">
        <p className="text-center text-gray-500">
          Please select a room to continue
        </p>
      </div>
    );
  }

  return (
    <div className="z-20 mx-auto max-w-7xl py-10">
      <div className="sticky top-6 overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-lg">
        {/* Room Type Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
          <p className="mb-1 text-sm font-medium text-white">Selected Room</p>
          <h3 className="text-xl font-bold text-white">
            {bookingState.selectedRoom.name}
          </h3>
        </div>

        <div className="p-6">
          {/* Price Display */}
          <div className="mb-6">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(bookingState.selectedRoom.pricePerNight)}
              </span>
              <span className="text-gray-600">/ night</span>
            </div>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          {/* Check-in / Check-out */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="cursor-pointer rounded-lg border-2 border-gray-200 p-3 transition-colors hover:border-blue-400">
              <label className="mb-1 block text-xs font-medium text-gray-500">
                CHECK-IN
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">
                  {formatDate(bookingState.checkInDate)}
                </span>
              </div>
            </div>

            <div className="cursor-pointer rounded-lg border-2 border-gray-200 p-3 transition-colors hover:border-blue-400">
              <label className="mb-1 block text-xs font-medium text-gray-500">
                CHECK-OUT
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">
                  {formatDate(bookingState.checkOutDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Guests Selector */}
          <div className="relative mb-6">
            <label className="mb-2 block text-xs font-medium text-gray-500">
              TAMU
            </label>
            <button
              onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
              className="flex w-full items-center justify-between rounded-lg border-2 border-gray-200 p-3 transition-colors hover:border-blue-400"
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">
                  {bookingState.guests} tamu
                </span>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transition-transform ${guestDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown - Hidden for now, but you can add increment/decrement buttons */}
            {guestDropdownOpen && (
              <div className="absolute top-full right-0 left-0 z-10 mt-2 rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Number of guests
                  </span>
                  <div className="flex items-center gap-3">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 hover:border-blue-500">
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {bookingState.guests}
                    </span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 hover:border-blue-500">
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="mb-4 space-y-3 border-t-2 border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {formatPrice(bookingState.selectedRoom.pricePerNight)} ×{' '}
                {bookingState.totalNights} nights
              </span>
              <span className="font-semibold text-gray-900">
                {formatPrice(bookingState.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (11%)</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(bookingState.tax)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee (5%)</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(bookingState.serviceFee)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="mb-6 border-t-2 border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(bookingState.total)}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-gray-500">
              for {bookingState.totalNights} nights
            </p>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
          >
            Book Now
          </button>

          <p className="mt-3 text-center text-xs text-gray-500">
            You won't be charged yet
          </p>
        </div>
      </div>
    </div>
  );
}

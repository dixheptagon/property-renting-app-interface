"use client";

import { Label } from "@/components/ui/label";
import { useBookingStore } from "@/app/(properties)/_stores/booking.store";
import { CircleX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BookingDateRangePicker, GuestDropdown } from "./summary-components";

export default function PropertySummary() {
  const router = useRouter();
  const params = useParams();
  const bookingState = useBookingStore();

  const propertyId = params.property_id;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBookNow = () => {
    // Navigate to payment page or show confirmation
    router.push(`/${propertyId}/booking`);
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
    <div className="" id="booked">
      <div className="rounded-xl border-2 border-gray-200 bg-white shadow-md">
        {/* Room Type Header */}
        <div className="relative rounded-t-xl bg-linear-to-b from-blue-500 to-blue-800 p-4">
          <p className="mb-1 text-sm font-medium text-white">Selected Room</p>
          <CircleX
            className="absolute top-3 right-5 h-8 w-8 text-white hover:text-red-500"
            onClick={bookingState.clearBooking}
          />
          <h3 className="text-xl font-bold text-white">
            {bookingState.selectedRoom.name}
          </h3>
        </div>

        <div className="p-6">
          {/* Price Display */}
          <div className="mb-3">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(bookingState.selectedRoom.base_price)}
              </span>
              <span className="text-gray-600">/ night</span>
            </div>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          {/* Date Range Picker */}
          <div className="mb-4">
            <Label htmlFor="dates" className="px-1 pb-2 text-xs text-gray-500">
              CHECK-IN / CHECK-OUT
            </Label>

            <BookingDateRangePicker />
          </div>

          {/* Guests Selector */}
          <div className="relative mb-4">
            <label className="mb-2 block text-xs font-medium text-gray-500">
              GUESTS
            </label>

            <GuestDropdown max_guest={bookingState.selectedRoom.max_guest} />
          </div>

          {/* Price Breakdown */}
          <div className="mb-4 space-y-3 border-t-2 border-gray-200 pt-4">
            <div className="flex flex-col">
              <div className="flex justify-between text-sm">
                {bookingState.normalNights > 0 && (
                  <>
                    <span className="text-gray-600">
                      {formatPrice(bookingState.selectedRoom.base_price)} ×{" "}
                      {bookingState.normalNights} nights
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(
                        bookingState.basePrice * bookingState.normalNights
                      )}
                    </span>
                  </>
                )}
              </div>
              <div className="flex justify-between text-sm">
                {bookingState.peakSeasonNights > 0 && (
                  <>
                    <span className="text-gray-600">
                      {formatPrice(bookingState.peakSeasonPrice)} ×{" "}
                      {bookingState.peakSeasonNights} nights
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(
                        bookingState.peakSeasonPrice *
                          bookingState.peakSeasonNights
                      )}
                    </span>
                  </>
                )}
              </div>
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
            disabled={
              !(bookingState.dateRange?.from && bookingState.dateRange?.to)
            }
            className="w-full rounded-lg bg-blue-600 py-4 font-bold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            Book Now
          </button>

          <p className="mt-3 text-center text-xs text-gray-500">
            You won&apos;t be charged yet
          </p>
        </div>
      </div>
    </div>
  );
}

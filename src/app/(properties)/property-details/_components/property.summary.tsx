"use client";
import DateRangePicker from "@/components/ui/date.range.picker";
import { GuestDropdown } from "@/components/ui/dropdown.guest.input";
import { useBookingStore } from "@/stores/booking.store";
import { Calendar, User } from "lucide-react";
import { DateRange } from "react-day-picker";
export default function PropertySummary() {
  const bookingState = useBookingStore();
  const { setCheckInDate, setCheckOutDate, setGuests } = useBookingStore();

  // Convert string dates to DateRange for the picker
  const dateRange: DateRange | undefined =
    bookingState.checkInDate && bookingState.checkOutDate
      ? {
          from: new Date(bookingState.checkInDate),
          to: new Date(bookingState.checkOutDate),
        }
      : undefined;

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setCheckInDate(range.from.toISOString().split("T")[0]);
    }
    if (range?.to) {
      setCheckOutDate(range.to.toISOString().split("T")[0]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Select date";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const handleBookNow = () => {
    // Navigate to payment page or show confirmation
    console.log("Booking:", bookingState);
    alert("Proceeding to payment...");
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
        <div className="rounded-t-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4">
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

          {/* Date Range Picker */}
          <div className="mb-4">
            <label className="mb-2 block text-xs font-medium text-gray-500">
              CHECK-IN / CHECK-OUT
            </label>
            <DateRangePicker />
          </div>

          {/* Guests Selector */}
          <div className="relative mb-6">
            <label className="mb-2 block text-xs font-medium text-gray-500">
              GUESTS
            </label>

            <GuestDropdown value={bookingState.guests} onChange={setGuests} />
          </div>

          {/* Price Breakdown */}
          <div className="mb-4 space-y-3 border-t-2 border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {formatPrice(bookingState.selectedRoom.pricePerNight)} ×{" "}
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

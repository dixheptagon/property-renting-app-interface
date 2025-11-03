"use client";
import { useBookingStore } from "@/app/(properties)/_stores/booking.store";
import Image from "next/image";
import { formatDate } from "../_utils/format.date";
import { formatPrice } from "../_utils/format.price";
import {
  Calendar,
  CalendarArrowDown,
  CalendarArrowUp,
  Clock,
  Moon,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function OrderSummary() {
  const bookingState = useBookingStore();

  return (
    <div className="mx-auto mt-4 max-w-2xl space-y-5">
      {/* Property Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="relative space-y-4 p-5">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-xl leading-tight font-bold text-gray-900">
                {bookingState?.propertyName}
              </h1>
              <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                <Sparkles className="mr-1 h-3 w-3" />
                Featured
              </span>
            </div>
            <h2 className="text-sm font-medium text-gray-600">
              {bookingState?.selectedRoom?.name}
            </h2>
          </div>

          {bookingState?.property?.images.length ? (
            <div className="relative overflow-hidden rounded-xl shadow-md">
              <Image
                src={bookingState?.property?.images[0].url || ""}
                alt="Property Image"
                width={400}
                height={400}
                className="h-56 w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Booking Details Card */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="border-b border-blue-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">
              Booking Details
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
          {/* Check-in & Check-out */}
          <div className="space-y-3 md:col-span-3">
            {/* Check-In */}
            <div className="flex items-start gap-4 rounded-xl border-2 border-gray-100 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 shadow-md">
                <CalendarArrowDown className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Check-In
                </span>
                <p className="mt-0.5 text-base font-bold text-gray-900">
                  {formatDate(bookingState?.dateRange?.from)}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">14:00</span>
                </div>
              </div>
            </div>

            {/* Check-Out */}
            <div className="flex items-start gap-4 rounded-xl border-2 border-gray-100 bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
                <CalendarArrowUp className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Check-Out
                </span>
                <p className="mt-0.5 text-base font-bold text-gray-900">
                  {formatDate(bookingState?.dateRange?.to)}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">12:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Nights */}
          <div className="flex items-center justify-center rounded-xl border-2 border-gray-100 bg-white p-6 md:col-span-1">
            <div className="space-y-2 text-center">
              <Moon className="mx-auto h-8 w-8 text-blue-600" />
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {bookingState?.totalNights}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {bookingState?.totalNights > 1 ? "nights" : "night"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Details Card */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="border-b border-amber-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-600" />
            <h3 className="text-base font-bold text-gray-900">Price Details</h3>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {/* Price Breakdown */}
          <div className="space-y-3">
            {/* Normal Nights */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <span className="text-sm text-gray-700">
                {formatPrice(bookingState?.basePrice)} ×{" "}
                {bookingState?.normalNights} nights
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {formatPrice(
                  bookingState?.basePrice * bookingState?.normalNights
                )}
              </span>
            </div>

            {/* Peak Season Nights */}
            {bookingState?.peakSeasonNights > 0 && (
              <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-700">
                    {formatPrice(bookingState?.peakSeasonPrice)} ×{" "}
                    {bookingState?.peakSeasonNights} nights
                  </span>
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
                    Peak Season
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {formatPrice(
                    bookingState?.peakSeasonPrice *
                      bookingState?.peakSeasonNights
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Divider */}
          <Separator />

          {/* Total */}
          <div className="space-y-2 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
                {formatPrice(bookingState?.total)}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="text-xs font-medium text-gray-600">
                for {bookingState?.totalNights}{" "}
                {bookingState?.totalNights > 1 ? "nights" : "night"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

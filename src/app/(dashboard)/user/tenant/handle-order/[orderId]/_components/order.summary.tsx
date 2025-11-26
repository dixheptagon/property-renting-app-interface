"use client";
import Image from "next/image";
import { formatDate } from "../_utils/format.date";
import { formatPrice } from "../_utils/format.price";
import {
  Calendar,
  CalendarArrowDown,
  CalendarArrowUp,
  Clock,
  ImageOff,
  Moon,
  TrendingUp,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetBooking } from "../_hooks/use.order.details";
import LoadingData from "@/components/ui/loading.data";
import { BookingData } from "../_types/order.details.type";

interface OrderSummaryProps {
  orderId: string;
}

export default function OrderSummary({ orderId }: OrderSummaryProps) {
  const { data: bookingResponse, isLoading, error } = useGetBooking(orderId);
  // const bookingState = useBookingStore();

  if (isLoading) {
    return <LoadingData />;
  }

  if (error || !bookingResponse?.data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-500">Failed to load booking details</p>
          <p className="text-sm text-gray-500">{error?.message}</p>
        </div>
      </div>
    );
  }

  const bookingData: BookingData = bookingResponse.data;

  return (
    <div className="mx-auto mt-4 max-w-2xl space-y-5">
      {/* Property Card */}
      {/* Property Card */}
      <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-linear-to-br from-blue-200 to-indigo-300 opacity-40 blur-md"></div>
        <div className="relative z-10">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            {bookingData.room.property.title}
          </h1>
          <h2 className="mb-4 flex items-center text-lg text-gray-600">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-indigo-500"></span>
            {bookingData.room.name}
          </h2>
          {bookingData.room.property.main_image ? (
            <div className="relative">
              <Image
                src={bookingData.room.property.main_image}
                alt="Property Image"
                width={400}
                height={300}
                className="h-48 w-full rounded-lg object-cover shadow-md"
              />
              <div className="absolute inset-0 rounded-lg bg-linear-to-t from-black/20 to-transparent"></div>
            </div>
          ) : (
            <div className="relative flex h-48 w-full items-center justify-center rounded-lg bg-gray-100">
              <div className="text-center">
                <ImageOff className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No Image Available</p>
              </div>
            </div>
          )}
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
                  {formatDate(new Date(bookingData.check_in_date))}
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
                  {formatDate(new Date(bookingData.check_out_date))}
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
                  {Math.ceil(
                    (new Date(bookingData.check_out_date).getTime() -
                      new Date(bookingData.check_in_date).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {Math.ceil(
                    (new Date(bookingData.check_out_date).getTime() -
                      new Date(bookingData.check_in_date).getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) > 1
                    ? "nights"
                    : "night"}
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
            {/* Total Price */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <span className="text-sm text-gray-700">Total Price</span>
              <span className="text-sm font-semibold text-gray-900">
                {formatPrice(bookingData.total_price)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <Separator />

          {/* Total */}
          <div className="space-y-2 rounded-xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
                {formatPrice(bookingData.total_price)}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="text-xs font-medium text-gray-600">
                for{" "}
                {Math.ceil(
                  (new Date(bookingData.check_out_date).getTime() -
                    new Date(bookingData.check_in_date).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                {Math.ceil(
                  (new Date(bookingData.check_out_date).getTime() -
                    new Date(bookingData.check_in_date).getTime()) /
                    (1000 * 60 * 60 * 24)
                ) > 1
                  ? "nights"
                  : "night"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

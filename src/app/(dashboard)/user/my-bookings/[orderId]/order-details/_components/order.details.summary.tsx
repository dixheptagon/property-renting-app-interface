"use client";
import Image from "next/image";
import {
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Moon,
  ImageOff,
} from "lucide-react";
import { formatDate } from "../_utils/format.date";
import { formatPrice } from "../_utils/format.price";
import { OrderDetailsSummaryProps } from "../_types/order.details.type";
import { formatDateTime } from "../_utils/format.date.time";
import PaymentProofUpload from "./form-components/upload.payment.proof";

export default function OrderDetailsSummary({
  bookingData,
}: OrderDetailsSummaryProps) {
  const checkInDate = bookingData
    ? formatDate(new Date(bookingData.check_in_date))
    : "N/A";
  const checkOutDate = bookingData
    ? formatDate(new Date(bookingData.check_out_date))
    : "N/A";
  const totalNights = bookingData
    ? Math.ceil(
        (new Date(bookingData.check_out_date).getTime() -
          new Date(bookingData.check_in_date).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Property Card */}
      <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-linear-to-br from-blue-200 to-indigo-300 opacity-40 blur-md"></div>
        <div className="relative z-10">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            {bookingData?.room.property.title || "Property Name Not Available"}
          </h1>
          <h2 className="mb-4 flex items-center text-lg text-gray-600">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-indigo-500"></span>
            {bookingData?.room.name || "Room Name Not Available"}
          </h2>

          {bookingData?.room.property.main_image ? (
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

      {/* Payment Proof Upload */}
      {bookingData?.cancellation_reason &&
        bookingData.status === "pending_payment" && (
          <PaymentProofUpload
            bookingId={bookingData.uid}
            onUploadSuccess={() => {
              window.location.reload();
            }}
          />
        )}

      {/* Booking Details Card */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
        <h3 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
          <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
          Booking Details
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
          {/* Check-in & Check-out Section */}
          <div className="space-y-3 md:col-span-6">
            {/* Check-in Section */}
            <div className="space-y-3 rounded-lg border border-green-200 bg-linear-to-br from-green-50 to-emerald-50 p-4">
              <div className="flex items-center text-green-700">
                <Clock className="mr-2 h-4 w-4" />
                <span className="font-medium">Check-In</span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{checkInDate}</p>
                <p className="text-sm text-gray-600">14:00</p>
              </div>
            </div>

            {/* Check-out Section */}
            <div className="space-y-3 rounded-lg border border-orange-200 bg-linear-to-br from-orange-50 to-red-50 p-4">
              <div className="flex items-center text-orange-700">
                <Clock className="mr-2 h-4 w-4" />
                <span className="font-medium">Check-Out</span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">
                  {checkOutDate}
                </p>
                <p className="text-sm text-gray-600">12:00</p>
              </div>
            </div>
          </div>

          {/* Nights Section */}
          <div className="flex flex-col items-center justify-center rounded-lg border border-purple-200 bg-linear-to-br from-purple-50 to-violet-50 p-4 md:col-span-2">
            <Moon className="mb-2 h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">
              {totalNights}
            </span>
            <span className="text-sm text-gray-600">nights</span>
          </div>
        </div>
      </div>

      {/* Order Details */}
      {bookingData && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
            <FileText className="mr-2 h-5 w-5 text-indigo-600" />
            Order Details
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <div className="rounded-lg border border-slate-200 bg-linear-to-br from-slate-50 to-gray-50 p-4">
                <div className="mb-2 flex items-center text-sm text-slate-700">
                  <FileText className="mr-2 h-4 w-4" />
                  <span className="font-medium">Order ID:</span>
                </div>
                <p className="text-md font-mono font-bold text-gray-800">
                  {bookingData.uid}
                </p>
              </div>

              <div className="rounded-lg border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 p-4">
                <div className="mb-2 flex items-center text-sm text-amber-700">
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="font-medium">Paid At</span>
                </div>
                <p className="text-md font-bold text-gray-800">
                  {formatDateTime(bookingData.paid_at) || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-emerald-200 bg-linear-to-br from-emerald-50 to-green-50 p-4">
                <div className="mb-2 flex items-center text-sm text-emerald-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span className="font-medium">Total Price</span>
                </div>
                <p className="text-md font-bold text-gray-800">
                  {formatPrice(bookingData.total_price)}
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 p-4">
                <div className="mb-2 flex items-center text-sm text-blue-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span className="font-medium">Status</span>
                </div>
                <p className="text-md font-bold text-gray-800 capitalize">
                  {bookingData.status.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import {
  Mail,
  Phone,
  User,
  CreditCard,
  ReceiptText,
  BookCheck,
  ScanBarcode,
  Clock,
  ClockAlert,
  ImageOff,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import StatusBanner from "./form-components/status.banner";
import StatusLabel from "./form-components/status.label";
import { ActionButtons } from "./form-components/action.buttons";
import { useGetBooking } from "../_hooks/use.order.details";
import LoadingData from "@/components/ui/loading.data";
import { formatDate } from "../_utils/format.date";
import { formatDateTime } from "../_utils/format.date.time";

interface HandleOrderFormProps {
  orderId: string;
}

export default function HandleOrderForm({ orderId }: HandleOrderFormProps) {
  const { data: bookingResponse, isLoading, error } = useGetBooking(orderId);

  console.log(bookingResponse);

  if (isLoading) {
    return <LoadingData message="Loading order details..." />;
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

  const booking = bookingResponse.data;

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Success Banner */}
      <StatusBanner status={booking.status} />

      {/* Main Card */}
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        {/* Order ID */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="text-sm text-gray-500">Booking ID</p>
            <h2 className="text-2xl font-bold text-gray-900">{booking.uid}</h2>
          </div>
          <StatusLabel status={booking.status} />
        </div>

        {/* Rejection / Cancellation Reason */}
        {booking?.cancellation_reason && (
          <div className="flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <p className="text-xs font-medium tracking-wider text-red-700 uppercase">
                {booking.status === "cancelled"
                  ? "Cancellation Reason"
                  : "Rejection Reason"}
              </p>
            </div>
            <div className="flex-1">
              <p className="mt-0.5 text-sm font-medium text-red-900">
                {booking.cancellation_reason}
              </p>
            </div>
          </div>
        )}

        {/* Guest Information */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <User className="h-5 w-5 text-blue-500" />
            Guest Information
          </h3>
          <div className="space-y-3 rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-900">
                  {booking.fullname}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-900">{booking.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="font-semibold text-gray-900">
                  {booking.phone_number}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <ReceiptText className="text-blue-500" />
            Payment Information
          </h3>
          <div className="relative space-y-3 rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 shadow-sm">
            {/* Payment Method */}
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <CreditCard className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Method</p>
                <p className="font-semibold text-gray-900">
                  {booking.payment_method || "Not specified"}
                </p>
              </div>
            </div>

            {/* Payment Proof */}
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <BookCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Proof</p>
                <p className="font-semibold text-gray-900">
                  {booking.transaction_id ? "Available" : "Not available"}
                </p>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <ScanBarcode className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Transaction ID</p>
                <p className="font-semibold text-gray-900">
                  {booking.transaction_id || "Not available"}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              {/* Paid At */}
              <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-100">
                  <Clock className="h-5 w-5 text-lime-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Paid At</p>
                  <p className="font-semibold text-gray-900">
                    {booking.paid_at
                      ? formatDateTime(booking.paid_at)
                      : "Not paid"}
                  </p>
                </div>
              </div>

              {/* Expired At */}
              <div className="flex items-center gap-3 rounded-lg bg-red-200 p-2 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ClockAlert className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500">
                    Process this order before :
                  </p>
                  <p className="font-semibold text-red-900">
                    {formatDate(new Date(booking.check_in_date))}
                  </p>
                  <span className="flex items-center gap-2 text-xs text-red-900">
                    <Clock className="h-3 w-3" />
                    12.00
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Proof */}
            {booking.payment_proof ? (
              <div className="absolute top-3 right-6">
                <Image
                  src={booking.payment_proof}
                  alt="payment-proof"
                  width={500}
                  height={500}
                  className="h-auto w-32 rounded-lg border-2 object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Handle Orded Form Section */}

        <section className="rounded-xl bg-linear-to-r p-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              Make sure to review everything carefully before proceeding order!
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Verify everything — changes may not be possible later.
            </p>

            <ActionButtons status={booking.status} orderId={orderId} />
          </div>
        </section>
      </div>
    </div>
  );
}

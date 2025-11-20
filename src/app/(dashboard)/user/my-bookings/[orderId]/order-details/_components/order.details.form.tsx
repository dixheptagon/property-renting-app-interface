import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import {
  CheckCircle,
  Mail,
  Phone,
  User,
  QrCode,
  MessageCircle,
  Headphones,
  XCircle,
} from "lucide-react";
import StatusBanner from "./form-components/status.banner";
import StatusLabel from "./form-components/status.label";
import { OrderDetailsFormProps } from "../_types/order.details.type";
import Link from "next/link";
import CancelOrderButton from "./form-components/cancel.order.button";
import { Label } from "@/components/ui/label";

export default function OrderDetailsForm({
  bookingData,
}: OrderDetailsFormProps) {
  const booking = bookingData || {
    status: "pending_payment",
    uid: "[ORDER-1XXXX]",
    fullname: "[GUEST NAME]",
    email: "[GUEST EMAIL]",
    phone_number: "[GUEST PHONE]",
  };

  const enableQrCode =
    booking.status === "processing" || booking.status === "completed";

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Success Banner */}
      <StatusBanner status={booking.status} />

      {/* Main Card */}
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg lg:pb-15">
        {/* Order ID */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="text-sm text-gray-500">Booking ID</p>
            <h2 className="text-2xl font-bold text-gray-900">{booking.uid}</h2>
          </div>
          <StatusLabel status={booking.status} />
        </div>

        {/* Rejection / Cancellation Reason */}
        {bookingData?.cancellation_reason && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            {/* Header */}
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <p className="text-xs font-medium tracking-wider text-red-700 uppercase">
                {bookingData.status === "cancelled"
                  ? "Cancellation Reason"
                  : "Rejection Reason"}
              </p>
            </div>

            {/* Reason */}
            <p className="mt-2 text-sm font-medium text-red-900">
              {bookingData.cancellation_reason}
            </p>

            {bookingData.status === "pending_payment" && (
              <p className="mt-3 text-sm text-red-800 italic">
                <span className="font-semibold">Note:</span> Please upload your
                payment proof here.
              </p>
            )}

            {bookingData.status === "cancelled" && (
              <p className="mt-3 text-sm text-red-800 italic">
                <span className="font-semibold">Note:</span> If you have any
                questions, please contact us.
              </p>
            )}
          </div>
        )}
        {/* QR Code and Instructions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* QR Code Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative flex h-64 w-full items-center rounded-2xl bg-blue-600 bg-linear-to-br p-6 shadow-lg transition-transform hover:scale-105">
              {/* QR Code */}

              {bookingData?.uid && enableQrCode ? (
                <div className="mx-auto rounded-md bg-white p-2">
                  <QRCodeCanvas
                    value={bookingData.uid}
                    size={200}
                    title={bookingData.uid}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: "/logo/staysia.icon.png",
                      x: undefined,
                      y: undefined,
                      height: 24,
                      width: 24,
                      opacity: 1,
                      excavate: true,
                    }}
                  />
                </div>
              ) : (
                <div className="flex w-full flex-col items-center justify-center text-white">
                  <QrCode className="h-32 w-32" />
                  <p className="max-w-50 text-center text-sm font-semibold">
                    You&apos;ll receive your QR code right after payment!
                  </p>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-gray-600">
              Save or screenshot this QR code for check-in
            </p>
          </div>

          {/* Instructions Section */}
          <div className="flex flex-col justify-center space-y-4 rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              Important Instructions
            </h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  1
                </span>
                <span className="leading-relaxed">
                  <strong>Check-in:</strong> From 2:00 PM |{" "}
                  <strong>Check-out:</strong> Before 12:00 PM
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  2
                </span>
                <span className="leading-relaxed">
                  Present this ticket and your ID when checking in
                </span>
              </li>
            </ol>
          </div>
        </div>
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
        {/* Support Section */}
        <div className="rounded-xl bg-linear-to-r p-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              Have questions? We&apos;re here to help!
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                disabled
                className="flex items-center gap-2 bg-blue-600 px-6 py-6 transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                <Headphones className="h-5 w-5" />
                Contact Customer Service
              </Button>
              <Link href={`mailto:${bookingData?.room.property.tenant_email}`}>
                <Button className="flex items-center gap-2 bg-purple-600 px-6 py-6 transition-all hover:bg-purple-700 hover:shadow-lg">
                  <MessageCircle className="h-5 w-5" />
                  Contact Tenant
                </Button>
              </Link>

              {/* Cancel Order Button */}
              {bookingData?.status === "pending_payment" && (
                <CancelOrderButton orderId={bookingData.uid} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

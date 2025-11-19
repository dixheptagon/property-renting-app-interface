"use client";

import { Calendar, Clock, CreditCard, FileText, Moon } from "lucide-react";
import { useBookingStore } from "../../../_stores/booking.store";
import { usePaymentStore } from "../../../_stores/payment.store";
import { formatDate } from "../_utils/format.date";
import { formatPrice } from "../_utils/format.price";
import { getTotalNights } from "../_utils/get.total.nights";
import PaymentProofUpload from "./form-components/upload.payment.proof";
import { useRouter } from "next/navigation";

export default function PaymentSummary() {
  const paymentState = usePaymentStore();

  const order = paymentState.orderResponse?.data.order;

  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Order Details */}
      {order && (
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
                  {order.uid}
                </p>
              </div>

              <div className="rounded-lg border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 p-4">
                <div className="mb-2 flex items-center text-sm text-amber-700">
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="font-medium">Payment Deadline</span>
                </div>
                <p className="text-md font-bold text-gray-800">
                  {formatDate(new Date(order.payment_deadline))}
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
                  {formatPrice(Number(order.total_price))}
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 p-4">
                <div className="mb-2 flex items-center text-sm text-blue-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span className="font-medium">Status</span>
                </div>
                <p className="text-md font-bold text-gray-800 capitalize">
                  {order.status.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Payment Proof Card */}
      <div>
        <PaymentProofUpload
          bookingId={order?.uid}
          onUploadSuccess={() => router.push("/user/my-bookings")}
        />
      </div>

      {/* Order Details Card */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
        <h3 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
          <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
          Order Details
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
                <p className="text-lg font-bold text-gray-800">
                  {formatDate(order?.check_in_date) || "N/A"}
                </p>
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
                  {formatDate(order?.check_out_date) || "N/A"}
                </p>
                <p className="text-sm text-gray-600">12:00</p>
              </div>
            </div>
          </div>

          {/* Nights Section */}
          <div className="flex flex-col items-center justify-center rounded-lg border border-purple-200 bg-linear-to-br from-purple-50 to-violet-50 p-4 md:col-span-2">
            <Moon className="mb-2 h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">
              {getTotalNights(order?.check_in_date, order?.check_out_date)}
            </span>
            <span className="text-sm text-gray-600">nights</span>
          </div>
        </div>
      </div>
    </div>
  );
}

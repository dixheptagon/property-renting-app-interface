import { usePaymentStore } from "../../../_stores/payment.store";
import { useEffect, useRef, useState } from "react";
import { useSnap } from "../_hooks/use.snap";
import CancelOrderButton from "./form-components/cancel.order.button";
import { CircleAlert, XCircle } from "lucide-react";
import { BookingResponse } from "../_types/order.details.type.js";

declare global {
  interface Window {
    snap: any;
  }
}

export default function PaymentForm({
  bookingResponse,
}: {
  bookingResponse?: BookingResponse;
}) {
  const paymentState = usePaymentStore();
  const snapToken = paymentState.orderResponse?.data.transaction_token.token;
  const orderId = paymentState.orderResponse?.data.order.uid;

  // Get Payment Details Data
  const paymentStatus = bookingResponse?.data.status;
  const paymentRejectionReason = bookingResponse?.data.cancellation_reason;

  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEmbedded, setHasEmbedded] = useState(false);

  const { snapEmbed } = useSnap();

  useEffect(() => {
    if (!snapToken || hasEmbedded) {
      return;
    }

    // Add a small delay to ensure snap is loaded
    const timer = setTimeout(() => {
      snapEmbed(snapToken, "snap-container");
      setHasEmbedded(true);
    }, 2000); // Increased delay

    return () => {
      clearTimeout(timer);
    };
  }, [snapToken, snapEmbed, hasEmbedded]);

  return (
    <div>
      {/* Snap Embed Midtrans */}
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Complete Your Payment</h1>
        <p className="mb-6">
          Order ID: <strong>{orderId || "Loading..."}</strong>
        </p>

        {/* Rejection / Cancellation Reason */}
        {paymentRejectionReason && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
            {/* Header */}
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <p className="text-xs font-medium tracking-wider text-red-700 uppercase">
                {paymentStatus === "cancelled"
                  ? "Cancellation Reason"
                  : "Rejection Reason"}
              </p>
            </div>

            {/* Reason */}
            <p className="mt-2 text-sm font-medium text-red-900">
              {paymentRejectionReason}
            </p>

            {paymentStatus === "pending_payment" && (
              <p className="mt-3 text-sm text-red-800 italic">
                <span className="font-semibold">Note:</span> Please upload your
                payment proof here.
              </p>
            )}

            {paymentStatus === "cancelled" && (
              <p className="mt-3 text-sm text-red-800 italic">
                <span className="font-semibold">Note:</span> If you have any
                questions, please contact us.
              </p>
            )}
          </div>
        )}

        {/* Tempat embed Snap */}
        <div
          id="snap-container"
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
          style={{ height: "600px" }}
        >
          {snapToken ? null : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <CircleAlert className="h-10 w-10 stroke-2 text-gray-400" />
                <p>No payment token available</p>
                <p className="text-sm">
                  Please complete the booking process first
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Booking Button */}
      <div className="mt-4 w-full">
        <CancelOrderButton orderId={orderId || ""} />
      </div>
    </div>
  );
}

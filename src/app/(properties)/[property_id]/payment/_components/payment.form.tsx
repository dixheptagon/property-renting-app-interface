import { usePaymentStore } from "../../../_stores/payment.store";
import { useEffect, useRef, useState } from "react";
import { useSnap } from "../_hooks/use.snap";
import CancelOrderButton from "./form-components/cancel.order.button";

declare global {
  interface Window {
    snap: any;
  }
}

export default function PaymentForm() {
  const paymentState = usePaymentStore();
  const snapToken = paymentState.orderResponse?.data.transaction_token.token;
  const orderId = paymentState.orderResponse?.data.order.uid;

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

        {/* Loading indicator removed - now handled in the container */}

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

"use client";
import { Suspense } from "react";
import PaymentSummary from "./_components/payment.summary";
import { LoadingState } from "./_components/loading.and.error";
import PaymentForm from "./_components/payment.form";
import { usePaymentStore } from "../../_stores/payment.store";
import { useGetBooking } from "./_hooks/use.order.details";

export default function Page() {
  const paymentState = usePaymentStore();
  const orderId = paymentState.orderResponse?.data.order.uid;

  // Get Payment Details Data
  const { data: bookingResponse } = useGetBooking(orderId);

  return (
    <div className="mx-3 mt-15 mb-10 min-h-full">
      <div className="mx-auto mt-8 max-w-7xl space-y-4 md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <PaymentForm bookingResponse={bookingResponse} />
        </div>
        <div className="md:col-span-4">
          <Suspense fallback={<LoadingState />}>
            <PaymentSummary bookingResponse={bookingResponse} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

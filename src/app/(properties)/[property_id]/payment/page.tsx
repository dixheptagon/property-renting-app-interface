"use client";
import { Suspense } from "react";
import PaymentSummary from "./_components/payment.summary";
import { LoadingState } from "./_components/loading.and.error";
import { useRouter } from "next/navigation";
import PaymentForm from "./_components/payment.form";
import { usePaymentStore } from "../../_stores/payment.store";

export default function Page() {
  const router = useRouter();
  const paymentState = usePaymentStore();
  return (
    <div className="mx-3 mt-15 mb-10 min-h-full">
      <div className="mx-auto mt-8 max-w-7xl space-y-4 md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <PaymentForm />
        </div>
        <div className="md:col-span-4">
          <Suspense fallback={<LoadingState />}>
            <PaymentSummary />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

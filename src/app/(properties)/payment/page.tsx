import { Suspense } from "react";
import PaymentNavbar from "./_components/payment.navbar";
import PaymentSummary from "./_components/payment.summary";
import { LoadingState } from "./_components/loading.and.error";

export default function Page() {
  return (
    <div className="mt-20 mb-10 min-h-full">
      <PaymentNavbar />
      <div className="mx-auto mt-8 max-w-7xl space-y-4 md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <Suspense fallback={<LoadingState />}>
            <PaymentSummary />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

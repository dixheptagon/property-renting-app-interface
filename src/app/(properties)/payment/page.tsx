"use client";
import { Suspense } from "react";
import PaymentNavbar from "./_components/payment.navbar";
import PaymentSummary from "./_components/payment.summary";
import { LoadingState } from "./_components/loading.and.error";
import PaymentProofUpload from "./_components/upload.payment.proof";
import { useRouter } from "next/navigation";
import PaymentForm from "./_components/payment.form";

export default function Page() {
  const router = useRouter();
  return (
    <div className="mt-20 mb-10 min-h-full">
      <PaymentNavbar />
      <div className="mx-auto mt-8 max-w-7xl md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <PaymentForm />
        </div>
        <div className="md:col-span-4">
          <Suspense fallback={<LoadingState />}>
            <PaymentSummary />
          </Suspense>
          <div className="mt-4">
            <PaymentProofUpload
              bookingId="ORDER-21e2edwaw221"
              onUploadSuccess={() => {
                // Redirect atau action setelah sukses
                router.push("/payment-success");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

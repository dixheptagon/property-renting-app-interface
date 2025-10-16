"use client";
import { Suspense, useState } from "react";
import PaymentNavbar from "./_components/payment.navbar";
import PaymentSummary from "./_components/payment.summary";
import { LoadingState } from "./_components/loading.and.error";
import { ImageUp } from "lucide-react";
import UploadPaymentProof from "./_components/upload.payment.proof";
import PaymentProofUpload from "./_components/upload.payment.proof";
import { useRouter } from "next/navigation";
import { useBookingStore } from "../_stores/booking.store";

export default function Page() {
  const router = useRouter();
  return (
    <div className="mt-20 mb-10 min-h-full">
      <PaymentNavbar />
      <div className="mx-auto mt-8 max-w-7xl md:grid md:grid-cols-12 md:gap-6">
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

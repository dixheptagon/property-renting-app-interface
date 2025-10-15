"use client";
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import BookingNavbar from "./_components/booking.navbar";
import BookingForm from "./_components/booking.form";
import BookingSummary from "./_components/booking.summary";
import { LoadingState, ErrorState } from "./_components/loading.and.error";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function page() {
  const router = useRouter();

  return (
    <div className="mt-20 mb-10 min-h-full">
      <BookingNavbar />
      <div className="mx-auto max-w-7xl">
        <Button
          id="modify-booking"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ChevronLeft />
          <span>Modify your booking</span>
        </Button>
      </div>
      <div className="mx-auto min-h-full max-w-7xl space-y-3 md:max-w-7xl">
        <h1 className="text-2xl font-bold">Your Accommodation Booking</h1>
        <p className="font-semibold text-gray-500">
          Make sure all the details on this page are correct before proceeding
          to payment.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-7xl space-y-4 md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <Suspense fallback={<LoadingState />}>
            <BookingForm />
          </Suspense>
        </div>
        <div className="md:col-span-4">
          <Suspense fallback={<LoadingState />}>
            <BookingSummary />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

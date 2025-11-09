"use client";
import { useParams } from "next/navigation";
import OrderDetailsForm from "./_components/order.details.form";
import OrderDetailsSummary from "./_components/order.details.summary";
import { useGetBooking } from "./_hooks/use.order.details";
import LoadingData from "@/components/ui/loading.data";

export default function Page() {
  const params = useParams();
  const orderId = params.orderId as string;

  const { data: bookingResponse, isLoading, error } = useGetBooking(orderId);

  if (isLoading) {
    return (
      <div className="mx-4 mt-20 mb-10 min-h-full">
        <div className="mx-auto min-h-full max-w-7xl space-y-3 md:max-w-7xl">
          <LoadingData />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 mt-20 mb-10 min-h-full">
        <div className="mx-auto min-h-full max-w-7xl space-y-3 md:max-w-7xl">
          <div className="text-center">
            <p className="text-red-600">
              Failed to load booking details. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const bookingData = bookingResponse?.data;

  return (
    <div className="mx-4 mt-20 mb-10 min-h-full">
      <div className="mx-auto min-h-full max-w-7xl space-y-3 md:max-w-7xl">
        {/* Order Details */}
        <div className="mx-auto mt-8 max-w-7xl md:grid md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <OrderDetailsForm bookingData={bookingData} />
          </div>
          <div className="mt-4 md:col-span-4 md:mt-0">
            <OrderDetailsSummary bookingData={bookingData} />
          </div>
        </div>
      </div>
    </div>
  );
}

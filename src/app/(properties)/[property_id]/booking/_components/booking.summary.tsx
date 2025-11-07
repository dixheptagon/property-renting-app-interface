"use client";
import Image from "next/image";
import { useBookingStore } from "@/app/(properties)/_stores/booking.store";
import { formatDate } from "../_utils/format.date";

export default function BookingSummary() {
  const bookingState = useBookingStore();
  return (
    <div className="mx-auto space-y-4">
      <div className="mx-auto rounded-lg bg-white p-4 shadow-md">
        <h1 className="text-lg font-bold">{bookingState?.propertyName}</h1>
        <h2 className="pb-4">{bookingState?.selectedRoom?.name}</h2>
        {bookingState?.property?.images.length ? (
          <Image
            src={bookingState?.property?.images[0].url || ""}
            alt="Property Image"
            width={400}
            height={400}
            className="h-auto w-full rounded-lg"
          />
        ) : null}
      </div>
      <div className="box-border grid grid-cols-1 rounded-lg bg-white p-4 text-gray-500 shadow-md md:grid-cols-4">
        <div className="col-span-1 space-y-2 rounded-lg border-2 border-gray-200 p-2 shadow-sm md:col-span-3">
          <div className="flex flex-col">
            <span className="text-sm">Check-In</span>
            <span className="font-semibold text-black">
              {formatDate(bookingState?.dateRange?.from)}
            </span>
            <span className="text-xs">14.00</span>
          </div>

          <hr className="border-1 border-gray-200" />

          <div className="flex flex-col">
            <span className="text-sm">Check-Out</span>
            <span className="font-semibold text-black">
              {formatDate(bookingState?.dateRange?.to)}
            </span>
            <span className="text-xs">12.00</span>
          </div>
        </div>

        <div className="col-span-1 mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 shadow-sm md:mt-0 md:ml-2">
          <span className="font-semibold text-black">
            {bookingState?.totalNights}
          </span>
          <span>night</span>
        </div>
      </div>
    </div>
  );
}

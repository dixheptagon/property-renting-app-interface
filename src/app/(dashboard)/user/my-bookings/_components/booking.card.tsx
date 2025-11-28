import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  BedDouble,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { getBookingStatusConfig } from "../_const/booking.status";
import type { Booking } from "../_types/my.bookings";
import { formatPrice } from "../_utils/format.price";
import { formatDate } from "../_utils/format.date";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  // Calculate stay duration
  const checkIn = new Date(booking.check_in_date);
  const checkOut = new Date(booking.check_out_date);
  const stayDuration = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Get status configuration
  const statusConfig = getBookingStatusConfig(booking.status);
  const StatusIcon = statusConfig.icon;

  const href =
    booking.status === "pending_payment"
      ? `/${booking.order_id}/payment`
      : `my-bookings/${booking.order_id}/order-details`;

  return (
    <div className="group relative mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-xl">
      <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:p-6">
        {/* Image Section */}
        <div className="relative sm:w-80">
          <Image
            src={booking.room.property.main_image}
            alt="property-image"
            width={320}
            height={224}
            className="h-48 w-full rounded-xl object-cover transition-transform duration-300 sm:h-56"
          />

          {/* Overlay badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-lg backdrop-blur-sm">
            <StatusIcon className="h-3.5 w-3.5" />
            {statusConfig.label}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between gap-4">
          {/* Header */}
          <div className="space-y-3">
            {/* Booking ID & Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                  Booking ID
                </p>
                <p className="text-base font-bold text-gray-900 sm:text-lg">
                  {booking.order_id}
                </p>
              </div>
              <div
                className={`rounded-xl px-4 py-2 shadow-md ${statusConfig.bgColor}`}
              >
                <span className={`text-xs font-bold text-white sm:text-sm`}>
                  {statusConfig.label}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {booking.room.property.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BedDouble className="h-4 w-4" />
                    <span className="text-sm font-medium sm:text-base">
                      {booking.room.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Duration */}
            <div className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {`${formatDate(checkIn)} - ${formatDate(checkOut)}`}
              </span>
              <span className="hidden text-sm font-medium text-blue-900 lg:block">
                ( {stayDuration} nights stay)
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            {/* Price */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">
                  Total Payment
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(booking.total_price)}
              </p>
              <sub className="mt-2 text-gray-500 md:mt-0 md:self-end">
                for {stayDuration} nights
              </sub>
            </div>

            {/* Action Button */}
            <Button className="group/btn w-full px-6 py-6 transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
              <Link href={href} className="flex items-center gap-2">
                See Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

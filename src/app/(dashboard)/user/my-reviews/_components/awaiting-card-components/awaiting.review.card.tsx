import Image from "next/image";
import {
  Calendar,
  MapPin,
  BedDouble,
  CreditCard,
  ArrowRight,
  Star,
  ImageOff,
  RotateCwSquare,
  ExternalLink,
  CheckCheck,
} from "lucide-react";
import { AwaitingReview } from "../../_types/my.reviews.type";
import { formatDate } from "../../_utils/format.date";
import { formatPrice } from "../../_utils/format.price";
import { CreateReviewButton } from "../awaiting-review-components/create.review.button";

interface AwaitingReviewCardProps {
  review: AwaitingReview;
}

export default function AwaitingReviewCard({
  review,
}: AwaitingReviewCardProps) {
  // Calculate stay duration
  const checkIn = new Date(review.check_in_date);
  const checkOut = new Date(review.check_out_date);
  const stayDuration = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="group relative mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-xl">
      <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:p-6">
        {/* Image Section - Placeholder since no image in API */}
        <div className="relative sm:w-80">
          {review.property.main_image ? (
            <Image
              src={review.property.main_image}
              alt="property-image"
              width={320}
              height={224}
              className="h-48 w-full rounded-xl object-cover transition-transform duration-300 sm:h-56"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-xl bg-gray-200 sm:h-56">
              <ImageOff className="h-12 w-12 text-gray-400" />
            </div>
          )}

          {/* Overlay badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-green-500/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
            <CheckCheck className="h-3.5 w-3.5" />
            Completed
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
                  {review.booking_uid}
                </p>
              </div>
              <div className="rounded-xl bg-green-500 px-4 py-2 shadow-md">
                <span className="text-xs font-bold text-white sm:text-sm">
                  Completed
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {review.property.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BedDouble className="h-4 w-4" />
                    <span className="text-sm font-medium sm:text-base">
                      {review.property.room_types.join(", ")}
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
                {formatPrice(review.total_price)}
              </p>
              <sub className="mt-2 text-gray-500 md:mt-0 md:self-end">
                for {stayDuration} nights
              </sub>
            </div>

            {/* Action Button */}
            <CreateReviewButton
              booking_uid={review.booking_uid}
              property_name={review.property.name}
              room_type={review.property.room_types.join(", ")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Circle, Star, User } from "lucide-react";
import React from "react";
import { truncateComment, truncateReply } from "../../_utils/truncate.data";
import { ReplyReview } from "./review-card-components/reply.review";
import { formatDate } from "../../_utils/format.date";

export interface Review {
  id: number;
  booking_id: number;
  user_id: number;
  property_id: number;
  rating: string;
  comment: string;
  reply: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: {
    first_name: string;
    last_name: string;
    display_name: string | null;
  };
  booking: {
    uid: string;
    check_in_date: string;
    check_out_date: string;
    room: {
      name: string;
    };
  };
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const maxRating = 5;
  const rating = parseInt(review.rating);
  const status = review.is_public ? "active" : "restricted";
  const username =
    review.user.display_name ||
    `${review.user.first_name} ${review.user.last_name}`;

  const [showFullReply, setShowFullReply] = React.useState(false);
  const [showFullComment, setShowFullComment] = React.useState(false);

  return (
    <div className="group overflow-hidden rounded-xl border-2 border-gray-200 bg-linear-to-br from-white to-gray-50 p-4 shadow-md">
      <div className="space-y-4">
        {/* Header - User Info & Rating */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-blue-500 to-blue-800 shadow-md ring-2 ring-blue-200 ring-offset-2">
                <User className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{username}</h2>
              <p className="text-sm text-gray-500">
                Posted on {formatDate(new Date(review.created_at))}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 rounded-lg bg-linear-to-r from-amber-50 to-orange-50 px-4 py-2 shadow-sm">
            <span className="text-2xl font-bold text-amber-600">
              {rating}.0
            </span>
            <div className="flex gap-1">
              {[...Array(maxRating)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="space-y-3">
          <p className="leading-relaxed whitespace-pre-line text-gray-700">
            {showFullComment ? review.comment : truncateComment(review.comment)}
          </p>
          {review.comment.length > 100 && (
            <button
              onClick={() => setShowFullComment(!showFullComment)}
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              {showFullComment ? "Show less" : "Read more"}
            </button>
          )}

          {/* Owner Reply */}
          {review.reply && (
            <div className="relative rounded-lg border-l-4 border-green-500 bg-green-50 p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <Circle className="h-3 w-3 fill-green-600 text-green-600" />
                <span className="text-xs leading-relaxed font-semibold tracking-wide whitespace-pre-line text-green-700 uppercase">
                  My Reply
                </span>
              </div>
              <p className="leading-relaxed whitespace-pre-line text-gray-700">
                {showFullReply ? review.reply : truncateReply(review.reply)}
              </p>
              {review.reply.length > 100 && (
                <button
                  onClick={() => setShowFullReply(!showFullReply)}
                  className="mt-3 text-sm font-medium text-green-600 transition-colors hover:text-green-700"
                >
                  {showFullReply ? "Show less" : "Read more"}
                </button>
              )}

              {/* Reply date & time */}
              <div className="absolute top-3 right-3 text-sm text-green-700">
                {formatDate(new Date(review.updated_at))}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Status & Actions */}
        <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Status Badge */}
          {status === "active" ? (
            <div></div>
          ) : (
            <div
              className={`inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 shadow-md ${"bg-red-500"}`}
            >
              <Circle className="h-4 w-4 fill-white text-white" />
              <span className="text-sm font-bold text-white capitalize">
                {status}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <ReplyReview
            bookingUid={review.booking.uid}
            username={review.user.first_name + " " + review.user.last_name}
            reply={review.reply}
          />
        </div>
      </div>
    </div>
  );
}

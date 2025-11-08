"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  formatDate,
  getInitials,
  MAX_DESCRIPTION_LENGTH,
  renderStars,
  truncateText,
} from "./utils";
import { ReviewCardProps } from "./type";

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const needsTruncation = review.description.length > MAX_DESCRIPTION_LENGTH;

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 transition-all duration-200 hover:border-blue-300">
      {/* User Info */}
      <div className="mb-4 flex items-start gap-3">
        {/* Avatar */}
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt={review.username}
            className="h-12 w-12 rounded-full object-cover"
            width={48}
            height={48}
          />
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 font-semibold text-white">
            {getInitials(review.username)}
          </div>
        )}

        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{review.username}</h4>
          <p className="text-sm text-gray-500">Joined in {review.joinDate}</p>
        </div>
      </div>

      {/* Rating and Date */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
        </div>
        <span className="text-sm text-gray-500">
          {formatDate(review.reviewDate)}
        </span>
      </div>

      {/* Review Description */}
      <div className="mb-3">
        <p className="leading-relaxed text-gray-700">
          {truncateText(review.description)}
        </p>
      </div>

      {/* Show More Button */}
      {needsTruncation && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
              Show More
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review by {review.username}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="leading-relaxed text-gray-700">
                {review.description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

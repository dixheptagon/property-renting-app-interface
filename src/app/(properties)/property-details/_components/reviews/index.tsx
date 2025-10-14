"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { ApiReview, PropertyReviewsProps, Review } from "./type";
import { getRandomJoinYear, MAX_VISIBLE_REVIEWS } from "./utils";
import { ErrorState, LoadingState } from "./loding.and.error";
import { ReviewCard } from "./review.card";

/**
 * PropertyReviews component displays ratings and reviews for a property.
 * Handles loading, error states, and pagination of reviews.
 */
export default function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  // Fetch reviews from API with proper error handling
  const {
    data: apiReviews,
    isLoading,
    error,
  } = useQuery<ApiReview[]>({
    queryKey: ["reviews", propertyId],
    queryFn: async () => {
      const response = await axios.get<ApiReview[]>(
        `/api/reviews/${propertyId}`
      );
      return response.data;
    },
  });

  // Transform API reviews to component format with memoization for performance
  const reviews: Review[] = React.useMemo(
    () =>
      apiReviews?.map((review) => ({
        id: review.id,
        username: review.user.name,
        avatar: review.user.avatar,
        joinDate: getRandomJoinYear().toString(),
        rating: review.rating,
        reviewDate: new Date(review.createdAt).toISOString().split("T")[0], // YYYY-MM-DD
        description: review.comment,
      })) ?? [],
    [apiReviews]
  );

  // Early return for loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Early return for error state
  if (error) {
    return <ErrorState />;
  }

  // Show only limited reviews initially for better UX
  const displayedReviews = reviews.slice(0, MAX_VISIBLE_REVIEWS);

  // Calculate average rating with proper handling of empty arrays
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div id="reviews-ratings">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        {/* Header with Average Rating */}
        <div className="mb-6 flex items-center justify-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Ratings & Reviews
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-10 w-10 fill-yellow-400 text-yellow-400" />
                <span className="text-4xl font-bold text-gray-900">
                  {averageRating}
                </span>
              </div>
              <span className="text-xl text-gray-600">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Show All Reviews Dialog - only show if there are more reviews than displayed */}
        {reviews.length > MAX_VISIBLE_REVIEWS && (
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg border-2 border-gray-900 px-8 py-3 font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white">
                  <ChevronDown className="h-5 w-5" />
                  Show All Reviews ({reviews.length})
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] !max-w-6xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>All Reviews</DialogTitle>
                </DialogHeader>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

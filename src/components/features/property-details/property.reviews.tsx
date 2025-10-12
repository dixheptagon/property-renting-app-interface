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
import Image from "next/image";

// Helper functions
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

const getRandomJoinYear = (): number => {
  return Math.floor(Math.random() * 5) + 2020; // 2020-2024
};

interface ApiReview {
  id: number;
  propertyId: number;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface PropertyReviewsProps {
  propertyId: number;
}

export default function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  // Fetch reviews from API
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

  // Transform API reviews to component format
  const reviews =
    apiReviews?.map((review) => ({
      id: review.id,
      username: review.user.name,
      avatar: review.user.avatar,
      joinDate: getRandomJoinYear().toString(),
      rating: review.rating,
      reviewDate: new Date(review.createdAt).toISOString().split("T")[0], // YYYY-MM-DD
      description: review.comment,
    })) || [];

  // Handle loading state
  if (isLoading) {
    return (
      <div className="" id="reviews-ratings">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <p className="text-gray-600">Loading reviews...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="" id="reviews-ratings">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-red-600">Failed to load reviews</p>
              <p className="text-gray-600">Please try again later</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show only 4 reviews initially
  const displayedReviews = reviews.slice(0, 4);

  // Calculate average rating
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  const truncateText = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="" id="reviews-ratings">
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
          {displayedReviews.map((review) => {
            const needsTruncation = review.description.length > 150;

            return (
              <div
                key={review.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-5 transition-all duration-200 hover:border-blue-300"
              >
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
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 object-cover font-semibold text-white">
                      {review.avatar}
                    </div>
                  )}

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {review.username}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Joined in {review.joinDate}
                    </p>
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
          })}
        </div>

        {/* Show All Reviews Dialog */}
        {reviews.length > 4 && (
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
                  {reviews.map((review) => {
                    const needsTruncation = review.description.length > 150;

                    return (
                      <div
                        key={review.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                      >
                        {/* User Info */}
                        <div className="mb-4 flex items-start gap-3">
                          {review.avatar ? (
                            <Image
                              src={review.avatar}
                              alt={review.username}
                              className="h-12 w-12 rounded-full object-cover"
                              width={48}
                              height={48}
                            />
                          ) : (
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 object-cover font-semibold text-white">
                              {review.avatar}
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {review.username}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Joined in {review.joinDate}
                            </p>
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
                                <DialogTitle>
                                  Review by {review.username}
                                </DialogTitle>
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
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

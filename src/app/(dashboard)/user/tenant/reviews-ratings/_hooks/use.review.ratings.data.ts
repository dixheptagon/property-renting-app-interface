"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useReviewSearchParams } from "./use.review.search.params";
import { ReviewsResponse, ReviewsParams } from "../_types/reviews.ratings.data";

export const useReviewRatingsData = () => {
  const { filters } = useReviewSearchParams();

  // Build query parameters from filters
  const params: ReviewsParams = {
    page: filters.page,
    limit: filters.limit,
    rating: filters.rating?.length ? filters.rating.join(",") : undefined,
    date_from: filters.date_from || undefined,
    date_to: filters.date_to || undefined,
    sort_by: filters.sort_by as ReviewsParams["sort_by"],
    sort_dir: filters.sort_dir as ReviewsParams["sort_dir"],
    search: filters.search || undefined,
    propertyId: filters.propertyId || undefined,
  };

  const query = useQuery<ReviewsResponse>({
    queryKey: ["review-ratings-data"],
    queryFn: async () => {
      const response = await axiosInstance.get<ReviewsResponse>(
        "/api/review/tenant",
        { params }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    reviews: query.data?.data.reviews || [],
    statistics: query.data?.data.statistics || {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    },
    pagination: query.data?.data.pagination || {
      currentPage: 1,
      totalPages: 0,
      totalCount: 0,
      limit: 20,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
    // Computed values
    totalItems: query.data?.data.pagination.totalCount || 0,
    currentPage: query.data?.data.pagination.currentPage || 1,
    totalPages: query.data?.data.pagination.totalPages || 0,
  };
};

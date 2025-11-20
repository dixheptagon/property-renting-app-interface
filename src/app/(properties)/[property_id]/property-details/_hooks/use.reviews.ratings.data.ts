"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useParams } from "next/navigation";
import {
  PublicReviewsParams,
  PublicReviewsResponse,
} from "../_types/reviews.ratings.data";
import { useReviewSearchParams } from "./use.review.search.params";

export const useReviewsRatingsData = () => {
  const { property_id } = useParams();
  const { filters } = useReviewSearchParams();

  const queryParams: PublicReviewsParams = {
    page: filters.page,
    limit: filters.limit,
    rating: filters.rating?.length ? filters.rating.join(",") : undefined,
    sort_by: filters.sort_by as PublicReviewsParams["sort_by"],
    sort_dir: filters.sort_dir as PublicReviewsParams["sort_dir"],
    search: filters.search || undefined,
  };

  const query = useQuery<PublicReviewsResponse>({
    queryKey: ["public-reviews-data", property_id, queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get<PublicReviewsResponse>(
        `/api/review/property/${property_id}`,
        { params: queryParams }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
    enabled: !!property_id,
  });

  return {
    reviews: query.data?.data.reviews || [],
    statistics: query.data?.data.statistics || {
      totalReviews: 0,
      averageRating: 0,
      ratingStatistics: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      },
    },
    pagination: query.data?.data.pagination || {
      page: 1,
      limit: 10,
      totalPages: 0,
      totalItems: 0,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
};

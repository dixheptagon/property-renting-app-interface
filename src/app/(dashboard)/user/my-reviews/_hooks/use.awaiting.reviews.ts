"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import {
  AwaitingReviewsResponse,
  AwaitingReviewsParams,
} from "../_types/my.reviews.type";

export const useAwaitingReviews = () => {
  const searchParams = useSearchParams();

  // Parse query parameters from URL
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const orderBy =
    (searchParams.get("orderBy") as "createdAt" | "check_in_date") ||
    "createdAt";
  const order = (searchParams.get("order") as "asc" | "desc") || "desc";

  const params: AwaitingReviewsParams = {
    page,
    limit,
    orderBy,
    order,
  };

  const query = useQuery<AwaitingReviewsResponse>({
    queryKey: ["awaiting-reviews", page, limit, orderBy, order],
    queryFn: async () => {
      const response = await axiosInstance.get<AwaitingReviewsResponse>(
        "/api/review/awaiting-reviews",
        { params }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });

  return {
    awaitingReviews: query.data?.data.awaiting_reviews || [],
    pagination: query.data?.data.pagination || {
      currentPage: 1,
      totalPages: 0,
      totalCount: 0,
      limit: 10,
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

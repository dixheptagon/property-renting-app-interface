"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import {
  CompletedReviewsResponse,
  CompletedReviewsParams,
} from "../_types/completed.reviews.type";

export const useCompletedReviews = () => {
  const searchParams = useSearchParams();

  // Parse query parameters from URL
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const orderBy =
    (searchParams.get("orderBy") as "reviewCreatedAt") || "reviewCreatedAt";
  const order = (searchParams.get("order") as "asc" | "desc") || "desc";

  const params: CompletedReviewsParams = {
    page,
    limit,
    orderBy,
    order,
  };

  const query = useQuery<CompletedReviewsResponse>({
    queryKey: ["completed-reviews", params],
    queryFn: async () => {
      const response = await axiosInstance.get<CompletedReviewsResponse>(
        "/api/review/my-reviews",
        { params }
      );
      return response.data;
    },
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });

  return {
    completedReviews: query.data?.data.reviews || [],
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
    totalItems: query.data?.data.pagination.totalCount || 0,
    currentPage: query.data?.data.pagination.currentPage || 1,
    totalPages: query.data?.data.pagination.totalPages || 0,
  };
};

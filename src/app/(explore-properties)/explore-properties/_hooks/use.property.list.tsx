// usePropertyList Hook - TanStack Query implementation for property listing
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { PropertyListParams, PropertyListResponse } from "../_types";

export const usePropertyList = () => {
  const searchParams = useSearchParams();

  // Build query parameters from URL search params
  const queryParams: PropertyListParams = {
    location: searchParams.get("location") || undefined,
    checkin: searchParams.get("checkin") || undefined,
    checkout: searchParams.get("checkout") || undefined,
    category: searchParams.get("category") || undefined,
    amenities: searchParams.get("amenities") || undefined,
    rules: searchParams.get("rules") || undefined,
    sortBy: searchParams.get("sortBy") || "updated_at",
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "12",
  };

  // Create query key that includes all parameters for proper caching
  const queryKey = [
    "properties",
    queryParams.location,
    queryParams.checkin,
    queryParams.checkout,
    queryParams.category,
    queryParams.amenities,
    queryParams.rules,
    queryParams.sortBy,
    queryParams.page,
    queryParams.limit,
  ];

  const { data, isLoading, isError, error, refetch, isFetching } =
    useQuery<PropertyListResponse>({
      queryKey,
      queryFn: async () => {
        const response = await axiosInstance.get<PropertyListResponse>(
          "/api/properties/explore-properties",
          {
            params: queryParams,
          }
        );
        return response.data;
      },
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Cache for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Retry failed requests
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

  return {
    data: data?.data || [],
    pagination: data?.pagination || {
      total: 0,
      page: 1,
      limit: 12,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
    filters: data?.filters || {
      applied: {},
      available: {
        categories: [],
        amenities: [],
        rules: [],
      },
    },
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    // Computed values for convenience
    totalItems: data?.pagination?.total || 0,
    currentPage: data?.pagination?.page || 1,
    totalPages: data?.pagination?.totalPages || 0,
    hasNextPage: data?.pagination?.hasNext || false,
    hasPrevPage: data?.pagination?.hasPrev || false,
  };
};

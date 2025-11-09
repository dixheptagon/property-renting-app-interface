import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { ApiReview } from "../type";

/**
 * Custom hook for fetching property reviews using TanStack Query and axiosInstance
 * @param propertyId - The ID of the property to fetch reviews for
 * @returns Query object with reviews data, loading state, and error state
 */
export function usePropertyReviews(propertyId: number) {
  return useQuery<ApiReview[]>({
    queryKey: ["property-reviews", propertyId],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiReview[]>(
        `/api/reviews/${propertyId}`
      );
      return response.data;
    },
    enabled: !!propertyId && propertyId > 0, // Only run query if propertyId is valid
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
}

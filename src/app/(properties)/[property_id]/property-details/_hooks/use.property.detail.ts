import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Property } from "../_types/property";
import { axiosInstance } from "@/lib/axios";
import { PropertyDetailsResponse } from "../_types/api";

export const usePropertyDetail = () => {
  const params = useParams();
  const propertyId = params.property_id;

  const queryKey = ["property", propertyId];

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axiosInstance.get<PropertyDetailsResponse>(
        `api/properties/${propertyId}/property-details`
      );
      return response.data;
    },
    // Refetch on window focus
    refetchOnWindowFocus: false,
    // Cache for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Retry failed requests
    retry: false,
  });

  return {
    data: data || null,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  };
};

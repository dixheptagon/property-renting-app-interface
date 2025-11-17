"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { OwnedPropertiesResponse } from "../_types/owned.property";

export const useOwnedProperties = () => {
  const query = useQuery<OwnedPropertiesResponse>({
    queryKey: ["owned-properties"],
    queryFn: async () => {
      const response = await axiosInstance.get<OwnedPropertiesResponse>(
        "/api/properties/my-properties"
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });

  return {
    properties: query.data?.data.properties || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
};

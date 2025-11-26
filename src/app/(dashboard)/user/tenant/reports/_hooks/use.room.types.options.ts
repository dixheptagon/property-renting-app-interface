import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  RoomTypesOptionsParams,
  RoomTypesOptionsResponse,
} from "../_types/room.types.options";
import { useSearchParams } from "next/navigation";

export const useRoomTypesOptions = () => {
  const searchParams = useSearchParams();

  // Parse query parameters from URL
  const propertyUid = searchParams.get("property_propertyId") || "";

  const params: RoomTypesOptionsParams = {
    propertyUid,
  };

  const query = useQuery<RoomTypesOptionsResponse>({
    queryKey: ["room-types-options", params],
    queryFn: async () => {
      const response = await axiosInstance.get<RoomTypesOptionsResponse>(
        "/api/properties/room-types",
        { params }
      );
      return response.data;
    },
    refetchOnMount: "always",
    enabled: !!params.propertyUid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });

  return {
    roomTypesOptions: query.data?.data.rooms || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
};

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  PropertyReportParams,
  PropertyReportResponse,
} from "../_types/property.report";
import { useSearchParams } from "next/navigation";

export const usePropertyReport = () => {
  const searchParams = useSearchParams();

  // Parse query parameters from URL
  const property_uid = searchParams.get("property_propertyId") || "";
  const room_type_uid = searchParams.get("property_roomId") || "";
  const selected_date = searchParams.get("property_date") || "";

  const params: PropertyReportParams = {
    property_uid,
    room_type_uid: room_type_uid || undefined,
    selected_date,
  };

  const query = useQuery<PropertyReportResponse>({
    queryKey: ["property-report", params],
    queryFn: async () => {
      const response = await axiosInstance.get<PropertyReportResponse>(
        "/api/tenant/property-report",
        { params }
      );
      return response.data;
    },
    refetchOnMount: "always",
    enabled: !!params.property_uid && !!params.selected_date,
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });

  return {
    propertyReportData: {
      booked_units: query.data?.data.booked_units,
      available_units: query.data?.data.available_units,
      total_units: query.data?.data.total_units,
      occupancy_rate: query.data?.data.occupancy_rate,
    },
    selected_date: query.data?.data.selected_date,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
};

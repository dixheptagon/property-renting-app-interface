import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { SalesReportParams, SalesReportResponse } from "../_types/sales.report";
import { useSearchParams } from "next/navigation";

export const useSalesReport = () => {
  const searchParams = useSearchParams();

  // Parse query parameters from URL
  const startDate = searchParams.get("sales_date_from") || "";
  const endDate = searchParams.get("sales_date_to") || "";
  const propertyUId = searchParams.get("sales_propertyId") || "";

  const params: SalesReportParams = {
    propertyUId,
    startDate,
    endDate,
  };

  const query = useQuery<SalesReportResponse>({
    queryKey: ["sales-report", params],
    queryFn: async () => {
      const response = await axiosInstance.get<SalesReportResponse>(
        "/api/tenant/sales-report",
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
    data: query.data?.data,
    salesReportData: {
      totalRevenue: query.data?.data.totalRevenue,
      totalOrders: query.data?.data.totalOrders,
      completedOrders: query.data?.data.completedOrders,
      cancelledOrders: query.data?.data.cancelledOrders,
    },
    salesReportPeriods: {
      startDate: query.data?.data.startDate,
      endDate: query.data?.data.endDate,
      periods: query.data?.data.periods,
      totalOrders: query.data?.data.totalOrders,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
};

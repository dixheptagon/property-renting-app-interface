"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import {
  OrderListResponse,
  OrderListParams,
  OrderStatus,
  OrderCategory,
} from "../_types/order.status";
import { AxiosError } from "axios";

export const useOrderList = () => {
  const searchParams = useSearchParams();

  // Parse URL parameters
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const status = searchParams.getAll("status") as OrderStatus[];
  const category = searchParams.getAll("category") as OrderCategory[];
  const sort_by = searchParams.get("sort_by") || "created_at";
  const sort_dir = (searchParams.get("sort_dir") as "asc" | "desc") || "desc";
  const date_from = searchParams.get("date_from") || undefined;
  const date_to = searchParams.get("date_to") || undefined;

  const filters = {
    page,
    limit,
    status: status.length > 0 ? status : undefined,
    category: category.length > 0 ? category : undefined,
    sort_by,
    sort_dir,
    date_from,
    date_to,
  };

  const query = useQuery<OrderListResponse>({
    queryKey: ["order-list", filters],
    queryFn: async () => {
      const params: OrderListParams = {
        page,
        limit,
        status: status.length > 0 ? status : undefined,
        category: category.length > 0 ? category : undefined,
        sort_by: sort_by as OrderListParams["sort_by"],
        sort_dir,
        date_from,
        date_to,
      };

      const response = await axiosInstance.get<OrderListResponse>(
        "/api/tenant/get-order-list", // Update this endpoint when available
        { params }
      );

      console.log("response", response.data);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    orders: query.data?.data.data || [],
    totalItems: query.data?.data.pagination.total || 0,
    totalPages: query.data?.data.pagination.total_pages || 0,
    currentPage: page,
    limit,
    loading: query.isLoading,
    error: query.error as AxiosError,
    filters,
    refetch: query.refetch,
  };
};

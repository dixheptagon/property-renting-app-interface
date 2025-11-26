"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";
import type {
  Purchase,
  PurchaseStatus,
  PurchaseListResponse,
  PurchaseListParams,
} from "../_types/purchase.status";

const fetchPurchaseList = async (
  params: PurchaseListParams
): Promise<PurchaseListResponse> => {
  const queryParams = new URLSearchParams();

  // Add query parameters
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.status && params.status.length > 0) {
    params.status.forEach((status) => queryParams.append("status", status));
  }
  if (params.sort_by) queryParams.append("sort_by", params.sort_by);
  if (params.sort_dir) queryParams.append("sort_dir", params.sort_dir);
  if (params.date_from) queryParams.append("date_from", params.date_from);
  if (params.date_to) queryParams.append("date_to", params.date_to);

  const response = await axiosInstance.get<PurchaseListResponse>(
    `api/booking/get-order-list?${queryParams.toString()}`
  );

  return response.data;
};

export const usePurchaseList = () => {
  const searchParams = useSearchParams();

  // Parse search params
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.getAll("status") as PurchaseStatus[];
  const sort_by =
    (searchParams.get("sort_by") as
      | "created_at"
      | "check_in"
      | "price"
      | "property") || "created_at";
  const sort_dir = (searchParams.get("sort_dir") as "asc" | "desc") || "desc";
  const date_from = searchParams.get("date_from") || "";
  const date_to = searchParams.get("date_to") || "";

  const params: PurchaseListParams = {
    page,
    limit,
    status: status.length > 0 ? status : undefined,
    sort_by,
    sort_dir,
    date_from: date_from || undefined,
    date_to: date_to || undefined,
  };

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["purchase-list", params],
    queryFn: () => fetchPurchaseList(params),
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });

  // Extract data from response
  const purchases: Purchase[] = data?.success ? data.data.data : [];
  const totalItems = data?.success ? data.data.pagination.total : 0;
  const totalPages = data?.success ? data.data.pagination.total_pages : 0;

  return {
    purchases,
    totalItems,
    totalPages,
    currentPage: page,
    limit,
    loading,
    error: error ? (error as AxiosError) : null,
    refetch,
    // Current filter values for components
    filters: {
      status,
      sort_by,
      sort_dir,
      date_from,
      date_to,
    },
  };
};

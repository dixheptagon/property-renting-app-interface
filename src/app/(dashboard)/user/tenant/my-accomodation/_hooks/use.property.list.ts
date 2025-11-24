import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export interface Property {
  uid: string;
  category: string;
  status: string;
  title: string;
  location: {
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  review_summary: {
    average_rating: number | null;
    review_count: number;
  };
  main_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyListResponse {
  success: boolean;
  message: string;
  data: {
    data: Property[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface PropertyListParams {
  page?: number;
  limit?: number;
  status?: "draft" | "active" | "deleted";
  category?: "house" | "apartment" | "hotel" | "villa" | "room";
  sort_by?: "created_at" | "updated_at" | "title" | "base_price";
  sort_dir?: "asc" | "desc";
}

export const usePropertyList = (params: PropertyListParams = {}) => {
  return useQuery<PropertyListResponse>({
    queryKey: ["property-list", params],
    queryFn: async () => {
      const response = await axiosInstance.get<PropertyListResponse>(
        `api/tenant/get-property-list?${params}`,
        {
          params,
        }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });
};

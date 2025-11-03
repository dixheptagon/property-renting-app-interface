import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { TenantProfileResponse } from "../_types/tenant.profile.type";

export function useTenantProfile() {
  return useQuery({
    queryKey: ["tenant-profile"],
    queryFn: async () => {
      const response = await axiosInstance.get<TenantProfileResponse>(
        "/api/auth/tenant-profile"
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

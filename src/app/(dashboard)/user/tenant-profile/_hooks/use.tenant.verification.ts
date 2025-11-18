import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { TenantVerificationResponse } from "../_types/tenant.verification.type";

export function useTenantVerification({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: TenantVerificationResponse) => void;
  onError?: (error: any) => void;
} = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["tenant-verification"],
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post<TenantVerificationResponse>(
        "/api/auth/tenant-profile/verification",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch tenant profile data
      queryClient.invalidateQueries({ queryKey: ["tenant-profile"] });
      toast.success("Verification submitted successfully!");
      onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit verification"
      );
      onError?.(error);
    },
  });
}

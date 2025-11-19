import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useResendVerification({
  onError,
  onSuccess,
}: {
  onError?: (error: any) => void;
  onSuccess?: (data: any) => void;
}) {
  return useMutation({
    mutationKey: ["resend-verification"],
    mutationFn: async (email: string) => {
      const res = await axiosInstance.post("/api/auth/resend-verification", {
        email,
      });

      return res.data;
    },
    onError,
    onSuccess,
  });
}

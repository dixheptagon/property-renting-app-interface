import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useVerifyEmailByLink({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["verify-email-by-link"],
    mutationFn: async (data: { verification_token: string }) => {
      const res = await axiosInstance.post(
        `/api/auth/verify-email?verification_token=${data.verification_token}`,
        data
      );
      return res.data;
    },
    onSuccess,
    onError,
  });
}

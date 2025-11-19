import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface ResendVerificationResponse {
  data: unknown;
  message: string;
}

interface ResendVerificationError {
  message?: string;
  response?: {
    data?: {
      error: string;
    };
  };
}

export function useResendVerification({
  onError,
  onSuccess,
}: {
  onError?: (error: ResendVerificationError) => void;
  onSuccess?: (data: ResendVerificationResponse) => void;
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

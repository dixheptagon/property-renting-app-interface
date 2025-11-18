import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function UseVerifyEmail({
  onError,
  onSuccess,
}: {
  onError?: (error: any) => void;
  onSuccess?: (data: any) => void;
}) {
  return useMutation({
    mutationKey: ["verify-email"],
    mutationFn: async (data: { email: string; verification_code: string }) => {
      const res = await axiosInstance.post("/api/auth/verify-email", data);

      return res.data;
    },
    onError,
    onSuccess,
  });
}

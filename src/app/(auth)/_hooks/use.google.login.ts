import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useGoogleLogin({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["google-login"],
    mutationFn: async (data: { idToken: string }) => {
      const res = await axiosInstance.post("/api/auth/social-login", data);

      return res.data;
    },
    onSuccess,
    onError,
  });
}

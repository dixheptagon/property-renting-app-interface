import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useLoginAccount({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["login-account"],
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axiosInstance.post("/api/auth/login", data);
      return res.data;
    },
    onSuccess,
    onError,
  });
}

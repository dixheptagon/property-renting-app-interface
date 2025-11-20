import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useSendVerification() {
  return useMutation({
    mutationKey: ["send-verification"],
    mutationFn: async (email: string) => {
      const res = await axiosInstance.post("/api/auth/send-verification", {
        email,
      });

      return res.data;
    },
  });
}

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useRegisterAccount({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["register-account"],
    mutationFn: async (data: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      role?: string;
    }) => {
      const res = await axiosInstance.post("/api/auth/register", data);
      return res.data;
    },
    onSuccess,
    onError,
  });
}

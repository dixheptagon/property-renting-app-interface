import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AuthResponse } from "@/lib/types/auth";

interface LoginResponse {
  data: AuthResponse;
  message: string;
}

interface LoginError {
  response?: {
    data?: {
      error: string;
    };
  };
}

export function useLoginAccount({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: LoginError) => void;
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

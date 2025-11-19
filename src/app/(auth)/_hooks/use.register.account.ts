import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { RegisterData } from "@/lib/types/auth";

interface RegisterResponse {
  data: RegisterData;
  message: string;
}

interface RegisterError {
  message?: string;
  response?: {
    data?: {
      error: string;
    };
  };
}

export function useRegisterAccount({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: RegisterError) => void;
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

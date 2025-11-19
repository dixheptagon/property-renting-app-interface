import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface UpdatePasswordResponse {
  data: unknown;
  message: string;
}

interface UpdatePasswordError {
  message?: string;
  response?: {
    data?: {
      error: string;
    };
  };
}

export function useUpdatePassword({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: UpdatePasswordResponse) => void;
  onError?: (error: UpdatePasswordError) => void;
}) {
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (data: {
      current_password: string;
      new_password: string;
      confirm_password: string;
    }) => {
      const res = await axiosInstance.post("/api/auth/update-password", data);
      return res.data;
    },
    onSuccess,
    onError,
  });
}

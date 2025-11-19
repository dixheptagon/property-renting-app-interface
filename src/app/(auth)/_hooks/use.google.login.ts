import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AuthResponse } from "@/lib/types/auth";

interface GoogleLoginResponse {
  data: AuthResponse;
  message: string;
}

interface GoogleLoginError {
  response?: {
    data?: {
      error: string;
    };
  };
}

export function useGoogleLogin({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: GoogleLoginResponse) => void;
  onError?: (error: GoogleLoginError) => void;
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

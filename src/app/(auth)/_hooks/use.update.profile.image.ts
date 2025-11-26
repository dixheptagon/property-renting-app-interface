import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useUpdateProfileImage({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["update-profile-image"],
    mutationFn: async (data: FormData) => {
      const res = await axiosInstance.post(
        "/api/auth/update-profile-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onSuccess,
    onError,
  });
}

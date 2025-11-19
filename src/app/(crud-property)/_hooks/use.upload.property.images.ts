import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useUploadPropertyImages({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["upload-property-images"],
    mutationFn: async (data: FormData) => {
      const res = await axiosInstance.post(
        "/api/properties/upload-property-images",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 600000, // 60 seconds
        }
      );
      return res.data;
    },
    onSuccess,
    onError,
  });
}

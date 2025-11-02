import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import type { UploadPropertyData } from "../_types/upload.property.type";

export function useUploadPropertyForm({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["upload-property-form"],
    mutationFn: async (data: UploadPropertyData) => {
      console.log("data", data);

      const res = await axiosInstance.post(
        "/api/properties/upload-property",
        data,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 180000, // 180 seconds
        }
      );

      return res.data;
    },
    onSuccess,
    onError,
  });
}

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useDeletePropertyImage({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["delete-property-image"],
    mutationFn: async (data: { imageId: number; tempGroupId?: string }) => {
      const res = await axiosInstance.delete(
        `/api/properties/images/${data.imageId}/${data.tempGroupId}`
      );

      return res.data;
    },
    onSuccess,
    onError,
  });
}

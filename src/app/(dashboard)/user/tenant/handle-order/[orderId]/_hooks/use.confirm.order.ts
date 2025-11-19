import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { ConfirmOrderResponse } from "../_types/order.details.type";

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<ConfirmOrderResponse, Error, string>({
    mutationFn: async (orderId: string) => {
      const response = await axiosInstance.post<ConfirmOrderResponse>(
        `api/tenant/${orderId}/confirm-order`
      );

      return response.data;
    },
    onSuccess: (data, orderId) => {
      // Invalidate and refetch booking data after successful confirmation
      queryClient.invalidateQueries({
        queryKey: ["order-list", orderId],
      });

      // Optionally invalidate any booking lists
      queryClient.invalidateQueries({
        queryKey: ["order-list"],
      });
    },
  });
};

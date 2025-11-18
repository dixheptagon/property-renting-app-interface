import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  RejectOrderParams,
  RejectOrderResponse,
} from "../_types/order.details.type";

export const useRejectOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["reject-order"],
    mutationFn: async ({ orderId, rejectionReason }: RejectOrderParams) => {
      const response = await axiosInstance.post<RejectOrderResponse>(
        `api/tenant/${orderId}/reject-order`,
        {
          rejection_reason: rejectionReason,
        }
      );

      console.log(response.data);
      return response.data;
    },
    onSuccess: (data, orderId) => {
      // Invalidate and refetch booking data after successful rejection
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

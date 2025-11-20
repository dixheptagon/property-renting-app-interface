import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  CancelOrderParams,
  CancelOrderResponse,
} from "../_types/order.details.type";
import { toast } from "sonner";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cancel-order"],
    mutationFn: async ({ orderId, cancellationReason }: CancelOrderParams) => {
      const response = await axiosInstance.post<CancelOrderResponse>(
        `api/tenant/${orderId}/cancel-order`,
        {
          cancellation_reason: cancellationReason,
        }
      );

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

      toast.success(data?.message || "Order cancelled successfully");
      window.location.reload();
    },
  });
};

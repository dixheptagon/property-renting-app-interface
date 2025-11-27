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
      toast.success(data?.message || "Order cancelled successfully");

      // Invalidate and refetch booking data after successful rejection
      queryClient.invalidateQueries({
        queryKey: ["order-list", orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["order-list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["booking", orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["purchase-list"],
      });
    },
  });
};

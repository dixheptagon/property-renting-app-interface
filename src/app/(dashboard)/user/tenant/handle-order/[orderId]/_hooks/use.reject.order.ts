import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  RejectOrderParams,
  RejectOrderResponse,
} from "../_types/order.details.type";
import { toast } from "sonner";

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

      return response.data;
    },
    onSuccess: (data, orderId) => {
      toast.success(data?.message || "Order rejected successfully");

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

      // Optionally invalidate any booking lists
      queryClient.invalidateQueries({
        queryKey: ["booking", orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["purchase-list"],
      });
    },
  });
};

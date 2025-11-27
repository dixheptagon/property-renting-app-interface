import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { ConfirmOrderResponse } from "../_types/order.details.type";
import { toast } from "sonner";

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
      toast.success(data?.message || "Order confirmed successfully");

      // Invalidate and refetch booking data after successful confirmation
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

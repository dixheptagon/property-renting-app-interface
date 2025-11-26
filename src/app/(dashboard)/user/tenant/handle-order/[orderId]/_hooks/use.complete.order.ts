import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { CompleteOrderResponse } from "../_types/order.details.type";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCompleteOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<CompleteOrderResponse, Error, string>({
    mutationFn: async (orderId: string) => {
      const response = await axiosInstance.post<CompleteOrderResponse>(
        `api/tenant/${orderId}/complete-order`
      );

      return response.data;
    },
    onSuccess: (data, orderId) => {
      toast.success(data?.message || "Order completed successfully");

      // Invalidate and refetch booking data after successful completion
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

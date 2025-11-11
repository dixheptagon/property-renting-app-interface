import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { CompleteOrderResponse } from "../_types/order.details.type";
import { useRouter } from "next/navigation";

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
      // Invalidate and refetch booking data after successful completion
      queryClient.invalidateQueries({
        queryKey: ["booking", orderId],
      });

      // Optionally invalidate any booking lists
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      router.push("/user/tenant/order-list");
    },
  });
};

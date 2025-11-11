import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useCancelOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["reject-order"],
    mutationFn: async ({ orderId, cancellationReason }: CancelOrderParams) => {
      const response = await axiosInstance.post<CancelOrderResponse>(
        `api/booking/${orderId}/cancel-order`,
        {
          cancellation_reason: cancellationReason,
        }
      );

      console.log(response.data);
      return response.data;
    },
    onSuccess: (data, orderId) => {
      // Invalidate and refetch booking data after successful rejection
      queryClient.invalidateQueries({
        queryKey: ["booking", orderId],
      });

      // Optionally invalidate any booking lists
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast.success(data?.message || "Order cancelled successfully");
      router.push("/");
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError && error.response?.data?.error
          ? error.response?.data?.error
          : "An error occurred during cancellation"
      );

      console.error("Cancel order error:", error);
    },
  });
};

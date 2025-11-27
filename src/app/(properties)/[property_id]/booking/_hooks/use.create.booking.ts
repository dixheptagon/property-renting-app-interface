import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { toast } from "sonner";

interface CreateBookingPayload {
  room_id: string;
  property_id: string;
  check_in_date: string;
  check_out_date: string;
  fullname: string;
  email: string;
  phone_number: string;
}

export const useCreateBooking = () => {
  const { access_token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const response = await axiosInstance.post(
        "api/booking/create-order",
        payload
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Booking created successfully!");

      // Invalidate and refetch booking data after successful completion
      queryClient.invalidateQueries({
        queryKey: ["order-list"],
      });

      // Optionally invalidate any booking lists
      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error ||
          "Failed to create booking. Please try again."
      );
    },
  });
};

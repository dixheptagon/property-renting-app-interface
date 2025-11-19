import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { toast } from "sonner";
import { AxiosError } from "axios";

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
  return useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const response = await axiosInstance.post(
        "api/booking/create-order",
        payload
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Booking created successfully!");
      // Handle success - maybe redirect to payment page
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error ||
          "Failed to create booking. Please try again."
      );
    },
  });
};

import { useMutation } from "@tanstack/react-query";
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

  return useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const response = await axiosInstance.post(
        "api/booking/create-order",
        payload
      );

      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Booking created successfully!");
      // Handle success - maybe redirect to payment page
      console.log("Booking created:", data);
    },
    onError: (error: any) => {
      console.error("Booking creation failed:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to create booking. Please try again."
      );
    },
  });
};

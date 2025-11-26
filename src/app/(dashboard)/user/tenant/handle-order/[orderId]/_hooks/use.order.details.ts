import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { BookingResponse } from "../_types/order.details.type";

export const useGetBooking = (orderId: string) => {
  return useQuery<BookingResponse, Error>({
    queryKey: ["booking", orderId],
    queryFn: async () => {
      const response = await axiosInstance.get<BookingResponse>(
        `api/booking/get-booking/${orderId}`
      );
      return response.data;
    },
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!orderId,
  });
};

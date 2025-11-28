import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { BookingResponse } from "../_types/order.details.type.js";

export const useGetBooking = (orderId: string | undefined) => {
  return useQuery<BookingResponse, Error>({
    queryKey: ["booking", orderId],
    queryFn: async () => {
      const response = await axiosInstance.get<BookingResponse>(
        `api/booking/get-booking/${orderId}`
      );
      return response.data;
    },
    enabled: !!orderId,
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });
};

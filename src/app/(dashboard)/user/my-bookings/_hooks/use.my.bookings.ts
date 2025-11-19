import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type {
  Booking,
  Pagination,
  MyBookingsParams,
  UseMyBookingsReturn,
  MyBookingsResponse,
} from "../_types/my.bookings";

const fetchMyBookings = async (
  params: MyBookingsParams = {}
): Promise<MyBookingsResponse> => {
  const queryParams = new URLSearchParams();

  // Add query parameters
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.order_id) queryParams.append("order_id", params.order_id);
  if (params.date_from) queryParams.append("date_from", params.date_from);
  if (params.date_to) queryParams.append("date_to", params.date_to);
  if (params.status) queryParams.append("status", params.status);
  if (params.sort_by) queryParams.append("sort_by", params.sort_by);
  if (params.sort_dir) queryParams.append("sort_dir", params.sort_dir);

  const response = await axiosInstance.get<MyBookingsResponse>(
    `/api/booking/my-bookings?${queryParams.toString()}`
  );

  return response.data;
};

export const useMyBookings = (
  initialParams: MyBookingsParams = {}
): UseMyBookingsReturn => {
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings", initialParams],
    queryFn: () => fetchMyBookings(initialParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Extract data from response
  const bookings: Booking[] = data?.success ? data.data.data : [];
  const totalCompleted: number = data?.success ? data.data.total_completed : 0;
  const pagination: Pagination = data?.success
    ? data.data.pagination
    : {
        page: 1,
        limit: 20,
        total: 0,
        total_pages: 0,
      };

  return {
    bookings,
    totalCompleted,
    pagination,
    loading,
    error: error ? (error as Error).message : null,
    refetch: async () => {
      await refetch();
    },
  };
};

// Additional hook for getting active bookings count
export const useActiveBookingsCount = (): number => {
  const { bookings } = useMyBookings({ status: "confirmed", limit: 100 });
  return bookings.length;
};

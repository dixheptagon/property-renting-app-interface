// API Response Types for My Bookings
export interface BookingProperty {
  name: string;
  address: string;
  city: string;
  main_image: string;
}

export interface BookingRoom {
  name: string;
  description: string;
  property: BookingProperty;
}

export interface Booking {
  order_id: string;
  room: BookingRoom;
  status:
    | "pending_payment"
    | "processing"
    | "confirmed"
    | "cancelled"
    | "completed";
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  created_at: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface MyBookingsResponse {
  success: boolean;
  message: string;
  data: {
    data: Booking[];
    total_completed: number;
    pagination: Pagination;
  };
}

// Query Parameters for API
export interface MyBookingsParams {
  page?: number;
  limit?: number;
  order_id?: string;
  date_from?: string;
  date_to?: string;
  status?:
    | "pending_payment"
    | "processing"
    | "confirmed"
    | "cancelled"
    | "completed";
  sort_by?: "created_at" | "check_in_date" | "total_price";
  sort_dir?: "asc" | "desc";
}

// Hook return type
export interface UseMyBookingsReturn {
  bookings: Booking[];
  totalCompleted: number;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  refetch: (params?: MyBookingsParams) => Promise<void>;
}

// Component Props
export interface BookingCardProps {
  booking: Booking;
}

export interface QuickStatsProps {
  totalCompleted: number;
  activeBookings: number;
}

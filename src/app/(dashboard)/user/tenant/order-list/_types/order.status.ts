// Types
export type OrderStatus =
  | "confirmed"
  | "pending_payment"
  | "processing"
  | "cancelled"
  | "completed";

export type OrderCategory = "apartment" | "house" | "hotel" | "room" | "villa";

export type SortOrder = "asc" | "desc";

export interface StatusOption {
  value: OrderStatus;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  style?: {
    badgeColor: string;
  };
  bg?: string;
}

export interface Order {
  orderId: string;
  status: OrderStatus;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  property: {
    name: string;
    address: string;
    city: string;
  };
  room: {
    name: string;
    description: string;
  };
  user: {
    name: string;
    email: string;
  };
}

// API Response Types
export interface OrderListResponse {
  success: boolean;
  message: string;
  data: {
    data: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}

// Query Parameters for API
export interface OrderListParams {
  page?: number;
  limit?: number;
  status?: OrderStatus[];
  category?: OrderCategory[];
  sort_by?: "created_at" | "check_in_date" | "total_price";
  sort_dir?: "asc" | "desc";
  date_from?: string;
  date_to?: string;
}

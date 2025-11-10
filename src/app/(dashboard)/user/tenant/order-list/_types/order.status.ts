// Types
export type OrderStatus =
  | "confirmed"
  | "pending_payment"
  | "processing"
  | "cancelled"
  | "completed";

export type SortOrder = "asc" | "desc";

export interface StatusOption {
  value: OrderStatus;
  label: string;
  style?: {
    badgeColor: string;
  };
  bg?: string;
}

export interface Order {
  id: string;
  propertyName: string;
  roomType: string;
  status: OrderStatus;
  customer: string;
  expiredAt: string;
  statusColor: string;
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
  sort_by?: "created_at" | "expired_at" | "property" | "customer";
  sort_dir?: "asc" | "desc";
  date_from?: string;
  date_to?: string;
}

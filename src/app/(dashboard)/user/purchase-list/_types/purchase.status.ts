// Types
export type PurchaseStatus =
  | "pending_payment"
  | "processing"
  | "confirmed"
  | "cancelled"
  | "completed";

export type SortOrder = "asc" | "desc";

export interface StatusOption {
  value: PurchaseStatus;
  label: string;
  color: string;
}

export interface Purchase {
  order_id: string;
  room: {
    name: string;
    description: string;
    property: {
      name: string;
      address: string;
      city: string;
    };
  };
  status: PurchaseStatus;
  check_in_date: string;
  check_out_date: string;
  total_price: string;
  created_at: string;
}

// API Response Types
export interface PurchaseListResponse {
  success: boolean;
  message: string;
  data: {
    data: Purchase[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}

// Query Parameters for API
export interface PurchaseListParams {
  page?: number;
  limit?: number;
  status?: PurchaseStatus[];
  sort_by?: "created_at" | "check_in" | "price" | "property";
  sort_dir?: "asc" | "desc";
  date_from?: string;
  date_to?: string;
}

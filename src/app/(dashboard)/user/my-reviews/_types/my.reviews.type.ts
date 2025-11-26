// Types for Awaiting Reviews API

export interface Property {
  id: number;
  name: string;
  room_types: string[];
  main_image: string;
}

export interface AwaitingReview {
  booking_uid: string;
  status: "completed";
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  property: Property;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}

export interface AwaitingReviewsData {
  awaiting_reviews: AwaitingReview[];
  pagination: Pagination;
}

export interface AwaitingReviewsResponse {
  success: boolean;
  message: string;
  data: AwaitingReviewsData;
}

export interface AwaitingReviewsParams {
  page?: number;
  limit?: number;
  orderBy?: "createdAt" | "check_in_date";
  order?: "asc" | "desc";
}

// Types for Get Reviews by Tenant API

export interface ReviewUser {
  first_name: string;
  last_name: string;
  display_name: string;
}

export interface ReviewRoom {
  name: string;
}

export interface ReviewBooking {
  uid: string;
  check_in_date: string;
  check_out_date: string;
  room: ReviewRoom;
}

export interface TenantReview {
  id: number;
  booking_id: number;
  user_id: number;
  property_id: number;
  rating: string;
  comment: string;
  reply: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: ReviewUser;
  booking: ReviewBooking;
}

export interface RatingDistribution {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface ReviewStatistics {
  average_rating: number;
  total_reviews: number;
  rating_distribution: RatingDistribution;
}

export interface ReviewPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}

export interface ReviewsData {
  reviews: TenantReview[];
  statistics: ReviewStatistics;
  pagination: ReviewPagination;
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  data: ReviewsData;
}

export interface ReviewsParams {
  page?: number;
  limit?: number;
  rating?: string; // comma-separated ratings like "4,5"
  date_from?: string;
  date_to?: string;
  sort_by?: "created_at" | "rating" | "updated_at";
  sort_dir?: "asc" | "desc";
  search?: string;
  propertyId?: string;
}

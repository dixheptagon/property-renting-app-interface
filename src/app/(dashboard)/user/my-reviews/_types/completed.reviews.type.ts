// Types for Get My Reviews API

export interface Tenant {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
}

export interface CompletedReviewProperty {
  id: number;
  name: string;
  room_type: string;
  tenant: Tenant;
}

export interface CompletedReview {
  id: number;
  rating: number;
  comment: string;
  reply: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CompletedReviewItem {
  booking_uid: string;
  status: "completed";
  property: CompletedReviewProperty;
  review: CompletedReview;
}

export interface CompletedReviewsPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}

export interface CompletedReviewsData {
  reviews: CompletedReviewItem[];
  pagination: CompletedReviewsPagination;
}

export interface CompletedReviewsResponse {
  success: boolean;
  message: string;
  data: CompletedReviewsData;
}

export interface CompletedReviewsParams {
  page?: number;
  limit?: number;
  orderBy?: "reviewCreatedAt";
  order?: "asc" | "desc";
}

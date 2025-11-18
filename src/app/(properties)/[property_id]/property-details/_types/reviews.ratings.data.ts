// Types for Get Reviews by Property ID API

export interface PublicReview {
  username: string;
  roomTypeName: string;
  reviewComment: string;
  createdAt: string;
  rating: number;
  tenantName: string;
  tenantReply: string | null;
  updatedAt: string;
}

export interface RatingStatistic {
  rating: number;
  count: number;
}

export interface RatingDistribution {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface PublicReviewStatistics {
  totalReviews: number;
  averageRating: number;
  ratingStatistics: RatingDistribution;
}

export interface PublicReviewPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface PublicReviewsData {
  reviews: PublicReview[];
  statistics: PublicReviewStatistics;
  pagination: PublicReviewPagination;
}

export interface PublicReviewsResponse {
  success: boolean;
  message: string;
  data: PublicReviewsData;
}

export interface PublicReviewsParams {
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

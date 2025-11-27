// Types for Get Reviews by Property ID API

interface PublicReview {
  username: string;
  roomTypeName: string;
  reviewComment: string;
  createdAt: string;
  rating: number;
  tenantName: string;
  tenantReply: string | null;
  updatedAt: string;
}

interface RatingStatistic {
  rating: number;
  count: number;
}

interface RatingDistribution {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

interface PublicReviewStatistics {
  totalReviews: number;
  averageRating: number;
  ratingStatistics: RatingDistribution;
}

interface PublicReviewPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

interface PublicReviewsData {
  reviews: PublicReview[];
  statistics: PublicReviewStatistics;
  pagination: PublicReviewPagination;
}

interface PublicReviewsResponse {
  success: boolean;
  message: string;
  data: PublicReviewsData;
}

interface PublicReviewsParams {
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

export type {
  PublicReviewsParams,
  PublicReviewsResponse,
  PublicReview,
  PublicReviewStatistics,
  PublicReviewPagination,
  RatingStatistic,
  RatingDistribution,
};

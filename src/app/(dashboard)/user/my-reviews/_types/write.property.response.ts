// Types for Write Review API

export interface WriteReviewRequest {
  comment: string;
  rating: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  reply: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WriteReviewData {
  booking_uid: string;
  status: "completed";
  review: Review;
}

export interface WriteReviewResponse {
  success: boolean;
  message: string;
  data: WriteReviewData;
}

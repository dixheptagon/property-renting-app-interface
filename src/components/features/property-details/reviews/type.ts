// Types
export interface ApiReview {
  id: number;
  propertyId: number;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Review {
  id: number;
  username: string;
  avatar: string;
  joinDate: string;
  rating: number;
  reviewDate: string;
  description: string;
}

export interface PropertyReviewsProps {
  propertyId: number;
}

// Component for loading state

// Individual review card component
export interface ReviewCardProps {
  review: Review;
}

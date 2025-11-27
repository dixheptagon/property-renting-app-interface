interface CreateReviewButtonProps {
  onSaveReview: (values: handleWriteReviewValues) => void;
}

interface handleWriteReviewValues {
  rating: number;
  review: string;
}

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  error: string | false | undefined;
}

export type {
  CreateReviewButtonProps,
  handleWriteReviewValues,
  StarRatingProps,
};

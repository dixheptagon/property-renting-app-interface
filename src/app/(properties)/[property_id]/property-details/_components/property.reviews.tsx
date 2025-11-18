import ReviewsHeader from "./reviews-components/reviews.header";
import ReviewCard from "./reviews-components/reviews.card";
import { ReviewList } from "./reviews-components/reviews.list";
import { useReviewsRatingsData } from "../_hooks/use.reviews.ratings.data";
import LoadingData from "@/components/ui/loading.data";

export default function PropertyReviews() {
  const { reviews, statistics, isLoading } = useReviewsRatingsData();

  const displayedReviews = reviews.slice(0, 2);

  if (isLoading) {
    return (
      <div id="reviews-ratings">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <LoadingData />
        </div>
      </div>
    );
  }

  return (
    <div id="reviews-ratings">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        {/* Header with Average Rating */}
        <ReviewsHeader
          averageRating={statistics.averageRating}
          totalReviews={statistics.totalReviews}
        />

        {displayedReviews.map((review, index) => (
          <ReviewCard key={index} reviewData={review} />
        ))}

        <div className="mt-6 w-full text-center">
          <ReviewList />
        </div>
      </div>
    </div>
  );
}

"use client";

import TotalReviews from "./review-stats-components/total.reviews";
import AverageRating from "./review-stats-components/average.rating";
import ReviewsStatisticsChart from "./review-stats-components/statistic.chart";
import { useReviewRatingsData } from "@/app/(dashboard)/user/tenant/reviews-ratings/_hooks/use.review.ratings.data";

export default function ReviewStats() {
  const { statistics } = useReviewRatingsData();
  return (
    <section className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
      <TotalReviews totalReviews={statistics.total_reviews} />
      <AverageRating averageRating={statistics.average_rating} />
      <ReviewsStatisticsChart
        ratingDistribution={statistics.rating_distribution}
      />
    </section>
  );
}

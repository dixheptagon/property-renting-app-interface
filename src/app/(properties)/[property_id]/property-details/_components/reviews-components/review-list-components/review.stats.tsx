"use client";

import TotalReviews from "./review-stats-components/total.reviews";
import AverageRating from "./review-stats-components/average.rating";
import ReviewsStatisticsChart from "./review-stats-components/statistic.chart";
import { useReviewsRatingsData } from "../../../_hooks/use.reviews.ratings.data";

export default function ReviewStats() {
  const { statistics } = useReviewsRatingsData();

  return (
    <section className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
      <TotalReviews totalReviews={statistics.totalReviews} />
      <AverageRating averageRating={statistics.averageRating} />
      <ReviewsStatisticsChart
        ratingDistribution={statistics.ratingStatistics}
      />
    </section>
  );
}

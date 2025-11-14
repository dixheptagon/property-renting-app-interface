import TotalReviews from "./review-stats-components/total.reviews";
import AverageRating from "./review-stats-components/average.rating";
import ReviewsStatisticsChart from "./review-stats-components/statistic.chart";

export default function ReviewStats() {
  return (
    <section className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
      <TotalReviews />
      <AverageRating />
      <ReviewsStatisticsChart />
    </section>
  );
}

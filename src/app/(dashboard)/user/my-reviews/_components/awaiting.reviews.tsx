import { useAwaitingReviews } from "../_hooks/use.awaiting.reviews";
import LoadingData from "@/components/ui/loading.data";
import { Button } from "@/components/ui/button";
import { Ban, CircleX } from "lucide-react";
import AwaitingReviewCard from "./awaiting-review-components/awaiting.review.card";

export default function AwaitingReviews() {
  const { awaitingReviews, isLoading, isError, error, refetch } =
    useAwaitingReviews();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 py-6">
        <LoadingData />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-white px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <Ban className="h-10 w-10 stroke-2 text-red-400" />
          <p className="text-red-600">
            Error loading Awaiting Reviews: {error?.message}
          </p>
        </div>

        <div className="flex w-full justify-center">
          <Button
            className="mt-6 py-4 text-base shadow-md md:py-6 md:text-lg"
            onClick={() => refetch()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section>
      {awaitingReviews && awaitingReviews.length > 0 ? (
        awaitingReviews.map((review) => (
          <AwaitingReviewCard key={review.booking_uid} review={review} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-gray-500">
          <CircleX className="h-10 w-10 stroke-2 text-gray-400" />
          <p className="text-lg">No awaiting reviews found</p>
        </div>
      )}
    </section>
  );
}

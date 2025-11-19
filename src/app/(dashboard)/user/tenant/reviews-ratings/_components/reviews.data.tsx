"use client";

import React from "react";
import ReviewCard from "./reviews-data-components/review.card";
import ErrorState from "./reviews-data-components/error.state";
import { useReviewRatingsData } from "../_hooks/use.review.ratings.data";
import LoadingData from "@/components/ui/loading.data";
import EmptyState from "./reviews-data-components/empty.state";

export default function ReviewsData() {
  const { reviews, isLoading, isError, error, refetch } =
    useReviewRatingsData();

  if (isLoading) {
    return (
      <section className="mt-6 space-y-6">
        <div className="flex items-center justify-center py-12">
          <LoadingData />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-6 space-y-6">
        <ErrorState error={error?.message} onRetry={() => refetch()} />
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="mt-6 space-y-6">
        <EmptyState />
      </section>
    );
  }

  return (
    <section className="mt-6 space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
}

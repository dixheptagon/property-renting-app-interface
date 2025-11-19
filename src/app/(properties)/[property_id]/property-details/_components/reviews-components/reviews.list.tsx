"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterSection from "./review-list-components/filter.section";
import ReviewStats from "./review-list-components/review.stats";
import { PaginationSection } from "./review-list-components/pagination.section";
import ReviewsData from "./review-list-components/reviews.data";
import { useReviewSearchParams } from "../../_hooks/use.review.search.params";

export function ReviewList() {
  const { clearAll } = useReviewSearchParams();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      clearAll();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-6 py-2">
          View More Reviews
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-6xl! overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Reviews & Ratings</DialogTitle>
          <DialogDescription>
            Browse and filter all reviews for this property
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <FilterSection />
          <ReviewStats />
          <ReviewsData />
          <PaginationSection />
        </div>
      </DialogContent>
    </Dialog>
  );
}

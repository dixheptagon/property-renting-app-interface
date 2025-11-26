"use client";

import { useReviewsRatingsData } from "../../../_hooks/use.reviews.ratings.data";
import { LimitShows } from "./pagination-section-component/limit.show";
import { PaginationComponent } from "./pagination-section-component/pagination";

export function PaginationSection() {
  const { pagination } = useReviewsRatingsData();

  return (
    <div className="mt-4">
      <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:flex-row sm:justify-between">
        <LimitShows currentLimit={pagination.limit} />
        <PaginationComponent
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalItems}
        />
      </div>
    </div>
  );
}

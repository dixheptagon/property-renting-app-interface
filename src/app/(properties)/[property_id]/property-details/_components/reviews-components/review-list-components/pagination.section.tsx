"use client";

import { useReviewRatingsData } from "@/app/(dashboard)/user/tenant/reviews-ratings/_hooks/use.review.ratings.data";
import { LimitShows } from "./pagination-section-component/limit.show";
import { PaginationComponent } from "./pagination-section-component/pagination";

export function PaginationSection() {
  const { pagination } = useReviewRatingsData();

  return (
    <div className="mt-4">
      <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <LimitShows currentLimit={pagination.limit} />
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
        />
      </div>
    </div>
  );
}

import { LimitShows } from "./pagination-components/limit.shows";
import { PaginationComponent } from "./pagination-components/pagination";

interface PaginationSectionProps {
  totalItemCount: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export default function PaginationSection({
  totalItemCount,
  limit,
  currentPage,
  onPageChange,
  onLimitChange = () => null,
}: PaginationSectionProps) {
  return (
    <div className="mt-4">
      <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <LimitShows value={limit} onValueChange={onLimitChange} />
        <div>
          <PaginationComponent
            totalItemCount={totalItemCount}
            limit={limit}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

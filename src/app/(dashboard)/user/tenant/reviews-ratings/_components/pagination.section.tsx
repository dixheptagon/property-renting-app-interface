import { LimitShows } from "./pagination-section-component/limit.show";
import { PaginationComponent } from "./pagination-section-component/pagination";

export function PaginationSection() {
  return (
    <div className="mt-4">
      <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <LimitShows />
        <PaginationComponent />
      </div>
    </div>
  );
}

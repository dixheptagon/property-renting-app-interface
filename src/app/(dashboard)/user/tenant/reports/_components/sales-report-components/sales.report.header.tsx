import PropertySelect from "./property.select";
import { FilterByDate } from "./filter.by.date";

export function SalesReportHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Sales Report
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and analyze your sales activity
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <PropertySelect />
        <FilterByDate />
      </div>
    </div>
  );
}

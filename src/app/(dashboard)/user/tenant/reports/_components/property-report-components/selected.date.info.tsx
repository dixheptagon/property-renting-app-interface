import { usePropertyReportSearchParams } from "../../_hooks/use.property.report.search.params";
import { formatDate } from "../../_utils/format.date";

export function SelectedDateInfo() {
  const { filters } = usePropertyReportSearchParams();

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-linear-to-br from-yellow-100 to-amber-200 p-6 shadow-md">
      <h3 className="mb-2 text-sm font-medium text-gray-600">Selected Date</h3>
      <p className="text-2xl font-bold text-amber-600">
        {filters.property_date ? (
          <span>{formatDate(new Date(filters.property_date))}</span>
        ) : (
          <span>N/A</span>
        )}
      </p>

      <div
        className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-yellow-500 to-amber-600`}
      ></div>
    </div>
  );
}

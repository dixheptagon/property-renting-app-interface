import { X } from "lucide-react";
import statusOptions from "../../_const/status.option";
import { IFilterButton } from "../../_types/filter.type";

export default function ActiveFilters({
  selectedStatus,
  setSelectedStatus,
}: IFilterButton) {
  if (selectedStatus.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg bg-white p-3 shadow-sm">
      <span className="text-sm font-medium text-gray-600">Active Filters:</span>
      {selectedStatus.map((status) => {
        const statusObj = statusOptions.find((s) => s.value === status);
        if (!statusObj) return null;
        return (
          <span
            key={status}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusObj.bg}`}
          >
            {statusObj.label}
            <button
              onClick={() =>
                setSelectedStatus(selectedStatus.filter((s) => s !== status))
              }
              className="ml-1 hover:opacity-70"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        );
      })}
    </div>
  );
}

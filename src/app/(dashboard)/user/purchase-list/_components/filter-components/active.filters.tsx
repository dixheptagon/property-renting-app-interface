import { X } from "lucide-react";
import { PurchaseStatus } from "../../_types/purchase.status";
import statusOptions from "../../_const/status.option";

interface ActiveFiltersProps {
  selectedStatus: PurchaseStatus[];
  onToggleStatus: (status: PurchaseStatus) => void;
}

export default function ActiveFilters({
  selectedStatus,
  onToggleStatus,
}: ActiveFiltersProps) {
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
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusObj.color}`}
          >
            {statusObj.label}
            <button
              onClick={() => onToggleStatus(status)}
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

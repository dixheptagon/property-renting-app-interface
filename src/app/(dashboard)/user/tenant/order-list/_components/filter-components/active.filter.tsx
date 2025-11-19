"use client";
import { useSearchParams } from "next/navigation";
import statusOptions from "../../_const/status.option";
import PropertyCategoryOptions from "../../_const/property.category.option";
import { OrderStatus, OrderCategory } from "../../_types/order.status";

export default function ActiveFilters() {
  const searchParams = useSearchParams();
  const selectedStatus = searchParams.getAll("status") as OrderStatus[];
  const selectedCategory = searchParams.getAll("category") as OrderCategory[];

  if (selectedStatus.length === 0 && selectedCategory.length === 0) return null;

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
            {statusObj.icon && <statusObj.icon className="h-3 w-3" />}
            {statusObj.label}
          </span>
        );
      })}
      {selectedCategory.map((category) => {
        const categoryObj = PropertyCategoryOptions.find(
          (c) => c.value === category
        );
        if (!categoryObj) return null;
        return (
          <span
            key={category}
            className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
          >
            {categoryObj.icon && <categoryObj.icon className="h-4 w-4" />}
            {categoryObj.label}
          </span>
        );
      })}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
      <div className="mb-4 rounded-full bg-gray-100 p-6">
        <SlidersHorizontal className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-700">
        No purchases found
      </h3>
      <p className="mb-4 text-gray-500">
        Try adjusting your filters to see more results
      </p>
      <Button onClick={onClearFilters} variant="outline">
        Clear Filters
      </Button>
    </div>
  );
}

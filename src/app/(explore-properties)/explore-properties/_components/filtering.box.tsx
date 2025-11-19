import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SelectCategory } from "./filtering-box-component/select.category";
import { FunnelX } from "lucide-react";
import { usePropertySearchParams } from "../_hooks/use.property.search.params";

interface FilteringBoxProps {
  onClearFilters?: () => void;
}

export default function FilteringBox({ onClearFilters }: FilteringBoxProps) {
  const { filters } = usePropertySearchParams();

  const hasFilters = filters.category;

  return (
    <section>
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        {/* Select Category */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-gray-800">
            Category
          </Label>
          <SelectCategory />
        </div>

        {/* Clear Filters Button */}
        {hasFilters && onClearFilters && (
          <div className="border-t border-gray-200 pt-4">
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="w-full border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100 hover:text-red-500"
            >
              <FunnelX className="mr-2 h-4 w-4" />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

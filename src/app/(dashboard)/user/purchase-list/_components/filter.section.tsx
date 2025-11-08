import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownNarrowWide } from "lucide-react";
import { PurchaseStatus } from "../_types/purchase.status";
import PurchaseFilters from "./filter-components/purchase.filters";

interface FilterSectionProps {
  selectedStatus: PurchaseStatus[];
  onToggleStatus: (status: PurchaseStatus) => void;
  onClearFilters: () => void;
}

export default function FilterSection({
  selectedStatus,
  onToggleStatus,
  onClearFilters,
}: FilterSectionProps) {
  return (
    <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-3">
        <PurchaseFilters
          selectedStatus={selectedStatus}
          onToggleStatus={onToggleStatus}
          onClearFilters={onClearFilters}
        />

        {selectedStatus.length > 0 && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <X className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      <Select defaultValue="newest">
        <SelectTrigger className="font-semibold text-black">
          <ArrowDownNarrowWide className="mr-2 h-4 w-4 text-black" />
          <h2>Sort By:</h2>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            {/* …other items */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
}

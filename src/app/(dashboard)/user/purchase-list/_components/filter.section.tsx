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
  onSortBy?: (sortBy: string, sortDir?: "asc" | "desc") => void;
  currentSortBy?: string;
  currentSortDir?: "asc" | "desc";
}

export default function FilterSection({
  selectedStatus,
  onToggleStatus,
  onClearFilters,
  onSortBy,
  currentSortBy = "created_at",
  currentSortDir = "desc",
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

      <Select
        value={`${currentSortBy}-${currentSortDir}`}
        onValueChange={(value) => {
          const [sortBy, sortDir] = value.split("-") as [
            string,
            "asc" | "desc",
          ];
          onSortBy?.(sortBy, sortDir);
        }}
      >
        <SelectTrigger className="font-semibold text-black">
          <ArrowDownNarrowWide className="mr-2 h-4 w-4 text-black" />
          <h2>Sort By:</h2>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="created_at-desc">Newest</SelectItem>
            <SelectItem value="created_at-asc">Oldest</SelectItem>
            <SelectItem value="check_in-asc">Check-in (Earliest)</SelectItem>
            <SelectItem value="check_in-desc">Check-in (Latest)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            <SelectItem value="property-asc">Property (A-Z)</SelectItem>
            <SelectItem value="property-desc">Property (Z-A)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
}

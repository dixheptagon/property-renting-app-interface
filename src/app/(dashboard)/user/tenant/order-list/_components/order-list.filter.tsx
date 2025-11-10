"use client";

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
import { OrderStatus } from "../_types/order.status";
import FilterButton, {
  FilterButtonRef,
} from "./filter-components/filter.button";
import { useState, useRef } from "react";
import ActiveFilters from "./filter-components/active.filter";
import { useOrderSearchParams } from "../_utils/search.params";

interface OrderListFiltersProps {
  selectedStatus: OrderStatus[];
  onToggleStatus: (status: OrderStatus) => void;
  onClearFilters: () => void;
  onSortBy?: (sortBy: string, sortDir?: "asc" | "desc") => void;
  currentSortBy?: string;
  currentSortDir?: "asc" | "desc";
}

export default function OrderListFilters({
  selectedStatus,
  onToggleStatus,
  onClearFilters,
  onSortBy,
  currentSortBy = "created_at",
  currentSortDir = "desc",
}: OrderListFiltersProps) {
  const { setCategoryFilter } = useOrderSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const filterButtonRef = useRef<FilterButtonRef>(null);

  return (
    <>
      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <FilterButton
            ref={filterButtonRef}
            selectedStatus={selectedStatus}
            setSelectedStatus={(statuses) => {
              // Status is handled by parent component via props
            }}
            selectedCategory={selectedCategory}
            setSelectedCategory={(categories) => {
              setSelectedCategory(categories);
              setCategoryFilter(categories as any);
            }}
          />

          {(selectedStatus.length > 0 || selectedCategory.length > 0) && (
            <Button
              onClick={() => {
                filterButtonRef.current?.clearAll();
                onClearFilters();
              }}
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
              <SelectItem value="expired_at-asc">Expired (Earliest)</SelectItem>
              <SelectItem value="expired_at-desc">Expired (Latest)</SelectItem>
              <SelectItem value="property-asc">Property (A-Z)</SelectItem>
              <SelectItem value="property-desc">Property (Z-A)</SelectItem>
              <SelectItem value="customer-asc">Customer (A-Z)</SelectItem>
              <SelectItem value="customer-desc">Customer (Z-A)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>

      {/* Filters  Shows when there is at least one filter */}
      <ActiveFilters
        selectedStatus={selectedStatus}
        setSelectedStatus={() => {}}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}

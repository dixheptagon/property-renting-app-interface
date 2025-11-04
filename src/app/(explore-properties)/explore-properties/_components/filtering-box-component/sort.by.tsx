// SortBy Component
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface SortByProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function SortBy({ value, onValueChange }: SortByProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = React.useState<string>(
    value || searchParams.get("sortBy") || "updated_at"
  );

  const handleValueChange = (newValue: string) => {
    setSortBy(newValue);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", newValue);
    router.push(`/explore-properties?${params.toString()}`, { scroll: false });
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Sort by:</span>
      <Select value={sortBy} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updated_at">Newest</SelectItem>
          <SelectItem value="price_asc">Lowest Price</SelectItem>
          <SelectItem value="price_desc">Highest Price</SelectItem>
          <SelectItem value="rating_desc">Rating</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

// LimitShows Component
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePurchaseSearchParams } from "../../_utils/search.params";

interface LimitShowsProps {
  value?: number;
  onValueChange?: (value: number) => void;
}

export function LimitShows({ value, onValueChange }: LimitShowsProps) {
  const { setLimit } = usePurchaseSearchParams();

  const handleValueChange = (newValue: string) => {
    const newLimit = parseInt(newValue);
    onValueChange?.(newLimit);
    setLimit(newLimit);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Show:</span>
      <Select
        value={value?.toString() || "10"}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Show" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-muted-foreground text-sm">purchases</span>
    </div>
  );
}

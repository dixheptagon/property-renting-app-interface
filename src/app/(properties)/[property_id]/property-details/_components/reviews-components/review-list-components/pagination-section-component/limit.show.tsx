"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useReviewSearchParams } from "../../../../_hooks/use.review.search.params";

interface LimitShowsProps {
  currentLimit: number;
}

export function LimitShows({ currentLimit }: LimitShowsProps) {
  const [value, setValue] = React.useState<number | undefined>(currentLimit);

  const { setLimit } = useReviewSearchParams();

  const handleValueChange = (newValue: string) => {
    const newLimit = parseInt(newValue);
    setValue(newLimit);
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
      <span className="text-muted-foreground text-sm">reviews</span>
    </div>
  );
}

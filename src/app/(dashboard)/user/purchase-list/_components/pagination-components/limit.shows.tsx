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
import { useRouter, useSearchParams } from "next/navigation";

interface LimitShowsProps {
  value?: number;
  onValueChange?: (value: number) => void;
}

export function LimitShows({ value, onValueChange }: LimitShowsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [limit, setLimit] = React.useState<number>(
    value || parseInt(searchParams.get("limit") || "12")
  );

  const handleValueChange = (newValue: string) => {
    const newLimit = parseInt(newValue);
    setLimit(newLimit);

    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newValue);
    // Reset page to 1 when limit changes
    params.set("page", "1");

    router.push(`/explore-properties?${params.toString()}`, { scroll: false });
    if (onValueChange) {
      onValueChange(newLimit);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Show:</span>
      <Select value={limit.toString()} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Show" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="24">24</SelectItem>
          <SelectItem value="48">48</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-muted-foreground text-sm">properties</span>
    </div>
  );
}

"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { ArrowDownNarrowWide } from "lucide-react";
import { useReviewSearchParams } from "../../_hooks/use.review.search.params";

export default function FilterBySort() {
  const [sortBy, setSortBy] = React.useState<string>("created_at-desc");
  const { setSort } = useReviewSearchParams();

  const handleValueChange = (newValue: string) => {
    const [sortBy, dir] = newValue.split("-") as [string, "asc" | "desc"];
    const sort_dir = dir === "asc" ? "asc" : "desc";

    setSortBy(newValue);
    setSort(sortBy, sort_dir);
  };

  return (
    <section>
      <Select value={sortBy} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full font-semibold text-black">
          <div className="flex items-center gap-2">
            <ArrowDownNarrowWide className="mr-2 h-4 w-4 text-black" />
            <h2>Sort By:</h2>
          </div>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value={"created_at-desc"}>Newest</SelectItem>
            <SelectItem value="created_at-asc">Oldest</SelectItem>
            <SelectItem value="rating-asc">Rating (Low to High)</SelectItem>
            <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
}

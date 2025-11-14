"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import useDebounce from "../../_hooks/use.debounce";
import { useReviewSearchParams } from "../../_hooks/use.review.search.params";

export default function FilterBySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
  const { setSearch } = useReviewSearchParams();

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <Input
      type="text"
      placeholder="search guest name, property name, or review"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="block w-full border-2 border-gray-200"
    />
  );
}

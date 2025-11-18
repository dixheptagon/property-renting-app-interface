"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useDebounce from "../../../../_hooks/use.debounce";
import { useReviewSearchParams } from "../../../../_hooks/use.review.search.params";

export default function FilterBySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
  const { setSearch, clearSearch } = useReviewSearchParams();

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleClearSearch = () => {
    setSearchTerm("");
    clearSearch();
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="search guest name or review"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full border-2 border-gray-200"
      />
      <Button
        variant={"ghost"}
        className="absolute top-0 right-0 hover:bg-red-100 hover:text-red-500"
        onClick={handleClearSearch}
      >
        <X className="h-4 w-4 stroke-2" />
      </Button>
    </div>
  );
}

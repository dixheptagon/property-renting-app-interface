import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide } from "lucide-react";
import FilterByRating from "./filter-section-components/filter.by.rating";
import FilterBySearch from "./filter-section-components/filter.by.search";
import { FilterByDate } from "./filter-section-components/filter.by.date";
import FilterBySort from "./filter-section-components/filter.by.sort";

export default function FilterSection() {
  return (
    <section className="flex w-full justify-between gap-4">
      <FilterByRating />

      <div className="flex w-full items-center gap-2">
        <FilterBySearch />
      </div>

      <div className="flex gap-4">
        <FilterByDate />
        <FilterBySort />
      </div>
    </section>
  );
}

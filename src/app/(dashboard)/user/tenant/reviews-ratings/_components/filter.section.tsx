"use client";

import FilterByRating from "./filter-section-components/filter.by.rating";
import FilterBySearch from "./filter-section-components/filter.by.search";
import { FilterByDate } from "./filter-section-components/filter.by.date";
import FilterBySort from "./filter-section-components/filter.by.sort";

export default function FilterSection() {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:justify-between">
      <FilterByRating />

      <div className="flex w-full items-center gap-2">
        <FilterBySearch />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <FilterByDate />
        <FilterBySort />
      </div>
    </section>
  );
}

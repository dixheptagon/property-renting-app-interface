"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LandingPageDatePicker } from "./searchbar-component/date.picker";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (location) params.set("location", location);
    if (dateRange?.from)
      params.set("checkin", dateRange.from.toISOString().split("T")[0]);
    if (dateRange?.to)
      params.set("checkout", dateRange.to.toISOString().split("T")[0]);

    if (!location) params.delete("location");
    if (!dateRange?.from) params.delete("checkin");
    if (!dateRange?.to) params.delete("checkout");

    startTransition(() => {
      router.push(`/explore-properties?${params.toString()}`);
    });

    console.log(params.toString());
  };

  return (
    <section className="mx-6 w-full">
      <div className="grid grid-cols-4 items-center gap-2 md:grid-cols-8">
        {/* Input Location and Destination */}
        <div className="col-span-3 md:col-span-5">
          <Input
            type="text"
            placeholder="Search location or destination"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="h-10 w-full bg-white"
          />
        </div>
        {/* Input Date Range */}
        <div className="hidden md:col-span-2 lg:block">
          <LandingPageDatePicker onDateRangeChange={setDateRange} />
        </div>

        {/* Button Search  */}
        <div className="col-span-1 flex md:col-span-1">
          <Button onClick={handleSearch} className="h-10 w-full">
            <Search className="h-4 w-4 stroke-2" />
            <h2 className="hidden lg:block">Search</h2>
          </Button>
        </div>
      </div>
    </section>
  );
}

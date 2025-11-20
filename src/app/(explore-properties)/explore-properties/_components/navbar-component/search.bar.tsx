"use client";

import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LandingPageDatePicker } from "./searchbar-component/date.picker";
import { Search, X } from "lucide-react";

import useDebounce from "../../_hooks/use.debounce";
import { useState, useEffect } from "react";
import { usePropertySearchParams } from "../../_hooks/use.property.search.params";

export default function SearchBar() {
  const { filters, setLocation, clearLocation } = usePropertySearchParams();
  const [localLocation, setLocalLocation] = useState(filters.location || "");
  const debouncedLocation = useDebounce(localLocation, 500);

  useEffect(() => {
    setLocation(debouncedLocation);
  }, [debouncedLocation, setLocation]);

  useEffect(() => {
    setLocalLocation(filters.location || "");
  }, [filters.location]);

  const handleLocationChange = (value: string) => {
    setLocalLocation(value);
  };

  const handleClearLocation = () => {
    setLocalLocation("");
    clearLocation();
  };

  return (
    <section className="mx-6 w-full">
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-8">
        {/* Input Location and Destination */}
        <div className="relative md:col-span-5">
          <Input
            type="text"
            placeholder="Search location or destination"
            value={localLocation}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="h-10 w-full bg-white"
          />
          <Button
            variant={"link"}
            className="absolute top-0.5 right-0.5 text-gray-400 hover:text-red-700"
            onClick={handleClearLocation}
          >
            <X className="h-4 w-4 stroke-3" />
          </Button>
        </div>
        {/* Input Date Range */}
        <div className="md:col-span-3">
          <LandingPageDatePicker />
        </div>
      </div>
    </section>
  );
}

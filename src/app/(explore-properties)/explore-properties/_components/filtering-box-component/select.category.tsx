"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bed, Building, Building2, House, TentTree } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SelectCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = React.useState(
    searchParams.get("category") || ""
  );

  const onValueChange = (value: string) => {
    setCategory(value);

    // Buat copy search params lama biar gak hilang query lain (misal location/date)
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`/explore-properties?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={category} onValueChange={onValueChange}>
      <SelectTrigger className="h-10 w-full border-gray-200 bg-white font-medium text-black transition-all focus:ring-3 focus:ring-gray-500">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Property Type</SelectLabel>
          <SelectItem value="apartment" className="cursor-pointer">
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Apartment
            </div>
          </SelectItem>
          <SelectItem value="hotel" className="cursor-pointer">
            <div className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              Hotel
            </div>
          </SelectItem>
          <SelectItem value="house" className="cursor-pointer">
            <div className="flex items-center">
              <House className="mr-2 h-4 w-4" />
              House
            </div>
          </SelectItem>
          <SelectItem value="room" className="cursor-pointer">
            <div className="flex items-center">
              <Bed className="mr-2 h-4 w-4" />
              Room
            </div>
          </SelectItem>
          <SelectItem value="villa" className="cursor-pointer">
            <div className="flex items-center">
              <TentTree className="mr-2 h-4 w-4" />
              Villa
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

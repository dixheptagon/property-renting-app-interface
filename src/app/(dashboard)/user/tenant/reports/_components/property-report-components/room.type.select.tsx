"use client";

import { useEffect, useState } from "react";
import { Bed } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyReportSearchParams } from "../../_hooks/use.property.report.search.params";

const dummyRoomTypes = [
  { uid: "all", title: "All Room Types" },
  { uid: "standard", title: "Standard Room" },
  { uid: "deluxe", title: "Deluxe Room" },
  { uid: "suite", title: "Suite" },
];

export default function RoomTypeSelect() {
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const { setRoomId } = usePropertyReportSearchParams();

  const handleRoomTypeChange = (roomTypeId: string) => {
    setSelectedRoomType(roomTypeId);
    setRoomId(roomTypeId);
  };

  return (
    <Select value={selectedRoomType} onValueChange={handleRoomTypeChange}>
      <SelectTrigger className="focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-fit items-center justify-between gap-2 rounded-md border-blue-500 bg-blue-600 px-3 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-xs transition-[color,box-shadow] outline-none hover:bg-blue-700 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-white! data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-white">
        <Bed />
        <SelectValue placeholder="Select Room Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Room Types</SelectLabel>
          {dummyRoomTypes.map((roomType) => (
            <SelectItem
              key={roomType.uid}
              value={roomType.uid}
              className="cursor-pointer"
            >
              <div className="flex items-center">{roomType.title}</div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

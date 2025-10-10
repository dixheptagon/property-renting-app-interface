"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface GuestDropdownProps {
  value: number;
  onChange: (value: number) => void;
}

export function GuestDropdown({ value, onChange }: GuestDropdownProps) {
  const [open, setOpen] = useState(false);

  const totalGuests = value;

  const handleDecrement = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleClear = () => {
    onChange(1);
  };

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start p-6 text-left font-normal"
        >
          {totalGuests} Guest{totalGuests !== 1 ? "s" : ""}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Guests</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={value <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{value}</span>
              <Button variant="outline" size="icon" onClick={handleIncrement}>
                +
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

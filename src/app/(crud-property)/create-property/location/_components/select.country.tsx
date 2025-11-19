"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useCountries } from "../../../_hooks/use.countries";

export default function SelectCountry({
  className,
  selectedCountry,
  setSelectedCountry,
}: {
  className?: string;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const { data: countries = [] } = useCountries();

  const selected = countries.find(
    (c: Record<string, string>) => c.name === selectedCountry
  );

  return (
    <div className={`w-full ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between p-6"
          >
            {selected
              ? `${selected.name} (${selected.code})`
              : "Select country"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country: Record<string, string>) => (
                  <CommandItem
                    key={country.code}
                    value={country.name + " (" + country.code + ")"}
                    onSelect={() => {
                      setSelectedCountry(country.name);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountry === country.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.name} ({country.code})
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

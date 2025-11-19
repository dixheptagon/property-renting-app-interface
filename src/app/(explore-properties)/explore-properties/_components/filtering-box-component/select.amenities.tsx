// SelectAmenities Component
"use client";

import * as React from "react";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { propertyAmenities } from "../../_constant/property.amenities";
import { usePropertySearchParams } from "../../_hooks/use.property.search.params";

interface SelectAmenitiesProps {
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export function SelectAmenities({
  value,
  onValueChange,
}: SelectAmenitiesProps) {
  const { filters, setAmenities } = usePropertySearchParams();

  const selectedAmenities = React.useMemo(() => {
    return value || (filters.amenities ? filters.amenities.split(",") : []);
  }, [value, filters.amenities]);

  const options: MultiSelectOption[] = React.useMemo(() => {
    return propertyAmenities.flatMap((category) =>
      category.items.map((item) => ({
        label: item.label,
        value: item.value,
        icon: item.icon,
      }))
    );
  }, []);

  const handleValueChange = (newValue: string[]) => {
    setAmenities(newValue.join(","));
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <MultiSelect
      options={options}
      value={selectedAmenities}
      onValueChange={handleValueChange}
      placeholder="Select amenities"
      className="w-full"
    />
  );
}

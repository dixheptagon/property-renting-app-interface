// SelectAmenities Component
"use client";

import * as React from "react";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { propertyAmenities } from "../../_constant/property.amenities";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectAmenitiesProps {
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export function SelectAmenities({
  value,
  onValueChange,
}: SelectAmenitiesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(
    value || searchParams.get("amenities")?.split(",") || []
  );

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
    setSelectedAmenities(newValue);
    const params = new URLSearchParams(searchParams.toString());
    if (newValue.length > 0) {
      params.set("amenities", newValue.join(","));
    } else {
      params.delete("amenities");
    }
    router.push(`/explore-properties?${params.toString()}`, { scroll: false });
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

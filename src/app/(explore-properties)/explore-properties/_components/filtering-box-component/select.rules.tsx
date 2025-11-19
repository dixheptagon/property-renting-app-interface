// SelectRules Component
"use client";

import * as React from "react";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { propertyRules } from "../../_constant/propety.rules";
import { usePropertySearchParams } from "../../_hooks/use.property.search.params";

export function SelectRules() {
  const { filters, setRules } = usePropertySearchParams();

  const selectedRules = React.useMemo(() => {
    return filters.rules ? filters.rules.split(",") : [];
  }, [filters.rules]);

  const options: MultiSelectOption[] = React.useMemo(() => {
    return propertyRules.flatMap((category) =>
      category.items.map((item) => ({
        label: item.label,
        value: item.value,
        icon: item.icon,
      }))
    );
  }, []);

  const handleValueChange = (newValue: string[]) => {
    setRules(newValue.join(","));
  };

  return (
    <MultiSelect
      options={options}
      value={filters.rules ? filters.rules.split(",") : []}
      onValueChange={handleValueChange}
      placeholder="Select rules"
      className="w-full"
    />
  );
}

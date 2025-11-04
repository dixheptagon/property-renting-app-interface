// SelectRules Component
"use client";

import * as React from "react";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { propertyRules } from "../../_constant/propety.rules";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectRulesProps {
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export function SelectRules({ value, onValueChange }: SelectRulesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedRules, setSelectedRules] = React.useState<string[]>(
    value || searchParams.get("rules")?.split(",") || []
  );

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
    setSelectedRules(newValue);
    const params = new URLSearchParams(searchParams.toString());
    if (newValue.length > 0) {
      params.set("rules", newValue.join(","));
    } else {
      params.delete("rules");
    }
    router.push(`/explore-properties?${params.toString()}`, { scroll: false });
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <MultiSelect
      options={options}
      value={selectedRules}
      onValueChange={handleValueChange}
      placeholder="Select rules"
      className="w-full"
    />
  );
}

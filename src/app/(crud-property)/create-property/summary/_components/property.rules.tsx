"use client";

import React, { useState } from "react";
import { OctagonX } from "lucide-react";
import { propertyRules } from "../_constant/propety.rules";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";

interface PropertyRulesProps {}

export default function PropertyRules({}: PropertyRulesProps) {
  const [showRules, setShowRules] = useState(false);

  const { property } = usePropertyStore();

  // Flatten all rules from the constant
  const allRules = propertyRules.flatMap((category) => category.items);

  // Map selected rules to display objects
  const rulesList: { icon: React.ComponentType<any>; label: string }[] = [];

  // Handle rules array (selected values)
  if (property.rules && Array.isArray(property.rules)) {
    property.rules.forEach((ruleValue: string) => {
      const ruleData = allRules.find((item) => item.value === ruleValue);
      if (ruleData) {
        rulesList.push({
          icon: ruleData.icon,
          label: ruleData.label,
        });
      }
    });
  }

  // Handle custom rules
  if (property.custom_rules && Array.isArray(property.custom_rules)) {
    property.custom_rules.forEach((customRule: string) => {
      rulesList.push({
        icon: OctagonX,
        label: customRule,
      });
    });
  }

  // Show only 6 rules by default
  const displayedRules = showRules ? rulesList : rulesList.slice(0, 6);

  return (
    <div className="" id="rules">
      {/* Rules */}
      <div className="rounded-xl border-2 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Rules</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {displayedRules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <Icon className="h-5 w-5 text-black" />
                <span className="font-medium text-gray-700">{rule.label}</span>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {rulesList.length > 6 && (
          <button
            onClick={() => setShowRules(!showRules)}
            className="mt-4 font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            {showRules ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

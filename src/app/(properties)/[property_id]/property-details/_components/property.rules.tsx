"use client";

import { useState } from "react";
import { propertyRules } from "../_const/propety.rules";

interface PropertyRulesProps {
  rules: string[];
  custom_rules: string[];
}

export default function PropertyRules({
  rules,
  custom_rules,
}: PropertyRulesProps) {
  const [showRules, setShowRules] = useState(false);

  // Flatten all rules from the constant
  const allRules = propertyRules.flatMap((category) => category.items);

  // Map selected rules to display objects
  const rulesList: { icon: React.ComponentType<any>; label: string }[] = [];

  // Handle rules array (selected values)
  if (rules && Array.isArray(rules)) {
    rules.forEach((ruleValue: string) => {
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
  if (custom_rules && Array.isArray(custom_rules)) {
    custom_rules.forEach((customRule: string) => {
      rulesList.push({
        icon: propertyRules[0].items[0].icon, // Using the first icon as a placeholder for custom rules
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
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-all"
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

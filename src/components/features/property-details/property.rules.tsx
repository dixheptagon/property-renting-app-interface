"use client";

import React, { useState } from "react";
import {
  Ban,
  PawPrint,
  Clock,
  Users,
  Music,
  Home,
  OctagonX,
} from "lucide-react";
import { Rules } from "@/types/property";

interface PropertyRulesProps {
  rules: Rules;
}

export default function PropertyRules({ rules }: PropertyRulesProps) {
  const [showRules, setShowRules] = useState(false);

  // Map rules object to array with icons
  const rulesList: { icon: React.ComponentType<any>; label: string }[] = [];
  if (rules.no_smoking) rulesList.push({ icon: Ban, label: "No Smoking" });
  if (rules.no_pets) rulesList.push({ icon: PawPrint, label: "No Pets" });
  if (rules.check_in_after)
    rulesList.push({
      icon: Clock,
      label: `Check-in after ${rules.check_in_after}`,
    });
  if (rules.check_out_before)
    rulesList.push({
      icon: Clock,
      label: `Check-out before ${rules.check_out_before}`,
    });
  if (rules.others)
    rules.others.forEach((other) => {
      rulesList.push({ icon: OctagonX, label: other });
    });

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

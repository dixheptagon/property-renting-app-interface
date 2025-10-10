"use client";

import React, { useState } from "react";
import { Ban, PawPrint, Clock, Users, Music, Home } from "lucide-react";

export default function PropertyRules() {
  const [showRules, setShowRules] = useState(false);

  // Sample data - ganti dengan data dari API lo
  const rules = [
    { icon: Ban, label: "No Smoking" },
    { icon: PawPrint, label: "No Pets" },
    { icon: Clock, label: "Check-in after 3 PM" },
    { icon: Users, label: "Max 4 guests" },
    { icon: Music, label: "No loud music" },
    { icon: Home, label: "No outside guests" },
    { icon: Ban, label: "No Smoking" },
    { icon: PawPrint, label: "No Pets" },
    { icon: Clock, label: "Check-in after 3 PM" },
  ];

  // Show only 6 rules by default
  const displayedRules = showRules ? rules : rules.slice(0, 6);

  return (
    <div className="" id="rules">
      {/* Amenities */}
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
        {rules.length > 6 && (
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

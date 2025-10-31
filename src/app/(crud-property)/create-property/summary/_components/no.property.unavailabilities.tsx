"use client";

import { Ban } from "lucide-react";
import ButtonEditSection from "./button.edit.section";
import { CREATE_PROPERTY_STEPS } from "../_constant/create.property.path";

export default function NoPropertyUnavailabilities() {
  // Get path for editing
  const unavailabilitiesPath =
    CREATE_PROPERTY_STEPS.find((step) => step.label === "Unavailabilities")
      ?.value || "/create-property/unavailabilities";

  return (
    <div className="relative flex min-h-72 w-full items-center justify-center overflow-hidden rounded-lg border border-red-200 bg-red-50 p-4 shadow-md">
      {/* Button Edit Section */}
      <div className="absolute -top-3 -right-3">
        <ButtonEditSection
          path={unavailabilitiesPath}
          label="Property Unavailabilities"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200 blur-2xl"></div>
      <div className="absolute right-0 bottom-0 h-32 w-32 translate-x-1/2 translate-y-1/2 rounded-full bg-red-200 blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-400 to-red-700 shadow-lg">
          <Ban className="h-7 w-7 text-white" strokeWidth={2} />
        </div>

        <div className="space-y-1">
          <h2 className="bg-red-500 bg-clip-text text-xl font-bold text-transparent">
            No Unavailabilities
          </h2>
          <p className="text-sm text-gray-600">
            All rooms are currently available for booking
          </p>
        </div>
      </div>
    </div>
  );
}

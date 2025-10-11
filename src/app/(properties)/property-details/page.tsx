import React from "react";
import {
  PropertyAmenities,
  PropertyImageGrid,
  PropertyLocation,
  PropertyProfile,
  PropertyRoomTypes,
  PropertyReviews,
  PropertyRules,
  PropertySummary,
} from "@/components/features/property-details/index";

export default function PropertyDetails() {
  return (
    <div className="mx-auto mt-20 mb-10 min-h-full max-w-7xl">
      <div>
        <PropertyImageGrid />
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="w-2/3 space-y-8">
          <PropertyProfile />

          <PropertyAmenities />
          <PropertyRules />

          <PropertyRoomTypes />
        </div>

        <div className="w-1/3 self-start lg:sticky lg:top-18">
          <PropertySummary />
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <PropertyLocation />
        <PropertyReviews />
      </div>
    </div>
  );
}

import React from "react";
import PropertyImageGrid from "./_components/property.image.grid";
import PropertyProfile from "./_components/property.profile";
import PropertyAmenities from "./_components/property.amenities";
import PropertyRules from "./_components/property.rules";
import PropertyRoomTypes from "./_components/property.room.types";
import PropertyLocation from "./_components/property.location";
import PropertyReviews from "./_components/property.reviews";
import PropertySummary from "./_components/property.summary";

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

"use client";

import React, { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { propertyAmenities } from "../_const/property.amenities";
import { Amenities } from "@/app/(properties)/property-details/_types/property";

interface PropertyAmenitiesProps {
  amenities: Amenities;
  custom_amenities: string[];
}

export default function PropertyAmenities({
  amenities,
  custom_amenities,
}: PropertyAmenitiesProps) {
  const [showAmenities, setShowAmenities] = useState(false);

  // Flatten all amenities from the constant
  const allAmenities = propertyAmenities.flatMap((category) => category.items);

  // Map selected amenities to display objects
  const amenitiesList: { icon: React.ComponentType<any>; label: string }[] = [];

  // Handle amenities array (selected values)
  if (amenities && Array.isArray(amenities)) {
    amenities.forEach((amenityValue: string) => {
      const amenityData = allAmenities.find(
        (item) => item.value === amenityValue
      );
      if (amenityData) {
        amenitiesList.push({
          icon: amenityData.icon,
          label: amenityData.label,
        });
      }
    });
  }

  // Handle custom amenities
  if (custom_amenities && Array.isArray(custom_amenities)) {
    custom_amenities.forEach((customAmenity: string) => {
      amenitiesList.push({
        icon: BadgeCheck,
        label: customAmenity,
      });
    });
  }

  // Show only 6 amenities by default
  const displayedAmenities = showAmenities
    ? amenitiesList
    : amenitiesList.slice(0, 6);

  return (
    <div id="amenities">
      {/* Amenities */}
      <div className="rounded-xl border-2 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Amenities</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {displayedAmenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-all"
              >
                <Icon className="h-5 w-5 text-black" />
                <span className="font-medium text-gray-700">
                  {amenity.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {amenitiesList.length > 6 && (
          <button
            onClick={() => setShowAmenities(!showAmenities)}
            className="mt-4 font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            {showAmenities ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

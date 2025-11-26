"use client";

import React, { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { propertyAmenities } from "../_constant/property.amenities";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import ButtonEditSection from "./button.edit.section";
import { CREATE_PROPERTY_STEPS } from "../_constant/create.property.path";

interface PropertyAmenitiesProps {}

export default function PropertyAmenities({}: PropertyAmenitiesProps) {
  const [showAmenities, setShowAmenities] = useState(false);

  const { property } = usePropertyStore();

  // Flatten all amenities from the constant
  const allAmenities = propertyAmenities.flatMap((category) => category.items);

  // Map selected amenities to display objects
  const amenitiesList: { icon: React.ComponentType<any>; label: string }[] = [];

  // Handle amenities array (selected values)
  if (property.amenities && Array.isArray(property.amenities)) {
    property.amenities.forEach((amenityValue: string) => {
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
  if (property.custom_amenities && Array.isArray(property.custom_amenities)) {
    property.custom_amenities.forEach((customAmenity: string) => {
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

  // Get path for editing
  const amenitiesPath =
    CREATE_PROPERTY_STEPS.find((step) => step.label === "Amenities")?.value ||
    "/create-property/amenities";

  return (
    <div id="amenities">
      {/* Amenities */}
      <div className="relative rounded-xl border-2 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Amenities</h2>

          {/* Button Edit Section */}
          <div className="absolute -top-3 -right-3">
            <ButtonEditSection
              path={amenitiesPath}
              label="Property Amenities"
            />
          </div>
        </div>

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

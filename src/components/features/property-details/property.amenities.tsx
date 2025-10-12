"use client";

import React, { useState } from "react";
import {
  Wifi,
  Tv,
  Wind,
  Car,
  UtensilsCrossed,
  Waves,
  BadgeCheck,
} from "lucide-react";
import { Amenities } from "@/types/property";

interface PropertyAmenitiesProps {
  amenities: Amenities;
}

export default function PropertyAmenities({
  amenities,
}: PropertyAmenitiesProps) {
  const [showAmenities, setShowAmenities] = useState(false);

  // Map amenities object to array with icons
  const amenitiesList: { icon: React.ComponentType<any>; label: string }[] = [];
  if (amenities.wifi) amenitiesList.push({ icon: Wifi, label: "Free WiFi" });
  if (amenities.air_conditioning)
    amenitiesList.push({ icon: Wind, label: "Air Conditioning" });
  if (amenities.parking)
    amenitiesList.push({ icon: Car, label: "Free Parking" });
  if (amenities.kitchen)
    amenitiesList.push({ icon: UtensilsCrossed, label: "Kitchen" });
  if (amenities.pool)
    amenitiesList.push({ icon: Waves, label: "Swimming Pool" });
  if (amenities.gym) amenitiesList.push({ icon: Tv, label: "Gym" });
  if (amenities.laundry) amenitiesList.push({ icon: Tv, label: "Laundry" });
  if (amenities.pet_friendly)
    amenitiesList.push({ icon: Tv, label: "Pet Friendly" });
  if (amenities.others) {
    amenities.others.forEach((other) => {
      amenitiesList.push({ icon: BadgeCheck, label: other });
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
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:bg-blue-50"
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

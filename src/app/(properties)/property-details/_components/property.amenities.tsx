'use client';

import React, { useState } from 'react';
import { Wifi, Tv, Wind, Car, UtensilsCrossed, Waves } from 'lucide-react';

export default function PropertyAmenities() {
  const [showAmenities, setShowAmenities] = useState(false);

  // Sample data - ganti dengan data dari API lo
  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Tv, label: 'Smart TV' },
    { icon: Wind, label: 'Air Conditioning' },
    { icon: Car, label: 'Free Parking' },
    { icon: UtensilsCrossed, label: 'Kitchen' },
    { icon: Waves, label: 'Swimming Pool' },
    { icon: Car, label: 'Free Parking' },
    { icon: UtensilsCrossed, label: 'Kitchen' },
    { icon: Waves, label: 'Swimming Pool' },
  ];

  // Show only 6 amenities by default
  const displayedAmenities = showAmenities ? amenities : amenities.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Amenities */}
      <div className="rounded-xl bg-white p-6 shadow-md">
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
        {amenities.length > 6 && (
          <button
            onClick={() => setShowAmenities(!showAmenities)}
            className="mt-4 font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            {showAmenities ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}

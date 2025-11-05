"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PropertyAmenities,
  PropertyImageGrid,
  PropertyLocation,
  PropertyProfile,
  PropertyRoomTypes,
  PropertyReviews,
  PropertyRules,
  PropertySummary,
} from "@/app/(properties)/property-details/_components/index";
import { Property } from "@/app/(properties)/property-details/_types/property";
import axios from "axios";
import { useBookingStore } from "@/app/(properties)/_stores/booking.store";
import { useParams } from "next/navigation";

export default function PropertyDetails() {
  const params = useParams();
  console.log(params);
  const id = params.property_id; // <--- ambil ID dari URL

  // set Global State Propety Being Chosen
  const { setProperty } = useBookingStore();

  const {
    data: property,
    isLoading,
    error,
  } = useQuery<Property>({
    queryKey: ["property", 1],
    queryFn: async () => {
      const response = await axios.get<Property>(`/api/properties/${1}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto mt-20 mb-10 min-h-full max-w-7xl">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-20 mb-10 min-h-full max-w-7xl">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="mb-4 text-red-600">Failed to load property details</p>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="mx-auto mt-20 mb-10 min-h-full max-w-7xl">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-600">Property not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-25 mb-10 min-h-full max-w-7xl">
      <div>
        <PropertyImageGrid images={property.images} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-2 space-y-8">
          <PropertyProfile
            title={property.title}
            rating={property.rating_avg}
            description={property.description}
            host={property.tenant}
            category={property.category}
            reviews={property.rating_count}
            address={`${property.address}, ${property.city}, ${property.country} ${property.postal_code}`}
            image={property.tenant.image}
          />

          <PropertyAmenities amenities={property.amenities} />
          <PropertyRules rules={property.rules} />

          <PropertyRoomTypes rooms={property.rooms} />
        </div>

        <div className="col-span-1 self-start lg:sticky lg:top-20">
          <PropertySummary
            room_unavailabilities={property.room_unavailabilities}
            peak_season_price={property.peak_season_rates}
          />
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <PropertyLocation
          address={property.address}
          city={property.city}
          country={property.country}
          postal_code={property.postal_code}
          latitude={property.latitude}
          longitude={property.longitude}
          map_url={property.map_url}
        />
        <PropertyReviews propertyId={property.id} />
      </div>
    </div>
  );
}

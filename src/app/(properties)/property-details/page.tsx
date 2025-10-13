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
} from "@/components/features/property-details/index";
import { Property } from "@/types/property";
import axios from "axios";
import { useBookingStore } from "@/stores/booking.store";

interface PropertyDetailsPageProps {
  params: {
    id: string;
  };
}

export default function PropertyDetails({ params }: PropertyDetailsPageProps) {
  const { id } = params;

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

  useEffect(() => {
    if (property) {
      setProperty(property);
    }
  }, [property]);

  console.log("property", property);

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
    <div className="mx-auto mt-20 mb-10 min-h-full max-w-7xl">
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

        <div className="col-span-1 self-start lg:sticky lg:top-18">
          <PropertySummary
            rooms={property.rooms}
            room_unavailabilities={property.room_unavailabilities}
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

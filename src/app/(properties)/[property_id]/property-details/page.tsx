"use client";

import { useBookingStore } from "@/app/(properties)/_stores/booking.store";
import {
  PropertyAmenities,
  PropertyImageGrid,
  PropertyLocation,
  PropertyProfile,
  PropertyReviews,
  PropertyRoomTypes,
  PropertyRules,
  PropertySummary,
} from "./_components";
import { usePropertyDetail } from "./_hooks/use.property.detail";
import { formatDate } from "./_utils/format.date";
import LoadingData from "@/components/ui/loading.data";
import { useEffect } from "react";

export default function PropertyDetails() {
  // set Global State Propety Being Chosen
  const { setProperty } = useBookingStore();

  const { data, isLoading, isError, error, refetch, isFetching } =
    usePropertyDetail();

  const property = data?.data;

  console.log("Property Details Data:", property);

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
            <LoadingData message="Loading property details..." />
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
        <PropertyImageGrid
          images={property.images.map((img) => ({
            ...img,
            id: 0,
            created_at: "",
          }))}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-2 space-y-8">
          <PropertyProfile
            title={property.title}
            rating={property.rating_avg ?? 0}
            description={property.description}
            host={{ ...property.tenant, display_name: property.tenant.name }}
            category={property.category}
            reviews={property.rating_count ?? 0}
            address={`${property.address}, ${property.city}, ${property.country} ${property.postal_code}`}
            image={property.tenant.image}
          />

          <PropertyAmenities
            amenities={property.amenities}
            custom_amenities={property.custom_amenities}
          />
          <PropertyRules
            rules={property.rules}
            custom_rules={property.custom_rules}
          />

          <PropertyRoomTypes
            rooms={property.rooms.map((room) => ({
              ...room,
              id: room.id,
              property_id: room.property_id,
              created_at: "",
              highlight: room.highlight || {},
              images: room.images.map((img) => ({
                ...img,
                id: img.id,
                created_at: "",
              })),
            }))}
          />
        </div>

        <div className="col-span-1 self-start lg:sticky lg:top-20">
          <PropertySummary
            room_unavailabilities={property.room_unavailabilities.map(
              (unavail) => ({
                ...unavail,
                property_id: 0,
                booking_id: null,
                created_at: "",
                start_date: formatDate(unavail.start_date),
                end_date: formatDate(unavail.end_date),
                reason: unavail.reason || "",
              })
            )}
            peak_season_price={property.peak_season_rates.map((rate) => ({
              ...rate,
              property_id: 0,
              created_at: "",
              start_date: formatDate(rate.start_date),
              end_date: formatDate(rate.end_date),
              adjustment_type: rate.adjustment_type as "percentage" | "nominal",
            }))}
          />
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <PropertyLocation
          address={property.address}
          city={property.city}
          country={property.country}
          postal_code={property.postal_code}
          latitude={property.latitude ?? 0}
          longitude={property.longitude ?? 0}
          map_url={property.map_url ?? ""}
        />
        <PropertyReviews propertyId={property.id} />
      </div>
    </div>
  );
}

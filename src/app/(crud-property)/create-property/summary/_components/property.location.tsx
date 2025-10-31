"use client";

import { MapPin } from "lucide-react";
import MapEmbed from "@/components/ui/maps.embed";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { useIsMobile } from "@/hooks/use-mobile";

interface PropertyLocationProps {}

export default function PropertyLocation({}: PropertyLocationProps) {
  const { property } = usePropertyStore();
  const isMobile = useIsMobile();

  // Full address string
  const fullAddress = `${property.address}, ${property.city}, ${property.country} ${property.postal_code}`;

  return (
    <div className="" id="location">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Location</h2>

        {/* Address Info */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="mb-1 text-sm text-gray-500">Address</p>
              <p className="leading-relaxed font-medium text-gray-900">
                {fullAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-200">
          <div
            className={`relative w-full bg-gray-100 ${isMobile ? "h-72" : "h-96"}`}
          >
            {property.map_url ? (
              <MapEmbed src={property.map_url} width="100%" height="100%" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 h-10 w-10 text-gray-400" />
                  <p className="text-sm font-semibold text-gray-600">
                    No Map Available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import MapEmbed from "@/components/ui/maps.embed";
import { Property } from "@/app/(properties)/property-details/_types/property";

export default function PropertyLocation({
  address = "Jl. Sudirman No. 123",
  city = "Jakarta Selatan",
  country = "Indonesia",
  postal_code: postalCode = "12190",
  latitude = -8.70492838459429,
  longitude = 115.18387623594676,
  map_url,
}: Pick<
  Property,
  | "address"
  | "city"
  | "country"
  | "postal_code"
  | "latitude"
  | "longitude"
  | "map_url"
>) {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Full address string
  const fullAddress = `${address}, ${city}, ${country} ${postalCode}`;

  // Google Maps embed URL
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}&zoom=15`;

  // Google Maps direct link
  const mapsDirectLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  // Directions link
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

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
          <div className="relative h-96 w-full bg-gray-100">
            {/* Placeholder sementara - ganti dengan iframe Google Maps yang real */}
            {map_url ? (
              <MapEmbed src={map_url} width="100%" height="100%" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
                <div className="text-center">
                  <MapPin className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                  <p className="mb-2 text-lg font-semibold text-gray-700">
                    Google Maps
                  </p>
                  <p className="mb-4 text-sm text-gray-500">
                    Map will load here with your API key
                  </p>
                  <a
                    href={mapsDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          <a
            href={mapsDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-900 px-6 py-3 font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
            View on Google Maps
          </a>

          <a
            href={directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700"
          >
            <Navigation className="h-5 w-5" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}

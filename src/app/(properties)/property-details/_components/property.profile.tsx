"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PropertyProfile() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);

  // Sample data - ganti dengan data dari API lo
  const property = {
    title: "Luxury Apartment with Ocean View",
    category: "Apartment",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta Selatan",
    country: "Indonesia",
    postalCode: "12190",
    description:
      "Experience luxury living in this stunning apartment featuring breathtaking ocean views. This modern space offers a perfect blend of comfort and style, with floor-to-ceiling windows that flood the rooms with natural light. The apartment is fully furnished with high-end amenities and designer furniture. Located in the heart of the city, you'll have easy access to shopping centers, restaurants, and entertainment venues. Perfect for both short and long-term stays. The space includes a fully equipped kitchen, spacious living area, comfortable bedroom, and a modern bathroom. Enjoy sunset views from your private balcony while sipping your favorite beverage.",
    host: {
      name: "John Doe",
      contact: "+62 812 3456 7890",
    },
    rating: 4.8,
    reviews: 127,
  };

  const completeAddress = `${property.address}, ${property.city}, ${property.country} ${property.postalCode}`;

  const truncateTitle = (text: string, maxLength = 35) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const truncateAddress = (text: string, maxLength = 85) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const truncateDescription = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="space-y-8" id="profile">
      {/* Title and Rating Section */}
      <div className="rounded-xl border-2 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              {/* Tooltip Title */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {truncateTitle(property.title)}
                  </h1>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{property.title}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            {/* Tooltip Address */}
            <p className="leading-relaxed text-gray-700">
              {showFullAddress
                ? completeAddress
                : truncateAddress(completeAddress)}
            </p>
            {completeAddress.length > 85 && (
              <button
                onClick={() => setShowFullAddress(!showFullAddress)}
                className="mt-3 font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                {showFullAddress ? "Show less" : "Show detail"}
              </button>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2 md:flex-row">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <span className="font-semibold text-gray-900">
                  {property.rating}
                </span>
              </div>
              <span className="text-gray-600">
                ({property.reviews} reviews)
              </span>
            </div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {property.category}
            </span>
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-3 border-t pt-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-semibold text-white">
            {property.host.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{property.host.name}</p>
            <p className="text-sm text-gray-600">{property.host.contact}</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="rounded-xl border-2 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Description</h2>
        <p className="leading-relaxed text-gray-700">
          {showFullDescription
            ? property.description
            : truncateDescription(property.description)}
        </p>
        {property.description.length > 200 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-3 font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

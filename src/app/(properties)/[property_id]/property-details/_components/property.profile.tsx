"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { PropertyProfileProps } from "../_types/property.profile";
import {
  truncateAddress,
  truncateDescription,
  truncateTitle,
} from "../_utils/truncate.data";

export default function PropertyProfile({
  title,
  rating,
  description,
  host,
  category,
  reviews,
  address,
  image,
}: PropertyProfileProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);

  const completeAddress = address;

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
                    {truncateTitle(title)}
                  </h1>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{title}</p>
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

          {/* Property Category*/}
          <div className="flex flex-col items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {category}
            </span>
          </div>
        </div>

        {/* Host Info */}
        <div className="flex justify-between border-t pt-4">
          <div className="flex items-center gap-3">
            {/* Tenant Image */}
            {image ? (
              <Image
                src={image}
                alt={host.display_name}
                className="h-12 w-12 rounded-full"
                width={48}
                height={48}
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-semibold text-white">
                {host.display_name.charAt(0)}
              </div>
            )}

            <div>
              <p className="font-medium text-gray-900">{host.display_name}</p>
              <p className="text-sm text-gray-600">Host</p>
            </div>
          </div>

          {/* Rating Average */}

          <div className="flex flex-col items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2 md:flex-row">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-current text-yellow-500" />
              <span className="font-semibold text-gray-900">{rating}</span>
            </div>
            <span className="text-gray-600">({reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="rounded-xl border-2 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Description</h2>
        <p className="leading-relaxed text-gray-700">
          {showFullDescription ? description : truncateDescription(description)}
        </p>
        {description.length > 200 && (
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

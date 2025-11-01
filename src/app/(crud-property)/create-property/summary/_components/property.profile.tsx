"use client";

import React, { useState } from "react";
import { Star, ImageOff, Building } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { PROPERTY_CATEGORIES } from "../_constant/property.category";
import ButtonEditSection from "./button.edit.section";
import { CREATE_PROPERTY_STEPS } from "../_constant/create.property.path";

interface PropertyProfileProps {}

export default function PropertyProfile({}: PropertyProfileProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);

  const { property } = usePropertyStore();
  const { first_name, last_name } = useAuthStore();

  console.log(property);

  const title = property.title;
  const description = property.description;
  const category = property.category || "";
  const address = `${property.address}, ${property.city}, ${property.country} ${property.postal_code}`;
  const fullName = `${first_name} ${last_name}`.trim();

  // Get category data
  const categoryData = PROPERTY_CATEGORIES.find(
    (cat) => cat.value === category
  );
  const CategoryIcon = categoryData?.icon || Building;
  const categoryLabel = categoryData?.label || category;

  const completeAddress = address;

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

  // Get paths for editing
  const titleDescriptionPath =
    CREATE_PROPERTY_STEPS.find((step) => step.label === "Title & Description")
      ?.value || "/create-property/title-description";

  const categoryPath =
    CREATE_PROPERTY_STEPS.find((step) => step.label === "Select Category")
      ?.value || "/create-property/select-category";

  return (
    <div className="space-y-8" id="profile">
      {/* Title and Rating Section */}
      <div className="relative rounded-xl border-2 bg-white p-6 shadow-md">
        {/* Button Edit Section */}
        <div className="absolute -top-3 -right-3">
          <ButtonEditSection
            path={categoryPath}
            label="Property Category"
            className="ml-2"
          />
        </div>

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

          {/* Category */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 capitalize">
                <CategoryIcon className="h-4 w-4" />
                {categoryLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-3">
            {/* Tenant Image */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-800 text-lg font-semibold text-white">
              <ImageOff className="h-6 w-6" />
            </div>

            <div>
              <p className="font-medium text-gray-900">{fullName}</p>
              <p className="text-sm text-gray-600">Host</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="relative rounded-xl border-2 bg-white p-6 shadow-md">
        {/* Button Edit Section */}
        <div className="absolute -top-3 -right-3">
          <ButtonEditSection
            path={titleDescriptionPath}
            label="Title & Description"
          />
        </div>

        <h2 className="mb-4 text-xl font-bold text-gray-900">Description</h2>
        <p className="leading-relaxed whitespace-pre-line text-gray-700">
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

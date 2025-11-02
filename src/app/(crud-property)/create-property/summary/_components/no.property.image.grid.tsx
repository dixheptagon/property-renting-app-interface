"use client";

import { ImageOff } from "lucide-react";
import { CREATE_PROPERTY_STEPS } from "../_constant/create.property.path";
import ButtonEditSection from "./button.edit.section";

export default function NoPropertyImages() {
  // Get path for editing
  const imagesPath =
    CREATE_PROPERTY_STEPS.find((step) => step.label === "Images")?.value ||
    "/create-property/images";

  return (
    <div className="relative mx-auto flex min-h-96 max-w-7xl items-center justify-center overflow-hidden rounded-lg border border-red-200 bg-red-50 p-4 shadow-xl">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200 blur-3xl"></div>
      <div className="oblur-3xl absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-red-200 blur-3xl"></div>

      {/* Button Edit Section */}
      <div className="absolute top-3 right-3 z-10">
        <ButtonEditSection path={imagesPath} label="Property Images" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-4 text-center">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-700 shadow-lg">
          <ImageOff className="h-12 w-12 text-white" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h2 className="bg-red-500 bg-clip-text text-3xl font-bold text-transparent">
            No Property Images
          </h2>
          <p className="mx-auto max-w-md text-lg text-gray-600">
            Images for this property are currently unavailable
          </p>
        </div>

        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="h-2 w-2 rounded-full bg-red-600"></div>
          <div className="h-2 w-2 rounded-full bg-red-600"></div>
          <div className="h-2 w-2 rounded-full bg-red-600"></div>
        </div>
      </div>
    </div>
  );
}

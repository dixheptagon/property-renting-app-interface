import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapPin, Edit3, ImageOff, FileText } from "lucide-react";
import { getCategoryIcon } from "./get.category.icon";
import Link from "next/link";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";

export default function IsDraftAccomodationCard() {
  const { property, propertyImages, rooms } = usePropertyStore();

  const mainImage = propertyImages.length > 0 ? propertyImages[0] : null;

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden sm:h-42">
          {mainImage ? (
            <Image
              src={mainImage.secureUrl}
              alt={property.title || "Draft Property"}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gray-300">
              <ImageOff className="h-12 w-12 text-gray-500" />
              <span className="text-gray-500">No image</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
              <FileText className="mr-1.5 h-3 w-3" />
              Draft
            </span>
          </div>

          {/* Category Badge */}
          {property.category && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
              {getCategoryIcon(property.category)}
              <span>{property.category}</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="space-y-4 p-5">
          {/* Title */}
          <div className="space-y-1">
            <h3 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
              {property.title || "Untitled Property"}
            </h3>

            {/* Location */}
            {(property.city || property.country) && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-1.5 h-4 w-4 text-blue-500" />
                <span className="line-clamp-1">
                  {property.city && property.country
                    ? `${property.city}, ${property.country}`
                    : property.city || property.country || "Location not set"}
                </span>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{propertyImages.length} images</span>
              <span>{rooms.length} rooms</span>
            </div>
          </div>

          {/* Continue Editing Button */}
          <Link href="/create-property/summary">
            <Button className="group/btn h-12 w-full rounded-xl bg-linear-to-r from-blue-600 to-blue-700 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg">
              <Edit3 className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
              Continue Editing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

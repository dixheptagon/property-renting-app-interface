import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, MapPin, Edit3, ImageOff } from "lucide-react";
import { Property } from "../_hooks/use.property.list";
import { getCategoryIcon } from "./get.category.icon";

interface AccomodationCardProps {
  property: Property;
}

export default function AccomodationCard({ property }: AccomodationCardProps) {
  console.log(property);

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden sm:h-42">
          {property.main_image ? (
            <Image
              src={
                property.main_image ||
                "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765"
              }
              alt={property.title}
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
            <span className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-white" />
              {property.status}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
            {getCategoryIcon(property.category)}
            <span>{property.category}</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="space-y-4 p-5">
          {/* Title */}
          <div className="space-y-1">
            <h3 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
              {property.title}
            </h3>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-1.5 h-4 w-4 text-blue-500" />
              <span className="line-clamp-1">
                {property.location.city}, {property.location.country}
              </span>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-linear-to-br from-yellow-400 to-orange-400 px-2.5 py-1.5 shadow-md">
                <Star className="h-4 w-4 fill-white text-white" />
                <span className="text-sm font-bold text-white">
                  {property.review_summary.average_rating || "N/A"}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                ({property.review_summary.review_count} reviews)
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            disabled
            className="group/btn h-12 w-full rounded-xl bg-linear-to-r from-blue-600 to-blue-700 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
          >
            <Edit3 className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
            Edit Property
          </Button>
        </div>
      </div>
    </div>
  );
}

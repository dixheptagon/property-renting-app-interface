"use client";

import {
  Bed,
  Building,
  Building2,
  Heart,
  House,
  MapPin,
  Star,
  TentTree,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "../_types";
import { formatPrice } from "../_utils/format.price";

const getCategoryIcon = (category: string) => {
  const iconClass = "h-4 w-4";
  switch (category.toLowerCase()) {
    case "house":
      return <House className={iconClass} />;
    case "apartment":
      return <Building className={iconClass} />;
    case "hotel":
      return <Building2 className={iconClass} />;
    case "room":
      return <Bed className={iconClass} />;
    case "villa":
      return <TentTree className={iconClass} />;
    default:
      return <House className={iconClass} />;
  }
};

export const PropertyCard = ({ property }: { property: Property }) => {
  console.log(property);

  return (
    <Link href={`/${property.uid}/property-details`}>
      <article className="group relative overflow-hidden transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden rounded-2xl sm:h-42">
          {property.images && property.images.length > 0 ? (
            <Image
              src={property.images[0].url}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-300">
              <span className="text-gray-500">No image</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
            {getCategoryIcon(property.category)}
            <span>{property.category}</span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1.5 text-xs font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105">
            <Star className="h-3.5 w-3.5 fill-white" />
            <span>{property.rating_avg || "N/A"}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Location */}
          <div className="mb-2 flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{`${property.city}, ${property.country}`}</span>
          </div>

          {/* Property Name */}
          <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-xl">
            {property.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-end justify-between border-t border-gray-100 pt-3">
            <div>
              <p className="text-xs text-gray-500">Start from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(Number(property.base_price))}
                </span>
                <span className="text-sm text-gray-500">/night</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

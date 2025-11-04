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
import { useState } from "react";
import Image from "next/image";
import { Property } from "../../_dummy-data/properties";
import { formatPrice } from "../../_utils/format.price";

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
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl">
      {/* Image Container */}
      <div className="relative h-58 overflow-hidden sm:h-42">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

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
          <span>{property.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Location */}
        <div className="mb-2 flex items-center gap-1.5 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="font-medium">{property.location}</span>
        </div>

        {/* Property Name */}
        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-xl">
          {property.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <div>
            <p className="text-xs text-gray-500">Start from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(property.price)}
              </span>
              <span className="text-sm text-gray-500">/night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-blue-500/50" />
    </article>
  );
};

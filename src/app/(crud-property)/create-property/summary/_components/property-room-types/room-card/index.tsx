"use client";

import React, { useState } from "react";
import { Users, Bed, Bath, Maximize2, Eye, CheckCheck } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { RoomData } from "@/app/(crud-property)/_types/property.type";
import { SpecItem } from "./spec.item";
import { roomHighlights } from "@/app/(crud-property)/create-property/manage-rooms/_constant/room.higlights";
import { formatPrice } from "@/app/(landing-page)/_utils/format.price";
import Image from "next/image";

interface RoomCardProps {
  room: RoomData;
  onViewImages: (room: RoomData) => void;
}

/**
 * Individual room card component displaying room details, specs, and edit button.
 */
export const RoomCard: React.FC<RoomCardProps> = ({ room, onViewImages }) => {
  // State for show full description
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateDescription = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Create a flat map of all highlight items for easy lookup
  const highlightMap = React.useMemo(() => {
    const map = new Map<
      string,
      { icon: React.ComponentType<any>; label: string }
    >();
    roomHighlights.forEach((category) => {
      category.items.forEach((item) => {
        map.set(item.value, { icon: item.icon, label: item.label });
      });
    });
    return map;
  }, []);

  // Combine and process highlights from both arrays
  const allHighlights = React.useMemo(() => {
    const combined = [...room.highlight, ...room.custom_highlight];
    return combined.map((highlight) => {
      const mapped = highlightMap.get(highlight);
      return mapped
        ? {
            value: highlight,
            icon: mapped.icon,
            label: mapped.label,
            isCustom: false,
          }
        : {
            value: highlight,
            icon: CheckCheck,
            label: highlight,
            isCustom: true,
          };
    });
  }, [room.highlight, room.custom_highlight, highlightMap]);

  // Process highlights to separate visible ones from additional ones for popover display
  const visibleHighlights = allHighlights.slice(0, 4);
  const otherHighlights = allHighlights.slice(4);

  /**
   * Renders the room highlights section with visible highlights and a popover for additional ones.
   */
  const renderHighlights = () => (
    <div className="">
      <div className="flex flex-wrap gap-2">
        {visibleHighlights.map((highlight, index) => {
          const IconComponent = highlight.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                highlight.isCustom
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              <span className="font-medium">{highlight.label}</span>
            </div>
          );
        })}
        {otherHighlights.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm transition-colors hover:bg-gray-200">
                <span>+{otherHighlights.length} more</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-md font-semibold">Other Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  {otherHighlights.map((highlight, index) => {
                    const IconComponent = highlight.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                          highlight.isCustom
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span className="font-medium">{highlight.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md transition-all duration-300 hover:border-blue-300 hover:shadow-md">
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {/* Room Details Section */}
        <div className="space-y-4 lg:col-span-2">
          {/* Room Header */}
          <div className="relative flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  {room.name}
                </h3>
              </div>
              <p className="leading-relaxed whitespace-pre-line text-gray-600">
                {showFullDescription
                  ? room.description
                  : truncateDescription(room.description)}
              </p>
              {room.description.length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </div>

          {/* Room Specifications */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 md:grid-cols-4">
            <SpecItem
              icon={<Users className="h-5 w-5 text-blue-600" />}
              label="Guest"
              value={room.max_guest}
            />
            <SpecItem
              icon={<Maximize2 className="h-5 w-5 text-purple-600" />}
              label="Bedroom"
              value={room.bedrooms}
            />
            <SpecItem
              icon={<Bed className="h-5 w-5 text-pink-600" />}
              label="Bed"
              value={room.beds}
            />
            <SpecItem
              icon={<Bath className="h-5 w-5 text-cyan-600" />}
              label="Bathroom"
              value={room.bathrooms}
            />
          </div>

          {/* Room Highlights */}
          {renderHighlights()}
        </div>

        {/* Room Images and Selection Section */}
        <div className="flex flex-col gap-2 lg:col-span-1">
          <div
            className="group relative h-48 cursor-pointer overflow-hidden rounded-lg lg:h-48"
            onClick={() => onViewImages(room)}
          >
            {room.images.length > 0 && (
              <Image
                width={1080}
                height={1920}
                src={
                  room.images.find((img) => img.isMain)?.secureUrl ||
                  room.images[0]?.secureUrl
                }
                alt={room.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
            {/* Overlay that appears on hover to indicate image viewing capability */}
            <div className="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center object-cover transition-all duration-300">
              <div className="text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Eye className="mx-auto mb-2 h-8 w-8" />
                <p className="font-semibold">
                  View {room.images.length} Photos
                </p>
              </div>
            </div>
            {room.images.length > 1 && (
              <div className="bg-opacity-70 absolute top-3 right-3 rounded-full bg-black px-3 py-1 text-sm font-medium text-white">
                +{room.images.length - 1} photos
              </div>
            )}
          </div>

          {/* Room Price */}
          <section className="rounded-lg bg-blue-600 p-3 shadow-lg">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium tracking-wider text-emerald-50 uppercase">
                Start from
              </span>
              <span className="text-lg font-semibold text-white">
                {formatPrice(Number(room.base_price))}
                <sub className="self-end text-xs text-emerald-50">/ night</sub>
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

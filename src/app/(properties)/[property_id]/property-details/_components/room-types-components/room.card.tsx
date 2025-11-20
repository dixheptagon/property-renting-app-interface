import React, { useMemo, useState } from "react";
import { Check, Users, Bed, Bath, Maximize2, Eye } from "lucide-react";
import { SpecItem } from "./room-card-components/spec.item";
import { SelectRoomButton } from "./room-card-components/select.room.button";
import { RoomData } from "../../_types/property";
import { roomHighlights } from "../../_const/room.higlights";
import renderHighlights from "./room-card-components/render.highlight";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface RoomCardProps {
  room: RoomData;
  isSelected: boolean;
  onSelectRoom: (roomUid: number | string) => void;
  onViewImages: (room: RoomData) => void;
}

/**
 * Individual room card component displaying room details, specs, and selection button.
 */
export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  isSelected,
  onSelectRoom,
  onViewImages,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateDescription = (text: string, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Create a flat map of all highlight items for easy lookup
  const highlightMap = useMemo(() => {
    const map = new Map<
      string,
      { icon: React.ComponentType<any>; label: string }
    >();

    // Populate the map with highlight items
    roomHighlights.forEach((category) => {
      category.items.forEach((item) => {
        map.set(item.value, { icon: item.icon, label: item.label });
      });
    });

    return map;
  }, []);

  // Combine and process highlights from both arrays
  const allHighlights = useMemo(() => {
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
            icon: Check,
            label: highlight,
            isCustom: true,
          };
    });
  }, [room.highlight, room.custom_highlight, highlightMap]);

  // Process highlights to separate visible ones from additional ones for popover display
  const visibleHighlights = allHighlights.slice(0, 6);
  const otherHighlights = allHighlights.slice(6);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-2 bg-white shadow-md transition-all duration-300 ${
        isSelected
          ? "border-green-500 shadow-lg shadow-green-100"
          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {/* Room Details Section */}
        <div className="space-y-4 lg:col-span-2">
          {/* Room Header */}
          <div className="relative flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h3 className="">
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="line-clamp-1 max-w-86 truncate text-2xl font-bold text-gray-900">
                        {room.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{room.name}</TooltipContent>
                  </Tooltip>
                </h3>

                {/* Selected Room Badge */}
                {isSelected && (
                  <span className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
                    <Check className="h-4 w-4 stroke-3" />
                    Selected Room
                  </span>
                )}
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
          {renderHighlights({
            visibleHighlights,
            otherHighlights,
          })}
        </div>

        {/* Room Images and Selection Section */}
        <div className="flex flex-col gap-2 lg:col-span-1">
          <div
            className="group relative h-48 cursor-pointer overflow-hidden rounded-lg lg:h-48"
            onClick={() => onViewImages(room)}
          >
            {room.images.length > 0 && (
              <Image
                src={
                  room.images.find((img) => img.is_main)?.url ||
                  room.images[0]?.url
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
          <SelectRoomButton
            isSelected={isSelected}
            price={room.base_price}
            onSelect={() => onSelectRoom(room.uid)}
          />
        </div>
      </div>
    </div>
  );
};

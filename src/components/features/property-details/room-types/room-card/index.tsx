import React from "react";
import { Check, Users, Bed, Bath, Maximize2, Eye } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Room } from "@/types/property";
import { formatIDR, processHighlights, formatHighlightLabel } from "../utils";
import { SpecItem } from "./spec.item";
import { SelectRoomButton } from "./select.room.button";

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelectRoom: (roomId: number) => void;
  onViewImages: (room: Room) => void;
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
  // Process highlights to separate visible ones from additional ones for popover display
  const { visible: visibleHighlights, others: otherHighlights } =
    processHighlights(room.highlight);

  /**
   * Renders the room highlights section with visible highlights and a popover for additional ones.
   */
  const renderHighlights = () => (
    <div className="pt-4">
      <div className="flex flex-wrap gap-2">
        {visibleHighlights.map((key, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm"
          >
            <span>{formatHighlightLabel(key)}</span>
          </div>
        ))}
        {otherHighlights.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200">
                <span>+{otherHighlights.length} more</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-md font-semibold">Other Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  {otherHighlights.map((key, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm"
                    >
                      <span>{formatHighlightLabel(key)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );

  return (
    <div
      // Dynamic className based on selection state for visual feedback
      className={`overflow-hidden rounded-xl border-2 bg-white shadow-md transition-all duration-300 ${
        isSelected
          ? "border-green-500 shadow-lg shadow-green-100"
          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {/* Room Details Section */}
        <div className="space-y-4 lg:col-span-2">
          {/* Room Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  {room.name}
                </h3>
                {isSelected && (
                  <span className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
                    <Check className="h-4 w-4 stroke-3" />
                    Selected Room
                  </span>
                )}
              </div>
              <p className="leading-relaxed text-gray-600">
                {room.description}
              </p>
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
            <img
              src={room.images[0].url}
              alt={room.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
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
          <SelectRoomButton
            isSelected={isSelected}
            price={room.base_price}
            onSelect={() => onSelectRoom(room.id)}
          />
        </div>
      </div>
    </div>
  );
};

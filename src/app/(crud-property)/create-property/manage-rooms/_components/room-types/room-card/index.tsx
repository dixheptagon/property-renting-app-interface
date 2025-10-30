import React from "react";
import {
  Check,
  Users,
  Bed,
  Bath,
  Maximize2,
  Eye,
  Edit,
  CheckCheck,
  Trash2,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RoomData } from "@/app/(crud-property)/_types/property.type";
import { SpecItem } from "./spec.item";
import { formatToIDR } from "../../../_utils/format.price.idr";
import { roomHighlights } from "../../../_constant/room.higlights";

interface RoomCardProps {
  room: RoomData;
  onEditRoom: (tempId: string) => void;
  onViewImages: (room: RoomData) => void;
  onRemoveRoom: (tempId: string) => void;
  isLocked: boolean;
}

/**
 * Individual room card component displaying room details, specs, and edit button.
 */
export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onEditRoom,
  onViewImages,
  onRemoveRoom,
  isLocked,
}) => {
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
    <div className="pt-4">
      <div className="flex flex-wrap gap-2">
        {visibleHighlights.map((highlight, index) => {
          const IconComponent = highlight.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                highlight.isCustom
                  ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
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
      {/* Remove Button - Top Right Corner */}
      <div className="absolute top-4 right-4 z-20">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-200 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove room</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Remove Room</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove "{room.name || "this room"}"?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:justify-end">
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <Button
                variant="destructive"
                onClick={() => onRemoveRoom(room.tempId)}
              >
                Remove Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-red-500/25 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Room Incomplete
              </h3>
              <p className="text-sm text-gray-600">
                Please complete the room details
              </p>
            </div>
            <button
              onClick={() => onEditRoom(room.tempId)}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-red-700"
            >
              <Edit className="h-4 w-4" />
              Complete Room Form
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {/* Room Details Section */}
        <div className="space-y-4 lg:col-span-2">
          {/* Room Header */}
          <div className="relative flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h3 className="max-w-100 text-2xl font-bold text-gray-900">
                  {room.name}
                </h3>
              </div>
              <p className="max-w-105 leading-relaxed text-gray-600">
                {room.description}
              </p>

              {/* Room Price */}
              <section className="mt-4 rounded-lg bg-blue-600 p-3 shadow-lg md:absolute md:-top-2 md:right-2 md:mt-0 md:p-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium tracking-wider text-emerald-50 uppercase">
                    Start from
                  </span>
                  <span className="text-lg font-bold text-white md:text-xl lg:text-2xl">
                    {formatToIDR(room.base_price)}
                    <sub className="self-end text-xs text-emerald-50">
                      / night
                    </sub>
                  </span>
                </div>
              </section>
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
              <img
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
          <button
            onClick={() => onEditRoom(room.tempId)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
          >
            <Edit className="h-5 w-5" />
            Edit Room
          </button>
        </div>
      </div>
    </div>
  );
};

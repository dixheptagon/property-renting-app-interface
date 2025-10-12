"use client";

import React, { useState } from "react";
import {
  Users,
  Bed,
  Bath,
  Maximize2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Room } from "@/types/property";
import { useBookingStore } from "@/stores/booking.store";

const formatIDR = (price: number): string => {
  return price.toLocaleString("id-ID");
};

interface PropertyRoomTypesProps {
  rooms: Room[];
}

export default function PropertyRoomTypes({ rooms }: PropertyRoomTypesProps) {
  const { selectedRoom, setRoom } = useBookingStore();

  // Image Room State
  const [selectedRoomImage, setSelectedRoomImage] = useState<null | Room>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleViewImages = (room: any) => {
    setSelectedRoomImage(room);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedRoomImage!.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedRoomImage!.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelectRoom = (roomId: number) => {
    // Logic untuk select room - bisa integrate dengan state management lo
    setRoom(rooms.find((room) => room.id === roomId)!);
    console.log("Selected room:", roomId);
  };

  return (
    <div className="" id="room-type">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Choose Your Room
      </h2>

      {/* Room Cards */}
      <div className="space-y-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`overflow-hidden rounded-xl border-2 bg-white shadow-md transition-all duration-300 ${
              selectedRoom?.id === room.id
                ? "border-green-500 shadow-lg shadow-green-100"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
              {/* Left Section - Room Details */}
              <div className="space-y-4 lg:col-span-2">
                {/* Room Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {room.name}
                      </h3>
                      {selectedRoom?.id === room.id && (
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

                {/* Room Specs */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 md:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Guest</p>
                      <p className="font-semibold text-gray-900">
                        {room.max_guest}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <Maximize2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bedroom</p>
                      <p className="font-semibold text-gray-900">
                        {room.bedrooms}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                      <Bed className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bed</p>
                      <p className="font-semibold text-gray-900">{room.beds}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100">
                      <Bath className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bathroom</p>
                      <p className="font-semibold text-gray-900">
                        {room.bathrooms}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const highlightKeys = Object.keys(room.highlight).filter(
                        (key) => {
                          const value =
                            room.highlight[key as keyof typeof room.highlight];
                          if (key === "others" && Array.isArray(value)) {
                            return false;
                          }
                          return value === true;
                        }
                      );
                      if (
                        room.highlight.others &&
                        Array.isArray(room.highlight.others)
                      ) {
                        highlightKeys.push(...room.highlight.others);
                      }
                      const visibleHighlights = highlightKeys.slice(0, 4);
                      const otherHighlights = highlightKeys.slice(4);

                      return (
                        <>
                          {visibleHighlights.map((key, index) => {
                            const label = key.includes(" ")
                              ? key
                              : key
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase());
                            return (
                              <div
                                key={index}
                                className="text-md flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1"
                              >
                                <span className="text-md">{label}</span>
                              </div>
                            );
                          })}
                          {otherHighlights.length > 0 && (
                            <Popover>
                              <PopoverTrigger asChild>
                                <button className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200">
                                  <span className="text-md">
                                    +{otherHighlights.length} more
                                  </span>
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="text-md font-semibold">
                                    Other Highlights
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {otherHighlights.map((key, index) => {
                                      const label = key.includes(" ")
                                        ? key
                                        : key
                                            .replace(/_/g, " ")
                                            .replace(/\b\w/g, (l) =>
                                              l.toUpperCase()
                                            );
                                      return (
                                        <div
                                          key={index}
                                          className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm"
                                        >
                                          <span className="text-md">
                                            {label}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Right Section - Room Images Preview */}
              <div className="flex flex-col gap-2 lg:col-span-1">
                <div
                  className="group relative h-48 cursor-pointer overflow-hidden rounded-lg lg:h-48"
                  onClick={() => handleViewImages(room)}
                >
                  <img
                    src={room.images[0].url}
                    alt={room.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
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
                  onClick={() => handleSelectRoom(room.id)}
                  disabled={selectedRoom?.id === room.id}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-200 ${
                    selectedRoom?.id === room.id
                      ? "cursor-default bg-green-500 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {selectedRoom?.id === room.id ? (
                    <>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <Check className="h-3 w-3 stroke-3" />
                          Selected
                        </div>
                        <div className="text-lg">
                          Rp{formatIDR(room.base_price)}{" "}
                          <sub className="text-xs">/night</sub>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-center gap-2 text-xs">
                        Select
                      </div>
                      <div className="text-lg">
                        Rp{formatIDR(room.base_price)}{" "}
                        <sub className="text-xs">/night</sub>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedRoomImage && (
        <div className="bg-opacity-95 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full p-2 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
          >
            <X size={32} />
          </button>

          {/* Room Name */}
          <div className="absolute top-4 left-4 z-10">
            <h3 className="text-2xl font-bold text-white">
              {selectedRoomImage.name}
            </h3>
            <p className="mt-1 text-sm text-gray-300">
              {currentImageIndex + 1} / {selectedRoomImage.images.length}
            </p>
          </div>

          {/* Previous Button */}
          {selectedRoomImage.images.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 z-10 rounded-full p-3 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Current Image */}
          <div className="max-h-[80vh] max-w-5xl">
            <img
              src={selectedRoomImage.images[currentImageIndex].url}
              alt={`${selectedRoomImage.name} - Image ${currentImageIndex + 1}`}
              className="max-h-[80vh] max-w-full rounded-lg object-contain"
            />
          </div>

          {/* Next Button */}
          {selectedRoomImage.images.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 z-10 rounded-full p-3 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
            >
              <ChevronRight size={40} />
            </button>
          )}

          {/* Thumbnail Strip */}
          {selectedRoomImage.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto px-4">
              {selectedRoomImage.images.map((image, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                    currentImageIndex === index
                      ? "opacity-100 ring-2 ring-white"
                      : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

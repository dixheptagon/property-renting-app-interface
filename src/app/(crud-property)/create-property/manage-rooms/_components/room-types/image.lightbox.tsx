import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { RoomData } from "@/app/(crud-property)/_types/property.type";
import Image from "next/image";

interface ImageLightboxProps {
  room: RoomData | null;
  isOpen: boolean;
  currentImageIndex: number;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
}

/**
 * Lightbox modal component for viewing room images with navigation.
 */
export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  room,
  isOpen,
  currentImageIndex,
  onClose,
  onPrevImage,
  onNextImage,
  onSelectImage,
}) => {
  if (!isOpen || !room) return null;

  return (
    <div className="bg-opacity-95 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full p-2 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
      >
        <X size={32} />
      </button>

      {/* Room Name and Image Counter */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-2xl font-bold text-white">{room.name}</h3>
        <p className="mt-1 text-sm text-gray-300">
          {currentImageIndex + 1} / {room.images.length}
        </p>
      </div>

      {/* Previous Button */}
      {room.images.length > 1 && (
        <button
          onClick={onPrevImage}
          className="absolute left-4 z-10 rounded-full p-3 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Current Image */}
      <div className="max-h-[80vh] max-w-5xl">
        <img
          src={room.images[currentImageIndex].secureUrl}
          alt={`${room.name} - Image ${currentImageIndex + 1}`}
          className="max-h-[80vh] max-w-full rounded-lg object-contain"
        />
      </div>

      {/* Next Button */}
      {room.images.length > 1 && (
        <button
          onClick={onNextImage}
          className="absolute right-4 z-10 rounded-full p-3 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
        >
          <ChevronRight size={40} />
        </button>
      )}

      {/* Thumbnail Strip */}
      {room.images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto px-4">
          {room.images.map((image, index) => (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                currentImageIndex === index
                  ? "opacity-100 ring-2 ring-white"
                  : "opacity-50 hover:opacity-75"
              }`}
            >
              <img
                src={image.secureUrl}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

"use client";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { RoomData } from "@/app/(crud-property)/_types/property.type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoomCard } from "./room-card";
import { ImageLightbox } from "./image.lightbox";

/**
 * Main component for displaying property room types from store.
 * Handles room editing and image viewing.
 */
export default function PropertyRoomTypes() {
  const { rooms: createdRooms, removeRoom } = usePropertyStore();
  const router = useRouter();

  // Lightbox state for image viewing
  const [lightboxRoom, setLightboxRoom] = useState<RoomData | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Opens the image lightbox for a specific room.
   * @param room - The room whose images to display.
   */
  const handleViewImages = (room: RoomData) => {
    setLightboxRoom(room);
    setCurrentImageIndex(0);
    setIsLightboxOpen(true);
  };

  /**
   * Navigates to the previous image in the lightbox.
   */
  const handlePrevImage = () => {
    if (!lightboxRoom) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? lightboxRoom.images.length - 1 : prev - 1
    );
  };

  /**
   * Navigates to the next image in the lightbox.
   */
  const handleNextImage = () => {
    if (!lightboxRoom) return;
    setCurrentImageIndex((prev) =>
      prev === lightboxRoom.images.length - 1 ? 0 : prev + 1
    );
  };

  /**
   * Edits a room by redirecting to title-description page.
   * @param tempId - The tempId of the room to edit.
   */
  const handleEditRoom = (tempId: string) => {
    router.push(
      `/create-property/manage-rooms/title-description?roomId=${tempId}`
    );
  };

  /**
   * Removes a room using the property store.
   * @param tempId - The tempId of the room to remove.
   */
  const handleRemoveRoom = (tempId: string) => {
    removeRoom(tempId);
  };

  return (
    <div className="" id="room-type">
      {/* Room Cards */}
      <div className="space-y-6">
        {createdRooms.map((room) => {
          const isIncomplete =
            !room.name ||
            !room.base_price ||
            room.images.length === 0 ||
            !room.description ||
            !room.max_guest ||
            !room.total_units ||
            !room.bedrooms ||
            !room.bathrooms ||
            !room.beds;

          return (
            <RoomCard
              key={room.tempId}
              room={room}
              onEditRoom={handleEditRoom}
              onViewImages={handleViewImages}
              onRemoveRoom={handleRemoveRoom}
              isLocked={isIncomplete}
            />
          );
        })}
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        room={lightboxRoom}
        isOpen={isLightboxOpen}
        currentImageIndex={currentImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        onSelectImage={setCurrentImageIndex}
      />
    </div>
  );
}

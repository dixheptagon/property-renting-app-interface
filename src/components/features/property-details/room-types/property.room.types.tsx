"use client";

import React, { useState } from "react";
import { Room } from "@/types/property";
import { useBookingStore } from "@/stores/booking.store";
import { RoomCard } from "./room-card";
import { ImageLightbox } from "./image.lightbox";

interface PropertyRoomTypesProps {
  rooms: Room[];
}

/**
 * Main component for displaying and selecting property room types.
 * Handles room selection, image viewing, and integrates with booking store.
 */
export default function PropertyRoomTypes({ rooms }: PropertyRoomTypesProps) {
  const { selectedRoom, setRoom } = useBookingStore();

  // Lightbox state for image viewing
  const [lightboxRoom, setLightboxRoom] = useState<Room | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Opens the image lightbox for a specific room.
   * @param room - The room whose images to display.
   */
  const handleViewImages = (room: Room) => {
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
   * Selects a room and updates the booking store.
   * @param roomId - The ID of the room to select.
   */
  const handleSelectRoom = (roomId: number) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setRoom(room);
    }
  };

  return (
    <div className="" id="room-type">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Choose Your Room
      </h2>

      {/* Room Cards */}
      <div className="space-y-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={selectedRoom?.id === room.id}
            onSelectRoom={handleSelectRoom}
            onViewImages={handleViewImages}
          />
        ))}
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

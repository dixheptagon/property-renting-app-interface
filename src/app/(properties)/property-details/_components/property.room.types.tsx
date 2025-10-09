'use client';

import React, { useState } from 'react';
import { Wifi, Tv, Wind, Car, UtensilsCrossed, Waves } from 'lucide-react';
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
} from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

export default function PropertyRoomTypes() {
  // Selected Room State
  const [selectedRoom, setSelectedRoom] = useState<null | number>(null);
  // Image Room State
  const [selectedRoomImage, setSelectedRoomImage] = useState<null | any>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample room data - ganti dengan data dari API lo
  const rooms = [
    {
      id: 1,
      name: 'Deluxe Ocean View',
      description:
        'Spacious room with stunning ocean views, perfect for couples or small families. Features modern amenities and elegant design.',
      guest: 2,
      bedroom: 1,
      bed: 1,
      bathroom: 1,
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      ],
      Highlight: [
        { icon: Wifi, label: 'Free WiFi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Car, label: 'Free Parking' },
        { icon: UtensilsCrossed, label: 'Kitchen' },
        { icon: Waves, label: 'Swimming Pool' },
        { icon: Car, label: 'Free Parking' },
        { icon: UtensilsCrossed, label: 'Kitchen' },
        { icon: Waves, label: 'Swimming Pool' },
        { icon: Wifi, label: 'Free WiFi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Car, label: 'Free Parking' },
        { icon: UtensilsCrossed, label: 'Kitchen' },
        { icon: Waves, label: 'Swimming Pool' },
        { icon: Car, label: 'Free Parking' },
        { icon: UtensilsCrossed, label: 'Kitchen' },
        { icon: Waves, label: 'Swimming Pool' },
      ],
    },
    {
      id: 2,
      name: 'Premium Suite',
      description:
        'Luxurious suite with separate living area and bedroom. Ideal for extended stays with maximum comfort and privacy.',
      guest: 4,
      bedroom: 2,
      bed: 2,
      bathroom: 2,
      images: [
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      ],
      Highlight: [
        { icon: Wifi, label: 'Free WiFi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Car, label: 'Free Parking' },
        { icon: UtensilsCrossed, label: 'Kitchen' },
        { icon: Waves, label: 'Swimming Pool' },
        { icon: Car, label: 'Free Parking' },
        { icon: UtensilsCrossed, label: 'Kitchen' },
        { icon: Waves, label: 'Swimming Pool' },
      ],
    },
    {
      id: 3,
      name: 'Family Room',
      description:
        'Perfect for families with children. Spacious layout with multiple beds and kid-friendly amenities for a comfortable stay.',
      guest: 6,
      bedroom: 3,
      bed: 3,
      bathroom: 2,
      images: [
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
        'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80',
      ],
      Highlight: [
        { icon: Wifi, label: 'Free WiFi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Car, label: 'Free Parking' },
        { icon: UtensilsCrossed, label: 'Kitchen' },
        { icon: Waves, label: 'Swimming Pool' },
        { icon: Car, label: 'Free Parking' },
        { icon: UtensilsCrossed, label: 'Kitchen' },
        { icon: Waves, label: 'Swimming Pool' },
      ],
    },
  ];

  const handleViewImages = (room: any) => {
    setSelectedRoomImage(room);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedRoomImage.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedRoomImage.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelectRoom = (roomId: number) => {
    // Logic untuk select room - bisa integrate dengan state management lo
    setSelectedRoom(roomId);
    console.log('Selected room:', roomId);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Choose Your Room
      </h2>

      {/* Room Cards */}
      <div className="space-y-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 ${
              selectedRoom === room.id
                ? 'border-green-500 shadow-lg shadow-green-100'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
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
                      {selectedRoom === room.id && (
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
                        {room.guest}
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
                        {room.bedroom}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                      <Bed className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bed</p>
                      <p className="font-semibold text-gray-900">{room.bed}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100">
                      <Bath className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bathroom</p>
                      <p className="font-semibold text-gray-900">
                        {room.bathroom}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    {room.Highlight.slice(0, 3).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm"
                      >
                        <highlight.icon className="h-4 w-4" />
                        {highlight.label}
                      </div>
                    ))}
                    {room.Highlight.length > 3 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200">
                            +{room.Highlight.length - 3} more
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid grid-cols-2 gap-2">
                            {room.Highlight.map((highlight, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <highlight.icon className="h-4 w-4" />
                                <span className="text-sm">
                                  {highlight.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
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
                    src={room.images[0]}
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
                  disabled={selectedRoom === room.id}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-200 ${
                    selectedRoom === room.id
                      ? 'cursor-default bg-green-500 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {selectedRoom === room.id ? (
                    <>
                      <Check className="h-5 w-5 stroke-3" />
                      Selected
                    </>
                  ) : (
                    'Select'
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
              src={selectedRoomImage.images[currentImageIndex]}
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
              {selectedRoomImage.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                    currentImageIndex === index
                      ? 'opacity-100 ring-2 ring-white'
                      : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  <img
                    src={image}
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

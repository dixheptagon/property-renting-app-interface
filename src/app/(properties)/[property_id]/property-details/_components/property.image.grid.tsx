"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { PropertyImage } from "../_types/property";
import Image from "next/image";

interface PropertyImageGridProps {
  images: PropertyImage[];
}

export default function PropertyImageGrid({ images }: PropertyImageGridProps) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Map PropertyImage to string URLs for compatibility
  const imageUrls = images.map((img) => img.url);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  return (
    <>
      {/* Main Grid Layout */}
      <div className="" id="photos">
        <div className="grid h-[400px] grid-cols-2 gap-2 overflow-hidden rounded-xl md:grid-cols-4">
          {/* Main Image - Left Side */}
          <div
            className="group relative col-span-2 row-span-2 cursor-pointer overflow-hidden"
            onClick={() => handleImageClick(0)}
          >
            <Image
              fill
              src={imageUrls[0]}
              alt="Main property view"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
          </div>

          {/* Grid Images - Right Side */}
          {imageUrls.slice(1, 5).map((imageUrl, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden"
              onClick={() => handleImageClick(index + 1)}
            >
              <Image
                fill
                src={imageUrl}
                alt={`Property view ${index + 2}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

              {/* Show button on last image */}
              {index === 3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLightbox(true);
                    setCurrentImageIndex(0);
                  }}
                  className="absolute right-4 bottom-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg transition-colors duration-200 hover:bg-gray-100"
                >
                  <ImageIcon
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  />
                  Show more photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="bg-opacity-95 fixed inset-0 z-50 flex items-center justify-center bg-black">
          {/* Close Button */}
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 rounded-full p-2 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
          >
            <X size={32} />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-lg font-medium text-white">
            {currentImageIndex + 1} / {imageUrls.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 rounded-full p-3 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Current Image */}
          <div className="mx-4 max-h-[80vh] max-w-5xl">
            <Image
              fill
              src={imageUrls[currentImageIndex]}
              alt={`Property view ${currentImageIndex + 1}`}
              className="max-h-[80vh] max-w-full rounded-lg object-contain"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextImage}
            className="absolute right-4 rounded-full p-3 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
          >
            <ChevronRight size={40} />
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto px-4">
            {imageUrls.map((imageUrl, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                  currentImageIndex === index
                    ? "opacity-100 ring-2 ring-white"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <Image
                  fill
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import ImageUploadDialog from "./image.upload";

interface Photo {
  id: string;
  url: string;
  isCover?: boolean;
}

export default function ImagesPreview() {
  const { propertyImages, addPropertyImage, removePropertyImage } =
    usePropertyStore();

  // const handleSetCover = (photoId: string) => {
  //   setPhotos((prev) =>
  //     prev.map((photo) => ({
  //       ...photo,
  //       isCover: photo.id === photoId,
  //     }))
  //   );
  // };

  // const handleDelete = (photoId: string) => {
  //   setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  // };

  const handleAddMore = () => {
    console.log("Add more photos clicked");
    // Trigger file upload dialog
  };

  const normalizedImages = propertyImages.flat();
  const coverPhoto = normalizedImages.find((photo) => photo.isMain);
  const otherPhotos = normalizedImages.filter((photo) => !photo.isMain);
  const tempGroupId = coverPhoto?.tempGroupId;

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      {/* Cover Photo */}
      {coverPhoto && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <img
            src={coverPhoto.secureUrl}
            alt="Cover Photo"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="rounded-lg border-1 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-md">
              Main Image
            </span>
          </div>
          {/* <PhotoMenu
            onSetCover={() => {}}
            onDelete={() => handleDelete(coverPhoto.id)}
            isCover={true}
          /> */}
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-4">
        {otherPhotos.map((photo) => (
          <div
            key={photo.publicId}
            className="relative aspect-video overflow-hidden rounded-2xl"
          >
            <img
              src={photo.secureUrl}
              alt={`Photo ${photo.id}`}
              className="h-full w-full object-cover"
            />
            {/* <PhotoMenu
              onSetCover={() => handleSetCover(photo.id)}
              onDelete={() => handleDelete(photo.id)}
            /> */}
          </div>
        ))}

        {/* Add More Button */}
        <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-400 bg-gray-100">
          <Plus className="h-10 w-10 text-gray-400" />
          <ImageUploadDialog
            buttonText="Add More Photos"
            tempGroupId={tempGroupId}
          />
        </div>
      </div>
    </div>
  );
}

// Photo Menu Component
function PhotoMenu({
  onSetCover,
  onDelete,
  isCover = false,
}: {
  onSetCover: () => void;
  onDelete: () => void;
  isCover?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 shadow-md backdrop-blur-sm hover:bg-white"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {!isCover && (
          <DropdownMenuItem onClick={onSetCover}>
            Set as cover photo
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          Delete photo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import ImageUploadDialog from "./image.upload";
import ImageDelete from "./image.delete";
import { useDeletePropertyImage } from "@/app/(crud-property)/_hooks/use.delete.property.image";
import { toast } from "sonner";
import Image from "next/image";
import PhotoMenu from "./image.menu";

interface Photo {
  id: string;
  url: string;
  isCover?: boolean;
}

export default function ImagesPreview() {
  const { propertyImages, addPropertyImage, removePropertyImage } =
    usePropertyStore();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    photoId: string | null;
    tempGroupId: string | null;
  }>({
    open: false,
    photoId: null,
    tempGroupId: null,
  });

  const { mutate: removeImage, isPending } = useDeletePropertyImage({
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Images deleted successfully!");
      setDeleteDialog({ open: false, photoId: null, tempGroupId: null });
      removePropertyImage(Number(deleteDialog.photoId));
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong, please try again later.");

        // router.push("/");
      }
    },
  });

  const handleSetCover = (photoId: string | number) => {
    setPhotos((prev) =>
      prev.map((photo) => ({
        ...photo,
        isCover: photo.id === photoId,
      }))
    );
  };

  const handleDeleteClick = (photoId: string, tempGroupId?: string) => {
    setDeleteDialog({
      open: true,
      photoId,
      tempGroupId: tempGroupId || null,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.photoId) {
      removeImage({ imageId: Number(deleteDialog.photoId), tempGroupId });
    }
  };

  const coverPhoto = propertyImages.find((photo) => photo.isMain);
  const otherPhotos = propertyImages.filter((photo) => !photo.isMain);
  const tempGroupId = coverPhoto?.tempGroupId;

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      {/* Cover Photo */}
      {coverPhoto && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={coverPhoto.secureUrl}
            alt="Cover Photo"
            width={1080}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="rounded-lg border-1 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-md">
              Main Image
            </span>
          </div>
          <PhotoMenu
            onSetCover={() => {}}
            onDelete={() =>
              handleDeleteClick(
                coverPhoto.id.toString(),
                coverPhoto.tempGroupId
              )
            }
            isCover={true}
          />
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-4">
        {otherPhotos.map((photo) => (
          <div
            key={photo.publicId}
            className="relative aspect-video overflow-hidden rounded-2xl"
          >
            <Image
              src={photo.secureUrl}
              alt={`Photo ${photo.id}`}
              width={1080}
              height={1080}
              className="h-full w-full object-cover"
            />
            <PhotoMenu
              onSetCover={() => handleSetCover(photo.id)}
              onDelete={() =>
                handleDeleteClick(photo.id.toString(), photo.tempGroupId)
              }
            />
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

      {/* Image Delete Dialog */}
      <ImageDelete
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
        onConfirm={handleDeleteConfirm}
        photoId={deleteDialog.photoId || undefined}
        tempGroupId={deleteDialog.tempGroupId || undefined}
        isPending={isPending}
      />
    </div>
  );
}

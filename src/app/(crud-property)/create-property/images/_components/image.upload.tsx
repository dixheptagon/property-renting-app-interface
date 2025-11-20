"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Plus,
  Images,
  Trash2,
  AlertCircle,
  LoaderCircle,
  ImageOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUploadPropertyImages } from "@/app/(crud-property)/_hooks/use.upload.property.images";
import { toast } from "sonner";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";

export default function ImageUploadDialog({
  buttonText,
  tempGroupId,
}: {
  buttonText: string;
  tempGroupId?: string;
}) {
  const [selectedImages, setSelectedImages] = useState<
    { url?: string; size?: number; name?: string; file: File }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addPropertyImage, propertyImages } = usePropertyStore();
  const normalizedPropertyImages = propertyImages.flat();

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const { mutate: uploadImages, isPending } = useUploadPropertyImages({
    onSuccess: (data) => {
      setSelectedImages([]);
      addPropertyImage(data?.data);
      toast.success(data?.message || "Images uploaded successfully!");
      setOpen(false);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    setError(""); // Reset error

    // Filter hanya file gambar
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      setError("Please select only image files");
      return;
    }

    // Validasi ukuran file
    const oversizedFiles = imageFiles.filter(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (oversizedFiles.length > 0) {
      setError(
        `${oversizedFiles.length} file(s) exceed 2MB limit. Please select smaller images.`
      );
      return;
    }

    // Check limit total images (10) including already uploaded ones
    const totalImages = normalizedPropertyImages.length + selectedImages.length;
    const remainingSlots = 10 - totalImages;

    if (imageFiles.length > remainingSlots) {
      setError("You can only upload maximum of 10 images.");

      return;
    }

    // Process valid files
    const newImages = imageFiles.map((file) => ({
      url: URL.createObjectURL(file),
      size: file.size,
      name: file.name,
      file,
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (selectedImages.length === 0) return;

    // Final check before upload: ensure total doesn't exceed 10
    const totalImagesAfterUpload =
      normalizedPropertyImages.length + selectedImages.length;
    if (totalImagesAfterUpload > 10) {
      setError("You can only upload up to 10 images.");
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    if (tempGroupId) {
      formData.append("temp_group_id", tempGroupId);
    }

    uploadImages(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-md p-6 font-semibold outline-2"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <DialogTitle className="text-2xl">{buttonText}</DialogTitle>
              <DialogDescription className="mt-2">
                {selectedImages.length > 0
                  ? `${selectedImages.length} item${selectedImages.length > 1 ? "s" : ""} selected`
                  : "No items selected"}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-4 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Loading Alert */}
        {isPending && (
          <Alert
            variant="default"
            className="mt-4 border-amber-500 bg-amber-200"
          >
            <LoaderCircle className="h-4 w-4 animate-spin text-amber-500" />
            <AlertDescription>
              <p className="text-amber-600">
                Please wait while your image is being uploaded.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <section className="mt-6">
          {selectedImages.length === 0 ? (
            // Empty state - Drag and drop area
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex min-h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
              }`}
              onClick={handleBrowseClick}
            >
              <Images className="h-20 w-20 text-gray-400" />
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Drag and drop
                </h3>
                <p className="mt-2 text-gray-600">or browse for photos</p>
              </div>
              <Button
                type="button"
                className="mt-4 bg-blue-600 px-8 py-6 text-base hover:bg-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBrowseClick();
                }}
              >
                Browse
              </Button>
            </div>
          ) : (
            // Image grid with previews
            <div className="grid grid-cols-2 gap-4">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  {image.url ? ( // Check if image exists
                    <img
                      src={image.url}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageOff className="h-full w-full text-gray-400" />
                  )}

                  <div className="absolute inset-0 bg-black/0" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-3 right-3 h-8 w-8 rounded-full shadow-lg hover:scale-105"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </section>

        <DialogFooter className="mt-2 flex flex-row items-center justify-between!">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="px-6 py-6 text-base"
              disabled={isPending}
            >
              {selectedImages.length > 0 ? "Cancel" : "Done"}
            </Button>
          </DialogClose>
          <Button
            type="button"
            className={`bg-blue-600 px-8 py-6 text-base hover:bg-blue-700 disabled:opacity-50 ${isPending ? "cursor-not-allowed" : ""}`}
            disabled={selectedImages.length === 0 || isPending}
            onClick={handleUpload}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" /> Uploading
              </div>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

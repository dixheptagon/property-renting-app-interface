"use client";
import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreatePropertyHeader from "../_components/create.property.header";
import PropertyProgressBar from "../_components/property.progress.bar";
import { useRouter } from "next/navigation";
import { useScrolled } from "@/hooks/use.scrolled";
import { useIsMobile } from "@/hooks/use-mobile";

interface Photo {
  id: string;
  url: string;
  file: File;
  isCover: boolean;
}

export default function Page() {
  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const newPhotos = imageFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file,
      isCover: photos.length === 0, // First photo is cover by default
    }));

    setPhotos([...photos, ...newPhotos]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removePhoto = (id: string) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);

    // If removed photo was cover, make first photo the new cover
    if (updatedPhotos.length > 0 && !updatedPhotos.some((p) => p.isCover)) {
      updatedPhotos[0].isCover = true;
    }

    setPhotos(updatedPhotos);
  };

  const setCoverPhoto = (id: string) => {
    setPhotos(
      photos.map((photo) => ({
        ...photo,
        isCover: photo.id === id,
      }))
    );
  };

  const canContinue = photos.length >= 5;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CreatePropertyHeader />

      <section className="mb-32 px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-4xl space-y-3 text-center sm:mb-12">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Add some photos of your apartment
          </h1>
          <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
            You'll need at least 5 photos to get started. You can add more or
            make changes later.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span
              className={`font-semibold ${photos.length >= 5 ? "text-green-600" : "text-gray-900"}`}
            >
              {photos.length} / 5 photos
            </span>
            {photos.length >= 5 && (
              <span className="text-green-600">✓ Minimum reached</span>
            )}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {/* Main Upload Area - Takes 2 columns on large screens */}
            <div
              className={`relative col-span-2 flex min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all sm:min-h-[400px] lg:row-span-2 ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="rounded-full bg-gray-200 p-4">
                  <Upload className="h-8 w-8 text-gray-600 sm:h-10 sm:w-10" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900 sm:text-xl">
                    Drag photos here
                  </p>
                  <p className="text-sm text-gray-500 sm:text-base">
                    or click to browse from your device
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Photos
                </Button>
              </div>

              {dragActive && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-blue-100/50">
                  <p className="text-xl font-semibold text-blue-600">
                    Drop photos here
                  </p>
                </div>
              )}
            </div>

            {/* Photo Thumbnails */}
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                  photo.isCover
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                } ${index === 0 ? "col-span-2 row-span-2 sm:col-span-1 sm:row-span-1" : ""}`}
              >
                <div className="aspect-square h-full w-full">
                  <img
                    src={photo.url}
                    alt={`Property photo ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/40">
                  <div className="flex h-full flex-col items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setCoverPhoto(photo.id)}
                      disabled={photo.isCover}
                      className="gap-1"
                    >
                      <Star
                        className={`h-4 w-4 ${photo.isCover ? "fill-yellow-400 text-yellow-400" : ""}`}
                      />
                      {photo.isCover ? "Cover Photo" : "Set as Cover"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => removePhoto(photo.id)}
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Cover Badge */}
                {photo.isCover && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    <Star className="h-3 w-3 fill-white" />
                    Cover
                  </div>
                )}
              </div>
            ))}

            {/* Placeholder boxes to show grid structure */}
            {photos.length > 0 &&
              photos.length < 9 &&
              Array.from({ length: Math.min(9 - photos.length, 4) }).map(
                (_, i) => (
                  <div
                    key={`placeholder-${i}`}
                    className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50"
                  >
                    <ImageIcon className="h-8 w-8 text-gray-300" />
                  </div>
                )
              )}
          </div>

          {/* Tips */}
          {photos.length < 5 && (
            <div className="mt-6 rounded-lg bg-blue-50 p-4 sm:p-6">
              <h3 className="mb-2 font-semibold text-blue-900">Photo Tips:</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Use high-quality, well-lit photos</li>
                <li>• Show different angles and rooms</li>
                <li>• Highlight unique features and amenities</li>
                <li>• The first photo will be your cover photo</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Footer Navigation */}
      <section>
        <div
          className={`fixed right-0 bottom-0 left-0 z-10 transition-all duration-200 ${
            scrolled || isMobile
              ? "border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm"
              : "bg-white"
          }`}
        >
          <div className="mx-auto max-w-7xl space-y-3 p-4 sm:space-y-4 sm:p-5 lg:p-6">
            <PropertyProgressBar />

            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <Button
                className="h-11 px-6 text-sm font-medium shadow-sm transition-all hover:shadow-md sm:h-12 sm:px-8 sm:text-base"
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Back
              </Button>

              <Button
                className="h-11 px-6 text-sm font-medium shadow-sm transition-all hover:shadow-md disabled:opacity-50 sm:h-12 sm:px-8 sm:text-base"
                type="button"
                disabled={!canContinue}
                onClick={() => router.push("/create-property/next-step")}
              >
                Continue
                {!canContinue && ` (${5 - photos.length} more needed)`}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CreatePropertyHeader from "../../_components/create.property.header";
import { Camera } from "lucide-react";
import ImageUploadDialog from "./_components/image.upload";
import ImagesPreview from "./_components/images.preview";
import RoomProgressBar from "../../_components/room.progress.bar";
import { Button } from "@/components/ui/button";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";

export default function Page() {
  const router = useRouter();

  // 1. Get roomId from URL query param
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  // 2. get action for add title and description to room id
  const currentRoom = usePropertyStore((state) =>
    state.rooms.find((room) => room.tempId === roomId)
  );

  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-32 px-4 py-16 sm:py-12">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-4xl space-y-3 text-center sm:mb-12">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Add some photos of your room
          </h1>
          <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
            Show guests what makes this room unique. You&apos;ll need at least 5
            photos to get started, and you can upload up to 10 photos in total.
          </p>
        </div>

        {/* Image Upload */}
        {(currentRoom?.images?.length ?? 0) <= 0 && (
          <div className="mx-auto flex min-h-92 max-w-4xl flex-col items-center justify-center gap-4 rounded-lg border-2 bg-gray-50 shadow-xl">
            <Camera className="h-24 w-24 text-blue-500" />

            <ImageUploadDialog buttonText="Upload Images" />
          </div>
        )}

        {/* Images Preview */}
        {(currentRoom?.images?.length ?? 0) > 0 && <ImagesPreview />}
      </section>

      <section>
        <div
          className={`fixed bottom-0 w-full space-y-2 border-t-2 bg-white/40 p-4 backdrop-blur-md lg:fixed lg:bottom-0`}
        >
          <RoomProgressBar />

          <div className="flex justify-between px-6">
            <Button
              className="p-6 shadow-lg"
              variant="outline"
              type="button"
              onClick={() =>
                router.push(
                  `/create-property/manage-rooms/highlight?roomId=${roomId}`
                )
              }
            >
              Back
            </Button>

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              type="submit"
              disabled={(currentRoom?.images?.length ?? 0) < 5}
              onClick={() =>
                router.push(
                  `/create-property/manage-rooms/set-price?roomId=${roomId}`
                )
              }
            >
              Continue
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

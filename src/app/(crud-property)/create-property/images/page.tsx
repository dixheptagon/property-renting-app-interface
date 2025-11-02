"use client";
import { useRouter } from "next/navigation";
import CreatePropertyHeader from "../_components/create.property.header";
import { useScrolled } from "@/hooks/use.scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePropertyStore } from "../../_stores/property.store";
import PropertyProgressBar from "../_components/property.progress.bar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

import ImageUploadDialog from "./_components/image.upload";
import Image from "next/image";
import ImagesPreview from "./_components/images.preview";

export default function Page() {
  const router = useRouter();

  const { propertyImages } = usePropertyStore();

  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-32 px-4 py-16 sm:py-12">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-4xl space-y-3 text-center sm:mb-12">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Add some photos of your property
          </h1>
          <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
            You'll need at least 5 photos to get started. You can add more or
            make changes later.
          </p>
        </div>

        {/* Image Upload */}
        {propertyImages.length === 0 && (
          <div className="mx-auto flex min-h-92 max-w-4xl flex-col items-center justify-center gap-4 rounded-lg border-2 bg-gray-50 shadow-xl">
            <Camera className="h-24 w-24 text-blue-500" />

            <ImageUploadDialog buttonText="Upload Images" />
          </div>
        )}

        {/* Images Preview */}
        {propertyImages.length > 0 && <ImagesPreview />}
      </section>

      <section>
        <div
          className={`fixed bottom-0 w-full space-y-2 border-t-2 bg-white/40 p-4 backdrop-blur-md lg:fixed lg:bottom-0`}
        >
          <PropertyProgressBar />

          <div className="flex justify-between px-6">
            <Button
              className="p-6 shadow-lg"
              variant="outline"
              type="button"
              onClick={() => router.push("/create-property/rules")}
            >
              Back
            </Button>

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              type="submit"
              onClick={() => router.push("/create-property/manage-rooms")}
              disabled={propertyImages.length < 5}
            >
              Continue
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

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

export default function Page() {
  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  const { propertyImages } = usePropertyStore();
  const mainImage = propertyImages.find((image) => image.isMain);
  const otherImages = propertyImages.filter((image) => !image.isMain);

  console.log(propertyImages);
  console.log("mainImage", mainImage);

  // const [isImageExist, setIsImageExist] = useState<File[]>([]);

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
        {propertyImages.length < 0 && (
          <div className="mx-auto flex min-h-92 max-w-4xl flex-col items-center justify-center gap-4 rounded-lg border-2 bg-gray-50 shadow-xl">
            <Camera className="h-24 w-24 text-blue-500" />

            <ImageUploadDialog />
          </div>
        )}

        {/* Images Preview */}
        {propertyImages.length > 0 && (
          <div className="mx-auto flex max-w-4xl flex-col gap-4 lg:flex-row lg:gap-6">
            {/* Left: main image */}
            <div className="h-50 w-full overflow-hidden rounded-xl border border-gray-500 sm:h-80 lg:h-auto lg:min-h-92">
              {mainImage && (
                <img
                  src={mainImage.secureUrl}
                  alt="Main property image"
                  width={1080}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* Right: grid 2x2 */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {otherImages.slice(0, 4).map((image, index) => (
                <div
                  key={image.id || index}
                  className="h-50 overflow-hidden rounded-xl border border-gray-500 sm:h-48 lg:h-auto lg:min-h-44"
                >
                  <Image
                    src={image.secureUrl}
                    alt="Property"
                    width={1080}
                    height={1080}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <div
          className={`fixed bottom-0 w-full space-y-2 p-4 lg:fixed lg:bottom-0 ${
            scrolled || isMobile
              ? "border-t-2 bg-white/85 backdrop-blur-md"
              : ""
          }`}
        >
          <PropertyProgressBar />

          <div className="flex justify-between px-6">
            <Button
              className="p-6 shadow-lg"
              variant="outline"
              type="button"
              onClick={() => router.push("/create-property/amenities")}
            >
              Back
            </Button>

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              type="submit"
              // disabled={
              //   formik.values.rules.length === 0 &&
              //   formik.values.custom_rules.length === 0
              // }
            >
              Continue
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

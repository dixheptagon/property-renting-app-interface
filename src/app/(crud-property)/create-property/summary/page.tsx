"use client";

import CreatePropertyHeader from "../_components/create.property.header";
import PropertyImageGrid from "./_components/property.image.grid";
import PropertyProfile from "./_components/property.profile";
import PropertyAmenities from "./_components/property.amenities";
import PropertyRules from "./_components/property.rules";
import PropertyPeakRate from "./_components/property.peak.rate";
import PropertyUnavailabilities from "./_components/property.unavailabilities";
import { usePropertyStore } from "../../_stores/property.store";
import NoPropertyImages from "./_components/no.property.image.grid";
import NoPropertyProfile from "./_components/no.property.profile";
import NoPropertyAmenities from "./_components/no.property.amenities";
import NoPropertyRules from "./_components/no.property.rules";
import NoPropertyLocation from "./_components/no.property.location";
import PropertyRoomTypes from "./_components/property-room-types";
import NoPropertyRoomTypes from "./_components/no.property.room.types";
import PropertyLocation from "./_components/property.location";
import NoPropertPeakRates from "./_components/no.property.peak.rate";
import NoPropertyUnavailabilities from "./_components/no.property.unavailabilities";
import { useIsMobile } from "@/hooks/use-mobile";
import PropertyProgressBar from "../_components/property.progress.bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UploadProperty from "./_components/button-upload-property/button.upload.property";

export default function Page() {
  const { propertyImages, property, rooms, peakSeasonRates, unavailabilities } =
    usePropertyStore();

  const isMobile = useIsMobile();

  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-30 min-h-screen space-y-12 px-4 py-16">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-bold">Property Summary</h1>
          <p className="text-center text-xl text-gray-600">
            You need to complete your property details before you can proceed,
            Make sure all the details on this page are correct before proceeding
          </p>
        </div>

        {/* Property Images */}
        {propertyImages.length > 0 ? (
          <div className="mx-auto max-w-7xl space-y-4 shadow-xl">
            <PropertyImageGrid images={propertyImages} />
          </div>
        ) : (
          <NoPropertyImages />
        )}

        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Property Profile */}
          <div className="col-span-2 space-y-8">
            {property.address && property.title && property.category ? (
              <PropertyProfile />
            ) : (
              <NoPropertyProfile />
            )}

            {/* {/* Property Amenities */}
            {(property.amenities && property.amenities.length > 0) ||
            (property.custom_amenities &&
              property.custom_amenities.length > 0) ? (
              <PropertyAmenities />
            ) : (
              <NoPropertyAmenities />
            )}

            {/* Property Rules */}
            {(property.rules && property.rules.length > 0) ||
            (property.custom_rules && property.custom_rules.length > 0) ? (
              <PropertyRules />
            ) : (
              <NoPropertyRules />
            )}

            {/* Property Room Types */}
            {rooms && rooms.length > 0 ? (
              <PropertyRoomTypes />
            ) : (
              <NoPropertyRoomTypes />
            )}

            {isMobile &&
              (peakSeasonRates &&
              peakSeasonRates.length &&
              unavailabilities &&
              unavailabilities.length > 0 ? (
                <div className="space-y-8">
                  <PropertyPeakRate />
                  <PropertyUnavailabilities />
                </div>
              ) : (
                <div className="space-y-8">
                  <NoPropertPeakRates />
                  <NoPropertyUnavailabilities />
                </div>
              ))}
          </div>

          <div
            className={`col-span-1 w-full space-y-8 md:self-start lg:sticky lg:top-24 ${isMobile ? "hidden" : ""}`}
          >
            {/* Property Peak Season Rates */}
            {peakSeasonRates && peakSeasonRates.length > 0 ? (
              <PropertyPeakRate />
            ) : (
              <NoPropertPeakRates />
            )}

            {/* Property Unavailabilities */}
            {unavailabilities && unavailabilities.length > 0 ? (
              <PropertyUnavailabilities />
            ) : (
              <NoPropertyUnavailabilities />
            )}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl">
          {/* Property Location */}
          {property.address && property.city && property.country ? (
            <PropertyLocation />
          ) : (
            <NoPropertyLocation />
          )}
        </div>
      </section>

      <section>
        <div
          className={`fixed bottom-0 z-20 w-full space-y-2 border-t-2 bg-white/40 p-4 backdrop-blur-md lg:fixed lg:bottom-0`}
        >
          <PropertyProgressBar />

          <div className="flex justify-between px-6">
            <Link href="/create-property/manage-rooms">
              <Button
                className="p-6 hover:bg-gray-300 hover:shadow-xl"
                variant={"secondary"}
              >
                Back
              </Button>
            </Link>

            <UploadProperty />
          </div>
        </div>
      </section>
    </main>
  );
}

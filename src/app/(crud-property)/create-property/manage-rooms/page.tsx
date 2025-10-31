"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus, Hotel, Bed, Users, LogOut } from "lucide-react";
import CreatePropertyHeader from "../_components/create.property.header";
import Link from "next/link";
import PropertyProgressBar from "../_components/property.progress.bar";
import { useRouter } from "next/navigation";
import { useScrolled } from "@/hooks/use.scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePropertyStore } from "../../_stores/property.store";
import { useRef } from "react";
import PropertyRoomTypes from "./_components/room-types";

export default function Page() {
  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  const { rooms, addRoom } = usePropertyStore();

  let roomCounter = rooms.length;

  const handleAddNewRoom = () => {
    // Create room tempId
    roomCounter += 1;
    const newTempId = `temp-room-${roomCounter}`;

    // add room to store
    addRoom({
      tempId: newTempId,
      name: "",
      description: "",
      base_price: 0,
      max_guest: 2,
      total_units: 1,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      highlight: [],
      custom_highlight: [],
      images: [],
    });

    router.push(
      `/create-property/manage-rooms/title-description?roomId=${newTempId}`
    );
  };

  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-35 min-h-screen space-y-12 px-4 py-16">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-bold">Manage Your Rooms</h1>
          <p className="text-center text-xl text-gray-600">
            Easily view, edit, and organize all your property rooms in one place
            to keep your listings up to date.
          </p>
        </div>

        {rooms.length > 0 && (
          <section className="mx-auto max-w-5xl">
            <PropertyRoomTypes />
          </section>
        )}

        <div className="mx-auto max-w-5xl">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 shadow-xl md:p-12">
            <div className="relative flex flex-col items-center justify-center space-y-4">
              {/* Icon container */}
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-400 opacity-20 blur-xl"></div>
                <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-white shadow-lg">
                  <Hotel className="h-10 w-10 text-indigo-600" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 text-center">
                <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                  Organize Room Types
                </h2>
                <h2 className="md:text-md max-w-md text-sm text-gray-600">
                  Create different room categories to showcase your property's
                  accommodation options
                </h2>
              </div>

              {/* CTA Button */}

              <Button
                onClick={handleAddNewRoom}
                size="lg"
                className="group relative overflow-hidden bg-indigo-600 px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-700 hover:shadow-xl"
              >
                <span className="relative flex items-center gap-2">
                  <CirclePlus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                  Add Room Type
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div
          className={`fixed bottom-0 z-30 w-full space-y-2 border-t-2 bg-white/40 p-4 backdrop-blur-md lg:fixed lg:bottom-0`}
        >
          <PropertyProgressBar />

          <div className="flex justify-between px-6">
            <Button
              className="p-6 shadow-lg"
              variant="outline"
              type="button"
              onClick={() => router.push("/create-property/images")}
            >
              Back
            </Button>

            <div className="space-x-8">
              <Button
                className="bg-red-700 p-6 shadow-lg hover:bg-red-600 disabled:cursor-not-allowed"
                disabled={roomCounter <= 0}
                type="button"
                onClick={() => router.push("/create-property/unavailabilities")}
              >
                Add Room Unavailability
              </Button>
              <Button
                className="bg-amber-600 p-6 shadow-lg hover:bg-amber-500 disabled:cursor-not-allowed"
                disabled={roomCounter <= 0}
                type="button"
                onClick={() => router.push("/create-property/peak-season-rate")}
              >
                Add Peak Season Rates
              </Button>
            </div>

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              disabled={roomCounter <= 0}
              type="submit"
              onClick={() => router.push("/create-property/summary")}
            >
              Go to Summary
              <LogOut className="ml-1 h-4 w-4 stroke-3" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

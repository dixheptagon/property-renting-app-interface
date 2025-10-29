"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus, Hotel, Bed, Users } from "lucide-react";
import CreatePropertyHeader from "../_components/create.property.header";
import Link from "next/link";
import PropertyProgressBar from "../_components/property.progress.bar";
import { useRouter } from "next/navigation";
import { useScrolled } from "@/hooks/use.scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePropertyStore } from "../../_stores/property.store";
import { useRef } from "react";

export default function Page() {
  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  const { rooms, addRoom } = usePropertyStore();

  const roomCounter = useRef(
    rooms.reduce((max, room) => {
      const idNum = parseInt(room.tempId.split("-")[2] || "0");
      return Math.max(max, idNum);
    }, 0)
  );

  const handleAddNewRoom = () => {
    // Create room tempId
    roomCounter.current += 1;
    const newTempId = `temp-room-${roomCounter.current}`;

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

      <section className="mb-20 min-h-screen space-y-12 px-4 py-16 lg:mb-0">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-bold">Manage Your Rooms</h1>
          <p className="text-center text-xl text-gray-600">
            Easily view, edit, and organize all your property rooms in one place
            to keep your listings up to date.
          </p>
        </div>

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
                <span className="relative z-10 flex items-center gap-2">
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
              onClick={() => router.push("/create-property/images")}
            >
              Back
            </Button>

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              disabled
              type="submit"
            >
              Continue
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

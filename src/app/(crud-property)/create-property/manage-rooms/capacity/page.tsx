"use client";

import { useCallback, useState } from "react";
import CreatePropertyHeader from "../../_components/create.property.header";
import { CounterRow } from "./_components/counter.row";
import { useRouter, useSearchParams } from "next/navigation";
import { useScrolled } from "@/hooks/use.scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import RoomProgressBar from "../../_components/room.progress.bar";
import { Button } from "@/components/ui/button";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { toast } from "sonner";

export default function Page() {
  const [guests, setGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  // 1. Get roomId from URL query param
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  // 2. get action for add title and description to room id
  const { rooms, updateRoom } = usePropertyStore();
  const currentRoom = usePropertyStore((state) =>
    state.rooms.find((room) => room.tempId === roomId)
  );

  const handleSubmit = useCallback(
    (values: any) => {
      if (!roomId || !currentRoom) {
        toast.error(`Room id ${roomId} not found, You will be redirected`, {
          duration: 4000,
        });

        setTimeout(() => {
          router.push("/create-property/manage-rooms"); // ganti path sesuai kebutuhan
        }, 4000);

        return;
      }

      updateRoom(roomId, {
        max_guest: guests,
        bedrooms,
        bathrooms,
        beds,
      });

      router.push(`/create-property/manage-rooms/highlight?roomId=${roomId}`);
    },
    [roomId, updateRoom, router, currentRoom, guests, bedrooms, bathrooms, beds]
  );

  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-20 space-y-6 px-4 py-16 lg:mb-0">
        <div className="space-y-3">
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            Set Room Capacity
          </h1>
          <p className="mx-auto max-w-2xl text-center text-base text-gray-600 md:text-lg">
            Define how many guests your room can accommodate and specify the
            number of bedrooms, beds, and bathrooms to help guests understand
            the space better.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-lg shadow-xl">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <CounterRow
              label="Guests"
              value={guests}
              onChange={setGuests}
              min={1}
              max={99}
            />
            <CounterRow
              label="Bedrooms"
              value={bedrooms}
              onChange={setBedrooms}
            />
            <CounterRow label="Beds" value={beds} onChange={setBeds} />
            <CounterRow
              label="Bathrooms"
              value={bathrooms}
              onChange={setBathrooms}
            />
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
          <RoomProgressBar />

          <div className="flex justify-between px-6">
            <Button
              className="p-6 shadow-lg"
              variant="outline"
              type="button"
              onClick={() =>
                router.push("/create-property/manage-rooms/total-units")
              }
            >
              Back
            </Button>

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              type="submit"
              disabled={guests <= 0}
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, DoorOpen } from "lucide-react";
import CreatePropertyHeader from "../../_components/create.property.header";
import { useRouter, useSearchParams } from "next/navigation";
import RoomProgressBar from "../../_components/room.progress.bar";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const [totalUnits, setTotalUnits] = useState(1);

  // 1. Get roomId from URL query param
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  // 2. get action for add title and description to room id
  const { rooms, updateRoom } = usePropertyStore();
  const currentRoom = usePropertyStore((state) =>
    state.rooms.find((room) => room.tempId === roomId)
  );

  // set reinitial total units if current room has total units
  useEffect(() => {
    if (currentRoom?.total_units) {
      setTotalUnits(currentRoom.total_units);
    } else {
      setTotalUnits(1);
    }
  }, [currentRoom]);

  const handleDecrement = () => {
    if (totalUnits > 1) setTotalUnits(totalUnits - 1);
  };

  const handleIncrement = () => {
    if (totalUnits < 99) setTotalUnits(totalUnits + 1);
  };

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
        total_units: totalUnits,
      });

      router.push(`/create-property/manage-rooms/capacity?roomId=${roomId}`);
    },
    [roomId, updateRoom, router, currentRoom, totalUnits]
  );

  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-30 space-y-6 px-4 py-16">
        <div className="space-y-3">
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            Set Total Units of {currentRoom?.name}
          </h1>
          <p className="mx-auto max-w-2xl text-center text-base text-gray-600 md:text-lg">
            Specify the total number of units for this room to help guests find
            the right accommodation.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 shadow-xl">
            <div className="relative space-y-4">
              {/* Icon header */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-400 opacity-30 blur-xl"></div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg md:h-20 md:w-20">
                    <DoorOpen className="h-8 w-8 text-indigo-600 md:h-10 md:w-10" />
                  </div>
                </div>
              </div>

              {/* Counter section */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-12">
                  <Button
                    onClick={handleDecrement}
                    disabled={totalUnits <= 1}
                    className="group h-16 w-16 rounded-full bg-white p-0 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 md:h-20 md:w-20 lg:h-24 lg:w-24"
                  >
                    <Minus className="h-6 w-6 stroke-[3] text-indigo-600 transition-transform group-hover:scale-110 md:h-8 md:w-8 lg:h-10 lg:w-10" />
                  </Button>

                  <div className="relative min-w-[120px] md:min-w-[160px] lg:min-w-[200px]">
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-50 blur-md"></div>
                    <div className="relative rounded-2xl bg-white px-8 py-6 shadow-lg md:px-10 md:py-8 lg:px-12 lg:py-10">
                      <span className="block text-center text-5xl font-bold text-indigo-600 transition-all duration-300 md:text-6xl lg:text-7xl">
                        {totalUnits}
                      </span>
                      <span className="mt-2 block text-center text-sm font-medium text-gray-600 md:text-base">
                        {totalUnits === 1 ? "Unit" : "Units"}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleIncrement}
                    disabled={totalUnits >= 99}
                    className="group h-16 w-16 rounded-full bg-indigo-600 p-0 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-indigo-700 hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 md:h-20 md:w-20 lg:h-24 lg:w-24"
                  >
                    <Plus className="h-6 w-6 stroke-[3] text-white transition-transform group-hover:scale-110 md:h-8 md:w-8 lg:h-10 lg:w-10" />
                  </Button>
                </div>

                {/* Helper text */}
                <div className="rounded-lg bg-blue-100/50 px-4 py-3 backdrop-blur-sm md:px-6 md:py-4">
                  <p className="text-center text-xs text-gray-700 md:text-sm">
                    💡 <span className="font-medium">Tip:</span> You can adjust
                    the number of units anytime from your dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  `/create-property/manage-rooms/title-description?roomId=${roomId}`
                )
              }
            >
              Back
            </Button>

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              type="submit"
              disabled={totalUnits <= 0}
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

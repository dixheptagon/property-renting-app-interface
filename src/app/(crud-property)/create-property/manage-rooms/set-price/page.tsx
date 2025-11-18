"use client";

import { Input } from "@/components/ui/input";
import CreatePropertyHeader from "../../_components/create.property.header";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { RoomValidationSchema } from "@/app/(crud-property)/_validations/room.validation.schema";
import { useRouter, useSearchParams } from "next/navigation";

import RoomProgressBar from "../../_components/room.progress.bar";
import { Button } from "@/components/ui/button";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { toast } from "sonner";
import { formatToIDR } from "../_utils/format.price.idr";

export default function Page() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();

      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }, []);

  // 1. Get roomId from URL query param
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  // 2. get action for add title and description to room id
  const { rooms, updateRoom } = usePropertyStore();
  const currentRoom = usePropertyStore((state) =>
    state.rooms.find((room) => room.tempId === roomId)
  );

  const validationSchema = RoomValidationSchema.pick(["base_price"]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      base_price: currentRoom?.base_price || 100000,
    },
    validationSchema,
    onSubmit: (values) => {
      if (!roomId || !currentRoom) {
        toast.error(`Room id ${roomId} not found, You will be redirected`, {
          duration: 4000,
        });

        setTimeout(() => {
          router.push("/create-property/manage-rooms");
        }, 4000);

        return;
      }

      updateRoom(roomId, {
        base_price: values.base_price,
      });
      router.push(`/create-property/manage-rooms`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    formik.setFieldValue("base_price", Number(rawValue) || 0);
  };

  return (
    <main>
      <CreatePropertyHeader />

      <form onSubmit={formik.handleSubmit}>
        {/* Header */}
        <section className="mb-20 min-h-screen space-y-12 px-4 py-16 lg:mb-0">
          <div className="space-y-2">
            <h1 className="text-center text-3xl font-bold">
              Set your room price
            </h1>
            <p className="text-center text-xl text-gray-600">
              Decide how much guests will pay per night. You can always adjust
              your price later based on demand or season.
            </p>
            <p className="mt-4 text-center text-lg text-gray-700">
              <span className="rounded-lg bg-blue-100 p-2 font-semibold">
                💡 Tip: Boost your earnings by setting a peak season rate next!
              </span>
            </p>
          </div>

          {/* Room Price */}
          <div className="mx-auto mt-15 max-w-2xl font-semibold">
            <Input
              ref={inputRef}
              id="base_price"
              name="base_price"
              type="text"
              value={formatToIDR(formik.values.base_price)}
              onChange={handleChange}
              className={`py-20 pl-6 text-7xl ${
                formik.touched.base_price && formik.errors.base_price
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
              placeholder="Rp 0"
            />

            {formik.touched.base_price && formik.errors.base_price && (
              <p className="text-md mt-1 text-red-500">
                {formik.errors.base_price}
              </p>
            )}
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
                    `/create-property/manage-rooms/images?roomId=${roomId}`
                  )
                }
              >
                Back
              </Button>

              <Button
                className="p-6 shadow-lg hover:bg-blue-700"
                type="submit"
                disabled={!formik.values.base_price}
              >
                Continue
              </Button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}

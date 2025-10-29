"use client";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { PropertyValidationSchema } from "@/app/(crud-property)/_validations/property.validation.schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrolled } from "@/hooks/use.scrolled";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import CreatePropertyHeader from "../../_components/create.property.header";
import { Formik } from "formik";
import { TitleField } from "./_components/title.field";
import { DescriptionField } from "./_components/description.field";
import { Button } from "@/components/ui/button";
import RoomProgressBar from "../../_components/room.progress.bar";
import { toast } from "sonner";

export default function Page() {
  const validationSchema = PropertyValidationSchema.pick([
    "title",
    "description",
  ]);

  const TITLE_MAX_LENGTH = 50;
  const DESCRIPTION_MAX_LENGTH = 1000;

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
        name: values.title,
        description: values.description,
      });

      router.push(`/create-property/manage-rooms/total-units?roomId=${roomId}`);
    },
    [roomId, updateRoom, router, currentRoom]
  );

  return (
    <main>
      <CreatePropertyHeader />

      <Formik
        enableReinitialize
        initialValues={{
          title: currentRoom?.name || "",
          description: currentRoom?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <section className="mb-20 min-h-screen space-y-12 px-4 py-16 lg:mb-0">
              <div className="space-y-2">
                <h1 className="text-center text-3xl font-bold">
                  Now, describe your room title and description
                </h1>
                <p className="text-center text-xl text-gray-600">
                  Short titles work best. Have fun with it—you can always change
                  it later.
                </p>
              </div>

              <div className="mx-auto max-w-4xl space-y-2 font-semibold">
                <TitleField
                  formik={formik}
                  TITLE_MAX_LENGTH={TITLE_MAX_LENGTH}
                />
                <DescriptionField
                  formik={formik}
                  DESCRIPTION_MAX_LENGTH={DESCRIPTION_MAX_LENGTH}
                />
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
                    onClick={() => router.push("/create-property/manage-rooms")}
                  >
                    Back
                  </Button>

                  <Button
                    className="p-6 shadow-lg hover:bg-blue-700"
                    type="submit"
                    disabled={
                      !formik.values.title || !formik.values.description
                    }
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </section>
          </form>
        )}
      </Formik>
    </main>
  );
}

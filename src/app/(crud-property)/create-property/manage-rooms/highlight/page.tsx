"use client";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { RoomValidationSchema } from "@/app/(crud-property)/_validations/room.validation.schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrolled } from "@/hooks/use.scrolled";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import CreatePropertyHeader from "../../_components/create.property.header";
import { roomHighlights } from "./_constant/room.higlights";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCheck, CirclePlus, X } from "lucide-react";
import RoomProgressBar from "../../_components/room.progress.bar";

export default function Page() {
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

  // 3. Manage Rooms Validation Schema
  const validationSchema = RoomValidationSchema.pick([
    "highlight",
    "custom_highlight",
  ]);

  // ✅ Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      highlight: currentRoom?.highlight || [],
      custom_highlight: currentRoom?.custom_highlight || [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);

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
        highlight: values.highlight,
        custom_highlight: values.custom_highlight,
      });
      //   router.push(`/create-property/manage-rooms/images?roomId=${roomId}`);
    },
  });

  //  Toggle highlight selection
  const handleToggleHighlight = (value: string) => {
    const selected = formik.values.highlight.includes(value)
      ? formik.values.highlight.filter((v: string) => v !== value)
      : [...formik.values.highlight, value];
    formik.setFieldValue("highlight", selected);
  };

  //  Add custom highlight
  const handleAddCustomHighlight = () => {
    const input = document.querySelector(
      'input[placeholder="Enter highlight name"]'
    ) as HTMLInputElement;
    if (input && input.value.trim()) {
      const newHighlight = input.value.trim();
      if (!formik.values.custom_highlight.includes(newHighlight)) {
        const updated = [...formik.values.custom_highlight, newHighlight];
        formik.setFieldValue("custom_highlight", updated);
        input.value = "";
      }
    }
  };

  //  Remove custom highlight
  const handleRemoveCustomHighlight = (highlight: string) => {
    const updated = formik.values.custom_highlight.filter(
      (a: string) => a !== highlight
    );
    formik.setFieldValue("custom_highlight", updated);
  };

  return (
    <main>
      <CreatePropertyHeader />

      <form onSubmit={formik.handleSubmit}>
        <section className="mb-32 px-4 py-16 sm:py-12">
          {/* Header */}
          <div className="mx-auto mb-8 max-w-4xl space-y-3 text-center sm:mb-12">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              Highlight Your Room&apos;s Best Features
            </h1>
            <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
              Highlight the best parts of your room — the comfy bed, great
              lighting, or amazing view. Let guests know why they&apos;ll love
              staying here!
            </p>
          </div>

          {/* Highlights Sections */}
          <div className="mx-auto max-w-4xl space-y-8">
            {roomHighlights.map(({ category, items }) => (
              <div key={category} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 capitalize sm:text-xl">
                  {category.replace("_", " ")}
                </h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
                  {items.map(({ icon: Icon, label, value }) => {
                    const isSelected = formik.values.highlight.includes(value);
                    return (
                      <div
                        key={value}
                        onClick={() => handleToggleHighlight(value)}
                        className={`group cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg sm:p-5 lg:p-6 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex flex-col items-start space-y-2 sm:space-y-3">
                          <Icon
                            className={`h-8 w-8 transition-colors ${
                              isSelected
                                ? "text-blue-600"
                                : "text-gray-700 group-hover:text-blue-600"
                            }`}
                          />
                          <h3 className="text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">
                            {label}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Error message */}
          {formik.touched.highlight && formik.errors.highlight && (
            <p className="mt-6 text-center text-sm text-red-600 sm:text-base">
              {typeof formik.errors.highlight === "string"
                ? formik.errors.highlight
                : "Please select at least one highlight."}
            </p>
          )}

          <div className="relative mx-auto mt-8 max-w-4xl space-y-4 font-semibold">
            <Label className="text-lg font-semibold text-gray-800 capitalize sm:text-xl">
              Add a custom highlight
            </Label>

            <Input
              type="text"
              placeholder="Enter highlight name"
              className="py-6 pr-25"
              maxLength={50}
            />

            <Button
              variant={"outline"}
              className="absolute top-13 right-3 border-2"
              onClick={handleAddCustomHighlight}
              type="button"
            >
              <CirclePlus className="h-6 w-6" />
              Add
            </Button>

            {/* Display custom highlights */}
            {formik.values.custom_highlight.length > 0 && (
              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-700">
                  Custom Highlights:
                </Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
                  {formik.values.custom_highlight.map((highlight: string) => (
                    <div
                      key={highlight}
                      className="relative rounded-xl border-2 border-blue-500 bg-blue-50 p-4 shadow-md sm:p-5 lg:p-6"
                    >
                      <div className="flex flex-col items-start space-y-2 overflow-x-hidden sm:space-y-3">
                        <CheckCheck className="h-8 w-8 text-blue-600" />
                        <h3 className="text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">
                          {highlight}
                        </h3>

                        <Button
                          type="button"
                          variant={"link"}
                          onClick={() => handleRemoveCustomHighlight(highlight)}
                          className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-5 w-5 stroke-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom highlight error */}
            {formik.touched.custom_highlight &&
              formik.errors.custom_highlight && (
                <p className="text-sm text-red-600">
                  {Array.isArray(formik.errors.custom_highlight)
                    ? formik.errors.custom_highlight.join(", ")
                    : formik.errors.custom_highlight}
                </p>
              )}
          </div>
        </section>

        {/* Footer navigation */}
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
                onClick={() => router.push("/create-property/map-spot")}
              >
                Back
              </Button>

              <Button
                className="p-6 shadow-lg hover:bg-blue-700"
                type="submit"
                disabled={
                  formik.values.highlight.length === 0 &&
                  formik.values.custom_highlight.length === 0
                }
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

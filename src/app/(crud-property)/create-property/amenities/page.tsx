"use client";
import { Button } from "@/components/ui/button";
import CreatePropertyHeader from "../_components/create.property.header";
import PropertyProgressBar from "../_components/property.progress.bar";
import { useRouter } from "next/navigation";
import { useScrolled } from "@/hooks/use.scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePropertyStore } from "../../_stores/property.store";
import { useFormik } from "formik";
import { PropertyValidationSchema } from "../../_validations/property.validation.schema";
import { propertyAmenities } from "./_constant/property.amenities";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CirclePlus, ListCheck, X } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();
  const { property, setPropertyData } = usePropertyStore();

  const validationSchema = PropertyValidationSchema.pick([
    "amenities",
    "custom_amenities",
  ]);

  // ✅ Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amenities: property.amenities || [],
      custom_amenities: property.custom_amenities || [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setPropertyData({
        amenities: values.amenities,
        custom_amenities: values.custom_amenities,
      });
      router.push("/create-property/rules");
    },
  });

  //  Toggle amenity selection
  const handleToggleAmenity = (value: string) => {
    const selected = formik.values.amenities.includes(value)
      ? formik.values.amenities.filter((v: string) => v !== value)
      : [...formik.values.amenities, value];
    formik.setFieldValue("amenities", selected);
  };

  //  Add custom amenity
  const handleAddCustomAmenity = () => {
    const input = document.querySelector(
      'input[placeholder="Enter amenity name"]'
    ) as HTMLInputElement;
    if (input && input.value.trim()) {
      const newAmenity = input.value.trim();
      if (!formik.values.custom_amenities.includes(newAmenity)) {
        const updated = [...formik.values.custom_amenities, newAmenity];
        formik.setFieldValue("custom_amenities", updated);
        input.value = "";
      }
    }
  };

  //  Remove custom amenity
  const handleRemoveCustomAmenity = (amenity: string) => {
    const updated = formik.values.custom_amenities.filter(
      (a: string) => a !== amenity
    );
    formik.setFieldValue("custom_amenities", updated);
  };

  return (
    <main>
      <CreatePropertyHeader />

      <form onSubmit={formik.handleSubmit}>
        <section className="mb-32 px-4 py-16 sm:py-12">
          {/* Header */}
          <div className="mx-auto mb-8 max-w-4xl space-y-3 text-center sm:mb-12">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              Tell guests what your place offers
            </h1>
            <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
              Add the amenities that make your property stand out.
            </p>
          </div>

          {/* Amenities Sections */}
          <div className="mx-auto max-w-4xl space-y-8">
            {propertyAmenities.map(({ category, items }) => (
              <div key={category} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 capitalize sm:text-xl">
                  {category.replace("_", " ")}
                </h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
                  {items.map(({ icon: Icon, label, value }) => {
                    const isSelected = formik.values.amenities.includes(value);
                    return (
                      <div
                        key={value}
                        onClick={() => handleToggleAmenity(value)}
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
          {formik.touched.amenities && formik.errors.amenities && (
            <p className="mt-6 text-center text-sm text-red-600 sm:text-base">
              {typeof formik.errors.amenities === "string"
                ? formik.errors.amenities
                : "Please select at least one amenity."}
            </p>
          )}

          <div className="relative mx-auto mt-8 max-w-4xl space-y-4 font-semibold">
            <Label className="text-lg font-semibold text-gray-800 capitalize sm:text-xl">
              Add a custom amenity
            </Label>

            <Input
              type="text"
              placeholder="Enter amenity name"
              className="py-6 pr-25"
              maxLength={50}
            />

            <Button
              variant={"outline"}
              className="absolute top-13 right-3 border-2"
              onClick={handleAddCustomAmenity}
              type="button"
            >
              <CirclePlus className="h-6 w-6" />
              Add
            </Button>

            {/* Display custom amenities */}
            {formik.values.custom_amenities.length > 0 && (
              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-700">
                  Custom Amenities:
                </Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
                  {formik.values.custom_amenities.map((amenity: string) => (
                    <div
                      key={amenity}
                      className="relative rounded-xl border-2 border-blue-500 bg-blue-50 p-4 shadow-md sm:p-5 lg:p-6"
                    >
                      <div className="flex flex-col items-start space-y-2 overflow-x-hidden sm:space-y-3">
                        <ListCheck className="h-8 w-8 text-blue-600" />
                        <h3 className="text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">
                          {amenity}
                        </h3>

                        <Button
                          type="button"
                          variant={"link"}
                          onClick={() => handleRemoveCustomAmenity(amenity)}
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

            {/* Custom amenities error */}
            {formik.touched.custom_amenities &&
              formik.errors.custom_amenities && (
                <p className="text-sm text-red-600">
                  {Array.isArray(formik.errors.custom_amenities)
                    ? formik.errors.custom_amenities.join(", ")
                    : formik.errors.custom_amenities}
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
            <PropertyProgressBar />

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
                  formik.values.amenities.length === 0 &&
                  formik.values.custom_amenities.length === 0
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

"use client";
import { Bed, Building, Building2, House } from "lucide-react";
import CreatePropertyHeader from "../_components/create.property.header";
import PropertyProgressBar from "../_components/property.progress.bar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useScrolled } from "@/hooks/use.scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePropertyStore } from "../../_stores/property.store";
import { PropertyValidationSchema } from "../../_validations/property.validation.schema";
import { useFormik } from "formik";

export default function Page() {
  const categories = [
    { icon: Building, label: "Apartment", value: "apartment" },
    { icon: Building2, label: "Hotel", value: "hotel" },
    { icon: House, label: "Guesthouse", value: "guesthouse" },
    { icon: Bed, label: "Room", value: "room" },
  ];

  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  const { property, setPropertyData } = usePropertyStore();

  const validationSchema = PropertyValidationSchema.pick(["category"]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: property.category || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setPropertyData({ category: values.category });
      router.push("/create-property/title-description");
    },
  });

  return (
    <main>
      <CreatePropertyHeader />

      <form onSubmit={formik.handleSubmit}>
        <section className="min-h-screen space-y-12 px-4 py-16">
          <h1 className="text-center text-3xl font-bold">
            Which of these best describes your place?
          </h1>

          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6">
            {categories.map(({ icon: Icon, label, value }) => (
              <div
                key={value}
                className={`cursor-pointer rounded-lg border-2 p-6 shadow-lg transition-colors duration-300 hover:bg-gray-100 ${
                  formik.values.category === value
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => formik.setFieldValue("category", value)}
              >
                <Icon className="h-12 w-12" />
                <h3 className="text-2xl font-semibold">{label}</h3>
              </div>
            ))}
          </div>

          {/* Error message */}
          {formik.touched.category && formik.errors.category && (
            <p className="mt-2 text-center text-lg text-red-500">
              {formik.errors.category}
            </p>
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
                onClick={() => router.push("/create-property/guidelines")}
              >
                Back
              </Button>

              <Button
                className="p-6 shadow-lg hover:bg-blue-700"
                type="submit"
                disabled={!formik.values.category}
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

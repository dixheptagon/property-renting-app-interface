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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CirclePlus, ListCheck, TriangleAlert, X } from "lucide-react";
import { propertyRules } from "./_constant/propety.rules";

export default function Page() {
  const router = useRouter();

  const { property, setPropertyData } = usePropertyStore();

  const validationSchema = PropertyValidationSchema.pick([
    "rules",
    "custom_rules",
  ]);

  // ✅ Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rules: property.rules || [],
      custom_rules: property.custom_rules || [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setPropertyData({
        rules: values.rules,
        custom_rules: values.custom_rules,
      });
      router.push("/create-property/images");
    },
  });

  //  Toggle Rules selection
  const handleToggleRules = (value: string) => {
    const selected = formik.values.rules.includes(value)
      ? formik.values.rules.filter((v: string) => v !== value)
      : [...formik.values.rules, value];
    formik.setFieldValue("rules", selected);
  };

  //  Add custom Rule
  const handleAddCustomRules = () => {
    const input = document.querySelector(
      'input[placeholder="Enter rule name"]'
    ) as HTMLInputElement;
    if (input && input.value.trim()) {
      const newRule = input.value.trim();
      if (!formik.values.custom_rules.includes(newRule)) {
        const updated = [...formik.values.custom_rules, newRule];
        formik.setFieldValue("custom_rules", updated);
        input.value = "";
      }
    }
  };

  //  Remove custom rule
  const handleRemoveCustomRules = (rule: string) => {
    const updated = formik.values.custom_rules.filter(
      (a: string) => a !== rule
    );
    formik.setFieldValue("custom_rules", updated);
  };

  return (
    <main>
      <CreatePropertyHeader />

      <form onSubmit={formik.handleSubmit}>
        <section className="mb-32 px-4 py-16 sm:py-12">
          {/* Header */}
          <div className="mx-auto mb-8 max-w-4xl space-y-3 text-center sm:mb-12">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              Set Clear Rules for Your Guests
            </h1>
            <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
              Ensure a comfortable and respectful experience for everyone by
              outlining your property rules.
            </p>
          </div>

          {/* Amenities Sections */}
          <div className="mx-auto max-w-4xl space-y-8">
            {propertyRules.map(({ category, items }) => (
              <div key={category} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 capitalize sm:text-xl">
                  {category.replace("_", " ")}
                </h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
                  {items.map(({ icon: Icon, label, value }) => {
                    const isSelected = formik.values.rules.includes(value);
                    return (
                      <div
                        key={value}
                        onClick={() => handleToggleRules(value)}
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
          {formik.touched.rules && formik.errors.rules && (
            <p className="mt-6 text-center text-sm text-red-600 sm:text-base">
              {typeof formik.errors.rules === "string"
                ? formik.errors.rules
                : "Please select at least one rule."}
            </p>
          )}

          <div className="relative mx-auto mt-8 max-w-4xl space-y-4 font-semibold">
            <Label className="text-lg font-semibold text-gray-800 capitalize sm:text-xl">
              Add custom rules
            </Label>

            <Input
              type="text"
              placeholder="Enter rule name"
              className="py-6 pr-25"
              maxLength={50}
            />

            <Button
              variant={"outline"}
              className="absolute top-13 right-3 border-2"
              onClick={handleAddCustomRules}
              type="button"
            >
              <CirclePlus className="h-6 w-6" />
              Add
            </Button>

            {/* Display custom rules */}
            {formik.values.custom_rules.length > 0 && (
              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-700">
                  Custom Rules:
                </Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
                  {formik.values.custom_rules.map((rule: string) => (
                    <div
                      key={rule}
                      className="relative rounded-xl border-2 border-blue-500 bg-blue-50 p-4 shadow-md sm:p-5 lg:p-6"
                    >
                      <div className="flex flex-col items-start space-y-2 overflow-x-hidden sm:space-y-3">
                        <TriangleAlert className="h-8 w-8 text-blue-600" />
                        <h3 className="text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">
                          {rule}
                        </h3>

                        <Button
                          type="button"
                          variant={"link"}
                          onClick={() => handleRemoveCustomRules(rule)}
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
            {formik.touched.custom_rules && formik.errors.custom_rules && (
              <p className="text-sm text-red-600">
                {Array.isArray(formik.errors.custom_rules)
                  ? formik.errors.custom_rules.join(", ")
                  : formik.errors.custom_rules}
              </p>
            )}
          </div>
        </section>

        {/* Footer navigation */}
        <section>
          <div
            className={`fixed bottom-0 w-full space-y-2 border-t-2 bg-white/40 p-4 backdrop-blur-md lg:fixed lg:bottom-0`}
          >
            <PropertyProgressBar />

            <div className="flex justify-between px-6">
              <Button
                className="p-6 shadow-lg"
                variant="outline"
                type="button"
                onClick={() => router.push("/create-property/amenities")}
              >
                Back
              </Button>

              <Button
                className="p-6 shadow-lg hover:bg-blue-700"
                type="submit"
                disabled={
                  formik.values.rules.length === 0 &&
                  formik.values.custom_rules.length === 0
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

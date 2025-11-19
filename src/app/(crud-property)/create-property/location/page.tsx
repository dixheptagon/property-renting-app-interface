"use client";

import { Button } from "@/components/ui/button";
import CreatePropertyHeader from "../_components/create.property.header";
import PropertyProgressBar from "../_components/property.progress.bar";
import { useRouter } from "next/navigation";
import SelectCountry from "./_components/select.country";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { PropertyValidationSchema } from "../../_validations/property.validation.schema";
import { usePropertyStore } from "../../_stores/property.store";

export default function Page() {
  const router = useRouter();

  const { property, setPropertyData } = usePropertyStore();

  const validationSchema = PropertyValidationSchema.pick([
    "country",
    "city",
    "address",
    "postal_code",
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      country: property.country || "",
      city: property.city || "",
      address: property.address || "",
      postal_code: property.postal_code || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setPropertyData(values);
      router.push("/create-property/map-spot");
    },
  });

  const handleCountryChange = (country: string) => {
    formik.setFieldValue("country", country);
  };

  return (
    <main>
      <CreatePropertyHeader />

      <form onSubmit={formik.handleSubmit}>
        <section className="mb-20 min-h-screen space-y-12 px-4 py-16">
          <div className="space-y-2">
            <h1 className="text-center text-3xl font-bold">
              Where&apos;s your place located?
            </h1>
            <p className="text-center text-xl text-gray-600">
              Be as accurate as possible so guests can find your place without
              confusion.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-2 font-semibold">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Country / region</Label>
              <SelectCountry
                selectedCountry={formik.values.country}
                setSelectedCountry={handleCountryChange}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold">City</Label>
              <Input
                className="py-6"
                type="text"
                placeholder="Type your city here"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="text-sm text-red-500">{formik.errors.city}</p>
              )}
            </div>

            <div>
              <Label className="text-lg font-semibold">Address</Label>
              <Input
                className="py-6"
                type="text"
                placeholder="Type your address here"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-sm text-red-500">{formik.errors.address}</p>
              )}
            </div>

            <div>
              <Label className="text-lg font-semibold">Postal code </Label>
              <Input
                className="py-6"
                type="number"
                placeholder="Type your postal code here"
                name="postal_code"
                value={formik.values.postal_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.postal_code && formik.errors.postal_code && (
                <p className="text-sm text-red-500">
                  {formik.errors.postal_code}
                </p>
              )}
            </div>
          </div>
        </section>

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
                onClick={() =>
                  router.push("/create-property/title-description")
                }
              >
                Back
              </Button>

              <Button
                className="p-6 shadow-lg hover:bg-blue-700"
                type="submit"
                disabled={
                  !formik.values.country ||
                  !formik.values.city ||
                  !formik.values.address ||
                  !formik.values.postal_code
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

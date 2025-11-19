"use client";

import CreatePropertyHeader from "../_components/create.property.header";
import { Formik } from "formik";
import { PropertyValidationSchema } from "../../_validations/property.validation.schema";
import { useRouter } from "next/navigation";

import PropertyProgressBar from "../_components/property.progress.bar";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { TitleField } from "./_components/title.field";
import { DescriptionField } from "./_components/description.field";
import { usePropertyStore } from "../../_stores/property.store";

export default function Page() {
  const validationSchema = PropertyValidationSchema.pick([
    "title",
    "description",
  ]);

  const TITLE_MAX_LENGTH = 50;
  const DESCRIPTION_MAX_LENGTH = 1500;

  const router = useRouter();
  const { property, setPropertyData } = usePropertyStore();

  const handleSubmit = useCallback(
    (values: { title: string; description: string }) => {
      setPropertyData({ title: values.title, description: values.description });
      router.push("/create-property/location");
    },
    [router, setPropertyData]
  );

  return (
    <main>
      <CreatePropertyHeader />

      <Formik
        enableReinitialize
        initialValues={{
          title: property.title || "",
          description: property.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <section className="mb-30 min-h-screen space-y-12 px-4 py-16">
              <div className="space-y-2">
                <h1 className="text-center text-3xl font-bold">
                  Now, describe your property title and description
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
                className={`fixed bottom-0 w-full space-y-2 border-t-2 bg-white/40 p-4 backdrop-blur-md lg:fixed lg:bottom-0`}
              >
                <PropertyProgressBar />

                <div className="flex justify-between px-6">
                  <Button
                    className="p-6 shadow-lg"
                    variant="outline"
                    type="button"
                    onClick={() =>
                      router.push("/create-property/select-category")
                    }
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

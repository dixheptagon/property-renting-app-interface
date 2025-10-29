// Memoized Title Field Component to prevent unnecessary re-renders

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FastField } from "formik";
import { memo, useMemo } from "react";

// Uses FastField for isolated re-renders and memo for component-level optimization
export const TitleField = memo(
  ({ formik, TITLE_MAX_LENGTH }: { formik: any; TITLE_MAX_LENGTH: number }) => {
    const errorMessage = useMemo(() => {
      return formik.touched.title && formik.errors.title ? (
        <p className="text-red-500">{formik.errors.title}</p>
      ) : (
        <p className="invisible">placeholder</p>
      );
    }, [formik.touched.title, formik.errors.title]);

    const charCounter = useMemo(
      () => (
        <div className="text-sm text-gray-500">
          {formik.values.title.length}/{TITLE_MAX_LENGTH}
        </div>
      ),
      [formik.values.title.length, TITLE_MAX_LENGTH]
    );

    return (
      <div className="space-y-2">
        <Label className="text-xl">Title</Label>
        <FastField name="title">
          {({ field, meta }: any) => (
            <Input
              {...field}
              maxLength={TITLE_MAX_LENGTH}
              type="text"
              placeholder="Type property title here"
              className="p-6"
            />
          )}
        </FastField>

        <div className="flex items-center justify-between text-sm">
          {errorMessage}
          {charCounter}
        </div>
      </div>
    );
  }
);

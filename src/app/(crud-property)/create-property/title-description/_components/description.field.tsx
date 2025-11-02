// Memoized Description Field Component to prevent unnecessary re-renders

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FastField } from "formik";
import { memo, useMemo } from "react";

// Uses FastField for isolated re-renders and memo for component-level optimization
export const DescriptionField = memo(
  ({
    formik,
    DESCRIPTION_MAX_LENGTH,
  }: {
    formik: any;
    DESCRIPTION_MAX_LENGTH: number;
  }) => {
    const errorMessage = useMemo(() => {
      return formik.touched.description && formik.errors.description ? (
        <p className="text-red-500">{formik.errors.description}</p>
      ) : (
        <p className="invisible">placeholder</p>
      );
    }, [formik.touched.description, formik.errors.description]);

    const charCounter = useMemo(
      () => (
        <div className="text-sm text-gray-500">
          {formik.values.description.length}/{DESCRIPTION_MAX_LENGTH}
        </div>
      ),
      [formik.values.description.length, DESCRIPTION_MAX_LENGTH]
    );

    return (
      <div className="space-y-2">
        <Label className="text-xl">Description</Label>
        <FastField name="description">
          {({ field, meta }: any) => (
            <Textarea
              {...field}
              maxLength={DESCRIPTION_MAX_LENGTH}
              placeholder="Type property description here"
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

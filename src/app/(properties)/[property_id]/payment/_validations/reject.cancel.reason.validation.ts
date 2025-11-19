import * as Yup from "yup";

export const rejectReasonValidationSchema = Yup.object().shape({
  reason: Yup.string()
    .required("Reason is required")
    .min(10, "Reason must be at least 10 characters long")
    .max(500, "Reason cannot exceed 500 characters")
    .trim("Reason cannot be just whitespace")
    .matches(
      /^[a-zA-Z0-9\s.,!?-]+$/,
      "Reason can only contain letters, numbers, spaces, and basic punctuation"
    ),
});

export const cancelReasonValidationSchema = Yup.object().shape({
  reason: Yup.string()
    .required("Reason is required")
    .min(10, "Reason must be at least 10 characters long")
    .max(500, "Reason cannot exceed 500 characters")
    .trim("Reason cannot be just whitespace")
    .matches(
      /^[a-zA-Z0-9\s.,!?-]+$/,
      "Reason can only contain letters, numbers, spaces, and basic punctuation"
    ),
});

export type RejectCancelReasonFormValues = Yup.InferType<
  typeof rejectReasonValidationSchema
>;

export type CancelReasonFormValues = Yup.InferType<
  typeof cancelReasonValidationSchema
>;

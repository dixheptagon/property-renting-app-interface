import * as Yup from "yup";

export const UploadPaymentProofValidationSchema = Yup.object({
  paymentProof: Yup.mixed()
    .required("Payment proof is required")
    .test(
      "fileSize",
      "File size must be maximum 1MB",
      (value) => !value || (value instanceof File && value.size <= 1048576)
    )
    .test(
      "fileType",
      "File format must be JPG, JPEG, or PNG",
      (value) =>
        !value ||
        (value instanceof File &&
          ["image/jpeg", "image/jpg", "image/png"].includes(value.type))
    ),
});

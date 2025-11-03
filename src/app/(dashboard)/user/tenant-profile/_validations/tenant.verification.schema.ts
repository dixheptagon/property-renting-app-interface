import * as Yup from "yup";

const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International phone number regex

export const TenantVerificationSchema = Yup.object({
  contact: Yup.string()
    .required("Contact number is required")
    .matches(phoneRegex, "Invalid phone number format")
    .min(7, "Phone number must be at least 7 characters")
    .max(20, "Phone number must be at most 20 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must not exceed 255 characters"),
  city: Yup.string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(100, "City must not exceed 100 characters"),
  country: Yup.string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must not exceed 100 characters"),
  government_id_type: Yup.string()
    .required("Government ID type is required")
    .oneOf(
      ["KTP", "Passport", "Driver's License"],
      "Invalid government ID type"
    ),
  government_id_file: Yup.mixed()
    .required("Government ID file is required")
    .test(
      "fileSize",
      "File size must be maximum 1MB",
      (value) =>
        !value || (value instanceof File && value.size <= 1 * 1024 * 1024) // 1MB
    )
    .test(
      "fileType",
      "File format must be JPEG, PNG, JPG, AVIF, or WebP",
      (value) =>
        !value ||
        (value instanceof File &&
          [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/avif",
            "image/webp",
          ].includes(value.type))
    ),
});

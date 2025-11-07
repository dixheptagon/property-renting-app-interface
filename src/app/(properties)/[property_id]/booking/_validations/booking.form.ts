import * as Yup from "yup";

export const BookingFormValidationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only alphabets allowed (A-Z), without special characters"
    )
    .min(3, "Full name must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  countryCode: Yup.string().required("Country code is required"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^\+?[0-9]+$/, "Mobile number must contain only digits")
    .min(7, "Mobile number must be at least 7 digits")
    .max(15, "Mobile number must not exceed 15 digits"),
});

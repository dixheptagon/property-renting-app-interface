import * as Yup from "yup";

export const OTPValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "Verification code must be 6 digits")
    .matches(/^\d+$/, "Only numbers are allowed")
    .required("Verification code is required"),
});

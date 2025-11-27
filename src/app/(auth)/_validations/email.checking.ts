import * as Yup from "yup";

export const EmailCheckingValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});

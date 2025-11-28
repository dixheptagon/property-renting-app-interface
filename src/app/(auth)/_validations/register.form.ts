import * as Yup from "yup";

export const RegisterFormValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed (A-Z)"),
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed (A-Z)"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]|;:'",.<>/?`~\\]).{8,}$/,
      "Password must contain at least one letter, one number, and one special charater"
    ),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

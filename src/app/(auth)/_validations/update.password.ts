import * as Yup from "yup";

export const UpdatePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required("Current password is required"),
  new_password: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain at least one letter and one number"
    ),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});

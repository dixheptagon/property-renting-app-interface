import * as Yup from "yup";

// Validation schema
const reviewSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .required("Rating is required"),
  review: Yup.string()
    .min(10, "Please write at least 10 characters")
    .max(500, "Maximum 500 characters allowed")
    .required("Experience is required"),
});

export default reviewSchema;

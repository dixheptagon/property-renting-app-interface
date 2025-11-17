import * as Yup from "yup";

// Validation schema
const replyReviewSchema = Yup.object({
  reply: Yup.string()
    .min(10, "Please write at least 10 characters")
    .max(500, "Maximum 500 characters allowed")
    .required("Reply is required"),
});

export default replyReviewSchema;

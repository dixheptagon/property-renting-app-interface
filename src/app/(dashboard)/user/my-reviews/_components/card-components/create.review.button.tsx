import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Star } from "lucide-react";
import { useFormik } from "formik";
import reviewSchema from "../../_validations/review.schema";
import { handleWriteReviewValues } from "../../_types/write.review.type";
import StarRating from "./star.rating";

interface CreateReviewButtonProps {
  property_name: string;
  room_type: string;
}

export function CreateReviewButton({
  property_name,
  room_type,
}: CreateReviewButtonProps) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values, { resetForm }) => {
      handleSaveReview(values);
      resetForm();
      setOpen(false);
    },
  });

  const handleSaveReview = (values: handleWriteReviewValues) => {
    console.log("Review Data:", {
      rating: values.rating,
      review: values.review,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group/btn w-full px-6 py-6 transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
          <div className="flex items-center gap-2">
            Write Review
            <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:rotate-15" />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogDescription className="text-sm font-semibold text-blue-600">
            {property_name} - {room_type}
          </DialogDescription>

          <DialogTitle>Write Your Review</DialogTitle>

          <DialogDescription>
            Share your thoughts about your experience below. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating Section */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Rating</Label>
            <StarRating
              rating={formik.values.rating}
              onRatingChange={(rating) =>
                formik.setFieldValue("rating", rating)
              }
              error={formik.touched.rating && formik.errors.rating}
            />
          </div>

          {/* Review Section */}
          <div className="space-y-2">
            <Label htmlFor="review" className="text-base font-semibold">
              Share your experience
            </Label>
            <Textarea
              id="review"
              name="review"
              placeholder="Tell us about your experience..."
              className="min-h-[120px] resize-none"
              value={formik.values.review}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.review && formik.errors.review && (
              <p className="text-sm text-red-500">{formik.errors.review}</p>
            )}
            <p className="text-sm text-gray-500">
              {formik.values.review.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
          >
            Save Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

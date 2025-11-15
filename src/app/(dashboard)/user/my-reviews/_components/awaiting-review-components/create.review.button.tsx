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
import { ExternalLink, Loader, Star } from "lucide-react";
import { useFormik } from "formik";
import reviewSchema from "../../_validations/review.schema";
import { handleWriteReviewValues } from "../../_types/awating.reviews.type";
import StarRating from "./star.rating";
import { useWriteReview } from "../../_hooks/use.write.reviews";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface CreateReviewButtonProps {
  property_name: string;
  room_type: string;
  booking_uid: string;
}

export function CreateReviewButton({
  booking_uid,
  property_name,
  room_type,
}: CreateReviewButtonProps) {
  const [open, setOpen] = useState(false);

  const {
    mutate: writeReview,
    isPending,
    isSuccess,
  } = useWriteReview({
    onSuccess: (data) => {
      toast.success("Review saved successfully!");
      console.log("Write Review Data:", data);

      setOpen(false);
    },
    onError: (error) => {
      console.log("Error:", error);
      if (error instanceof AxiosError && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to write review!, please try again later.");
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values, { resetForm }) => {
      handleSaveReview(values);
      isSuccess && resetForm();
    },
  });

  const handleSaveReview = (values: handleWriteReviewValues) => {
    console.log("Review Data:", {
      rating: values.rating,
      review: values.review,
    });

    writeReview({
      bookingUid: booking_uid,
      reviewData: {
        rating: values.rating,
        comment: values.review,
      },
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
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => formik.handleSubmit()} disabled={isPending}>
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

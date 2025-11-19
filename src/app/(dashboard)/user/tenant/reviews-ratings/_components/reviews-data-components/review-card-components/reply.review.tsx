"use client";

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
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { useState } from "react";
import replyReviewSchema from "../../../_validations/reply.review";
import { Textarea } from "@/components/ui/textarea";
import { useReplyReview } from "../../../_hooks/use.reply.review";
import { toast } from "sonner";

interface ReplyReviewProps {
  bookingUid: string;
  username?: string;
  reply?: string | null;
}

export function ReplyReview({ bookingUid, username, reply }: ReplyReviewProps) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useReplyReview({
    onSuccess: () => {
      setOpen(false);
      formik.resetForm();
      toast.success("Reply submitted successfully");
      window.location.reload();
    },
    onError: () => {
      toast.error("Failed to submit reply");
    },
  });

  const formik = useFormik({
    initialValues: {
      reply: "",
    },
    validationSchema: replyReviewSchema,
    onSubmit: (values) => {
      mutate({ bookingUid, replyComment: values.reply });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group/btn flex-1 bg-blue-500 transition-all hover:bg-blue-600 sm:flex-none">
          <Pencil className="mr-2 h-4 w-4 transition-transform group-hover/btn:-rotate-12" />
          <span className="text-sm font-semibold">
            {reply ? "Edit Reply" : "Reply Review"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-auto">
        <DialogHeader>
          <DialogDescription className="text-sm font-semibold text-blue-600">
            Reply to {username}
          </DialogDescription>
          <DialogTitle>Write Your Reply</DialogTitle>
          <DialogDescription>
            Keep your response polite and professional — it will be visible to
            all future guests. We recommend thanking them for their stay and
            addressing their feedback constructively.
          </DialogDescription>
        </DialogHeader>

        <div>
          {/* Reply Section */}
          <div className="space-y-2">
            <Label htmlFor="reply" className="text-base font-semibold">
              Reply
            </Label>
            <Textarea
              id="reply"
              name="reply"
              placeholder="Write your reply..."
              className="min-h-[120px] break-all"
              value={formik.values.reply}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.reply && formik.errors.reply && (
              <p className="text-sm text-red-500">{formik.errors.reply}</p>
            )}
            <p className="text-sm text-gray-500">
              {formik.values.reply.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => formik.handleSubmit()}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

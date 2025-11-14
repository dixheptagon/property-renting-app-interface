import { Button } from "@/components/ui/button";
import { Circle, Star, Pencil, ShieldAlert, User } from "lucide-react";

export interface Review {
  id: number;
  username: string;
  avatar: string | null;
  postedDate: string;
  rating: number;
  reviewText: string;
  ownerReply: string | null;
  status: "active" | "restricted";
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const maxRating = 5;

  return (
    <div className="group overflow-hidden rounded-xl border-2 border-gray-200 bg-linear-to-br from-white to-gray-50 p-4 shadow-md">
      <div className="space-y-4">
        {/* Header - User Info & Rating */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-md ring-2 ring-blue-200 ring-offset-2">
                <User className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {review.username}
              </h2>
              <p className="text-sm text-gray-500">
                Posted on {review.postedDate}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 shadow-sm">
            <span className="text-2xl font-bold text-amber-600">
              {review.rating}.0
            </span>
            <div className="flex gap-1">
              {[...Array(maxRating)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="space-y-3">
          <p className="leading-relaxed text-gray-700">{review.reviewText}</p>

          {/* Owner Reply */}
          {review.ownerReply && (
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <Circle className="h-3 w-3 fill-green-600 text-green-600" />
                <span className="text-xs font-semibold tracking-wide text-green-700 uppercase">
                  My Reply
                </span>
              </div>
              <p className="text-sm text-gray-700">{review.ownerReply}</p>
            </div>
          )}
        </div>

        {/* Footer - Status & Actions */}
        <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Status Badge */}
          {review.status === "active" ? (
            <div></div>
          ) : (
            <div
              className={`inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 shadow-md ${"bg-red-500"}`}
            >
              <Circle className="h-4 w-4 fill-white text-white" />
              <span className="text-sm font-bold text-white capitalize">
                {review.status}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="self-end">
            <div className="flex flex-wrap gap-3 self-end">
              <Button
                className={`group/btn flex-1 transition-all hover:shadow-lg sm:flex-none ${
                  review.status === "restricted"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                <ShieldAlert className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                <span className="text-sm font-semibold">
                  {review.status === "restricted" ? "Unrestrict" : "Restrict"}
                </span>
              </Button>
              <Button className="group/btn flex-1 bg-blue-500 transition-all hover:bg-blue-600 sm:flex-none">
                <Pencil className="mr-2 h-4 w-4 transition-transform group-hover/btn:-rotate-12" />
                <span className="text-sm font-semibold">
                  {review.ownerReply ? "Edit Reply" : "Reply"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { MessageSquare } from "lucide-react";

interface TotalReviewsProps {
  totalReviews: number;
}

export default function TotalReviews({ totalReviews }: TotalReviewsProps) {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-blue-200 bg-blue-50 p-8 shadow-lg`}
    >
      {/* Icon Badge */}
      <div
        className={`mb-4 rounded-full bg-linear-to-br from-blue-500 to-cyan-600 p-4 shadow-md`}
      >
        <MessageSquare className="h-8 w-8 text-white" />
      </div>

      {/* Title */}
      <h2 className="mb-2 text-sm font-medium tracking-wide text-gray-600 uppercase">
        Total Reviews
      </h2>

      {/* Value */}
      <p className={`mb-1 text-5xl font-bold text-blue-600`}>
        {totalReviews.toLocaleString()}
      </p>

      {/* Subtitle */}
      <p className="text-sm text-gray-500">Reviews</p>

      {/* Decorative line */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-blue-500 to-cyan-600`}
      ></div>

      {/* Decorative corner accent */}
      <div
        className={`absolute top-0 right-0 h-20 w-20 bg-linear-to-br from-blue-500 to-cyan-600 opacity-20 blur-3xl`}
      ></div>
    </div>
  );
}

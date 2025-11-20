import { Star } from "lucide-react";
import { useState } from "react";
import { StarRatingProps } from "../../_types/awating.reviews.type";

export default function StarRating({
  rating,
  onRatingChange,
  error,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div>
      <div className="flex w-full justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-12 w-12 transition-colors ${
                star <= (hover || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

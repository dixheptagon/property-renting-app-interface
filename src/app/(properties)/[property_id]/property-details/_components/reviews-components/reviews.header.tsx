import { Star } from "lucide-react";

export default function ReviewsHeader() {
  return (
    <div className="mb-6 flex items-center justify-center">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Ratings & Reviews
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-10 w-10 fill-yellow-400 text-yellow-400" />
            <span className="text-4xl font-bold text-gray-900">5</span>
          </div>
          <span className="text-xl text-gray-600">(10 reviews)</span>
        </div>
      </div>
    </div>
  );
}

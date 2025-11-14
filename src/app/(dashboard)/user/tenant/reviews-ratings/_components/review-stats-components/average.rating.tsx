import { Star } from "lucide-react";

export default function AverageRating() {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-amber-200 bg-amber-50 p-8 shadow-lg`}
    >
      {/* Icon Badge */}
      <div
        className={`mb-4 rounded-full bg-linear-to-br from-amber-500 to-orange-600 p-4 shadow-md`}
      >
        <Star className="h-8 w-8 text-white" />
      </div>

      {/* Title */}
      <h2 className="mb-2 text-sm font-medium tracking-wide text-gray-600 uppercase">
        Average Rating
      </h2>

      {/* Value */}
      <p className={`mb-1 text-5xl font-bold text-amber-600`}>4.5</p>

      {/* Subtitle */}
      <p className="text-sm text-gray-500">out of 5.0</p>

      {/* Decorative line */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-amber-500 to-orange-600`}
      ></div>

      {/* Decorative corner accent */}
      <div
        className={`absolute top-0 right-0 h-20 w-20 bg-linear-to-br from-amber-500 to-orange-600 opacity-20 blur-3xl`}
      ></div>
    </div>
  );
}

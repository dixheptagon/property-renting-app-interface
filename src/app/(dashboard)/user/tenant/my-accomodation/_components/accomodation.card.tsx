import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, MapPin, Edit3 } from "lucide-react";

export default function AccomodationCard() {
  const dummyProperty = {
    property_name: "Sunset Beach Villa",
    category: "Luxury Villa",
    Location: "Bali, Indonesia",
    average_rating: 4.5,
    total_reviews: 100,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765",
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden sm:h-64">
          <Image
            src={dummyProperty.image}
            alt={dummyProperty.property_name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-white" />
              {dummyProperty.status}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800 shadow-md backdrop-blur-sm">
              {dummyProperty.category}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="space-y-4 p-5">
          {/* Title */}
          <div className="space-y-1">
            <h3 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
              {dummyProperty.property_name}
            </h3>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-1.5 h-4 w-4 text-blue-500" />
              <span className="line-clamp-1">{dummyProperty.Location}</span>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 px-2.5 py-1.5 shadow-md">
                <Star className="h-4 w-4 fill-white text-white" />
                <span className="text-sm font-bold text-white">
                  {dummyProperty.average_rating}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                ({dummyProperty.total_reviews} reviews)
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <Button className="group/btn h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg">
            <Edit3 className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
            Edit Property
          </Button>
        </div>
      </div>
    </div>
  );
}

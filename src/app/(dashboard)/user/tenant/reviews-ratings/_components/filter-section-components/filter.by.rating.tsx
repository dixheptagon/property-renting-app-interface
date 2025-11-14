"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Star } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useReviewSearchParams } from "../../_hooks/use.review.search.params";

interface Rating {
  value: string;
  label: string;
  stars: number;
}

export default function FilterByRating() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const { setRatingFilter, clearFilters } = useReviewSearchParams();

  const ratings = [
    { value: 5, label: "5 Stars", stars: 5 },
    { value: 4, label: "4 Stars", stars: 4 },
    { value: 3, label: "3 Stars", stars: 3 },
    { value: 2, label: "2 Stars", stars: 2 },
    { value: 1, label: "1 Star", stars: 1 },
  ];

  const handleRatingChange = (ratingValue: number) => {
    setSelectedRatings((prev) => {
      const newRatings = prev.includes(ratingValue)
        ? prev.filter((r) => r !== ratingValue)
        : [...prev, ratingValue];

      console.log("Selected Ratings:", newRatings);
      return newRatings;
    });
  };

  const handleApplyFilter = () => {
    console.log("Applying filters with ratings:", selectedRatings);
    setRatingFilter(selectedRatings.map((rating) => rating));
  };

  const handleClearAll = () => {
    setSelectedRatings([]);
    clearFilters();
    console.log("Filters cleared");
  };

  return (
    <div className="flex gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="group/btn w-full bg-blue-600 text-white transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {selectedRatings.length > 0 && (
              <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-blue-600">
                {selectedRatings.length}
              </span>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter By Rating</DialogTitle>
            <DialogDescription>
              Narrow down reviews based on overall rating to find the feedback
              that matters most.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {ratings.map((rating) => (
              <div
                key={rating.value}
                className="flex items-center space-x-3 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-100"
              >
                <Checkbox
                  id={`rating-${rating.value}`}
                  checked={selectedRatings.includes(rating.value)}
                  onCheckedChange={() => handleRatingChange(rating.value)}
                  className="border-2 border-gray-300"
                />
                <Label
                  htmlFor={`rating-${rating.value}`}
                  className="flex flex-1 cursor-pointer items-center gap-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(rating.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    {[...Array(5 - rating.stars)].map((_, i) => (
                      <Star
                        key={i + rating.stars}
                        className="h-4 w-4 text-gray-300"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">{rating.label}</span>
                </Label>
              </div>
            ))}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="order-2 sm:order-1"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleApplyFilter}
              className="order-1 bg-blue-600 text-white hover:bg-blue-700 sm:order-2"
            >
              Apply Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        onClick={handleClearAll}
        className="bg-white text-blue-600 hover:bg-gray-200 hover:text-blue-700"
      >
        Clear All
      </Button>
    </div>
  );
}

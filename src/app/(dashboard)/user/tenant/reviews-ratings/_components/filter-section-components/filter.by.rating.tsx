"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FunnelX, SlidersHorizontal, Star } from "lucide-react";
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

export default function FilterByRating() {
  const { setRatingFilter, clearFilters, filters } = useReviewSearchParams();

  const ratings = [
    { value: 5, label: "5 Stars", stars: 5 },
    { value: 4, label: "4 Stars", stars: 4 },
    { value: 3, label: "3 Stars", stars: 3 },
    { value: 2, label: "2 Stars", stars: 2 },
    { value: 1, label: "1 Star", stars: 1 },
  ];

  const handleRatingChange = (ratingValue: number) => {
    const currentRatings = filters.rating || [];
    const newRatings = currentRatings.includes(ratingValue)
      ? currentRatings.filter((r) => r !== ratingValue)
      : [...currentRatings, ratingValue];

    console.log("Selected Ratings:", newRatings);
    setRatingFilter(newRatings);
  };

  const handleApplyFilter = () => {
    console.log("Applying filters with ratings:", filters.rating);
  };

  const handleClearAll = () => {
    clearFilters();
    console.log("Filters cleared");
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      {/* Filter Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="group/btn w-full justify-center bg-blue-600 text-white transition-all hover:bg-blue-700 hover:shadow-lg md:w-auto md:justify-start">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {(filters.rating?.length || 0) > 0 && (
              <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-blue-600">
                {filters.rating?.length || 0}
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
                  checked={filters.rating?.includes(rating.value) || false}
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
                className="order-2 w-full sm:order-1 sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleApplyFilter}
              className="order-1 w-full bg-blue-600 text-white hover:bg-blue-700 sm:order-2 sm:w-auto"
            >
              Apply Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clear Filters Button */}
      <Button
        onClick={handleClearAll}
        variant="outline"
        className="w-full justify-center border-gray-300 text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 md:w-auto md:justify-start"
      >
        <FunnelX className="mr-2 h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );
}

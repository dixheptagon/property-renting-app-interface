import { Star } from "lucide-react";

// Constants
const MAX_VISIBLE_REVIEWS = 4 as const;
const MAX_DESCRIPTION_LENGTH = 150 as const;
const JOIN_YEAR_RANGE = { min: 2020, max: 2024 } as const;

export { MAX_VISIBLE_REVIEWS, MAX_DESCRIPTION_LENGTH, JOIN_YEAR_RANGE };

// Utility functions
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

export const getRandomJoinYear = (): number => {
  return (
    Math.floor(
      Math.random() * (JOIN_YEAR_RANGE.max - JOIN_YEAR_RANGE.min + 1)
    ) + JOIN_YEAR_RANGE.min
  );
};

// Utility functions for text and date formatting
export const truncateText = (
  text: string,
  maxLength: number = MAX_DESCRIPTION_LENGTH
): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const renderStars = (rating: number): React.ReactElement[] => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-4 w-4 ${
        index < rating
          ? "fill-yellow-400 text-yellow-400"
          : "fill-gray-300 text-gray-300"
      }`}
    />
  ));
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

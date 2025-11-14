import React from "react";
import ReviewCard, { Review } from "./reviews-data-components/review.card";

// Dummy data untuk reviews
const reviewsData: Review[] = [
  {
    id: 1,
    username: "John Doe",
    avatar: null,
    postedDate: "January 15, 2024",
    rating: 5,
    reviewText:
      "Amazing property! The location was perfect and the host was very responsive. Everything was clean and exactly as described. Would definitely stay here again!",
    ownerReply:
      "Thank you so much for your kind words! We're thrilled you enjoyed your stay. Looking forward to hosting you again!",
    status: "active",
  },
  {
    id: 2,
    username: "Sarah Johnson",
    avatar: null,
    postedDate: "January 12, 2024",
    rating: 4,
    reviewText:
      "Great experience overall. The apartment was spacious and comfortable. Only minor issue was the WiFi connection, but everything else was perfect.",
    ownerReply:
      "We appreciate your feedback! We've already upgraded our WiFi to provide better service for future guests.",
    status: "active",
  },
  {
    id: 3,
    username: "Michael Chen",
    avatar: null,
    postedDate: "January 8, 2024",
    rating: 3,
    reviewText:
      "Decent place but could use some improvements. The bed was comfortable but the kitchen needs better equipment. Location is good though.",
    ownerReply: null,
    status: "restricted",
  },
  {
    id: 4,
    username: "Emma Wilson",
    avatar: null,
    postedDate: "January 5, 2024",
    rating: 5,
    reviewText:
      "Absolutely loved it! The view from the balcony was breathtaking. Host provided excellent recommendations for local restaurants. Highly recommend!",
    ownerReply:
      "So happy you enjoyed the view and our recommendations! You're welcome back anytime!",
    status: "active",
  },
];

export default function ReviewsData() {
  return (
    <section className="mt-6 space-y-6">
      {reviewsData.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
}

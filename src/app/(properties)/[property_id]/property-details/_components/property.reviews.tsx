"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import ReviewsHeader from "./reviews-components/reviews.header";
import ReviewCard from "./reviews-components/reviews.card";
import { Button } from "@/components/ui/button";
import { ReviewList } from "./reviews-components/reviews.list";

const dummyReviews = [
  {
    review: {
      guest: {
        first_name: "John",
        last_name: "Smith",
      },
      rating: 4,
      comment:
        "Great location and friendly staff, but room could be cleaner. I would recommend this property for a stay of at least 3 nights. The location is great and the staff is very friendly. However, the room could be a bit cleaner. I would recommend having a cleaning service booked in advance. Thank you for your feedback!",
      reply:
        "Thank you for your feedback! We appreciate your stay and will work on improving our cleanliness standards. I would recommend having a cleaning service booked in advance. Thank you for your feedback! ",
      createdAt: "2025-10-15T10:30:00.000Z",
      updatedAt: "2025-10-16T14:20:00.000Z",
      room_type: "Deluxe Suite",
    },
    property: {
      name: "Beautiful Beach Villa",
      room_type: "Deluxe Suite",
      tenant: {
        first_name: "John",
        last_name: "Doe",
      },
    },
  },
  {
    review: {
      guest: {
        first_name: "Alice",
        last_name: "Johnson",
      },
      rating: 5,
      comment:
        "Amazing experience! The villa was stunning and the service was top-notch. Highly recommend!",
      reply: "Thank you so much! We're glad you enjoyed your stay.",
      createdAt: "2025-10-10T14:00:00.000Z",
      updatedAt: "2025-10-11T09:00:00.000Z",
      room_type: "Ocean View Room",
    },
    property: {
      name: "Beautiful Beach Villa",
      room_type: "Deluxe Suite",
      tenant: {
        first_name: "John",
        last_name: "Doe",
      },
    },
  },
  {
    review: {
      guest: {
        first_name: "Bob",
        last_name: "Williams",
      },
      rating: 3,
      comment: "Decent place, but could use some improvements in amenities.",
      reply: "We appreciate your feedback and are working on enhancements.",
      createdAt: "2025-10-05T16:45:00.000Z",
      updatedAt: "2025-10-06T11:30:00.000Z",
      room_type: "Standard Room",
    },
    property: {
      name: "Beautiful Beach Villa",
      room_type: "Deluxe Suite",
      tenant: {
        first_name: "John",
        last_name: "Doe",
      },
    },
  },
  {
    review: {
      guest: {
        first_name: "Emma",
        last_name: "Davis",
      },
      rating: 4,
      comment:
        "Lovely property with great views. Minor issues with WiFi but overall good.",
      reply: "Thanks for the review! We're addressing the WiFi issues.",
      createdAt: "2025-09-28T12:20:00.000Z",
      updatedAt: "2025-09-29T08:15:00.000Z",
      room_type: "Deluxe Suite",
    },
    property: {
      name: "Beautiful Beach Villa",
      room_type: "Deluxe Suite",
      tenant: {
        first_name: "John",
        last_name: "Doe",
      },
    },
  },
  {
    review: {
      guest: {
        first_name: "Michael",
        last_name: "Brown",
      },
      rating: 5,
      comment:
        "Perfect getaway! Everything was excellent from start to finish.",
      reply: "We're thrilled you had a great experience!",
      createdAt: "2025-09-20T18:00:00.000Z",
      updatedAt: "2025-09-21T10:00:00.000Z",
      room_type: "Ocean View Room",
    },
    property: {
      name: "Beautiful Beach Villa",
      room_type: "Deluxe Suite",
      tenant: {
        first_name: "John",
        last_name: "Doe",
      },
    },
  },
  {
    review: {
      guest: {
        first_name: "Sarah",
        last_name: "Miller",
      },
      rating: 4,
      comment: "Beautiful property with excellent location. Staff was helpful.",
      reply: "Thank you for choosing us! Glad you enjoyed your stay.",
      createdAt: "2025-09-15T13:30:00.000Z",
      updatedAt: "2025-09-16T09:45:00.000Z",
      room_type: "Standard Room",
    },
    property: {
      name: "Beautiful Beach Villa",
      room_type: "Deluxe Suite",
      tenant: {
        first_name: "John",
        last_name: "Doe",
      },
    },
  },
];

export default function PropertyReviews() {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? dummyReviews : dummyReviews.slice(0, 4);

  return (
    <div id="reviews-ratings">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        {/* Header with Average Rating */}
        <ReviewsHeader />

        {displayedReviews.map((review, index) => (
          <ReviewCard key={index} reviewData={review} />
        ))}

        {dummyReviews.length > 4 && (
          <div className="mt-6 text-center">
            <ReviewList />
          </div>
        )}
      </div>
    </div>
  );
}

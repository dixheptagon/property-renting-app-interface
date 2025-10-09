'use client';

import React, { useState } from 'react';
import { Star, ChevronDown, X } from 'lucide-react';

export default function PropertyReviews() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  // Sample reviews data - ganti dengan data dari API lo
  const reviews = [
    {
      id: 1,
      username: 'Sarah Johnson',
      avatar: 'SJ',
      joinDate: '2023',
      rating: 5,
      reviewDate: '2024-03-15',
      description:
        'Absolutely amazing stay! The property exceeded all our expectations. The location was perfect, right in the heart of the city with easy access to all major attractions. The apartment was spotlessly clean and beautifully decorated. The host was incredibly responsive and helpful. Would definitely recommend this place to anyone visiting!',
    },
    {
      id: 2,
      username: 'Michael Chen',
      avatar: 'MC',
      joinDate: '2022',
      rating: 4,
      reviewDate: '2024-03-10',
      description:
        'Great property overall. The amenities were top-notch and the view from the balcony was breathtaking. Only minor issue was the WiFi speed could be better for remote work. But everything else was fantastic. The host provided clear instructions for check-in and check-out.',
    },
    {
      id: 3,
      username: 'Emily Rodriguez',
      avatar: 'ER',
      joinDate: '2024',
      rating: 5,
      reviewDate: '2024-03-05',
      description:
        'Perfect for families! We stayed here with our two kids and had a wonderful time. The space was larger than expected and very comfortable. The kitchen was fully equipped which made it easy to prepare meals. The swimming pool was a huge hit with the kids.',
    },
    {
      id: 4,
      username: 'David Kim',
      avatar: 'DK',
      joinDate: '2023',
      rating: 5,
      reviewDate: '2024-02-28',
      description:
        "One of the best stays I've had! The property is exactly as shown in the photos. Very modern and well-maintained. The bed was super comfortable and I slept like a baby. Great communication with the host throughout our stay.",
    },
    {
      id: 5,
      username: 'Lisa Anderson',
      avatar: 'LA',
      joinDate: '2022',
      rating: 4,
      reviewDate: '2024-02-20',
      description:
        "Lovely apartment in a great location. Walking distance to many restaurants and shops. The apartment was clean and cozy. Would have given 5 stars but the air conditioning in one room wasn't working properly. Host was quick to respond though.",
    },
    {
      id: 6,
      username: 'James Wilson',
      avatar: 'JW',
      joinDate: '2023',
      rating: 5,
      reviewDate: '2024-02-15',
      description:
        'Highly recommend! Beautiful property with stunning ocean views. Everything was perfect from start to finish. The host went above and beyond to make sure we had everything we needed. Will definitely be back!',
    },
  ];

  // Show only 4 reviews initially
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  // Calculate average rating
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  const toggleExpandReview = (reviewId: number) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-300 text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        {/* Header with Average Rating */}
        <div className="mb-6 flex items-center justify-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Ratings & Reviews
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-10 w-10 fill-yellow-400 text-yellow-400" />
                <span className="text-4xl font-bold text-gray-900">
                  {averageRating}
                </span>
              </div>
              <span className="text-xl text-gray-600">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayedReviews.map((review) => {
            const isExpanded = expandedReviews.has(review.id);
            const needsTruncation = review.description.length > 150;

            return (
              <div
                key={review.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-5 transition-all duration-200 hover:border-blue-300"
              >
                {/* User Info */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {review.username}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Joined in {review.joinDate}
                    </p>
                  </div>
                </div>

                {/* Rating and Date */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.reviewDate)}
                  </span>
                </div>

                {/* Review Description */}
                <div className="mb-3">
                  <p className="leading-relaxed text-gray-700">
                    {isExpanded
                      ? review.description
                      : truncateText(review.description)}
                  </p>
                </div>

                {/* View More Button */}
                {needsTruncation && (
                  <button
                    onClick={() => toggleExpandReview(review.id)}
                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                  >
                    {isExpanded ? 'View Less' : 'View More'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Show All Reviews Button */}
        {reviews.length > 4 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="flex items-center gap-2 rounded-lg border-2 border-gray-900 px-8 py-3 font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white"
            >
              {showAllReviews ? (
                <>
                  <ChevronDown className="h-5 w-5 rotate-180" />
                  Show Less Reviews
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5" />
                  Show All Reviews ({reviews.length})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

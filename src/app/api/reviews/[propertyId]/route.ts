import { NextRequest, NextResponse } from "next/server";

// Define the Review interface for type safety
interface Review {
  id: number;
  propertyId: number;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

// Dummy data for users to generate reviews
const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar:
      "https://plus.unsplash.com/premium_photo-1670071482460-5c08776521fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    id: 4,
    name: "Bob Brown",
    avatar:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
];

// Dummy comments for variety in reviews
const dummyComments = [
  "Great place! Highly recommend.",
  "Amazing stay, very clean and comfortable.",
  "Good location, but could be quieter.",
  "Perfect for families.",
  "Host was very responsive.",
  "Beautiful property with great views.",
  "Everything was as described.",
  "Would stay again.",
  "Minor issues but overall good.",
  "Exceeded expectations!",
];

export async function GET(
  request: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  // Parse the propertyId from the URL parameters
  const propertyId = parseInt(params.propertyId, 10);

  // Validate that propertyId is a valid number
  if (isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid propertyId" }, { status: 400 });
  }

  // Generate a random number of reviews between 3 and 10
  const numReviews = Math.floor(Math.random() * 8) + 3;
  const reviews: Review[] = [];

  // Loop to create dummy reviews
  for (let i = 0; i < numReviews; i++) {
    // Randomly select a user
    const user = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
    // Randomly select a comment
    const comment =
      dummyComments[Math.floor(Math.random() * dummyComments.length)];
    // Random rating between 1 and 5
    const rating = Math.floor(Math.random() * 5) + 1;
    // Random createdAt date within the last year
    const createdAt = new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toISOString();

    // Add the review to the array
    reviews.push({
      id: i + 1,
      propertyId,
      user,
      rating,
      comment,
      createdAt,
    });
  }

  // Return the generated reviews as JSON
  return NextResponse.json(reviews);
}

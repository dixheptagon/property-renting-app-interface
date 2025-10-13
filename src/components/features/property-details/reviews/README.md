# Property Reviews Component

This folder contains the property reviews component for displaying ratings and reviews for properties. The component has been modularized into separate files for better maintainability and organization.

## Files

### `propert.reviews.tsx`

Main component for displaying property ratings and reviews with pagination and modal dialogs.

**Props:**

- `propertyId: number` - The ID of the property to fetch reviews for

**Features:**

- Fetches reviews from API using React Query
- Displays average rating and total review count
- Shows paginated reviews (4 initially, with "Show All" option)
- Handles loading and error states gracefully
- Supports review truncation with "Show More" dialogs
- Responsive grid layout for reviews
- Star rating display system
- User avatars with fallback to initials

### `type.ts`

Contains all TypeScript interfaces and types used by the reviews component:

- `ApiReview` - Interface for API response data
- `Review` - Interface for transformed review data
- `PropertyReviewsProps` - Props interface for the main component
- `ReviewCardProps` - Props interface for the review card component

### `utils.tsx`

Utility functions and constants for the reviews component:

- Constants: `MAX_VISIBLE_REVIEWS`, `MAX_DESCRIPTION_LENGTH`, `JOIN_YEAR_RANGE`
- `getInitials()` - Generates user initials from name
- `getRandomJoinYear()` - Generates random join year for demo purposes
- `truncateText()` - Truncates text with ellipsis
- `renderStars()` - Renders star rating components
- `formatDate()` - Formats dates for display

### `review.card.tsx`

Individual review card component that displays a single review with user info, rating, and description.

### `loding.and.error.tsx`

Loading and error state components:

- `LoadingState` - Displays loading spinner and message
- `ErrorState` - Displays error message

## Recent Refactoring (2025-10-13)

- **Modularized Architecture**: Split the monolithic component into separate files for better separation of concerns
- **Enhanced Type Safety**: Added `readonly` modifiers on interfaces and arrays to prevent mutations
- **Improved Constants**: Used `as const` assertions for constants for better type inference and immutability
- **Better Null Handling**: Replaced `||` with `??` for more precise handling of undefined vs. falsy values
- **Cleaner Markup**: Removed redundant CSS classes and empty attributes for cleaner JSX
- **Maintained Identical Behavior**: All functionality preserved while improving maintainability and type safety

## State Management

- Uses React Query for server state management
- Local state for UI interactions (dialogs, etc.)

## Dependencies

- `@tanstack/react-query` - For data fetching and caching
- `@/components/ui/dialog` - For modal dialogs
- `lucide-react` - For icons
- `next/image` - For optimized image loading
- `axios` - For HTTP requests

## API Integration

Expects reviews endpoint at `/api/reviews/${propertyId}` returning:

```typescript
interface ApiReview {
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
```

## Usage

```tsx
import PropertyReviews from "./index";

function PropertyDetails({ propertyId }: { propertyId: number }) {
  return <PropertyReviews propertyId={propertyId} />;
}
```

## Performance Optimizations

- Memoized review transformation to prevent unnecessary recalculations
- Efficient rendering with proper key props
- Lazy loading of full review content in dialogs
- Optimized image loading with Next.js Image component

# Property Room Types Components

This folder contains components for displaying and managing property room types in the property details page.

## Components

### `index.tsx`

The main component that orchestrates room selection and display.

**Props:**

- `rooms: Room[]` - Array of room objects to display

**Features:**

- Displays a list of available rooms with their details
- Handles room selection and integrates with the booking store
- Provides image viewing functionality through a lightbox modal
- Shows room specifications (guests, bedrooms, beds, bathrooms)
- Displays room highlights with overflow handling

### `room.card.tsx`

Individual room card component displaying room information and selection button.

**Recent Refactoring (2025-10-13):**

- Moved Popover imports to the top for better organization and to follow standard practices.
- Extracted highlight rendering logic into a separate `renderHighlights` function for improved readability and maintainability.
- Created a dedicated `SelectRoomButton` component to reduce code duplication and improve reusability.
- Added concise comments on complex parts for better code understanding.
- Maintained identical behavior while improving code structure and type safety.

**Props:**

- `room: Room` - The room data to display
- `isSelected: boolean` - Whether this room is currently selected
- `onSelectRoom: (roomId: number) => void` - Callback for room selection
- `onViewImages: (room: Room) => void` - Callback for opening image lightbox

### `image.lightbox.tsx`

Modal component for viewing room images with navigation controls.

**Props:**

- `room: Room | null` - The room whose images to display
- `isOpen: boolean` - Whether the lightbox is open
- `currentImageIndex: number` - Index of currently displayed image
- `onClose: () => void` - Callback to close the lightbox
- `onPrevImage: () => void` - Callback for previous image navigation
- `onNextImage: () => void` - Callback for next image navigation
- `onSelectImage: (index: number) => void` - Callback for thumbnail selection

### `utils.ts`

Utility functions for room type components.

**Functions:**

- `formatIDR(price: number): string` - Formats price to Indonesian Rupiah
- `processHighlights(highlight: RoomHighlight): { visible: string[]; others: string[] }` - Processes room highlights for display
- `formatHighlightLabel(key: string): string` - Formats highlight keys to readable labels

## Usage

```tsx
import PropertyRoomTypes from "./property.room.types";

function PropertyDetails({ rooms }: { rooms: Room[] }) {
  return <PropertyRoomTypes rooms={rooms} />;
}
```

## Dependencies

- `@/types/property` - Room and RoomHighlight types
- `@/stores/booking.store` - Booking state management
- `@/components/ui/popover` - Popover components for highlights overflow
- `lucide-react` - Icons for UI elements

## State Management

The component integrates with Zustand booking store for room selection state. Selected rooms are stored globally and can be accessed across the application.

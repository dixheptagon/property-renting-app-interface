# DateRangePicker Component

## Overview

The `DateRangePicker` is a reusable React component built with Shadcn UI and TypeScript for Next.js applications. It provides an intuitive interface for users to select a date range, specifically designed for booking scenarios with check-in and check-out dates.

## Features

- **Two-Button Layout**: Separate check-in and check-out buttons for intuitive date selection
- **Range Selection**: Allows users to select both start and end dates for a range
- **Popover Interface**: Custom popover that opens when either check-in or check-out button is clicked
- **Formatted Display**: Shows selected dates in "MMM dd, yyyy" format for each button
- **Clear Functionality**: X button to delete/clear the selected date range
- **Controllable**: Supports controlled component pattern with `value` and `onChange` props
- **Customizable**: Optional `placeholder` and `disabled` props
- **TypeScript Support**: Full type safety with proper TypeScript integration
- **Shadcn UI Styling**: Follows Shadcn UI design standards
- **Date Validation**: Prevents selection of past dates

## Dependencies

- `react-day-picker`: For calendar functionality
- `date-fns`: For date formatting
- Shadcn UI components: `Calendar`, `Popover`, `Button`
- `lucide-react`: For calendar icon

## Props

| Prop          | Type                                      | Default               | Description                                                    |
| ------------- | ----------------------------------------- | --------------------- | -------------------------------------------------------------- |
| `value`       | `DateRange \| undefined`                  | `undefined`           | The selected date range object with `from` and `to` properties |
| `onChange`    | `(range: DateRange \| undefined) => void` | -                     | Callback function called when the date range changes           |
| `disabled`    | `boolean`                                 | `false`               | Disables the date picker when true                             |
| `placeholder` | `string`                                  | `"Pick a date range"` | Placeholder text shown when no dates are selected              |

## DateRange Type

```typescript
type DateRange = {
  from?: Date;
  to?: Date;
};
```

## Usage Example

```tsx
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

function BookingForm() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div>
      <label>Check-in and Check-out Dates</label>
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="Select your stay dates"
      />
    </div>
  );
}
```

## Implementation Details

### Component Structure

1. **Trigger Button**: Displays the selected range or placeholder text with a calendar icon
2. **Popover**: Contains the calendar component when opened
3. **Calendar**: Uses `react-day-picker` in range mode with 2 months displayed

### Behavior

- Clicking either the check-in or check-out button opens the popover with the calendar
- Users must select a complete range (both check-in and check-out dates)
- The popover automatically closes when both dates are selected
- Each button displays its respective date in "MMM dd, yyyy" format
- The X button clears the entire date range
- Past dates are disabled for selection
- If only one date is selected, the popover remains open until the range is complete

### Styling

- Button uses `outline` variant from Shadcn UI
- Calendar inherits Shadcn UI styling with range selection highlights
- Responsive design with fixed width button (280px)
- Muted text color for placeholder/unselected state

### TypeScript Integration

- Fully typed with proper interfaces
- Uses `react-day-picker`'s `DateRange` type for consistency
- Compatible with Next.js TypeScript configuration

## Accessibility

- Proper ARIA attributes through Radix UI primitives
- Keyboard navigation support
- Screen reader friendly date selection

## Customization

The component can be extended by:

- Modifying the `numberOfMonths` prop in the Calendar component
- Adding custom CSS classes via the `className` prop (not currently exposed but can be added)
- Changing the date format by modifying the `format` function call
- Adding additional calendar props like `disabled` dates or `min/max` date constraints

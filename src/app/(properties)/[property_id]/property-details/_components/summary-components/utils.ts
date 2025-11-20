import { DateRange } from "react-day-picker";
import { RoomUnavailability } from "../../_types/property";

// Check if the selected date range conflicts with any existing unavailability
function checkRangeConflict(
  from: Date,
  to: Date,
  unavailabilities: RoomUnavailability[]
): RoomUnavailability | null {
  return (
    unavailabilities.find((unavail) => {
      const unavailStart = new Date(unavail.start_date);
      const unavailEnd = new Date(unavail.end_date);

      // Cek overlap: dari < unavailEnd AND ke > unavailStart
      return from <= unavailEnd && to >= unavailStart;
    }) || null
  );
}

// Split date range by unavailability
// return array of valid ranges
function splitRangeByUnavailability(
  from: Date,
  to: Date,
  unavailabilities: RoomUnavailability[]
): DateRange[] {
  const validRanges: DateRange[] = [];
  let currentStart = new Date(from);

  // Sort unavailability by start date
  const sorted = [...unavailabilities].sort(
    (a, b) =>
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );

  for (const unavail of sorted) {
    const unavailStart = new Date(unavail.start_date);
    const unavailEnd = new Date(unavail.end_date);

    // Jika currentStart < unavailStart, ada gap yang bisa di-booking
    if (currentStart < unavailStart) {
      const rangeEnd =
        unavailEnd < to ? new Date(unavailEnd.getTime() - 1) : to;
      if (currentStart <= rangeEnd) {
        validRanges.push({
          from: new Date(currentStart),
          to: new Date(rangeEnd),
        });
      }
    }

    // Move currentStart ke setelah unavailability
    currentStart = new Date(
      Math.max(currentStart.getTime(), unavailEnd.getTime() + 1)
    );
  }

  // Add remaining range if exists
  if (currentStart <= to) {
    validRanges.push({
      from: new Date(currentStart),
      to: new Date(to),
    });
  }

  return validRanges.filter((range) => range.from! <= range.to!);
}

/**
 * Main logic  to handle date range selection with unavailability
 */
function validateAndApplyRange(
  newRange: DateRange | undefined,
  unavailabilities: RoomUnavailability[],
  onApply: (range: DateRange | undefined, message?: string) => void
): void {
  if (!newRange?.from || !newRange?.to) {
    onApply(newRange);
    return;
  }

  const conflict = checkRangeConflict(
    newRange.from,
    newRange.to,
    unavailabilities
  );

  if (conflict) {
    // conflict - split range
    const validRanges = splitRangeByUnavailability(
      newRange.from,
      newRange.to,
      unavailabilities
    );

    if (validRanges.length === 0) {
      // Tidak ada range yang valid
      onApply(undefined, "Date range are unavailable");
      return;
    }

    if (validRanges.length === 1) {
      // Hanya 1 segment valid
      onApply(
        validRanges[0],
        `Date adjusted due to unavailability. Booking: ${validRanges[0].from?.toLocaleDateString()} - ${validRanges[0].to?.toLocaleDateString()}`
      );
      return;
    }

    // Multiple segments - ambil yang pertama
    onApply(
      validRanges[0],
      `The original range is unavailable. Available: ${validRanges
        .map(
          (r) =>
            `${r.from?.toLocaleDateString()} - ${r.to?.toLocaleDateString()}`
        )
        .join(" or ")}`
    );
  } else {
    // Tidak ada conflict
    onApply(newRange);
  }
}

export {
  validateAndApplyRange,
  checkRangeConflict,
  splitRangeByUnavailability,
};

import { RoomHighlight } from "../../_types/property";

/**
 * Formats a price number to Indonesian Rupiah currency string.
 * @param price - The price to format.
 * @returns Formatted price string.
 */
export const formatIDR = (price: number): string => {
  return price.toLocaleString("id-ID");
};

/**
 * Processes room highlights to separate visible and overflow highlights.
 * @param highlight - The room highlight object.
 * @returns Object with visible and others arrays of highlight strings.
 */
export const processHighlights = (
  highlight: RoomHighlight
): { visible: string[]; others: string[] } => {
  const highlightKeys = Object.keys(highlight).filter((key) => {
    const value = highlight[key as keyof RoomHighlight];
    if (key === "others" && Array.isArray(value)) {
      return false;
    }
    return value === true;
  });

  if (highlight.others && Array.isArray(highlight.others)) {
    highlightKeys.push(...highlight.others);
  }

  const visible = highlightKeys.slice(0, 4);
  const others = highlightKeys.slice(4);

  return { visible, others };
};

/**
 * Converts a highlight key to a human-readable label.
 * @param key - The highlight key.
 * @returns Formatted label string.
 */
export const formatHighlightLabel = (key: string): string => {
  if (key.includes(" ")) {
    return key;
  }
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

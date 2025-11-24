import { usePropertyStore } from "../_stores/property.store";

export const useDisabledUploadProperty = () => {
  const { property, propertyImages, rooms } = usePropertyStore();

  const isDisabled = () => {
    // Check if property images exist
    if (propertyImages.length === 0) return true;

    // Check if basic property data exists
    if (
      !property.title ||
      !property.category ||
      !property.description ||
      !property?.address ||
      !property?.map_url ||
      !(property?.amenities?.length > 0) ||
      !(property?.rules?.length > 0)
    )
      return true;

    // Check if rooms exist
    if (rooms.length === 0) return true;

    return false;
  };

  return isDisabled();
};

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";

const initialState = {
  isDraft: false,
  property: {
    title: "",
    category: null,
    description: "",

    base_price: 0,

    address: "",
    city: "",
    country: "",
    postal_code: "",
    latitude: null,
    longitude: null,
    place_id: null,
    map_url: null,

    amenities: [],
    custom_amenities: [],

    rules: [],
    custom_rules: [],
  },
  propertyImages: [],
  rooms: [],
  peakSeasonRates: [],
  unavailabilities: [],
};

export const useIsDraftProperty = () => {
  const state = usePropertyStore();

  const hasData = () => {
    // Check property fields
    if (state.property.title !== initialState.property.title) return true;
    if (state.property.category !== initialState.property.category) return true;
    if (state.property.description !== initialState.property.description)
      return true;
    if (state.property.base_price !== initialState.property.base_price)
      return true;
    if (state.property.address !== initialState.property.address) return true;
    if (state.property.city !== initialState.property.city) return true;
    if (state.property.country !== initialState.property.country) return true;
    if (state.property.postal_code !== initialState.property.postal_code)
      return true;
    if (state.property.latitude !== initialState.property.latitude) return true;
    if (state.property.longitude !== initialState.property.longitude)
      return true;
    if (state.property.place_id !== initialState.property.place_id) return true;
    if (state.property.map_url !== initialState.property.map_url) return true;
    if (state.property.amenities.length > 0) return true;
    if (state.property.custom_amenities.length > 0) return true;
    if (state.property.rules.length > 0) return true;
    if (state.property.custom_rules.length > 0) return true;

    // Check arrays
    if (state.propertyImages.length > 0) return true;
    if (state.rooms.length > 0) return true;
    if (state.peakSeasonRates.length > 0) return true;
    if (state.unavailabilities.length > 0) return true;

    return false;
  };

  return hasData();
};

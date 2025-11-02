interface BaseImage {
  id: number;
  publicId: string;
  secureUrl: string;
  isMain: boolean;
  orderIndex: number;
  status: string;
  tempGroupId: string;
}

interface RoomData {
  tempId: string;
  name: string;
  description: string;
  base_price: number | string;
  max_guest: number;
  total_units: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  highlight: string[];
  custom_highlight: string[];
  images: BaseImage[];
}

interface PeakRateData {
  tempId: string;
  targetTempRoomId: string | "PROPERTY";
  start_date: string;
  end_date: string;
  adjustment_type: "percentage" | "nominal";
  adjustment_value: number | string;
}

interface UnavailabilityData {
  tempId: string;
  targetTempRoomId: string;
  start_date: string;
  end_date: string;
  reason: string;
}

interface PropertyData {
  title: string;
  category: string | null;
  description: string;
  base_price: number | string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  latitude: number | null;
  longitude: number | null;
  place_id: string | null;
  map_url: string | null;
  amenities: any;
  custom_amenities: string[];
  rules: any;
  custom_rules: string[];
}

interface UploadPropertyData {
  propertyImages: BaseImage[];
  property: PropertyData;
  rooms: RoomData[];
  peakSeasonRates: PeakRateData[];
  unavailabilities: UnavailabilityData[];
}

export type {
  BaseImage,
  RoomData,
  PeakRateData,
  UnavailabilityData,
  PropertyData,
  UploadPropertyData,
};

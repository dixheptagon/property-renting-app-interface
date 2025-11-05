export interface PropertyImage {
  id: number;
  url: string;
  is_main: boolean;
  order_index: number;
  created_at: string;
}

export interface RoomImage {
  id: number;
  url: string;
  is_main: boolean;
  order_index: number;
  created_at: string;
}

export interface RoomHighlight {
  city_view?: boolean;
  en_suite?: boolean;
  king_bed?: boolean;
  garden_view?: boolean;
  queen_bed?: boolean;
  others?: [string];
}

export interface Room {
  id: number;
  uid: string;
  property_id: number;
  name: string;
  description: string;
  base_price: number;
  max_guest: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  highlight: RoomHighlight;
  total_units: number;
  created_at: string;
  images: RoomImage[];
}

export interface Tenant {
  id: number;
  display_name: string;
  image: string;
}

export interface Amenities {
  wifi: boolean;
  parking: boolean;
  pool: boolean;
  gym: boolean;
  air_conditioning: boolean;
  kitchen: boolean;
  laundry: boolean;
  pet_friendly: boolean;
  others: [string];
}

export interface Rules {
  no_smoking: boolean;
  no_pets: boolean;
  check_in_after: string;
  check_out_before: string;
  others: [string];
}

export interface PeakSeasonRate {
  id: number;
  property_id: number;
  room_id: number | null;
  start_date: string;
  end_date: string;
  adjustment_type: "percentage" | "nominal";
  adjustment_value: number;
  created_at: string;
}

export interface RoomUnavailability {
  id: number;
  property_id: number;
  room_id: number;
  booking_id: number | null;
  start_date: string;
  end_date: string;
  reason: string;
  created_at: string;
}

export interface Property {
  id: number;
  uid: string;
  user_id: number;
  category: string;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  place_id: string;
  map_url: string;
  amenities: Amenities;
  rules: Rules;
  rating_avg: number;
  rating_count: number;
  base_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  tenant: Tenant;
  images: PropertyImage[];
  rooms: Room[];
  peak_season_rates: PeakSeasonRate[];
  room_unavailabilities: RoomUnavailability[];
}
